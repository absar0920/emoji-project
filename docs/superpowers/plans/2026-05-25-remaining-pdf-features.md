# Remaining PDF Features Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build 6 remaining features from the original emoji-meanings.pdf: Emoji Maker, Smart Search, Device Variation Layer, Trending Page, About/Privacy/Terms, and Performance Polish.

**Architecture:** Emoji Maker and Smart Search add new Gemini-powered API routes + UI. Device Variations adds a data script + UI component to emoji detail pages. Trending is a standalone server page. About/Privacy/Terms are static pages. Performance polish adds framer-motion wrappers, 404/500 pages.

**Tech Stack:** Next.js 16, TypeScript, Tailwind CSS, Google Generative AI SDK (Gemini 2.5 Flash / Imagen), MongoDB, Redis, Framer Motion

**Spec:** `docs/superpowers/specs/2026-05-25-remaining-pdf-features-design.md`

---

### Task 1: Emoji Maker — API Route

**Files:**
- Create: `app/api/tools/emoji-maker/route.ts`

- [ ] **Step 1: Create directory**

```bash
mkdir -p app/api/tools/emoji-maker
```

- [ ] **Step 2: Write the API route**

Write to `app/api/tools/emoji-maker/route.ts`:

```ts
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getCached, setCached } from "@/lib/redis";
import { hashKey } from "@/lib/gemini";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const VALID_STYLES = ["Emoji", "Cartoon", "Pixel Art", "Sticker"];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prompt, style } = body as { prompt?: string; style?: string };

    if (!prompt || prompt.length > 200) {
      return NextResponse.json(
        { error: "Prompt is required (max 200 chars)" },
        { status: 400 }
      );
    }
    if (!style || !VALID_STYLES.includes(style)) {
      return NextResponse.json(
        { error: `Style must be one of: ${VALID_STYLES.join(", ")}` },
        { status: 400 }
      );
    }

    const cacheKey = `maker:${style}:${hashKey(prompt)}`;
    const cached = await getCached<{ images: string[] }>(cacheKey);
    if (cached) return NextResponse.json(cached);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-exp",
      generationConfig: {
        responseModalities: ["image", "text"],
      } as any,
    });

    const fullPrompt = `Generate a ${style}-style emoji of: ${prompt}. Square format, transparent background, expressive, suitable for messaging apps. Create 4 different variations.`;

    const result = await model.generateContent(fullPrompt);
    const response = result.response;
    const images: string[] = [];

    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if ((part as any).inlineData) {
          const { mimeType, data } = (part as any).inlineData;
          images.push(`data:${mimeType};base64,${data}`);
        }
      }
    }

    if (images.length === 0) {
      return NextResponse.json(
        { error: "Failed to generate images. Try a different description." },
        { status: 500 }
      );
    }

    const payload = { images };
    await setCached(cacheKey, payload, 3600);
    return NextResponse.json(payload);
  } catch (err) {
    console.error("Emoji maker error:", err);
    return NextResponse.json(
      { error: "Failed to generate emoji" },
      { status: 500 }
    );
  }
}
```

- [ ] **Step 3: Verify it compiles**

```bash
npx tsc --noEmit
```

- [ ] **Step 4: Commit**

```bash
git add app/api/tools/emoji-maker/
git commit -m "feat: add Emoji Maker API route with Gemini image generation"
```

---

### Task 2: Emoji Maker — Page

**Files:**
- Create: `app/tools/emoji-maker/page.tsx`
- Create: `app/tools/emoji-maker/layout.tsx`

- [ ] **Step 1: Create directory**

```bash
mkdir -p app/tools/emoji-maker
```

- [ ] **Step 2: Write the page**

Write to `app/tools/emoji-maker/page.tsx`:

