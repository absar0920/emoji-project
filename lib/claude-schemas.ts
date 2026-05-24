/** JSON schemas for Anthropic structured outputs */

export const COMPARISON_SCHEMA = {
  type: "object",
  properties: {
    differences: {
      type: "object",
      properties: {
        official: { type: "string" },
        genz: { type: "string" },
        emotional: { type: "string" },
        dating: { type: "string" },
        meme: { type: "string" },
        tiktok: { type: "string" },
        whatsapp: { type: "string" },
      },
      required: ["official", "genz", "emotional", "dating", "meme", "tiktok", "whatsapp"],
      additionalProperties: false,
    },
    winner: { type: "string" },
    winner_reason: { type: "string" },
    when_to_use: { type: "string" },
  },
  required: ["differences", "winner", "winner_reason", "when_to_use"],
  additionalProperties: false,
} as const;

export const COMBOS_SCHEMA = {
  type: "object",
  properties: {
    combos: {
      type: "array",
      items: {
        type: "object",
        properties: {
          emojis: { type: "array", items: { type: "string" } },
          label: { type: "string" },
        },
        required: ["emojis", "label"],
        additionalProperties: false,
      },
    },
    seo_description: { type: "string" },
  },
  required: ["combos", "seo_description"],
  additionalProperties: false,
} as const;

function obj(
  properties: Record<string, unknown>,
  required?: string[]
): Record<string, unknown> {
  const keys = required ?? Object.keys(properties);
  return {
    type: "object",
    properties,
    required: keys,
    additionalProperties: false,
  };
}

const s = { type: "string" };
const n = { type: "number" };
const b = { type: "boolean" };
const sa = { type: "array", items: { type: "string" } };

export const EMOJI_MEANINGS_SCHEMA = {
  type: "object",
  properties: {
    official_meaning: obj({ description: s, original_intent: s }),
    genz_meaning: obj({
      interpretation: s,
      tiktok_usage: s,
      instagram_usage: s,
      irony_level: n,
    }),
    emotional_meaning: obj({
      emotion_type: s,
      intensity: n,
      psychology_note: s,
    }),
    dating_meaning: obj({
      flirt_usage: s,
      relationship_context: s,
      red_flag: b,
    }),
    sarcastic_meaning: obj({ passive_aggressive: s, meme_sarcasm: s }),
    meme_meaning: obj({ viral_usage: s, irony_level: n }),
    tiktok: obj({
      meaning: s,
      trend_usage: s,
      hashtags: sa,
      virality_score: n,
    }),
    whatsapp: obj({ chat_meaning: s, status_meaning: s, double_meaning: s }),
    instagram: obj({ bio_usage: s, story_usage: s, aesthetic_usage: s }),
    x: obj({
      meme_usage: s,
      sarcasm_patterns: s,
      quote_tweet_context: s,
      trending_context: s,
      reply_use: s,
    }),
    facebook: obj({
      reaction_meaning: s,
      comment_use: s,
      boomer_interpretation: s,
      group_use: s,
    }),
    snapchat: obj({
      friend_system_usage: s,
      streak_use: s,
      story_meaning: s,
      snap_context: s,
    }),
    telegram: obj({
      sticker_mapping: s,
      channel_use: s,
      group_meaning: s,
      bot_context: s,
    }),
    discord: obj({
      server_usage: s,
      reaction_use: s,
      emote_mapping: s,
      gaming_context: s,
      role_meaning: s,
    }),
    pinterest: obj({
      aesthetic_usage: s,
      board_use: s,
      visual_meaning: s,
      pin_context: s,
    }),
    reddit: obj({
      upvote_context: s,
      community_use: s,
      subreddit_meaning: s,
      karma_context: s,
    }),
    linkedin: obj({
      professional_use: s,
      post_context: s,
      appropriateness: s,
      comment_use: s,
    }),
    bereal: obj({
      authentic_usage: s,
      reaction_meaning: s,
      friend_context: s,
    }),
    threads: obj({
      thread_context: s,
      reply_use: s,
      trending_meaning: s,
      quote_use: s,
    }),
    twitch: obj({
      stream_usage: s,
      emote_mapping: s,
      chat_meaning: s,
      clip_context: s,
      subscriber_context: s,
    }),
    spotify: obj({
      playlist_usage: s,
      mood_mapping: s,
      bio_use: s,
      artist_context: s,
    }),
    cultures: obj({
      western_genz: s,
      pakistan_india: s,
      middle_east: s,
      global_neutral: s,
      bangladesh: s,
      sri_lanka: s,
      china: s,
      japan: s,
      south_korea: s,
      taiwan: s,
      hong_kong: s,
      philippines: s,
      indonesia: s,
      thailand: s,
      vietnam: s,
      malaysia: s,
      saudi_arabia: s,
      uae: s,
      egypt: s,
      turkey: s,
      iran: s,
      nigeria: s,
      south_africa: s,
      uk_ireland: s,
      france: s,
      germany: s,
      spain_italy: s,
      brazil: s,
      mexico: s,
      latam: s,
      australia_nz: s,
    }),
    time_evolution: obj({
      usage_2010: s,
      usage_2015: s,
      usage_2020: s,
      usage_2026: s,
    }),
    virality: obj({
      trend_score: n,
      meme_score: n,
      tiktok_freq: { type: "string", enum: ["low", "medium", "high", "viral"] },
      instagram_freq: { type: "string", enum: ["low", "medium", "high", "viral"] },
    }),
    relations: obj({
      related: sa,
      opposite: sa,
      confusing: sa,
      replacement: sa,
    }),
    safety: obj({
      safe_meaning: s,
      toxic_meaning: s,
      warning_notes: s,
      nsfw: b,
    }),
  },
  required: [
    "official_meaning",
    "genz_meaning",
    "emotional_meaning",
    "dating_meaning",
    "sarcastic_meaning",
    "meme_meaning",
    "tiktok",
    "whatsapp",
    "instagram",
    "x",
    "facebook",
    "snapchat",
    "telegram",
    "discord",
    "pinterest",
    "reddit",
    "linkedin",
    "bereal",
    "threads",
    "twitch",
    "spotify",
    "cultures",
    "time_evolution",
    "virality",
    "relations",
    "safety",
  ],
  additionalProperties: false,
} as const;
