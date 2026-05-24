import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `You are a world-class emoji cultural intelligence expert.
Return valid JSON only — no markdown, no explanation, no code fences.`;

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

export async function generateEmojiMeanings(
  character: string,
  name: string
): Promise<Record<string, unknown>> {
  const response = await client.messages.create({
    model: "claude-opus-4-7",
    max_tokens: 4000,
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

export async function generateComparison(
  emoji1Character: string,
  emoji1Name: string,
  emoji2Character: string,
  emoji2Name: string
): Promise<Record<string, unknown>> {
  const response = await client.messages.create({
    model: "claude-sonnet-4-5-20250514",
    max_tokens: 1500,
    messages: [
      {
        role: "user",
        content: `Compare ${emoji1Character} (${emoji1Name}) vs ${emoji2Character} (${emoji2Name}).

Return a JSON object with:
- differences: { official: string, genz: string, emotional: string, dating: string, meme: string, tiktok: string, whatsapp: string }
- winner: "${emoji1Name}" or "${emoji2Name}" (which is more popular/used in 2026)
- winner_reason: string (1 sentence)
- when_to_use: string (practical guide, 2-3 sentences)

Each difference should be 1-2 sentences explaining how the two emojis differ in that context.`,
      },
    ],
    system: SYSTEM_PROMPT,
  });

  const text = response.content[0].type === "text" ? response.content[0].text : "";
  return JSON.parse(text);
}

export async function generateCombos(
  theme: string
): Promise<Record<string, unknown>> {
  const response = await client.messages.create({
    model: "claude-sonnet-4-5-20250514",
    max_tokens: 1000,
    messages: [
      {
        role: "user",
        content: `Generate 5 emoji combinations for the theme "${theme}".

Return a JSON object with:
- combos: Array of 5 objects, each with:
  - emojis: string[] (4-8 emoji characters)
  - label: string (short name like "Classic ${theme}")
- seo_description: string (1-2 sentence description for SEO meta)`,
      },
    ],
    system: SYSTEM_PROMPT,
  });

  const text = response.content[0].type === "text" ? response.content[0].text : "";
  return JSON.parse(text);
}
