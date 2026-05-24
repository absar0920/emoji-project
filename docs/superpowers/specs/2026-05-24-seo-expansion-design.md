# SEO Expansion — Programmatic Pages + Data Model Expansion

**Date:** 2026-05-24
**Status:** Approved
**Scope:** Expand data model to 15 platforms + 20+ cultures, build 4 new programmatic page types (~57K+ total pages)

---

## 1. Goal

Multiply the platform's indexed page count from ~3,700 to ~57,000+ by expanding the emoji data model and building 4 new programmatic page types. All pages are ISR-rendered, SEO-optimized, and internally linked.

**Success criteria:**
- All emoji documents enriched with 15 platforms + 20+ cultures
- Platform pages live at `/[platform]/[slug]` (~55K pages)
- Comparison pages live at `/vs/[slug]` (~1,500–3,000 pages)
- Combo pages live at `/combo/[type]` (~200–500 pages)
- Culture pages live at `/culture/[region]` (~25 pages)
- Sitemap index covering all pages
- Cross-linking between all page types

---

## 2. Data Model Expansion

### 2.1 New Platform Interfaces

Add 12 new platforms to `types/emoji.ts` and `PlatformLayer`:

```ts
interface XPlatform {
  meme_usage: string;
  sarcasm_patterns: string;
  quote_tweet_context: string;
  trending_context: string;
  reply_use: string;
}

interface FacebookPlatform {
  reaction_meaning: string;
  comment_use: string;
  boomer_interpretation: string;
  group_use: string;
}

interface SnapchatPlatform {
  friend_system_usage: string;
  streak_use: string;
  story_meaning: string;
  snap_context: string;
}

interface TelegramPlatform {
  sticker_mapping: string;
  channel_use: string;
  group_meaning: string;
  bot_context: string;
}

interface DiscordPlatform {
  server_usage: string;
  reaction_use: string;
  emote_mapping: string;
  gaming_context: string;
  role_meaning: string;
}

interface PinterestPlatform {
  aesthetic_usage: string;
  board_use: string;
  visual_meaning: string;
  pin_context: string;
}

interface RedditPlatform {
  upvote_context: string;
  community_use: string;
  subreddit_meaning: string;
  karma_context: string;
}

interface LinkedInPlatform {
  professional_use: string;
  post_context: string;
  appropriateness: string;
  comment_use: string;
}

interface BeRealPlatform {
  authentic_usage: string;
  reaction_meaning: string;
  friend_context: string;
}

interface ThreadsPlatform {
  thread_context: string;
  reply_use: string;
  trending_meaning: string;
  quote_use: string;
}

interface TwitchPlatform {
  stream_usage: string;
  emote_mapping: string;
  chat_meaning: string;
  clip_context: string;
  subscriber_context: string;
}

interface SpotifyPlatform {
  playlist_usage: string;
  mood_mapping: string;
  bio_use: string;
  artist_context: string;
}
```

