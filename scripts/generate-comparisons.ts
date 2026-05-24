import { MongoClient } from "mongodb";
import pLimit from "p-limit";
import { generateComparison } from "../lib/claude";
import type { EmojiDocument, ComparisonDocument } from "../types/emoji";

const MONGODB_URI = process.env.MONGODB_URI!;
const MONGODB_DB = process.env.MONGODB_DB || "emoji-platform";
const CONCURRENCY = 100;

function makePairSlug(slug1: string, slug2: string): string {
  const sorted = [slug1, slug2].sort();
  return `${sorted[0]}-vs-${sorted[1]}`;
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
  const emojisCol = db.collection<EmojiDocument>("emojis");
  const comparisonsCol = db.collection<ComparisonDocument>("comparisons");

  // Fetch all emojis with relations
  const allEmojis = await emojisCol
    .find({}, { projection: { slug: 1, character: 1, name: 1, relations: 1 } })
    .toArray();

  const emojiMap = new Map(allEmojis.map((e) => [e.slug, e]));

  // Build unique pairs from relations
  const pairSet = new Set<string>();
  const pairs: Array<{ slug1: string; slug2: string }> = [];

  for (const emoji of allEmojis) {
    if (!emoji.relations) continue;
    const relatedSlugs = [
      ...(emoji.relations.related || []),
      ...(emoji.relations.opposite || []),
      ...(emoji.relations.confusing || []),
    ];
    for (const otherSlug of relatedSlugs) {
      if (!emojiMap.has(otherSlug)) continue;
      const pairSlug = makePairSlug(emoji.slug, otherSlug);
      if (pairSet.has(pairSlug)) continue;
      pairSet.add(pairSlug);
      pairs.push({ slug1: emoji.slug, slug2: otherSlug });
    }
  }

  // Filter out already-generated comparisons
  const existingSlugs = await comparisonsCol
    .find({}, { projection: { slug: 1 } })
    .toArray();
  const existingSet = new Set(existingSlugs.map((d) => d.slug));

  const toProcess = pairs.filter(
    (p) => !existingSet.has(makePairSlug(p.slug1, p.slug2))
  );

  const skipped = pairs.length - toProcess.length;
  console.log(
    `Comparisons: ${toProcess.length} to generate, ${skipped} skipped (${CONCURRENCY} concurrent)`
  );

  let processed = 0;
  let errors = 0;
  const limit = pLimit(CONCURRENCY);

  const tasks = toProcess.map((pair) =>
    limit(async () => {
      const emoji1 = emojiMap.get(pair.slug1)!;
      const emoji2 = emojiMap.get(pair.slug2)!;
      const pairSlug = makePairSlug(pair.slug1, pair.slug2);
      const sorted = [pair.slug1, pair.slug2].sort();

      try {
        console.log(`  Comparing: ${emoji1.character} vs ${emoji2.character}...`);
        const result = await generateComparison(
          emoji1.character,
          emoji1.name,
          emoji2.character,
          emoji2.name
        );

        const doc: ComparisonDocument = {
          slug: pairSlug,
          emoji1_slug: sorted[0],
          emoji2_slug: sorted[1],
          emoji1_character: emojiMap.get(sorted[0])!.character,
          emoji2_character: emojiMap.get(sorted[1])!.character,
          emoji1_name: emojiMap.get(sorted[0])!.name,
          emoji2_name: emojiMap.get(sorted[1])!.name,
          differences: result.differences as ComparisonDocument["differences"],
          winner: String(result.winner),
          winner_reason: String(result.winner_reason),
          when_to_use: String(result.when_to_use),
          created_at: new Date(),
        };

        await comparisonsCol.updateOne(
          { slug: pairSlug },
          { $set: doc },
          { upsert: true }
        );

        processed++;
        console.log(`  ✓ ${emoji1.character} vs ${emoji2.character} (${processed}/${toProcess.length})`);
      } catch (err) {
        errors++;
        console.error(`  ✗ ${emoji1.character} vs ${emoji2.character}: ${err}`);
      }
    })
  );

  await Promise.allSettled(tasks);
  console.log(`\nDone! Processed: ${processed}, Skipped: ${skipped}, Errors: ${errors}`);
  await client.close();
}

main().catch(console.error);
