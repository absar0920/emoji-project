# Internal Linking + Semantic Search Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add richer internal linking (comparisons, combos, see-also) to emoji detail pages and AI-generated semantic tags for better Fuse.js search.

**Architecture:** Internal linking adds 2 new MongoDB query functions and 3 new UI sections to the emoji detail page. Semantic search adds a Gemini-powered generation script, a new field on EmojiDocument, and updates to the search index + Fuse.js config.

**Tech Stack:** Next.js 16, TypeScript, MongoDB, Gemini 2.5 Flash, Fuse.js

**Spec:** `docs/superpowers/specs/2026-05-26-internal-linking-search-design.md`

---

### Task 1: MongoDB Query Functions for Linking

**Files:**
- Modify: `lib/mongodb.ts`

- [ ] **Step 1: Read the current file**

Read `lib/mongodb.ts` to find where to add new functions.

- [ ] **Step 2: Add getComparisonsByEmoji function**

Add before `export { connectToDatabase }`:

```ts
export async function getComparisonsByEmoji(
  slug: string,
  limit: number = 3
): Promise<ComparisonDocument[]> {
  const conn = await connectToDatabase();
  if (!conn) return [];
  return conn.db
    .collection<ComparisonDocument>("comparisons")
    .find({
      $or: [{ emoji1_slug: slug }, { emoji2_slug: slug }],
    })
    .limit(limit)
    .toArray();
}
```

- [ ] **Step 3: Add getCombosByEmoji function**

Add after the previous function:

```ts
export async function getCombosByEmoji(
  character: string,
  limit: number = 3
): Promise<ComboDocument[]> {
  const conn = await connectToDatabase();
  if (!conn) return [];
  return conn.db
    .collection<ComboDocument>("combos")
    .find({ "combos.emojis": character })
    .limit(limit)
    .toArray();
}
```

- [ ] **Step 4: Verify and commit**

```bash
npx tsc --noEmit
git add lib/mongodb.ts
git commit -m "feat: add getComparisonsByEmoji and getCombosByEmoji query functions"
```

---

### Task 2: Internal Linking UI on Emoji Detail Page

**Files:**
- Modify: `app/emoji/[slug]/page.tsx`

- [ ] **Step 1: Read the current file fully**

Read `app/emoji/[slug]/page.tsx` to understand the current structure and find where to add new sections.

- [ ] **Step 2: Add imports**

Add to the existing imports from `@/lib/mongodb`:

```ts
import { getEmojiBySlug, getAllSlugs, getRelatedEmojis, getComparisonsByEmoji, getCombosByEmoji } from "@/lib/mongodb";
```

Add `Link` import if not present:

```ts
import Link from "next/link";
```

- [ ] **Step 3: Add data fetching**

In the `EmojiPage` function, after the existing `getRelatedEmojis` call, add:

```ts
const [comparisons, combos] = await Promise.all([
  getComparisonsByEmoji(slug, 3),
  getCombosByEmoji(emoji.character, 3),
]);
```

- [ ] **Step 4: Add "Compare With" section**

Add after the Related Emojis section, before FAQ:

```tsx
{/* Compare With */}
{comparisons.length > 0 && (
  <section className="mb-10">
    <h2 className="text-xl font-bold text-primary-dark mb-4">Compare With</h2>
    <div className="flex flex-wrap gap-2">
      {comparisons.map((comp) => {
        const otherChar = comp.emoji1_slug === slug ? comp.emoji2_character : comp.emoji1_character;
        const otherName = comp.emoji1_slug === slug ? comp.emoji2_name : comp.emoji1_name;
        return (
          <Link
            key={comp.slug}
            href={`/vs/${comp.slug}`}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md text-sm font-medium text-neutral-700 hover:shadow-lg transition-shadow"
          >
            <span className="text-lg">{emoji.character}</span>
            <span className="text-neutral-400">vs</span>
            <span className="text-lg">{otherChar}</span>
            <span className="text-neutral-500">{otherName}</span>
          </Link>
        );
      })}
    </div>
  </section>
)}
```

- [ ] **Step 5: Add "Emoji Combos" section**

Add after "Compare With":

```tsx
{/* Emoji Combos */}
{combos.length > 0 && (
  <section className="mb-10">
    <h2 className="text-xl font-bold text-primary-dark mb-4">Emoji Combos</h2>
    <div className="flex flex-wrap gap-3">
      {combos.map((combo) => (
        <Link
          key={combo.slug}
          href={`/combo/${combo.slug}`}
          className="flex items-center gap-2 px-4 py-3 bg-white rounded-xl shadow-md text-sm font-medium text-neutral-700 hover:shadow-lg transition-shadow"
        >
          <span className="text-lg">
            {combo.combos?.[0]?.emojis?.slice(0, 3).join("") || "🎉"}
          </span>
          <span>{combo.theme}</span>
        </Link>
      ))}
    </div>
  </section>
)}
```

- [ ] **Step 6: Add "See Also" section**

Add after "Emoji Combos":

