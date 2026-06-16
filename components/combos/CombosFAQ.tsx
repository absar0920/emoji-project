import { KSection } from "@/components/kitchen/Section";

const FAQS = [
  { q: "What are emoji combos?", a: "Emoji combos are sequences of two or more emojis used together to communicate a layered meaning, mood, or aesthetic that a single emoji cannot carry alone. They function as visual shorthand across social media, messaging apps, bios, and captions. A combo like 🌙✨🫧 communicates “dreamy, ethereal, soft” in three characters — something that would take several words to describe in text." },
  { q: "How do I make my own emoji combos?", a: "Start with the emotion or vibe you want to express, not just a topic. Choose one anchor emoji that carries the core meaning, then add one to three supporting emojis that build context. Keep the total between two and five — longer strings lose focus. Test the combo on the actual platform, since some emojis render differently on iOS versus Android, and pay attention to color harmony; combos where the dominant colors flow naturally feel more cohesive and intentional than random selections." },
  { q: "What are the most popular emoji combos in 2026?", a: "They span several categories. For bios: 🌙✨🫧 (dreamy), 🎀🌸💗 (coquette), and 🤍🌿☁️ (clean minimal). For captions: 🌊☀️🍉 (summer), 📖🕯️🍂 (dark academia), and 🔥💅🖤 (baddie). For funny reactions: 💀✋ (dying laughing), 🫠☕🔁 (melting without coffee), and 🙂🔪 (I'm fine)." },
  { q: "What are the best emoji combos for an Instagram bio?", a: "The best Instagram bio combos are short (two to three emojis), visually cohesive, and reflective of your aesthetic. Top performers include 🌸✨🎀 for a soft feminine aesthetic, 📍🌍✈️ for a travel-focused bio, 🎵🎧🌙 for a music and night-owl persona, and 📸🌿☕ for a photography and nature identity." },
  { q: "What is Emoji Kitchen and how do I use it?", a: "Emoji Kitchen is a Google feature built into Gboard that combines two standard Unicode emojis into a single original hybrid illustration. To use it, open Gboard on Android or access it via Google Search on any device, then tap one emoji and tap another — Google generates a merged artwork combining visual elements from both." },
  { q: "Do emoji combos look the same on iPhone and Android?", a: "No — and this is one of the most important things to know before finalizing a combo for a public bio or post. Apple and Google design their emoji sets independently, so the same Unicode character can look noticeably different between iOS and Android. Always test a combo on both platforms if your audience uses both." },
  { q: "What are emoji combos with meaning and where do they come from?", a: "They are sequences that have developed specific cultural interpretations through repeated use across social media, meme culture, and online communities. They are not officially defined — meaning evolves organically through use. For example, 💀✋ emerged from Gen Z replacing 😂 with 💀 to signal something is fatally funny, then adding ✋ as an intensifier." },
  { q: "How many emojis should be in a combo?", a: "Two to three is the sweet spot for most use cases. A two-emoji combo is punchy, immediate, and versatile. Three emojis allow more layered meaning while still reading as a single coherent unit. Four can work well when there's a clear narrative or rhythmic flow. Five is the maximum — more than five in a row rarely reads as intentional." },
];

export default function CombosFAQ() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({ "@type": "Question", name: faq.q, acceptedAnswer: { "@type": "Answer", text: faq.a } })),
  };

  return (
    <KSection kicker="Section 07 · FAQ" title="Frequently Asked Questions" dek="The questions people ask most about emoji combos.">
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