```tsx
"use client";

import { useState } from "react";
import ToolHero from "@/components/ToolHero";

const STYLES = ["Emoji", "Cartoon", "Pixel Art", "Sticker"];

export default function EmojiMakerPage() {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("Emoji");
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleGenerate() {
    if (!prompt.trim()) return;
    setLoading(true);
    setError(null);
    setImages([]);
    try {
      const res = await fetch("/api/tools/emoji-maker", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, style }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setImages(data.images || []);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  function handleDownload(dataUri: string, index: number) {
    const link = document.createElement("a");
    link.href = dataUri;
    link.download = `emoji-${prompt.slice(0, 20).replace(/\s+/g, "-")}-${index + 1}.png`;
    link.click();
  }

  return (
    <>
      <ToolHero
        title="Emoji Maker"
        description="Describe any emoji and AI will generate it for you. Choose from multiple styles."
        badge="✨ AI-Powered"
      />

      <div className="space-y-4 mb-8">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value.slice(0, 200))}
          placeholder="Describe your emoji... (e.g. happy cat with sunglasses)"
          className="w-full px-5 py-3 rounded-xl border border-neutral-200 outline-none focus:ring-2 focus:ring-primary/30 text-lg"
        />
        <div className="flex items-center justify-between">
          <span className="text-xs text-neutral-400">{prompt.length}/200</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {STYLES.map((s) => (
            <button
              key={s}
              onClick={() => setStyle(s)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                style === s
                  ? "bg-primary text-white"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <button
          onClick={handleGenerate}
          disabled={!prompt.trim() || loading}
          className="w-full sm:w-auto px-8 py-3 rounded-full bg-gradient-to-r from-primary to-accent-violet text-white font-medium hover:shadow-lg transition-shadow disabled:opacity-50"
        >
          {loading ? "Generating..." : "Generate →"}
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-50 text-accent-red text-sm mb-6">
          {error}
        </div>
      )}

      {images.length > 0 && (
        <div className="grid grid-cols-2 gap-4">
          {images.map((img, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-4 shadow-sm border border-neutral-100 flex flex-col items-center gap-3"
            >
              <img
                src={img}
                alt={`Generated emoji ${i + 1}`}
                className="w-32 h-32 object-contain"
              />
              <button
                onClick={() => handleDownload(img, i)}
                className="px-4 py-1.5 rounded-full text-sm font-medium bg-accent-emerald text-white hover:bg-emerald-700 transition-colors"
              >
                Download
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
```

- [ ] **Step 3: Write the metadata layout**

Write to `app/tools/emoji-maker/layout.tsx`:

```tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Emoji Maker — Generate Custom Emojis [2026]",
  description:
    "Create custom AI-generated emojis from text descriptions. Choose Emoji, Cartoon, Pixel Art, or Sticker styles.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
```

- [ ] **Step 4: Add to footer**

Read `components/Footer.tsx`. Add to the `tools` array:

```ts
{ name: "Emoji Maker", href: "/tools/emoji-maker" },
```

- [ ] **Step 5: Verify and commit**

```bash
npx tsc --noEmit
git add app/tools/emoji-maker/ components/Footer.tsx
git commit -m "feat: add Emoji Maker tool page"
```

---

### Task 3: Smart Search — API Route

**Files:**
- Create: `app/api/tools/smart-search/route.ts`

- [ ] **Step 1: Create directory**

```bash
mkdir -p app/api/tools/smart-search
```

- [ ] **Step 2: Write the API route**

Write to `app/api/tools/smart-search/route.ts`:

```ts
import { NextRequest, NextResponse } from "next/server";
import { callGemini, hashKey } from "@/lib/gemini";
import { connectToDatabase, emojis } from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { query } = body as { query?: string };

    if (!query || query.length > 300) {
      return NextResponse.json(
        { error: "Query is required (max 300 chars)" },
        { status: 400 }
      );
    }

    const cacheKey = `smart:${hashKey(query)}`;
    const parsed = await callGemini(
      `You are an emoji search engine. The user is searching: "${query}"

Analyze the query and extract:
- search_terms: array of 3-5 emoji names to search for (e.g. ["skull", "crying face", "broken heart"])
- platform: specific platform if mentioned (tiktok/whatsapp/instagram/x/etc) or null
- context: which meaning layer is most relevant: "genz_meaning", "emotional_meaning", "dating_meaning", "sarcastic_meaning", "meme_meaning", "official_meaning", or null
- culture: cultural context if mentioned (e.g. "pakistan_india", "middle_east") or null

Return a JSON object with these fields.`,
      cacheKey
    );

    const searchTerms = (parsed.search_terms as string[]) || [];
    const platform = parsed.platform as string | null;
    const context = parsed.context as string | null;

    const conn = await connectToDatabase();
    if (!conn) {
      return NextResponse.json({ results: [] });
    }

    // Search MongoDB using the extracted terms
    const regexPatterns = searchTerms.map((t) => new RegExp(t, "i"));
    const docs = await emojis(conn.db)
      .find({
        $or: [
          { name: { $in: regexPatterns } },
          { tags: { $in: regexPatterns } },
        ],
      })
      .limit(10)
      .toArray();

    const results = docs.map((doc) => {
      let relevant_meaning = "";
      let why = "";

      // Pick the relevant meaning layer based on context
      if (context && (doc as any)[context]) {
        const layer = (doc as any)[context];
        relevant_meaning =
          layer.interpretation ||
          layer.description ||
          layer.viral_usage ||
          layer.flirt_usage ||
          layer.emotion_type ||
          layer.passive_aggressive_usage ||
          JSON.stringify(layer).slice(0, 150);
        why = `Matched ${context.replace("_", " ")} layer`;
      } else if (platform && (doc as any)[platform]) {
        const platData = (doc as any)[platform];
        relevant_meaning =
          platData.meaning ||
          platData.chat_meaning ||
          platData.bio_usage ||
          JSON.stringify(platData).slice(0, 150);
        why = `${platform} context`;
      } else {
        relevant_meaning =
          doc.genz_meaning?.interpretation ||
          doc.official_meaning?.description ||
          "";
        why = "General meaning";
      }

      return {
        character: doc.character,
        slug: doc.slug,
        name: doc.name,
        relevant_meaning,
        why,
      };
    });

    return NextResponse.json({ results });
  } catch (err) {
    console.error("Smart search error:", err);
    return NextResponse.json({ results: [] });
  }
}
```