```tsx
{/* See Also — opposite, confusing, replacement */}
{(emoji.relations?.opposite?.length > 0 ||
  emoji.relations?.confusing?.length > 0 ||
  emoji.relations?.replacement?.length > 0) && (
  <section className="mb-10">
    <h2 className="text-xl font-bold text-primary-dark mb-4">See Also</h2>
    <div className="space-y-3">
      {emoji.relations.opposite?.length > 0 && (
        <div>
          <span className="text-sm font-medium text-neutral-500 block mb-2">Opposite</span>
          <div className="flex gap-2 flex-wrap">
            {emoji.relations.opposite.map((s: string) => (
              <Link
                key={s}
                href={`/emoji/${s}`}
                className="px-3 py-1.5 bg-white rounded-full shadow-sm text-sm hover:shadow-md transition-shadow"
              >
                {s.replace(/-/g, " ")}
              </Link>
            ))}
          </div>
        </div>
      )}
      {emoji.relations.confusing?.length > 0 && (
        <div>
          <span className="text-sm font-medium text-neutral-500 block mb-2">Often Confused With</span>
          <div className="flex gap-2 flex-wrap">
            {emoji.relations.confusing.map((s: string) => (
              <Link
                key={s}
                href={`/emoji/${s}`}
                className="px-3 py-1.5 bg-white rounded-full shadow-sm text-sm hover:shadow-md transition-shadow"
              >
                {s.replace(/-/g, " ")}
              </Link>
            ))}
          </div>
        </div>
      )}
      {emoji.relations.replacement?.length > 0 && (
        <div>
          <span className="text-sm font-medium text-neutral-500 block mb-2">Can Replace</span>
          <div className="flex gap-2 flex-wrap">
            {emoji.relations.replacement.map((s: string) => (
              <Link
                key={s}
                href={`/emoji/${s}`}
                className="px-3 py-1.5 bg-white rounded-full shadow-sm text-sm hover:shadow-md transition-shadow"
              >
                {s.replace(/-/g, " ")}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  </section>
)}
```

- [ ] **Step 7: Verify and commit**

```bash
npx tsc --noEmit
git add app/emoji/[slug]/page.tsx
git commit -m "feat: add Compare With, Emoji Combos, and See Also sections to emoji detail"
```

---

### Task 3: Semantic Tags — Type + Search Index Updates

**Files:**
- Modify: `types/emoji.ts`
- Modify: `lib/mongodb.ts`
- Modify: `lib/search.ts`

- [ ] **Step 1: Add semantic_tags to EmojiDocument**

Read `types/emoji.ts`. Add `semantic_tags` to the EmojiDocument intersection type:

```ts
export type EmojiDocument = EmojiBase &
  MeaningLayers &
  PlatformLayer &
  CulturalLayer &
  TimeEvolution & {
    virality: Virality;
    relations: Relations;
    design_variations?: DesignVariations;
    semantic_tags?: string[];
  } &
  SafetyLayer;
```

- [ ] **Step 2: Add semantic_tags to EmojiSearchItem**

In `types/emoji.ts`, update `EmojiSearchItem`:

```ts
export interface EmojiSearchItem {
  slug: string;
  name: string;
  character: string;
  tags: string[];
  category: string;
  shortcode: string;
  genz_summary: string;
  semantic_tags: string[];
}
```

- [ ] **Step 3: Update getSearchIndex in lib/mongodb.ts**

Read `lib/mongodb.ts`. Find `getSearchIndex()` and update the projection to include `semantic_tags`:

Change the projection to add:

```ts
projection: {
  slug: 1,
  name: 1,
  character: 1,
  tags: 1,
  category: 1,
  shortcode: 1,
  "genz_meaning.interpretation": 1,
  semantic_tags: 1,
},
```

Update the return mapping to include:

```ts
return docs.map((d) => ({
  slug: d.slug,
  name: d.name,
  character: d.character,
  tags: d.tags,
  category: d.category,
  shortcode: d.shortcode,
  genz_summary: d.genz_meaning?.interpretation?.slice(0, 80) || "",
  semantic_tags: d.semantic_tags || [],
}));
```

- [ ] **Step 4: Add semantic_tags to Fuse.js config**

Read `lib/search.ts`. Add the new key to `fuseOptions.keys`:

```ts
const fuseOptions: IFuseOptions<EmojiSearchItem> = {
  keys: [
    { name: "name", weight: 1.0 },
    { name: "tags", weight: 0.8 },
    { name: "semantic_tags", weight: 0.7 },
    { name: "genz_summary", weight: 0.7 },
    { name: "shortcode", weight: 0.6 },
    { name: "category", weight: 0.5 },
  ],
  threshold: 0.4,
  includeScore: true,
  minMatchCharLength: 2,
};
```

- [ ] **Step 5: Verify and commit**

```bash
npx tsc --noEmit
git add types/emoji.ts lib/mongodb.ts lib/search.ts
git commit -m "feat: add semantic_tags to EmojiDocument, search index, and Fuse.js config"
```

---

### Task 4: Semantic Tags Generation Script

