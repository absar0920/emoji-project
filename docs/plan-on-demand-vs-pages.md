# Implementation Plan — On-Demand `/vs/` Comparison Pages

## Problem

`/vs/[slug]` (e.g. `/vs/face-blowing-a-kiss-vs-weary-face`) returns **404** for almost every
pair. The route works (`app/vs/[slug]/page.tsx`), but it only renders when a matching document
exists in the Mongo `comparisons` collection, and those are only created by
`scripts/generate-comparisons.ts` for pairs found in each emoji's `relations` field. The pair
space is N² (millions); the relations-only set covers a tiny fraction. Any hand-typed,
internally-linked, or crawler-discovered pair outside that set dies.

## Goal

Every **valid** emoji pair resolves on demand — no 404s for real pairs — **without any per-request
LLM call**. Pre-generated LLM comparisons remain the high-quality path where they exist; everything
else is composed deterministically from data we already store.

## Design decisions (settled)

| Topic | Decision |
|---|---|
| Strategy | On-demand resolution for any valid pair (not bulk pre-generation) |
| Validity | Both slug halves resolve to real, **distinct** emoji docs; else `notFound()` |
| Canonical form | Alphabetically-sorted slug; reversed order → **308 redirect**; render is order-agnostic |
| Content source | **Deterministic composition** from the two emoji docs — zero LLM, instant SSR |
| Persistence | **Recompute every request, never persist** composed docs; serve hot from Redis under a separate `composed:` namespace |
| Precedence | validate → canonicalize/redirect → **curated wins** → else compose |
| Indexing | Curated = `index` + sitemap + internal links; composed = `noindex, follow`, out of sitemap |
| Related section | Curated comparisons sharing either emoji **+** links to both `/emoji/[slug]` pages; never fabricate composed→composed links |
| Missing fields | Render only layers **both** emojis have; floor field = `official_meaning`, else `notFound()` |
| Winner | From `virality.trend_score` (tie → `meme_score` → alphabetical); **omit winner section if either score missing** |
| Winner reason | Templated from frequency **labels** (`tiktok_freq`/`instagram_freq`), not raw scores |
| When to use | Composed from both `official_meaning` fields |

## Request flow (`/vs/[slug]`)

```
1. PARSE + VALIDATE  (cheap, cache-resident emoji reads)
   - Split slug on "-vs-". Slugs contain hyphens, so test each "-vs-" split point:
     accept the split where BOTH halves resolve via getEmojiBySlug.
   - If no split yields two valid emojis  -> notFound()
   - If the two halves are the same emoji -> notFound()   (no x-vs-x)

2. CANONICALIZE
   - sortedSlug = [slugA, slugB].sort() joined with "-vs-"
   - if incoming slug !== sortedSlug -> redirect(308) to /vs/{sortedSlug}

3. CURATED LOOKUP  (curated always wins)
   - getComparisonBySlug(sortedSlug)  (Redis key: comparison:{slug})
   - hit -> render with source="curated", robots: index

4. COMPOSE  (miss)
   - compose deterministically from the two emoji docs
   - cache under Redis key composed:{slug}
   - render with source="composed", robots: noindex, follow
```

Step 1 precedes step 3 deliberately: garbage slugs fail using only the small, hot emoji cache,
without ever querying the comparisons collection, and we avoid a "redirect garbage → canonical
garbage → 404" double hop.

---

## Changes by file

### 1. `types/emoji.ts` — discriminator on the comparison shape

Add an optional `source` field so the page and metadata can branch on curated vs composed.
`differences` already covers the 7 layers the page renders; composition fills the same shape, but
some entries may be empty strings (the page must tolerate that — see §4).

```ts
export interface ComparisonDocument {
  // ...existing fields...
  source?: "curated" | "composed";   // undefined on legacy docs == curated
}
```

### 2. `lib/comparison.ts` — NEW: parsing, validation, composition

Single module owning the on-demand logic. Pure functions + thin Mongo/Redis wrappers so both
`generateMetadata` and the page component share one resolver (and one cache read).

