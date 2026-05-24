import { MongoClient } from "mongodb";
import { v4 as uuidv4 } from "uuid";
import { generateEmojiMeanings } from "../lib/claude";
import type { SeedEmoji, EmojiDocument } from "../types/emoji";
import * as fs from "fs";
import * as path from "path";

const MONGODB_URI = process.env.MONGODB_URI!;
const MONGODB_DB = process.env.MONGODB_DB || "emoji-platform";
const RATE_LIMIT_MS = 6000; // 10 per minute

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  if (!MONGODB_URI) {
    console.error("MONGODB_URI is not set. Copy .env.local.example to .env.local and fill in values.");
    process.exit(1);
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    console.error("ANTHROPIC_API_KEY is not set.");
    process.exit(1);
  }

  const seedPath = path.join(__dirname, "../data/seed-emojis.json");
  const seedData = JSON.parse(fs.readFileSync(seedPath, "utf-8"));
  const emojis = seedData as SeedEmoji[];

  const client = await MongoClient.connect(MONGODB_URI);
  const db = client.db(MONGODB_DB);
  const collection = db.collection("emojis");

  console.log(`Starting pipeline for ${emojis.length} emojis...`);

  let processed = 0;
  let skipped = 0;
  let errors = 0;

  for (const seed of emojis) {
    // Resume support: skip if already exists with meaning data
    const existing = await collection.findOne({ slug: seed.slug });
    if (existing?.official_meaning) {
      console.log(`  SKIP: ${seed.character} ${seed.name} (already has meaning data)`);
      skipped++;
      continue;
    }

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
      console.log(`  ✓ ${seed.character} ${seed.name} (${processed}/${emojis.length - skipped})`);
    } catch (err) {
      errors++;
      console.error(`  ✗ ${seed.character} ${seed.name}: ${err}`);
    }

    // Rate limit
    await sleep(RATE_LIMIT_MS);
  }

  console.log(`\nDone! Processed: ${processed}, Skipped: ${skipped}, Errors: ${errors}`);
  await client.close();
}

main().catch(console.error);
