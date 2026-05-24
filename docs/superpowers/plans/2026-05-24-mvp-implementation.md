# Emoji Intelligence Platform — MVP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an SEO-first emoji meaning platform with 1000+ emoji pages, homepage with search, and dense internal linking — deployed on Vercel.

**Architecture:** Next.js 15 App Router with ISR serves 1000+ emoji meaning pages from MongoDB Atlas. A Claude API pipeline generates rich meaning data for each emoji. Fuse.js powers client-side fuzzy search. All pages include auto-generated SEO meta, JSON-LD structured data, and OG images.

**Tech Stack:** Next.js 15, TypeScript (strict), Tailwind CSS, MongoDB Atlas, Redis/Upstash, Fuse.js, Anthropic Claude API, @vercel/og, next-seo

**Spec:** `docs/superpowers/specs/2026-05-24-mvp-design.md`

---

### Task 1: Project Scaffolding

**Files:**
- Create: `package.json`, `tsconfig.json`, `tailwind.config.ts`, `postcss.config.mjs`, `app/layout.tsx`, `app/page.tsx`, `app/globals.css`, `.env.local.example`, `.gitignore`

- [ ] **Step 1: Create Next.js 15 project**

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*" --turbopack
```

Select defaults when prompted. This scaffolds the project in the current directory.

- [ ] **Step 2: Install dependencies**

```bash
npm install mongodb @anthropic-ai/sdk fuse.js @upstash/redis next-seo uuid
npm install -D @types/uuid
```

- [ ] **Step 3: Create .env.local.example**

```bash
# Create .env.local.example with all required env vars
```

Write to `.env.local.example`:
```
# MongoDB
MONGODB_URI=mongodb+srv://<user>:<pass>@<cluster>.mongodb.net/<db>?retryWrites=true&w=majority
MONGODB_DB=emoji-platform

# Redis / Upstash
UPSTASH_REDIS_REST_URL=https://<your-instance>.upstash.io
UPSTASH_REDIS_REST_TOKEN=<your-token>

# Anthropic Claude API
ANTHROPIC_API_KEY=sk-ant-<your-key>

# App
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Emoji Intelligence
```

- [ ] **Step 4: Update .gitignore**

Append to `.gitignore`:
```
.env.local
.superpowers/
```

- [ ] **Step 5: Create folder structure**

```bash
mkdir -p components lib types data scripts app/emoji/\[slug\] app/search app/api/emoji app/api/search-index
```

- [ ] **Step 6: Update tailwind.config.ts with design system colors**

Replace the content of `tailwind.config.ts`:

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#4F46E5",
          dark: "#1E1B4B",
          light: "#EEF2FF",
          300: "#A5B4FC",
        },
        accent: {
          emerald: "#059669",
          red: "#DC2626",
          amber: "#D97706",
          violet: "#7C3AED",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 7: Update app/globals.css**

Replace the content of `app/globals.css`:

```css
@import "tailwindcss";

@theme {
  --color-primary: #4F46E5;
  --color-primary-dark: #1E1B4B;
  --color-primary-light: #EEF2FF;
  --color-primary-300: #A5B4FC;
  --color-accent-emerald: #059669;
  --color-accent-red: #DC2626;
  --color-accent-amber: #D97706;
  --color-accent-violet: #7C3AED;
  --font-sans: "Inter", "system-ui", "sans-serif";
  --font-mono: "JetBrains Mono", "monospace";
}

body {
  font-family: var(--font-sans);
  color: #374151;
  background-color: #F9FAFB;
}
```

- [ ] **Step 8: Verify the dev server starts**

```bash
npm run dev
```

Expected: Server starts at localhost:3000 with no errors.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: scaffold Next.js 15 project with Tailwind and dependencies"
```

---

### Task 2: TypeScript Types

**Files:**
- Create: `types/emoji.ts`

- [ ] **Step 1: Write the EmojiDocument type and all sub-interfaces**

Write to `types/emoji.ts`:

```ts
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
```

- [ ] **Step 2: Verify types compile**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add types/emoji.ts
git commit -m "feat: add TypeScript types for emoji data model"
```

---

### Task 3: MongoDB Connection + Query Helpers

**Files:**
- Create: `lib/mongodb.ts`

- [ ] **Step 1: Write the MongoDB connection singleton**

Write to `lib/mongodb.ts`:

```ts
import { MongoClient, Db, Collection } from "mongodb";
import { EmojiDocument, EmojiSearchItem } from "@/types/emoji";

const MONGODB_URI = process.env.MONGODB_URI!;
const MONGODB_DB = process.env.MONGODB_DB || "emoji-platform";

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI environment variable is not set");
}

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

