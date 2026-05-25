export interface EmojiBase {
  emoji_id: string;
  slug: string;
  unicode: string;
  name: string;
  character: string;
  shortcode: string;
  category: string;
  tags: string[];
  created_at: Date;
  updated_at: Date;
}

export interface OfficialMeaning {
  description: string;
  original_intent: string;
}

export interface GenZMeaning {
  interpretation: string;
  tiktok_usage: string;
  instagram_usage: string;
  irony_level: number;
}

export interface EmotionalMeaning {
  emotion_type: string;
  intensity: number;
  psychology_note: string;
}

export interface DatingMeaning {
  flirt_usage: string;
  relationship_context: string;
  red_flag: boolean;
}

export interface SarcasticMeaning {
  passive_aggressive: string;
  meme_sarcasm: string;
}

export interface MemeMeaning {
  viral_usage: string;
  irony_level: number;
}

export interface MeaningLayers {
  official_meaning: OfficialMeaning;
  genz_meaning: GenZMeaning;
  emotional_meaning: EmotionalMeaning;
  dating_meaning: DatingMeaning;
  sarcastic_meaning: SarcasticMeaning;
  meme_meaning: MemeMeaning;
}

export interface TikTokPlatform {
  meaning: string;
  trend_usage: string;
  hashtags: string[];
  virality_score: number;
}

export interface WhatsAppPlatform {
  chat_meaning: string;
  status_meaning: string;
  double_meaning: string;
}

export interface InstagramPlatform {
  bio_usage: string;
  story_usage: string;
  aesthetic_usage: string;
}

export interface XPlatform {
  meme_usage: string;
  sarcasm_patterns: string;
  quote_tweet_context: string;
  trending_context: string;
  reply_use: string;
}

export interface FacebookPlatform {
  reaction_meaning: string;
  comment_use: string;
  boomer_interpretation: string;
  group_use: string;
}

export interface SnapchatPlatform {
  friend_system_usage: string;
  streak_use: string;
  story_meaning: string;
  snap_context: string;
}

export interface TelegramPlatform {
  sticker_mapping: string;
  channel_use: string;
  group_meaning: string;
  bot_context: string;
}

export interface DiscordPlatform {
  server_usage: string;
  reaction_use: string;
  emote_mapping: string;
  gaming_context: string;
  role_meaning: string;
}

export interface PinterestPlatform {
  aesthetic_usage: string;
  board_use: string;
  visual_meaning: string;
  pin_context: string;
}

export interface RedditPlatform {
  upvote_context: string;
  community_use: string;
  subreddit_meaning: string;
  karma_context: string;
}

export interface LinkedInPlatform {
  professional_use: string;
  post_context: string;
  appropriateness: string;
  comment_use: string;
}

export interface BeRealPlatform {
  authentic_usage: string;
  reaction_meaning: string;
  friend_context: string;
}

export interface ThreadsPlatform {
  thread_context: string;
  reply_use: string;
  trending_meaning: string;
  quote_use: string;
}

export interface TwitchPlatform {
  stream_usage: string;
  emote_mapping: string;
  chat_meaning: string;
  clip_context: string;
  subscriber_context: string;
}

export interface SpotifyPlatform {
  playlist_usage: string;
  mood_mapping: string;
  bio_use: string;
  artist_context: string;
}

export interface PlatformLayer {
  tiktok: TikTokPlatform;
  whatsapp: WhatsAppPlatform;
  instagram: InstagramPlatform;
  x: XPlatform;
  facebook: FacebookPlatform;
  snapchat: SnapchatPlatform;
  telegram: TelegramPlatform;
  discord: DiscordPlatform;
  pinterest: PinterestPlatform;
  reddit: RedditPlatform;
  linkedin: LinkedInPlatform;
  bereal: BeRealPlatform;
  threads: ThreadsPlatform;
  twitch: TwitchPlatform;
  spotify: SpotifyPlatform;
}

export type FrequencyLevel = "low" | "medium" | "high" | "viral";

export interface CulturalLayer {
  cultures: {
    western_genz: string;
    pakistan_india: string;
    middle_east: string;
    global_neutral: string;
    bangladesh: string;
    sri_lanka: string;
    china: string;
    japan: string;
    south_korea: string;
    taiwan: string;
    hong_kong: string;
    philippines: string;
    indonesia: string;
    thailand: string;
    vietnam: string;
    malaysia: string;
    saudi_arabia: string;
    uae: string;
    egypt: string;
    turkey: string;
    iran: string;
    nigeria: string;
    south_africa: string;
    uk_ireland: string;
    france: string;
    germany: string;
    spain_italy: string;
    brazil: string;
    mexico: string;
    latam: string;
    australia_nz: string;
  };
}

export interface TimeEvolution {
  time_evolution: {
    usage_2010: string;
    usage_2015: string;
    usage_2020: string;
    usage_2026: string;
  };
}

export interface Virality {
  trend_score: number;
  meme_score: number;
  tiktok_freq: FrequencyLevel;
  instagram_freq: FrequencyLevel;
}

export interface Relations {
  related: string[];
  opposite: string[];
  confusing: string[];
  replacement: string[];
}

export interface SafetyLayer {
  safety: {
    safe_meaning: string;
    toxic_meaning: string;
    warning_notes: string;
    nsfw: boolean;
  };
}

export interface DesignVariations {
  google_noto?: string;
  twemoji?: string;
  openmoji?: string;
}

export type EmojiDocument = EmojiBase &
  MeaningLayers &
  PlatformLayer &
  CulturalLayer &
  TimeEvolution & {
    virality: Virality;
    relations: Relations;
    design_variations?: DesignVariations;
  } &
  SafetyLayer;

