import Anthropic from "@anthropic-ai/sdk";
import {
  COMBOS_SCHEMA,
  COMPARISON_SCHEMA,
  EMOJI_MEANINGS_SCHEMA,
} from "./claude-schemas";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `You are a world-class emoji cultural intelligence expert.
Return valid JSON only — no markdown, no explanation, no code fences.`;

function extractJsonFromText(text: string): string {
  let cleaned = text.trim();

  const fenceMatch = cleaned.match(/^```(?:json)?\s*\n?([\s\S]*?)\n?```\s*$/i);
  if (fenceMatch) {
    cleaned = fenceMatch[1].trim();
  }

  if (!cleaned.startsWith("{") && !cleaned.startsWith("[")) {
    const objStart = cleaned.indexOf("{");
    const arrStart = cleaned.indexOf("[");
    const start =
      objStart === -1
        ? arrStart
        : arrStart === -1
          ? objStart
          : Math.min(objStart, arrStart);

    if (start !== -1) {
      const isArray = cleaned[start] === "[";
      const end = cleaned.lastIndexOf(isArray ? "]" : "}");
      if (end > start) {
        cleaned = cleaned.slice(start, end + 1);
      }
    }
  }

  return cleaned;
}

function parseResponseText(text: string): Record<string, unknown> {
  return JSON.parse(extractJsonFromText(text));
}

function buildUserPrompt(character: string, name: string): string {
  return `Generate complete meaning data for ${character} (${name}).

Return a JSON object with these exact fields:

MEANING LAYERS:
- official_meaning: { description: string, original_intent: string }
- genz_meaning: { interpretation: string, tiktok_usage: string, instagram_usage: string, irony_level: number (0-10) }
- emotional_meaning: { emotion_type: string, intensity: number (0-10), psychology_note: string }
- dating_meaning: { flirt_usage: string, relationship_context: string, red_flag: boolean }
- sarcastic_meaning: { passive_aggressive: string, meme_sarcasm: string }
- meme_meaning: { viral_usage: string, irony_level: number (0-10) }

PLATFORMS (all 15):
- tiktok: { meaning: string, trend_usage: string, hashtags: string[] (5 items), virality_score: number (0-100) }
- whatsapp: { chat_meaning: string, status_meaning: string, double_meaning: string }
- instagram: { bio_usage: string, story_usage: string, aesthetic_usage: string }
- x: { meme_usage: string, sarcasm_patterns: string, quote_tweet_context: string, trending_context: string, reply_use: string }
- facebook: { reaction_meaning: string, comment_use: string, boomer_interpretation: string, group_use: string }
- snapchat: { friend_system_usage: string, streak_use: string, story_meaning: string, snap_context: string }
- telegram: { sticker_mapping: string, channel_use: string, group_meaning: string, bot_context: string }
- discord: { server_usage: string, reaction_use: string, emote_mapping: string, gaming_context: string, role_meaning: string }
- pinterest: { aesthetic_usage: string, board_use: string, visual_meaning: string, pin_context: string }
- reddit: { upvote_context: string, community_use: string, subreddit_meaning: string, karma_context: string }
- linkedin: { professional_use: string, post_context: string, appropriateness: string, comment_use: string }
- bereal: { authentic_usage: string, reaction_meaning: string, friend_context: string }
- threads: { thread_context: string, reply_use: string, trending_meaning: string, quote_use: string }
- twitch: { stream_usage: string, emote_mapping: string, chat_meaning: string, clip_context: string, subscriber_context: string }
- spotify: { playlist_usage: string, mood_mapping: string, bio_use: string, artist_context: string }

CULTURES (all 25+ regions):
- cultures: { western_genz: string, pakistan_india: string, middle_east: string, global_neutral: string, bangladesh: string, sri_lanka: string, china: string, japan: string, south_korea: string, taiwan: string, hong_kong: string, philippines: string, indonesia: string, thailand: string, vietnam: string, malaysia: string, saudi_arabia: string, uae: string, egypt: string, turkey: string, iran: string, nigeria: string, south_africa: string, uk_ireland: string, france: string, germany: string, spain_italy: string, brazil: string, mexico: string, latam: string, australia_nz: string }

OTHER:
- time_evolution: { usage_2010: string, usage_2015: string, usage_2020: string, usage_2026: string }
- virality: { trend_score: number (0-100), meme_score: number (0-100), tiktok_freq: "low"|"medium"|"high"|"viral", instagram_freq: "low"|"medium"|"high"|"viral" }
- relations: { related: string[] (5 emoji slugs), opposite: string[] (3 slugs), confusing: string[] (3 slugs), replacement: string[] (3 slugs) }
- safety: { safe_meaning: string, toxic_meaning: string, warning_notes: string, nsfw: boolean }

Use URL-safe slugs for all emoji references (e.g., "skull", "red-heart", "face-with-tears-of-joy").
Each culture value should be a 1-2 sentence description of how this emoji is used/interpreted in that culture.`;
}

async function callClaude(
  prompt: string,
  maxTokens: number,
  schema: Record<string, unknown>,
  retries: number = 2
): Promise<Record<string, unknown>> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await client.messages.parse({
        model: "claude-sonnet-4-6",
        max_tokens: maxTokens,
        messages: [{ role: "user", content: prompt }],
        system: SYSTEM_PROMPT,
        output_config: {
          format: {
            type: "json_schema",
            schema,
          },
        },
      });

      if (response.parsed_output) {
        return response.parsed_output as Record<string, unknown>;
      }

      const text =
        response.content[0]?.type === "text" ? response.content[0].text : "";
      return parseResponseText(text);
    } catch (err) {
      if (attempt < retries) {
        const reason = err instanceof Error ? err.message : String(err);
        console.log(
          `    Request failed (attempt ${attempt + 1}/${retries + 1}): ${reason.slice(0, 120)}`
        );
        continue;
      }
      throw err;
    }
  }
  throw new Error("Unreachable");
}

export async function generateEmojiMeanings(
  character: string,
  name: string
): Promise<Record<string, unknown>> {
  return callClaude(buildUserPrompt(character, name), 10000, EMOJI_MEANINGS_SCHEMA);
}

export async function generateComparison(
  emoji1Character: string,
  emoji1Name: string,
  emoji2Character: string,
  emoji2Name: string
): Promise<Record<string, unknown>> {
  return callClaude(
    `Compare ${emoji1Character} (${emoji1Name}) vs ${emoji2Character} (${emoji2Name}).

Return a JSON object with:
- differences: { official: string, genz: string, emotional: string, dating: string, meme: string, tiktok: string, whatsapp: string }
- winner: "${emoji1Name}" or "${emoji2Name}" (which is more popular/used in 2026)
- winner_reason: string (1 sentence)
- when_to_use: string (practical guide, 2-3 sentences)

Each difference should be 1-2 sentences explaining how the two emojis differ in that context.`,
    1500,
    COMPARISON_SCHEMA
  );
}

export async function generateCombos(
  theme: string
): Promise<Record<string, unknown>> {
  return callClaude(
    `Generate 5 emoji combinations for the theme "${theme}".

Return a JSON object with:
- combos: Array of 5 objects, each with:
  - emojis: string[] (4-8 emoji characters)
  - label: string (short name like "Classic ${theme}")
- seo_description: string (1-2 sentence description for SEO meta)`,
    1000,
    COMBOS_SCHEMA
  );
}