**Files:**
- Create: `scripts/generate-semantic-tags.ts`
- Modify: `package.json`

- [ ] **Step 1: Write the generation script**

Write to `scripts/generate-semantic-tags.ts`:

```ts
import { MongoClient } from "mongodb";
import { GoogleGenerativeAI } from "@google/generative-ai";

const MONGODB_URI = process.env.MONGODB_URI!;
const MONGODB_DB = process.env.MONGODB_DB || "emoji-platform";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY!;

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

async function generateTags(emoji: {
  character: string;
  name: string;
  genz_meaning?: { interpretation?: string };
  emotional_meaning?: { emotion_type?: string };
  dating_meaning?: { flirt_usage?: string };
  meme_meaning?: { viral_usage?: string };
}): Promise<string[]> {
  const context = [
    emoji.genz_meaning?.interpretation,
    emoji.emotional_meaning?.emotion_type,
    emoji.dating_meaning?.flirt_usage,
    emoji.meme_meaning?.viral_usage,
  ]
    .filter(Boolean)
    .join(". ");

  const prompt = `Generate 15-20 semantic search tags for this emoji.

Emoji: ${emoji.character} (${emoji.name})
Context: ${context || "No additional context"}

Return a JSON object with a "tags" array of lowercase strings. Include:
- Synonyms and related words
- Feelings and emotions it represents
- Intents and use-cases (e.g. "breakup", "congratulations")
- Slang terms and informal descriptions
- Common search queries people would use to find this emoji

Example for 💀: {"tags": ["death", "dead", "dying laughing", "hilarious", "ironic", "sarcasm", "morbid", "dark humor", "lmao", "i cant", "so funny", "skull emoji", "gen-z laughter", "extreme reaction", "disbelief"]}`;

  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    generationConfig: { responseMimeType: "application/json" },
  });

  const result = await model.generateContent(prompt);
  const text = result.response.text().trim();
  const jsonStart = text.indexOf("{");
  const jsonEnd = text.lastIndexOf("}");
  if (jsonStart === -1 || jsonEnd === -1) return [];
  const parsed = JSON.parse(text.slice(jsonStart, jsonEnd + 1));
  return Array.isArray(parsed.tags) ? parsed.tags : [];
}

async function main() {
  if (!MONGODB_URI || !GEMINI_API_KEY) {
    console.error("MONGODB_URI and GEMINI_API_KEY must be set.");
    process.exit(1);
  }

  const client = await MongoClient.connect(MONGODB_URI);
  const db = client.db(MONGODB_DB);
  const collection = db.collection("emojis");

  // Get emojis that don't have semantic_tags yet
  const allEmojis = await collection
    .find(
      { semantic_tags: { $exists: false } },
      {
        projection: {
          slug: 1,
          character: 1,
          name: 1,
          "genz_meaning.interpretation": 1,
          "emotional_meaning.emotion_type": 1,
          "dating_meaning.flirt_usage": 1,
          "meme_meaning.viral_usage": 1,
        },
      }
    )
    .toArray();

  console.log(`Generating semantic tags for ${allEmojis.length} emojis...`);

  let processed = 0;
  let errors = 0;
  const BATCH_SIZE = 20;

  for (let i = 0; i < allEmojis.length; i += BATCH_SIZE) {
    const batch = allEmojis.slice(i, i + BATCH_SIZE);

    await Promise.all(
      batch.map(async (emoji) => {
        try {
          const tags = await generateTags(emoji as any);
          if (tags.length > 0) {
            await collection.updateOne(
              { slug: emoji.slug },
              { $set: { semantic_tags: tags } }
            );
          }
          processed++;
        } catch (err) {
          console.error(`  Error for ${emoji.character} ${emoji.name}:`, (err as Error).message);
          errors++;
        }
      })
    );

    console.log(
      `  Batch ${Math.floor(i / BATCH_SIZE) + 1}: ${processed} processed, ${errors} errors`
    );
  }

  console.log(`\nDone! ${processed} emojis tagged, ${errors} errors.`);
  await client.close();
}

main().catch(console.error);
```

- [ ] **Step 2: Add script to package.json**

Add to `package.json` scripts:

```json
"generate-semantic-tags": "env-cmd -f .env.local npx tsx scripts/generate-semantic-tags.ts"
```

- [ ] **Step 3: Verify and commit**

```bash
npx tsc --noEmit
git add scripts/generate-semantic-tags.ts package.json
git commit -m "feat: add Gemini-powered semantic tags generation script"
```

---

### Task 5: Final Verification

- [ ] **Step 1: TypeScript check**

```bash
npx tsc --noEmit
```

- [ ] **Step 2: Production build**

```bash
npm run build
```

Verify build succeeds.

---

## Post-Plan: Data Population

After implementation:

1. Run `npm run generate-semantic-tags` to generate tags for all emojis (takes ~10 min at 20 concurrent)
2. Visit `/emoji/skull` — verify "Compare With", "Emoji Combos", and "See Also" sections appear (if data exists)
3. Test search: type "breakup" or "hilarious" in the search modal — should find relevant emojis via semantic tags