- [ ] **Step 3: Verify and commit**

```bash
npx tsc --noEmit
git add app/api/tools/smart-search/
git commit -m "feat: add Smart Search API route with Gemini intent parsing"
```

---

### Task 4: Smart Search — SearchModal Integration

**Files:**
- Modify: `components/SearchModal.tsx`

- [ ] **Step 1: Read current SearchModal**

Read `components/SearchModal.tsx` to get the latest version.

- [ ] **Step 2: Add smart search detection and integration**

Add a helper function and modify the search effect. The changes to `components/SearchModal.tsx`:

After the existing imports, add:

```tsx
const SMART_KEYWORDS = [
  "meaning", "on tiktok", "for dating", "whatsapp", "instagram",
  "sarcastic", "meme", "tiktok", "twitter", "snapchat", "discord",
  "toxic", "flirt", "breakup", "culture", "pakistan", "middle east",
  "gen-z", "genz", "professional", "sentiment",
];

function isSmartQuery(q: string): boolean {
  const words = q.trim().split(/\s+/);
  if (words.length <= 2) return false;
  const lower = q.toLowerCase();
  return SMART_KEYWORDS.some((kw) => lower.includes(kw));
}
```

Add a new state variable after the existing state declarations:

```tsx
const [smartResults, setSmartResults] = useState<
  Array<{ character: string; slug: string; name: string; relevant_meaning: string; why: string }>
>([]);
const [smartLoading, setSmartLoading] = useState(false);
```

Replace the existing search `useEffect` (the one that calls `searchEmojis(fuse, query)`) with:

```tsx
useEffect(() => {
  if (!query) {
    setResults([]);
    setSmartResults([]);
    return;
  }

  if (isSmartQuery(query)) {
    setSmartLoading(true);
    setResults([]);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000);

    fetch("/api/tools/smart-search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((data) => {
        setSmartResults(data.results || []);
        setSmartLoading(false);
      })
      .catch(() => {
        // Fallback to fuzzy search on error/timeout
        if (fuse) setResults(searchEmojis(fuse, query));
        setSmartResults([]);
        setSmartLoading(false);
      })
      .finally(() => clearTimeout(timeout));

    return () => {
      controller.abort();
      clearTimeout(timeout);
    };
  } else {
    setSmartResults([]);
    if (fuse) setResults(searchEmojis(fuse, query));
  }
}, [query, fuse]);
```

In the results rendering section, add smart results above the regular results:

```tsx
{smartLoading && (
  <div className="p-4 text-center text-neutral-400 text-sm">
    Searching with AI...
  </div>
)}
{smartResults.length > 0 && (
  <>
    <div className="px-5 py-2 text-xs font-medium text-primary bg-primary/5">
      AI Results
    </div>
    {smartResults.map((item) => (
      <button
        key={item.slug}
        onClick={() => handleSelect(item.slug)}
        className="w-full flex items-center gap-3 px-5 py-3 hover:bg-neutral-50 transition-colors text-left"
      >
        <span className="text-3xl">{item.character}</span>
        <div className="flex-1">
          <div className="font-medium text-neutral-900">{item.name}</div>
          <div className="text-xs text-neutral-600 line-clamp-1">
            {item.relevant_meaning}
          </div>
          <div className="text-xs text-primary">{item.why}</div>
        </div>
      </button>
    ))}
  </>
)}
```

- [ ] **Step 3: Reset smart state on close**

In the existing `useEffect` that handles `isOpen`, add to the reset:

```tsx
setSmartResults([]);
setSmartLoading(false);
```

- [ ] **Step 4: Verify and commit**

```bash
npx tsc --noEmit
git add components/SearchModal.tsx
git commit -m "feat: integrate Smart Search into SearchModal with AI fallback"
```

---

### Task 5: Device Variation Layer — Type + Script

**Files:**
- Modify: `types/emoji.ts`
- Create: `scripts/generate-design-variations.ts`

- [ ] **Step 1: Add design_variations to EmojiDocument**

Read `types/emoji.ts`. Add a new interface before the `EmojiDocument` type:

```ts
export interface DesignVariations {
  google_noto?: string;
  twemoji?: string;
  openmoji?: string;
}
```

