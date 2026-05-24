# SEO Expansion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Expand the emoji data model to 15 platforms + 25 cultures, build 4 new programmatic page types (~57K+ total SEO pages).

**Architecture:** Expand TypeScript types and Claude prompt to generate richer emoji data. Add comparison and combo collections populated by dedicated scripts. Build 4 new ISR page types (platform, comparison, combo, culture) that reuse existing components and add new ones. Update the sitemap to a sitemap index pattern for 57K+ URLs.

**Tech Stack:** Next.js 16, TypeScript, MongoDB Atlas, Anthropic Claude API, p-limit, Tailwind CSS

**Spec:** `docs/superpowers/specs/2026-05-24-seo-expansion-design.md`

---

### Task 1: Expand TypeScript Types

**Files:**
- Modify: `types/emoji.ts`

- [ ] **Step 1: Add 12 new platform interfaces**

Add after the existing `InstagramPlatform` interface (line 74) in `types/emoji.ts`:

```ts
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
```

- [ ] **Step 2: Update PlatformLayer to include all 15 platforms**

Replace the existing `PlatformLayer` interface:

```ts
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
```

- [ ] **Step 3: Expand CulturalLayer to 25 regions**

Replace the existing `CulturalLayer` interface:

```ts
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
```

- [ ] **Step 4: Add ComparisonDocument and ComboDocument types**

Add at the end of `types/emoji.ts`:

```ts
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
```

- [ ] **Step 5: Verify types compile**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 6: Commit**

```bash
git add types/emoji.ts
git commit -m "feat: expand types with 15 platforms, 25 cultures, comparison and combo types"
```

---

### Task 2: Expand Claude Prompt

**Files:**
- Modify: `lib/claude.ts`

- [ ] **Step 1: Replace buildUserPrompt with expanded version**

Replace the `buildUserPrompt` function in `lib/claude.ts` with:

```ts
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
```

- [ ] **Step 2: Increase max_tokens to handle larger response**

In the `generateEmojiMeanings` function, change `max_tokens: 2000` to `max_tokens: 4000`.

- [ ] **Step 3: Add comparison generation function**

Add after the existing `generateEmojiMeanings` function:

```ts
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
```

- [ ] **Step 4: Verify types compile**

```bash
npx tsc --noEmit
```

- [ ] **Step 5: Commit**

```bash
git add lib/claude.ts
git commit -m "feat: expand Claude prompt to 15 platforms + 25 cultures, add comparison and combo generators"
```

---

### Task 3: Add --force Flag to Pipeline

**Files:**
- Modify: `scripts/generate-meanings.ts`

- [ ] **Step 1: Add --force flag parsing**

In `scripts/generate-meanings.ts`, after the `sourceFile` parsing (line 27), add:

```ts
  const forceFlag = process.argv.includes("--force");
```

- [ ] **Step 2: Update the pre-filter logic to respect --force**

Replace the `toProcess` filter block (lines 48-55):

```ts
  const toProcess = emojis.filter((seed) => {
    if (forceFlag) return true;
    const existing = existingMap.get(seed.slug);
    if (existing?.official_meaning) {
      console.log(`  SKIP: ${seed.character} ${seed.name} (already has meaning data)`);
      return false;
    }
    return true;
  });
```

- [ ] **Step 3: Update the log message**

Replace the log line (line 58):

```ts
  console.log(`Starting pipeline: ${toProcess.length} to generate, ${skipped} skipped (${CONCURRENCY} concurrent)${forceFlag ? ' [FORCE MODE]' : ''}`);
```

- [ ] **Step 4: Verify it compiles**

```bash
npx tsc --noEmit
```

- [ ] **Step 5: Commit**

```bash
git add scripts/generate-meanings.ts
git commit -m "feat: add --force flag to generate-meanings pipeline"
```

---

### Task 4: Generate Comparisons Script

**Files:**
- Create: `scripts/generate-comparisons.ts`

- [ ] **Step 1: Write the comparisons generation script**

Write to `scripts/generate-comparisons.ts`:

```ts
import { MongoClient } from "mongodb";
import pLimit from "p-limit";
import { generateComparison } from "../lib/claude";
import type { EmojiDocument, ComparisonDocument } from "../types/emoji";

const MONGODB_URI = process.env.MONGODB_URI!;
const MONGODB_DB = process.env.MONGODB_DB || "emoji-platform";
const CONCURRENCY = 10;

function makePairSlug(slug1: string, slug2: string): string {
  const sorted = [slug1, slug2].sort();
  return `${sorted[0]}-vs-${sorted[1]}`;
}

async function main() {
  if (!MONGODB_URI) {
    console.error("MONGODB_URI is not set.");
    process.exit(1);
  }
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error("ANTHROPIC_API_KEY is not set.");
    process.exit(1);
  }

  const client = await MongoClient.connect(MONGODB_URI);
  const db = client.db(MONGODB_DB);
  const emojisCol = db.collection<EmojiDocument>("emojis");
  const comparisonsCol = db.collection<ComparisonDocument>("comparisons");

  // Fetch all emojis with relations
  const allEmojis = await emojisCol
    .find({}, { projection: { slug: 1, character: 1, name: 1, relations: 1 } })
    .toArray();

  const emojiMap = new Map(allEmojis.map((e) => [e.slug, e]));

  // Build unique pairs from relations
  const pairSet = new Set<string>();
  const pairs: Array<{ slug1: string; slug2: string }> = [];

  for (const emoji of allEmojis) {
    if (!emoji.relations) continue;
    const relatedSlugs = [
      ...(emoji.relations.related || []),
      ...(emoji.relations.opposite || []),
      ...(emoji.relations.confusing || []),
    ];
    for (const otherSlug of relatedSlugs) {
      if (!emojiMap.has(otherSlug)) continue;
      const pairSlug = makePairSlug(emoji.slug, otherSlug);
      if (pairSet.has(pairSlug)) continue;
      pairSet.add(pairSlug);
      pairs.push({ slug1: emoji.slug, slug2: otherSlug });
    }
  }

  // Filter out already-generated comparisons
  const existingSlugs = await comparisonsCol
    .find({}, { projection: { slug: 1 } })
    .toArray();
  const existingSet = new Set(existingSlugs.map((d) => d.slug));

  const toProcess = pairs.filter(
    (p) => !existingSet.has(makePairSlug(p.slug1, p.slug2))
  );

  const skipped = pairs.length - toProcess.length;
  console.log(
    `Comparisons: ${toProcess.length} to generate, ${skipped} skipped (${CONCURRENCY} concurrent)`
  );

  let processed = 0;
  let errors = 0;
  const limit = pLimit(CONCURRENCY);

  const tasks = toProcess.map((pair) =>
    limit(async () => {
      const emoji1 = emojiMap.get(pair.slug1)!;
      const emoji2 = emojiMap.get(pair.slug2)!;
      const pairSlug = makePairSlug(pair.slug1, pair.slug2);
      const sorted = [pair.slug1, pair.slug2].sort();

      try {
        console.log(`  Comparing: ${emoji1.character} vs ${emoji2.character}...`);
        const result = await generateComparison(
          emoji1.character,
          emoji1.name,
          emoji2.character,
          emoji2.name
        );

        const doc: ComparisonDocument = {
          slug: pairSlug,
          emoji1_slug: sorted[0],
          emoji2_slug: sorted[1],
          emoji1_character: emojiMap.get(sorted[0])!.character,
          emoji2_character: emojiMap.get(sorted[1])!.character,
          emoji1_name: emojiMap.get(sorted[0])!.name,
          emoji2_name: emojiMap.get(sorted[1])!.name,
          differences: result.differences as ComparisonDocument["differences"],
          winner: String(result.winner),
          winner_reason: String(result.winner_reason),
          when_to_use: String(result.when_to_use),
          created_at: new Date(),
        };

        await comparisonsCol.updateOne(
          { slug: pairSlug },
          { $set: doc },
          { upsert: true }
        );

        processed++;
        console.log(`  ✓ ${emoji1.character} vs ${emoji2.character} (${processed}/${toProcess.length})`);
      } catch (err) {
        errors++;
        console.error(`  ✗ ${emoji1.character} vs ${emoji2.character}: ${err}`);
      }
    })
  );

  await Promise.allSettled(tasks);
  console.log(`\nDone! Processed: ${processed}, Skipped: ${skipped}, Errors: ${errors}`);
  await client.close();
}

main().catch(console.error);
```

