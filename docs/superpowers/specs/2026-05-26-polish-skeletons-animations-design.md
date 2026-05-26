# Polish: Skeleton Loading Screens & Framer Motion Animations

**Date:** 2026-05-26
**Status:** Draft
**Approach:** Next.js `loading.tsx` + Framer Motion (Approach A)

## Summary

Add skeleton loading screens and entrance/interaction animations across all page types. Goal is both perceived performance (eliminate "Loading..." text, show instant skeletons) and visual delight (staggered reveals, hover/tap micro-interactions). Animation feel is subtle & snappy: 150-300ms durations, no spring physics, no page transitions.

## Skeleton Primitive Components

A single `components/Skeleton.tsx` file exports reusable primitives. All use a shared CSS `@keyframes shimmer` animation added to `globals.css`. Shimmer gradient colors match the neutral palette: `#E5E7EB` → `#F3F4F6` → `#E5E7EB`.

### Components

| Component | Props | Purpose |
|-----------|-------|---------|
| `Skeleton` | `w?: string, h?: string, round?: boolean, className?: string` | Base block — configurable rectangle or circle |
| `SkeletonCard` | `className?: string` | Icon placeholder (48x48) + 2 text lines |
| `SkeletonGrid` | `cols?: number, count?: number` | Responsive grid of `SkeletonCard` |
| `SkeletonTabs` | `count?: number` | Tab bar (row of rounded rects) + content lines |
| `SkeletonChips` | `count?: number` | Row of pill-shaped placeholders |

### CSS (added to globals.css)

```css
@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
.skeleton {
  background: linear-gradient(90deg, #E5E7EB 25%, #F3F4F6 50%, #E5E7EB 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
  border-radius: 8px;
}
```

## loading.tsx Files

18 new `loading.tsx` files, one per route segment. Each composes skeleton primitives to approximate the page layout.

### Route Map

```
app/
├── loading.tsx                          ← homepage
├── emoji/[slug]/loading.tsx             ← hero circle + tabs + grid
├── [platform]/[slug]/loading.tsx        ← platform hero + content
├── vs/[slug]/loading.tsx                ← side-by-side comparison
├── combo/[type]/loading.tsx             ← combo grid
├── culture/[region]/loading.tsx         ← culture card grid
├── search/loading.tsx                   ← search results grid
└── tools/
    ├── emoji-kitchen/loading.tsx
    ├── vibe-search/loading.tsx
    ├── smart-search/loading.tsx
    ├── text-to-emoji/loading.tsx
    ├── caption-generator/loading.tsx
    ├── emoji-vs/loading.tsx
    ├── emoji-combos/loading.tsx
    ├── emoji-keyboard/loading.tsx
    ├── emoji-shortcodes/loading.tsx
    ├── emoji-trends/loading.tsx
    └── emoji-maker/loading.tsx
```

### Skeleton Layouts Per Route

**Homepage (`app/loading.tsx`):**
- Gradient hero area with search bar placeholder (pill shape)
- Row of 10 square placeholders (trending emojis)
- 3-column grid of `SkeletonCard` (tools)
- `SkeletonChips` row (categories)

**Emoji Detail (`app/emoji/[slug]/loading.tsx`):**
- Breadcrumb line skeleton
- Centered hero: `Skeleton` circle (96px), heading line, subtitle line, 2 chip buttons
- `SkeletonTabs` (4 tabs + 3 content lines)
- Section heading + `SkeletonGrid` 2-col (culture cards)
- Section heading + 4 timeline rows
- Section heading + `SkeletonGrid` 3-col (related emojis)
- Section heading + `SkeletonChips` (platform links)

**Platform Page (`app/[platform]/[slug]/loading.tsx`):**
- Platform icon placeholder + heading
- Content lines (meaning data)
- `SkeletonChips` (other platforms)

**VS Page (`app/vs/[slug]/loading.tsx`):**
- Two emoji hero placeholders side-by-side
- Comparison rows (heading + 2-col content blocks)

**Combo Page (`app/combo/[type]/loading.tsx`):**
- Theme heading placeholder
- Grid of combo card skeletons

**Culture Page (`app/culture/[region]/loading.tsx`):**
- Region heading + flag placeholder
- 2-column grid of culture meaning cards

**Search Page (`app/search/loading.tsx`):**
- Search bar placeholder
- `SkeletonGrid` 3-col for results

**Tool Pages (`app/tools/*/loading.tsx`):**
- All 11 tool pages share a similar skeleton pattern: icon placeholder (48px) + heading + description line + input area rect + action button pill
- Minor per-tool variations (e.g., emoji-kitchen shows 2 picker areas, emoji-keyboard shows a wider grid)

## Animation System

### Components in `MotionWrappers.tsx`

**Existing (activate — currently unused in pages):**