Add `design_variations?: DesignVariations;` to the EmojiDocument intersection type. Find the type definition and add it:

```ts
export type EmojiDocument = EmojiBase &
  MeaningLayers &
  PlatformLayer &
  CulturalLayer &
  TimeEvolution & {
    virality: Virality;
    relations: Relations;
    design_variations?: DesignVariations;
  } &
  SafetyLayer;
```

- [ ] **Step 2: Write the design variations script**

Write to `scripts/generate-design-variations.ts`:

```ts
import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI!;
const MONGODB_DB = process.env.MONGODB_DB || "emoji-platform";

function emojiToCodepoints(emoji: string): string[] {
  const codepoints: string[] = [];
  for (const char of emoji) {
    const cp = char.codePointAt(0);
    if (cp !== undefined && cp !== 0xfe0f) {
      codepoints.push(cp.toString(16));
    }
  }
  return codepoints;
}

function notoUrl(cps: string[]): string {
  const joined = cps.map((c) => c.toLowerCase()).join("_");
  return `https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/128/emoji_u${joined}.png`;
}

function twemojiUrl(cps: string[]): string {
  const joined = cps.map((c) => c.toLowerCase()).join("-");
  return `https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/${joined}.svg`;
}

function openmojiUrl(cps: string[]): string {
  const joined = cps.map((c) => c.toUpperCase().padStart(4, "0")).join("-");
  return `https://openmoji.org/data/color/svg/${joined}.svg`;
}

async function checkUrl(url: string): Promise<boolean> {
  try {
    const res = await fetch(url, { method: "HEAD" });
    return res.ok;
  } catch {
    return false;
  }
}

async function main() {
  if (!MONGODB_URI) {
    console.error("MONGODB_URI is not set.");
    process.exit(1);
  }

  const client = await MongoClient.connect(MONGODB_URI);
  const db = client.db(MONGODB_DB);
  const collection = db.collection("emojis");

  const allEmojis = await collection
    .find({}, { projection: { slug: 1, character: 1 } })
    .toArray();

  console.log(`Processing ${allEmojis.length} emojis for design variations...`);

  let processed = 0;
  let found = 0;
  const BATCH_SIZE = 20;

  for (let i = 0; i < allEmojis.length; i += BATCH_SIZE) {
    const batch = allEmojis.slice(i, i + BATCH_SIZE);

    await Promise.all(
      batch.map(async (emoji) => {
        const cps = emojiToCodepoints(emoji.character);
        if (cps.length === 0) return;

        const variations: Record<string, string> = {};

        const noto = notoUrl(cps);
        if (await checkUrl(noto)) variations.google_noto = noto;

        const twe = twemojiUrl(cps);
        if (await checkUrl(twe)) variations.twemoji = twe;

        const om = openmojiUrl(cps);
        if (await checkUrl(om)) variations.openmoji = om;

        if (Object.keys(variations).length > 0) {
          await collection.updateOne(
            { slug: emoji.slug },
            { $set: { design_variations: variations } }
          );
          found++;
        }

        processed++;
      })
    );

    console.log(
      `  Batch ${Math.floor(i / BATCH_SIZE) + 1}: ${processed}/${allEmojis.length} processed, ${found} with variations`
    );
  }

  console.log(`\nDone! ${found} emojis updated with design variations.`);
  await client.close();
}

main().catch(console.error);
```

- [ ] **Step 3: Add script to package.json**

Add to `package.json` scripts:

```json
"generate-variations": "env-cmd -f .env.local npx tsx scripts/generate-design-variations.ts"
```

- [ ] **Step 4: Verify and commit**

```bash
npx tsc --noEmit
git add types/emoji.ts scripts/generate-design-variations.ts package.json
git commit -m "feat: add design_variations type and CDN URL generation script"
```

---

### Task 6: Device Variation Layer — UI Component

**Files:**
- Create: `components/DesignVariations.tsx`
- Modify: `app/emoji/[slug]/page.tsx`

- [ ] **Step 1: Write the DesignVariations component**

Write to `components/DesignVariations.tsx`:

```tsx
import { DesignVariations as DesignVariationsType } from "@/types/emoji";

interface DesignVariationsProps {
  character: string;
  variations?: DesignVariationsType;
}

const VENDORS = [
  { key: "apple", label: "Apple", type: "native" as const },
  { key: "google_noto", label: "Google", type: "image" as const },
  { key: "twemoji", label: "Twitter", type: "image" as const },
  { key: "openmoji", label: "OpenMoji", type: "image" as const },
  { key: "samsung", label: "Samsung", type: "native" as const },
];

