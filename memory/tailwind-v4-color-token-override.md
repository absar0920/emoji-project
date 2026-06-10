---
name: tailwind-v4-color-token-override
description: Tailwind v4 strips bare :root/.dark redefinitions of @theme --color-* vars; how to re-skin reliably
metadata:
  type: reference
---

**Canonical reference: [`design-system.md`](../../design-system.md) at the repo root** documents every Field Guide token and `fg-*` primitive, the page recipe, and do/don't — read it before building or restyling any page. The whole site (home, nav, footer, search, blog, emoji, platform, trending, all tools, vs/combo/culture, about/privacy/terms) is now on this system.

In this project (Tailwind v4 + Next 16), a bare `:root { --color-primary: ... }` or `.dark { --color-primary: ... }` block that redefines a variable declared in `@theme` is **silently dropped at compile** (Lightning CSS treats `@theme` as the source of truth for `--color-*`). This is why the old "editorial magenta" override in `app/globals.css` never applied and the site rendered the indigo `@theme` default instead.

**How to re-skin reliably:**
- Put the palette on **non-`--color-` variables** (e.g. `--accent`, `--paper`, `--ink`, `--line`) defined on a scope class. The homepage uses `.theme-editorial` (on `<main>`) with a `.dark .theme-editorial { ... }` block for dark mode — these compile and cascade fine.
- The homepage is now **"The Field Guide"** — a typeset reference-book design (Libre Bodoni display, Source Serif 4 body, JetBrains Mono labels, warm paper + oxblood `--accent`). Component styling uses `fg-*` classes (`fg-chapter`, `fg-entry`/`fg-entry--ledger`, `fg-table`, `fg-pull`, `fg-deflist`, `fg-steps`, `fg-glyphgrid`, `fg-tabs`) + `t-ink/t-body/t-muted/t-accent` helpers, all token-backed so light/dark needs no `dark:` utilities. SectionShell renders the numbered chapter frame; chapter ids must match `CHAPTERS` in HomeSidebar (the Contents rail).
- Mono labels: JetBrains Mono is loaded as `--font-mono-jb` (next/font) and `@theme --font-mono` points at it — don't collide the next/font `variable` name with the `@theme` token name.
- Or, to change the real `text-primary`/`bg-primary` utilities site-wide, edit the values **inside `@theme`**.

**Gotcha when testing dark mode headless:** `ThemeProvider` re-asserts the theme from `localStorage` on mount, undoing a manual `documentElement.classList.add('dark')`. Seed `localStorage.setItem('theme','dark')` first.
