# UI Overhaul — Design Spec

**Date:** 2026-05-26
**Scope:** Full visual overhaul of Navbar, Homepage, Emoji Detail Page, Tool Pages, Footer, and Trending Page. Light theme only (dark mode is a separate future phase).

**Design Direction:** Soft elevated — rounded cards with soft shadows, tinted gradient backgrounds on feature cards, clean typography, premium feel. Inspired by Linear/Notion aesthetics but warmer.

**References:** Emojipedia.org (content structure, category sidebar), emoji.gg (dark modern, card grid), but differentiated with light premium aesthetic.

---

## 1. Navbar Overhaul

**Current:** Logo + search button
**New:** Full navigation bar

**Layout:**
```
[🧠 Emoji Intelligence]  [Emojis ▾] [Tools ▾] [Trending] [Compare]  [🔍 Search emojis...  ⌘K]  [🌙]
```

**Specs:**
- Position: `sticky top-0 z-50`
- Background: `bg-white/80 backdrop-blur-md border-b border-neutral-200`
- **Left:** Logo (🧠) + "Emoji Intelligence" brand text, links to `/`
- **Center nav links:** Emojis (dropdown), Tools (dropdown), Trending (link to `/trending`), Compare (link to `/tools/emoji-vs`)
- **Right:** Inline search pill (click opens SearchModal), dark mode toggle icon (🌙/☀️ — non-functional placeholder until dark mode phase)
- Active page link: `text-primary font-semibold`
- Inactive links: `text-neutral-600 hover:text-primary`

**Dropdowns:**
- "Emojis" dropdown: Single column list of emoji categories (Smileys & Emotion, People & Body, Animals & Nature, etc.) with emoji prefix icons, each linking to `/search?category=X`
- "Tools" dropdown: 2-column grid of all tools with emoji icon + name, each linking to `/tools/{slug}`
- Dropdown style: Soft elevated card (`bg-white rounded-xl shadow-lg border border-neutral-100`), appears on click, dismiss on click-outside or Escape
- Animation: `opacity-0 translate-y-1` → `opacity-100 translate-y-0` transition

**Mobile (< sm breakpoint):**
- Hamburger menu icon replaces nav links
- Opens full-screen overlay menu with links stacked vertically
- Search pill + dark toggle remain visible in header

### Files
- Rewrite: `components/Navbar.tsx`
- Create: `components/NavDropdown.tsx`
- Create: `components/MobileMenu.tsx`

---

## 2. Homepage Overhaul

**Current:** Two-column hero + stats + trending scroll
**New:** Search-first centered layout

### Sections (top to bottom):

**A. Hero Section**
- Background: Gradient `from-[#F8F7FF] to-[#EEF2FF]`, `py-16 sm:py-24`
- Centered layout, `max-w-3xl mx-auto text-center`
- Badge: `inline-flex px-3 py-1 rounded-full bg-primary/10 text-primary text-sm` — "✨ AI-Powered Emoji Intelligence"
- H1: "Every Emoji. Every Meaning." — `text-4xl sm:text-5xl font-extrabold`, "Every Meaning." in gradient text (`bg-gradient-to-r from-primary to-accent-violet bg-clip-text text-transparent`)
- Subtitle: "3,700+ emojis · 15 platforms · 31 cultures" — `text-neutral-500`
- Search bar: White, `rounded-full shadow-lg px-6 py-4`, search icon left, "Search" button right (`bg-primary text-white rounded-full px-6`). Click opens SearchModal.

**B. Popular Emojis Row**
- Section label: "Most Popular" with "Show More →" link to `/search`
- Horizontal row of 8-10 emojis, `text-4xl sm:text-5xl`, centered, `gap-3`
- Each emoji: clickable `Link` to `/emoji/{slug}`, `hover:scale-110 transition-transform`
- Data: Fetch from `getTrendingEmojis(10)`

