import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getCached, setCached } from "@/lib/redis";
import { hashKey } from "@/lib/gemini";
import { uploadImage, gridQuadrantImages, type EmojiImage } from "@/lib/cloudinary";
import { enforceRateLimit, reserveGlobalBudget, capacityResponse } from "@/lib/ratelimit";

const MAKER_CACHE_TTL = 60 * 60 * 24 * 30; // 30 days — URLs are permanent.

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const VALID_STYLES = ["Emoji", "Cartoon", "Pixel Art", "Sticker"];

export async function POST(req: NextRequest) {
  const blocked = await enforceRateLimit(req, "image");
  if (blocked) return blocked;

  try {
    const body = await req.json();
    const { prompt, style } = body as { prompt?: string; style?: string };

    if (!prompt || prompt.length > 200) {
      return NextResponse.json(
        { error: "Prompt is required (max 200 chars)" },
        { status: 400 }
      );
    }
    if (!style || !VALID_STYLES.includes(style)) {
      return NextResponse.json(
        { error: `Style must be one of: ${VALID_STYLES.join(", ")}` },
        { status: 400 }
      );
    }

    // v2 key: the payload shape changed from base64 data-URIs to Cloudinary
    // quadrant URLs; a fresh prefix stops any old-shaped entries being served.
    const cacheKey = `maker:v2:${style}:${hashKey(prompt)}`;
    const cached = await getCached<{ images: EmojiImage[] }>(cacheKey);
    if (cached) return NextResponse.json(cached);

    // Cache miss => a real, expensive image generation. Reserve global image
    // budget before spending; this is the primary bill-control ceiling.
    if (!(await reserveGlobalBudget("image"))) {
      return capacityResponse();
    }

    // gemini-2.0-flash-exp was retired by Google (404). gemini-2.5-flash-image
    // is the GA drop-in with the same generateContent + responseModalities
    // contract and ~$0.039/image — the cost the RL_IMAGE_* budget is tuned to.
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-image",
      generationConfig: {
        responseModalities: ["image", "text"],
      } as any,
    });

    // One image containing 4 variations laid out as an even 2x2 grid, so the
    // Cloudinary quadrant crops (lib/cloudinary.gridQuadrantImages) land cleanly.
    const fullPrompt = `Generate a ${style}-style emoji of: ${prompt}. Create exactly 4 distinct variations arranged as an even 2x2 grid — four equal cells, one emoji centered in each cell with generous even margins. Transparent background, square overall canvas, expressive, suitable for messaging apps.`;

    const result = await model.generateContent(fullPrompt);
    const parts = result.response.candidates?.[0]?.content?.parts ?? [];
    const grid = parts.find((p) => (p as any).inlineData)?.inlineData as
      | { mimeType: string; data: string }
      | undefined;

    if (!grid) {
      return NextResponse.json(
        { error: "Failed to generate images. Try a different description." },
        { status: 500 }
      );
    }

    // Persist the grid to Cloudinary, then derive 4 quadrant URLs from it.
    const { publicId } = await uploadImage(
      Buffer.from(grid.data, "base64"),
      grid.mimeType,
      { folder: "emoji-maker", tags: ["emoji-maker"] }
    );

    const payload = { images: gridQuadrantImages(publicId) };
    await setCached(cacheKey, payload, MAKER_CACHE_TTL);
    return NextResponse.json(payload);
  } catch (err) {
    console.error("Emoji maker error:", err);
    return NextResponse.json(
      { error: "Failed to generate emoji" },
      { status: 500 }
    );
  }
}
