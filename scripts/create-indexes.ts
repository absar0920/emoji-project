import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI!;
const MONGODB_DB = process.env.MONGODB_DB || "emoji-platform";

async function main() {
  if (!MONGODB_URI) {
    console.error("MONGODB_URI is not set.");
    process.exit(1);
  }

  const client = await MongoClient.connect(MONGODB_URI);
  const db = client.db(MONGODB_DB);
  const collection = db.collection("emojis");

  console.log("Creating indexes on 'emojis' collection...");

  await collection.createIndex({ slug: 1 }, { unique: true });
  console.log("  ✓ slug (unique)");

  await collection.createIndex({ unicode: 1 }, { unique: true });
  console.log("  ✓ unicode (unique)");

  await collection.createIndex({ name: "text" });
  console.log("  ✓ name (text)");

  await collection.createIndex({ category: 1 });
  console.log("  ✓ category");

  await collection.createIndex({ "virality.trend_score": -1 });
  console.log("  ✓ virality.trend_score (desc)");

  await collection.createIndex({ tags: 1 });
  console.log("  ✓ tags");

  await collection.createIndex({ category: 1, "virality.trend_score": -1 });
  console.log("  ✓ { category, virality.trend_score } compound");

  console.log("\nAll indexes created successfully.");
  await client.close();
}

main().catch(console.error);
