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

export interface PlatformLayer {
  tiktok: TikTokPlatform;
  whatsapp: WhatsAppPlatform;
  instagram: InstagramPlatform;
}

export type FrequencyLevel = "low" | "medium" | "high" | "viral";

export interface CulturalLayer {
  cultures: {
    western_genz: string;
    pakistan_india: string;
    middle_east: string;
    global_neutral: string;
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

export type EmojiDocument = EmojiBase &
  MeaningLayers &
  PlatformLayer &
  CulturalLayer &
  TimeEvolution & {
    virality: Virality;
    relations: Relations;
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
