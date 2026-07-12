import { NextRequest, NextResponse } from "next/server";
import { callGemini, hashKey } from "@/lib/gemini";
import { enforceRateLimit, capacityResponse, GlobalBudgetError } from "@/lib/ratelimit";

const VALID_STYLES = ["Balanced", "Heavy Emoji", "Minimal", "Gen-Z", "Professional"];

export async function POST(req: NextRequest) {
  const blocked = await enforceRateLimit(req, "text");
  if (blocked) return blocked;

  try {
    const body = await req.json();
    const { text, style } = body as { text?: string; style?: string };

    if (!text || text.length > 500) {
      return NextResponse.json({ error: "Text is required (max 500 chars)" }, { status: 400 });
    }
    if (!style || !VALID_STYLES.includes(style)) {
      return NextResponse.json({ error: `Style must be one of: ${VALID_STYLES.join(", ")}` }, { status: 400 });
    }

    const cacheKey = `t2e:${style}:${hashKey(text)}`;
    const result = await callGemini(
      `Translate this text with emojis in ${style} style: "${text}"

Return a JSON object with:
- result: string (the translated text with emojis)
- alternatives: string[] (3 different alternative translations)`,
      cacheKey
    );

    return NextResponse.json(result);
  } catch (err) {
    if (err instanceof GlobalBudgetError) return capacityResponse();
    console.error("Text-to-emoji error:", err);
    return NextResponse.json({ error: "Failed to translate text" }, { status: 500 });
  }
}