async function connectToDatabase(): Promise<{
  client: MongoClient;
  db: Db;
}> {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = await MongoClient.connect(MONGODB_URI);
  const db = client.db(MONGODB_DB);

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

function emojis(db: Db): Collection<EmojiDocument> {
  return db.collection<EmojiDocument>("emojis");
}

export async function getEmojiBySlug(
  slug: string
): Promise<EmojiDocument | null> {
  const { db } = await connectToDatabase();
  return emojis(db).findOne({ slug });
}

export async function getTrendingEmojis(
  limit: number = 10
): Promise<EmojiDocument[]> {
  const { db } = await connectToDatabase();
  return emojis(db)
    .find({})
    .sort({ "virality.trend_score": -1 })
    .limit(limit)
    .toArray();
}

export async function getAllSlugs(): Promise<string[]> {
  const { db } = await connectToDatabase();
  const docs = await emojis(db)
    .find({}, { projection: { slug: 1 } })
    .toArray();
  return docs.map((d) => d.slug);
}

export async function getSearchIndex(): Promise<EmojiSearchItem[]> {
  const { db } = await connectToDatabase();
  const docs = await emojis(db)
    .find(
      {},
      {
        projection: {
          slug: 1,
          name: 1,
          character: 1,
          tags: 1,
          category: 1,
          shortcode: 1,
          "genz_meaning.interpretation": 1,
        },
      }
    )
    .toArray();

  return docs.map((d) => ({
    slug: d.slug,
    name: d.name,
    character: d.character,
    tags: d.tags,
    category: d.category,
    shortcode: d.shortcode,
    genz_summary: d.genz_meaning?.interpretation?.slice(0, 80) || "",
  }));
}

export async function getRelatedEmojis(
  slugs: string[]
): Promise<EmojiDocument[]> {
  const { db } = await connectToDatabase();
  return emojis(db)
    .find({ slug: { $in: slugs } })
    .toArray();
}

export async function getEmojisByCategory(
  category: string,
  limit: number = 20
): Promise<EmojiDocument[]> {
  const { db } = await connectToDatabase();
  return emojis(db)
    .find({ category })
    .sort({ "virality.trend_score": -1 })
    .limit(limit)
    .toArray();
}

export async function getEmojiCount(): Promise<number> {
  const { db } = await connectToDatabase();
  return emojis(db).countDocuments();
}

export { connectToDatabase };
```

- [ ] **Step 2: Verify types compile**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add lib/mongodb.ts
git commit -m "feat: add MongoDB connection singleton and query helpers"
```

---

### Task 4: Seed Data

**Files:**
- Create: `data/seed-emojis.json`

- [ ] **Step 1: Create the seed emoji file with top 200 emojis**

Write to `data/seed-emojis.json` — a JSON array of `SeedEmoji` objects. Below are the first 30 entries as examples. The full file must contain 200 entries total — continue the pattern for the remaining 170 emojis covering the most commonly searched emojis across all Unicode categories (Smileys, People, Animals, Food, Travel, Objects, Symbols, Flags).

```json
[
  {
    "character": "😀",
    "name": "Grinning Face",
    "slug": "grinning-face",
    "unicode": "U+1F600",
    "shortcode": ":grinning:",
    "category": "Smileys & Emotion",
    "tags": ["smile", "happy", "grin", "joy", "cheerful"]
  },
  {
    "character": "😂",
    "name": "Face with Tears of Joy",
    "slug": "face-with-tears-of-joy",
    "unicode": "U+1F602",
    "shortcode": ":joy:",
    "category": "Smileys & Emotion",
    "tags": ["laughing", "crying laughing", "lol", "funny", "hilarious"]
  },
  {
    "character": "😭",
    "name": "Loudly Crying Face",
    "slug": "loudly-crying-face",
    "unicode": "U+1F62D",
    "shortcode": ":sob:",
    "category": "Smileys & Emotion",
    "tags": ["crying", "sad", "sobbing", "tears", "upset", "devastated"]
  },
  {
    "character": "🥺",
    "name": "Pleading Face",
    "slug": "pleading-face",
    "unicode": "U+1F97A",
    "shortcode": ":pleading_face:",
    "category": "Smileys & Emotion",
    "tags": ["puppy eyes", "please", "begging", "cute", "adorable"]
  },
  {
    "character": "😍",
    "name": "Smiling Face with Heart-Eyes",
    "slug": "heart-eyes",
    "unicode": "U+1F60D",
    "shortcode": ":heart_eyes:",
    "category": "Smileys & Emotion",
    "tags": ["love", "crush", "adore", "heart eyes", "infatuated"]
  },
  {
    "character": "🥰",
    "name": "Smiling Face with Hearts",
    "slug": "smiling-face-with-hearts",
    "unicode": "U+1F970",
    "shortcode": ":smiling_face_with_3_hearts:",
    "category": "Smileys & Emotion",
    "tags": ["love", "affection", "hearts", "adoring", "warm"]
  },
  {
    "character": "😊",
    "name": "Smiling Face with Smiling Eyes",
    "slug": "smiling-face-with-smiling-eyes",
    "unicode": "U+1F60A",
    "shortcode": ":blush:",
    "category": "Smileys & Emotion",
    "tags": ["blush", "happy", "warm", "friendly", "content"]
  },
  {
    "character": "😏",
    "name": "Smirking Face",
    "slug": "smirking-face",
    "unicode": "U+1F60F",
    "shortcode": ":smirk:",
    "category": "Smileys & Emotion",
    "tags": ["smirk", "suggestive", "sly", "flirty", "cocky"]
  },
  {
    "character": "😒",
    "name": "Unamused Face",
    "slug": "unamused-face",
    "unicode": "U+1F612",
    "shortcode": ":unamused:",
    "category": "Smileys & Emotion",
    "tags": ["annoyed", "dissatisfied", "unhappy", "side-eye", "unimpressed"]
  },
  {
    "character": "💀",
    "name": "Skull",
    "slug": "skull",
    "unicode": "U+1F480",
    "shortcode": ":skull:",
    "category": "Smileys & Emotion",
    "tags": ["dead", "death", "dying laughing", "i'm dead", "hilarious"]
  },
  {
    "character": "🔥",
    "name": "Fire",
    "slug": "fire",
    "unicode": "U+1F525",
    "shortcode": ":fire:",
    "category": "Travel & Places",
    "tags": ["hot", "lit", "amazing", "trending", "flame"]
  },
  {
    "character": "❤️",
    "name": "Red Heart",
    "slug": "red-heart",
    "unicode": "U+2764 U+FE0F",
    "shortcode": ":heart:",
    "category": "Smileys & Emotion",
    "tags": ["love", "heart", "romance", "passion", "valentine"]
  },
  {
    "character": "💔",
    "name": "Broken Heart",
    "slug": "broken-heart",
    "unicode": "U+1F494",
    "shortcode": ":broken_heart:",
    "category": "Smileys & Emotion",
    "tags": ["heartbreak", "sad", "breakup", "pain", "loss"]
  },
  {
    "character": "✨",
    "name": "Sparkles",
    "slug": "sparkles",
    "unicode": "U+2728",
    "shortcode": ":sparkles:",
    "category": "Activities",
    "tags": ["aesthetic", "magic", "special", "clean", "shiny", "glitter"]
  },
  {
    "character": "🤡",
    "name": "Clown Face",
    "slug": "clown-face",
    "unicode": "U+1F921",
    "shortcode": ":clown_face:",
    "category": "Smileys & Emotion",
    "tags": ["clown", "fool", "joke", "embarrassed", "played yourself"]
  },
  {
    "character": "🤮",
    "name": "Face Vomiting",
    "slug": "face-vomiting",
    "unicode": "U+1F92E",
    "shortcode": ":face_vomiting:",
    "category": "Smileys & Emotion",
    "tags": ["sick", "disgusted", "gross", "vomit", "nauseous"]
  },
  {
    "character": "😈",
    "name": "Smiling Face with Horns",
    "slug": "smiling-face-with-horns",
    "unicode": "U+1F608",
    "shortcode": ":smiling_imp:",
    "category": "Smileys & Emotion",
    "tags": ["devil", "naughty", "evil", "mischief", "trouble"]
  },
  {
    "character": "👀",
    "name": "Eyes",
    "slug": "eyes",
    "unicode": "U+1F440",
    "shortcode": ":eyes:",
    "category": "People & Body",
    "tags": ["looking", "watching", "side eye", "suspicious", "gossip"]
  },
  {
    "character": "💅",
    "name": "Nail Polish",
    "slug": "nail-polish",
    "unicode": "U+1F485",
    "shortcode": ":nail_care:",
    "category": "People & Body",
    "tags": ["sassy", "unbothered", "self-care", "queen", "confident"]
  },
  {
    "character": "🙄",
    "name": "Face with Rolling Eyes",
    "slug": "face-with-rolling-eyes",
    "unicode": "U+1F644",
    "shortcode": ":roll_eyes:",
    "category": "Smileys & Emotion",
    "tags": ["eye roll", "annoyed", "frustrated", "whatever", "exasperated"]
  },
  {
    "character": "🫠",
    "name": "Melting Face",
    "slug": "melting-face",
    "unicode": "U+1FAE0",
    "shortcode": ":melting_face:",
    "category": "Smileys & Emotion",
    "tags": ["melting", "hot", "embarrassed", "overwhelmed", "sarcasm"]
  },
  {
    "character": "🫡",
    "name": "Saluting Face",
    "slug": "saluting-face",
    "unicode": "U+1FAE1",
    "shortcode": ":saluting_face:",
    "category": "Smileys & Emotion",
    "tags": ["salute", "respect", "yes sir", "duty", "roger that"]
  },
  {
    "character": "🤭",
    "name": "Face with Hand Over Mouth",
    "slug": "face-with-hand-over-mouth",
    "unicode": "U+1F92D",
    "shortcode": ":shushing_face:",
    "category": "Smileys & Emotion",
    "tags": ["oops", "giggling", "secret", "covering laugh", "tee-hee"]
  },
  {
    "character": "😤",
    "name": "Face with Steam From Nose",
    "slug": "face-with-steam-from-nose",
    "unicode": "U+1F624",
    "shortcode": ":triumph:",
    "category": "Smileys & Emotion",
    "tags": ["angry", "frustrated", "determined", "huffing", "mad"]
  },
  {
    "character": "🥲",
    "name": "Smiling Face with Tear",
    "slug": "smiling-face-with-tear",
    "unicode": "U+1F972",
    "shortcode": ":smiling_face_with_tear:",
    "category": "Smileys & Emotion",
    "tags": ["bittersweet", "grateful sad", "pain smile", "its fine"]
  },
  {
    "character": "😶‍🌫️",
    "name": "Face in Clouds",
    "slug": "face-in-clouds",
    "unicode": "U+1F636 U+200D U+1F32B U+FE0F",
    "shortcode": ":face_in_clouds:",
    "category": "Smileys & Emotion",
    "tags": ["foggy", "confused", "dreamy", "spaced out", "dissociated"]
  },
  {
    "character": "💀",
    "name": "Skull",
    "slug": "skull",
    "unicode": "U+1F480",
    "shortcode": ":skull:",
    "category": "Smileys & Emotion",
    "tags": ["dead", "death", "dying laughing", "im dead", "hilarious"]
  },
  {
    "character": "👻",
    "name": "Ghost",
    "slug": "ghost",
    "unicode": "U+1F47B",
    "shortcode": ":ghost:",
    "category": "Smileys & Emotion",
    "tags": ["ghost", "halloween", "spooky", "boo", "disappear", "ghosting"]
  },
  {
    "character": "🤓",
    "name": "Nerd Face",
    "slug": "nerd-face",
    "unicode": "U+1F913",
    "shortcode": ":nerd_face:",
    "category": "Smileys & Emotion",
    "tags": ["nerd", "geek", "smart", "actually", "well actually"]
  },
  {
    "character": "🗿",
    "name": "Moai",
    "slug": "moai",
    "unicode": "U+1F5FF",
    "shortcode": ":moyai:",
    "category": "Travel & Places",
    "tags": ["stone face", "bruh", "deadpan", "chad", "sigma"]
  }
]
```

**Important:** The full `data/seed-emojis.json` must contain 200 entries. Continue adding emojis in order of popularity. Cover all major categories: remaining Smileys (😅😆😉😋😎😐😑😬😮😯😲😳😵🤔🤗🤐🤑🤒🤕🤠🤢🤣🤤🤥🤧🤨🤩🤪🤫🤬🤯🥳🥴🥵🥶🥸🫣🫤🫥🫦), Hearts (🖤🤍💜💙💚💛🧡🩷🩵🤎💕💖💗💘💝💞💟❣️), Hands (👍👎👏🤝🤞✌️🤟🤘🤙👋🫶🫰🤌✊👊🙏), People (🧑‍💻👩‍🎤🧑‍🍳💃🕺🏃‍♂️), Animals (🐶🐱🐻🦊🐸🐵🦁🐯🐨🐼🐧🦋🐝🐛), Food (🍕🍔🌮🍣🍩🍪🎂🍰🧁), Nature (🌸🌺🌻🌹🌈☀️🌙⭐🪻), Objects (💎👑🎮🎵🎶📱💻🔮🪩), Symbols (💯✅❌⚠️♻️), and popular Flags.

Remove the duplicate 💀 entry (appears at index 9 and 26 in the example above — keep only index 9).

- [ ] **Step 2: Verify JSON is valid**

```bash
node -e "const d = require('./data/seed-emojis.json'); console.log(d.length + ' emojis loaded'); const slugs = d.map(e => e.slug); const dupes = slugs.filter((s,i) => slugs.indexOf(s) !== i); if (dupes.length) { console.error('DUPLICATE SLUGS:', dupes); process.exit(1); } console.log('No duplicate slugs');"
```

Expected: `200 emojis loaded` and `No duplicate slugs`.

- [ ] **Step 3: Commit**

```bash
git add data/seed-emojis.json
git commit -m "feat: add seed data with top 200 emojis"
```

---

### Task 5: Claude Pipeline Script

**Files:**
- Create: `lib/claude.ts`, `scripts/generate-meanings.ts`

- [ ] **Step 1: Write the Claude API wrapper**

Write to `lib/claude.ts`:

```ts
import Anthropic from "@anthropic-ai/sdk";
import { EmojiDocument } from "@/types/emoji";

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
): Promise<Omit<EmojiDocument, keyof import("@/types/emoji").EmojiBase>> {
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
```

- [ ] **Step 2: Write the pipeline script**

Write to `scripts/generate-meanings.ts`:

```ts
import { MongoClient } from "mongodb";
import { v4 as uuidv4 } from "uuid";
import { generateEmojiMeanings } from "../lib/claude";
import seedEmojis from "../data/seed-emojis.json";
import type { SeedEmoji, EmojiDocument } from "../types/emoji";

const MONGODB_URI = process.env.MONGODB_URI!;
const MONGODB_DB = process.env.MONGODB_DB || "emoji-platform";
const RATE_LIMIT_MS = 6000; // 10 per minute

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  if (!MONGODB_URI) {
    console.error("MONGODB_URI is not set. Copy .env.local.example to .env.local and fill in values.");
    process.exit(1);
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    console.error("ANTHROPIC_API_KEY is not set.");
    process.exit(1);
  }

  const client = await MongoClient.connect(MONGODB_URI);
  const db = client.db(MONGODB_DB);
  const collection = db.collection<EmojiDocument>("emojis");

  const emojis = seedEmojis as SeedEmoji[];
  console.log(`Starting pipeline for ${emojis.length} emojis...`);

  let processed = 0;
  let skipped = 0;
  let errors = 0;

  for (const seed of emojis) {
    // Resume support: skip if already exists with meaning data
    const existing = await collection.findOne({ slug: seed.slug });
    if (existing?.official_meaning) {
      console.log(`  SKIP: ${seed.character} ${seed.name} (already has meaning data)`);
      skipped++;
      continue;
    }

    try {
      console.log(`  Generating: ${seed.character} ${seed.name}...`);
      const meanings = await generateEmojiMeanings(seed.character, seed.name);

      const doc: EmojiDocument = {
        emoji_id: existing?.emoji_id || uuidv4(),
        slug: seed.slug,
        unicode: seed.unicode,
        name: seed.name,
        character: seed.character,
        shortcode: seed.shortcode,
        category: seed.category,
        tags: seed.tags,
        created_at: existing?.created_at || new Date(),
        updated_at: new Date(),
        ...meanings,
      };

      await collection.updateOne(
        { slug: seed.slug },
        { $set: doc },
        { upsert: true }
      );

      processed++;
      console.log(`  ✓ ${seed.character} ${seed.name} (${processed}/${emojis.length - skipped})`);
    } catch (err) {
      errors++;
      console.error(`  ✗ ${seed.character} ${seed.name}: ${err}`);
    }

    // Rate limit
    await sleep(RATE_LIMIT_MS);
  }

  console.log(`\nDone! Processed: ${processed}, Skipped: ${skipped}, Errors: ${errors}`);
  await client.close();
}

main().catch(console.error);
```

- [ ] **Step 3: Add a script entry to package.json**

Add to `package.json` scripts section:
```json
"generate": "npx tsx scripts/generate-meanings.ts"
```

Note: Install tsx as a dev dependency for running TypeScript scripts:
```bash
npm install -D tsx
```

- [ ] **Step 4: Verify the script compiles**

```bash
npx tsc --noEmit
```

Expected: No errors. (The script won't actually run without env vars, but it should compile.)

- [ ] **Step 5: Commit**

```bash
git add lib/claude.ts scripts/generate-meanings.ts package.json
git commit -m "feat: add Claude pipeline for emoji meaning generation"
```

---

### Task 6: SEO Utilities

**Files:**
- Create: `lib/seo.ts`

- [ ] **Step 1: Write the SEO helper functions**

Write to `lib/seo.ts`:

```ts
import { EmojiDocument } from "@/types/emoji";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://emojintel.com";
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || "Emoji Intelligence";

export function generateEmojiMeta(emoji: EmojiDocument) {
  const year = new Date().getFullYear();
  return {
    title: `${emoji.character} ${emoji.name} Emoji Meaning — Gen-Z, TikTok, WhatsApp [${year}]`,
    description: `What does ${emoji.character} mean? Official, Gen-Z slang, dating, meme, and sarcastic meanings across TikTok, WhatsApp & Instagram.`.slice(
      0,
      155
    ),
    canonical: `${SITE_URL}/emoji/${emoji.slug}`,
    openGraph: {
      title: `${emoji.character} ${emoji.name} Emoji Meaning`,
      description: `Discover what ${emoji.character} really means across platforms, cultures, and Gen-Z slang.`,
      url: `${SITE_URL}/emoji/${emoji.slug}`,
      siteName: SITE_NAME,
      type: "article" as const,
    },
  };
}

export function generateFAQSchema(emoji: EmojiDocument) {
  const year = new Date().getFullYear();
  const faqs = [
    {
      question: `What does the ${emoji.character} ${emoji.name} emoji mean?`,
      answer: emoji.official_meaning.description,
    },
    {
      question: `What does ${emoji.character} mean on TikTok?`,
      answer: emoji.tiktok.meaning,
    },
    {
      question: `What does ${emoji.character} mean on WhatsApp?`,
      answer: emoji.whatsapp.chat_meaning,
    },
    {
      question: `What does ${emoji.character} mean in Gen-Z slang?`,
      answer: emoji.genz_meaning.interpretation,
    },
    {
      question: `Is the ${emoji.character} emoji safe to use?`,
      answer: emoji.safety.safe_meaning,
    },
    {
      question: `What does ${emoji.character} mean in texting?`,
      answer: emoji.emotional_meaning.psychology_note,
    },
    {
      question: `What is the shortcode for ${emoji.character}?`,
      answer: `The shortcode for ${emoji.name} is ${emoji.shortcode}`,
    },
    {
      question: `What does ${emoji.character} mean in dating?`,
      answer: emoji.dating_meaning.flirt_usage,
    },
  ];

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function generateBreadcrumbSchema(emoji: EmojiDocument) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Emojis",
        item: `${SITE_URL}/emoji`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${emoji.character} ${emoji.name}`,
        item: `${SITE_URL}/emoji/${emoji.slug}`,
      },
    ],
  };
}