export default function DesignVariations({
  character,
  variations,
}: DesignVariationsProps) {
  return (
    <section id="design" className="mb-10">
      <h2 className="text-xl font-bold text-primary-dark mb-4">
        How It Looks Across Platforms
      </h2>
      <div className="flex flex-wrap gap-3">
        {VENDORS.map((vendor) => {
          const imageUrl =
            vendor.type === "image"
              ? variations?.[vendor.key as keyof DesignVariationsType]
              : null;

          return (
            <div
              key={vendor.key}
              className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl shadow-sm border border-neutral-100 min-w-[100px]"
            >
              {vendor.type === "native" || !imageUrl ? (
                <span className="text-4xl leading-none">{character}</span>
              ) : (
                <img
                  src={imageUrl}
                  alt={`${vendor.label} ${character}`}
                  width={40}
                  height={40}
                  className="w-10 h-10 object-contain"
                  loading="lazy"
                />
              )}
              <span className="text-xs font-medium text-neutral-600">
                {vendor.label}
              </span>
            </div>
          );
        })}
      </div>
      <p className="text-xs text-neutral-400 mt-2">
        Emoji appearance varies by platform and device. Google Noto, Twemoji,
        and OpenMoji are open-source.
      </p>
    </section>
  );
}
```

- [ ] **Step 2: Add DesignVariations to the emoji detail page**

Read `app/emoji/[slug]/page.tsx`. Add the import at the top with the other imports:

```tsx
import DesignVariations from "@/components/DesignVariations";
```

Add the component in the JSX, after the Safety section and before the closing `</main>` tag:

```tsx
{/* Design Variations */}
<DesignVariations character={emoji.character} variations={emoji.design_variations} />
```

- [ ] **Step 3: Verify and commit**

```bash
npx tsc --noEmit
git add components/DesignVariations.tsx app/emoji/[slug]/page.tsx
git commit -m "feat: add How It Looks design variations to emoji detail page"
```

---

### Task 7: Trending Page

**Files:**
- Modify: `lib/mongodb.ts`
- Create: `app/trending/page.tsx`

- [ ] **Step 1: Add getTrendingByPlatform to lib/mongodb.ts**

Read `lib/mongodb.ts`. Add before `export { connectToDatabase }`:

```ts
export async function getTrendingByPlatform(
  platform: "tiktok" | "instagram",
  limit: number = 10
): Promise<EmojiDocument[]> {
  const freqField = platform === "tiktok" ? "virality.tiktok_freq" : "virality.instagram_freq";
  const cacheKey = `trending:${platform}:${limit}`;
  const cached = await getCached<EmojiDocument[]>(cacheKey);
  if (cached) return cached;

  const conn = await connectToDatabase();
  if (!conn) return [];
  const results = await emojis(conn.db)
    .find({ [freqField]: { $in: ["viral", "high"] } })
    .sort({ "virality.trend_score": -1 })
    .limit(limit)
    .toArray();

  await setCached(cacheKey, results, 300);
  return results;
}
```

- [ ] **Step 2: Create the trending page**

```bash
mkdir -p app/trending
```

Write to `app/trending/page.tsx`:

```tsx
import { Metadata } from "next";
import Link from "next/link";
import { getTrendingEmojis, getTrendingByPlatform } from "@/lib/mongodb";
import ClientShell from "@/components/ClientShell";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Trending Emojis 2026 — Most Viral Emojis Today",
  description:
    "See which emojis are trending on TikTok, Instagram, and across all platforms. Updated daily with trend scores.",
};

export const dynamic = "force-dynamic";

function EmojiRow({
  emoji,
  rank,
}: {
  emoji: any;
  rank: number;
}) {
  return (
    <Link
      href={`/emoji/${emoji.slug}`}
      className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-neutral-100 hover:shadow-md transition-shadow"
    >
      <span className="text-sm font-bold text-neutral-400 w-8">
        #{rank}
      </span>
      <span className="text-4xl">{emoji.character}</span>
      <div className="flex-1 min-w-0">
        <span className="font-medium text-neutral-900 block truncate">
          {emoji.name}
        </span>
        <span className="text-xs text-neutral-500">{emoji.category}</span>
      </div>
      {emoji.virality?.trend_score != null && (
        <span className="px-3 py-1 rounded-full bg-amber-50 text-accent-amber text-sm font-medium shrink-0">
          🔥 {emoji.virality.trend_score}
        </span>
      )}
    </Link>
  );
}

