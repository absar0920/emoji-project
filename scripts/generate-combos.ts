import { MongoClient } from "mongodb";
import pLimit from "p-limit";
import { generateCombos } from "../lib/claude";
import type { ComboDocument } from "../types/emoji";

const MONGODB_URI = process.env.MONGODB_URI!;
const MONGODB_DB = process.env.MONGODB_DB || "emoji-platform";
const CONCURRENCY = 100;

const THEMES = [
  "birthday", "love", "breakup", "aesthetic", "gym", "study", "pride",
  "halloween", "christmas", "graduation", "wedding", "sad", "angry",
  "flirty", "funny", "chill", "hype", "toxic", "dark", "soft",
  "motivational", "party", "travel", "food", "music", "gaming", "sports",
  "nature", "weather", "animals", "family", "friendship", "work", "school",
  "beach", "summer", "winter", "spring", "autumn", "night", "morning",
  "coffee", "wine", "celebration", "congratulations", "good-luck",
  "thank-you", "sorry", "miss-you", "thinking-of-you", "good-morning",
  "good-night", "weekend", "monday", "friday", "self-care", "mental-health",
  "meditation", "yoga", "running", "cooking", "reading", "art",
  "photography", "shopping", "money", "success", "failure", "nostalgia",
  "vintage", "retro", "y2k", "cottagecore", "indie", "punk", "goth",
  "kawaii", "minimalist", "maximalist", "pastel", "neon", "rainbow",
  "sparkle", "fire-set", "ice", "water", "earth", "air", "zodiac",
  "astrology", "tarot", "witchy", "spooky", "creepy", "cute", "ugly",
  "weird", "random", "chaos", "peace", "war", "justice", "freedom",
  "rebel", "angel", "devil", "heaven", "hell", "dream", "nightmare",
  "reality", "fantasy", "sci-fi", "horror", "comedy", "romance", "drama",
  "action", "mystery", "thriller", "anime", "kpop", "bollywood",
  "hollywood", "tiktok-aesthetic", "instagram-aesthetic", "vsco", "e-girl",
  "e-boy", "soft-girl", "dark-academia", "light-academia", "grunge",
  "preppy", "sporty", "casual", "formal", "luxe", "budget", "diy",
  "handmade", "organic", "vegan", "fitness", "wellness", "skincare",
  "makeup", "hair", "nails", "fashion", "streetwear", "haute-couture",
  "vintage-fashion", "new-year", "valentines-day", "mothers-day",
  "fathers-day", "easter", "thanksgiving", "ramadan", "eid", "diwali",
  "holi", "chinese-new-year", "back-to-school", "prom", "road-trip",
  "camping", "hiking", "swimming", "dancing", "singing", "movie-night",
  "date-night", "girls-night", "boys-night", "brunch", "dinner",
  "breakfast", "snack-time", "pizza-night", "taco-tuesday", "sushi",
  "baking", "gardening", "cleaning", "moving", "new-job", "promotion",
  "retirement", "baby-shower", "engagement", "anniversary", "reunion",
  "farewell", "welcome", "apology", "forgiveness", "gratitude", "hope",
  "courage", "strength", "wisdom", "creativity", "innovation", "teamwork",
];

function toSlug(theme: string): string {
  return theme.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

function toDisplayName(theme: string): string {
  return theme
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

async function main() {
  if (!MONGODB_URI) {
    console.error("MONGODB_URI is not set.");
    process.exit(1);
  }
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error("ANTHROPIC_API_KEY is not set.");
    process.exit(1);
  }

  const client = await MongoClient.connect(MONGODB_URI);
  const db = client.db(MONGODB_DB);
  const combosCol = db.collection<ComboDocument>("combos");

  // Resume support
  const existingSlugs = await combosCol
    .find({}, { projection: { slug: 1 } })
    .toArray();
  const existingSet = new Set(existingSlugs.map((d) => d.slug));

  const toProcess = THEMES.filter((t) => !existingSet.has(toSlug(t)));
  const skipped = THEMES.length - toProcess.length;

  console.log(
    `Combos: ${toProcess.length} to generate, ${skipped} skipped (${CONCURRENCY} concurrent)`
  );

  let processed = 0;
  let errors = 0;
  const limit = pLimit(CONCURRENCY);

  const tasks = toProcess.map((theme) =>
    limit(async () => {
      const slug = toSlug(theme);
      const displayName = toDisplayName(theme);

      try {
        console.log(`  Generating: ${displayName}...`);
        const result = await generateCombos(displayName);

        const doc: ComboDocument = {
          slug,
          theme: displayName,
          combos: (result.combos as ComboDocument["combos"]) || [],
          seo_description: String(result.seo_description || ""),
          created_at: new Date(),
        };

        await combosCol.updateOne(
          { slug },
          { $set: doc },
          { upsert: true }
        );

        processed++;
        console.log(`  ✓ ${displayName} (${processed}/${toProcess.length})`);
      } catch (err) {
        errors++;
        console.error(`  ✗ ${displayName}: ${err}`);
      }
    })
  );

  await Promise.allSettled(tasks);
  console.log(`\nDone! Processed: ${processed}, Skipped: ${skipped}, Errors: ${errors}`);
  await client.close();
}

main().catch(console.error);
