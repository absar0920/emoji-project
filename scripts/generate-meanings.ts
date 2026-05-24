import { MongoClient } from "mongodb";
import { v4 as uuidv4 } from "uuid";
import pLimit from "p-limit";
import { generateEmojiMeanings } from "../lib/claude";
import type { SeedEmoji } from "../types/emoji";
import * as fs from "fs";
import * as path from "path";

const MONGODB_URI = process.env.MONGODB_URI!;
const MONGODB_DB = process.env.MONGODB_DB || "emoji-platform";
const CONCURRENCY = 10;

async function main() {
  if (!MONGODB_URI) {
    console.error("MONGODB_URI is not set. Copy .env.local.example to .env.local and fill in values.");
    process.exit(1);
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    console.error("ANTHROPIC_API_KEY is not set.");
    process.exit(1);
  }

  const sourceFlag = process.argv.find((a) => a.startsWith("--source="));
  const sourceFile = sourceFlag
    ? sourceFlag.split("=")[1]
    : "seed-emojis.json";
  const seedPath = path.join(__dirname, "../data", sourceFile);

  if (!fs.existsSync(seedPath)) {
    console.error(`Source file not found: ${seedPath}`);
    process.exit(1);
  }

  const seedData = JSON.parse(fs.readFileSync(seedPath, "utf-8"));
  const emojis = seedData as SeedEmoji[];

  const client = await MongoClient.connect(MONGODB_URI);
  const db = client.db(MONGODB_DB);
  const collection = db.collection("emojis");

  // Pre-filter: check which emojis already have meaning data
  const existingDocs = await collection
    .find({}, { projection: { slug: 1, emoji_id: 1, created_at: 1, official_meaning: 1 } })
    .toArray();
  const existingMap = new Map(existingDocs.map((d) => [d.slug, d]));

  const toProcess = emojis.filter((seed) => {
    const existing = existingMap.get(seed.slug);
    if (existing?.official_meaning) {
      console.log(`  SKIP: ${seed.character} ${seed.name} (already has meaning data)`);
      return false;
    }
    return true;
  });

  const skipped = emojis.length - toProcess.length;
  console.log(`Starting pipeline: ${toProcess.length} to generate, ${skipped} skipped (${CONCURRENCY} concurrent)`);

  let processed = 0;
  let errors = 0;
  const limit = pLimit(CONCURRENCY);

  const tasks = toProcess.map((seed) =>
    limit(async () => {
      const existing = existingMap.get(seed.slug);
      try {
        console.log(`  Generating: ${seed.character} ${seed.name}...`);
        const meanings = await generateEmojiMeanings(seed.character, seed.name);

        const doc = {
          emoji_id: existing?.emoji_id || uuidv4(),
          slug: seed.slug,
          unicode: seed.unicode,
          name: seed.name,
          character: seed.character,
          shortcode: seed.shortcode,
          category: seed.category,
          tags: seed.tags,
          created_at: existing?.created_at || new Date(),
          updated_at: new Date(),
          ...meanings,
        };

        await collection.updateOne(
          { slug: seed.slug },
          { $set: doc },
          { upsert: true }
        );

        processed++;
        console.log(`  ✓ ${seed.character} ${seed.name} (${processed}/${toProcess.length})`);
      } catch (err) {
        errors++;
        console.error(`  ✗ ${seed.character} ${seed.name}: ${err}`);
      }
    })
  );

  await Promise.allSettled(tasks);

  console.log(`\nDone! Processed: ${processed}, Skipped: ${skipped}, Errors: ${errors}`);
  await client.close();
}

main().catch(console.error);
