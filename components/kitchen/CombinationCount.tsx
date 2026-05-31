import { AnimatedSection } from "@/components/MotionWrappers";

const COVERAGE = [
  { category: "Face & expression emojis", level: "Extensive", examples: "😂 😭 🥺 🤡 😍", color: "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300" },
  { category: "Animal emojis", level: "Strong", examples: "🐱 🐶 🐸 🦊 🐻", color: "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300" },
  { category: "Food & drink emojis", level: "Moderate", examples: "🍕 🍔 🎂 🍣", color: "bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300" },
  { category: "Nature & weather", level: "Moderate", examples: "🌸 ☀️ 🌈 ⛈️", color: "bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300" },
  { category: "Objects & activities", level: "Selective", examples: "Some work, many don't", color: "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300" },
  { category: "People with skin tones", level: "Not supported", examples: "👨 👩 🧑 + modifiers", color: "bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300" },
  { category: "Flag emojis", level: "Not supported", examples: "🇺🇸 🇬🇧 🇯🇵", color: "bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300" },
  { category: "Symbol/number emojis", level: "Mostly not", examples: "🔢 © 📊", color: "bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300" },
];

export default function CombinationCount() {
  return (
    <section className="py-14 bg-neutral-50 dark:bg-slate-800/50">
      <div className="max-w-5xl mx-auto px-4">
        <AnimatedSection>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-primary-dark dark:text-white mb-2">
            How Many Emoji Kitchen Combinations Exist?
          </h2>
          <p className="text-neutral-500 dark:text-slate-400 mb-8">Over 100,000 hand-crafted pairings — and growing with each Gboard update</p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <AnimatedSection>
            <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-neutral-100 dark:border-slate-700 text-center">
              <span className="text-3xl font-extrabold text-primary block mb-1">100,000+</span>
              <p className="text-sm text-neutral-500 dark:text-slate-400">Unique combinations</p>
            </div>
          </AnimatedSection>
          <AnimatedSection>
            <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-neutral-100 dark:border-slate-700 text-center">
              <span className="text-3xl font-extrabold text-primary block mb-1">😂 😭 🥺</span>
              <p className="text-sm text-neutral-500 dark:text-slate-400">Most paired emojis</p>
            </div>
          </AnimatedSection>
          <AnimatedSection>
            <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-neutral-100 dark:border-slate-700 text-center">
              <span className="text-3xl font-extrabold text-primary block mb-1">Hand-Crafted</span>
              <p className="text-sm text-neutral-500 dark:text-slate-400">Every sticker by Google&apos;s team</p>
            </div>
          </AnimatedSection>
        </div>

        <AnimatedSection>
          <h3 className="text-lg font-bold text-primary-dark dark:text-white mb-4">Emoji Kitchen Coverage by Category</h3>
          <div className="overflow-x-auto rounded-xl border border-neutral-200 dark:border-slate-700 mb-8">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-neutral-100 dark:bg-slate-700 text-left">
                  <th className="px-4 py-3 font-bold text-primary-dark dark:text-white">Category</th>
                  <th className="px-4 py-3 font-bold text-primary-dark dark:text-white">Support Level</th>
                  <th className="px-4 py-3 font-bold text-primary-dark dark:text-white">Examples</th>
                </tr>
              </thead>
              <tbody>
                {COVERAGE.map((row, i) => (
                  <tr key={row.category} className={i % 2 === 0 ? "bg-white dark:bg-slate-800" : "bg-neutral-50 dark:bg-slate-800/50"}>
                    <td className="px-4 py-3 font-medium text-primary-dark dark:text-white">{row.category}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-block text-xs font-medium px-2 py-1 rounded-full ${row.color}`}>{row.level}</span>
                    </td>
                    <td className="px-4 py-3 text-neutral-600 dark:text-slate-300">{row.examples}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border-l-4 border-primary rounded-r-xl p-5">
            <h3 className="font-bold text-primary-dark dark:text-white mb-1">Why Some Emojis Are Excluded</h3>
            <p className="text-sm text-neutral-600 dark:text-slate-300 leading-relaxed">
              Flag emojis use two-character Regional Indicator sequences incompatible with Kitchen&apos;s lookup architecture. Human figures with skin tones were deliberately excluded to avoid culturally insensitive combinations. The 100,000+ figure counts specifically curated pairings — not all mathematical permutations.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
