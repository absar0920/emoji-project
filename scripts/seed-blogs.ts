/**
 * Idempotent blog seeder — 5 full, curated articles with real Cloudinary images.
 *
 * Run (services live via .env.local):
 *   npm run seed:blogs            # upsert the 5 seed posts
 *   npm run seed:blogs -- --clear # remove the seed set (deleteMany {seed:true})
 *
 * Idempotency: each post has a FIXED slug + FIXED dates + a `seed: true` marker,
 * written with replaceOne({slug}, doc, {upsert}). Images upload to Cloudinary
 * under deterministic public_ids with overwrite:true, so re-runs yield the same
 * secure_urls and byte-identical docs (except _id). Never touches admin-authored
 * posts (they lack `seed: true`).
 *
 * Must run with `NODE_OPTIONS=--conditions=react-server` (see the npm script) so
 * the `server-only` lib/blog* helpers import outside Next's bundler.
 */
import { v2 as cloudinary } from "cloudinary";
import { generateJSON } from "@tiptap/html/server";
import { connectToDatabase } from "../lib/mongodb";
import { editorExtensions } from "../lib/editor-extensions";
import { jsonToSanitizedHtml, estimateReadingTime } from "../lib/blog-html";
import { delCached, incrCached } from "../lib/redis";

const COLLECTION = "blog_posts";
const LIST_GEN_KEY = "blog:list:gen";

