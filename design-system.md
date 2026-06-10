# The Field Guide — Design System

The site is styled as a single typeset reference publication: **ink on warm paper, one
oxblood accent, hairline rules, no shadows, no rounded corners.** Type does the work —
a Didone display face, a serif reading face, and a mono label face.

Everything lives in `app/globals.css` under the `.theme-editorial` scope. To put a page
"in the Field Guide," wrap its content in that scope and compose the `fg-*` primitives
below. Content stays plain; the system carries the look.

---

## 1. The rule that makes it work (read first)

Tailwind v4 **silently strips bare `:root` / `.dark` redefinitions of `@theme` `--color-*`
variables.** So the palette is NOT built on `--color-*`. It lives on ordinary CSS
variables defined on the `.theme-editorial` class, which cascade to descendants and
auto-swap in dark mode via `.dark .theme-editorial`.

- ✅ Use the tokens: `var(--ink)`, `var(--accent)`, `var(--paper)`, … (below).
- ✅ Use the helper classes (`t-ink`, `t-accent`, `fg-*`) — they're token-backed, so
  **light/dark needs no `dark:` utilities**.
- ❌ Don't use `text-primary` / `bg-primary` / `text-neutral-*` / `bg-white dark:bg-slate-*`
  inside a Field Guide page — that's the old indigo card template.
- ❌ `hover:` / `dark:` Tailwind variants do **not** work on custom classes
  (`hover:t-accent` is a no-op). Hover/active states are baked into the classes
  (`fg-link`, `fg-navlink`, `fg-chip[data-active]`, …) or done in `globals.css`.

Fonts (set in `app/layout.tsx`, exposed via `@theme`): `--font-serif` = Libre Bodoni
(display), `--font-read` = Source Serif 4 (body), `--font-mono` = JetBrains Mono
(labels; loaded as `--font-mono-jb` to avoid an `@theme` name collision).

---

## 2. Tokens (`.theme-editorial`)

| Token | Light | Role |
|---|---|---|
| `--paper` | `#f7f2e9` | page background |
| `--paper-2` | `#efe8da` | inset surface / hover / field bg |
| `--ink` | `#1c1916` | headings, strong text |
| `--ink-2` | `#4b443c` | reading body |
| `--ink-3` | `#8c8475` | labels, captions, muted |
| `--line` | `#ddd3c2` | hairline rules |
| `--rule` | `#1c1916` | strong (2px) ink rules |
| `--accent` | `#8a2b22` | THE oxblood accent (one only) |
| `--accent-2` | `#6f221b` | deeper accent |
| `--good` / `--warn` / `--bad` | green / amber / brick | semantic status only |

Dark mode flips all of these automatically (`.dark .theme-editorial`) — near-black paper,
cream ink, a softened rose accent. Never hardcode hex in components; reference the tokens.

---

## 3. Page recipe

```tsx
<ClientShell>
  <main className="theme-editorial min-h-screen">
    <div className="max-w-3xl mx-auto px-5 sm:px-6 py-9 sm:py-12">
      {/* running head */}
      <div className="fg-runhead mb-10 sm:mb-12">
        <span className="flex items-center gap-2 min-w-0">
          <Link href="/" className="fg-link">Home</Link>
          <span className="opacity-40" aria-hidden="true">/</span>
          <span className="t-ink truncate">This Page</span>
        </span>
        <span className="hidden sm:inline shrink-0">Field Guide</span>
      </div>

      {/* masthead */}
      <div className="border-b-2 border-[var(--rule)] pb-7 mb-9">
        <p className="fg-kicker mb-4">Kicker</p>
        <h1 className="font-display t-ink leading-[1.02] tracking-[-0.015em] text-[2.6rem] sm:text-[3.6rem]">
          Page Title
        </h1>
        <p className="t-muted font-read mt-4 max-w-2xl">Optional standfirst.</p>
      </div>

      {/* chapters / content … */}
    </div>
  </main>
  <Footer />
</ClientShell>
```

**Container widths:** `max-w-3xl` for reading/article/entry pages; `max-w-5xl` (tools) or
`max-w-6xl` (index grids, home) for wider content. The home page additionally renders a
sticky **Contents** rail (`components/HomeSidebar.tsx`, whose `CHAPTERS` ids must match the
section `id`s).

---

