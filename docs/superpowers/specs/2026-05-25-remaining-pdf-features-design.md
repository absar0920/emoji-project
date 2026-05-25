# Remaining PDF Features — Design Spec

**Date:** 2026-05-25
**Scope:** 6 features from the original emoji-meanings.pdf that are not yet implemented.

---

## 1. Emoji Maker (AI-Generated)

**Route:** `/tools/emoji-maker`
**API:** POST `/api/tools/emoji-maker`

### What it does
User types a text description (e.g. "happy cat with sunglasses"), selects a style, and receives AI-generated custom emoji images.

### UI
- `ToolHero` with title "Emoji Maker", badge "AI-Powered"
- Text input (max 200 chars) for the description
- Style selector chips: Emoji, Cartoon, Pixel Art, Sticker
- "Generate" button
- Results: 2x2 grid of 4 image variations, each with Download and Share buttons

### API Route
- Validates `prompt` (required, max 200 chars) and `style` (one of 4 valid values)
- Calls Gemini image generation with prompt: `"Generate a {style}-style emoji of: {prompt}. Square format, transparent background, expressive, suitable for messaging apps."`
- Returns `{ images: string[] }` (array of base64 data URIs, since Gemini returns inline image data)
- Cache key: `maker:{style}:{hash(prompt)}`, 1hr TTL

### Dependencies
- `@google/generative-ai` (already installed)
- Gemini model must support image generation (use `gemini-2.0-flash` with image output or `imagen-3.0-generate-002`)

### Files
- `app/tools/emoji-maker/page.tsx` (client component)
- `app/tools/emoji-maker/layout.tsx` (metadata)
- `app/api/tools/emoji-maker/route.ts`

---

## 2. Smart Search (AI Semantic Engine)

**Integration point:** Enhances existing `SearchModal` component
**API:** POST `/api/tools/smart-search`

### What it does
When users type natural language queries (e.g. "breakup emoji for TikTok", "sarcastic ok on WhatsApp"), the system uses Gemini to parse intent and return emojis with the relevant meaning layer highlighted.

### Detection Logic
A query triggers smart search when:
- Length > 2 words, AND
- Contains context keywords like "meaning", "on tiktok", "for dating", "whatsapp", "sarcastic", "meme", platform names, or culture references

Otherwise, falls back to existing fuzzy search.

### API Route
- Input: `{ query: string }` (max 300 chars)
- Gemini prompt extracts: `{ emotion, platform, culture, use_case, search_terms }`
- Queries MongoDB using extracted `search_terms` against emoji name/tags
- For each result, selects the most relevant meaning layer based on the parsed intent
- Returns: `{ results: Array<{ character, slug, name, relevant_meaning: string, why: string }> }`
- Cache key: `smart:{hash(query)}`, 1hr TTL

### Fallback
If Gemini fails, times out (>3s), or query is simple: fall back to existing fuzzy search behavior. No user-visible error.

### Files
- `app/api/tools/smart-search/route.ts`
- Modify: `components/SearchModal.tsx` (add smart search detection + call)

---

## 3. Device Variation Layer

**Integration point:** Emoji detail page (`app/emoji/[slug]/page.tsx`)
**Data script:** `scripts/generate-design-variations.ts`

### What it does
Shows how each emoji renders across different vendors (Google, Twitter, OpenMoji) with images, plus native Unicode rendering for Apple/Samsung/WhatsApp/Facebook.

### Data Model
Add to `EmojiDocument` in `types/emoji.ts`:

```ts
design_variations?: {
  google_noto?: string;    // CDN URL to Noto emoji PNG
  twemoji?: string;        // CDN URL to Twemoji SVG
  openmoji?: string;       // CDN URL to OpenMoji SVG
}
```

### CDN URL Patterns
- **Google Noto:** `https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/128/emoji_u{codepoint}.png`
- **Twemoji:** `https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/{codepoint}.svg`
- **OpenMoji:** `https://openmoji.org/data/color/svg/{CODEPOINT}.svg`

Where `{codepoint}` is the hex codepoint(s) joined by `_` (Noto) or `-` (Twemoji) in lowercase, and `{CODEPOINT}` is uppercase for OpenMoji.

### Script
`scripts/generate-design-variations.ts`:
- Iterates all emojis in MongoDB
- Converts emoji character to codepoint format for each CDN
- HEAD-checks each URL to verify it exists
- Upserts `design_variations` field into emoji document
- Batch processing with progress logging

### UI Component
"How It Looks" section on the emoji detail page. Horizontal row of cards:

