import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI!;
const MONGODB_DB = process.env.MONGODB_DB || "emoji-platform";

const METADATA_URL =
  "https://raw.githubusercontent.com/xsalazar/emoji-kitchen-backend/main/app/metadata.json";

interface KitchenComboEntry {
  gStaticUrl: string;
  leftEmoji: string;
  leftEmojiCodepoint: string;
  rightEmoji: string;
  rightEmojiCodepoint: string;
  date: string;
  isLatest: boolean;
}

interface EmojiData {
  emoji: string;
  emojiCodepoint: string;
  combinations: Record<string, KitchenComboEntry[]>;
}

interface MetadataJson {
  knownSupportedEmoji: string[];
  data: Record<string, EmojiData>;
}

async function main() {
  if (!MONGODB_URI) {
    console.error("MONGODB_URI is not set.");
    process.exit(1);
  }

  console.log("Fetching metadata.json from xsalazar/emoji-kitchen-backend...");
  const res = await fetch(METADATA_URL);
  if (!res.ok) {
    console.error(`Failed to fetch metadata: ${res.status} ${res.statusText}`);
    process.exit(1);
  }
  const metadata: MetadataJson = await res.json();
  console.log(
    `Loaded metadata: ${metadata.knownSupportedEmoji.length} supported emojis`
  );

  // Extract all latest combos
  const combos: {
    emoji1: string;
    emoji2: string;
    result_url: string;
    date: string;
  }[] = [];
  const seen = new Set<string>();

  for (const emojiData of Object.values(metadata.data)) {
    for (const entries of Object.values(emojiData.combinations)) {
      const latest = entries.find((e) => e.isLatest);
      if (!latest) continue;

      // Dedupe by sorted pair
      const key = [latest.leftEmojiCodepoint, latest.rightEmojiCodepoint]
        .sort()
        .join("_");
      if (seen.has(key)) continue;
      seen.add(key);

      combos.push({
        emoji1: latest.leftEmoji,
        emoji2: latest.rightEmoji,
        result_url: latest.gStaticUrl,
        date: latest.date,
      });
    }
  }

  console.log(`Found ${combos.length} unique combos. Inserting into MongoDB...`);

  const client = await MongoClient.connect(MONGODB_URI);
  const db = client.db(MONGODB_DB);
  const collection = db.collection("kitchen");

  // Create index
  await collection.createIndex({ emoji1: 1, emoji2: 1 }, { unique: true });

  // Bulk upsert in batches of 500
  const BATCH_SIZE = 500;
  let inserted = 0;

  for (let i = 0; i < combos.length; i += BATCH_SIZE) {
    const batch = combos.slice(i, i + BATCH_SIZE);
    const ops = batch.map((combo) => ({
      updateOne: {
        filter: { emoji1: combo.emoji1, emoji2: combo.emoji2 },
        update: {
          $set: {
            emoji1: combo.emoji1,
            emoji2: combo.emoji2,
            result_url: combo.result_url,
            date: combo.date,
            created_at: new Date(),
          },
        },
        upsert: true,
      },
    }));

    const result = await collection.bulkWrite(ops);
    inserted += result.upsertedCount + result.modifiedCount;
    console.log(
      `  Batch ${Math.floor(i / BATCH_SIZE) + 1}: ${inserted} combos processed`
    );
  }

  console.log(`\nDone! ${inserted} kitchen combos stored in MongoDB.`);
  await client.close();
}

main().catch(console.error);