/** Lightweight type for the client-side search index */
export interface EmojiSearchItem {
  slug: string;
  name: string;
  character: string;
  tags: string[];
  category: string;
  shortcode: string;
  genz_summary: string;
}

/** Seed emoji entry — base fields only, no meaning data */
export interface SeedEmoji {
  character: string;
  name: string;
  slug: string;
  unicode: string;
  shortcode: string;
  category: string;
  tags: string[];
}

export interface ComparisonDocument {
  slug: string;
  emoji1_slug: string;
  emoji2_slug: string;
  emoji1_character: string;
  emoji2_character: string;
  emoji1_name: string;
  emoji2_name: string;
  differences: {
    official: string;
    genz: string;
    emotional: string;
    dating: string;
    meme: string;
    tiktok: string;
    whatsapp: string;
  };
  winner: string;
  winner_reason: string;
  when_to_use: string;
  created_at: Date;
}

export interface ComboDocument {
  slug: string;
  theme: string;
  combos: Array<{
    emojis: string[];
    label: string;
  }>;
  seo_description: string;
  created_at: Date;
}

/** Valid platform keys for routing */
export const PLATFORM_KEYS = [
  "tiktok", "whatsapp", "instagram", "x", "facebook", "snapchat",
  "telegram", "discord", "pinterest", "reddit", "linkedin", "bereal",
  "threads", "twitch", "spotify",
] as const;

export type PlatformKey = (typeof PLATFORM_KEYS)[number];

export interface KitchenCombo {
  emoji1: string;
  emoji2: string;
  result_url: string;
  created_at: Date;
}

/** Platform display names */
export const PLATFORM_LABELS: Record<PlatformKey, string> = {
  tiktok: "TikTok",
  whatsapp: "WhatsApp",
  instagram: "Instagram",
  x: "X (Twitter)",
  facebook: "Facebook",
  snapchat: "Snapchat",
  telegram: "Telegram",
  discord: "Discord",
  pinterest: "Pinterest",
  reddit: "Reddit",
  linkedin: "LinkedIn",
  bereal: "BeReal",
  threads: "Threads",
  twitch: "Twitch",
  spotify: "Spotify",
};

/** Platform emoji icons */
export const PLATFORM_ICONS: Record<PlatformKey, string> = {
  tiktok: "🎵",
  whatsapp: "💬",
  instagram: "📸",
  x: "𝕏",
  facebook: "👤",
  snapchat: "👻",
  telegram: "✈️",
  discord: "🎮",
  pinterest: "📌",
  reddit: "🤖",
  linkedin: "💼",
  bereal: "📷",
  threads: "🧵",
  twitch: "🎬",
  spotify: "🎧",
};

/** All culture region keys */
export const CULTURE_REGIONS = [
  "western_genz", "pakistan_india", "middle_east", "global_neutral",
  "bangladesh", "sri_lanka", "china", "japan", "south_korea", "taiwan",
  "hong_kong", "philippines", "indonesia", "thailand", "vietnam", "malaysia",
  "saudi_arabia", "uae", "egypt", "turkey", "iran", "nigeria", "south_africa",
  "uk_ireland", "france", "germany", "spain_italy", "brazil", "mexico",
  "latam", "australia_nz",
] as const;

export type CultureRegion = (typeof CULTURE_REGIONS)[number];

/** Culture region display info */
export const CULTURE_INFO: Record<CultureRegion, { flag: string; label: string }> = {
  western_genz: { flag: "🇺🇸", label: "Western / Gen-Z" },
  pakistan_india: { flag: "🇵🇰", label: "Pakistan & India" },
  middle_east: { flag: "🌍", label: "Middle East" },
  global_neutral: { flag: "🌐", label: "Global Neutral" },
  bangladesh: { flag: "🇧🇩", label: "Bangladesh" },
  sri_lanka: { flag: "🇱🇰", label: "Sri Lanka" },
  china: { flag: "🇨🇳", label: "China" },
  japan: { flag: "🇯🇵", label: "Japan" },
  south_korea: { flag: "🇰🇷", label: "South Korea" },
  taiwan: { flag: "🇹🇼", label: "Taiwan" },
  hong_kong: { flag: "🇭🇰", label: "Hong Kong" },
  philippines: { flag: "🇵🇭", label: "Philippines" },
  indonesia: { flag: "🇮🇩", label: "Indonesia" },
  thailand: { flag: "🇹🇭", label: "Thailand" },
  vietnam: { flag: "🇻🇳", label: "Vietnam" },
  malaysia: { flag: "🇲🇾", label: "Malaysia" },
  saudi_arabia: { flag: "🇸🇦", label: "Saudi Arabia" },
  uae: { flag: "🇦🇪", label: "UAE" },
  egypt: { flag: "🇪🇬", label: "Egypt" },
  turkey: { flag: "🇹🇷", label: "Turkey" },
  iran: { flag: "🇮🇷", label: "Iran" },
  nigeria: { flag: "🇳🇬", label: "Nigeria" },
  south_africa: { flag: "🇿🇦", label: "South Africa" },
  uk_ireland: { flag: "🇬🇧", label: "UK & Ireland" },
  france: { flag: "🇫🇷", label: "France" },
  germany: { flag: "🇩🇪", label: "Germany" },
  spain_italy: { flag: "🇪🇸", label: "Spain & Italy" },
  brazil: { flag: "🇧🇷", label: "Brazil" },
  mexico: { flag: "🇲🇽", label: "Mexico" },
  latam: { flag: "🌎", label: "Latin America" },
  australia_nz: { flag: "🇦🇺", label: "Australia & NZ" },
};
