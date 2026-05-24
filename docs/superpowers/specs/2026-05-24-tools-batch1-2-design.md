# Tools Batch 1 & 2 — 9 Emoji Tools

**Date:** 2026-05-24
**Status:** Approved
**Scope:** Build 9 tools under `/tools/*` with shared layout, Gemini AI integration, and pre-computed Emoji Kitchen data

---

## 1. Goal

Add 9 interactive tools to the platform: 3 AI-powered (Gemini 2.0 Flash), 1 pre-computed (Emoji Kitchen), 3 data-driven (Trend Tracker, Keyboard, Shortcodes), and 2 picker-redirect (Comparison, Combo). All tools share a common layout and follow consistent UI patterns.

**Success criteria:**
- 9 tool pages live under `/tools/*`
- AI tools return results via Gemini free tier with Redis caching
- Emoji Kitchen shows real Google combo results from MongoDB
- All tools mobile-responsive with SEO meta and breadcrumbs

---

## 2. Tool Overview

| Tool | Route | Type | Data Source |
|---|---|---|---|
| Emoji Kitchen | `/tools/emoji-kitchen` | Pre-computed | MongoDB `kitchen` collection |
| Text-to-Emoji | `/tools/text-to-emoji` | AI (Gemini) | Real-time + Redis cache |
| Vibe Search | `/tools/vibe-search` | AI (Gemini) | Real-time + Redis cache |
| Caption Generator | `/tools/caption-generator` | AI (Gemini) | Real-time + Redis cache |
| Trend Tracker | `/tools/emoji-trends` | Data-driven | MongoDB `emojis` collection |
| Comparison Tool | `/tools/emoji-vs` | Picker → redirect | Existing `/vs/` pages |
| Combo Generator | `/tools/emoji-combos` | Picker → redirect | Existing `/combo/` pages |
| Emoji Keyboard | `/tools/emoji-keyboard` | Data-driven | MongoDB `emojis` collection |
| Shortcode Tool | `/tools/emoji-shortcodes` | Data-driven | MongoDB `emojis` collection |

---

## 3. New Dependencies

- `@google/generative-ai` — Google Generative AI SDK for Gemini 2.0 Flash (free tier: 15 RPM, 1,500 RPD)

---

## 4. New Environment Variables

```
GEMINI_API_KEY=<google-ai-api-key>
```

Add to `.env.local.example`.

---

## 5. File Structure

```
app/tools/
  layout.tsx                      → shared tool layout
  emoji-kitchen/page.tsx          → Emoji Kitchen
  text-to-emoji/page.tsx          → Text-to-Emoji Translator
  vibe-search/page.tsx            → Vibe Search Engine
  caption-generator/page.tsx      → Caption Generator
  emoji-trends/page.tsx           → Trend Tracker
  emoji-vs/page.tsx               → Comparison Tool (picker)
  emoji-combos/page.tsx           → Combo Generator (picker)
  emoji-keyboard/page.tsx         → Emoji Keyboard
  emoji-shortcodes/page.tsx       → Shortcode Tool

app/api/tools/
  text-to-emoji/route.ts          → POST { text, style }
  vibe-search/route.ts            → POST { query }
  caption/route.ts                → POST { topic, mood, platform }

lib/gemini.ts                     → Gemini API wrapper + Redis cache
scripts/download-kitchen-data.ts  → fetch Google Kitchen combos → MongoDB

components/
  EmojiPicker.tsx                 → reusable emoji picker grid (used by Kitchen, VS, Combos)
  ToolHero.tsx                    → tool page hero section
```

---

## 6. Shared Tool Layout

### `app/tools/layout.tsx`

Wraps all tool pages with:
- `ClientShell` (Navbar + SearchModal)
- Consistent `max-w-4xl` container with padding
- `Footer`

Each tool page provides its own content, hero, and metadata.

---

## 7. Gemini AI Integration

### `lib/gemini.ts`

```ts
// Exports:
callGemini(prompt: string, cacheKey?: string): Promise<Record<string, unknown>>
```

