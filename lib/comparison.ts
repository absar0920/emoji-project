import { EmojiDocument, ComparisonDocument } from "@/types/emoji";
import { getEmojiBySlug, getComparisonBySlug } from "./mongodb";
import { getCached, setCached } from "./redis";

/**
 * On-demand `/vs/` comparison resolution.
 *
 * Curated comparisons (LLM-generated, in the `comparisons` collection) always
 * win. Any other valid emoji pair is composed deterministically from the two
 * emoji docs at request time — no LLM, never persisted to Mongo. Composed docs
 * are cached in Redis under a separate `composed:` namespace so they can never
 * mask a later curated doc.
 *
 * See docs/plan-on-demand-vs-pages.md.
 */

/** Canonical pair slug: the two emoji slugs sorted alphabetically, joined with "-vs-". */
export function makePairSlug(slug1: string, slug2: string): string {
  return [slug1, slug2].sort().join("-vs-");
}

/**
 * Resolve a `a-vs-b` slug into its two emoji docs. Emoji slugs themselves
 * contain hyphens, so we test every `-vs-` split point and accept the one where
 * both halves resolve to real, distinct emojis. Returns null for garbage slugs
 * and self-pairs.
 */
export async function resolvePair(slug: string): Promise<{
  a: EmojiDocument;
  b: EmojiDocument;
  canonical: string;
} | null> {
  const indices = [...slug.matchAll(/-vs-/g)].map((m) => m.index!);
  for (const i of indices) {
    const left = slug.slice(0, i);
    const right = slug.slice(i + 4); // "-vs-".length === 4
    if (!left || !right || left === right) continue; // self-pair / empty guard
    const [a, b] = await Promise.all([getEmojiBySlug(left), getEmojiBySlug(right)]);
    if (a && b) return { a, b, canonical: makePairSlug(left, right) };
  }
  return null;
}

/** First sentence (or a trimmed prefix) of a longer field, for tight templated prose. */
function condense(text: string, maxLen = 160): string {
  const trimmed = text.trim();
  const firstSentence = trimmed.split(/(?<=[.!?])\s/)[0] || trimmed;
  const out = firstSentence.length <= maxLen ? firstSentence : trimmed.slice(0, maxLen).trim();
  return out.replace(/[.;,]+$/, "");
}

/** Layers rendered on the comparison page, mapped to their source field on the emoji doc. */
const LAYERS: Array<{
  key: keyof ComparisonDocument["differences"];
  get: (e: EmojiDocument) => string | undefined;
}> = [
  { key: "official", get: (e) => e.official_meaning?.description },
  { key: "genz", get: (e) => e.genz_meaning?.interpretation },
  { key: "emotional", get: (e) => e.emotional_meaning?.psychology_note },
  { key: "dating", get: (e) => e.dating_meaning?.flirt_usage },
  { key: "meme", get: (e) => e.meme_meaning?.viral_usage },
  { key: "tiktok", get: (e) => e.tiktok?.meaning },
  { key: "whatsapp", get: (e) => e.whatsapp?.chat_meaning },
];

/**
 * Deterministically compose a ComparisonDocument from two emoji docs. Returns
 * null when neither emoji has the floor field (`official_meaning`), in which
 * case the caller should 404 rather than render an empty shell.
 */
export function composeComparison(ea: EmojiDocument, eb: EmojiDocument): ComparisonDocument | null {
  // Canonical layout: emoji1 is the alphabetically-first slug.
  const [first, second] = [ea, eb].sort((x, y) => (x.slug < y.slug ? -1 : 1));

  // Differences: one entry per layer, only when BOTH emojis populate it.
  // Formatted "<A> vs <B>" so the page's split(/\bvs\.?\b|.../) yields two sides.
  const differences = {} as ComparisonDocument["differences"];
  for (const layer of LAYERS) {
    const va = layer.get(first)?.trim();
    const vb = layer.get(second)?.trim();
    if (va && vb) differences[layer.key] = `${va} vs ${vb}`;
  }

  // Floor: without the official layer there isn't enough to compare.
  if (!differences.official) return null;

  // Winner from trend_score; tie -> meme_score -> alphabetical. Omit entirely
  // if either score is missing.
  let winner = "";
  let winner_reason = "";
  const sa = first.virality?.trend_score;
  const sb = second.virality?.trend_score;
  if (typeof sa === "number" && typeof sb === "number") {
    let win = first;
    let lose = second;
    if (sb > sa) {
      win = second;
      lose = first;
    } else if (sb === sa) {
      const ma = first.virality?.meme_score ?? 0;
      const mb = second.virality?.meme_score ?? 0;
      if (mb > ma) {
        win = second;
        lose = first;
      } // else keep alphabetical-first (already `first`)
    }
    winner = win.name;
    winner_reason =
      `${win.character} ${win.name} sees ${win.virality.tiktok_freq} TikTok and ` +
      `${win.virality.instagram_freq} Instagram usage, ahead of ${lose.character} ${lose.name}.`;
  }

  const when_to_use =
    `Reach for ${first.character} when ${condense(first.official_meaning.description)}. ` +
    `Use ${second.character} when ${condense(second.official_meaning.description)}.`;

  return {
    slug: makePairSlug(first.slug, second.slug),
    emoji1_slug: first.slug,
    emoji2_slug: second.slug,
    emoji1_character: first.character,
    emoji2_character: second.character,
    emoji1_name: first.name,
    emoji2_name: second.name,
    differences,
    winner,
    winner_reason,
    when_to_use,
    created_at: new Date(),
    source: "composed",
  };
}

/** Composed doc, cached under the `composed:` namespace (never collides with curated). */
export async function getComposedComparison(
  canonical: string,
  a: EmojiDocument,
  b: EmojiDocument
): Promise<ComparisonDocument | null> {
  const key = `composed:${canonical}`;
  const cached = await getCached<ComparisonDocument>(key);
  if (cached) return cached;
  const doc = composeComparison(a, b);
  if (doc) await setCached(key, doc, 3600);
  return doc;
}

export type ResolvedComparison =
  | { kind: "redirect"; to: string }
  | { kind: "curated"; comparison: ComparisonDocument }
  | { kind: "composed"; comparison: ComparisonDocument }
  | { kind: "notfound" };

/**
 * Full request resolution for `/vs/[slug]`:
 *   validate -> canonicalize/redirect -> curated (wins) -> compose.
 * Validation precedes the curated lookup so garbage slugs fail using only the
 * hot emoji cache, never touching the comparisons collection.
 */
export async function resolveComparison(slug: string): Promise<ResolvedComparison> {
  const pair = await resolvePair(slug);
  if (!pair) return { kind: "notfound" };
  if (slug !== pair.canonical) return { kind: "redirect", to: pair.canonical };

  const curated = await getComparisonBySlug(pair.canonical);
  if (curated) return { kind: "curated", comparison: curated };

  const composed = await getComposedComparison(pair.canonical, pair.a, pair.b);
  if (!composed) return { kind: "notfound" };
  return { kind: "composed", comparison: composed };
}
