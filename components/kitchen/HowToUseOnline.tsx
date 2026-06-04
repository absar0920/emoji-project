import { AnimatedSection } from "@/components/MotionWrappers";

export default function HowToUseOnline() {
  return (
    <section className="py-14">
      <div className="max-w-5xl mx-auto px-4">
        <div className="rounded-2xl border border-neutral-200/70 dark:border-slate-700/50 bg-neutral-50 dark:bg-slate-800/50 p-6 sm:p-8">
        <AnimatedSection>
          <p className="eyebrow mb-3 flex items-center gap-2"><span className="inline-block w-6 h-px bg-primary" aria-hidden="true" />Browser</p>
          <h2 className="font-display text-3xl sm:text-4xl text-primary-dark dark:text-white leading-[1.1] mb-2">
            Emoji Kitchen Online — Use It from Any Browser
          </h2>
          <p className="text-neutral-500 dark:text-slate-400 mt-3 mb-8">No app installation or keyboard setup required</p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <AnimatedSection>
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-neutral-200/80 dark:border-slate-700 shadow-sm card-lift hover:shadow-md hover:border-primary/40">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">🔍</span>
                <h3 className="font-bold text-primary-dark dark:text-white">Google Search</h3>
              </div>
              <p className="text-sm text-neutral-600 dark:text-slate-400 leading-relaxed">
                Search &ldquo;emoji kitchen&rdquo; in any browser. The interactive tool appears at the top of results — connected directly to Google&apos;s full library. No sign-in or account required.
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection>
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-neutral-200/80 dark:border-slate-700 shadow-sm card-lift hover:shadow-md hover:border-primary/40">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">🍳</span>
                <h3 className="font-bold text-primary-dark dark:text-white">This Tool</h3>
              </div>
              <p className="text-sm text-neutral-600 dark:text-slate-400 leading-relaxed">
                Use the interactive Emoji Kitchen tool at the top of this page to combine any two emojis. Results are powered by Google&apos;s sticker library with the ability to copy or download.
              </p>
            </div>
          </AnimatedSection>
        </div>

        <AnimatedSection>
          <div className="bg-violet-50 dark:bg-violet-950/30 border-l-4 border-accent-violet rounded-r-xl p-5">
            <h3 className="font-bold text-primary-dark dark:text-white mb-1">💡 Works Everywhere</h3>
            <p className="text-sm text-neutral-600 dark:text-slate-300 leading-relaxed">
              Emoji Kitchen is accessible from any browser — desktop, laptop, Mac, or phone — without installing any app or enabling any keyboard. The Google Search tool is the fastest, most complete way to access the full 100,000+ combination library from any device.
            </p>
          </div>
        </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
