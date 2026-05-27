# Dark Mode + Search Navbar Fix

**Date:** 2026-05-27
**Status:** Draft

## Summary

Add a light/dark mode toggle to the emoji platform using Tailwind's `dark:` class variant strategy. Defaults to the user's OS preference (`prefers-color-scheme`), with a manual toggle in the Navbar that persists to localStorage. Also fix the `/search` page which is missing its Navbar (not wrapped in `ClientShell`).

## Toggle Behavior

- **Default:** Follows OS `prefers-color-scheme` setting
- **Manual override:** Toggle button in Navbar cycles light → dark → system
- **Persistence:** User choice saved in localStorage under key `theme` (values: `"light"`, `"dark"`, `"system"`)
- **Flash prevention:** Inline `<script>` in `<head>` reads localStorage before React hydration and applies `dark` class to `<html>` immediately

## Tailwind Configuration

Set `darkMode: "class"` in `tailwind.config.ts`. This tells Tailwind to activate `dark:` variants when `<html>` has `class="dark"`, enabling the manual override rather than relying solely on the CSS media query.

## New Components

### `ThemeProvider`

Client component wrapping the app's children in `layout.tsx`.

- Creates React context with `theme` (current effective theme) and `setTheme` (setter accepting `"light" | "dark" | "system"`)
- On mount: reads `localStorage.getItem("theme")`. If `"system"` or absent, checks `window.matchMedia("(prefers-color-scheme: dark)")` and listens for changes
- Applies/removes `dark` class on `document.documentElement`
- Writes preference to localStorage on change

### `ThemeToggle`

Small button component placed in the Navbar.

- Shows sun icon (☀️) in dark mode, moon icon (🌙) in light mode, monitor icon (🖥️) in system mode
- Clicking cycles: light → dark → system → light
- Uses `useTheme()` hook from ThemeProvider context

### Flash Prevention Script

Inline `<script>` tag in `layout.tsx`, placed before `{children}` inside `<body>`:

```javascript
(function() {
  var theme = localStorage.getItem('theme');
  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  }
})();
```

This runs synchronously before React hydration, preventing a white flash for dark mode users.

## Color Palette Mapping

### Backgrounds

| Light | Dark |
|-------|------|
| `bg-[#F9FAFB]` / body bg | `dark:bg-slate-900` (#0F172A) |
| `bg-white` (cards, panels) | `dark:bg-slate-800` (#1E293B) |
| `bg-neutral-100` (inputs, chips) | `dark:bg-slate-700` (#334155) |
| `bg-neutral-50` | `dark:bg-slate-900` |
| `bg-neutral-50/50` | `dark:bg-slate-800/50` |
| Hero gradients `from-[#F8F7FF] to-[#EEF2FF]` | `dark:from-slate-800 dark:to-indigo-950` |
| `bg-primary-light` / `bg-primary-light/30` | `dark:bg-indigo-900/30` |
| `bg-primary/10` (badges) | `dark:bg-indigo-500/20` |

### Text

| Light | Dark |
|-------|------|
| `text-primary-dark` (#1E1B4B) | `dark:text-indigo-100` (#E0E7FF) |
| `text-neutral-900` | `dark:text-slate-100` |
| `text-neutral-700` / `text-neutral-600` | `dark:text-slate-300` (#CBD5E1) |
| `text-neutral-500` / `text-neutral-400` | `dark:text-slate-400` (#94A3B8) |

### Borders

| Light | Dark |
|-------|------|
| `border-neutral-100` / `border-neutral-200` | `dark:border-slate-700` |

### Special Components

| Component | Light | Dark |
|-----------|-------|------|
| Navbar | `bg-white/80 backdrop-blur-md border-b border-neutral-200` | `dark:bg-slate-900/80 dark:border-slate-700` |
| SearchModal backdrop | `bg-black/50` (stays same) | — |
| SearchModal inner | `bg-white` | `dark:bg-slate-800` |
| MobileMenu | `bg-white` | `dark:bg-slate-900` |
| Skeleton shimmer | `#E5E7EB → #F3F4F6 → #E5E7EB` | `#1E293B → #334155 → #1E293B` |
| BlogContent prose | `prose-neutral` | `dark:prose-invert` |
| CopyButton (copied state) | `bg-accent-emerald text-white` | stays same (good contrast) |
| Primary button | `bg-primary text-white` | stays same (good contrast) |

### CSS Changes (`globals.css`)

Add dark body defaults:
```css
.dark body {
  background-color: #0F172A;
  color: #CBD5E1;
}
```

Add dark shimmer variant:
```css
.dark .skeleton {
  background: linear-gradient(90deg, #1E293B 25%, #334155 50%, #1E293B 75%);
}
```

## Search Page Navbar Fix

**Problem:** `app/search/page.tsx` renders inside a bare `<>` fragment instead of `<ClientShell>`, so it's missing the Navbar and SearchModal.

**Fix:** Import `ClientShell` and wrap the page content with it, replacing the `<>` fragment. Also add `dark:` color variants while touching the file.

## Scope of Color Changes

All ~60+ files with hardcoded light-mode colors get `dark:` variant additions. Changes are purely additive — no existing classes are removed. The files break down as:

- **Pages (~20):** homepage, emoji detail, platform, vs, combo, culture, search, blog (3), tools (11), trending, about, privacy, terms, error, not-found
- **Components (~25):** Navbar, MobileMenu, Footer, ClientShell, SearchModal, EmojiPicker, BlogCard, BlogContent, CopyButton, CopyAllButton, ToolHero, MeaningTabs, PlatformAccordion, CultureCard, TimelineSection, RelatedEmojis, PlatformLinks, DesignVariations, ComboDisplay, ComparisonRow, EmojiCard, MeaningCard, PlatformCard, HeroSearchBar, NavDropdown, StickyTOC
- **Loading skeletons (~20):** All loading.tsx files
- **Config (2):** tailwind.config.ts, globals.css

## What Is Explicitly Out of Scope

- Custom color picker or multiple theme options beyond light/dark/system
- Per-page theme overrides
- Dark mode for WordPress admin
- Dark OG images (dynamic OG images stay light for social sharing contrast)
- Animated transition between themes (instant switch is fine)

## File Change Summary

| Change Type | Files | Count |
|-------------|-------|-------|
| New file | `components/ThemeProvider.tsx` | 1 |
| New file | `components/ThemeToggle.tsx` | 1 |
| Modified | `tailwind.config.ts` (add darkMode: "class") | 1 |
| Modified | `app/globals.css` (dark body + dark shimmer) | 1 |
| Modified | `app/layout.tsx` (ThemeProvider + flash script) | 1 |
| Modified | `components/Navbar.tsx` (add ThemeToggle) | 1 |
| Modified | `components/MobileMenu.tsx` (dark colors) | 1 |
| Modified | `app/search/page.tsx` (ClientShell fix + dark) | 1 |
| Modified | Pages (dark variants) | ~20 |
| Modified | Components (dark variants) | ~25 |
| Modified | Loading skeletons (dark variants) | ~20 |
| **Total** | | **~73 files** |