## 4. Primitive catalog

### Text & labels
- `t-ink` `t-body` `t-muted` `t-accent` — theme-aware text colors.
- `mono` `font-read` `font-display` — font families (display = Bodoni).
- `fg-label` — mono uppercase tracked caption (ink-3).
- `fg-kicker` — mono uppercase tracked **accent** eyebrow.
- Rules: `rule-hair` (1px line), `rule-strong` (2px ink); or `border-[var(--line)]` /
  `border-[var(--rule)]`.

### Chapter frame — `components/home/SectionShell.tsx`
```tsx
<SectionShell n="03" id="origin" title="Chapter Title" dek="Optional." count="12 entries">
  …
</SectionShell>
```
Renders the thick top rule + mono number + count + Didone title + italic dek. For one-off
sections, inline the same with `fg-chapter__bar` / `fg-chapter__n` / `fg-chapter__count` /
`fg-chapter__title`. (Tools use `components/kitchen/Section.tsx` `<KSection>` for the same.)

### Dictionary / ledger entries — `fg-list` + `fg-entry`
For meaning lists (emoji + name + definition). Add `fg-entry--ledger` to put the name in a
left column on desktop.
```tsx
<div className="fg-list">
  <div className="fg-entry fg-entry--ledger">
    <span className="fg-entry__glyph">🥺</span>
    <div className="fg-entry__main">
      <span className="fg-entry__name">Pleading Face</span>
      <p className="fg-entry__text">Vulnerable plea…</p>
      <p className="fg-entry__meta">optional mono meta — <b>Send</b> …</p>
    </div>
  </div>
</div>
```

### Ledger table — `fg-table-wrap` + `fg-table`
No box, thick ink top/bottom rules, mono uppercase headers, hairline rows. Cell classes:
`em` (large single glyph), `emrow` (emoji string), `strong` (ink), `muted` (small ink-3),
`mono`.
```tsx
<div className="fg-table-wrap">
  <table className="fg-table">
    <thead><tr><th>Emoji</th><th>Meaning</th></tr></thead>
    <tbody><tr><td className="em">😤</td><td className="strong">Triumph…</td></tr></tbody>
  </table>
</div>
```

### Pull quote — `fg-pull` (replaces colored callout boxes)
Large italic Didone between ink rules. Use `fg-pull--sm` for 2–3 sentence notes. Put a
`fg-kicker` label inside; **never use 💡/⚠️ emoji as heading icons.**
```tsx
<div className="fg-pull fg-pull--sm">
  <span className="fg-kicker">In Practice</span>
  <p>The insight, in italic serif.</p>
</div>
```

### Prose
- `fg-lead` — larger lead paragraph; add `fg-lead--cap` for an accent drop cap.
- `fg-prose` — paragraph spacing; `fg-cols2` for two-column justified text (≥900px).
- `fg-deflist` — `<dl>` with mono `<dt>` + serif `<dd>` (definitions, "see also", grouped notes).
- `fg-article` — full styling for **raw/dangerouslySetInnerHTML** content (blog posts):
  Didone h2/h3, accent links, em-dash bullets, accent blockquotes, hairline images & code.
  (The Tailwind `prose` plugin is NOT loaded — use this instead.)

### Numbered steps — `fg-steps` / `fg-step`
```tsx
<ol className="fg-steps">
  <li className="fg-step"><span className="fg-step__n">1</span><div>
    <h3 className="fg-step__h">Title</h3><p className="fg-step__t">…</p>
  </div></li>
</ol>
```

### Specimens (emoji as figures)
- `fg-specimen` + `fg-specimen__g` (glyph) + `fg-specimen__c` (mono caption) — used in the
  hero plate, related-emoji strips, vendor rendering rows.
- `fg-specimen-grid` — responsive auto-fill grid of specimens (search index).
- `fg-glyphgrid` + `fg-glyph` (+ `.copied`) — hairline-celled copy-to-clipboard sheet.

### Filing-index tabs — `fg-tabs` / `fg-tab`
```tsx
<div className="fg-tabs">
  <button className="fg-tab" data-active={active} aria-pressed={active}>Label</button>
</div>
```

### Navigation (in `Navbar`, `MobileMenu`, `NavDropdown`, ToCs)
- `fg-navlink` — mono uppercase nav link (hover/`data-active` → accent). Also used for
  ruled cross-link rows (platforms, categories, pagination).
