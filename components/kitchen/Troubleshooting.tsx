import { AnimatedSection } from "@/components/MotionWrappers";

const PROBLEMS = [
  { problem: "Emoji Kitchen not showing at all", cause: "Wrong default keyboard or toggle off", fix: "Set Gboard as default; enable in Gboard Preferences" },
  { problem: "Suggestion row missing above keyboard", cause: "Emoji Kitchen disabled in settings", fix: "Gboard → Preferences → Emoji Kitchen → On" },
  { problem: "Stickers appear but won't send", cause: "App doesn't support image stickers", fix: "Use a compatible app (WhatsApp, Telegram, Google Messages)" },
  { problem: "No combos for specific emoji", cause: "Emoji not supported (flags, people)", fix: "Use supported emoji categories only" },
  { problem: "Feature disappeared after update", cause: "Cache reset or version change", fix: "Clear Gboard cache; restart device" },
  { problem: "Works on Android but not iPhone", cause: "iOS Gboard doesn't have native feature", fix: "Use Google Search web tool at google.com" },
  { problem: "Sticker sends blank/broken", cause: "Internet connection issue", fix: "Check connection; combo images load from Google's servers" },
];

export default function Troubleshooting() {
  return (
    <section className="py-14 bg-neutral-50 dark:bg-slate-800/50">
      <div className="max-w-5xl mx-auto px-4">
        <AnimatedSection>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-primary-dark dark:text-white mb-2">
            Emoji Kitchen Troubleshooting
          </h2>
          <p className="text-neutral-500 dark:text-slate-400 mb-8">Fixes for every common problem</p>
        </AnimatedSection>

        <AnimatedSection>
          <div className="overflow-x-auto rounded-xl border border-neutral-200 dark:border-slate-700 mb-8">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-neutral-100 dark:bg-slate-700 text-left">
                  <th className="px-4 py-3 font-bold text-primary-dark dark:text-white">Problem</th>
                  <th className="px-4 py-3 font-bold text-primary-dark dark:text-white">Likely Cause</th>
                  <th className="px-4 py-3 font-bold text-primary-dark dark:text-white">Fix</th>
                </tr>
              </thead>
              <tbody>
                {PROBLEMS.map((row, i) => (
                  <tr key={row.problem} className={i % 2 === 0 ? "bg-white dark:bg-slate-800" : "bg-neutral-50 dark:bg-slate-800/50"}>
                    <td className="px-4 py-3 font-medium text-primary-dark dark:text-white">{row.problem}</td>
                    <td className="px-4 py-3 text-neutral-500 dark:text-slate-400">{row.cause}</td>
                    <td className="px-4 py-3 text-neutral-600 dark:text-slate-300">{row.fix}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <AnimatedSection>
            <div className="bg-amber-50 dark:bg-amber-950/30 border-l-4 border-accent-amber rounded-r-xl p-5">
              <h3 className="font-bold text-primary-dark dark:text-white mb-1">⚠️ Cache Clear Steps</h3>
              <p className="text-sm text-neutral-600 dark:text-slate-300 leading-relaxed">
                If Kitchen was working and stopped: Settings → Apps → Gboard → Storage → Clear Cache, then restart. This removes locally stored sticker data and forces a fresh fetch.
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection>
            <div className="bg-indigo-50 dark:bg-indigo-950/30 border-l-4 border-primary rounded-r-xl p-5">
              <h3 className="font-bold text-primary-dark dark:text-white mb-1">Combos Disappeared After Update?</h3>
              <p className="text-sm text-neutral-600 dark:text-slate-300 leading-relaxed">
                After a major Gboard update, the local cache sometimes resets. The suggestion row may appear sparse for a day or two. Normal usage re-populates the cache as Gboard fetches combinations for the emojis you select.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
