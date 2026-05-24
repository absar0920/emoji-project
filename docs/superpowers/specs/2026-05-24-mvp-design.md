# Emoji Intelligence Platform — MVP Design Spec

**Date:** 2026-05-24
**Status:** Approved
**Scope:** Homepage + Search + 1000+ Emoji SEO Pages

---

## 1. MVP Goal

Build an SEO-first emoji meaning platform that launches with 1000+ emoji pages, a homepage with search, and a dense internal linking graph. No tools, no auth, no ads — just the core content engine that drives organic traffic.

**Success criteria:**
- 1000+ emoji meaning pages indexed by Google
- Homepage with working search
- All pages server-rendered with full SEO meta, structured data, and OG images
- Lighthouse scores 90+ on desktop

---

## 2. Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Framework | Next.js 15 (App Router) | SSR, ISR, routing |
| Language | TypeScript (strict mode) | Type safety |
| Styling | Tailwind CSS | Design system |
| Database | MongoDB Atlas (free tier) | Emoji knowledge graph |
| Cache | Redis / Upstash | Trending data, search cache |
| Search | Fuse.js | Client-side fuzzy search |
| AI Pipeline | Anthropic Claude API (claude-sonnet-4-5) | Meaning data generation |
| Deployment | Vercel | Hosting, ISR, edge functions |
| OG Images | @vercel/og | Dynamic social previews |
| SEO | next-seo + JSON-LD | Meta tags, structured data |

**Explicitly excluded from MVP:**
- Supabase (no auth)
- Cloudinary (use emoji CDN URLs directly — Twemoji)
- Framer Motion (no animations)
- AdSense (no ads)
- All 15 tools

---

## 3. Folder Structure

```
app/
  page.tsx                → Homepage
  emoji/[slug]/page.tsx   → Emoji meaning pages (ISR)
  search/page.tsx         → Search results fallback (SEO)
  api/
    emoji/route.ts        → Emoji data API
    search/route.ts       → Search API
components/
  Navbar.tsx
  Footer.tsx
  SearchModal.tsx
  EmojiCard.tsx
  MeaningCard.tsx
  PlatformCard.tsx
  CultureCard.tsx
  TimelineSection.tsx
  RelatedEmojis.tsx
  StickyTOC.tsx
lib/
  mongodb.ts              → DB connection + helpers
  claude.ts               → Claude API wrapper
  search.ts               → Fuse.js setup + search index
  seo.ts                  → Meta tag + JSON-LD generators
types/
  emoji.ts                → TypeScript interfaces
data/
  seed-emojis.json        → Top 200 hand-picked emojis (base fields)
scripts/
  generate-meanings.ts    → Claude pipeline: batch-generate meaning data
```

---

## 4. Data Model

Each emoji is stored as a single MongoDB document in the `emojis` collection.

### 4.1 Base Fields

```ts
interface EmojiBase {
  emoji_id: string       // UUID
  slug: string           // URL-safe: "skull", "red-heart"
  unicode: string        // "U+1F480"
  name: string           // "Skull"
  character: string      // "💀"
  shortcode: string      // ":skull:"
  category: string       // "Smileys & Emotion"
  tags: string[]         // ["death", "dead", "funny", "laughing"]
  created_at: Date
  updated_at: Date
}
```

### 4.2 Meaning Layers (all 6)

```ts
interface MeaningLayers {
  official_meaning: {
    description: string
    original_intent: string
  }
  genz_meaning: {
    interpretation: string
    tiktok_usage: string
    instagram_usage: string
    irony_level: number    // 0-10
  }
  emotional_meaning: {
    emotion_type: string
    intensity: number      // 0-10
    psychology_note: string
  }
  dating_meaning: {
    flirt_usage: string
    relationship_context: string
    red_flag: boolean
  }
  sarcastic_meaning: {
    passive_aggressive: string
    meme_sarcasm: string
  }
  meme_meaning: {
    viral_usage: string
    irony_level: number    // 0-10
  }
}
```

