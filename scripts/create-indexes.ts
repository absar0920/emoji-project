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

  // Comparisons collection
  const comparisons = db.collection("comparisons");
  console.log("\nCreating indexes on 'comparisons' collection...");

  await comparisons.createIndex({ slug: 1 }, { unique: true });
  console.log("  ✓ slug (unique)");

  await comparisons.createIndex({ emoji1_slug: 1 });
  console.log("  ✓ emoji1_slug");

  await comparisons.createIndex({ emoji2_slug: 1 });
  console.log("  ✓ emoji2_slug");

  // Combos collection
  const combos = db.collection("combos");
  console.log("\nCreating indexes on 'combos' collection...");

  await combos.createIndex({ slug: 1 }, { unique: true });
  console.log("  ✓ slug (unique)");

  console.log("\nAll indexes created successfully.");
  await client.close();
}

main().catch(console.error);
