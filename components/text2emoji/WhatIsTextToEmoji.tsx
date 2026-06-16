import { KSection } from "@/components/kitchen/Section";

const TOP = [
  "At its core, every emoji is a Unicode character — a standardized code point assigned by the Unicode Consortium. The 🔥 Fire emoji lives at code point U+1F525. When a text-to-emoji converter processes your words, it runs a matching algorithm — looking up each word or letter against a database of emoji and their associated labels, keywords, and shortcodes.",
];

const TYPES = [
  { dt: "Word / sentence replacement", dd: "A tool or platform scans your text and swaps recognizable words for matching emoji. Type “I love pizza” and the converter returns “I ❤️ 🍕.” This is how AI-powered emoji adders and Gboard's emoji suggestion row work — they predict which emoji fits each word contextually." },
  { dt: "Letter-to-emoji conversion", dd: "Each individual letter is replaced by an emoji equivalent. “A” becomes 🇦 or 🅰️, “B” becomes 🅱️, and so on across the full alphabet. This style is popular for stylized bios, usernames, and creative posts." },
];

const BOTTOM = [
  "Platforms handle this differently. Discord automatically converts shortcodes like :smile: into 😊 the moment you send a message — no third-party tool needed. Apple's iMessage scans your text as you type and displays emoji suggestions above the keyboard. Gboard on Android offers a dedicated emoji key and predictive row. Web-based converters let you paste any sentence and generate an emoji-substituted version instantly.",
  "Use cases span from casual fun (creative texts, TikTok and Instagram bios capped at 80–150 characters where emoji convey meaning densely) to practical applications (encoded messaging using emoji as cipher characters, accessibility tools that represent concepts visually, and developer workflows that detect or strip emoji from user-generated content).",
];

export default function WhatIsTextToEmoji() {
  return (
    <KSection
      kicker="Section 01"
      title="What Is Text to Emoji and How Does It Work"
      dek="Converting written words, letters, or sentences into emoji characters or sequences."
    >
      <div className="fg-pull fg-pull--sm mb-8">
        <p>Text to emoji is the process of converting written words, letters, or sentences into corresponding emoji characters — replacing words with matching symbols (“fire” → 🔥), converting letters into emoji letters (“A” → 🇦), or using shortcodes that trigger emoji on platforms like Discord.</p>
      </div>

      <div className="fg-prose max-w-2xl mb-8">
        {TOP.map((p, i) => <p key={i}>{p}</p>)}
      </div>

      <p className="fg-label mb-3">Two types of conversion</p>
      <dl className="fg-deflist border-t border-[var(--line)] mb-8">
        {TYPES.map((t) => (
          <div key={t.dt}><dt>{t.dt}</dt><dd>{t.dd}</dd></div>
        ))}
      </dl>

      <div className="fg-prose max-w-2xl mb-8">
        {BOTTOM.map((p, i) => <p key={i}>{p}</p>)}
      </div>

      <div className="fg-pull fg-pull--sm">
        <span className="fg-kicker">Unicode 17.0</span>
        <p>Approved in September 2025, Emoji 17.0 added 163 new emojis — bringing the total to roughly 3,950+ standard characters, the largest single addition in years.</p>
      </div>
    </KSection>
  );
}
