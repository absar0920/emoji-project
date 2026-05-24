import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI!;
const MONGODB_DB = process.env.MONGODB_DB || "emoji-platform";

// Google Emoji Kitchen metadata endpoint
const KITCHEN_BASE = "https://www.gstatic.com/android/keyboard/emojikitchen";

function emojiToCodepoints(emoji: string): string {
  return [...emoji]
    .map((c) => c.codePointAt(0)!.toString(16).padStart(4, "0"))
    .join("-");
}

async function main() {
  if (!MONGODB_URI) {
    console.error("MONGODB_URI is not set.");
    process.exit(1);
  }

  const client = await MongoClient.connect(MONGODB_URI);
  const db = client.db(MONGODB_DB);
  const collection = db.collection("kitchen");

  // Create index
  await collection.createIndex({ emoji1: 1, emoji2: 1 }, { unique: true });

  // Common emojis to check for kitchen combos
  const baseEmojis = [
    "😀", "😂", "🥹", "😍", "🥰", "😘", "😭", "😤", "😡", "😊",
    "😎", "🤔", "😏", "🙄", "😒", "😴", "🤮", "😈", "💀", "👻",
    "🤡", "💩", "🔥", "❤️", "💔", "✨", "💯", "👀", "👍", "👎",
    "🙏", "💪", "🧠", "🌸", "🌺", "🐶", "🐱", "🐸", "🦋", "🍕",
  ];

  console.log(`Checking kitchen combos for ${baseEmojis.length} base emojis...`);
  let found = 0;
  let checked = 0;

  for (let i = 0; i < baseEmojis.length; i++) {
    for (let j = i; j < baseEmojis.length; j++) {
      const e1 = baseEmojis[i];
      const e2 = baseEmojis[j];
      const cp1 = emojiToCodepoints(e1);
      const cp2 = emojiToCodepoints(e2);

      // Try known Google Kitchen URL pattern
      const url = `${KITCHEN_BASE}/${cp1}/${cp1}_${cp2}.png`;

      try {
        const res = await fetch(url, { method: "HEAD" });
        checked++;
        if (res.ok) {
          await collection.updateOne(
            { emoji1: e1, emoji2: e2 },
            {
              $set: {
                emoji1: e1,
                emoji2: e2,
                result_url: url,
                created_at: new Date(),
              },
            },
            { upsert: true }
          );
          found++;
          console.log(`  ✓ ${e1} + ${e2} (${found} found)`);
        }
      } catch {
        // Skip failed requests
      }

      if (checked % 100 === 0) {
        console.log(`  Checked ${checked} combos, found ${found}...`);
      }
    }
  }

  console.log(`\nDone! Found ${found} kitchen combos from ${checked} checks.`);
  await client.close();
}

main().catch(console.error);