| Vendor | Render | License |
|--------|--------|---------|
| Apple | Native Unicode character | N/A (user's device) |
| Google | Noto PNG from CDN | Apache 2.0 |
| Twitter | Twemoji SVG from CDN | CC BY 4.0 |
| OpenMoji | OpenMoji SVG from CDN | CC BY-SA 4.0 |
| Samsung | Native Unicode character | N/A (user's device) |

Each card shows vendor name + image/character.

### Files
- Modify: `types/emoji.ts` (add `design_variations` to EmojiDocument)
- Modify: `app/emoji/[slug]/page.tsx` (add "How It Looks" section)
- Create: `scripts/generate-design-variations.ts`
- Create: `components/DesignVariations.tsx`

---

## 4. Trending Page

**Route:** `/trending` (top-level, not under `/tools/`)

### What it does
A SEO-focused trending page with three sections showing currently popular emojis, filterable by platform.

### Sections
1. **Today's Top 20** — `getTrendingEmojis(20)`, ranked by `trend_score` descending
2. **Trending on TikTok** — Emojis where `virality.tiktok_freq` is "viral" or "high", sorted by `trend_score`, limit 10
3. **Trending on Instagram** — Same filter on `virality.instagram_freq`, limit 10

### MongoDB
Add to `lib/mongodb.ts`:
```ts
getTrendingByPlatform(platform: "tiktok" | "instagram", limit: number): Promise<EmojiDocument[]>
```
Filters on `virality.{platform}_freq` being "viral" or "high", sorts by `virality.trend_score` descending.

### Page
- Server component with `export const dynamic = "force-dynamic"`
- Uses `ClientShell` + `Footer` directly (not the `/tools/` layout)
- SEO metadata: "Trending Emojis 2026 — Most Viral Emojis Today"
- Each emoji row is a `Link` to `/emoji/{slug}` with rank badge, character, name, category, trend score pill, and platform frequency badge

### Files
- Create: `app/trending/page.tsx`
- Modify: `lib/mongodb.ts` (add `getTrendingByPlatform`)

---

## 5. About / Privacy / Terms

**Routes:** `/about`, `/privacy`, `/terms`

### What they are
Three static server-rendered pages with professional copy. No database queries.

### Shared Layout
All three use `ClientShell` + a centered prose container (`max-w-3xl mx-auto px-4 py-12`) + `Footer`. Clean, readable typography.

### About Page (`/about`)
- Title: "About Emoji Intelligence"
- Content: Mission statement, what the platform covers (3,700+ emojis, 15 platforms, 31 cultures, 9+ tools), how data is generated (AI-powered semantic analysis), link to tools and search

### Privacy Policy (`/privacy`)
- Title: "Privacy Policy"
- Sections: What We Collect (nothing personal — no accounts, no login), Cookies & Local Storage (localStorage for recent emojis only), Third-Party Services (Google AdSense, Google Gemini API, Vercel Analytics), Data Retention (no personal data stored), Contact

### Terms of Service (`/terms`)
- Title: "Terms of Service"
- Sections: Acceptance of Terms, Description of Service, Content Disclaimer (AI-generated meanings may not be accurate), Intellectual Property, Limitation of Liability, Changes to Terms

### Files
- Create: `app/about/page.tsx`
- Create: `app/privacy/page.tsx`
- Create: `app/terms/page.tsx`

---

## 6. Performance Polish

### Framer Motion
Install `framer-motion`. Add minimal, tasteful animations:

- **Page-level fade-in**: Wrap tool page content in a `motion.div` with `initial={{ opacity: 0 }}` / `animate={{ opacity: 1 }}`
- **Stagger-in results**: Tool results (vibe search grid, caption cards, smart search results) animate in with staggered delay
- **Copy feedback**: CopyButton gets a brief scale bounce on click
- **Emoji grid hover**: Subtle scale on hover for keyboard/shortcode grids

Implementation: Create a `components/MotionWrappers.tsx` with reusable `FadeIn`, `StaggerContainer`, `StaggerItem` components. Individual tool pages import these rather than adding framer-motion code everywhere.

### Custom 404 Page (`app/not-found.tsx`)
- Random emoji displayed large
- "Page not found" message
- Search bar (reuse existing search input pattern)
- Links to: Homepage, Popular Emojis, Tools

### Custom Error Page (`app/error.tsx`)
- Client component (required by Next.js)
- "Something went wrong" message
- Retry button (`reset()` function)
- Link to homepage

### Files
- Install: `framer-motion`
- Create: `components/MotionWrappers.tsx`
- Create: `app/not-found.tsx`
- Create: `app/error.tsx`
- Modify: `components/CopyButton.tsx` (add scale bounce)
- Modify: Tool pages that display results (wrap result sections in StaggerContainer)