### 4.3 Platform Layer (top 3 for MVP)

```ts
interface PlatformLayer {
  tiktok: {
    meaning: string
    trend_usage: string
    hashtags: string[]
    virality_score: number  // 0-100
  }
  whatsapp: {
    chat_meaning: string
    status_meaning: string
    double_meaning: string
  }
  instagram: {
    bio_usage: string
    story_usage: string
    aesthetic_usage: string
  }
}
```

Remaining platforms (X, Facebook, Snapchat, Telegram, Discord, Pinterest, Reddit, LinkedIn, BeReal, Threads, Twitch, Spotify) are deferred to v2.

### 4.4 Cultural Layer (4 regions for MVP)

```ts
interface CulturalLayer {
  cultures: {
    western_genz: string
    pakistan_india: string
    middle_east: string
    global_neutral: string
  }
}
```

Remaining 16+ regions deferred to v2.

### 4.5 Time Evolution

```ts
interface TimeEvolution {
  time_evolution: {
    usage_2010: string
    usage_2015: string
    usage_2020: string
    usage_2026: string
  }
}
```

### 4.6 Virality & Relations

```ts
interface ViralityAndRelations {
  virality: {
    trend_score: number          // 0-100
    meme_score: number           // 0-100
    tiktok_freq: 'low' | 'medium' | 'high' | 'viral'
    instagram_freq: 'low' | 'medium' | 'high' | 'viral'
  }
  relations: {
    related: string[]            // slugs of related emojis
    opposite: string[]
    confusing: string[]
    replacement: string[]
  }
}
```

### 4.7 Safety Layer

```ts
interface SafetyLayer {
  safety: {
    safe_meaning: string
    toxic_meaning: string
    warning_notes: string
    nsfw: boolean
  }
}
```

### 4.8 Full Document Type

```ts
type EmojiDocument = EmojiBase
  & MeaningLayers
  & PlatformLayer
  & CulturalLayer
  & TimeEvolution
  & ViralityAndRelations
  & SafetyLayer
```

---

## 5. Data Pipeline

### 5.1 Seed Data

`data/seed-emojis.json` contains the top 200 most-searched emojis with base fields pre-filled from the Unicode standard (name, unicode, character, shortcode, category, tags). No meaning data — that comes from Claude.

### 5.2 Claude Pipeline

`scripts/generate-meanings.ts` generates meaning data for every emoji in the seed file and writes it to MongoDB.

**Process:**
1. Read all emojis from `seed-emojis.json` (or the full Unicode emoji list for the 800+ expansion)
2. For each emoji, check if it already exists in MongoDB with meaning data (skip if yes — resume-safe)
3. Call Claude API with a structured prompt requesting the full meaning object as JSON
4. Validate the returned JSON against the TypeScript interfaces
5. Upsert the document into MongoDB
6. Rate limit: 10 emojis per minute (6-second delay between calls)

**Claude Prompt:**
```
System: You are a world-class emoji cultural intelligence expert.
Return valid JSON only — no markdown, no explanation.

User: Generate complete meaning data for {character} ({name}).

Return a JSON object with these exact fields:
- official_meaning: { description, original_intent }
- genz_meaning: { interpretation, tiktok_usage, instagram_usage, irony_level (0-10) }
- emotional_meaning: { emotion_type, intensity (0-10), psychology_note }
- dating_meaning: { flirt_usage, relationship_context, red_flag (boolean) }
- sarcastic_meaning: { passive_aggressive, meme_sarcasm }
- meme_meaning: { viral_usage, irony_level (0-10) }
- tiktok: { meaning, trend_usage, hashtags (array), virality_score (0-100) }
- whatsapp: { chat_meaning, status_meaning, double_meaning }
- instagram: { bio_usage, story_usage, aesthetic_usage }
- cultures: { western_genz, pakistan_india, middle_east, global_neutral }
- time_evolution: { usage_2010, usage_2015, usage_2020, usage_2026 }
- virality: { trend_score (0-100), meme_score (0-100), tiktok_freq, instagram_freq }
- relations: { related (5 emoji slugs), opposite (3), confusing (3), replacement (3) }
- safety: { safe_meaning, toxic_meaning, warning_notes, nsfw (boolean) }
```