export function generateHomeMeta() {
  return {
    title: `${SITE_NAME} — Every Emoji. Every Meaning.`,
    description:
      "Discover what every emoji really means. Gen-Z slang, TikTok meanings, cultural intelligence, and platform-specific usage for 1000+ emojis.",
    canonical: SITE_URL,
  };
}
```

- [ ] **Step 2: Verify types compile**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add lib/seo.ts
git commit -m "feat: add SEO utilities for meta tags and JSON-LD schema"
```

---

### Task 7: Root Layout + Navbar + Footer

**Files:**
- Create: `components/Navbar.tsx`, `components/Footer.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Write the Navbar component**

Write to `components/Navbar.tsx`:

```tsx
"use client";

import { useState } from "react";
import Link from "next/link";

interface NavbarProps {
  onSearchClick: () => void;
}

export default function Navbar({ onSearchClick }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🧠</span>
            <span className="text-lg font-bold text-primary-dark">
              Emoji Intelligence
            </span>
          </Link>

          {/* Search button */}
          <button
            onClick={onSearchClick}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-500 transition-colors text-sm"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <span className="hidden sm:inline">Search emojis...</span>
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-neutral-200 text-xs text-neutral-500 font-mono">
              ⌘K
            </kbd>
          </button>
        </div>
      </div>
    </nav>
  );
}
```

- [ ] **Step 2: Write the Footer component**

Write to `components/Footer.tsx`:

```tsx
import Link from "next/link";

