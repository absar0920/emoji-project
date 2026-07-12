import { NextRequest, NextResponse } from "next/server";
import { callGemini, hashKey } from "@/lib/gemini";
import { enforceRateLimit, capacityResponse, GlobalBudgetError } from "@/lib/ratelimit";

export async function POST(req: NextRequest) {
  const blocked = await enforceRateLimit(req, "text");
  if (blocked) return blocked;

  try {
    const body = await req.json();
    const { query } = body as { query?: string };

    if (!query || query.length > 200) {
      return NextResponse.json({ error: "Query is required (max 200 chars)" }, { status: 400 });
    }

    const cacheKey = `vibe:${hashKey(query)}`;
    const result = await callGemini(
      `Find 10 emojis that match the vibe/feeling "${query}".

Return a JSON object with:
- results: array of 10 objects, each with:
  - emoji: string (the emoji character)
  - name: string (emoji name)
  - match_percent: number (0-100, how well it matches)
  - reason: string (1 sentence why it matches)

Order by match_percent descending.`,
      cacheKey
    );

    return NextResponse.json(result);
  } catch (err) {
    if (err instanceof GlobalBudgetError) return capacityResponse();
    console.error("Vibe search error:", err);
    return NextResponse.json({ error: "Failed to search vibes" }, { status: 500 });
  }
}