export default async function TrendingPage() {
  const [top20, tiktok, instagram] = await Promise.all([
    getTrendingEmojis(20),
    getTrendingByPlatform("tiktok", 10),
    getTrendingByPlatform("instagram", 10),
  ]);

  return (
    <ClientShell>
      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-primary-dark mb-2">
            Trending Emojis
          </h1>
          <p className="text-neutral-500">
            The most popular emojis right now across all platforms.
          </p>
        </div>

        {/* Top 20 */}
        <section className="mb-12">
          <h2 className="text-lg font-bold text-primary-dark mb-4">
            Today&apos;s Top 20
          </h2>
          <div className="space-y-3">
            {top20.map((emoji, i) => (
              <EmojiRow key={emoji.slug} emoji={emoji} rank={i + 1} />
            ))}
            {top20.length === 0 && (
              <p className="text-neutral-400 text-center py-8">
                No trending data available yet.
              </p>
            )}
          </div>
        </section>

        {/* TikTok */}
        <section className="mb-12">
          <h2 className="text-lg font-bold text-primary-dark mb-4">
            Trending on TikTok
          </h2>
          <div className="space-y-3">
            {tiktok.map((emoji, i) => (
              <EmojiRow key={emoji.slug} emoji={emoji} rank={i + 1} />
            ))}
            {tiktok.length === 0 && (
              <p className="text-neutral-400 text-center py-8">
                No TikTok trending data available.
              </p>
            )}
          </div>
        </section>

        {/* Instagram */}
        <section className="mb-12">
          <h2 className="text-lg font-bold text-primary-dark mb-4">
            Trending on Instagram
          </h2>
          <div className="space-y-3">
            {instagram.map((emoji, i) => (
              <EmojiRow key={emoji.slug} emoji={emoji} rank={i + 1} />
            ))}
            {instagram.length === 0 && (
              <p className="text-neutral-400 text-center py-8">
                No Instagram trending data available.
              </p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </ClientShell>
  );
}
```

- [ ] **Step 3: Verify and commit**

```bash
npx tsc --noEmit
git add lib/mongodb.ts app/trending/
git commit -m "feat: add standalone /trending page with platform sections"
```

---

### Task 8: About / Privacy / Terms Pages

**Files:**
- Create: `app/about/page.tsx`
- Create: `app/privacy/page.tsx`
- Create: `app/terms/page.tsx`

- [ ] **Step 1: Create directories**

```bash
mkdir -p app/about app/privacy app/terms
```

- [ ] **Step 2: Write About page**

Write to `app/about/page.tsx`:

```tsx
import { Metadata } from "next";
import Link from "next/link";
import ClientShell from "@/components/ClientShell";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About — Emoji Intelligence",
  description:
    "Emoji Intelligence is the world's most comprehensive emoji meaning platform. 3,700+ emojis, 15 platforms, 31 cultures.",
};

export default function AboutPage() {
  return (
    <ClientShell>
      <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-extrabold text-primary-dark mb-6">
          About Emoji Intelligence
        </h1>

        <div className="prose prose-neutral max-w-none space-y-6 text-neutral-700">
          <p className="text-lg">
            Emoji Intelligence is the world&apos;s most comprehensive emoji
            meaning platform. We go beyond simple definitions to provide
            multi-layer semantic analysis of every emoji across cultures,
            platforms, and generations.
          </p>

          <h2 className="text-xl font-bold text-primary-dark">What We Cover</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>3,700+ emojis</strong> with full meaning breakdowns
            </li>
            <li>
              <strong>15 platforms</strong> — TikTok, WhatsApp, Instagram, X,
              Discord, Snapchat, and more
            </li>
            <li>
              <strong>31 cultural regions</strong> — from Western Gen-Z to South
              Asian, Middle Eastern, and East Asian interpretations
            </li>
            <li>
              <strong>8 meaning layers</strong> — official, Gen-Z, emotional,
              dating, sarcastic, meme, and more
            </li>
            <li>
              <strong>10+ interactive tools</strong> — Emoji Kitchen, AI text
              translator, vibe search, caption generator, and more
            </li>
          </ul>

          <h2 className="text-xl font-bold text-primary-dark">
            How It Works
          </h2>
          <p>
            Our data is generated through AI-powered semantic analysis,
            combining large language models with structured cultural and
            platform research. Every emoji page is enriched with contextual
            meaning layers that reflect how emojis are actually used in
            real conversations.
          </p>

          <h2 className="text-xl font-bold text-primary-dark">Explore</h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/search"
              className="px-4 py-2 rounded-full bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors"
            >
              Search Emojis
            </Link>
            <Link
              href="/tools/emoji-kitchen"
              className="px-4 py-2 rounded-full bg-neutral-100 text-neutral-700 text-sm font-medium hover:bg-neutral-200 transition-colors"
            >
              Emoji Kitchen
            </Link>
            <Link
              href="/trending"
              className="px-4 py-2 rounded-full bg-neutral-100 text-neutral-700 text-sm font-medium hover:bg-neutral-200 transition-colors"
            >
              Trending Emojis
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </ClientShell>
  );
}
```

- [ ] **Step 3: Write Privacy page**

Write to `app/privacy/page.tsx`:

```tsx
import { Metadata } from "next";
import ClientShell from "@/components/ClientShell";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy — Emoji Intelligence",
  description: "Privacy policy for Emoji Intelligence.",
};

