import { AnimatedSection } from "@/components/MotionWrappers";

const COMBOS = [
  { combo: "🥺👉👈", meaning: "Maximum vulnerability plea — shy, irresistible ask", origin: "Twitter/X ~2019" },
  { combo: "💀😭", meaning: "Dying of laughter while completely overwhelmed", origin: "Gen Z internet, TikTok 2021–2022" },
  { combo: "✨💕", meaning: "Sparkling warm affection — magical love energy", origin: "Instagram creator culture, 2020+" },
  { combo: "💅✨", meaning: "\"I am unbothered and I look great\"", origin: "Instagram and TikTok confidence culture" },
  { combo: "😭🙏", meaning: "Desperate gratitude or overwhelmed appreciation", origin: "Global WhatsApp and iMessage" },
  { combo: "💀🙏", meaning: "\"This killed me and now I'm praying\"", origin: "Discord and TikTok, 2022–2023" },
  { combo: "🙈❤️", meaning: "Bashful love — \"I shouldn't say this but here it is\"", origin: "WhatsApp, iMessage flirting" },
  { combo: "🤌💯", meaning: "Absolutely perfect — no notes, flawless", origin: "TikTok international spread, 2022–2024" },
  { combo: "🫠😭", meaning: "Complete melting overwhelm — total dissolution", origin: "Discord and Twitter/X, 2022+" },
  { combo: "😮‍💨✨", meaning: "Exhale of relief — \"we made it\"", origin: "TikTok, 2023+" },
];

export default function EmojiCombinations() {
  return (
    <section className="py-14 bg-white dark:bg-slate-900">
      <div className="max-w-5xl mx-auto px-4">
        <AnimatedSection>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-primary-dark dark:text-white mb-2">
            Emoji Combination Meanings
          </h2>
          <p className="text-neutral-500 dark:text-slate-400 mb-8">Combinations generate meanings that neither symbol carries alone</p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          {COMBOS.map((c) => (
            <AnimatedSection key={c.combo}>
              <div className="bg-neutral-50 dark:bg-slate-800 rounded-xl p-4 border border-neutral-100 dark:border-slate-700">
                <span className="text-2xl block mb-2">{c.combo}</span>
                <p className="text-sm font-medium text-primary-dark dark:text-white mb-1">{c.meaning}</p>
                <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 dark:bg-indigo-500/20 text-primary">{c.origin}</span>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <AnimatedSection>
            <div className="bg-violet-50 dark:bg-violet-950/30 border-l-4 border-accent-violet rounded-r-xl p-5">
              <h3 className="font-bold text-primary-dark dark:text-white mb-1">What Does 👉👈 Mean?</h3>
              <p className="text-sm text-neutral-600 dark:text-slate-300 leading-relaxed">Two index fingers pointing toward each other — visual shorthand for shyness, nervous hesitation, or gentle pleading. Pairs almost automatically with 🥺 for amplified effect.</p>
            </div>
          </AnimatedSection>
          <AnimatedSection>
            <div className="bg-violet-50 dark:bg-violet-950/30 border-l-4 border-accent-violet rounded-r-xl p-5">
              <h3 className="font-bold text-primary-dark dark:text-white mb-1">What Does 💀😭 Mean?</h3>
              <p className="text-sm text-neutral-600 dark:text-slate-300 leading-relaxed">Extreme emotional overwhelm — usually laughter so intense the sender describes it as fatal. Something simultaneously hilarious and completely devastating in the best way.</p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