- `fg-iconbtn` — bordered zero-radius square icon button.
- `fg-menuitem` — dropdown/menu row (hover → paper-2 + accent).
- `fg-link` — inline link, ink → accent on hover.

### Forms & widgets (tools)
- `fg-field` — inset text input / textarea (paper-2, focus → accent border).
- `fg-btn` — primary oxblood button (mono uppercase); `fg-btn-ghost` — outline variant.
- `fg-chip` — selectable mono chip; `data-active` fills with accent.
- `fg-card` — bordered surface (no shadow); hover → accent border for links/buttons.
- `fg-alert` — left-rule accent notice (errors).
- `fg-detail` + `fg-chev` — native `<details>` with a rotating chevron (SSR-friendly FAQ).
- `bg-accent-ed` — accent fill for toasts/badges.

### Shared components with an editorial mode
`CopyButton` and `PlatformLinks` take `tone="editorial"` to render in Field Guide style
(they default to the legacy look elsewhere). `EmojiPicker`, `CopyAllButton`,
`ComparisonRow`, `ComboDisplay` are already Field Guide.

---

## 4b. Loading, empty & error states

- **Route loading** (`loading.tsx`): use the helpers in `components/Skeleton.tsx` —
  `<PageSkeleton wide?>` wraps theme-editorial + container + a `MastheadSkeleton`; fill it
  with `<SkeletonRows>`, `<SkeletonGrid>`, or `<SkeletonSpecimens>`. Tool routes share a
  single `app/tools/loading.tsx` (rendered inside the tools layout, so no wrapper needed).
- **Skeletons** use the warm token-based `.fg-shimmer` (works in light/dark, anywhere).
  No shadows, zero radius — same as everything else.
- **Empty states**: a centered glyph + a mono uppercase line
  (`mono text-[0.78rem] uppercase tracking-[0.14em] t-muted`) inside `border-y border-[var(--line)]`.
- **Error / 404** (`app/error.tsx`, `app/not-found.tsx`): big glyph, `fg-kicker`, Didone
  title, `t-muted` dek, `fg-btn` + `fg-btn-ghost` actions.
- **Search modal** (`components/SearchModal.tsx`): a `theme-editorial` paper panel, ruled
  input + `ESC` chip, `fg-kicker` section labels, hairline result rows (hover → `paper-2`),
  accent loading dots. Reference pattern for any future overlay/dialog.

The site `<body>` background is warm paper (`#f7f2e9` / dark `#100e0c`) so there's no cool-gray
flash behind the translucent nav or during loads.

## 5. Do / Don't

| Do | Don't |
|---|---|
| One oxblood accent, used sparingly | A second accent or rainbow chips |
| Hairline rules + whitespace for structure | Box shadows, rounded cards |
| Mono labels, Didone titles, serif body | Sans-serif UI text in content |
| Let the emoji be the only loud color | Decorative emoji as structural icons (💡/⚠️) |
| Tables/lists/deflists per content type | One uniform card-grid for everything |
| `t-*` / `fg-*` token classes | `text-primary`, `bg-white dark:bg-slate-800` |

---

## 6. Verifying dark mode locally

The theme is class-based via `localStorage` (`ThemeProvider` re-asserts it on mount, so
adding `.dark` by hand gets undone). To screenshot dark, seed it first:

```js
// run before load, e.g. in a headless context
localStorage.setItem('theme', 'dark');
document.documentElement.classList.add('dark');
```

Always check both modes — the tokens flip automatically, but contrast should be eyeballed.

---

## 7. Where things live

- `app/globals.css` — tokens + every `fg-*` primitive (the source of truth).
- `app/layout.tsx` — font wiring (Bodoni / Source Serif 4 / JetBrains Mono).
- `components/home/SectionShell.tsx` — chapter frame · `components/home/*` — home sections.
- `components/Navbar.tsx`, `MobileMenu.tsx`, `NavDropdown.tsx`, `ThemeToggle.tsx`, `Footer.tsx` — chrome.
- `components/ToolHero.tsx`, `app/tools/layout.tsx`, `components/kitchen/Section.tsx` — tools base.
- `memory/tailwind-v4-color-token-override.md` — the Tailwind-v4 gotcha in depth.