export default function PrivacyPage() {
  return (
    <ClientShell>
      <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-extrabold text-primary-dark mb-6">
          Privacy Policy
        </h1>
        <p className="text-sm text-neutral-400 mb-8">
          Last updated: May 2026
        </p>

        <div className="prose prose-neutral max-w-none space-y-6 text-neutral-700">
          <h2 className="text-xl font-bold text-primary-dark">
            What We Collect
          </h2>
          <p>
            Emoji Intelligence does not require user accounts or login.
            We do not collect personal information such as names, email
            addresses, or phone numbers.
          </p>

          <h2 className="text-xl font-bold text-primary-dark">
            Cookies &amp; Local Storage
          </h2>
          <p>
            We use browser localStorage to store your recent emoji
            selections for convenience. No tracking cookies are set by
            Emoji Intelligence directly.
          </p>

          <h2 className="text-xl font-bold text-primary-dark">
            Third-Party Services
          </h2>
          <p>We use the following third-party services:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Google AdSense</strong> — for displaying
              advertisements. Google may use cookies for ad
              personalization.
            </li>
            <li>
              <strong>Google Gemini API</strong> — for powering AI
              features. Text prompts are sent to Google&apos;s servers for
              processing.
            </li>
            <li>
              <strong>Vercel</strong> — for hosting and analytics.
              Standard server logs may be collected.
            </li>
          </ul>

          <h2 className="text-xl font-bold text-primary-dark">
            Data Retention
          </h2>
          <p>
            We do not store personal data on our servers. AI tool inputs
            may be cached temporarily (up to 1 hour) for performance but
            are not linked to individual users.
          </p>

          <h2 className="text-xl font-bold text-primary-dark">Contact</h2>
          <p>
            For privacy-related questions, please reach out via the
            contact information on our About page.
          </p>
        </div>
      </main>
      <Footer />
    </ClientShell>
  );
}
```

- [ ] **Step 4: Write Terms page**

Write to `app/terms/page.tsx`:

```tsx
import { Metadata } from "next";
import ClientShell from "@/components/ClientShell";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service — Emoji Intelligence",
  description: "Terms of service for Emoji Intelligence.",
};

export default function TermsPage() {
  return (
    <ClientShell>
      <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-extrabold text-primary-dark mb-6">
          Terms of Service
        </h1>
        <p className="text-sm text-neutral-400 mb-8">
          Last updated: May 2026
        </p>

        <div className="prose prose-neutral max-w-none space-y-6 text-neutral-700">
          <h2 className="text-xl font-bold text-primary-dark">
            Acceptance of Terms
          </h2>
          <p>
            By accessing and using Emoji Intelligence, you agree to be
            bound by these Terms of Service. If you do not agree, please
            do not use the service.
          </p>

          <h2 className="text-xl font-bold text-primary-dark">
            Description of Service
          </h2>
          <p>
            Emoji Intelligence provides emoji meaning analysis,
            interactive tools, and educational content about emoji usage
            across platforms and cultures. The service is provided free of
            charge and supported by advertising.
          </p>

          <h2 className="text-xl font-bold text-primary-dark">
            Content Disclaimer
          </h2>
          <p>
            Emoji meanings, cultural interpretations, and AI-generated
            content on this platform are for informational and
            entertainment purposes only. Meanings are generated using AI
            models and may not be fully accurate or reflect all cultural
            perspectives. Use your own judgment when interpreting emoji
            meanings in real conversations.
          </p>

          <h2 className="text-xl font-bold text-primary-dark">
            Intellectual Property
          </h2>
          <p>
            The content, design, and code of Emoji Intelligence are
            protected by copyright. Emoji characters themselves are part
            of the Unicode Standard. Vendor-specific emoji designs belong
            to their respective owners (Apple, Google, etc.).
          </p>

          <h2 className="text-xl font-bold text-primary-dark">
            Limitation of Liability
          </h2>
          <p>
            Emoji Intelligence is provided &quot;as is&quot; without
            warranties of any kind. We are not liable for any damages
            arising from your use of the platform, including but not
            limited to misinterpretation of emoji meanings.
          </p>

          <h2 className="text-xl font-bold text-primary-dark">
            Changes to Terms
          </h2>
          <p>
            We may update these terms from time to time. Continued use of
            the service after changes constitutes acceptance of the
            updated terms.
          </p>
        </div>
      </main>
      <Footer />
    </ClientShell>
  );
}
```

- [ ] **Step 5: Verify and commit**

```bash
npx tsc --noEmit
git add app/about/ app/privacy/ app/terms/
git commit -m "feat: add About, Privacy Policy, and Terms of Service pages"
```

---

### Task 9: Framer Motion + Motion Wrappers

**Files:**
- Create: `components/MotionWrappers.tsx`
- Modify: `components/CopyButton.tsx`

- [ ] **Step 1: Install framer-motion**

```bash
npm install framer-motion
```

- [ ] **Step 2: Write MotionWrappers component**

Write to `components/MotionWrappers.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export function FadeIn({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.06 } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 12 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.25 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 3: Add scale bounce to CopyButton**

Read `components/CopyButton.tsx`. Replace the entire file with:

```tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface CopyButtonProps {
  text: string;
  label?: string;
  className?: string;
}

export default function CopyButton({
  text,
  label,
  className = "",
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <motion.button
      onClick={handleCopy}
      whileTap={{ scale: 0.9 }}
      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
        copied
          ? "bg-accent-emerald text-white"
          : "bg-primary text-white hover:bg-primary-dark"
      } ${className}`}
    >
      {copied ? "Copied!" : label || `Copy ${text}`}
    </motion.button>
  );
}
```

- [ ] **Step 4: Verify and commit**

```bash
npx tsc --noEmit
git add package.json package-lock.json components/MotionWrappers.tsx components/CopyButton.tsx
git commit -m "feat: add framer-motion with FadeIn, Stagger wrappers and CopyButton bounce"
```

---

### Task 10: Custom 404 and 500 Pages

**Files:**
- Create: `app/not-found.tsx`
- Create: `app/error.tsx`

- [ ] **Step 1: Write the 404 page**

Write to `app/not-found.tsx`:

```tsx
import Link from "next/link";
import ClientShell from "@/components/ClientShell";
import Footer from "@/components/Footer";

