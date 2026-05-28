import { AnimatedSection } from "@/components/MotionWrappers";

const SLANG = [
  { emoji: "💀", official: "Skull", slang: "Dying of laughter", origin: "Gen Z internet, ~2021" },
  { emoji: "🚩", official: "Triangular Flag", slang: "Red flag — warning sign", origin: "Twitter/X dating culture, 2021" },
  { emoji: "🧢", official: "Billed Cap", slang: "\"Cap\" = lie; \"no cap\" = no lie", origin: "AAVE, spread through rap and TikTok" },
  { emoji: "💅", official: "Nail Polish", slang: "Unbothered, confident, glamorous dismissal", origin: "Drag and LGBTQ+ culture" },
  { emoji: "🌽", official: "Ear of Corn", slang: "Adult content (censorship workaround)", origin: "Platform content moderation bypass" },
  { emoji: "🐍", official: "Snake", slang: "Two-faced, untrustworthy person", origin: "Taylor Swift fan culture 2016" },
  { emoji: "🤡", official: "Clown", slang: "\"I am the fool in this situation\"", origin: "Reddit/Twitter self-aware culture" },
  { emoji: "🫖", official: "Teapot", slang: "\"Tea\" = gossip; \"spill the tea\"", origin: "Black and LGBTQ+ internet culture" },
  { emoji: "🥵", official: "Hot Face", slang: "That person is physically attractive", origin: "TikTok thirst culture" },
  { emoji: "🫀", official: "Anatomical Heart", slang: "Deep visceral love — more intense than ❤️", origin: "TikTok emotional expression, 2022+" },
];

export default function InternetSlangEmojis() {
  return (
    <section className="py-14 bg-neutral-50 dark:bg-slate-800/50">
      <div className="max-w-5xl mx-auto px-4">
        <AnimatedSection>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-primary-dark dark:text-white mb-2">
            Internet Slang & Emoji Meanings
          </h2>
          <p className="text-neutral-500 dark:text-slate-400 mb-8">Cultural meanings that internet slang created — not in any official standard</p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          {SLANG.map((item) => (
            <AnimatedSection key={item.emoji}>
              <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-neutral-100 dark:border-slate-700">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{item.emoji}</span>
                  <div>
                    <span className="text-xs text-neutral-400 dark:text-slate-500 block">{item.official}</span>
                    <span className="font-bold text-sm text-primary-dark dark:text-white">{item.slang}</span>
                  </div>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 dark:bg-indigo-500/20 text-primary">{item.origin}</span>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <AnimatedSection>
            <div className="bg-amber-50 dark:bg-amber-950/30 border-l-4 border-accent-amber rounded-r-xl p-5">
              <h3 className="font-bold text-primary-dark dark:text-white mb-1">What Does 🚩 Mean in Texting?</h3>
              <p className="text-sm text-neutral-600 dark:text-slate-300 leading-relaxed">A warning sign — a character flaw, suspicious behavior, or concerning pattern. Became viral shorthand for relationship red flags on Twitter/X in 2021. Sending 🚩🚩🚩 communicates multiple serious warning signs.</p>
            </div>
          </AnimatedSection>
          <AnimatedSection>
            <div className="bg-amber-50 dark:bg-amber-950/30 border-l-4 border-accent-amber rounded-r-xl p-5">
              <h3 className="font-bold text-primary-dark dark:text-white mb-1">What Does 💅 Mean in Texting?</h3>
              <p className="text-sm text-neutral-600 dark:text-slate-300 leading-relaxed">Unbothered confidence — &ldquo;this does not affect me and I look great while not being affected.&rdquo; Originated in LGBTQ+ and drag culture, spread through TikTok and Instagram.</p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