function requireEnv(): void {
  const missing = [
    "MONGODB_URI",
    "CLOUDINARY_CLOUD_NAME",
    "CLOUDINARY_API_KEY",
    "CLOUDINARY_API_SECRET",
  ].filter((k) => !process.env[k]);
  if (missing.length) {
    console.error(`✗ Missing required env: ${missing.join(", ")}.\n  Set them in .env.local (this script uploads to Cloudinary and writes to Mongo).`);
    process.exit(1);
  }
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

/** Upload a remote image to Cloudinary under a deterministic public_id (idempotent). */
async function uploadImage(sourceUrl: string, publicId: string): Promise<string> {
  const res = await cloudinary.uploader.upload(sourceUrl, {
    public_id: publicId,
    overwrite: true,
    resource_type: "image",
  });
  return res.secure_url;
}

type Cat = { name: string; slug: string };
interface SeedPost {
  slug: string;
  title: string;
  excerpt: string;
  seo_title: string;
  seo_description: string;
  categories: Cat[];
  published_at: string; // fixed ISO date for deterministic docs
  featured: { source: string; publicId: string; alt: string };
  inline: { source: string; publicId: string; alt: string };
  /** Article HTML; receives the uploaded inline image URL. */
  body: (inlineUrl: string) => string;
}

const pic = (seed: string, w = 1200, h = 630) => `https://picsum.photos/seed/${seed}/${w}/${h}`;

const POSTS: SeedPost[] = [
  {
    slug: "skull-emoji-meaning",
    title: "What the Skull Emoji 💀 Really Means (It's Not About Death)",
    excerpt:
      "The skull emoji almost never means death anymore. Here's how 💀 became Gen-Z shorthand for laughing so hard you're 'dead' — plus when it still reads as morbid.",
    seo_title: "Skull Emoji 💀 Meaning: Why Gen-Z Uses It to Say 'I'm Dead'",
    seo_description:
      "The skull emoji rarely means death in 2026. Learn what 💀 signals on TikTok and in texts, where it came from, and how to use it without sounding morbid.",
    categories: [
      { name: "Meanings", slug: "meanings" },
      { name: "Gen-Z", slug: "gen-z" },
    ],
    published_at: "2026-06-02T09:00:00.000Z",
    featured: { source: pic("skull-emoji-hero"), publicId: "blog-seed/skull-emoji-hero", alt: "A phone screen showing a stream of chat reactions" },
    inline: { source: pic("skull-emoji-inline", 1000, 560), publicId: "blog-seed/skull-emoji-inline", alt: "Two friends laughing at a phone" },
    body: (inline) => `
<p>The skull emoji 💀 might be the most <strong>misunderstood</strong> character on your keyboard. Send it to your grandmother and she'll worry about your safety. Send it to a friend after a good joke and you're speaking fluent internet. So what does 💀 actually mean in 2026?</p>
<h2>The short answer: "I'm dead"</h2>
<p>Somewhere around 2019, 💀 quietly replaced <em>"lol"</em> and <em>"I'm crying"</em> as the default reaction to something extremely funny. The logic is simple: the joke was so good it <strong>killed you</strong>. You are, metaphorically, deceased. It's hyperbole, and it's affectionate.</p>
<blockquote><p>"I'm dead 💀" is a compliment. It means the joke landed harder than a simple 😂 could carry.</p></blockquote>
<h2>Where the meaning came from</h2>
<p>The shift started on Twitter and Vine and then accelerated on TikTok, where comment sections needed a punchier way to signal "this is hilarious." The face-with-tears-of-joy emoji 😂 had started to feel earnest and a little dated, so a darker, more ironic shorthand took over. 💀 fit perfectly.</p>
<img src="${inline}" alt="Two friends laughing at a phone" />
<h3>Skull 💀 vs. skull and crossbones ☠️</h3>
<p>These two are <strong>not</strong> interchangeable. The plain skull is playful; the crossbones version keeps a genuinely ominous, pirate-and-poison edge.</p>
<table>
<thead><tr><th>Emoji</th><th>Usual 2026 meaning</th><th>Vibe</th></tr></thead>
<tbody>
<tr><td>💀</td><td>"That's so funny I died"</td><td>Playful, ironic</td></tr>
<tr><td>☠️</td><td>Danger, poison, "this is cursed"</td><td>Ominous, edgy</td></tr>
</tbody>
</table>
<h2>How to use it (and when not to)</h2>
<ul>
<li><strong>Do</strong> use it to react to a joke, a wild story, or something delightfully absurd.</li>
<li><strong>Do</strong> stack it — <em>💀💀💀</em> means you're <em>extra</em> dead.</li>
<li><strong>Don't</strong> send it to someone who talks about actual loss or danger — context flips it back to morbid instantly.</li>
<li><strong>Don't</strong> assume older colleagues read it the same way; on LinkedIn it still reads literally.</li>
</ul>
<h2>Frequently asked questions</h2>
<h3>Does 💀 ever still mean death?</h3>
<p>Yes — in the right context (Halloween, true-crime chats, warnings) it keeps its literal meaning. Tone and topic decide.</p>
<h3>Is 💀 rude?</h3>
<p>Rarely. Among friends it's warm. The only risk is sending it to someone who reads it literally.</p>
<h3>What's the difference between 💀 and 😭?</h3>
<p>😭 leans "I'm overwhelmed / crying-laughing"; 💀 leans "I'm dead, this is too much." They often appear together.</p>
<p>Want more decoding? Read our guide to <a href="/blog/gen-z-emoji-slang-2026">Gen-Z emoji slang</a>, compare characters side by side with the <a href="/tools/emoji-vs">emoji comparison tool</a>, or browse everything filed under <a href="/blog/category/meanings">Meanings</a>.</p>
`,
  },
  {
    slug: "heart-emoji-colors-explained",
    title: "Heart Emoji Colors, Explained: What Every Color Signals",
    excerpt:
      "❤️ is not the same as 💛, 💚, or 🖤. Each heart color carries its own meaning — from deep romance to platonic friendship to pure sarcasm. Here's the full map.",
    seo_title: "Heart Emoji Colors Meaning: Red, Yellow, Purple & More Explained",
    seo_description:
      "What does each heart emoji color mean? A complete guide to ❤️ 🧡 💛 💚 💙 💜 🖤 🤍 🤎 — romance, friendship, support, and the sarcastic ones.",
    categories: [
      { name: "Meanings", slug: "meanings" },
      { name: "Dating", slug: "dating" },
    ],
    published_at: "2026-06-09T09:00:00.000Z",
    featured: { source: pic("heart-colors-hero"), publicId: "blog-seed/heart-colors-hero", alt: "Colorful paper hearts arranged on a surface" },
    inline: { source: pic("heart-colors-inline", 1000, 560), publicId: "blog-seed/heart-colors-inline", alt: "A phone showing a message full of colorful hearts" },
    body: (inline) => `
<p>Sending a heart feels simple — until you realize the <strong>color</strong> you pick says something specific. A red ❤️ and a purple 💜 are not the same message, and using the wrong one can quietly change how you come across.</p>
<h2>Why heart color matters</h2>
<p>Colors carry emotional shorthand. Over years of texting, each heart drifted toward a fairly consistent meaning. Getting them right is a small thing that makes your messages read exactly the way you intend.</p>
<blockquote><p>Rule of thumb: warm colors lean romantic or energetic, cool colors lean calm or supportive, and the "unusual" colors (🖤 🤍 🤎) carry the most specific baggage.</p></blockquote>
<h2>The full color map</h2>
<table>
<thead><tr><th>Heart</th><th>Most common meaning</th><th>Best used for</th></tr></thead>
<tbody>
<tr><td>❤️ Red</td><td>Deep love, romance</td><td>Partners, family, "I love you"</td></tr>
<tr><td>🧡 Orange</td><td>Warm, caring, half-romantic</td><td>Close friends, comfort</td></tr>
<tr><td>💛 Yellow</td><td>Friendship, happiness</td><td>Friends, cheerful notes</td></tr>
<tr><td>💚 Green</td><td>Support, jealousy (context!)</td><td>Encouragement, health</td></tr>
<tr><td>💙 Blue</td><td>Loyalty, calm, platonic trust</td><td>Friends, teammates</td></tr>
<tr><td>💜 Purple</td><td>Admiration, fandom, gentle romance</td><td>Fans, sweet friends</td></tr>
<tr><td>🖤 Black</td><td>Grief, edgy humor, or sarcasm</td><td>Dark jokes, mourning</td></tr>
<tr><td>🤍 White</td><td>Purity, sympathy, minimal aesthetic</td><td>Condolences, clean vibes</td></tr>
<tr><td>🤎 Brown</td><td>Comfort, solidarity, cozy</td><td>Warmth, community</td></tr>
</tbody>
</table>
<img src="${inline}" alt="A phone showing a message full of colorful hearts" />
<h2>The three that get misread most</h2>
<h3>💚 Green</h3>
<p>Green usually means support or health — but in a jealousy context ("green with envy") it can flip. Read the room.</p>
<h3>🖤 Black</h3>
<p>Black is genuinely double-edged: it signals grief and solemnity, but it's also the go-to for dark humor and edgy aesthetics.</p>
<h3>💜 Purple</h3>
<p>Purple has quietly become the <strong>fandom</strong> heart, especially in K-pop communities, alongside its softer romantic reading.</p>
<h2>Dating: which heart to send</h2>
<ul>
<li>Early talking stage → 💛 or 🧡 keep it warm without pressure.</li>
<li>Established relationship → ❤️ is the safe, sincere choice.</li>
<li>Playful flirting → 💜 or 😍 read as sweet, not intense.</li>
<li>Avoid 🖤 unless you're both in on the joke.</li>
</ul>
<h2>FAQ</h2>
<h3>Is ❤️ too strong for a new relationship?</h3>
<p>It can be. Many people read a red heart as a real declaration, so early on a yellow or orange heart feels safer.</p>
<h3>What does 🤍 mean?</h3>
<p>White most often signals sympathy or a clean, minimal aesthetic — and it's common in condolence messages.</p>
<p>Next, learn <a href="/blog/emoji-etiquette-at-work">emoji etiquette at work</a>, or explore more under <a href="/blog/category/dating">Dating</a>.</p>
`,
  },
  {
    slug: "emoji-etiquette-at-work",
    title: "Emoji Etiquette at Work: A Professional's Guide",
    excerpt:
      "Emoji at work can build rapport or quietly undermine you. Here's which ones are safe in Slack and email, which to avoid, and how tone shifts by seniority.",
    seo_title: "Emoji Etiquette at Work: Which Emoji Are Professional (2026 Guide)",
    seo_description:
      "A practical guide to using emoji professionally — safe choices for Slack and email, ones to avoid, and how emoji etiquette changes with seniority and culture.",
    categories: [
      { name: "Guides", slug: "guides" },
      { name: "Culture", slug: "culture" },
    ],
    published_at: "2026-06-16T09:00:00.000Z",
    featured: { source: pic("work-emoji-hero"), publicId: "blog-seed/work-emoji-hero", alt: "A laptop with a team chat open on the screen" },
    inline: { source: pic("work-emoji-inline", 1000, 560), publicId: "blog-seed/work-emoji-inline", alt: "A person typing a message on a laptop in an office" },
    body: (inline) => `
<p>Used well, an emoji softens a blunt message and builds rapport. Used carelessly, it can make you look unserious — or send a signal you didn't intend. Professional emoji use is really about <strong>reading context</strong>.</p>
<h2>The golden rule</h2>
<blockquote><p>Match the emoji energy of the person more senior than you — until you know the culture. Mirror first, lead later.</p></blockquote>
<h2>Generally safe at work</h2>
<ul>
<li>👍 — acknowledgement ("got it")</li>
<li>✅ — done / confirmed</li>
<li>🙏 — thanks or "please"</li>
<li>🎉 — celebrating a real win</li>
<li>😊 — warmth on a friendly note</li>
</ul>
<h2>Handle with care</h2>
<img src="${inline}" alt="A person typing a message on a laptop in an office" />
<p>Some emoji are fine among peers but risky upward or in mixed audiences:</p>
<table>
<thead><tr><th>Emoji</th><th>Risk</th><th>Safer read</th></tr></thead>
<tbody>
<tr><td>💀</td><td>Reads as unserious or morbid to some</td><td>Keep to peer chats</td></tr>
<tr><td>😅</td><td>Can signal you're stressed or covering a mistake</td><td>Use sparingly</td></tr>
<tr><td>👀</td><td>Implies gossip or side-eye</td><td>Only with clear rapport</td></tr>
<tr><td>🔥</td><td>Great for praise, odd on serious topics</td><td>Wins and launches</td></tr>
</tbody>
</table>
<h2>By channel</h2>
<h3>Slack / Teams</h3>
<p>Reactions are your friend — a 👍 or ✅ on a message clears the thread without a reply. Emoji in messages are fine in moderation.</p>
<h3>Email</h3>
<p>Far more conservative. A single 🙂 or 🎉 in a friendly internal note is fine; skip them in external or formal email entirely.</p>
<h2>Culture matters</h2>
<p>The same emoji can read differently across regions and teams. The 👍, for instance, is neutral in many places but can read as dismissive in others. When in doubt, use words.</p>
<h2>FAQ</h2>
<h3>Is it unprofessional to use emoji at work at all?</h3>
<p>No — in most modern teams a light touch reads as approachable. The problem is overuse or misreading seniority and audience.</p>
<h3>Which emoji should I never use in a work message?</h3>
<p>Anything ambiguous, sarcastic, or potentially NSFW. If you'd hesitate to say it out loud in a meeting, skip the emoji version too.</p>
<p>Related reading: <a href="/blog/heart-emoji-colors-explained">heart emoji colors</a> and the full <a href="/blog/category/guides">Guides</a> archive. Need to find the right character fast? Try the <a href="/tools/emoji-keyboard">emoji keyboard</a>.</p>
`,
  },
  {
    slug: "gen-z-emoji-slang-2026",
    title: "Gen-Z Emoji Slang, Decoded (2026 Edition)",
    excerpt:
      "From 🧍 to 🫠 to 🗿, Gen-Z emoji slang moves fast and rarely means what it looks like. Here's a decoder for the ones you're most likely to misread this year.",
    seo_title: "Gen-Z Emoji Slang 2026: What They Actually Mean (Decoder)",
    seo_description:
      "A 2026 decoder for Gen-Z emoji slang — 🧍 🫠 🗿 💀 and more. Learn the real meanings, the irony, and how to use them without trying too hard.",
    categories: [
      { name: "Gen-Z", slug: "gen-z" },
      { name: "Trends", slug: "trends" },
    ],
    published_at: "2026-06-23T09:00:00.000Z",
    featured: { source: pic("genz-slang-hero"), publicId: "blog-seed/genz-slang-hero", alt: "A group of teenagers looking at their phones" },
    inline: { source: pic("genz-slang-inline", 1000, 560), publicId: "blog-seed/genz-slang-inline", alt: "Close-up of a phone showing a chat thread" },
    body: (inline) => `
<p>Gen-Z emoji slang has one core principle: the literal image rarely matters. Meaning comes from <strong>irony, tone, and timing</strong>. If you read these emoji at face value, you'll miss the point entirely.</p>
<h2>The heavy hitters</h2>
<table>
<thead><tr><th>Emoji</th><th>Looks like</th><th>Actually means</th></tr></thead>
<tbody>
<tr><td>🧍</td><td>Person standing</td><td>Awkwardly standing there, unsure, "well then"</td></tr>
<tr><td>🫠</td><td>Melting face</td><td>Overwhelmed, embarrassed, "I can't"</td></tr>
<tr><td>🗿</td><td>Stone face (moai)</td><td>Deadpan, unbothered, "no thoughts"</td></tr>
<tr><td>💀</td><td>Skull</td><td>"I'm dead" — that's hilarious</td></tr>
<tr><td>🥀</td><td>Wilting rose</td><td>Dramatic sadness, often ironic</td></tr>
</tbody>
</table>
<h2>The rules of the game</h2>
<blockquote><p>The more literal an emoji looks, the more likely Gen-Z is using it ironically.</p></blockquote>
<img src="${inline}" alt="Close-up of a phone showing a chat thread" />
<h3>Irony is the default</h3>
<p>A single 🥀 after a mildly unfortunate event isn't real despair — it's theatrical, self-aware sadness. The gap between the dramatic image and the minor event <em>is</em> the joke.</p>
<h3>Placement changes tone</h3>
<p>An emoji at the <strong>end</strong> of a sentence reacts to the whole message. Dropped mid-sentence, it colors just the words before it. Same emoji, different job.</p>
<h2>How to use them without trying too hard</h2>
<ul>
<li>Pick one, not five. Over-stacking reads as trying too hard.</li>
<li>Let the emoji contradict the words a little — that tension is the humor.</li>
<li>When unsure, 💀 is almost always a safe "that's funny."</li>
<li>Don't force new slang; using it a beat too late is its own tell.</li>
</ul>
<h2>FAQ</h2>
<h3>Why does Gen-Z use 🧍 so much?</h3>
<p>It captures a very specific feeling: standing there awkwardly with no idea how to respond. It's the visual version of "…".</p>
<h3>Is 🫠 negative?</h3>
<p>Not really — it's usually endearing overwhelm, like "this is too cute" or "I'm so embarrassed but laughing."</p>
<p>Keep going: decode a single character in <a href="/blog/skull-emoji-meaning">the skull emoji guide</a>, or see what's <a href="/blog/category/trends">trending</a>. Compare two emoji directly with the <a href="/tools/emoji-vs">emoji vs tool</a>.</p>
`,
  },
  {
    slug: "history-of-emoji",
    title: "The Surprising History of Emoji: From 1999 to Now",
    excerpt:
      "Emoji started as 176 tiny pixel icons on a Japanese pager network. Here's how they went from a niche feature to a global language — and who decides what exists.",
    seo_title: "The History of Emoji: From 1999 Pagers to a Global Language",
    seo_description:
      "How did emoji begin? The story from Shigetaka Kurita's original 176 icons in 1999 to Unicode standardization and today's 3,700+ emoji — and who approves new ones.",
    categories: [
      { name: "Culture", slug: "culture" },
      { name: "History", slug: "history" },
    ],
    published_at: "2026-06-30T09:00:00.000Z",
    featured: { source: pic("emoji-history-hero"), publicId: "blog-seed/emoji-history-hero", alt: "A vintage mobile phone next to a modern smartphone" },
    inline: { source: pic("emoji-history-inline", 1000, 560), publicId: "blog-seed/emoji-history-inline", alt: "A grid of early pixel-art icons" },
    body: (inline) => `
<p>The emoji you sent this morning is the descendant of a tiny 12×12 pixel icon designed for a Japanese pager in the late 1990s. The story of how those icons became a <strong>global language</strong> is stranger than you'd expect.</p>
<h2>1999: the original 176</h2>
<p>Working for the Japanese carrier NTT DOCOMO, designer <strong>Shigetaka Kurita</strong> created a set of 176 simple icons to add emotional nuance to short messages. Each was drawn on a 12×12 grid. The word "emoji" itself comes from Japanese: <em>e</em> (picture) + <em>moji</em> (character) — the resemblance to "emotion" is a happy coincidence.</p>
<img src="${inline}" alt="A grid of early pixel-art icons" />
<h2>The messy middle</h2>
<p>For years, emoji were a fragmented mess. Each carrier and platform had its own set, and an emoji sent from one phone might show up as a blank box — or something completely different — on another.</p>
<blockquote><p>Without a shared standard, an emoji was a gamble: you never quite knew what the other person would see.</p></blockquote>
<h2>Enter Unicode</h2>
<p>The turning point was standardization. When emoji were adopted into the <strong>Unicode Standard</strong> starting around 2010, they gained consistent code points across devices. Apple's decision to include an emoji keyboard on the iPhone poured fuel on the fire, and adoption went global.</p>
<h3>Who decides what exists?</h3>
<p>New emoji don't just appear. The <strong>Unicode Consortium</strong> reviews proposals — anyone can submit one — against criteria like expected usage and distinctiveness. Approved characters then ship in an annual release, and each platform draws its own version.</p>
<table>
<thead><tr><th>Year</th><th>Milestone</th></tr></thead>
<tbody>
<tr><td>1999</td><td>Kurita's original 176 emoji</td></tr>
<tr><td>2010</td><td>Emoji enter the Unicode Standard</td></tr>
<tr><td>2011</td><td>iPhone emoji keyboard goes mainstream</td></tr>
<tr><td>2015</td><td>Skin-tone modifiers introduced</td></tr>
<tr><td>2026</td><td>3,700+ emoji and counting</td></tr>
</tbody>
</table>
<h2>Why the same emoji looks different</h2>
<p>Unicode defines the <em>meaning</em>, not the artwork. That's why 😀 on an Android phone looks different from 😀 on an iPhone — each vendor designs its own set from the same specification.</p>
<h2>FAQ</h2>
<h3>Who invented emoji?</h3>
<p>Shigetaka Kurita is widely credited with the first widely used set in 1999, though earlier picture-character experiments existed.</p>
<h3>How many emoji are there?</h3>
<p>Over 3,700 as of 2026, with more added most years through the Unicode release cycle.</p>
<p>More culture reads live under <a href="/blog/category/culture">Culture</a>. Curious what the icons mean today? Start with <a href="/blog/skull-emoji-meaning">the skull emoji</a> or browse <a href="/blog/category/meanings">Meanings</a>.</p>
`,
  },
];

async function seed(): Promise<void> {
  requireEnv();
  const conn = await connectToDatabase();
  if (!conn) throw new Error("DB unavailable (set MONGODB_URI)");
  const col = conn.db.collection(COLLECTION);

  for (const p of POSTS) {
    const [featured_image, inlineUrl] = await Promise.all([
      uploadImage(p.featured.source, p.featured.publicId),
      uploadImage(p.inline.source, p.inline.publicId),
    ]);
    const html = p.body(inlineUrl);
    const content_json = generateJSON(html, editorExtensions);
    const content_html = jsonToSanitizedHtml(content_json);
    const reading_time = estimateReadingTime(content_json);

    const doc = {
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      content_json,
      content_html,
      status: "published" as const,
      featured_image,
      featured_image_alt: p.featured.alt,
      categories: p.categories,
      seo_title: p.seo_title,
      seo_description: p.seo_description,
      author: process.env.BLOG_AUTHOR_NAME || "Emoji Meaning",
      reading_time,
      created_at: p.published_at,
      updated_at: p.published_at,
      published_at: p.published_at,
      seed: true,
    };

    await col.replaceOne({ slug: p.slug }, doc, { upsert: true });
    await delCached(`blog:post:${p.slug}`); // bust the single-post cache like the app's writes do
    const ok = featured_image.includes("res.cloudinary.com");
    console.log(`  ✓ ${p.slug}  (${reading_time} min read, featured image ${ok ? "on Cloudinary" : "⚠ NOT cloudinary"})`);
  }

  await incrCached(LIST_GEN_KEY); // invalidate all /blog list pages so posts appear immediately
  console.log(`\n✓ Seeded ${POSTS.length} published posts.`);
  process.exit(0);
}

async function clear(): Promise<void> {
  requireEnv();
  const conn = await connectToDatabase();
  if (!conn) throw new Error("DB unavailable (set MONGODB_URI)");
  const res = await conn.db.collection(COLLECTION).deleteMany({ seed: true });
  for (const p of POSTS) await delCached(`blog:post:${p.slug}`);
  await incrCached(LIST_GEN_KEY);
  console.log(`✓ Cleared ${res.deletedCount} seeded post(s).`);
  process.exit(0);
}

const run = process.argv.includes("--clear") ? clear : seed;
run().catch((err) => {
  console.error("✗ Seed failed:", err);
  process.exit(1);
});