const EMOJIS = ["🤔", "😵", "🫠", "👀", "🙈", "🤷", "😅", "🫣"];

export default function NotFound() {
  const emoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];

  return (
    <ClientShell>
      <main className="max-w-2xl mx-auto px-4 py-24 text-center">
        <span className="text-[120px] leading-none block mb-6">{emoji}</span>
        <h1 className="text-3xl font-extrabold text-primary-dark mb-3">
          Page Not Found
        </h1>
        <p className="text-neutral-500 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been
          moved.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href="/"
            className="px-6 py-3 rounded-full bg-primary text-white font-medium hover:bg-primary-dark transition-colors"
          >
            Go Home
          </Link>
          <Link
            href="/search"
            className="px-6 py-3 rounded-full bg-neutral-100 text-neutral-700 font-medium hover:bg-neutral-200 transition-colors"
          >
            Search Emojis
          </Link>
          <Link
            href="/tools/emoji-kitchen"
            className="px-6 py-3 rounded-full bg-neutral-100 text-neutral-700 font-medium hover:bg-neutral-200 transition-colors"
          >
            Emoji Kitchen
          </Link>
        </div>
      </main>
      <Footer />
    </ClientShell>
  );
}
```

- [ ] **Step 2: Write the error page**

Write to `app/error.tsx`:

```tsx
"use client";

import Link from "next/link";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <span className="text-[100px] leading-none block mb-6">😵‍💫</span>
        <h1 className="text-3xl font-extrabold text-primary-dark mb-3">
          Something Went Wrong
        </h1>
        <p className="text-neutral-500 mb-8">
          An unexpected error occurred. Please try again.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 rounded-full bg-primary text-white font-medium hover:bg-primary-dark transition-colors"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="px-6 py-3 rounded-full bg-neutral-100 text-neutral-700 font-medium hover:bg-neutral-200 transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Verify and commit**

```bash
npx tsc --noEmit
git add app/not-found.tsx app/error.tsx
git commit -m "feat: add custom 404 and 500 error pages"
```

---

### Task 11: Final Verification

**Files:** None (verification only)

- [ ] **Step 1: Run TypeScript check**

```bash
npx tsc --noEmit
```

- [ ] **Step 2: Run production build**

```bash
npm run build
```

Verify all new routes appear:
- `/tools/emoji-maker`
- `/trending`
- `/about`
- `/privacy`
- `/terms`
- `/not-found` (404)

- [ ] **Step 3: Commit any remaining changes**

```bash
git add -A
git status
# Only commit if there are changes
git commit -m "feat: verify production build for remaining PDF features"
```

---

## Post-Plan: Data Population

After implementation:

1. Run `npm run generate-variations` to populate the design_variations field for all emojis (takes ~10 min due to HEAD checks)
2. Visit `/tools/emoji-maker` to test AI image generation (requires Gemini model with image output)
3. Test smart search by typing "breakup emoji for tiktok" in the search modal
4. Visit `/trending`, `/about`, `/privacy`, `/terms` to verify static pages
5. Check `/emoji/skull` for the new "How It Looks" section