- [ ] **Step 2: Add script to package.json**

Add to scripts section:
```json
"generate:comparisons": "env-cmd -f .env.local npx tsx scripts/generate-comparisons.ts"
```

- [ ] **Step 3: Verify it compiles**

```bash
npx tsc --noEmit
```

- [ ] **Step 4: Commit**

```bash
git add scripts/generate-comparisons.ts package.json
git commit -m "feat: add comparison generation script"
```

---

### Task 5: Generate Combos Script

**Files:**
- Create: `scripts/generate-combos.ts`

- [ ] **Step 1: Write the combos generation script**

Write to `scripts/generate-combos.ts`:

```ts
import { MongoClient } from "mongodb";
import pLimit from "p-limit";
import { generateCombos } from "../lib/claude";
import type { ComboDocument } from "../types/emoji";

const MONGODB_URI = process.env.MONGODB_URI!;
const MONGODB_DB = process.env.MONGODB_DB || "emoji-platform";
const CONCURRENCY = 10;

const THEMES = [
  "birthday", "love", "breakup", "aesthetic", "gym", "study", "pride",
  "halloween", "christmas", "graduation", "wedding", "sad", "angry",
  "flirty", "funny", "chill", "hype", "toxic", "dark", "soft",
  "motivational", "party", "travel", "food", "music", "gaming", "sports",
  "nature", "weather", "animals", "family", "friendship", "work", "school",
  "beach", "summer", "winter", "spring", "autumn", "night", "morning",
  "coffee", "wine", "celebration", "congratulations", "good-luck",
  "thank-you", "sorry", "miss-you", "thinking-of-you", "good-morning",
  "good-night", "weekend", "monday", "friday", "self-care", "mental-health",
  "meditation", "yoga", "running", "cooking", "reading", "art",
  "photography", "shopping", "money", "success", "failure", "nostalgia",
  "vintage", "retro", "y2k", "cottagecore", "indie", "punk", "goth",
  "kawaii", "minimalist", "maximalist", "pastel", "neon", "rainbow",
  "sparkle", "fire-set", "ice", "water", "earth", "air", "zodiac",
  "astrology", "tarot", "witchy", "spooky", "creepy", "cute", "ugly",
  "weird", "random", "chaos", "peace", "war", "justice", "freedom",
  "rebel", "angel", "devil", "heaven", "hell", "dream", "nightmare",
  "reality", "fantasy", "sci-fi", "horror", "comedy", "romance", "drama",
  "action", "mystery", "thriller", "anime", "kpop", "bollywood",
  "hollywood", "tiktok-aesthetic", "instagram-aesthetic", "vsco", "e-girl",
  "e-boy", "soft-girl", "dark-academia", "light-academia", "grunge",
  "preppy", "sporty", "casual", "formal", "luxe", "budget", "diy",
  "handmade", "organic", "vegan", "fitness", "wellness", "skincare",
  "makeup", "hair", "nails", "fashion", "streetwear", "haute-couture",
  "vintage-fashion", "new-year", "valentines-day", "mothers-day",
  "fathers-day", "easter", "thanksgiving", "ramadan", "eid", "diwali",
  "holi", "chinese-new-year", "back-to-school", "prom", "road-trip",
  "camping", "hiking", "swimming", "dancing", "singing", "movie-night",
  "date-night", "girls-night", "boys-night", "brunch", "dinner",
  "breakfast", "snack-time", "pizza-night", "taco-tuesday", "sushi",
  "baking", "gardening", "cleaning", "moving", "new-job", "promotion",
  "retirement", "baby-shower", "engagement", "anniversary", "reunion",
  "farewell", "welcome", "apology", "forgiveness", "gratitude", "hope",
  "courage", "strength", "wisdom", "creativity", "innovation", "teamwork",
];

function toSlug(theme: string): string {
  return theme.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

function toDisplayName(theme: string): string {
  return theme
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

async function main() {
  if (!MONGODB_URI) {
    console.error("MONGODB_URI is not set.");
    process.exit(1);
  }
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error("ANTHROPIC_API_KEY is not set.");
    process.exit(1);
  }

  const client = await MongoClient.connect(MONGODB_URI);
  const db = client.db(MONGODB_DB);
  const combosCol = db.collection<ComboDocument>("combos");

  // Resume support
  const existingSlugs = await combosCol
    .find({}, { projection: { slug: 1 } })
    .toArray();
  const existingSet = new Set(existingSlugs.map((d) => d.slug));

  const toProcess = THEMES.filter((t) => !existingSet.has(toSlug(t)));
  const skipped = THEMES.length - toProcess.length;

  console.log(
    `Combos: ${toProcess.length} to generate, ${skipped} skipped (${CONCURRENCY} concurrent)`
  );

  let processed = 0;
  let errors = 0;
  const limit = pLimit(CONCURRENCY);

  const tasks = toProcess.map((theme) =>
    limit(async () => {
      const slug = toSlug(theme);
      const displayName = toDisplayName(theme);

      try {
        console.log(`  Generating: ${displayName}...`);
        const result = await generateCombos(displayName);

        const doc: ComboDocument = {
          slug,
          theme: displayName,
          combos: (result.combos as ComboDocument["combos"]) || [],
          seo_description: String(result.seo_description || ""),
          created_at: new Date(),
        };

        await combosCol.updateOne(
          { slug },
          { $set: doc },
          { upsert: true }
        );

        processed++;
        console.log(`  ✓ ${displayName} (${processed}/${toProcess.length})`);
      } catch (err) {
        errors++;
        console.error(`  ✗ ${displayName}: ${err}`);
      }
    })
  );

  await Promise.allSettled(tasks);
  console.log(`\nDone! Processed: ${processed}, Skipped: ${skipped}, Errors: ${errors}`);
  await client.close();
}

main().catch(console.error);
```

