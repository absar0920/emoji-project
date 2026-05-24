import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `You are a world-class emoji cultural intelligence expert.
Return valid JSON only — no markdown, no explanation, no code fences.`;

function buildUserPrompt(character: string, name: string): string {
  return `Generate complete meaning data for ${character} (${name}).

Return a JSON object with these exact fields:
- official_meaning: { description: string, original_intent: string }
- genz_meaning: { interpretation: string, tiktok_usage: string, instagram_usage: string, irony_level: number (0-10) }
- emotional_meaning: { emotion_type: string, intensity: number (0-10), psychology_note: string }
- dating_meaning: { flirt_usage: string, relationship_context: string, red_flag: boolean }
- sarcastic_meaning: { passive_aggressive: string, meme_sarcasm: string }
- meme_meaning: { viral_usage: string, irony_level: number (0-10) }
- tiktok: { meaning: string, trend_usage: string, hashtags: string[] (5 items), virality_score: number (0-100) }
- whatsapp: { chat_meaning: string, status_meaning: string, double_meaning: string }
- instagram: { bio_usage: string, story_usage: string, aesthetic_usage: string }
- cultures: { western_genz: string, pakistan_india: string, middle_east: string, global_neutral: string }
- time_evolution: { usage_2010: string, usage_2015: string, usage_2020: string, usage_2026: string }
- virality: { trend_score: number (0-100), meme_score: number (0-100), tiktok_freq: "low"|"medium"|"high"|"viral", instagram_freq: "low"|"medium"|"high"|"viral" }
- relations: { related: string[] (5 emoji slugs), opposite: string[] (3 slugs), confusing: string[] (3 slugs), replacement: string[] (3 slugs) }
- safety: { safe_meaning: string, toxic_meaning: string, warning_notes: string, nsfw: boolean }

Use URL-safe slugs for all emoji references (e.g., "skull", "red-heart", "face-with-tears-of-joy").`;
}

export async function generateEmojiMeanings(
  character: string,
  name: string
): Promise<Record<string, unknown>> {
  const response = await client.messages.create({
    model: "claude-sonnet-4-5-20250514",
    max_tokens: 2000,
    messages: [
      {
        role: "user",
        content: buildUserPrompt(character, name),
      },
    ],
    system: SYSTEM_PROMPT,
  });

  const text =
    response.content[0].type === "text" ? response.content[0].text : "";
  const parsed = JSON.parse(text);
  return parsed;
}
