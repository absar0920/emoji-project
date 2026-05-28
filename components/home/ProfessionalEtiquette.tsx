import { AnimatedSection } from "@/components/MotionWrappers";

const ETIQUETTE = [
  { context: "Formal email to client", safe: "None", caution: "✅ 📌 for clarity only", avoid: "All face emojis, all hearts" },
  { context: "Internal Slack channel", safe: "✅ 👍 📌 💡 🎉", caution: "😊 in established teams", avoid: "😏 💋 any heart" },
  { context: "LinkedIn message", safe: "None", caution: "✅ 💡 📊", avoid: "Hearts, face emojis" },
  { context: "WhatsApp with colleague", safe: "👍 ✅ 🙏", caution: "😊 in close team contexts", avoid: "😍 ❤️ 💋" },
  { context: "Job application", safe: "None", caution: "None", avoid: "Everything" },
];

export default function ProfessionalEtiquette() {
  return (
    <section className="py-14 bg-white dark:bg-slate-900">
      <div className="max-w-5xl mx-auto px-4">
        <AnimatedSection>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-primary-dark dark:text-white mb-2">
            Professional Emoji Etiquette — Usage at Work in 2026
          </h2>
          <p className="text-neutral-500 dark:text-slate-400 mb-8">What&apos;s safe, what&apos;s risky, and what to never send</p>
        </AnimatedSection>

        <AnimatedSection>
          <div className="overflow-x-auto rounded-xl border border-neutral-200 dark:border-slate-700 mb-8">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-neutral-100 dark:bg-slate-700 text-left">
                  <th className="px-4 py-3 font-bold text-primary-dark dark:text-white">Context</th>
                  <th className="px-4 py-3 font-bold text-primary-dark dark:text-white"><span className="text-emerald-600">Safe</span></th>
                  <th className="px-4 py-3 font-bold text-primary-dark dark:text-white"><span className="text-amber-600">Caution</span></th>
                  <th className="px-4 py-3 font-bold text-primary-dark dark:text-white"><span className="text-red-600">Avoid</span></th>
                </tr>
              </thead>
              <tbody>
                {ETIQUETTE.map((row, i) => (
                  <tr key={row.context} className={i % 2 === 0 ? "bg-white dark:bg-slate-800" : "bg-neutral-50 dark:bg-slate-800/50"}>
                    <td className="px-4 py-3 font-medium text-primary-dark dark:text-white">{row.context}</td>
                    <td className="px-4 py-3 text-neutral-600 dark:text-slate-300">{row.safe}</td>
                    <td className="px-4 py-3 text-neutral-600 dark:text-slate-300">{row.caution}</td>
                    <td className="px-4 py-3 text-neutral-600 dark:text-slate-300">{row.avoid}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <div className="bg-amber-50 dark:bg-amber-950/30 border-l-4 border-accent-amber rounded-r-xl p-5">
            <h3 className="font-bold text-primary-dark dark:text-white mb-1">⚠️ The Generational Reading Problem at Work</h3>
            <p className="text-sm text-neutral-600 dark:text-slate-300 leading-relaxed">A manager sending 😊 at the end of a correction intends warmth. A younger recipient may read it as passive-aggression. The safest rule: use symbols that behave like punctuation — ✅ 📌 ✔️ 💡 — rather than expression emojis.</p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