- [ ] **Step 2: Add script to package.json**

Add to scripts section:
```json
"generate:combos": "env-cmd -f .env.local npx tsx scripts/generate-combos.ts"
```

- [ ] **Step 3: Verify it compiles**

```bash
npx tsc --noEmit
```

- [ ] **Step 4: Commit**

```bash
git add scripts/generate-combos.ts package.json
git commit -m "feat: add combo generation script with 200 themes"
```

---

### Task 6: Update MongoDB Indexes

**Files:**
- Modify: `scripts/create-indexes.ts`

- [ ] **Step 1: Add indexes for new collections**

Read the current `scripts/create-indexes.ts`, then add before `await client.close()`:

```ts
  // Comparisons collection
  const comparisons = db.collection("comparisons");
  console.log("\nCreating indexes on 'comparisons' collection...");

  await comparisons.createIndex({ slug: 1 }, { unique: true });
  console.log("  ✓ slug (unique)");

  await comparisons.createIndex({ emoji1_slug: 1 });
  console.log("  ✓ emoji1_slug");

  await comparisons.createIndex({ emoji2_slug: 1 });
  console.log("  ✓ emoji2_slug");

  // Combos collection
  const combos = db.collection("combos");
  console.log("\nCreating indexes on 'combos' collection...");

  await combos.createIndex({ slug: 1 }, { unique: true });
  console.log("  ✓ slug (unique)");
```

- [ ] **Step 2: Commit**

```bash
git add scripts/create-indexes.ts
git commit -m "feat: add indexes for comparisons and combos collections"
```

---

### Task 7: Add MongoDB Queries + Redis Cache

**Files:**
- Modify: `lib/mongodb.ts`

- [ ] **Step 1: Add imports for new types**

Update the import at the top of `lib/mongodb.ts`:

```ts
import { EmojiDocument, EmojiSearchItem, ComparisonDocument, ComboDocument } from "@/types/emoji";
```

- [ ] **Step 2: Add new query functions**

Add before the `export { connectToDatabase }` line:

```ts
export async function getEmojiPlatformData(
  slug: string,
  platform: string
): Promise<EmojiDocument | null> {
  const cacheKey = `platform:${platform}:${slug}`;
  const cached = await getCached<EmojiDocument>(cacheKey);
  if (cached) return cached;

  const conn = await connectToDatabase();
  if (!conn) return null;
  const result = await emojis(conn.db).findOne(
    { slug },
    { projection: { slug: 1, name: 1, character: 1, unicode: 1, shortcode: 1, category: 1, [platform]: 1, virality: 1, relations: 1, tags: 1 } }
  );

  if (result) await setCached(cacheKey, result, 3600);
  return result;
}

export async function getComparisonBySlug(
  slug: string
): Promise<ComparisonDocument | null> {
  const cacheKey = `comparison:${slug}`;
  const cached = await getCached<ComparisonDocument>(cacheKey);
  if (cached) return cached;

  const conn = await connectToDatabase();
  if (!conn) return null;
  const result = await conn.db
    .collection<ComparisonDocument>("comparisons")
    .findOne({ slug });

  if (result) await setCached(cacheKey, result, 3600);
  return result;
}

export async function getComboBySlug(
  slug: string
): Promise<ComboDocument | null> {
  const cacheKey = `combo:${slug}`;
  const cached = await getCached<ComboDocument>(cacheKey);
  if (cached) return cached;

  const conn = await connectToDatabase();
  if (!conn) return null;
  const result = await conn.db
    .collection<ComboDocument>("combos")
    .findOne({ slug });

  if (result) await setCached(cacheKey, result, 3600);
  return result;
}

export async function getAllComparisonSlugs(): Promise<string[]> {
  const conn = await connectToDatabase();
  if (!conn) return [];
  const docs = await conn.db
    .collection<ComparisonDocument>("comparisons")
    .find({}, { projection: { slug: 1 } })
    .toArray();
  return docs.map((d) => d.slug);
}

export async function getAllComboSlugs(): Promise<string[]> {
  const conn = await connectToDatabase();
  if (!conn) return [];
  const docs = await conn.db
    .collection<ComboDocument>("combos")
    .find({}, { projection: { slug: 1 } })
    .toArray();
  return docs.map((d) => d.slug);
}

export async function getEmojisByCulture(
  region: string,
  limit: number = 30
): Promise<EmojiDocument[]> {
  const cacheKey = `culture:${region}`;
  const cached = await getCached<EmojiDocument[]>(cacheKey);
  if (cached) return cached;

  const conn = await connectToDatabase();
  if (!conn) return [];
  const results = await emojis(conn.db)
    .find(
      { [`cultures.${region}`]: { $exists: true, $ne: "" } },
      { projection: { slug: 1, name: 1, character: 1, [`cultures.${region}`]: 1, virality: 1 } }
    )
    .sort({ "virality.trend_score": -1 })
    .limit(limit)
    .toArray();

  await setCached(cacheKey, results, 3600);
  return results;
}

export async function getRelatedComparisons(
  emojiSlug: string,
  limit: number = 5
): Promise<ComparisonDocument[]> {
  const conn = await connectToDatabase();
  if (!conn) return [];
  return conn.db
    .collection<ComparisonDocument>("comparisons")
    .find({ $or: [{ emoji1_slug: emojiSlug }, { emoji2_slug: emojiSlug }] })
    .limit(limit)
    .toArray();
}

export async function getRelatedCombos(
  limit: number = 3
): Promise<ComboDocument[]> {
  const conn = await connectToDatabase();
  if (!conn) return [];
  return conn.db
    .collection<ComboDocument>("combos")
    .find({})
    .limit(limit)
    .toArray();
}
```

