import Link from "next/link";
import { KSection } from "@/components/kitchen/Section";

const MEANINGS: [string, string, string][] = [
  ["🥰", "Smiling Face with Hearts — from a girl", "Strong positive affection. In a text from a girl to a guy, a clear signal of warmth, fondness, or romantic interest — not just friendliness. The three floating hearts elevate it above a plain smile. Respond: match the energy — 😊 or ❤️ keeps it warm without being too intense."],
  ["❤️", "Red Heart — from a guy to a girl", "Signals genuine affection or care. Unlike the casual pink heart 🩷, ❤️ from a guy tends to carry deliberate emotional weight — rarely sent without meaning something. Respond: ❤️ or 🥰 is reciprocal; a simple “❤️” back matches the sentiment."],
  ["🔥", "Fire — from a guy", "Almost always a compliment tied to attraction or impressive performance. “You look 🔥” is attraction signaling; in gaming or achievement contexts it's pure hype with no romantic undertone. Respond: 😏 or 💯 to a compliment; “🙏🔥” is a humble-but-pleased reply."],
  ["🙈", "See-No-Evil Monkey — from a girl", "Playful embarrassment or a flirtatious signal. After a bold statement or confession, it says “I can't believe I just said that” — cute and intentional. Often a green light in flirty conversations. Respond: 😂 keeps it light; “Aw, don't be shy 😄” invites more."],
  ["😭", "Loudly Crying Face", "In Gen Z and millennial texting it almost never means actual sadness — it means something is so funny, beautiful, or overwhelming that a regular smile doesn't cover it. “That's so wholesome 😭” is peak usage. Respond: mirror it — 😭💀 if funny, 😭 if mutual appreciation."],
  ["😏", "Smirking Face", "Confidence, subtle flirtation, or a knowing joke. From a girl it's cheeky rather than outright flirty; from a guy it's almost always suggestive or cocky. Context is everything. Respond: 😏 back if comfortable, 😂 deflects without rejecting."],
  ["💀", "Skull", "Modern slang for “I'm dead” — something so funny you figuratively died. “That meme 💀” is higher praise than “lol.” It's become the culturally embedded peak-humor reaction emoji. Respond: 💀 right back — a mutual “this is hilarious.”"],
  ["🫶", "Heart Hands", "Added in Unicode 14.0, a warm, non-romantic appreciation emoji: “I love you in a wholesome way” or “I support you.” Popular in fan communities and friend groups. Less intense than ❤️ but more heartfelt than 👍. Respond: 🫶 back, or 🥰 for warmer."],
];

export default function EmojiMeaning() {
  return (
    <KSection
      kicker="Section 08"
      title="Emoji Meaning in Text — What Common Emoji Really Mean"
      dek="Meaning shifts with relationship, sender, and platform. Here's the personal-texting read."
    >
      <div className="border-t border-[var(--line)]">
        {MEANINGS.map(([emoji, name, meaning]) => (
          <div key={name} className="flex gap-4 sm:gap-6 py-4 border-b border-[var(--line)]">
            <span className="text-3xl shrink-0 w-10 leading-snug">{emoji}</span>
            <div className="min-w-0">
              <h3 className="font-read font-semibold t-ink leading-snug">{name}</h3>
              <p className="t-body leading-relaxed mt-1 max-w-2xl">{meaning}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="fg-pull fg-pull--sm mt-8 mb-8">
        <span className="fg-kicker">Responding to Funny Texts</span>
        <p>The classic answers are 💀 (peak funny), 😭 (overwhelmingly good/funny), 😂 (standard laugh), and 🤣 (rolling). In 2026, 💀 and 😭 have overtaken 😂 as the default high-intensity humor reactions among Gen Z.</p>
      </div>

      <p className="t-body font-read max-w-2xl">
        For the deeper meaning of any single emoji, browse the full{" "}
        <Link href="/" className="fg-link">emoji meanings library</Link>.
      </p>
    </KSection>
  );
}