Updated `PlatformLayer`:
```ts
interface PlatformLayer {
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

### 2.2 Expanded Cultural Layer

Expand from 4 to 25 regions:

```ts
interface CulturalLayer {
  cultures: {
    // Existing
    western_genz: string;
    pakistan_india: string;
    middle_east: string;
    global_neutral: string;
    // South Asia
    bangladesh: string;
    sri_lanka: string;
    // East Asia
    china: string;
    japan: string;
    south_korea: string;
    taiwan: string;
    hong_kong: string;
    // Southeast Asia
    philippines: string;
    indonesia: string;
    thailand: string;
    vietnam: string;
    malaysia: string;
    // Middle East / North Africa (expanded)
    saudi_arabia: string;
    uae: string;
    egypt: string;
    turkey: string;
    iran: string;
    // Sub-Saharan Africa
    nigeria: string;
    south_africa: string;
    // Europe
    uk_ireland: string;
    france: string;
    germany: string;
    spain_italy: string;
    // Americas
    brazil: string;
    mexico: string;
    latam: string;
    // Oceania
    australia_nz: string;
  };
}
```

### 2.3 Claude Prompt Expansion

Update `lib/claude.ts` to request all 15 platforms and 25+ cultures in a single call per emoji. The prompt grows but stays one call. Estimated cost per emoji: ~$0.006. Total for 3,700 emojis: ~$22.

### 2.4 Pipeline `--force` Flag

Add `--force` to `scripts/generate-meanings.ts` so it re-generates emojis that already have `official_meaning`. Without `--force`, existing resume behavior is preserved.

---

## 3. New Collections

### 3.1 Comparisons Collection

```ts
interface ComparisonDocument {
  slug: string;              // "skull-vs-ghost" (alphabetically sorted)
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
  winner: string;            // slug of the more popular emoji
  winner_reason: string;
  when_to_use: string;       // practical guide
  created_at: Date;
}
```

**Source:** Relations graph (`related`, `opposite`, `confusing` arrays from each emoji) + AI-generated top pairs via Claude batch.

**Indexes:** `slug` (unique), `emoji1_slug`, `emoji2_slug`

### 3.2 Combos Collection

```ts
interface ComboDocument {
  slug: string;              // "birthday", "love", "aesthetic"
  theme: string;             // Display name: "Birthday"
  combos: Array<{
    emojis: string[];        // ["🎂", "🎉", "🎁", "🥳", "🎈"]
    label: string;           // "Classic Birthday"
  }>;
  seo_description: string;
  created_at: Date;
}
```

**Source:** Claude generates 5 combos per theme from a hardcoded list of ~200 themes.

**Indexes:** `slug` (unique)

---

## 4. New Page Types

### 4.1 Platform Pages

**Route:** `app/[platform]/[slug]/page.tsx`
**URL:** `/tiktok/skull`, `/discord/fire`, `/reddit/clown-face`
**ISR:** `revalidate = 3600`

**Content:**
- Emoji hero (128px, name, unicode, copy button)
- Platform-specific meaning section (full detail for one platform)
- Usage examples on that platform
- "See on other platforms" links (horizontal row of 14 other platform links)
- Link back to full emoji page
- 5 related emojis on the same platform
- 3 FAQ pairs (platform-specific)
- BreadcrumbList JSON-LD: Home > Platforms > TikTok > Skull

**Valid platforms (15):** tiktok, whatsapp, instagram, x, facebook, snapchat, telegram, discord, pinterest, reddit, linkedin, bereal, threads, twitch, spotify

**SEO meta:**
```
Title: "💀 Skull Emoji on TikTok — Meaning, Trends, Hashtags [2026]"
Description: "What does 💀 mean on TikTok? Trend usage, viral hashtags, and how Gen-Z uses the skull emoji on TikTok."
Canonical: https://domain.com/tiktok/skull
```

**`generateStaticParams`:** Returns all `{ platform, slug }` combinations. With 3,700 emojis × 15 platforms = 55,500 pages.

### 4.2 Comparison Pages

**Route:** `app/vs/[slug]/page.tsx`
**URL:** `/vs/skull-vs-ghost`
**ISR:** `revalidate = 3600`

**Content:**
- Two-column hero: emoji1 (128px) — "VS" badge — emoji2 (128px)
- Side-by-side comparison rows: official, Gen-Z, emotional, dating, meme, TikTok, WhatsApp meanings
- Winner badge with percentage/reason
- "When to Use" guide
- 5 related comparisons
- 3 FAQ pairs
- FAQPage + BreadcrumbList JSON-LD

**SEO meta:**
```
Title: "💀 Skull vs 👻 Ghost — Emoji Comparison [2026]"
Description: "What's the difference between 💀 and 👻? Compare meanings across Gen-Z, TikTok, dating, and more."
Canonical: https://domain.com/vs/skull-vs-ghost
```

**`generateStaticParams`:** Returns all slugs from the `comparisons` collection.

### 4.3 Combo Pages

**Route:** `app/combo/[type]/page.tsx`
**URL:** `/combo/birthday`, `/combo/love`
**ISR:** `revalidate = 3600`

**Content:**
- Theme title + description
- Primary combo displayed large with "Copy All" button
- 4 alternate combos for same theme, each with copy button
- Links to each emoji's page
- 3 related combo themes
- BreadcrumbList JSON-LD

**SEO meta:**
```
Title: "Birthday Emoji Combos — Copy & Paste 🎂🎉🎁 [2026]"
Description: "Best birthday emoji combinations for Instagram, TikTok, and WhatsApp. Copy and paste ready."
Canonical: https://domain.com/combo/birthday
```

**`generateStaticParams`:** Returns all slugs from the `combos` collection.

### 4.4 Culture Pages

**Route:** `app/culture/[region]/page.tsx`
**URL:** `/culture/pakistan`, `/culture/japan`
**ISR:** `revalidate = 3600`

**Content:**
- Region hero with flag emoji + region name
- Grid of top 20-30 emojis with their cultural meaning for that region
- Cultural context notes and usage warnings where relevant
- Links to each emoji's full page
- Links to other culture pages
- BreadcrumbList JSON-LD

**SEO meta:**
```
Title: "Emoji Meanings in Pakistan — Cultural Guide [2026]"
Description: "How emojis are used in Pakistan. Cultural meanings, WhatsApp usage, and local interpretations."
Canonical: https://domain.com/culture/pakistan
```

**`generateStaticParams`:** Returns all region slugs from a hardcoded list of 25 regions.

**MongoDB query:** Aggregation that pulls the top 30 emojis by trend score and projects only `character`, `name`, `slug`, and `cultures.{region}`.

---

## 5. Data Generation Scripts

### 5.1 `scripts/generate-comparisons.ts`

1. Fetch all emojis from MongoDB
2. Build pair candidates from `relations.related`, `relations.opposite`, `relations.confusing`
3. Deduplicate pairs (sort slugs alphabetically: skull-vs-ghost, not ghost-vs-skull)
4. Call Claude (10 concurrent) for each pair to generate differences, winner, when-to-use
5. Upsert into `comparisons` collection
6. Resume-safe: skip pairs that already exist
7. Estimated: ~1,500 pairs, ~$5, ~15 min

### 5.2 `scripts/generate-combos.ts`

1. Hardcoded list of ~200 themes: birthday, love, breakup, aesthetic, gym, study, pride, halloween, christmas, graduation, wedding, sad, angry, flirty, funny, chill, hype, toxic, dark, soft, motivational, party, travel, food, music, gaming, sports, nature, weather, animals, family, friendship, work, school, beach, summer, winter, spring, autumn, night, morning, coffee, wine, celebration, congratulations, good-luck, thank-you, sorry, miss-you, thinking-of-you, good-morning, good-night, weekend, monday, friday, self-care, mental-health, meditation, yoga, running, cooking, reading, art, photography, shopping, money, success, failure, nostalgia, vintage, retro, y2k, cottagecore, indie, punk, goth, kawaii, minimalist, maximalist, pastel, neon, rainbow, sparkle, fire-set, ice, water, earth, air, zodiac, astrology, tarot, witchy, spooky, creepy, cute, ugly, weird, random, chaos, peace, war, justice, freedom, rebel, angel, devil, heaven, hell, dream, nightmare, reality, fantasy, sci-fi, horror, comedy, romance, drama, action, mystery, thriller, anime, kpop, bollywood, hollywood, tiktok-aesthetic, instagram-aesthetic, vsco, e-girl, e-boy, soft-girl, dark-academia, light-academia, grunge, preppy, sporty, casual, formal, luxe, budget, diy, handmade, organic, vegan, fitness, wellness, skincare, makeup, hair, nails, fashion, streetwear, haute-couture, vintage-fashion
2. Call Claude (10 concurrent) for each theme: generate 5 emoji combos with 4-8 emojis each
3. Upsert into `combos` collection
4. Resume-safe
5. Estimated: ~200 themes, ~$2, ~3 min

### 5.3 Update `scripts/generate-meanings.ts`

Add `--force` flag:
- Without `--force`: existing behavior (skip emojis with `official_meaning`)
- With `--force`: re-generate all emojis, overwriting existing meaning data
- Usage: `npm run generate:all -- --force`

---

## 6. SEO & Internal Linking

### 6.1 Sitemap Index

With 57K+ URLs, use Next.js `generateSitemaps` to split into multiple files:

```ts
// app/sitemap.ts
export async function generateSitemaps() {
  // Returns [{id: 0}, {id: 1}, ...] for /sitemap/0.xml, /sitemap/1.xml
  // Max 50,000 URLs per sitemap file
}

