import { AnimatedSection } from "@/components/MotionWrappers";

const TOP_EMOJIS = [
  { rank: 1, emoji: "😂", platform: "WhatsApp, Facebook", demo: "Millennials, Gen X, Boomers" },
  { rank: 2, emoji: "❤️", platform: "All platforms", demo: "Universal" },
  { rank: 3, emoji: "🤣", platform: "WhatsApp, Messenger", demo: "Millennials" },
  { rank: 4, emoji: "👍", platform: "WhatsApp, iMessage", demo: "Universal" },
  { rank: 5, emoji: "😭", platform: "TikTok, Twitter/X", demo: "Gen Z (positive overwhelm)" },
  { rank: 6, emoji: "🙏", platform: "WhatsApp, iMessage", demo: "Universal" },
  { rank: 7, emoji: "😘", platform: "WhatsApp, iMessage", demo: "Universal (romantic)" },
  { rank: 8, emoji: "🥰", platform: "Instagram, iMessage", demo: "Millennials, Gen Z" },
  { rank: 9, emoji: "😍", platform: "Instagram, TikTok", demo: "Universal" },
  { rank: 10, emoji: "😊", platform: "WhatsApp, iMessage", demo: "Universal" },
  { rank: 11, emoji: "🔥", platform: "Instagram, Twitter/X", demo: "Universal" },
  { rank: 12, emoji: "💀", platform: "TikTok, Discord", demo: "Gen Z" },
  { rank: 13, emoji: "✨", platform: "Instagram, TikTok", demo: "Millennials, Gen Z" },
  { rank: 14, emoji: "💕", platform: "WhatsApp, iMessage", demo: "Universal" },
  { rank: 15, emoji: "🥺", platform: "TikTok, Instagram", demo: "Gen Z, younger Millennials" },
];

export default function MostUsedGlobally() {
  return (
    <section className="py-14 bg-white dark:bg-slate-900">
      <div className="max-w-5xl mx-auto px-4">
        <AnimatedSection>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-primary-dark dark:text-white mb-2">
            Most Used Emojis Globally in 2026
          </h2>
          <p className="text-neutral-500 dark:text-slate-400 mb-8">Ranked by send volume across all major platforms</p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
          {TOP_EMOJIS.map((item) => (
            <AnimatedSection key={item.rank}>
              <div className="flex items-center gap-4 bg-neutral-50 dark:bg-slate-800 rounded-xl p-4 border border-neutral-100 dark:border-slate-700">
                <span className="text-lg font-extrabold text-neutral-300 dark:text-slate-600 w-8 text-right">#{item.rank}</span>
                <span className="text-3xl">{item.emoji}</span>
                <div className="min-w-0">
                  <p className="text-xs text-primary font-medium">{item.platform}</p>
                  <p className="text-xs text-neutral-500 dark:text-slate-400">{item.demo}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection>
          <div className="bg-violet-50 dark:bg-violet-950/30 border-l-4 border-accent-violet rounded-r-xl p-5">
            <h3 className="font-bold text-primary-dark dark:text-white mb-1">💡 The Defining Generational Shift</h3>
            <p className="text-sm text-neutral-600 dark:text-slate-300 leading-relaxed">
              😂 remains the most-sent emoji globally, but Gen Z shifted toward 💀 as the authentic laughter signal around 2022. The reason was specific: 😂 had started to feel performative — something sent to <em>show</em> you laughed rather than express it genuinely. 💀 replaced it because it felt viscerally honest.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