- Model: `gemini-2.0-flash`
- If `cacheKey` provided, checks Redis first (1-hour TTL)
- Parses JSON from response — extracts `{...}` from output
- Retry logic: 2 attempts on failure
- System instruction: "Return valid JSON only, no markdown"

---

## 8. AI Tool Specifications

### 8.1 Text-to-Emoji Translator (`/tools/text-to-emoji`)

**Client component** with form + results display.

**Input:**
- Textarea: up to 500 characters
- Style selector (pill buttons): Balanced, Heavy Emoji, Minimal, Gen-Z, Professional

**API route:** `POST /api/tools/text-to-emoji`
- Request body: `{ text: string, style: string }`
- Calls Gemini with prompt: "Translate this text with emojis in {style} style. Return JSON: { result: string, alternatives: string[] (3 items) }"
- Cache key: `t2e:{style}:{md5(text)}`
- Response: `{ result: string, alternatives: string[] }`

**Output:**
- Primary result with copy button
- 3 alternative translations, each with copy button

**SEO meta:**
```
Title: "Text to Emoji Translator — Convert Text to Emojis [2026]"
Description: "Transform your text into emoji-rich messages. Choose from Gen-Z, professional, and more styles."
```

### 8.2 Vibe Search Engine (`/tools/vibe-search`)

**Client component** with search + results grid.

**Input:**
- Large search bar: "Search by feeling, mood, or vibe..."
- Mood chip buttons: sad, love, toxic, funny, aesthetic, angry, hype, chill, romantic, dark

**API route:** `POST /api/tools/vibe-search`
- Request body: `{ query: string }`
- Calls Gemini: "Find 10 emojis matching the vibe '{query}'. Return JSON: { results: [{ emoji: string, name: string, match_percent: number, reason: string }] }"
- Cache key: `vibe:{md5(query)}`
- Response: `{ results: Array<{ emoji, name, match_percent, reason }> }`

**Output:**
- 4-column emoji card grid (2-col on mobile)
- Each card: emoji (48px), match percentage badge, match reason
- "Copy All" button at top of results

**SEO meta:**
```
Title: "Vibe Search — Find Emojis by Feeling [2026]"
Description: "Search emojis by mood, feeling, or vibe. Find the perfect emoji for sad, love, toxic, funny, aesthetic, and more."
```

### 8.3 Caption Generator (`/tools/caption-generator`)

**Client component** with form + results cards.

**Input:**
- Topic text field: "What's the post about?"
- Mood selector (pill buttons): Happy, Sad, Hype, Aesthetic, Funny, Romantic, Motivational, Chill
- Platform selector (pill buttons): Instagram, TikTok, WhatsApp, Twitter, LinkedIn

**API route:** `POST /api/tools/caption`
- Request body: `{ topic: string, mood: string, platform: string }`
- Calls Gemini: "Generate 5 {platform} captions about '{topic}' with {mood} mood. Return JSON: { captions: [{ text: string, emoji_count: number, vibe: string }] }"
- Cache key: `cap:{platform}:{mood}:{md5(topic)}`
- Response: `{ captions: Array<{ text, emoji_count, vibe }> }`

**Output:**
- 5 caption cards, each with:
  - Caption text
  - Emoji count badge
  - Vibe label
  - Copy button

**SEO meta:**
```
Title: "Emoji Caption Generator — Viral Captions for Instagram & TikTok [2026]"
Description: "Generate viral captions with emojis for Instagram, TikTok, WhatsApp, and more. AI-powered for any mood."
```

---

## 9. Emoji Kitchen (`/tools/emoji-kitchen`)

### Data Source

`scripts/download-kitchen-data.ts`:
1. Fetches Google's public Emoji Kitchen metadata (the JSON manifest at `https://www.gstatic.com/android/keyboard/emojikitchen/`)
2. Parses all valid emoji combinations
3. Stores in MongoDB `kitchen` collection:

```ts
interface KitchenCombo {
  emoji1: string;      // first emoji character
  emoji2: string;      // second emoji character
  result_url: string;  // Google CDN URL for the combined image
  created_at: Date;
}
```

4. Index: compound `{ emoji1: 1, emoji2: 1 }` (unique)

