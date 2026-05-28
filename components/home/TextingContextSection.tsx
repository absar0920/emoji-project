import { AnimatedSection } from "@/components/MotionWrappers";

const RISK_COLORS: Record<string, string> = {
  "Very High": "bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300",
  "High": "bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300",
  "Medium": "bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300",
  "Low": "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300",
};

const CONTEXT_TABLE = [
  { emoji: "🙂", perceived: "Friendly or polite", actual: "Passive-aggressive, cold", risk: "Very High" },
  { emoji: "😌", perceived: "Sleepy", actual: "Smug contentment, satisfied", risk: "High" },
  { emoji: "💀", perceived: "Death or darkness", actual: "Dying of laughter (Gen Z)", risk: "High" },
  { emoji: "😂", perceived: "Genuine laughter", actual: "Still laughter — but performative-feeling to Gen Z", risk: "Medium" },
  { emoji: "👍", perceived: "Enthusiasm", actual: "Cold dismissal to younger receivers", risk: "High" },
  { emoji: "😑", perceived: "Calm", actual: "Low-grade irritation, done-ness", risk: "Low" },
  { emoji: "🥴", perceived: "Drunk", actual: "Stunned by attraction, total overwhelm", risk: "Medium" },
  { emoji: "🤡", perceived: "A clown character", actual: "\"I am the fool here\" — self-deprecation", risk: "Medium" },
  { emoji: "💅", perceived: "Nail polish", actual: "Unbothered, detached confidence", risk: "Low" },
  { emoji: "🗿", perceived: "Easter Island statue", actual: "Deadpan witness to chaos", risk: "High" },
];

export default function TextingContextSection() {
  return (
    <section className="py-14 bg-neutral-50 dark:bg-slate-800/50">
      <div className="max-w-5xl mx-auto px-4">
        <AnimatedSection>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-primary-dark dark:text-white mb-2">
            Emoji Meanings in Texting — Context Changes Everything
          </h2>
          <p className="text-neutral-500 dark:text-slate-400 mb-8">What you think you&apos;re sending vs. what they actually read</p>
        </AnimatedSection>

        <AnimatedSection>
          <div className="overflow-x-auto rounded-xl border border-neutral-200 dark:border-slate-700 mb-8">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-neutral-100 dark:bg-slate-700 text-left">
                  <th className="px-4 py-3 font-bold text-primary-dark dark:text-white">Emoji</th>
                  <th className="px-4 py-3 font-bold text-primary-dark dark:text-white">Perceived Meaning</th>
                  <th className="px-4 py-3 font-bold text-primary-dark dark:text-white">Actual 2026 Meaning</th>
                  <th className="px-4 py-3 font-bold text-primary-dark dark:text-white">Misread Risk</th>
                </tr>
              </thead>
              <tbody>
                {CONTEXT_TABLE.map((row, i) => (
                  <tr key={row.emoji} className={i % 2 === 0 ? "bg-white dark:bg-slate-800" : "bg-neutral-50 dark:bg-slate-800/50"}>
                    <td className="px-4 py-3 text-2xl">{row.emoji}</td>
                    <td className="px-4 py-3 text-neutral-500 dark:text-slate-400">{row.perceived}</td>
                    <td className="px-4 py-3 font-medium text-primary-dark dark:text-white">{row.actual}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-block text-xs font-medium px-2 py-1 rounded-full ${RISK_COLORS[row.risk]}`}>{row.risk}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-neutral-100 dark:border-slate-700">
              <h3 className="font-bold text-primary-dark dark:text-white mb-2">Frequency Matters</h3>
              <p className="text-sm text-neutral-600 dark:text-slate-300 leading-relaxed">One ❤️ signals care. Three in a row signals enthusiasm. Five or more means either overwhelming emotion or performative excess — and the receiver usually knows which based on the relationship.</p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-neutral-100 dark:border-slate-700">
              <h3 className="font-bold text-primary-dark dark:text-white mb-2">Single-Emoji Replies</h3>
              <p className="text-sm text-neutral-600 dark:text-slate-300 leading-relaxed">A standalone 👍 after something personal reads as dismissive. A solitary 🙂 after a vulnerable message is almost never warm. These one-symbol responses communicate &ldquo;I received this and I am not going further.&rdquo;</p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
