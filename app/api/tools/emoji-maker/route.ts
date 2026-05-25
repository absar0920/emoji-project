import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getCached, setCached } from "@/lib/redis";
import { hashKey } from "@/lib/gemini";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const VALID_STYLES = ["Emoji", "Cartoon", "Pixel Art", "Sticker"];

export async function POST(req: NextRequest) {
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

    const cacheKey = `maker:${style}:${hashKey(prompt)}`;
    const cached = await getCached<{ images: string[] }>(cacheKey);
    if (cached) return NextResponse.json(cached);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-exp",
      generationConfig: {
        responseModalities: ["image", "text"],
      } as any,
    });

    const fullPrompt = `Generate a ${style}-style emoji of: ${prompt}. Square format, transparent background, expressive, suitable for messaging apps. Create 4 different variations.`;

    const result = await model.generateContent(fullPrompt);
    const response = result.response;
    const images: string[] = [];

    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if ((part as any).inlineData) {
          const { mimeType, data } = (part as any).inlineData;
          images.push(`data:${mimeType};base64,${data}`);
        }
      }
    }

    if (images.length === 0) {
      return NextResponse.json(
        { error: "Failed to generate images. Try a different description." },
        { status: 500 }
      );
    }

    const payload = { images };
    await setCached(cacheKey, payload, 3600);
    return NextResponse.json(payload);
  } catch (err) {
    console.error("Emoji maker error:", err);
    return NextResponse.json(
      { error: "Failed to generate emoji" },
      { status: 500 }
    );
  }
}