| Component | Animation | Duration |
|-----------|-----------|----------|
| `FadeIn` | opacity 0→1, y 8→0 | 300ms |
| `StaggerContainer` | staggers children at 60ms intervals | 60ms/child |
| `StaggerItem` | opacity 0→1, y 12→0 | 250ms |

**New:**

| Component | Animation | Duration |
|-----------|-----------|----------|
| `AnimatedSection` | fade-up on viewport entry via `whileInView`, `once: true` | 300ms |
| `AnimatedCard` | hover: translateY(-2px) + elevated shadow, tap: scale(0.97) | 150ms |

### Animation Mapping

**Homepage (`app/page.tsx`):**
- Hero heading + search bar: `FadeIn`
- Trending emojis row: `StaggerContainer` + `StaggerItem`
- Tools grid cards: `StaggerContainer` + `AnimatedCard`
- Category chips: `StaggerContainer` + `StaggerItem`

**Emoji Detail (`app/emoji/[slug]/page.tsx`):**
- Hero card: `FadeIn`
- Each section (meanings, platforms, cultures, timeline, related, comparisons, combos, see-also, FAQ, safety, design variations): `AnimatedSection`
- Related emojis grid: `StaggerContainer` + `AnimatedCard`
- Culture cards: `StaggerContainer` + `StaggerItem`

**Platform / VS / Combo / Culture Pages:**
- Hero area: `FadeIn`
- Content sections: `AnimatedSection`

**Tool Pages (all):**
- Result area when results arrive: `FadeIn` (replaces abrupt appearance)

**Search Modal:**
- Result rows: `StaggerContainer` + `StaggerItem`

**All Card Components (EmojiCard, tool cards, combo cards, comparison pills):**
- Wrap with `AnimatedCard` for hover lift + tap scale

### Timing Scale

| Interaction | Duration |
|-------------|----------|
| Tap feedback | 150ms |
| Hover lift | 150ms |
| Stagger gap | 60ms per child |
| Fade-in (elements) | 250ms |
| Section entrance | 300ms |

## Inline Loading State Upgrades

Client components that currently show plain "Loading..." text:

### SearchModal.tsx
- **Index loading state:** Replace `"Loading search index..."` with 3 skeleton result rows (32px icon square + 2 text lines each)
- **AI thinking state:** Replace `"Thinking..."` block with pulsing 3-dot animation + contextual message ("Finding the perfect emojis...")
- **Results appearance:** Wrap result list in `StaggerContainer`, each result in `StaggerItem`

### EmojiPicker.tsx
- **Loading state:** Replace `"Loading..."` with 6×2 grid of 32px skeleton squares matching the emoji grid

### Tool Pages (all 10+ with API calls)
- **Loading/generating state:** Replace text indicators with skeleton block matching expected result shape (text lines + chip placeholders)
- **Results appearance:** Wrap in `FadeIn`

### No Changes Needed
- `DesignVariations.tsx` — already uses `loading="lazy"` on images
- `CopyButton.tsx` — already has `whileTap` animation

## What Is Explicitly Out of Scope

- **Page transitions between routes:** Would require layout-level `AnimatePresence` + route awareness. Too much complexity for marginal gain given the subtle & snappy direction.
- **Spring physics:** All animations use `ease` or `easeOut` curves, no bouncing.
- **Scroll-linked parallax:** No parallax effects.
- **Animated emoji characters:** No character-level animations (bouncing emojis, etc.).
- **Dark mode skeleton variants:** Project doesn't have dark mode.

## File Change Summary

| Change Type | Files | Count |
|-------------|-------|-------|
| New file | `components/Skeleton.tsx` | 1 |
| New files | `app/**/loading.tsx` | 18 |
| Modified | `app/globals.css` (shimmer keyframes) | 1 |
| Modified | `components/MotionWrappers.tsx` (add AnimatedSection, AnimatedCard) | 1 |
| Modified | `app/page.tsx` (wrap sections in motion components) | 1 |
| Modified | `app/emoji/[slug]/page.tsx` (wrap sections in AnimatedSection) | 1 |
| Modified | `app/[platform]/[slug]/page.tsx` (FadeIn + AnimatedSection) | 1 |
| Modified | `app/vs/[slug]/page.tsx` (FadeIn + AnimatedSection) | 1 |
| Modified | `app/combo/[type]/page.tsx` (FadeIn + AnimatedSection) | 1 |
| Modified | `app/culture/[region]/page.tsx` (FadeIn + AnimatedSection) | 1 |
| Modified | `components/SearchModal.tsx` (skeleton + stagger results) | 1 |
| Modified | `components/EmojiPicker.tsx` (skeleton grid) | 1 |
| Modified | Tool pages (10+) (result skeleton + FadeIn) | ~11 |
| **Total** | | **~40 files** |