**Cost estimate:** ~$3–6 total for 1000 emojis at claude-sonnet-4-5 pricing.

---

## 6. Homepage Design

### 6.1 Layout: Split Hero

Two-column hero on a light indigo (#F8F7FF) background:

**Left column:**
- Small indigo pill badge: "AI-Powered"
- H1 headline: "Every Emoji. Every Meaning." (gradient text, 56px bold)
- Subtitle: "Gen-Z · Platforms · Cultures · AI" (gray, 20px)
- Search bar: rounded-full with emoji icon, indigo focus ring

**Right column:**
- 3x2 grid of emoji cards (top trending emojis), each showing the emoji at 40px and its name
- Final card: indigo background, "1000+ more" CTA

**Below the hero:**
- Stats row: 4 cards showing "3,700+ Emojis", "15 Platforms", "20+ Cultures", "AI Powered"
- Trending Now: horizontal scrolling row of emoji cards with trend score badges
- Footer

### 6.2 Navbar

Sticky, white background with backdrop-blur. Logo left, centered links (deferred — MVP has just logo + search icon), search icon right that triggers the search modal.

### 6.3 Footer

Dark gray (#111827) background. Four columns:
1. Logo + one-line site description
2. Popular emojis (links to top emoji pages)
3. Categories (links to category browse)
4. About, Privacy Policy, Terms, Sitemap

---

## 7. Emoji Page Design

**URL:** `/emoji/[slug]` (e.g., `/emoji/skull`)

### 7.1 Layout: Scrollable Sections with Sticky TOC

All content rendered in the DOM — no tab-hiding. Color-coded meaning cards, sticky navigation bar for jump links.

### 7.2 Page Structure (top to bottom)

1. **Breadcrumb:** Home > Emojis > Skull Emoji (BreadcrumbList JSON-LD)
2. **Hero:** Emoji at 128px, name (H1), Unicode code point, shortcode, Copy button, trend score badge
3. **Sticky TOC:** Horizontal nav — Meanings | Platforms | Cultures | Timeline | Related | FAQ
4. **Meaning Cards:** 2-column grid, each card has a colored left border keyed to type:
   - Indigo: Official
   - Violet: Gen-Z
   - Emerald: Emotional
   - Red: Dating
   - Amber: Meme
   - Gray: Sarcastic
5. **Platform Cards:** 3-column grid — TikTok, WhatsApp, Instagram (MVP)
6. **Cultural Meanings:** 4 cards — Western Gen-Z, Pakistan/India, Middle East, Global Neutral
7. **Time Evolution:** Horizontal timeline — 2010 → 2015 → 2020 → 2026
8. **Related Emojis:** Horizontal scroll row of 10–15 emoji cards (internal links)
9. **FAQ Section:** 5–8 auto-generated Q&As with FAQPage JSON-LD
10. **Safety Note:** Safe/Toxic/Warning badges (if applicable)

---

## 8. Search

### 8.1 Search Modal (Primary)

Full-screen overlay triggered by search icon in navbar or Cmd+K keyboard shortcut.

- Large search input at top
- Results appear instantly as user types (Fuse.js, no server calls)
- Trending emoji pills below input for zero-effort discovery
- Click result → navigates to `/emoji/[slug]`
- Escape or click outside → closes modal

### 8.2 Search Index

On app load, fetch a lightweight JSON index (~60KB for 1000 emojis):
```ts
{ slug, name, character, tags, category, shortcode, genz_summary }
```

`genz_summary` is a short (1-line) Gen-Z interpretation stored alongside the base fields, extracted from the full `genz_meaning.interpretation` field at index build time.

Fuse.js weighted fields:
```ts
name: 1.0, tags: 0.8, genz_summary: 0.7,
shortcode: 0.6, category: 0.5
```

### 8.3 Search Fallback Page

`/search?q=skull+emoji` exists as a server-rendered page for SEO. Google may link to it from search results. Renders the same results grid but as a full page.

---

## 9. SEO Strategy

### 9.1 Meta Tags (auto-generated per page)

```
Title:       "💀 Skull Emoji Meaning — Gen-Z, TikTok, WhatsApp [2026]"
Description: "What does 💀 mean? Official, Gen-Z slang, dating, meme,
             and sarcastic meanings across TikTok, WhatsApp & Instagram."
Canonical:   https://domain.com/emoji/skull
```

### 9.2 Structured Data

- **FAQPage JSON-LD** on every emoji page (5–8 auto-generated Q&As)
- **BreadcrumbList JSON-LD** on every emoji page
- FAQ questions cover: general meaning, TikTok meaning, WhatsApp meaning, Gen-Z meaning, safety, texting meaning, shortcode, dating context

### 9.3 Sitemap

- Auto-generated at build time from MongoDB
- Lists all `/emoji/[slug]` pages
- Submitted to Google Search Console and Bing Webmaster Tools

### 9.4 ISR Strategy

- All emoji pages pre-rendered at build via `generateStaticParams`
- `revalidate: 3600` (1 hour) — refreshes trending scores
- New emojis added to DB appear as pages on next revalidation cycle

### 9.5 Internal Linking

Every emoji page links to 10–15 related emojis via the `relations` field. This creates a dense internal link graph across 1000+ pages, enabling Google to discover and crawl all pages efficiently.

### 9.6 OG Images

Dynamic 1200x630 social preview images generated via `@vercel/og`. Each shows the emoji character, name, and a short meaning. Shared on Twitter/Facebook/LinkedIn with rich previews.

---

## 10. MongoDB Indexes

```
emojis collection:
  - slug (unique)           → page lookups
  - unicode (unique)        → unicode-based lookups
  - name (text)             → text search
  - category                → category browsing
  - virality.trend_score    → trending sort (descending)
  - tags                    → tag-based search
  - { category, virality.trend_score: -1 }  → trending per category
```

---

## 11. Redis Cache Strategy

```
trending:all       → 5 min TTL   (homepage trending section)
search:{query}     → 1 min TTL   (search results cache)
emoji:{slug}       → 1 hour TTL  (full emoji object cache)
```

---

## 12. Build Strategy

**Approach: Parallel Seed + Build**

Phase 1 (parallel):
- **Track A:** Set up Next.js project, Tailwind design system, MongoDB connection, folder structure
- **Track B:** Build `scripts/generate-meanings.ts`, run Claude pipeline on seed-emojis.json (200 emojis)

Phase 2 (parallel):
- **Track A:** Build homepage (split hero, navbar, footer, trending row)
- **Track B:** Build emoji page template (all sections, sticky TOC, SEO meta)
- **Track C:** Expand pipeline to 1000+ emojis (run in background)

Phase 3:
- Build search modal + Fuse.js integration
- Build search fallback page
- Generate sitemap

Phase 4:
- ISR configuration + `generateStaticParams`
- OG image generation
- Lighthouse audit + Core Web Vitals check
- Deploy to Vercel

---

## 13. What's Deferred to v2

| Feature | Why deferred |
|---|---|
| Tools (all 15) | MVP is content-only; tools are a separate build cycle |
| Auth (Supabase) | No user features in MVP — all content is public |
| Ads (AdSense) | Apply after site has indexed pages and traffic |
| Remaining 12 platforms | Top 3 (TikTok, WhatsApp, Instagram) cover 80% of search intent |
| Remaining 16+ cultures | 4 key regions cover the highest-traffic demographics |
| Framer Motion animations | Ship fast, polish later |
| Cloudinary media | Use Twemoji CDN URLs directly for MVP |
| Comparison pages (/vs/) | Programmatic pages built after core emoji pages are live |
| Combo pages (/combo/) | Same — requires tools infrastructure |
| Blog | Content marketing phase comes after SEO pages are indexed |