**C. Tool Showcase**
- Section label: "Tools Playground"
- 3-column grid (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4`)
- Soft elevated cards with tinted gradient backgrounds:
  - Each card: `rounded-2xl shadow-md p-5 hover:shadow-lg transition-shadow`
  - Background: `bg-gradient-to-br from-primary-light/50 to-violet-50/50`
  - Icon: emoji in white box (`bg-white rounded-xl shadow-sm w-12 h-12 flex items-center justify-center text-2xl`)
  - Tool name: `font-semibold text-primary-dark`
  - Description: `text-sm text-neutral-500`
  - Link wrapper to `/tools/{slug}`
- Show 6 tools: Kitchen, Smart Search, Emoji Maker, Text-to-Emoji, Vibe Search, Caption Generator

**D. Category Browse**
- Horizontal scroll of category pills, `gap-2 overflow-x-auto scrollbar-hide`
- Each pill: `px-4 py-2 rounded-full bg-white shadow-sm border border-neutral-100 text-sm font-medium hover:shadow-md`
- Format: "😀 Smileys & Emotion", "👥 People & Body", etc.
- Each links to `/search?category=X`

**Removed:** Stats section, two-column emoji grid

### Files
- Rewrite: `app/page.tsx`

---

## 3. Emoji Detail Page Overhaul

**Current:** Full-bleed gradient hero + sticky TOC + 2-column meaning grid
**New:** Contained hero card + tabbed meanings

### Sections:

**A. Breadcrumb** — Unchanged: `text-sm text-neutral-400`

**B. Hero Card**
- White card: `bg-white rounded-2xl shadow-md p-6 sm:p-8 text-center`
- Emoji: `text-7xl sm:text-8xl`
- H1: `text-2xl sm:text-3xl font-extrabold text-primary-dark`
- Unicode + shortcode: `text-sm text-neutral-500 font-mono`
- Buttons row: Copy emoji, Copy shortcode, Trend score badge
- No gradient background — clean white card

**C. Meaning Tabs** (replaces 2-column MeaningCard grid)
- Tab bar: Horizontal scroll of pills, `gap-2`
- Active tab: `bg-primary text-white rounded-full px-4 py-1.5 text-sm font-medium`
- Inactive tab: `bg-neutral-100 text-neutral-600 rounded-full px-4 py-1.5 text-sm hover:bg-neutral-200`
- Tab options: Gen-Z, Official, Emotional, Dating, Meme, Sarcastic
- Default active: Gen-Z
- Content: Single meaning card below tabs, soft elevated style with colored left border (matching the meaning type color scheme already in MeaningCard)
- Client component required (for tab state)

**D. Platform Meanings** (replaces 3-card grid)
- Row of platform icons as clickable pills: 🎵 TikTok, 💬 WhatsApp, 📸 Instagram, etc.
- Click expands an accordion card below showing that platform's meaning
- Only show platforms that have data for this emoji
- Accordion animation: height transition with `overflow-hidden`

**E. Remaining sections** — Keep structure, upgrade to soft elevated cards:
- Cultures: 2-column grid, `rounded-xl shadow-md` instead of `shadow-sm border`
- Timeline: Same structure, elevated cards
- Design Variations: Same
- Related Emojis: Horizontal scroll, same
- FAQ: Same accordion
- Safety: Same

**F. Remove:** StickyTOC component (no longer needed)

### Files
- Rewrite: `app/emoji/[slug]/page.tsx`
- Create: `components/MeaningTabs.tsx` (client component for tab state)
- Create: `components/PlatformAccordion.tsx` (client component for accordion state)
- Modify: `components/CultureCard.tsx` (card style upgrade)
- Modify: `components/TimelineSection.tsx` (card style upgrade)
- Remove usage of: `StickyTOC` (can keep component file, just remove from page)

---

## 4. Tool Pages Overhaul

**No structural changes** — visual elevation only.

### Changes:
- **ToolHero:** Add subtle gradient background strip: `bg-gradient-to-b from-primary-light/30 to-transparent` behind the hero section, `py-8 -mx-4 px-4 mb-8 rounded-2xl`
- **Form inputs:** Upgrade to `shadow-sm rounded-xl border-0 bg-white focus:shadow-md focus:ring-2 focus:ring-primary/20 transition-shadow`
- **Style selector chips (active):** Change from solid `bg-primary text-white` to tinted `bg-gradient-to-r from-primary/10 to-accent-violet/10 text-primary ring-1 ring-primary/30`
- **Style selector chips (inactive):** `bg-neutral-100 text-neutral-600 hover:bg-neutral-200`
- **Primary action buttons:** Add `shadow-lg hover:shadow-xl transition-shadow`
- **Result cards:** `rounded-xl shadow-md` (remove `border border-neutral-100`), add `hover:shadow-lg transition-shadow`
- **Motion:** Wrap result sections in `StaggerContainer`/`StaggerItem`, wrap page content in `FadeIn`

### Files
- Modify: `components/ToolHero.tsx` (add gradient background)
- Modify: All tool pages (10 files) — update card classes, wrap results in motion components
  - `app/tools/text-to-emoji/page.tsx`
  - `app/tools/vibe-search/page.tsx`
  - `app/tools/caption-generator/page.tsx`
  - `app/tools/emoji-kitchen/page.tsx`
  - `app/tools/emoji-maker/page.tsx`
  - `app/tools/smart-search/page.tsx`
  - `app/tools/emoji-keyboard/page.tsx`
  - `app/tools/emoji-shortcodes/page.tsx`
  - `app/tools/emoji-vs/page.tsx`
  - `app/tools/emoji-trends/page.tsx`

---

## 5. Footer & Other Pages

### Footer
- Add gradient top border: `<div className="h-0.5 bg-gradient-to-r from-primary to-accent-violet" />` above footer
- Change link hover: `hover:text-primary-300` (softer indigo glow) instead of `hover:text-white`
- No structural changes

### Trending Page (`/trending`)
- Upgrade emoji rows to soft elevated cards: `rounded-xl shadow-md` (remove `border border-neutral-100`)
- Add subtle `<hr className="border-neutral-200 my-8" />` between Top 20 / TikTok / Instagram sections
- No structural changes

### Static Pages (About/Privacy/Terms)
- No changes

### Search Category Links
- Footer category links should work: link to `/search?category=Smileys+%26+Emotion` etc. instead of all pointing to `/search`

### Files
- Modify: `components/Footer.tsx`
- Modify: `app/trending/page.tsx`

---

## 6. Scope Boundary

**In this overhaul:**
- Navbar (rewrite)
- Homepage (rewrite)
- Emoji detail page (rewrite)
- Tool pages (visual upgrade, 10 files)
- Footer (minor tweaks)
- Trending page (card upgrade)

**NOT in this overhaul:**
- Dark mode (separate spec + phase)
- Platform pages (`/[platform]/[slug]`) — inherit changes from shared components
- Comparison pages, Combo pages, Culture pages — low traffic, update later
- New features or functionality — this is purely visual
