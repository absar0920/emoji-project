import { cache } from "react";
import { MongoClient, Db, Collection } from "mongodb";
import { EmojiDocument, EmojiSearchItem, EmojiSearchItemLite, ComparisonDocument, ComboDocument } from "@/types/emoji";
import { getCached, setCached } from "./redis";

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB || "emoji-platform";

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

async function connectToDatabase(): Promise<{
  client: MongoClient;
  db: Db;
} | null> {
  if (!MONGODB_URI) {
    return null;
  }

  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  try {
    const client = await MongoClient.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    const db = client.db(MONGODB_DB);

    cachedClient = client;
    cachedDb = db;

    return { client, db };
  } catch (err) {
    console.warn("MongoDB connection failed (build-time fallback):", (err as Error).message);
    return null;
  }
}

export function emojis(db: Db): Collection<EmojiDocument> {
  return db.collection<EmojiDocument>("emojis");
}

// Mongo-only, and wrapped in React cache() so the two reads of the same slug
// within one render (generateMetadata + the page body) share a single round-
// trip. Deliberately NO Redis: this runs inside the ISR render of
// /emoji/[slug], /[platform]/[slug] and (via lib/comparison) /vs/[slug]. A
// Redis read is an Upstash REST `no-store` fetch, which forces the static
// render dynamic and 500s the route ("static to dynamic at runtime"). The
// Mongo driver is native TCP and prerender-safe. Same rule as lib/blog.ts;
// every caller of this fn is an ISR render, so the old Redis layer was dead
// weight here anyway.
export const getEmojiBySlug = cache(async (
  slug: string
): Promise<EmojiDocument | null> => {
  const conn = await connectToDatabase();
  if (!conn) return null;
  return emojis(conn.db).findOne({ slug });
});

export async function getTrendingEmojis(
  limit: number = 10
): Promise<EmojiDocument[]> {
  const cacheKey = `trending:all:${limit}`;
  const cached = await getCached<EmojiDocument[]>(cacheKey);
  if (cached) return cached;

  const conn = await connectToDatabase();
  if (!conn) return [];
  const results = await emojis(conn.db)
    .find({})
    .sort({ "virality.trend_score": -1 })
    .limit(limit)
    .toArray();

  await setCached(cacheKey, results, 300);
  return results;
}

export async function getAllSlugs(): Promise<string[]> {
  const conn = await connectToDatabase();
  if (!conn) return [];
  const docs = await emojis(conn.db)
    .find({}, { projection: { slug: 1 } })
    .toArray();
  return docs.map((d) => d.slug);
}

export async function getSearchIndex(): Promise<EmojiSearchItem[]> {
  const cacheKey = "search:index:full";
  const cached = await getCached<EmojiSearchItem[]>(cacheKey);
  if (cached) return cached;

  const conn = await connectToDatabase();
  if (!conn) return [];
  const docs = await emojis(conn.db)
    .find({}, { projection: LITE_PROJECTION })
    .toArray();

  const result = docs.map(toSearchItem);
  await setCached(cacheKey, result, 3600);
  return result;
}

/**
 * Trimmed search index for the eager-loading tools (EmojiPicker, KeyboardTool,
 * shortcodes). Drops semantic_tags + genz_summary (~70% of the full payload) —
 * those are only needed by SearchModal's Fuse index, which fetches the full
 * endpoint lazily. Cached separately from the full index.
 */
export async function getSearchIndexLite(): Promise<EmojiSearchItemLite[]> {
  const cacheKey = "search:index:lite";
  const cached = await getCached<EmojiSearchItemLite[]>(cacheKey);
  if (cached) return cached;

  const conn = await connectToDatabase();
  if (!conn) return [];
  const docs = await emojis(conn.db)
    .find({}, { projection: LITE_BROWSE_PROJECTION })
    .toArray();

  const result = docs.map(toSearchItemLite);
  await setCached(cacheKey, result, 3600);
  return result;
}

