import * as fs from "fs";
import * as path from "path";

const EMOJI_TEST_URL =
  "https://unicode.org/Public/emoji/16.0/emoji-test.txt";

interface SeedEmoji {
  character: string;
  name: string;
  slug: string;
  unicode: string;
  shortcode: string;
  category: string;
  tags: string[];
}

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function toShortcode(name: string): string {
  return (
    ":" +
    name
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .replace(/\s+/g, "_") +
    ":"
  );
}

function generateTags(name: string, category: string): string[] {
  const words = name
    .toLowerCase()
    .split(/\s+/)
    .filter((w) => w.length > 2 && !["with", "and", "the", "for"].includes(w));

  const categoryTag = category.split(" ")[0].toLowerCase();
  const tags = [...new Set([...words, categoryTag])];
  return tags.slice(0, 6);
}

function parseUnicodePoints(codePoints: string): string {
  return codePoints
    .trim()
    .split(/\s+/)
    .map((cp) => `U+${cp}`)
    .join(" ");
}

function codePointsToCharacter(codePoints: string): string {
  return codePoints
    .trim()
    .split(/\s+/)
    .map((cp) => String.fromCodePoint(parseInt(cp, 16)))
    .join("");
}

async function main() {
  console.log("Fetching emoji-test.txt from unicode.org...");
  const response = await fetch(EMOJI_TEST_URL);
  const text = await response.text();

  // Load existing seed emojis to preserve curated data
  const seedPath = path.join(__dirname, "../data/seed-emojis.json");
  const existingSeed: SeedEmoji[] = JSON.parse(
    fs.readFileSync(seedPath, "utf-8")
  );
  const existingSlugs = new Set(existingSeed.map((e) => e.slug));

  console.log(`Loaded ${existingSeed.length} existing seed emojis`);

  let currentGroup = "";
  let currentSubgroup = "";
  const newEmojis: SeedEmoji[] = [];
  const seenSlugs = new Set(existingSlugs);

  for (const line of text.split("\n")) {
    // Track group headers
    if (line.startsWith("# group:")) {
      currentGroup = line.replace("# group:", "").trim();
      continue;
    }
    if (line.startsWith("# subgroup:")) {
      currentSubgroup = line.replace("# subgroup:", "").trim();
      continue;
    }

    // Skip comments and empty lines
    if (line.startsWith("#") || !line.trim()) continue;

    // Only include fully-qualified emojis
    if (!line.includes("; fully-qualified")) continue;

    // Parse: "1F600  ; fully-qualified  # 😀 E1.0 grinning face"
    const match = line.match(
      /^([0-9A-F\s]+)\s*;\s*fully-qualified\s*#\s*(\S+)\s*E[\d.]+\s+(.+)$/i
    );
    if (!match) continue;

    const [, codePoints, , name] = match;
    const character = codePointsToCharacter(codePoints);
    const slug = toSlug(name);

    // Skip if slug already exists (from curated seed or duplicate)
    if (seenSlugs.has(slug)) continue;
    seenSlugs.add(slug);

    // Map Unicode group to our category format
    const category = currentGroup;

    const emoji: SeedEmoji = {
      character,
      name: name
        .split(" ")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" "),
      slug,
      unicode: parseUnicodePoints(codePoints),
      shortcode: toShortcode(name),
      category,
      tags: generateTags(name, category),
    };

    newEmojis.push(emoji);
  }

  // Merge: curated seed first, then new emojis
  const allEmojis = [...existingSeed, ...newEmojis];

  const outputPath = path.join(__dirname, "../data/all-emojis.json");
  fs.writeFileSync(outputPath, JSON.stringify(allEmojis, null, 2));

  console.log(`\nDone!`);
  console.log(`  Curated (preserved): ${existingSeed.length}`);
  console.log(`  New from Unicode:    ${newEmojis.length}`);
  console.log(`  Total:               ${allEmojis.length}`);
  console.log(`  Output: ${outputPath}`);
}

main().catch(console.error);