### Page UI

- Two emoji pickers side by side with "+" icon between them
- "Cook It!" button (indigo gradient, centered)
- Result: combined image (128px) from `result_url` in a white card
- Action buttons: Copy image URL, Download
- "No combination found" fallback with suggestion to try different emojis
- Trending combos section at bottom (random 10 from kitchen collection)

### MongoDB Query

```ts
getKitchenCombo(emoji1: string, emoji2: string): Promise<KitchenCombo | null>
// Check both orderings: (emoji1, emoji2) and (emoji2, emoji1)
```

**SEO meta:**
```
Title: "Emoji Kitchen — Combine Emojis Into New Designs [2026]"
Description: "Mix and match emojis to create unique combinations. Powered by Google Emoji Kitchen data."
```

---

## 10. Data-Driven Tool Specifications

### 10.1 Trend Tracker (`/tools/emoji-trends`)

**Server component** — queries MongoDB directly.

**Content:**
- Platform filter tabs: All, TikTok, Instagram, WhatsApp
- Top 20 emojis sorted by `virality.trend_score` descending
- Each card: emoji (64px), name, trend score badge (amber), category label
- Filter by platform shows emojis sorted by that platform's frequency field

**MongoDB query:** `getTrendingEmojis(limit)` — already exists. For platform filtering, sort by `virality.tiktok_freq` / `virality.instagram_freq` instead.

**SEO meta:**
```
Title: "Trending Emojis 2026 — Most Popular Emojis Right Now"
Description: "See which emojis are trending on TikTok, Instagram, and WhatsApp. Updated daily with trend scores."
```

### 10.2 Emoji Keyboard (`/tools/emoji-keyboard`)

**Client component** (needs click-to-copy + localStorage).

**Content:**
- Search bar at top (filters emojis by name/tags using client-side Fuse.js — reuse existing search index)
- Category tabs: Smileys & Emotion, People & Body, Animals & Nature, Food & Drink, Travel & Places, Activities, Objects, Symbols, Flags
- 8-column emoji grid (6-col mobile), each emoji 40px with hover scale effect
- Click any emoji → copies to clipboard, shows "Copied!" toast
- "Recent" row at bottom showing last 10 copied emojis (stored in localStorage)

**Data:** Fetches `/api/search-index` (already exists) for the full emoji list. Groups by category client-side.

**SEO meta:**
```
Title: "Emoji Keyboard — Copy and Paste Every Emoji [2026]"
Description: "Browse, search, and copy any emoji. Organized by category with one-click copy to clipboard."
```

### 10.3 Shortcode Tool (`/tools/emoji-shortcodes`)

**Client component** (needs search + copy).

**Content:**
- Search field: accepts emoji name or shortcode
- Table columns: Emoji | Name | Shortcode | Unicode | Copy button
- Filter by search query (client-side)
- Click copy → copies shortcode to clipboard

**Data:** Fetches `/api/search-index` — already has `character`, `name`, `shortcode` fields.

**SEO meta:**
```
Title: "Emoji Shortcodes — Slack, Discord, GitHub Codes [2026]"
Description: "Find shortcodes for every emoji. Copy shortcodes for Slack, Discord, GitHub, and more."
```

---

## 11. Picker-Redirect Tools

### 11.1 Comparison Tool (`/tools/emoji-vs`)

**Client component** with two emoji pickers.

**Content:**
- Two emoji pickers side by side with "VS" badge
- "Compare Now" button → navigates to `/vs/{slug1}-vs-{slug2}` (alphabetically sorted)
- Below: "Popular Comparisons" — 10 cards linking to existing `/vs/` pages (fetched from `comparisons` collection)

**SEO meta:**
```
Title: "Emoji Comparison Tool — Compare Any Two Emojis [2026]"
Description: "Compare emoji meanings side by side. See differences in Gen-Z, TikTok, dating, and meme contexts."
```

### 11.2 Combo Generator (`/tools/emoji-combos`)

**Client component** with theme picker.

