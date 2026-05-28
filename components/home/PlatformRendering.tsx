import { AnimatedSection } from "@/components/MotionWrappers";

const RENDERING = [
  { emoji: "😬", apple: "Slightly strained — mild cringe", google: "Moderately uncomfortable", samsung: "Most teeth showing — most alarmed", meta: "More alarmed than Apple" },
  { emoji: "🙂", apple: "Small warm smile — reads polite", google: "Fairly warm", samsung: "Slightly more upturned", meta: "Noticeably warmer than Apple" },
  { emoji: "😌", apple: "Closed eyes, soft expression", google: "Close to Apple", samsung: "Slightly different softness", meta: "Close to Apple" },
  { emoji: "😍", apple: "Large heart eyes", google: "Similar to Apple", samsung: "Stars in some versions", meta: "Similar to Apple" },
  { emoji: "👍", apple: "Angled fist, realistic", google: "Flatter graphic design", samsung: "More stylized", meta: "Rounder, more graphic" },
];

export default function PlatformRendering() {
  return (
    <section className="py-14 bg-neutral-50 dark:bg-slate-800/50">
      <div className="max-w-5xl mx-auto px-4">
        <AnimatedSection>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-primary-dark dark:text-white mb-2">
            Apple vs. Android vs. Samsung vs. WhatsApp
          </h2>
          <p className="text-neutral-500 dark:text-slate-400 mb-8">The same emoji can look strikingly different across devices — and visual differences carry emotional weight.</p>
        </AnimatedSection>

        <AnimatedSection>
          <div className="overflow-x-auto rounded-xl border border-neutral-200 dark:border-slate-700 mb-8">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-neutral-100 dark:bg-slate-700 text-left">
                  <th className="px-4 py-3 font-bold text-primary-dark dark:text-white">Emoji</th>
                  <th className="px-4 py-3 font-bold text-primary-dark dark:text-white">Apple (iOS)</th>
                  <th className="px-4 py-3 font-bold text-primary-dark dark:text-white">Google (Android)</th>
                  <th className="px-4 py-3 font-bold text-primary-dark dark:text-white">Samsung</th>
                  <th className="px-4 py-3 font-bold text-primary-dark dark:text-white">WhatsApp / Meta</th>
                </tr>
              </thead>
              <tbody>
                {RENDERING.map((row, i) => (
                  <tr key={row.emoji} className={i % 2 === 0 ? "bg-white dark:bg-slate-800" : "bg-neutral-50 dark:bg-slate-800/50"}>
                    <td className="px-4 py-3 text-2xl">{row.emoji}</td>
                    <td className="px-4 py-3 text-xs text-neutral-600 dark:text-slate-300">{row.apple}</td>
                    <td className="px-4 py-3 text-xs text-neutral-600 dark:text-slate-300">{row.google}</td>
                    <td className="px-4 py-3 text-xs text-neutral-600 dark:text-slate-300">{row.samsung}</td>
                    <td className="px-4 py-3 text-xs text-neutral-600 dark:text-slate-300">{row.meta}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <div className="bg-violet-50 dark:bg-violet-950/30 border-l-4 border-accent-violet rounded-r-xl p-5">
            <h3 className="font-bold text-primary-dark dark:text-white mb-1">💡 Practical Guidance</h3>
            <p className="text-sm text-neutral-600 dark:text-slate-300 leading-relaxed">If emotional precision matters in an important conversation, be aware that subtle face emojis may render differently on the receiver&apos;s device. When in doubt, use words alongside the symbol.</p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
