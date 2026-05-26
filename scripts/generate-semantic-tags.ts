import { MongoClient } from "mongodb";
import { GoogleGenerativeAI } from "@google/generative-ai";

const MONGODB_URI = process.env.MONGODB_URI!;
const MONGODB_DB = process.env.MONGODB_DB || "emoji-platform";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY!;

const BATCH_SIZE = 50;
const MAX_RETRIES = 3;
const RATE_LIMIT_DELAY_MS = 500; // delay between batches

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function generateTags(
  emoji: {
    character: string;
    name: string;
    genz_meaning?: { interpretation?: string };
    emotional_meaning?: { emotion_type?: string };
    dating_meaning?: { flirt_usage?: string };
    meme_meaning?: { viral_usage?: string };
  },
  retries: number = MAX_RETRIES
): Promise<string[]> {
  const context = [
    emoji.genz_meaning?.interpretation,
    emoji.emotional_meaning?.emotion_type,
    emoji.dating_meaning?.flirt_usage,
    emoji.meme_meaning?.viral_usage,
  ]
    .filter(Boolean)
    .join(". ");

  const prompt = `Generate 15-20 semantic search tags for this emoji.

Emoji: ${emoji.character} (${emoji.name})
Context: ${context || "No additional context"}

Return a JSON object with a "tags" array of lowercase strings. Include:
- Synonyms and related words
- Feelings and emotions it represents
- Intents and use-cases (e.g. "breakup", "congratulations")
- Slang terms and informal descriptions
- Common search queries people would use to find this emoji

Example for 💀: {"tags": ["death", "dead", "dying laughing", "hilarious", "ironic", "sarcasm", "morbid", "dark humor", "lmao", "i cant", "so funny", "skull emoji", "gen-z laughter", "extreme reaction", "disbelief"]}`;

  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
        generationConfig: { responseMimeType: "application/json" },
      });

      const result = await model.generateContent(prompt);
      const text = result.response.text().trim();
      const jsonStart = text.indexOf("{");
      const jsonEnd = text.lastIndexOf("}");
      if (jsonStart === -1 || jsonEnd === -1) return [];
      const parsed = JSON.parse(text.slice(jsonStart, jsonEnd + 1));
      return Array.isArray(parsed.tags) ? parsed.tags : [];
    } catch (err) {
      const msg = (err as Error).message;
      if (attempt < retries - 1) {
        // Exponential backoff: 1s, 2s, 4s
        const delay = 1000 * Math.pow(2, attempt);
        console.warn(
          `  Retry ${attempt + 1}/${retries} for ${emoji.character} ${emoji.name} (waiting ${delay}ms): ${msg}`
        );
        await sleep(delay);
      } else {
        throw err;
      }
    }
  }
  return [];
}

async function main() {
  if (!MONGODB_URI || !GEMINI_API_KEY) {
    console.error("MONGODB_URI and GEMINI_API_KEY must be set.");
    process.exit(1);
  }

  const client = await MongoClient.connect(MONGODB_URI);
  const db = client.db(MONGODB_DB);
  const collection = db.collection("emojis");

  const allEmojis = await collection
    .find(
      { semantic_tags: { $exists: false } },
      {
        projection: {
          slug: 1,
          character: 1,
          name: 1,
          "genz_meaning.interpretation": 1,
          "emotional_meaning.emotion_type": 1,
          "dating_meaning.flirt_usage": 1,
          "meme_meaning.viral_usage": 1,
        },
      }
    )
    .toArray();

  console.log(
    `Generating semantic tags for ${allEmojis.length} emojis (batch=${BATCH_SIZE}, retries=${MAX_RETRIES})...`
  );

  let processed = 0;
  let errors = 0;

  for (let i = 0; i < allEmojis.length; i += BATCH_SIZE) {
    const batch = allEmojis.slice(i, i + BATCH_SIZE);

    await Promise.all(
      batch.map(async (emoji) => {
        try {
          const tags = await generateTags(emoji as any);
          if (tags.length > 0) {
            await collection.updateOne(
              { slug: emoji.slug },
              { $set: { semantic_tags: tags } }
            );
          }
          processed++;
        } catch (err) {
          console.error(
            `  Failed ${emoji.character} ${emoji.name}:`,
            (err as Error).message
          );
          errors++;
        }
      })
    );

    console.log(
      `  Batch ${Math.floor(i / BATCH_SIZE) + 1}: ${processed}/${allEmojis.length} processed, ${errors} errors`
    );

    // Rate limit between batches
    if (i + BATCH_SIZE < allEmojis.length) {
      await sleep(RATE_LIMIT_DELAY_MS);
    }
  }

  console.log(`\nDone! ${processed} emojis tagged, ${errors} errors.`);
  await client.close();
}

main().catch(console.error);
