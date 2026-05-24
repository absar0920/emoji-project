import { NextRequest, NextResponse } from "next/server";
import { callGemini, hashKey } from "@/lib/gemini";

const VALID_MOODS = ["Happy", "Sad", "Hype", "Aesthetic", "Funny", "Romantic", "Motivational", "Chill"];
const VALID_PLATFORMS = ["Instagram", "TikTok", "WhatsApp", "Twitter", "LinkedIn"];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { topic, mood, platform } = body as { topic?: string; mood?: string; platform?: string };

    if (!topic || topic.length > 200) {
      return NextResponse.json({ error: "Topic is required (max 200 chars)" }, { status: 400 });
    }
    if (!mood || !VALID_MOODS.includes(mood)) {
      return NextResponse.json({ error: `Mood must be one of: ${VALID_MOODS.join(", ")}` }, { status: 400 });
    }
    if (!platform || !VALID_PLATFORMS.includes(platform)) {
      return NextResponse.json({ error: `Platform must be one of: ${VALID_PLATFORMS.join(", ")}` }, { status: 400 });
    }

    const cacheKey = `cap:${platform}:${mood}:${hashKey(topic)}`;
    const result = await callGemini(
      `Generate 5 ${platform} captions about "${topic}" with a ${mood} mood. Include emojis.

Return a JSON object with:
- captions: array of 5 objects, each with:
  - text: string (the caption with emojis)
  - emoji_count: number (how many emojis are in it)
  - vibe: string (one-word vibe label like "fire", "cozy", "savage")`,
      cacheKey
    );

    return NextResponse.json(result);
  } catch (err) {
    console.error("Caption generator error:", err);
    return NextResponse.json({ error: "Failed to generate captions" }, { status: 500 });
  }
}