- [ ] **Step 3: Verify it compiles**

```bash
npx tsc --noEmit
```

- [ ] **Step 4: Commit**

```bash
git add lib/mongodb.ts
git commit -m "feat: add MongoDB queries for platform, comparison, combo, and culture pages"
```

---

### Task 8: Add SEO Utilities

**Files:**
- Modify: `lib/seo.ts`

- [ ] **Step 1: Add imports**

Add at the top of `lib/seo.ts`:

```ts
import { EmojiDocument, ComparisonDocument, ComboDocument, PLATFORM_LABELS, PlatformKey, CULTURE_INFO, CultureRegion } from "@/types/emoji";
```

Remove the existing `import { EmojiDocument } from "@/types/emoji";` line.

- [ ] **Step 2: Add new SEO functions**

Add after the existing `generateHomeMeta` function:

```ts
export function generatePlatformMeta(emoji: EmojiDocument, platform: PlatformKey) {
  const year = new Date().getFullYear();
  const platformLabel = PLATFORM_LABELS[platform];
  return {
    title: `${emoji.character} ${emoji.name} Emoji on ${platformLabel} — Meaning, Trends [${year}]`,
    description: `What does ${emoji.character} mean on ${platformLabel}? Usage, trends, and context for the ${emoji.name} emoji on ${platformLabel}.`.slice(0, 155),
    canonical: `${SITE_URL}/${platform}/${emoji.slug}`,
    openGraph: {
      title: `${emoji.character} ${emoji.name} on ${platformLabel}`,
      description: `How ${emoji.character} is used on ${platformLabel} — meanings, trends, and context.`,
      url: `${SITE_URL}/${platform}/${emoji.slug}`,
      siteName: SITE_NAME,
      type: "article" as const,
    },
  };
}

export function generatePlatformBreadcrumb(emoji: EmojiDocument, platform: PlatformKey) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: PLATFORM_LABELS[platform], item: `${SITE_URL}/${platform}` },
      { "@type": "ListItem", position: 3, name: `${emoji.character} ${emoji.name}`, item: `${SITE_URL}/${platform}/${emoji.slug}` },
    ],
  };
}

export function generatePlatformFAQ(emoji: EmojiDocument, platform: PlatformKey) {
  const label = PLATFORM_LABELS[platform];
  const platformData = emoji[platform] as Record<string, unknown> | undefined;
  const firstValue = platformData ? String(Object.values(platformData)[0] || "") : "";

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What does ${emoji.character} mean on ${label}?`,
        acceptedAnswer: { "@type": "Answer", text: firstValue },
      },
      {
        "@type": "Question",
        name: `How is ${emoji.character} used on ${label}?`,
        acceptedAnswer: { "@type": "Answer", text: `The ${emoji.name} emoji is commonly used on ${label} in various contexts.` },
      },
      {
        "@type": "Question",
        name: `Is ${emoji.character} popular on ${label}?`,
        acceptedAnswer: { "@type": "Answer", text: `Check the trend score and usage frequency for ${emoji.name} on ${label}.` },
      },
    ],
  };
}

export function generateComparisonMeta(comparison: ComparisonDocument) {
  const year = new Date().getFullYear();
  return {
    title: `${comparison.emoji1_character} ${comparison.emoji1_name} vs ${comparison.emoji2_character} ${comparison.emoji2_name} — Emoji Comparison [${year}]`,
    description: `What's the difference between ${comparison.emoji1_character} and ${comparison.emoji2_character}? Compare meanings across Gen-Z, TikTok, dating, and more.`.slice(0, 155),
    canonical: `${SITE_URL}/vs/${comparison.slug}`,
  };
}

export function generateComparisonFAQ(comparison: ComparisonDocument) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What's the difference between ${comparison.emoji1_character} and ${comparison.emoji2_character}?`,
        acceptedAnswer: { "@type": "Answer", text: comparison.differences.official },
      },
      {
        "@type": "Question",
        name: `Which is more popular, ${comparison.emoji1_character} or ${comparison.emoji2_character}?`,
        acceptedAnswer: { "@type": "Answer", text: `${comparison.winner} is more popular. ${comparison.winner_reason}` },
      },
      {
        "@type": "Question",
        name: `When should I use ${comparison.emoji1_character} vs ${comparison.emoji2_character}?`,
        acceptedAnswer: { "@type": "Answer", text: comparison.when_to_use },
      },
    ],
  };
}

export function generateComboMeta(combo: ComboDocument) {
  const year = new Date().getFullYear();
  const previewEmojis = combo.combos[0]?.emojis.join("") || "";
  return {
    title: `${combo.theme} Emoji Combos — Copy & Paste ${previewEmojis} [${year}]`,
    description: combo.seo_description || `Best ${combo.theme.toLowerCase()} emoji combinations for Instagram, TikTok, and WhatsApp. Copy and paste ready.`,
    canonical: `${SITE_URL}/combo/${combo.slug}`,
  };
}

export function generateCultureMeta(region: CultureRegion) {
  const year = new Date().getFullYear();
  const info = CULTURE_INFO[region];
  return {
    title: `Emoji Meanings in ${info.label} — Cultural Guide [${year}]`,
    description: `How emojis are used in ${info.label}. Cultural meanings, local interpretations, and usage context.`.slice(0, 155),
    canonical: `${SITE_URL}/culture/${region}`,
  };
}

export function generateCultureBreadcrumb(region: CultureRegion) {
  const info = CULTURE_INFO[region];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Cultures", item: `${SITE_URL}/culture` },
      { "@type": "ListItem", position: 3, name: info.label, item: `${SITE_URL}/culture/${region}` },
    ],
  };
}
```

- [ ] **Step 3: Verify it compiles**

```bash
npx tsc --noEmit
```

- [ ] **Step 4: Commit**

```bash
git add lib/seo.ts
git commit -m "feat: add SEO utilities for platform, comparison, combo, and culture pages"
```

---

### Task 9: New Components

**Files:**
- Create: `components/PlatformLinks.tsx`, `components/ComparisonRow.tsx`, `components/ComboDisplay.tsx`, `components/CopyAllButton.tsx`
- Modify: `components/CultureCard.tsx`

- [ ] **Step 1: Write PlatformLinks**

Write to `components/PlatformLinks.tsx`:

```tsx
import Link from "next/link";
import { PLATFORM_KEYS, PLATFORM_LABELS, PLATFORM_ICONS, PlatformKey } from "@/types/emoji";