export default async function sitemap({ id }: { id: number }) {
  // Return URLs for this sitemap chunk
}
```

Sitemap chunks:
- Chunk 0: Homepage + search + combo + culture pages (~300)
- Chunks 1-15: Platform pages, one chunk per platform (~3,700 per chunk)
- Chunk 16: Comparison pages (~3,000)
- Chunk 17: Base emoji pages (~3,700)

### 6.2 Update Existing Emoji Page

Add new sections to `app/emoji/[slug]/page.tsx`:

After the Related Emojis section, add:
- **Platform links:** "See on: TikTok | WhatsApp | Instagram | X | Discord | ..." (links to all 15 platform pages)
- **Comparison links:** "Compare: 💀 vs 👻 | 💀 vs ☠️ | 💀 vs 😵" (from relations, links to `/vs/` pages)

### 6.3 New SEO Utilities

Add to `lib/seo.ts`:
- `generatePlatformMeta(emoji, platform)` — meta tags for platform pages
- `generateComparisonMeta(comparison)` — meta tags for VS pages
- `generateComboMeta(combo)` — meta tags for combo pages
- `generateCultureMeta(region)` — meta tags for culture pages
- Platform-specific FAQ schema generators
- Comparison FAQ schema generator

---

## 7. New MongoDB Queries

Add to `lib/mongodb.ts`:

```ts
getEmojiPlatformData(slug, platform)    // Single emoji, single platform
getComparisonBySlug(slug)                // From comparisons collection
getComboBySlug(slug)                     // From combos collection
getAllComparisonSlugs()                   // For generateStaticParams
getAllComboSlugs()                        // For generateStaticParams
getEmojisByCulture(region, limit)        // Top emojis with cultural data for a region
getRelatedComparisons(slug, limit)       // Related comparison pages
getRelatedCombos(slug, limit)            // Related combo themes
```

---

## 8. New MongoDB Indexes

```
comparisons collection:
  - slug (unique)
  - emoji1_slug
  - emoji2_slug

