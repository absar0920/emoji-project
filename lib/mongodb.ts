import { MongoClient, Db, Collection } from "mongodb";
import { EmojiDocument, EmojiSearchItem, ComparisonDocument, ComboDocument } from "@/types/emoji";
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

function emojis(db: Db): Collection<EmojiDocument> {
  return db.collection<EmojiDocument>("emojis");
}

export async function getEmojiBySlug(
  slug: string
): Promise<EmojiDocument | null> {
  const cacheKey = `emoji:${slug}`;
  const cached = await getCached<EmojiDocument>(cacheKey);
  if (cached) return cached;

  const conn = await connectToDatabase();
  if (!conn) return null;
  const result = await emojis(conn.db).findOne({ slug });

  if (result) {
    await setCached(cacheKey, result, 3600);
  }
  return result;
}

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
  const conn = await connectToDatabase();
  if (!conn) return [];
  const docs = await emojis(conn.db)
    .find(
      {},
      {
        projection: {
          slug: 1,
          name: 1,
          character: 1,
          tags: 1,
          category: 1,
          shortcode: 1,
          "genz_meaning.interpretation": 1,
        },
      }
    )
    .toArray();

  return docs.map((d) => ({
    slug: d.slug,
    name: d.name,
    character: d.character,
    tags: d.tags,
    category: d.category,
    shortcode: d.shortcode,
    genz_summary: d.genz_meaning?.interpretation?.slice(0, 80) || "",
  }));
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

export async function getComparisonBySlug(
  slug: string
): Promise<ComparisonDocument | null> {
  const cacheKey = `comparison:${slug}`;
  const cached = await getCached<ComparisonDocument>(cacheKey);
  if (cached) return cached;

  const conn = await connectToDatabase();
  if (!conn) return null;
  const result = await conn.db
    .collection<ComparisonDocument>("comparisons")
    .findOne({ slug });

  if (result) await setCached(cacheKey, result, 3600);
  return result;
}

export async function getComboBySlug(
  slug: string
): Promise<ComboDocument | null> {
  const cacheKey = `combo:${slug}`;
  const cached = await getCached<ComboDocument>(cacheKey);
  if (cached) return cached;

  const conn = await connectToDatabase();
  if (!conn) return null;
  const result = await conn.db
    .collection<ComboDocument>("combos")
    .findOne({ slug });

  if (result) await setCached(cacheKey, result, 3600);
  return result;
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

export async function getEmojisByCulture(
  region: string,
  limit: number = 30
): Promise<EmojiDocument[]> {
  const cacheKey = `culture:${region}`;
  const cached = await getCached<EmojiDocument[]>(cacheKey);
  if (cached) return cached;

  const conn = await connectToDatabase();
  if (!conn) return [];
  const results = await emojis(conn.db)
    .find(
      { [`cultures.${region}`]: { $exists: true, $ne: "" } },
      { projection: { slug: 1, name: 1, character: 1, [`cultures.${region}`]: 1, virality: 1 } }
    )
    .sort({ "virality.trend_score": -1 })
    .limit(limit)
    .toArray();

  await setCached(cacheKey, results, 3600);
  return results;
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

export { connectToDatabase };
