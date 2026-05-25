import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI!;
const MONGODB_DB = process.env.MONGODB_DB || "emoji-platform";

function emojiToCodepoints(emoji: string): string[] {
  const codepoints: string[] = [];
  for (const char of emoji) {
    const cp = char.codePointAt(0);
    if (cp !== undefined && cp !== 0xfe0f) {
      codepoints.push(cp.toString(16));
    }
  }
  return codepoints;
}

function notoUrl(cps: string[]): string {
  const joined = cps.map((c) => c.toLowerCase()).join("_");
  return `https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/128/emoji_u${joined}.png`;
}

function twemojiUrl(cps: string[]): string {
  const joined = cps.map((c) => c.toLowerCase()).join("-");
  return `https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/${joined}.svg`;
}

function openmojiUrl(cps: string[]): string {
  const joined = cps.map((c) => c.toUpperCase().padStart(4, "0")).join("-");
  return `https://openmoji.org/data/color/svg/${joined}.svg`;
}

async function checkUrl(url: string): Promise<boolean> {
  try {
    const res = await fetch(url, { method: "HEAD" });
    return res.ok;
  } catch {
    return false;
  }
}

async function main() {
  if (!MONGODB_URI) {
    console.error("MONGODB_URI is not set.");
    process.exit(1);
  }

  const client = await MongoClient.connect(MONGODB_URI);
  const db = client.db(MONGODB_DB);
  const collection = db.collection("emojis");

  const allEmojis = await collection
    .find({}, { projection: { slug: 1, character: 1 } })
    .toArray();

  console.log(`Processing ${allEmojis.length} emojis for design variations...`);

  let processed = 0;
  let found = 0;
  const BATCH_SIZE = 20;

  for (let i = 0; i < allEmojis.length; i += BATCH_SIZE) {
    const batch = allEmojis.slice(i, i + BATCH_SIZE);

    await Promise.all(
      batch.map(async (emoji) => {
        const cps = emojiToCodepoints(emoji.character);
        if (cps.length === 0) return;

        const variations: Record<string, string> = {};

        const noto = notoUrl(cps);
        if (await checkUrl(noto)) variations.google_noto = noto;

        const twe = twemojiUrl(cps);
        if (await checkUrl(twe)) variations.twemoji = twe;

        const om = openmojiUrl(cps);
        if (await checkUrl(om)) variations.openmoji = om;

        if (Object.keys(variations).length > 0) {
          await collection.updateOne(
            { slug: emoji.slug },
            { $set: { design_variations: variations } }
          );
          found++;
        }

        processed++;
      })
    );

    console.log(
      `  Batch ${Math.floor(i / BATCH_SIZE) + 1}: ${processed}/${allEmojis.length} processed, ${found} with variations`
    );
  }

  console.log(`\nDone! ${found} emojis updated with design variations.`);
  await client.close();
}

main().catch(console.error);