```ts
// makePairSlug — identical rule to scripts/generate-comparisons.ts (keep in sync / re-export)
export function makePairSlug(a: string, b: string): string {
  return [a, b].sort().join("-vs-");
}

// Resolve the two emoji slugs from a "-vs-" slug by testing split points against the DB.
// Returns the two EmojiDocuments (in incoming order) or null.
export async function resolvePair(slug: string): Promise<{
  a: EmojiDocument; b: EmojiDocument; canonical: string;
} | null> {
  const idxs = [...slug.matchAll(/-vs-/g)].map(m => m.index!);
  for (const i of idxs) {
    const left = slug.slice(0, i);
    const right = slug.slice(i + 4);
    if (left === right) continue;                 // x-vs-x guard
    const [a, b] = await Promise.all([getEmojiBySlug(left), getEmojiBySlug(right)]);
    if (a && b) return { a, b, canonical: makePairSlug(left, right) };
  }
  return null;
}

// Deterministic composition -> ComparisonDocument shape, source: "composed".
export function composeComparison(a: EmojiDocument, b: EmojiDocument): ComparisonDocument | null
```

**`composeComparison` rules**

- Order `a`, `b` so `emoji1_slug` < `emoji2_slug` (match curated canonical layout).
- `differences.*` — one entry per layer, only when **both** emojis have that layer populated.
  Format each as `"<A value> vs <B value>"` so the page's existing
  `split(/\bvs\.?\b|\bwhile\b|\bbut\b/i)` cleanly yields the two sides. Layer → source field:
  - `official`  ← `official_meaning.description`  **(required floor)**
  - `genz`      ← `genz_meaning.interpretation`
  - `emotional` ← `emotional_meaning.psychology_note`
  - `dating`    ← `dating_meaning.flirt_usage`
  - `meme`      ← `meme_meaning.viral_usage`
  - `tiktok`    ← `tiktok.meaning`
  - `whatsapp`  ← `whatsapp.chat_meaning`

  Omit any layer where either side is missing/empty. **If `official` is missing for either
  emoji, return `null`** (caller → `notFound()`).
- `winner` / `winner_reason`:
  - Compare `virality.trend_score`. Higher wins; tie → `meme_score`; tie → alphabetical slug.
  - If **either** `trend_score` is missing, set `winner = ""` and `winner_reason = ""`
    (page hides the winner block when empty — see §4).
  - `winner_reason` from frequency labels, not numbers, e.g.
    `"{winnerChar} sees {tiktok_freq} TikTok and {instagram_freq} Instagram usage, ahead of {loserChar}."`
- `when_to_use`:
  `"Reach for {Achar} when {A.official_meaning.description}. Use {Bchar} when {B.official_meaning.description}."`
  (condense/trim to a sentence each).
- `source: "composed"`, `created_at: new Date()`.

**Cache wrappers** (mirror existing `getComparisonBySlug` pattern, separate namespace):

```ts
export async function getComposedComparison(canonical: string, a, b): Promise<ComparisonDocument | null> {
  const key = `composed:${canonical}`;
  const cached = await getCached<ComparisonDocument>(key);
  if (cached) return cached;
  const doc = composeComparison(a, b);
  if (doc) await setCached(key, doc, 3600);
  return doc;
}
```

The `composed:` namespace guarantees a later curated doc is never masked: step 3 reads only
`comparison:{slug}` and short-circuits before step 4 is consulted.

### 3. `app/vs/[slug]/page.tsx` — wire in the flow

`generateMetadata` and the default export both call a shared `resolveComparison(slug)` helper that
returns `{ kind: "redirect", to } | { kind: "curated" | "composed", comparison } | { kind: "notfound" }`.

- **`generateMetadata`**:
  - `redirect` → return minimal metadata (the page-level `redirect()` does the actual work).
  - `composed` → existing `generateComparisonMeta` **plus** `robots: { index: false, follow: true }`.
  - `curated` → unchanged (indexable).
  - `notfound` → `{ title: "Comparison Not Found" }`.
