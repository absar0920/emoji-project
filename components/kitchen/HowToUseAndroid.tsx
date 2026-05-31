import { AnimatedSection } from "@/components/MotionWrappers";

const STEPS = [
  { step: 1, text: "Open the Google Play Store and confirm Gboard is installed. The minimum version required is 6.5+; update if you are below that." },
  { step: 2, text: "Go to device Settings → General Management → Keyboard list and default." },
  { step: 3, text: "Set Gboard as the default keyboard." },
  { step: 4, text: "Open Gboard Settings (long-press the comma key → tap the settings gear, or Settings → Gboard)." },
  { step: 5, text: "Tap Preferences → locate the Emoji Kitchen toggle → switch it on." },
  { step: 6, text: "Open any messaging app, tap the emoji icon, select any supported emoji — the Kitchen suggestion row appears above the keyboard." },
];

export default function HowToUseAndroid() {
  return (
    <section className="py-14 bg-neutral-50 dark:bg-slate-800/50">
      <div className="max-w-5xl mx-auto px-4">
        <AnimatedSection>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-primary-dark dark:text-white mb-2">
            How to Use Emoji Kitchen on Android (Gboard)
          </h2>
          <p className="text-neutral-500 dark:text-slate-400 mb-8">Emoji Kitchen is natively built into Gboard — no separate download required</p>
        </AnimatedSection>

        <div className="space-y-3 mb-8">
          {STEPS.map((s) => (
            <AnimatedSection key={s.step}>
              <div className="flex gap-4 bg-white dark:bg-slate-800 rounded-xl p-4 border border-neutral-100 dark:border-slate-700">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold text-sm shrink-0">{s.step}</span>
                <p className="text-sm text-neutral-600 dark:text-slate-300 leading-relaxed">{s.text}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection>
          <div className="bg-amber-50 dark:bg-amber-950/30 border-l-4 border-accent-amber rounded-r-xl p-5">
            <h3 className="font-bold text-primary-dark dark:text-white mb-1">⚠️ Samsung Galaxy Users</h3>
            <p className="text-sm text-neutral-600 dark:text-slate-300 leading-relaxed">
              Samsung devices use Samsung Keyboard by default, which does not include Emoji Kitchen. You must switch to Gboard in Settings → General Management → Keyboard list. On Xiaomi devices running MIUI, Gboard may need full permissions under Settings → Manage Apps → Gboard → Permissions.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