const footerLinks = {
  popular: [
    { name: "💀 Skull", href: "/emoji/skull" },
    { name: "😭 Crying", href: "/emoji/loudly-crying-face" },
    { name: "🔥 Fire", href: "/emoji/fire" },
    { name: "❤️ Heart", href: "/emoji/red-heart" },
    { name: "😂 Joy", href: "/emoji/face-with-tears-of-joy" },
    { name: "💅 Nail Polish", href: "/emoji/nail-polish" },
  ],
  categories: [
    { name: "Smileys & Emotion", href: "/emoji" },
    { name: "People & Body", href: "/emoji" },
    { name: "Animals & Nature", href: "/emoji" },
    { name: "Food & Drink", href: "/emoji" },
    { name: "Travel & Places", href: "/emoji" },
  ],
  company: [
    { name: "About", href: "/about" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Sitemap", href: "/sitemap.xml" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🧠</span>
              <span className="text-lg font-bold text-white">
                Emoji Intelligence
              </span>
            </div>
            <p className="text-sm">
              The world&apos;s most comprehensive emoji meaning platform. Gen-Z
              slang, platform context, and cultural intelligence.
            </p>
          </div>

          {/* Popular Emojis */}
          <div>
            <h3 className="text-white font-semibold mb-4">Popular Emojis</h3>
            <ul className="space-y-2 text-sm">
              {footerLinks.popular.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              {footerLinks.categories.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-800 mt-12 pt-8 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} Emoji Intelligence. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: Update the root layout**

Replace the content of `app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: {
    default: "Emoji Intelligence — Every Emoji. Every Meaning.",
    template: "%s | Emoji Intelligence",
  },
  description:
    "Discover what every emoji really means. Gen-Z slang, TikTok meanings, cultural intelligence, and platform-specific usage for 1000+ emojis.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased bg-neutral-50 text-neutral-700">
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 4: Verify the dev server renders without errors**

```bash
npm run dev
```

Visit localhost:3000. Expected: Page loads with no console errors.

- [ ] **Step 5: Commit**

```bash
git add components/Navbar.tsx components/Footer.tsx app/layout.tsx
git commit -m "feat: add root layout with Navbar and Footer components"
```

---

### Task 8: Emoji Display Components

**Files:**
- Create: `components/EmojiCard.tsx`, `components/MeaningCard.tsx`, `components/PlatformCard.tsx`, `components/CultureCard.tsx`, `components/TimelineSection.tsx`, `components/RelatedEmojis.tsx`, `components/StickyTOC.tsx`, `components/CopyButton.tsx`

- [ ] **Step 1: Write CopyButton (reused everywhere)**

Write to `components/CopyButton.tsx`:

```tsx
"use client";

import { useState } from "react";

interface CopyButtonProps {
  text: string;
  label?: string;
  className?: string;
}

export default function CopyButton({
  text,
  label,
  className = "",
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={handleCopy}
      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
        copied
          ? "bg-accent-emerald text-white"
          : "bg-primary text-white hover:bg-primary-dark"
      } ${className}`}
    >
      {copied ? "Copied!" : label || `Copy ${text}`}
    </button>
  );
}
```

- [ ] **Step 2: Write EmojiCard**

Write to `components/EmojiCard.tsx`:

```tsx
import Link from "next/link";

interface EmojiCardProps {
  character: string;
  name: string;
  slug: string;
  trendScore?: number;
}

export default function EmojiCard({
  character,
  name,
  slug,
  trendScore,
}: EmojiCardProps) {
  return (
    <Link
      href={`/emoji/${slug}`}
      className="flex flex-col items-center gap-1 p-3 bg-white rounded-xl shadow-sm hover:shadow-md hover:scale-105 transition-all border border-neutral-100"
    >
      <span className="text-4xl">{character}</span>
      <span className="text-xs text-neutral-600 font-medium text-center truncate w-full">
        {name}
      </span>
      {trendScore !== undefined && (
        <span className="text-xs px-2 py-0.5 rounded-full bg-amber-50 text-accent-amber font-medium">
          🔥 {trendScore}
        </span>
      )}
    </Link>
  );
}
```

- [ ] **Step 3: Write MeaningCard**

Write to `components/MeaningCard.tsx`:

```tsx
const borderColors: Record<string, string> = {
  official: "border-l-primary",
  genz: "border-l-accent-violet",
  emotional: "border-l-accent-emerald",
  dating: "border-l-accent-red",
  meme: "border-l-accent-amber",
  sarcastic: "border-l-neutral-400",
};

const labelColors: Record<string, string> = {
  official: "text-primary",
  genz: "text-accent-violet",
  emotional: "text-accent-emerald",
  dating: "text-accent-red",
  meme: "text-accent-amber",
  sarcastic: "text-neutral-500",
};

interface MeaningCardProps {
  type: string;
  label: string;
  content: Record<string, string | number | boolean>;
}

export default function MeaningCard({ type, label, content }: MeaningCardProps) {
  return (
    <div
      className={`bg-white rounded-lg p-4 border-l-4 shadow-sm ${
        borderColors[type] || "border-l-neutral-300"
      }`}
    >
      <h3
        className={`text-sm font-bold mb-2 ${
          labelColors[type] || "text-neutral-600"
        }`}
      >
        {label}
      </h3>
      <div className="space-y-1.5">
        {Object.entries(content).map(([key, value]) => {
          if (typeof value === "boolean") {
            return (
              <div key={key} className="flex items-center gap-2 text-sm">
                <span className="text-neutral-500 capitalize">
                  {key.replace(/_/g, " ")}:
                </span>
                <span className={value ? "text-accent-red" : "text-accent-emerald"}>
                  {value ? "Yes" : "No"}
                </span>
              </div>
            );
          }
          if (typeof value === "number") {
            return (
              <div key={key} className="flex items-center gap-2 text-sm">
                <span className="text-neutral-500 capitalize">
                  {key.replace(/_/g, " ")}:
                </span>
                <span className="font-medium text-neutral-800">{value}/10</span>
              </div>
            );
          }
          return (
            <p key={key} className="text-sm text-neutral-700">
              {String(value)}
            </p>
          );
        })}
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Write PlatformCard**

Write to `components/PlatformCard.tsx`:

```tsx
const platformIcons: Record<string, string> = {
  tiktok: "🎵",
  whatsapp: "💬",
  instagram: "📸",
};

interface PlatformCardProps {
  platform: string;
  data: Record<string, string | string[] | number>;
}

export default function PlatformCard({ platform, data }: PlatformCardProps) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-neutral-100">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xl">{platformIcons[platform] || "📱"}</span>
        <h3 className="font-bold text-neutral-900 capitalize">{platform}</h3>
      </div>
      <div className="space-y-2">
        {Object.entries(data).map(([key, value]) => {
          if (Array.isArray(value)) {
            return (
              <div key={key}>
                <span className="text-xs text-neutral-500 capitalize">
                  {key.replace(/_/g, " ")}
                </span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {value.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 bg-primary-light text-primary rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          }
          if (typeof value === "number") {
            return (
              <div key={key} className="flex items-center justify-between text-sm">
                <span className="text-neutral-500 capitalize">
                  {key.replace(/_/g, " ")}
                </span>
                <span className="font-medium text-accent-amber">{value}/100</span>
              </div>
            );
          }
          return (
            <div key={key} className="text-sm">
              <span className="text-neutral-500 capitalize block text-xs">
                {key.replace(/_/g, " ")}
              </span>
              <p className="text-neutral-700">{String(value)}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Write CultureCard**

Write to `components/CultureCard.tsx`:

```tsx
const regionFlags: Record<string, string> = {
  western_genz: "🇺🇸",
  pakistan_india: "🇵🇰",
  middle_east: "🇸🇦",
  global_neutral: "🌍",
};

const regionLabels: Record<string, string> = {
  western_genz: "Western / Gen-Z",
  pakistan_india: "Pakistan & India",
  middle_east: "Middle East",
  global_neutral: "Global Neutral",
};

interface CultureCardProps {
  region: string;
  meaning: string;
}

export default function CultureCard({ region, meaning }: CultureCardProps) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-neutral-100">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl">{regionFlags[region] || "🌐"}</span>
        <h3 className="font-bold text-neutral-900 text-sm">
          {regionLabels[region] || region}
        </h3>
      </div>
      <p className="text-sm text-neutral-700">{meaning}</p>
    </div>
  );
}
```

- [ ] **Step 6: Write TimelineSection**

Write to `components/TimelineSection.tsx`:

```tsx
interface TimelineSectionProps {
  timeEvolution: {
    usage_2010: string;
    usage_2015: string;
    usage_2020: string;
    usage_2026: string;
  };
}

const years = [
  { key: "usage_2010", year: "2010" },
  { key: "usage_2015", year: "2015" },
  { key: "usage_2020", year: "2020" },
  { key: "usage_2026", year: "2026" },
] as const;

export default function TimelineSection({
  timeEvolution,
}: TimelineSectionProps) {
  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-primary-300 sm:hidden" />

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {years.map(({ key, year }, i) => (
          <div key={key} className="relative pl-10 sm:pl-0">
            {/* Mobile dot */}
            <div className="absolute left-2.5 top-1 w-3 h-3 rounded-full bg-primary border-2 border-white sm:hidden" />

            <div className="bg-white rounded-lg p-4 shadow-sm border border-neutral-100">
              <div className="text-sm font-bold text-primary mb-1">{year}</div>
              <p className="text-sm text-neutral-700">
                {timeEvolution[key]}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 7: Write RelatedEmojis**

Write to `components/RelatedEmojis.tsx`:

```tsx
import EmojiCard from "./EmojiCard";
import { EmojiDocument } from "@/types/emoji";

interface RelatedEmojisProps {
  emojis: Pick<EmojiDocument, "character" | "name" | "slug">[];
  title?: string;
}

export default function RelatedEmojis({
  emojis,
  title = "Related Emojis",
}: RelatedEmojisProps) {
  if (emojis.length === 0) return null;

  return (
    <div>
      <h2 className="text-lg font-bold text-primary-dark mb-4">{title}</h2>
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {emojis.map((emoji) => (
          <div key={emoji.slug} className="flex-shrink-0">
            <EmojiCard
              character={emoji.character}
              name={emoji.name}
              slug={emoji.slug}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 8: Write StickyTOC**

Write to `components/StickyTOC.tsx`:

```tsx
"use client";

import { useState, useEffect } from "react";

const sections = [
  { id: "meanings", label: "Meanings" },
  { id: "platforms", label: "Platforms" },
  { id: "cultures", label: "Cultures" },
  { id: "timeline", label: "Timeline" },
  { id: "related", label: "Related" },
  { id: "faq", label: "FAQ" },
];

export default function StickyTOC() {
  const [active, setActive] = useState("meanings");

  useEffect(() => {
    function onScroll() {
      for (const section of [...sections].reverse()) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            setActive(section.id);
            break;
          }
        }
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) {
      const offset = 100;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }

  return (
    <nav className="sticky top-16 z-40 bg-white/90 backdrop-blur-sm border-b border-neutral-200 -mx-4 px-4 sm:mx-0 sm:px-0 sm:rounded-lg">
      <div className="flex gap-1 overflow-x-auto py-2 scrollbar-hide">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollTo(section.id)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              active === section.id
                ? "bg-primary text-white"
                : "text-neutral-500 hover:text-neutral-800 hover:bg-neutral-100"
            }`}
          >
            {section.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
```

- [ ] **Step 9: Verify all components compile**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 10: Commit**

```bash
git add components/
git commit -m "feat: add emoji display components (cards, meanings, platforms, cultures, timeline, TOC)"
```

---

### Task 9: Emoji [slug] Page with ISR

**Files:**
- Create: `app/emoji/[slug]/page.tsx`

- [ ] **Step 1: Write the emoji page**

Write to `app/emoji/[slug]/page.tsx`:

```tsx
import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
  getEmojiBySlug,
  getAllSlugs,
  getRelatedEmojis,
} from "@/lib/mongodb";
import {
  generateEmojiMeta,
  generateFAQSchema,
  generateBreadcrumbSchema,
} from "@/lib/seo";
import CopyButton from "@/components/CopyButton";
import MeaningCard from "@/components/MeaningCard";
import PlatformCard from "@/components/PlatformCard";
import CultureCard from "@/components/CultureCard";
import TimelineSection from "@/components/TimelineSection";
import RelatedEmojis from "@/components/RelatedEmojis";
import StickyTOC from "@/components/StickyTOC";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const revalidate = 3600; // ISR: revalidate every hour

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const emoji = await getEmojiBySlug(slug);
  if (!emoji) return { title: "Emoji Not Found" };

  const meta = generateEmojiMeta(emoji);
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: meta.canonical },
    openGraph: meta.openGraph,
  };
}

export default async function EmojiPage({ params }: PageProps) {
  const { slug } = await params;
  const emoji = await getEmojiBySlug(slug);
  if (!emoji) notFound();

  const relatedEmojis = await getRelatedEmojis(
    emoji.relations?.related?.slice(0, 15) || []
  );

  const faqSchema = generateFAQSchema(emoji);
  const breadcrumbSchema = generateBreadcrumbSchema(emoji);

  return (
    <>
      <Navbar onSearchClick={() => {}} />

      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="text-sm text-neutral-400 mb-4">
          <a href="/" className="hover:text-primary">Home</a>
          {" › "}
          <a href="/emoji" className="hover:text-primary">Emojis</a>
          {" › "}
          <span className="text-neutral-600">
            {emoji.character} {emoji.name}
          </span>
        </nav>

        {/* Hero */}
        <div className="bg-gradient-to-br from-primary-light to-violet-50 rounded-2xl p-6 sm:p-8 mb-6 flex flex-col sm:flex-row items-center gap-6">
          <span className="text-8xl sm:text-[128px] leading-none">
            {emoji.character}
          </span>
          <div className="text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-primary-dark mb-1">
              {emoji.name} Emoji
            </h1>
            <p className="text-sm text-neutral-500 font-mono mb-3">
              {emoji.unicode} · {emoji.shortcode}
            </p>
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
              <CopyButton text={emoji.character} />
              <CopyButton
                text={emoji.shortcode}
                label={emoji.shortcode}
                className="bg-neutral-100 !text-neutral-700 hover:!bg-neutral-200"
              />
              {emoji.virality?.trend_score != null && (
                <span className="px-3 py-1.5 rounded-full text-sm font-medium bg-amber-50 text-accent-amber">
                  🔥 {emoji.virality.trend_score}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Sticky TOC */}
        <StickyTOC />

        {/* Meanings */}
        <section id="meanings" className="mt-8 mb-10">
          <h2 className="text-xl font-bold text-primary-dark mb-4">
            Meaning Layers
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MeaningCard
              type="official"
              label="Official"
              content={{
                description: emoji.official_meaning?.description || "",
                original_intent: emoji.official_meaning?.original_intent || "",
              }}
            />
            <MeaningCard
              type="genz"
              label="Gen-Z"
              content={{
                interpretation: emoji.genz_meaning?.interpretation || "",
                tiktok_usage: emoji.genz_meaning?.tiktok_usage || "",
                irony_level: emoji.genz_meaning?.irony_level ?? 0,
              }}
            />
            <MeaningCard
              type="emotional"
              label="Emotional"
              content={{
                emotion_type: emoji.emotional_meaning?.emotion_type || "",
                intensity: emoji.emotional_meaning?.intensity ?? 0,
                psychology_note: emoji.emotional_meaning?.psychology_note || "",
              }}
            />
            <MeaningCard
              type="dating"
              label="Dating"
              content={{
                flirt_usage: emoji.dating_meaning?.flirt_usage || "",
                relationship_context: emoji.dating_meaning?.relationship_context || "",
                red_flag: emoji.dating_meaning?.red_flag ?? false,
              }}
            />
            <MeaningCard
              type="meme"
              label="Meme"
              content={{
                viral_usage: emoji.meme_meaning?.viral_usage || "",
                irony_level: emoji.meme_meaning?.irony_level ?? 0,
              }}
            />
            <MeaningCard
              type="sarcastic"
              label="Sarcastic"
              content={{
                passive_aggressive: emoji.sarcastic_meaning?.passive_aggressive || "",
                meme_sarcasm: emoji.sarcastic_meaning?.meme_sarcasm || "",
              }}
            />
          </div>
        </section>

        {/* Platforms */}
        <section id="platforms" className="mb-10">
          <h2 className="text-xl font-bold text-primary-dark mb-4">
            Platform Meanings
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {emoji.tiktok && (
              <PlatformCard platform="tiktok" data={emoji.tiktok} />
            )}
            {emoji.whatsapp && (
              <PlatformCard platform="whatsapp" data={emoji.whatsapp} />
            )}
            {emoji.instagram && (
              <PlatformCard platform="instagram" data={emoji.instagram} />
            )}
          </div>
        </section>

        {/* Cultures */}
        <section id="cultures" className="mb-10">
          <h2 className="text-xl font-bold text-primary-dark mb-4">
            Cultural Meanings
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {emoji.cultures &&
              Object.entries(emoji.cultures).map(([region, meaning]) => (
                <CultureCard
                  key={region}
                  region={region}
                  meaning={meaning as string}
                />
              ))}
          </div>
        </section>

        {/* Timeline */}
        <section id="timeline" className="mb-10">
          <h2 className="text-xl font-bold text-primary-dark mb-4">
            Meaning Evolution
          </h2>
          {emoji.time_evolution && (
            <TimelineSection timeEvolution={emoji.time_evolution} />
          )}
        </section>

        {/* Related */}
        <section id="related" className="mb-10">
          <RelatedEmojis emojis={relatedEmojis} />
        </section>

        {/* FAQ */}
        <section id="faq" className="mb-10">
          <h2 className="text-xl font-bold text-primary-dark mb-4">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqSchema.mainEntity.map(
              (faq: { name: string; acceptedAnswer: { text: string } }, i: number) => (
                <details
                  key={i}
                  className="bg-white rounded-lg shadow-sm border border-neutral-100 overflow-hidden"
                >
                  <summary className="px-4 py-3 cursor-pointer font-medium text-neutral-900 hover:bg-neutral-50">
                    {faq.name}
                  </summary>
                  <p className="px-4 pb-4 text-sm text-neutral-600">
                    {faq.acceptedAnswer.text}
                  </p>
                </details>
              )
            )}
          </div>
        </section>

        {/* Safety */}
        {emoji.safety && (
          <section className="mb-10">
            <h2 className="text-xl font-bold text-primary-dark mb-4">
              Safety & Usage
            </h2>
            <div className="flex flex-wrap gap-3">
              <span className="px-3 py-1.5 rounded-full text-sm bg-emerald-50 text-accent-emerald font-medium">
                ✅ {emoji.safety.safe_meaning}
              </span>
              {emoji.safety.toxic_meaning && (
                <span className="px-3 py-1.5 rounded-full text-sm bg-red-50 text-accent-red font-medium">
                  ⚠️ {emoji.safety.toxic_meaning}
                </span>
              )}
              {emoji.safety.nsfw && (
                <span className="px-3 py-1.5 rounded-full text-sm bg-red-100 text-accent-red font-bold">
                  🔞 NSFW
                </span>
              )}
            </div>
            {emoji.safety.warning_notes && (
              <p className="mt-2 text-sm text-neutral-500">
                {emoji.safety.warning_notes}
              </p>
            )}
          </section>
        )}
      </main>

      <Footer />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
```

- [ ] **Step 2: Verify types compile**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add app/emoji/
git commit -m "feat: add emoji [slug] page with ISR, meanings, platforms, cultures, timeline, FAQ"
```

---

### Task 10: Homepage

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Write the homepage with split hero**

Replace the content of `app/page.tsx`:

```tsx
import Link from "next/link";
import { getTrendingEmojis, getEmojiCount } from "@/lib/mongodb";
import EmojiCard from "@/components/EmojiCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const revalidate = 300; // Revalidate every 5 minutes

export default async function HomePage() {
  const trending = await getTrendingEmojis(12);
  const emojiCount = await getEmojiCount();

  const heroEmojis = trending.slice(0, 6);
  const trendingRow = trending.slice(0, 10);

  const stats = [
    { label: "Emojis", value: `${emojiCount.toLocaleString()}+` },
    { label: "Platforms", value: "3" },
    { label: "Cultures", value: "4+" },
    { label: "Powered", value: "AI" },
  ];

  return (
    <>
      <Navbar onSearchClick={() => {}} />

      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-[#F8F7FF] to-[#EEF2FF] py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left column */}
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                  ✨ AI-Powered
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-primary-dark leading-tight mb-4">
                  Every Emoji.{" "}
                  <span className="bg-gradient-to-r from-primary to-accent-violet bg-clip-text text-transparent">
                    Every Meaning.
                  </span>
                </h1>
                <p className="text-lg text-neutral-500 mb-8">
                  Gen-Z slang · Platform context · Cultural intelligence · AI-powered search
                </p>

                {/* Search bar (triggers modal — placeholder for now) */}
                <div className="relative max-w-lg">
                  <div className="flex items-center gap-3 px-5 py-4 bg-white rounded-full shadow-lg border border-neutral-200 cursor-pointer hover:shadow-xl transition-shadow">
                    <span className="text-xl">🔍</span>
                    <span className="text-neutral-400">
                      Search any emoji or feeling...
                    </span>
                  </div>
                </div>

                {/* Trending pills */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {heroEmojis.slice(0, 4).map((e) => (
                    <Link
                      key={e.slug}
                      href={`/emoji/${e.slug}`}
                      className="px-3 py-1 rounded-full bg-white/70 text-sm text-neutral-600 hover:bg-white hover:shadow-sm transition-all"
                    >
                      {e.character} {e.name.toLowerCase()}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Right column — emoji grid */}
              <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto lg:mx-0 lg:ml-auto">
                {heroEmojis.slice(0, 5).map((e) => (
                  <Link
                    key={e.slug}
                    href={`/emoji/${e.slug}`}
                    className="flex flex-col items-center gap-1 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
                  >
                    <span className="text-4xl">{e.character}</span>
                    <span className="text-xs text-neutral-600 font-medium text-center">
                      {e.name}
                    </span>
                  </Link>
                ))}
                <Link
                  href="/emoji"
                  className="flex flex-col items-center justify-center gap-1 p-4 bg-primary rounded-xl text-white hover:bg-primary-dark transition-colors"
                >
                  <span className="text-lg font-bold">{emojiCount}+</span>
                  <span className="text-xs">more</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-8 border-b border-neutral-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="text-center p-4 bg-white rounded-xl shadow-sm"
                >
                  <div className="text-2xl font-bold text-primary">
                    {stat.value}
                  </div>
                  <div className="text-sm text-neutral-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trending Now */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-primary-dark mb-6">
              🔥 Trending Now
            </h2>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {trendingRow.map((e) => (
                <div key={e.slug} className="flex-shrink-0">
                  <EmojiCard
                    character={e.character}
                    name={e.name}
                    slug={e.slug}
                    trendScore={e.virality?.trend_score}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Verify types compile**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: add homepage with split hero, stats, and trending section"
```

---

### Task 11: Search Modal + Fuse.js

**Files:**
- Create: `lib/search.ts`, `components/SearchModal.tsx`, `components/ClientShell.tsx`
- Create: `app/api/search-index/route.ts`

- [ ] **Step 1: Write the Fuse.js search utility**

Write to `lib/search.ts`:

```ts
import Fuse from "fuse.js";
import { EmojiSearchItem } from "@/types/emoji";

const fuseOptions: Fuse.IFuseOptions<EmojiSearchItem> = {
  keys: [
    { name: "name", weight: 1.0 },
    { name: "tags", weight: 0.8 },
    { name: "genz_summary", weight: 0.7 },
    { name: "shortcode", weight: 0.6 },
    { name: "category", weight: 0.5 },
  ],
  threshold: 0.4,
  includeScore: true,
  minMatchCharLength: 2,
};

export function createSearchIndex(items: EmojiSearchItem[]): Fuse<EmojiSearchItem> {
  return new Fuse(items, fuseOptions);
}

export function searchEmojis(
  fuse: Fuse<EmojiSearchItem>,
  query: string,
  limit: number = 20
): EmojiSearchItem[] {
  if (!query.trim()) return [];
  const results = fuse.search(query, { limit });
  return results.map((r) => r.item);
}
```

- [ ] **Step 2: Write the search index API route**

Write to `app/api/search-index/route.ts`:

```ts
import { NextResponse } from "next/server";
import { getSearchIndex } from "@/lib/mongodb";

export const revalidate = 3600; // Cache for 1 hour

export async function GET() {
  const index = await getSearchIndex();
  return NextResponse.json(index);
}
```

- [ ] **Step 3: Write the SearchModal component**

Write to `components/SearchModal.tsx`:

```tsx
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Fuse from "fuse.js";
import { createSearchIndex, searchEmojis } from "@/lib/search";
import { EmojiSearchItem } from "@/types/emoji";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<EmojiSearchItem[]>([]);
  const [fuse, setFuse] = useState<Fuse<EmojiSearchItem> | null>(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Load search index on first open
  useEffect(() => {
    if (isOpen && !fuse) {
      setLoading(true);
      fetch("/api/search-index")
        .then((res) => res.json())
        .then((data: EmojiSearchItem[]) => {
          setFuse(createSearchIndex(data));
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [isOpen, fuse]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery("");
      setResults([]);
    }
  }, [isOpen]);

  // Search as user types
  useEffect(() => {
    if (fuse && query) {
      setResults(searchEmojis(fuse, query));
    } else {
      setResults([]);
    }
  }, [query, fuse]);

  // Keyboard shortcut: Escape to close
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (!isOpen) onClose(); // toggle would need parent state
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleSelect = useCallback(
    (slug: string) => {
      router.push(`/emoji/${slug}`);
      onClose();
    },
    [router, onClose]
  );

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-start justify-center pt-[15vh]"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-neutral-200">
          <span className="text-xl text-neutral-400">🔍</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search any emoji or feeling..."
            className="flex-1 text-lg outline-none placeholder:text-neutral-400"
          />
          <kbd className="px-2 py-1 rounded bg-neutral-100 text-xs text-neutral-500 font-mono">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto">
          {loading && (
            <div className="p-6 text-center text-neutral-400">
              Loading search index...
            </div>
          )}

          {!loading && query && results.length === 0 && (
            <div className="p-6 text-center text-neutral-400">
              No emojis found for &quot;{query}&quot;
            </div>
          )}

          {results.map((item) => (
            <button
              key={item.slug}
              onClick={() => handleSelect(item.slug)}
              className="w-full flex items-center gap-3 px-5 py-3 hover:bg-neutral-50 transition-colors text-left"
            >
              <span className="text-3xl">{item.character}</span>
              <div>
                <div className="font-medium text-neutral-900">{item.name}</div>
                <div className="text-xs text-neutral-500">
                  {item.category} · {item.shortcode}
                </div>
              </div>
            </button>
          ))}

          {!loading && !query && (
            <div className="p-4 text-sm text-neutral-400 text-center">
              Type to search emojis by name, feeling, or shortcode
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Write ClientShell to wire Navbar + SearchModal**

The Navbar needs `onSearchClick` but is used in Server Components. Create a client wrapper.

Write to `components/ClientShell.tsx`:

```tsx
"use client";

import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import SearchModal from "./SearchModal";

export default function ClientShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [searchOpen, setSearchOpen] = useState(false);

  // Global Cmd+K shortcut
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <Navbar onSearchClick={() => setSearchOpen(true)} />
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
      {children}
    </>
  );
}
```

- [ ] **Step 5: Update homepage and emoji page to use ClientShell**

In `app/page.tsx`, replace the standalone `<Navbar onSearchClick={() => {}} />` with `<ClientShell>`. Wrap the `<main>` and `<Footer>` inside `<ClientShell>`:

```tsx
// At the top of app/page.tsx, replace:
//   import Navbar from "@/components/Navbar";
// with:
import ClientShell from "@/components/ClientShell";

// In the return, replace:
//   <Navbar onSearchClick={() => {}} />
//   <main>...</main>
//   <Footer />
// with:
//   <ClientShell>
//     <main>...</main>
//     <Footer />
//   </ClientShell>
```

Apply the same change to `app/emoji/[slug]/page.tsx` — replace the standalone Navbar import and usage with `ClientShell` wrapping main + footer. Remove the `Navbar` import.

- [ ] **Step 6: Verify types compile**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 7: Commit**

```bash
git add lib/search.ts components/SearchModal.tsx components/ClientShell.tsx app/api/search-index/ app/page.tsx app/emoji/
git commit -m "feat: add search modal with Fuse.js, Cmd+K shortcut, and search index API"
```

---

### Task 12: Search Fallback Page

**Files:**
- Create: `app/search/page.tsx`

- [ ] **Step 1: Write the search fallback page**

Write to `app/search/page.tsx`:

```tsx
import { Metadata } from "next";
import Link from "next/link";
import { getSearchIndex } from "@/lib/mongodb";
import ClientShell from "@/components/ClientShell";
import Footer from "@/components/Footer";

interface PageProps {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const { q } = await searchParams;
  if (!q) return { title: "Search Emojis" };
  return {
    title: `"${q}" — Emoji Search Results`,
    description: `Find the meaning of "${q}" emojis across Gen-Z slang, TikTok, WhatsApp, and more.`,
  };
}

export default async function SearchPage({ searchParams }: PageProps) {
  const { q } = await searchParams;
  const allEmojis = await getSearchIndex();

  // Server-side filtering for SEO
  let results = allEmojis;
  if (q) {
    const query = q.toLowerCase();
    results = allEmojis.filter(
      (e) =>
        e.name.toLowerCase().includes(query) ||
        e.tags.some((t) => t.toLowerCase().includes(query)) ||
        e.character === q ||
        e.shortcode.toLowerCase().includes(query)
    );
  }

  return (
    <ClientShell>
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-primary-dark mb-2">
          {q ? `Search results for "${q}"` : "All Emojis"}
        </h1>
        <p className="text-neutral-500 mb-8">
          {results.length} emoji{results.length !== 1 ? "s" : ""} found
        </p>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
          {results.map((emoji) => (
            <Link
              key={emoji.slug}
              href={`/emoji/${emoji.slug}`}
              className="flex flex-col items-center gap-1 p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-neutral-100"
            >
              <span className="text-3xl">{emoji.character}</span>
              <span className="text-xs text-neutral-600 text-center truncate w-full">
                {emoji.name}
              </span>
            </Link>
          ))}
        </div>

        {results.length === 0 && (
          <div className="text-center py-16">
            <span className="text-6xl mb-4 block">🔍</span>
            <p className="text-neutral-500">
              No emojis found for &quot;{q}&quot;. Try a different search term.
            </p>
          </div>
        )}
      </main>
      <Footer />
    </ClientShell>
  );
}
```

- [ ] **Step 2: Verify types compile**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add app/search/
git commit -m "feat: add search fallback page for SEO"
```

---

### Task 13: OG Images + Sitemap + Robots

**Files:**
- Create: `app/emoji/[slug]/opengraph-image.tsx`, `app/sitemap.ts`, `app/robots.ts`

- [ ] **Step 1: Write the OG image generator**

Write to `app/emoji/[slug]/opengraph-image.tsx`:

```tsx
import { ImageResponse } from "next/og";
import { getEmojiBySlug } from "@/lib/mongodb";

export const runtime = "edge";
export const alt = "Emoji meaning";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const emoji = await getEmojiBySlug(slug);

  const name = emoji?.name || slug;
  const character = emoji?.character || "❓";
  const description = emoji?.official_meaning?.description || "Emoji meaning";

  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          color: "white",
        }}
      >
        <div style={{ fontSize: 180, lineHeight: 1 }}>{character}</div>
        <div
          style={{
            fontSize: 48,
            fontWeight: 800,
            marginTop: 20,
            textAlign: "center",
          }}
        >
          {name} Emoji
        </div>
        <div
          style={{
            fontSize: 24,
            opacity: 0.8,
            marginTop: 12,
            maxWidth: 800,
            textAlign: "center",
          }}
        >
          {description.slice(0, 100)}
        </div>
        <div
          style={{
            fontSize: 18,
            opacity: 0.6,
            marginTop: 24,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          🧠 Emoji Intelligence
        </div>
      </div>
    ),
    { ...size }
  );
}
```

- [ ] **Step 2: Write the sitemap generator**

Write to `app/sitemap.ts`:

```ts
import { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/mongodb";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://emojintel.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getAllSlugs();

  const emojiPages = slugs.map((slug) => ({
    url: `${SITE_URL}/emoji/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/search`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.5,
    },
    ...emojiPages,
  ];
}
```

- [ ] **Step 3: Write robots.txt**

Write to `app/robots.ts`:

```ts
import { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://emojintel.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
```

- [ ] **Step 4: Verify types compile**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 5: Commit**

```bash
git add app/emoji/\[slug\]/opengraph-image.tsx app/sitemap.ts app/robots.ts
git commit -m "feat: add OG image generation, sitemap, and robots.txt"
```

---

### Task 14: Redis Cache Layer + MongoDB Indexes

**Files:**
- Create: `lib/redis.ts`, `scripts/create-indexes.ts`
- Modify: `lib/mongodb.ts`

- [ ] **Step 1: Write the Redis cache utility**

Write to `lib/redis.ts`:

```ts
import { Redis } from "@upstash/redis";

let redis: Redis | null = null;

function getRedis(): Redis | null {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return null;
  }

  if (!redis) {
    redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });
  }

  return redis;
}

export async function getCached<T>(key: string): Promise<T | null> {
  const r = getRedis();
  if (!r) return null;

  try {
    const data = await r.get<T>(key);
    return data;
  } catch {
    return null;
  }
}

export async function setCached<T>(
  key: string,
  value: T,
  ttlSeconds: number
): Promise<void> {
  const r = getRedis();
  if (!r) return;

  try {
    await r.set(key, value, { ex: ttlSeconds });
  } catch {
    // Cache write failure is non-fatal
  }
}
```

- [ ] **Step 2: Add caching to getTrendingEmojis in lib/mongodb.ts**

In `lib/mongodb.ts`, update the `getTrendingEmojis` function to check Redis first:

```ts
// Add imports at the top of lib/mongodb.ts:
import { getCached, setCached } from "./redis";

// Replace the existing getTrendingEmojis function:
export async function getTrendingEmojis(
  limit: number = 10
): Promise<EmojiDocument[]> {
  const cacheKey = `trending:all:${limit}`;
  const cached = await getCached<EmojiDocument[]>(cacheKey);
  if (cached) return cached;

  const { db } = await connectToDatabase();
  const results = await emojis(db)
    .find({})
    .sort({ "virality.trend_score": -1 })
    .limit(limit)
    .toArray();

  await setCached(cacheKey, results, 300); // 5 min TTL
  return results;
}
```

Also add caching to `getEmojiBySlug`:

```ts
// Replace the existing getEmojiBySlug function:
export async function getEmojiBySlug(
  slug: string
): Promise<EmojiDocument | null> {
  const cacheKey = `emoji:${slug}`;
  const cached = await getCached<EmojiDocument>(cacheKey);
  if (cached) return cached;

  const { db } = await connectToDatabase();
  const result = await emojis(db).findOne({ slug });

  if (result) {
    await setCached(cacheKey, result, 3600); // 1 hour TTL
  }

  return result;
}
```

- [ ] **Step 3: Write the MongoDB index creation script**

Write to `scripts/create-indexes.ts`:

```ts
import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI!;
const MONGODB_DB = process.env.MONGODB_DB || "emoji-platform";

async function main() {
  if (!MONGODB_URI) {
    console.error("MONGODB_URI is not set.");
    process.exit(1);
  }

  const client = await MongoClient.connect(MONGODB_URI);
  const db = client.db(MONGODB_DB);
  const collection = db.collection("emojis");

  console.log("Creating indexes on 'emojis' collection...");

  await collection.createIndex({ slug: 1 }, { unique: true });
  console.log("  ✓ slug (unique)");

  await collection.createIndex({ unicode: 1 }, { unique: true });
  console.log("  ✓ unicode (unique)");

  await collection.createIndex({ name: "text" });
  console.log("  ✓ name (text)");

  await collection.createIndex({ category: 1 });
  console.log("  ✓ category");

  await collection.createIndex({ "virality.trend_score": -1 });
  console.log("  ✓ virality.trend_score (desc)");

  await collection.createIndex({ tags: 1 });
  console.log("  ✓ tags");

  await collection.createIndex({
    category: 1,
    "virality.trend_score": -1,
  });
  console.log("  ✓ { category, virality.trend_score } compound");

  console.log("\nAll indexes created successfully.");
  await client.close();
}

main().catch(console.error);
```

- [ ] **Step 4: Add script entries to package.json**

Add to `package.json` scripts:
```json
"create-indexes": "npx tsx scripts/create-indexes.ts"
```

- [ ] **Step 5: Verify types compile**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 6: Commit**

```bash
git add lib/redis.ts lib/mongodb.ts scripts/create-indexes.ts package.json
git commit -m "feat: add Redis cache layer and MongoDB index creation script"
```

---

### Task 15: Final Verification + Production Build

**Files:**
- No new files — verification only

- [ ] **Step 1: Run TypeScript check**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 2: Run the dev server and verify pages**

```bash
npm run dev
```

Visit these URLs and confirm they render:
- `http://localhost:3000` — Homepage loads (may show empty trending if no DB connected)
- `http://localhost:3000/search` — Search page loads
- `http://localhost:3000/sitemap.xml` — Sitemap XML renders

- [ ] **Step 3: Run a production build**

```bash
npm run build
```

Expected: Build succeeds. Static pages are generated. No TypeScript or build errors.

- [ ] **Step 4: Run the production server**

```bash
npm run start
```

Verify pages render correctly in production mode.

- [ ] **Step 5: Commit any build fixes**

If any fixes were needed during verification:
```bash
git add -A
git commit -m "fix: resolve build issues for production deployment"
```

---

## Post-Plan: Data Population

After all tasks are complete, populate the database:

1. Copy `.env.local.example` to `.env.local` and fill in MongoDB Atlas URI, Anthropic API key, and Upstash Redis credentials.
2. Run `npm run create-indexes` to set up MongoDB indexes.
3. Run `npm run generate` to start the Claude pipeline. This processes ~10 emojis per minute and takes ~20 minutes for 200 emojis.
4. Verify data by visiting `http://localhost:3000/emoji/skull` (or any seeded slug).
5. For the remaining 800+ emojis, extend `data/seed-emojis.json` with additional entries from the Unicode emoji list and re-run the pipeline.
