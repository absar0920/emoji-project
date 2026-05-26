# Internal Linking + Semantic Search Expansion — Design Spec

**Date:** 2026-05-26
**Scope:** Two features: (1) richer internal linking on emoji detail pages, (2) AI-generated semantic tags for better Fuse.js search.

---

## 1. Internal Linking

**Where:** Emoji detail page (`app/emoji/[slug]/page.tsx`)

### New Sections

**A. "Compare With" section**
- Query MongoDB for comparisons that include this emoji's slug
- Show up to 3 comparison links as pills: "💀 vs 👻" format
- Each links to `/vs/{slug}`
- Hidden if no comparisons exist for this emoji

**B. "Emoji Combos" section**
- Query MongoDB for combos whose emoji arrays include this emoji's character
- Show up to 3 combo theme cards with theme name
- Each links to `/combo/{slug}`
- Hidden if no combos exist for this emoji

**C. "See Also" section**
- Display `opposite`, `confusing`, and `replacement` arrays from the existing `Relations` field (currently unused in UI)
- Three labeled subsections with emoji character links
- Hidden if all arrays are empty

### MongoDB Functions

Add to `lib/mongodb.ts`:

```ts
getCombosByEmoji(character: string, limit: number): Promise<ComboDocument[]>
```
Finds combos where any combo's `emojis` array contains the given character.

```ts
getComparisonsByEmoji(slug: string, limit: number): Promise<ComparisonDocument[]>
```
Finds comparisons where the slug appears in the comparison slug (e.g. "skull" matches "skull-vs-ghost").

### Placement

After the existing Related Emojis section, before FAQ. Order: Compare With → Emoji Combos → See Also.

### Files
- Modify: `lib/mongodb.ts` (add 2 query functions)
- Modify: `app/emoji/[slug]/page.tsx` (add 3 new sections, call new queries)

---

## 2. Semantic Search Expansion

### Script: `scripts/generate-semantic-tags.ts`

- Iterates all emojis in MongoDB
- For each emoji, calls Gemini 2.5 Flash with: emoji character, name, genz_meaning, emotional_meaning, dating_meaning, meme_meaning
- Prompt asks Gemini to return 15-20 semantic tags: synonyms, feelings, intents, slang terms, use-case descriptions
- Example output for 💀: `["death", "dead", "dying laughing", "hilarious", "ironic", "sarcasm", "morbid", "dark humor", "lmao", "i cant", "so funny", "skull emoji", "gen-z laughter", "extreme reaction", "disbelief"]`
- Stores as `semantic_tags: string[]` field on the emoji document
- Batch processing (20 concurrent) with progress logging
- Skips emojis that already have `semantic_tags` (idempotent)
- Uses `callGemini` from `lib/gemini.ts` with Redis caching

### Data Model

Add to `EmojiDocument` in `types/emoji.ts`:
```ts
semantic_tags?: string[];
```

### Search Index Update

**EmojiSearchItem** — add `semantic_tags: string[]` field

**`getSearchIndex()` in `lib/mongodb.ts`** — include `semantic_tags` in the projection

**`lib/search.ts`** — add to Fuse.js keys:
```ts
{ name: "semantic_tags", weight: 0.7 }
```

### Package.json

Add script:
```json
"generate-semantic-tags": "env-cmd -f .env.local npx tsx scripts/generate-semantic-tags.ts"
```

### Files
- Modify: `types/emoji.ts` (add `semantic_tags` to EmojiDocument and EmojiSearchItem)
- Modify: `lib/mongodb.ts` (update `getSearchIndex` projection)
- Modify: `lib/search.ts` (add `semantic_tags` to Fuse.js keys)
- Create: `scripts/generate-semantic-tags.ts`
- Modify: `package.json` (add script)