combos collection:
  - slug (unique)
```

Update `scripts/create-indexes.ts` to include these.

---

## 9. New Redis Cache Keys

```
platform:{platform}:{slug}    → 1 hour TTL
comparison:{slug}              → 1 hour TTL
combo:{slug}                   → 1 hour TTL
culture:{region}               → 1 hour TTL
```

---

## 10. Component Updates

### New Components
- `components/PlatformLinks.tsx` — horizontal row of platform links for an emoji
- `components/ComparisonRow.tsx` — side-by-side meaning comparison row
- `components/ComboDisplay.tsx` — emoji combo with copy-all button
- `components/CopyAllButton.tsx` — copies a full emoji string to clipboard

### Updated Components
- `components/PlatformCard.tsx` — update to handle all 15 platform data shapes
- `components/CultureCard.tsx` — add region flags/labels for all 25 regions

---

## 11. Build Strategy

**Phase A (data expansion):**
1. Update `types/emoji.ts` with new platform + culture interfaces
2. Update `lib/claude.ts` with expanded prompt
3. Add `--force` flag to generate-meanings script
4. Re-run pipeline: `npm run generate:all -- --force`

**Phase B (new data generation):**
1. Build + run `scripts/generate-comparisons.ts`
2. Build + run `scripts/generate-combos.ts`
3. Update `scripts/create-indexes.ts` for new collections

**Phase C (new pages + components):**
1. Build new components (PlatformLinks, ComparisonRow, ComboDisplay, CopyAllButton)
2. Update existing components (PlatformCard, CultureCard)
3. Build platform page: `app/[platform]/[slug]/page.tsx`
4. Build comparison page: `app/vs/[slug]/page.tsx`
5. Build combo page: `app/combo/[type]/page.tsx`
6. Build culture page: `app/culture/[region]/page.tsx`
7. Update existing emoji page with platform/comparison links

**Phase D (SEO infrastructure):**
1. Add new SEO utilities to `lib/seo.ts`
2. Add new MongoDB queries to `lib/mongodb.ts`
3. Add Redis caching for new page types
4. Update sitemap to sitemap index pattern
5. Update `scripts/create-indexes.ts`