const LITE_PROJECTION = {
  slug: 1,
  name: 1,
  character: 1,
  tags: 1,
  category: 1,
  shortcode: 1,
  "genz_meaning.interpretation": 1,
  semantic_tags: 1,
} as const;

const LITE_BROWSE_PROJECTION = {
  slug: 1,
  name: 1,
  character: 1,
  tags: 1,
  category: 1,
  shortcode: 1,
} as const;

function toSearchItem(d: Partial<EmojiDocument>): EmojiSearchItem {
  return {
    slug: d.slug!,
    name: d.name!,
    character: d.character!,
    tags: d.tags || [],
    category: d.category!,
    shortcode: d.shortcode!,
    genz_summary: d.genz_meaning?.interpretation?.slice(0, 80) || "",
    semantic_tags: d.semantic_tags || [],
  };
}

function toSearchItemLite(d: Partial<EmojiDocument>): EmojiSearchItemLite {
  return {
    slug: d.slug!,
    name: d.name!,
    character: d.character!,
    tags: d.tags || [],
    category: d.category!,
    shortcode: d.shortcode!,
  };
}

/**
 * Paginated browse index for the /search page. Filters by category (or all
 * emojis when null), sorted by trend_score. Returns the lite search shape plus
 * a total count for pagination. Cached per category+page.
 */
export async function getBrowseIndex(
  category: string | null,
  page: number,
  perPage: number = 100
): Promise<{ items: EmojiSearchItem[]; total: number }> {
  const cacheKey = `category:index:${category ?? "all"}:${page}`;
  const cached = await getCached<{ items: EmojiSearchItem[]; total: number }>(cacheKey);
  if (cached) return cached;

  const conn = await connectToDatabase();
  if (!conn) return { items: [], total: 0 };

  const filter = category ? { category } : {};
  const col = emojis(conn.db);
  const [docs, total] = await Promise.all([
    col
      .find(filter, { projection: LITE_PROJECTION })
      .sort({ "virality.trend_score": -1, slug: 1 })
      .skip((page - 1) * perPage)
      .limit(perPage)
      .toArray(),
    col.countDocuments(filter),
  ]);

  const result = { items: docs.map(toSearchItem), total };
  await setCached(cacheKey, result, 3600);
  return result;
}

export async function getRelatedEmojis(
  slugs: string[]
): Promise<EmojiDocument[]> {
  const conn = await connectToDatabase();
  if (!conn) return [];
  return emojis(conn.db)
    .find({ slug: { $in: slugs } })
    .toArray();
}

export async function getEmojisByCategory(
  category: string,
  limit: number = 20
): Promise<EmojiDocument[]> {
  const conn = await connectToDatabase();
  if (!conn) return [];
  return emojis(conn.db)
    .find({ category })
    .sort({ "virality.trend_score": -1 })
    .limit(limit)
    .toArray();
}

export async function getEmojiCount(): Promise<number> {
  const conn = await connectToDatabase();
  if (!conn) return 0;
  return emojis(conn.db).countDocuments();
}

export async function getEmojiPlatformData(
  slug: string,
  platform: string
): Promise<EmojiDocument | null> {
  const cacheKey = `platform:${platform}:${slug}`;
  const cached = await getCached<EmojiDocument>(cacheKey);
  if (cached) return cached;

  const conn = await connectToDatabase();
  if (!conn) return null;
  const result = await emojis(conn.db).findOne(
    { slug },
    { projection: { slug: 1, name: 1, character: 1, unicode: 1, shortcode: 1, category: 1, [platform]: 1, virality: 1, relations: 1, tags: 1 } }
  );

  if (result) await setCached(cacheKey, result, 3600);
  return result;
}

// Mongo-only (prerender-safe): runs inside the /vs/[slug] ISR render via
// lib/comparison.ts. See getEmojiBySlug for why Redis is avoided here.
export async function getComparisonBySlug(
  slug: string
): Promise<ComparisonDocument | null> {
  const conn = await connectToDatabase();
  if (!conn) return null;
  return conn.db
    .collection<ComparisonDocument>("comparisons")
    .findOne({ slug });
}

