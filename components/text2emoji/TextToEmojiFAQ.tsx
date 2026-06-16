import { KSection } from "@/components/kitchen/Section";

const FAQS = [
  { q: "What is text to emoji?", a: "Text to emoji is the process of converting written words, letters, or sentences into emoji characters or sequences. This includes replacing words with matching symbols (“heart” → ❤️), converting letters into emoji letters like regional indicators (A → 🇦), or using platform shortcodes like :fire: that auto-render as 🔥. Tools range from simple web converters to AI-powered generators that semantically match your full sentence to contextually relevant emoji." },
  { q: "How do I convert text to emoji online?", a: "Visit a converter like LingoJam or Emojify.it, paste your text into the input box, hit convert, and the tool replaces recognized words with matching emoji. Copy the output and paste it anywhere — Instagram bio, WhatsApp, Discord, or any text field. For context-aware conversion beyond keyword matching, search for a 2026-era “AI text to emoji generator” that uses language models." },
  { q: "How do I turn off text to emoji on Discord?", a: "Go to User Settings (⚙️) → Text & Images → turn off “Automatically convert emoticons in your messages to emoji.” On mobile (Android or iPhone), tap your profile picture (bottom-right) → Settings → Text & Images → toggle off Convert Emoticons. Once disabled, shortcodes like :smile: are sent as plain text rather than converting on send." },
  { q: "What are text to emoji letters?", a: "Emoji characters that visually represent individual letters. The most common type uses Unicode Regional Indicator Symbols — 🇦 through 🇿 — originally for country flags but widely used as decorative letters. There are also enclosed-alpha variants like Ⓐ–Ⓩ and filled-circle styles. Paste letters with a space between them to prevent two-letter combinations from rendering as country flags." },
  { q: "How do I remove emoji from text in Python?", a: "Use the emoji library: install with pip install emoji, then call emoji.replace_emoji(text, replace='') to strip all emoji from any string. Alternatively, use a regex approach with re.compile() targeting Unicode emoji ranges (U+1F600–U+1F64F and related blocks) and .sub('', text). The library method is more reliable for edge cases like ZWJ sequences, skin-tone modifiers, and flag combinations." },
  { q: "How do I respond to a text with an emoji on iPhone?", a: "In iMessage, long-press the message bubble for about half a second. A row of six Tapback options appears — ❤️ 👍 👎 😂 ‼️ ❓ — tap one to place it as a reaction badge. On iOS 17 and later, tap the “+” after the Tapback row to open the full emoji picker and choose any emoji as a custom reaction. Your reaction shows as a small overlay visible to everyone in the conversation." },
  { q: "What does the face-with-hearts emoji mean in a text from a girl?", a: "The 🥰 (Smiling Face with Three Hearts) typically signals strong positive affection — warmth, fondness, or romantic interest, depending on context. It goes beyond casual friendliness; the three orbiting hearts make it one of the higher-intensity positive emoji. In a platonic context it communicates genuine appreciation. Respond by matching the energy with ❤️, 😊, or 🥰." },
  { q: "What is the longest text to speech emoji?", a: "The longest TTS strings are built from compound emoji with multi-word Unicode descriptions. The family emoji 👨‍👩‍👧‍👦 is read as “family man woman girl boy” — four words from one emoji. Flag emoji read as full country names. In Roblox and Xbox TTS, players chain 30–50+ such emoji to create readings lasting several minutes; the viral trend targets emoji like 🏳️‍🌈, 🧑‍💻, and multi-flag sequences for maximum length." },
];

export default function TextToEmojiFAQ() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({ "@type": "Question", name: faq.q, acceptedAnswer: { "@type": "Answer", text: faq.a } })),
  };

  return (
    <KSection kicker="Section 10 · FAQ" title="Frequently Asked Questions" dek="The questions people ask most about text to emoji.">
      <div className="fg-list">
        {FAQS.map((faq, i) => (
          <details key={i} className="fg-detail border-b border-[var(--line)]">
            <summary className="flex items-baseline gap-3 sm:gap-4 py-3.5 cursor-pointer">
              <span className="mono t-muted text-[0.62rem] w-6 shrink-0 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              <span className="font-read t-ink flex-1">{faq.q}</span>
              <svg className="fg-chev w-4 h-4 t-muted shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <p className="t-body leading-relaxed pb-4 max-w-2xl sm:pl-[2.6rem]">{faq.a}</p>
          </details>
        ))}
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </KSection>
  );
}
