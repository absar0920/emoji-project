import { MongoClient, Db, Collection } from "mongodb";
import { EmojiDocument, EmojiSearchItem } from "@/types/emoji";
import { getCached, setCached } from "./redis";

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB || "emoji-platform";

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

async function connectToDatabase(): Promise<{
  client: MongoClient;
  db: Db;
}> {
  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI environment variable is not set");
  }

  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = await MongoClient.connect(MONGODB_URI);
  const db = client.db(MONGODB_DB);

  cachedClient = client;
  cachedDb = db;

  return { client, db };
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

  const { db } = await connectToDatabase();
  const result = await emojis(db).findOne({ slug });

  if (result) {
    await setCached(cacheKey, result, 3600); // 1 hour TTL
  }
  return result;
}

export async function getTrendingEmojis(
  limit: number = 10
): Promise<EmojiDocument[]> {
  const cacheKey = `trending:all:${limit}`;
  const cached = await getCached<EmojiDocument[]>(cacheKey);
  if (cached) return cached;

  const { db } = await connectToDatabase();
  const results = await emojis(db)
    .find({})
    .sort({ "virality.trend_score": -1 })
    .limit(limit)
    .toArray();

  await setCached(cacheKey, results, 300); // 5 min TTL
  return results;
}

export async function getAllSlugs(): Promise<string[]> {
  const { db } = await connectToDatabase();
  const docs = await emojis(db)
    .find({}, { projection: { slug: 1 } })
    .toArray();
  return docs.map((d) => d.slug);
}

export async function getSearchIndex(): Promise<EmojiSearchItem[]> {
  const { db } = await connectToDatabase();
  const docs = await emojis(db)
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
  const { db } = await connectToDatabase();
  return emojis(db)
    .find({ slug: { $in: slugs } })
    .toArray();
}

export async function getEmojisByCategory(
  category: string,
  limit: number = 20
): Promise<EmojiDocument[]> {
  const { db } = await connectToDatabase();
  return emojis(db)
    .find({ category })
    .sort({ "virality.trend_score": -1 })
    .limit(limit)
    .toArray();
}

export async function getEmojiCount(): Promise<number> {
  const { db } = await connectToDatabase();
  return emojis(db).countDocuments();
}

export { connectToDatabase };