// Mongo-only (prerender-safe): runs inside the /combo/[type] ISR render.
// See getEmojiBySlug for why Redis is avoided here.
export async function getComboBySlug(
  slug: string
): Promise<ComboDocument | null> {
  const conn = await connectToDatabase();
  if (!conn) return null;
  return conn.db
    .collection<ComboDocument>("combos")
    .findOne({ slug });
}

export async function getAllComparisonSlugs(): Promise<string[]> {
  const conn = await connectToDatabase();
  if (!conn) return [];
  const docs = await conn.db
    .collection<ComparisonDocument>("comparisons")
    .find({}, { projection: { slug: 1 } })
    .toArray();
  return docs.map((d) => d.slug);
}

export async function getAllComboSlugs(): Promise<string[]> {
  const conn = await connectToDatabase();
  if (!conn) return [];
  const docs = await conn.db
    .collection<ComboDocument>("combos")
    .find({}, { projection: { slug: 1 } })
    .toArray();
  return docs.map((d) => d.slug);
}

// Mongo-only (prerender-safe): runs inside the /culture/[region] ISR render.
// See getEmojiBySlug for why Redis is avoided here.
export async function getEmojisByCulture(
  region: string,
  limit: number = 30
): Promise<EmojiDocument[]> {
  const conn = await connectToDatabase();
  if (!conn) return [];
  return emojis(conn.db)
    .find(
      { [`cultures.${region}`]: { $exists: true, $ne: "" } },
      { projection: { slug: 1, name: 1, character: 1, [`cultures.${region}`]: 1, virality: 1 } }
    )
    .sort({ "virality.trend_score": -1 })
    .limit(limit)
    .toArray();
}

export async function getRelatedComparisons(
  emojiSlug: string,
  limit: number = 5
): Promise<ComparisonDocument[]> {
  const conn = await connectToDatabase();
  if (!conn) return [];
  return conn.db
    .collection<ComparisonDocument>("comparisons")
    .find({ $or: [{ emoji1_slug: emojiSlug }, { emoji2_slug: emojiSlug }] })
    .limit(limit)
    .toArray();
}

export async function getRelatedCombos(
  limit: number = 3
): Promise<ComboDocument[]> {
  const conn = await connectToDatabase();
  if (!conn) return [];
  return conn.db
    .collection<ComboDocument>("combos")
    .find({})
    .limit(limit)
    .toArray();
}

export async function getKitchenCombo(
  emoji1: string,
  emoji2: string
): Promise<any | null> {
  const conn = await connectToDatabase();
  if (!conn) return null;
  const kitchen = conn.db.collection("kitchen");
  // Check both orderings
  const result = await kitchen.findOne({
    $or: [
      { emoji1, emoji2 },
      { emoji1: emoji2, emoji2: emoji1 },
    ],
  });
  return result;
}

export async function getRandomKitchenCombos(
  limit: number = 10
): Promise<any[]> {
  const conn = await connectToDatabase();
  if (!conn) return [];
  return conn.db
    .collection("kitchen")
    .aggregate([{ $sample: { size: limit } }])
    .toArray();
}

export async function getPopularComparisons(
  limit: number = 10
): Promise<ComparisonDocument[]> {
  const conn = await connectToDatabase();
  if (!conn) return [];
  return conn.db
    .collection<ComparisonDocument>("comparisons")
    .find({})
    .limit(limit)
    .toArray();
}

export async function getPopularCombos(
  limit: number = 10
): Promise<ComboDocument[]> {
  const conn = await connectToDatabase();
  if (!conn) return [];
  return conn.db
    .collection<ComboDocument>("combos")
    .find({})
    .limit(limit)
    .toArray();
}

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

export { connectToDatabase };