- **Page component**:
  - `redirect` → `redirect(`/vs/${to}`)` from `next/navigation` (issues 308).
  - `notfound` → `notFound()`.
  - else render. **Related section** uses `getRelatedComparisons(emoji1_slug, 5)` (already
    curated-only after §6) and additionally always shows the two `/emoji/{slug}` links — the
    masthead already links both constituents (lines 73–81), so this is satisfied; just ensure the
    "Related" block degrades gracefully when the curated query is empty (it already guards on
    `.length > 0`).
- `export const dynamic = "force-dynamic"` stays.

Rendering already tolerates the composed shape **except** the winner block (lines 89–94), which
must be gated:

```tsx
{comparison.winner && (
  <AnimatedSection> ...winner pull... </AnimatedSection>
)}
```

`diffRows` (line 48) already maps `Object.entries(differences)` — fewer entries just renders fewer
rows, so omitted layers need no extra handling beyond composition producing a partial object.

### 4. Edge handling in the page

- Winner block hidden when `winner === ""` (composed-with-missing-scores).
- `differences` may have <7 keys; the `.map` handles it.
- FAQ schema: `generateComparisonFAQ` already null-coalesces `winner`/`winner_reason`/
  `when_to_use`, so composed docs with blanks produce sane FAQ text. ✅ (no change)

### 5. `lib/seo.ts` — no change required

`generateComparisonMeta` and `generateComparisonFAQ` already read only fields present on both
curated and composed docs. Robots is set in the page's `generateMetadata`, not here.

### 6. Sitemap — verify curated-only (likely no change)

`app/sitemap.ts` chunk 16 uses `getAllComparisonSlugs()`, which queries the `comparisons`
collection. Since composed docs are **never persisted**, they're automatically excluded. ✅
Confirm no other chunk enumerates `/vs/` pairs.

### 7. `app/tools/emoji-vs/page.tsx` — build canonical slug

The picker should navigate to the **sorted** slug so users land on the canonical URL without a
redirect hop:

```ts
const slug = [emoji1.slug, emoji2.slug].sort().join("-vs-");
router.push(`/vs/${slug}`);
```

(Guard against picking the same emoji twice — disable Compare when `emoji1.slug === emoji2.slug`.)

### 8. `scripts/generate-comparisons.ts` — set `source` on curated docs

Add `source: "curated"` to the generated `doc` so the discriminator is explicit (legacy docs
without the field are treated as curated by default). No behavioral change otherwise; this script
is now an **optional quality upgrade** for high-demand pairs, not a prerequisite.

---

## Out of scope / non-issues

- **Rate limiting / abuse:** no path triggers an LLM call, so on-demand traffic is just
  cache-backed Mongo reads — no special protection needed.
- **Persisting composed docs:** explicitly rejected (staleness + collection pollution). Redis TTL
  (1h) is the only durability.
- **Indexing the long tail:** intentionally `noindex` — composed pages serve humans who arrive via
  the tool or external links, but are not an SEO ranking bet.

## Verification

1. **Curated pair** (existing doc): renders unchanged, `robots` indexable, sitemap-listed.
2. **Composed pair** — the screenshot URL `/vs/face-blowing-a-kiss-vs-weary-face`: now renders
   (no 404), `<meta name="robots" content="noindex, follow">` present, winner block shown only if
   both have `trend_score`, differences show only layers both emojis populate.
3. **Reversed order** `/vs/weary-face-vs-face-blowing-a-kiss`: 308 → canonical sorted slug.
4. **Garbage** `/vs/not-an-emoji-vs-also-fake`: `notFound()`, no comparisons-collection query.
5. **Self-pair** `/vs/weary-face-vs-weary-face`: `notFound()`.
6. **Sparse pair** (one emoji lacks `official_meaning`): `notFound()`.
7. **Cache masking**: compose a pair (populates `composed:{slug}`), then insert a curated doc for
   the same slug → next request serves curated (step 3 short-circuits before `composed:`).
8. Confirm `getRelatedComparisons` on a composed page returns only curated `/vs/` links (or none),
   and the two `/emoji/{slug}` masthead links are present.

## Rollout

Single PR; no data migration. The only schema touch is an additive optional `source` field.
Deploy is reversible — reverting restores the 404 behavior without leaving artifacts (nothing was
persisted).