**Content:**
- Grid of theme cards (3-col desktop, 2-col mobile) showing theme name + preview emojis
- Click → navigates to `/combo/{theme}`
- Below: "Popular Combos" showing top 10 from combos collection

**SEO meta:**
```
Title: "Emoji Combo Generator — Copy Emoji Sets [2026]"
Description: "Find the perfect emoji combo for any occasion. Birthday, love, aesthetic, and 200+ more themes."
```

---

## 12. Reusable Components

### `components/EmojiPicker.tsx`

Client component — a searchable emoji grid used by Kitchen, Comparison Tool, and any future tool that needs emoji selection.

**Props:** `onSelect(emoji: { character: string, slug: string, name: string })`

**Content:**
- Search input at top
- 6-column grid of emojis from the search index
- Click selects the emoji and calls `onSelect`
- Fetches `/api/search-index` on mount (cached in state)

### `components/ToolHero.tsx`

Server component — renders the tool page hero.

**Props:** `title: string, description: string, badge?: string`

**Content:**
- H1 with tool title
- Subtitle/description
- Optional trending/popular badge

---

## 13. MongoDB Additions

### New Collection: `kitchen`

```ts
interface KitchenCombo {
  emoji1: string;
  emoji2: string;
  result_url: string;
  created_at: Date;
}
```

Indexes: `{ emoji1: 1, emoji2: 1 }` (unique compound)

### New Queries in `lib/mongodb.ts`

```ts
getKitchenCombo(emoji1, emoji2): Promise<KitchenCombo | null>
getRandomKitchenCombos(limit): Promise<KitchenCombo[]>
getPopularComparisons(limit): Promise<ComparisonDocument[]>
getPopularCombos(limit): Promise<ComboDocument[]>
```

### Update `scripts/create-indexes.ts`

Add kitchen collection compound index.

---

## 14. Redis Cache Keys

```
t2e:{style}:{hash}        → 1 hour TTL (text-to-emoji results)
vibe:{hash}                → 1 hour TTL (vibe search results)
cap:{platform}:{mood}:{hash} → 1 hour TTL (caption results)
```

---

## 15. API Routes

### `POST /api/tools/text-to-emoji`

Request: `{ text: string, style: string }`
Response: `{ result: string, alternatives: string[] }`
Validates: text ≤ 500 chars, style is one of the 5 options

### `POST /api/tools/vibe-search`

Request: `{ query: string }`
Response: `{ results: Array<{ emoji, name, match_percent, reason }> }`
Validates: query ≤ 200 chars

### `POST /api/tools/caption`

Request: `{ topic: string, mood: string, platform: string }`
Response: `{ captions: Array<{ text, emoji_count, vibe }> }`
Validates: topic ≤ 200 chars, mood and platform are valid options

All routes return `{ error: string }` with appropriate HTTP status on failure.

---

## 16. SEO

Each tool page includes:
- Unique `generateMetadata` with tool-specific title/description/canonical
- BreadcrumbList JSON-LD: Home > Tools > Tool Name
- No `generateStaticParams` — tools are `force-dynamic` (they query data at request time)

---

## 17. Build Strategy

**Phase A — Infrastructure:**
1. Install `@google/generative-ai`, add `GEMINI_API_KEY` to env
2. Create `lib/gemini.ts` (Gemini wrapper)
3. Create `components/EmojiPicker.tsx` and `components/ToolHero.tsx`
4. Create `app/tools/layout.tsx` (shared layout)

**Phase B — AI Tools:**
5. Create API routes: text-to-emoji, vibe-search, caption
6. Create tool pages: text-to-emoji, vibe-search, caption-generator

**Phase C — Kitchen:**
7. Create `scripts/download-kitchen-data.ts`
8. Add kitchen queries to `lib/mongodb.ts`
9. Create tool page: emoji-kitchen

**Phase D — Data-Driven Tools:**
10. Create tool pages: emoji-trends, emoji-keyboard, emoji-shortcodes

**Phase E — Picker Tools:**
11. Create tool pages: emoji-vs, emoji-combos

**Phase F — Finalization:**
12. Update homepage to link to tools
13. Update footer with tool links
14. Update create-indexes script for kitchen collection