interface PlatformLinksProps {
  emojiSlug: string;
  currentPlatform?: PlatformKey;
}

export default function PlatformLinks({ emojiSlug, currentPlatform }: PlatformLinksProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {PLATFORM_KEYS.map((platform) => (
        <Link
          key={platform}
          href={`/${platform}/${emojiSlug}`}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
            currentPlatform === platform
              ? "bg-primary text-white"
              : "bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-50"
          }`}
        >
          <span>{PLATFORM_ICONS[platform]}</span>
          <span>{PLATFORM_LABELS[platform]}</span>
        </Link>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Write ComparisonRow**

Write to `components/ComparisonRow.tsx`:

```tsx
interface ComparisonRowProps {
  label: string;
  emoji1Value: string;
  emoji2Value: string;
  color?: string;
}

export default function ComparisonRow({ label, emoji1Value, emoji2Value, color = "primary" }: ComparisonRowProps) {
  return (
    <div className="grid grid-cols-[1fr_auto_1fr] gap-4 py-3 border-b border-neutral-100 last:border-b-0">
      <p className="text-sm text-neutral-700">{emoji1Value}</p>
      <span className={`text-xs font-bold text-${color} self-center px-2`}>{label}</span>
      <p className="text-sm text-neutral-700 text-right">{emoji2Value}</p>
    </div>
  );
}
```

- [ ] **Step 3: Write CopyAllButton**

Write to `components/CopyAllButton.tsx`:

```tsx
"use client";

import { useState } from "react";

interface CopyAllButtonProps {
  emojis: string[];
  className?: string;
}

export default function CopyAllButton({ emojis, className = "" }: CopyAllButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(emojis.join(""));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={handleCopy}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
        copied ? "bg-accent-emerald text-white" : "bg-accent-emerald text-white hover:bg-emerald-700"
      } ${className}`}
    >
      {copied ? "Copied!" : `Copy All ${emojis.join("")}`}
    </button>
  );
}
```

- [ ] **Step 4: Write ComboDisplay**

Write to `components/ComboDisplay.tsx`:

```tsx
import Link from "next/link";
import CopyAllButton from "./CopyAllButton";

interface ComboDisplayProps {
  emojis: string[];
  label: string;
  primary?: boolean;
}

export default function ComboDisplay({ emojis, label, primary = false }: ComboDisplayProps) {
  return (
    <div className={`bg-white rounded-xl p-4 shadow-sm border border-neutral-100 ${primary ? "ring-2 ring-primary" : ""}`}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-neutral-600">{label}</span>
        {primary && <span className="text-xs px-2 py-0.5 bg-primary-light text-primary rounded-full font-medium">Top Pick</span>}
      </div>
      <div className="flex gap-1 text-4xl mb-3 flex-wrap">
        {emojis.map((emoji, i) => (
          <span key={i} className="hover:scale-110 transition-transform cursor-default">{emoji}</span>
        ))}
      </div>
      <CopyAllButton emojis={emojis} />
    </div>
  );
}
```

- [ ] **Step 5: Update CultureCard with all 25 regions**

Replace the content of `components/CultureCard.tsx`:

```tsx
import { CULTURE_INFO, CultureRegion } from "@/types/emoji";

interface CultureCardProps {
  region: string;
  meaning: string;
}

export default function CultureCard({ region, meaning }: CultureCardProps) {
  const info = CULTURE_INFO[region as CultureRegion];
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-neutral-100">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl">{info?.flag || "🌐"}</span>
        <h3 className="font-bold text-neutral-900 text-sm">{info?.label || region}</h3>
      </div>
      <p className="text-sm text-neutral-700">{meaning}</p>
    </div>
  );
}
```

- [ ] **Step 6: Verify types compile**

```bash
npx tsc --noEmit
```

- [ ] **Step 7: Commit**

```bash
git add components/PlatformLinks.tsx components/ComparisonRow.tsx components/ComboDisplay.tsx components/CopyAllButton.tsx components/CultureCard.tsx
git commit -m "feat: add PlatformLinks, ComparisonRow, ComboDisplay, CopyAllButton components"
```

---

### Task 10: Platform Page

**Files:**
- Create: `app/[platform]/[slug]/page.tsx`

- [ ] **Step 1: Write the platform page**

Write to `app/[platform]/[slug]/page.tsx`:

```tsx
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getEmojiBySlug, getAllSlugs } from "@/lib/mongodb";
import { generatePlatformMeta, generatePlatformBreadcrumb, generatePlatformFAQ } from "@/lib/seo";
import { PLATFORM_KEYS, PLATFORM_LABELS, PLATFORM_ICONS, PlatformKey } from "@/types/emoji";
import CopyButton from "@/components/CopyButton";
import PlatformLinks from "@/components/PlatformLinks";
import ClientShell from "@/components/ClientShell";
import Footer from "@/components/Footer";

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ platform: string; slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  const params: Array<{ platform: string; slug: string }> = [];
  for (const platform of PLATFORM_KEYS) {
    for (const slug of slugs) {
      params.push({ platform, slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { platform, slug } = await params;
  if (!PLATFORM_KEYS.includes(platform as PlatformKey)) return { title: "Not Found" };
  const emoji = await getEmojiBySlug(slug);
  if (!emoji) return { title: "Emoji Not Found" };
  const meta = generatePlatformMeta(emoji, platform as PlatformKey);
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: meta.canonical },
    openGraph: meta.openGraph,
  };
}

export default async function PlatformPage({ params }: PageProps) {
  const { platform, slug } = await params;
  if (!PLATFORM_KEYS.includes(platform as PlatformKey)) notFound();

  const emoji = await getEmojiBySlug(slug);
  if (!emoji) notFound();

  const platformKey = platform as PlatformKey;
  const platformData = emoji[platformKey] as Record<string, unknown> | undefined;
  const platformLabel = PLATFORM_LABELS[platformKey];
  const platformIcon = PLATFORM_ICONS[platformKey];

  const breadcrumbSchema = generatePlatformBreadcrumb(emoji, platformKey);
  const faqSchema = generatePlatformFAQ(emoji, platformKey);

  return (
    <ClientShell>
      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="text-sm text-neutral-400 mb-4">
          <a href="/" className="hover:text-primary">Home</a>{" › "}
          <span className="capitalize">{platformLabel}</span>{" › "}
          <span className="text-neutral-600">{emoji.character} {emoji.name}</span>
        </nav>

        {/* Hero */}
        <div className="bg-gradient-to-br from-primary-light to-violet-50 rounded-2xl p-6 sm:p-8 mb-6 flex flex-col sm:flex-row items-center gap-6">
          <span className="text-8xl sm:text-[128px] leading-none">{emoji.character}</span>
          <div className="text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-primary-dark mb-1">
              {emoji.name} on {platformLabel} {platformIcon}
            </h1>
            <p className="text-sm text-neutral-500 font-mono mb-3">{emoji.unicode} · {emoji.shortcode}</p>
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
              <CopyButton text={emoji.character} />
              <a href={`/emoji/${emoji.slug}`} className="px-3 py-1.5 rounded-full text-sm font-medium bg-neutral-100 text-neutral-700 hover:bg-neutral-200 transition-colors">
                See all meanings →
              </a>
            </div>
          </div>
        </div>

        {/* Platform meaning */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-primary-dark mb-4">
            {platformIcon} {platformLabel} Meaning
          </h2>
          {platformData ? (
            <div className="bg-white rounded-lg p-6 shadow-sm border border-neutral-100 space-y-4">
              {Object.entries(platformData).map(([key, value]) => {
                if (Array.isArray(value)) {
                  return (
                    <div key={key}>
                      <span className="text-sm text-neutral-500 capitalize block mb-1">{key.replace(/_/g, " ")}</span>
                      <div className="flex flex-wrap gap-1">
                        {value.map((tag: string) => (
                          <span key={tag} className="text-sm px-2 py-0.5 bg-primary-light text-primary rounded-full">{tag}</span>
                        ))}
                      </div>
                    </div>
                  );
                }
                if (typeof value === "number") {
                  return (
                    <div key={key} className="flex items-center justify-between">
                      <span className="text-sm text-neutral-500 capitalize">{key.replace(/_/g, " ")}</span>
                      <span className="font-medium text-accent-amber">{value}/100</span>
                    </div>
                  );
                }
                return (
                  <div key={key}>
                    <span className="text-xs text-neutral-500 capitalize block">{key.replace(/_/g, " ")}</span>
                    <p className="text-neutral-700">{String(value)}</p>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-neutral-500">No {platformLabel} data available for this emoji.</p>
          )}
        </section>

        {/* See on other platforms */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-primary-dark mb-4">See on Other Platforms</h2>
          <PlatformLinks emojiSlug={emoji.slug} currentPlatform={platformKey} />
        </section>
      </main>
      <Footer />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </ClientShell>
  );
}
```

- [ ] **Step 2: Verify it compiles**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add app/\[platform\]/
git commit -m "feat: add platform pages (/[platform]/[slug]) for 15 platforms"
```

---

### Task 11: Comparison Page

**Files:**
- Create: `app/vs/[slug]/page.tsx`

- [ ] **Step 1: Write the comparison page**

Write to `app/vs/[slug]/page.tsx`:

```tsx
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getComparisonBySlug, getAllComparisonSlugs, getRelatedComparisons } from "@/lib/mongodb";
import { generateComparisonMeta, generateComparisonFAQ } from "@/lib/seo";
import ComparisonRow from "@/components/ComparisonRow";
import ClientShell from "@/components/ClientShell";
import Footer from "@/components/Footer";
import Link from "next/link";

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllComparisonSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const comparison = await getComparisonBySlug(slug);
  if (!comparison) return { title: "Comparison Not Found" };
  const meta = generateComparisonMeta(comparison);
  return { title: meta.title, description: meta.description, alternates: { canonical: meta.canonical } };
}

export default async function ComparisonPage({ params }: PageProps) {
  const { slug } = await params;
  const comparison = await getComparisonBySlug(slug);
  if (!comparison) notFound();

  const related = await getRelatedComparisons(comparison.emoji1_slug, 5);
  const faqSchema = generateComparisonFAQ(comparison);

  const diffRows = Object.entries(comparison.differences).map(([key, value]) => ({
    label: key.charAt(0).toUpperCase() + key.slice(1),
    value: value,
  }));

  return (
    <ClientShell>
      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="text-sm text-neutral-400 mb-4">
          <a href="/" className="hover:text-primary">Home</a>{" › "}
          <span>Comparisons</span>{" › "}
          <span className="text-neutral-600">{comparison.emoji1_character} vs {comparison.emoji2_character}</span>
        </nav>

        {/* Hero */}
        <div className="bg-gradient-to-br from-primary-light to-violet-50 rounded-2xl p-6 sm:p-8 mb-6">
          <div className="flex items-center justify-center gap-6 sm:gap-12">
            <Link href={`/emoji/${comparison.emoji1_slug}`} className="text-center hover:scale-105 transition-transform">
              <span className="text-6xl sm:text-8xl block mb-2">{comparison.emoji1_character}</span>
              <span className="text-sm font-medium text-neutral-600">{comparison.emoji1_name}</span>
            </Link>
            <span className="text-2xl sm:text-4xl font-extrabold text-primary">VS</span>
            <Link href={`/emoji/${comparison.emoji2_slug}`} className="text-center hover:scale-105 transition-transform">
              <span className="text-6xl sm:text-8xl block mb-2">{comparison.emoji2_character}</span>
              <span className="text-sm font-medium text-neutral-600">{comparison.emoji2_name}</span>
            </Link>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-primary-dark text-center mt-4">
            {comparison.emoji1_name} vs {comparison.emoji2_name}
          </h1>
        </div>

        {/* Winner */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 text-center">
          <span className="text-sm font-medium text-accent-amber">🏆 Winner: {comparison.winner}</span>
          <p className="text-sm text-neutral-600 mt-1">{comparison.winner_reason}</p>
        </div>

        {/* Differences */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-primary-dark mb-4">Key Differences</h2>
          <div className="bg-white rounded-lg shadow-sm border border-neutral-100 p-4">
            <div className="grid grid-cols-[1fr_auto_1fr] gap-4 pb-2 border-b border-neutral-200 mb-2">
              <span className="text-sm font-bold text-neutral-900">{comparison.emoji1_character} {comparison.emoji1_name}</span>
              <span className="text-xs text-neutral-400">Category</span>
              <span className="text-sm font-bold text-neutral-900 text-right">{comparison.emoji2_character} {comparison.emoji2_name}</span>
            </div>
            {diffRows.map((row) => {
              const parts = row.value.split(/\bvs\.?\b|\bwhile\b|\bbut\b/i);
              return (
                <ComparisonRow
                  key={row.label}
                  label={row.label}
                  emoji1Value={parts[0]?.trim() || row.value}
                  emoji2Value={parts[1]?.trim() || ""}
                />
              );
            })}
          </div>
        </section>

        {/* When to use */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-primary-dark mb-4">When To Use Each</h2>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-neutral-100">
            <p className="text-neutral-700">{comparison.when_to_use}</p>
          </div>
        </section>

        {/* Related comparisons */}
        {related.length > 0 && (
          <section className="mb-10">
            <h2 className="text-lg font-bold text-primary-dark mb-4">Related Comparisons</h2>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {related.filter((r) => r.slug !== slug).map((r) => (
                <Link
                  key={r.slug}
                  href={`/vs/${r.slug}`}
                  className="flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm border border-neutral-100 hover:shadow-md transition-shadow"
                >
                  <span className="text-2xl">{r.emoji1_character}</span>
                  <span className="text-sm font-bold text-neutral-400">vs</span>
                  <span className="text-2xl">{r.emoji2_character}</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* FAQ */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-primary-dark mb-4">FAQ</h2>
          <div className="space-y-4">
            {faqSchema.mainEntity.map((faq: { name: string; acceptedAnswer: { text: string } }, i: number) => (
              <details key={i} className="bg-white rounded-lg shadow-sm border border-neutral-100 overflow-hidden">
                <summary className="px-4 py-3 cursor-pointer font-medium text-neutral-900 hover:bg-neutral-50">{faq.name}</summary>
                <p className="px-4 pb-4 text-sm text-neutral-600">{faq.acceptedAnswer.text}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
      <Footer />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </ClientShell>
  );
}
```

- [ ] **Step 2: Verify it compiles**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add app/vs/
git commit -m "feat: add comparison pages (/vs/[slug])"
```

---

### Task 12: Combo Page

**Files:**
- Create: `app/combo/[type]/page.tsx`

- [ ] **Step 1: Write the combo page**

Write to `app/combo/[type]/page.tsx`:

```tsx
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getComboBySlug, getAllComboSlugs, getRelatedCombos } from "@/lib/mongodb";
import { generateComboMeta } from "@/lib/seo";
import ComboDisplay from "@/components/ComboDisplay";
import ClientShell from "@/components/ClientShell";
import Footer from "@/components/Footer";
import Link from "next/link";

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ type: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllComboSlugs();
  return slugs.map((type) => ({ type }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { type } = await params;
  const combo = await getComboBySlug(type);
  if (!combo) return { title: "Combo Not Found" };
  const meta = generateComboMeta(combo);
  return { title: meta.title, description: meta.description, alternates: { canonical: meta.canonical } };
}

export default async function ComboPage({ params }: PageProps) {
  const { type } = await params;
  const combo = await getComboBySlug(type);
  if (!combo) notFound();

  const relatedCombos = await getRelatedCombos(6);

  return (
    <ClientShell>
      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="text-sm text-neutral-400 mb-4">
          <a href="/" className="hover:text-primary">Home</a>{" › "}
          <span>Combos</span>{" › "}
          <span className="text-neutral-600">{combo.theme}</span>
        </nav>

        {/* Hero */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-primary-dark mb-2">
            {combo.theme} Emoji Combos
          </h1>
          <p className="text-neutral-500">{combo.seo_description}</p>
        </div>

        {/* Primary combo */}
        {combo.combos[0] && (
          <div className="mb-6">
            <ComboDisplay emojis={combo.combos[0].emojis} label={combo.combos[0].label} primary />
          </div>
        )}

        {/* Alternate combos */}
        {combo.combos.length > 1 && (
          <section className="mb-10">
            <h2 className="text-lg font-bold text-primary-dark mb-4">More {combo.theme} Combos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {combo.combos.slice(1).map((c, i) => (
                <ComboDisplay key={i} emojis={c.emojis} label={c.label} />
              ))}
            </div>
          </section>
        )}

        {/* Related combos */}
        {relatedCombos.length > 0 && (
          <section className="mb-10">
            <h2 className="text-lg font-bold text-primary-dark mb-4">Related Combos</h2>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {relatedCombos.filter((r) => r.slug !== type).map((r) => (
                <Link
                  key={r.slug}
                  href={`/combo/${r.slug}`}
                  className="flex-shrink-0 px-4 py-3 bg-white rounded-xl shadow-sm border border-neutral-100 hover:shadow-md transition-shadow"
                >
                  <span className="text-2xl block mb-1">{r.combos[0]?.emojis.slice(0, 4).join("")}</span>
                  <span className="text-xs text-neutral-600 font-medium">{r.theme}</span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </ClientShell>
  );
}
```

- [ ] **Step 2: Verify it compiles**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add app/combo/
git commit -m "feat: add combo pages (/combo/[type])"
```

---

### Task 13: Culture Page

**Files:**
- Create: `app/culture/[region]/page.tsx`

- [ ] **Step 1: Write the culture page**

Write to `app/culture/[region]/page.tsx`:

```tsx
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getEmojisByCulture } from "@/lib/mongodb";
import { generateCultureMeta, generateCultureBreadcrumb } from "@/lib/seo";
import { CULTURE_REGIONS, CULTURE_INFO, CultureRegion } from "@/types/emoji";
import ClientShell from "@/components/ClientShell";
import Footer from "@/components/Footer";
import Link from "next/link";

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ region: string }>;
}

export async function generateStaticParams() {
  return CULTURE_REGIONS.map((region) => ({ region }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { region } = await params;
  if (!CULTURE_REGIONS.includes(region as CultureRegion)) return { title: "Not Found" };
  const meta = generateCultureMeta(region as CultureRegion);
  return { title: meta.title, description: meta.description, alternates: { canonical: meta.canonical } };
}

export default async function CulturePage({ params }: PageProps) {
  const { region } = await params;
  if (!CULTURE_REGIONS.includes(region as CultureRegion)) notFound();

  const regionKey = region as CultureRegion;
  const info = CULTURE_INFO[regionKey];
  const emojis = await getEmojisByCulture(regionKey);
  const breadcrumbSchema = generateCultureBreadcrumb(regionKey);

  return (
    <ClientShell>
      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="text-sm text-neutral-400 mb-4">
          <a href="/" className="hover:text-primary">Home</a>{" › "}
          <span>Cultures</span>{" › "}
          <span className="text-neutral-600">{info.label}</span>
        </nav>

        {/* Hero */}
        <div className="bg-gradient-to-br from-primary-light to-violet-50 rounded-2xl p-6 sm:p-8 mb-8 text-center">
          <span className="text-6xl block mb-3">{info.flag}</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-primary-dark">
            Emoji Meanings in {info.label}
          </h1>
          <p className="text-neutral-500 mt-2">
            How emojis are interpreted and used in {info.label}
          </p>
        </div>

        {/* Emoji grid */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-primary-dark mb-4">
            Top Emojis in {info.label}
          </h2>
          <div className="space-y-4">
            {emojis.map((emoji) => {
              const culturalMeaning = (emoji.cultures as Record<string, string>)?.[regionKey] || "";
              return (
                <Link
                  key={emoji.slug}
                  href={`/emoji/${emoji.slug}`}
                  className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm border border-neutral-100 hover:shadow-md transition-shadow"
                >
                  <span className="text-4xl flex-shrink-0">{emoji.character}</span>
                  <div>
                    <span className="font-medium text-neutral-900">{emoji.name}</span>
                    <p className="text-sm text-neutral-600 mt-1">{culturalMeaning}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Other cultures */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-primary-dark mb-4">Explore Other Cultures</h2>
          <div className="flex flex-wrap gap-2">
            {CULTURE_REGIONS.filter((r) => r !== regionKey).map((r) => {
              const rInfo = CULTURE_INFO[r];
              return (
                <Link
                  key={r}
                  href={`/culture/${r}`}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full text-sm border border-neutral-200 hover:bg-neutral-50 transition-colors"
                >
                  <span>{rInfo.flag}</span>
                  <span className="text-neutral-600">{rInfo.label}</span>
                </Link>
              );
            })}
          </div>
        </section>
      </main>
      <Footer />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </ClientShell>
  );
}
```

- [ ] **Step 2: Verify it compiles**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add app/culture/
git commit -m "feat: add culture pages (/culture/[region]) for 25 regions"
```

---

### Task 14: Update Emoji Page with Cross-Links

**Files:**
- Modify: `app/emoji/[slug]/page.tsx`

- [ ] **Step 1: Add PlatformLinks to the emoji page**

Read the current `app/emoji/[slug]/page.tsx`. Add the import:

```ts
import PlatformLinks from "@/components/PlatformLinks";
```

Then add a new section after the existing `<section id="related">` section (before the FAQ section):

```tsx
        {/* Platform links */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-primary-dark mb-4">See on Every Platform</h2>
          <PlatformLinks emojiSlug={emoji.slug} />
        </section>
```

- [ ] **Step 2: Verify it compiles**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add app/emoji/
git commit -m "feat: add platform cross-links to emoji page"
```

---

### Task 15: Update Sitemap to Index Pattern

**Files:**
- Modify: `app/sitemap.ts`

- [ ] **Step 1: Replace sitemap with sitemap index**

Replace the content of `app/sitemap.ts`:

```ts
import { MetadataRoute } from "next";
import { getAllSlugs, getAllComparisonSlugs, getAllComboSlugs } from "@/lib/mongodb";
import { PLATFORM_KEYS } from "@/types/emoji";
import { CULTURE_REGIONS } from "@/types/emoji";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://emojintel.com";
const MAX_PER_SITEMAP = 45000;

export async function generateSitemaps() {
  // Chunk 0: static pages + combos + cultures
  // Chunks 1-15: one per platform
  // Chunk 16: comparisons
  // Chunk 17: base emoji pages
  const ids = [];
  for (let i = 0; i <= 17; i++) {
    ids.push({ id: i });
  }
  return ids;
}

export default async function sitemap({ id }: { id: number }): Promise<MetadataRoute.Sitemap> {
  if (id === 0) {
    // Static pages + combos + cultures
    const comboSlugs = await getAllComboSlugs();
    return [
      { url: SITE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
      { url: `${SITE_URL}/search`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.5 },
      ...comboSlugs.map((slug) => ({
        url: `${SITE_URL}/combo/${slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.6,
      })),
      ...CULTURE_REGIONS.map((region) => ({
        url: `${SITE_URL}/culture/${region}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      })),
    ];
  }

  if (id >= 1 && id <= 15) {
    // Platform pages: one sitemap per platform
    const platformIndex = id - 1;
    const platform = PLATFORM_KEYS[platformIndex];
    const slugs = await getAllSlugs();
    return slugs.map((slug) => ({
      url: `${SITE_URL}/${platform}/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  }

  if (id === 16) {
    // Comparison pages
    const compSlugs = await getAllComparisonSlugs();
    return compSlugs.map((slug) => ({
      url: `${SITE_URL}/vs/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  }

  if (id === 17) {
    // Base emoji pages
    const slugs = await getAllSlugs();
    return slugs.map((slug) => ({
      url: `${SITE_URL}/emoji/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
  }

  return [];
}
```

- [ ] **Step 2: Verify it compiles**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add app/sitemap.ts
git commit -m "feat: update sitemap to index pattern for 57K+ URLs"
```

---

### Task 16: Final Verification + Production Build

**Files:**
- No new files

- [ ] **Step 1: Run TypeScript check**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 2: Run production build**

```bash
npm run build
```

Expected: Build succeeds without errors. Routes should include `/[platform]/[slug]`, `/vs/[slug]`, `/combo/[type]`, `/culture/[region]`.

- [ ] **Step 3: Fix any build errors**

If the build fails (likely due to MongoDB not being available at build time), ensure all new query functions in `lib/mongodb.ts` handle the `null` connection case by returning empty arrays/null (matching the existing pattern).

- [ ] **Step 4: Commit any fixes**

```bash
git add -A
git commit -m "fix: resolve build issues for SEO expansion pages"
```

---

## Post-Plan: Data Population

After implementation:

1. Run `npm run create-indexes` to add indexes for new collections
2. Run `npm run generate:all -- --force` to re-generate all emojis with 15 platforms + 25 cultures (~60 min, ~$22)
3. Run `npm run generate:comparisons` to generate comparison data (~15 min, ~$5)
4. Run `npm run generate:combos` to generate combo data (~3 min, ~$2)
5. Verify pages at `/tiktok/skull`, `/vs/skull-vs-ghost`, `/combo/birthday`, `/culture/pakistan`
