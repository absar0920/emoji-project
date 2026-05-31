import { AnimatedSection } from "@/components/MotionWrappers";

const STEPS = [
  { step: 1, text: "Open Safari or Chrome on your iPhone." },
  { step: 2, text: "Go to google.com and search \"emoji kitchen.\"" },
  { step: 3, text: "Tap the interactive tool that appears in search results." },
  { step: 4, text: "Tap the first emoji you want to combine." },
  { step: 5, text: "Tap the second emoji from the suggested pairing options." },
  { step: 6, text: "The sticker appears — long-press it → Save Image to add it to Camera Roll." },
  { step: 7, text: "Open iMessage, WhatsApp, or your preferred app." },
  { step: 8, text: "Attach the saved image from your photo library as you would any photo." },
];

export default function HowToUseIPhone() {
  return (
    <section className="py-14 bg-white dark:bg-slate-900">
      <div className="max-w-5xl mx-auto px-4">
        <AnimatedSection>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-primary-dark dark:text-white mb-2">
            How to Use Emoji Kitchen on iPhone (iOS)
          </h2>
          <p className="text-neutral-500 dark:text-slate-400 mb-8">Emoji Kitchen is not natively available on iPhone — here&apos;s the workaround</p>
        </AnimatedSection>

        <AnimatedSection>
          <div className="bg-amber-50 dark:bg-amber-950/30 border-l-4 border-accent-amber rounded-r-xl p-5 mb-8">
            <h3 className="font-bold text-primary-dark dark:text-white mb-1">⚠️ Why It Doesn&apos;t Work Natively</h3>
            <p className="text-sm text-neutral-600 dark:text-slate-300 leading-relaxed">
              Gboard for iOS exists as a third-party keyboard, but the iOS version does not include Emoji Kitchen. Apple&apos;s sandboxing restrictions prevent the server-side image fetching that the feature relies on. Apple&apos;s own keyboard has no equivalent feature.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <h3 className="text-lg font-bold text-primary-dark dark:text-white mb-4">Step-by-Step via Google Search</h3>
        </AnimatedSection>

        <div className="space-y-3 mb-8">
          {STEPS.map((s) => (
            <AnimatedSection key={s.step}>
              <div className="flex gap-4 bg-neutral-50 dark:bg-slate-800 rounded-xl p-4 border border-neutral-100 dark:border-slate-700">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold text-sm shrink-0">{s.step}</span>
                <p className="text-sm text-neutral-600 dark:text-slate-300 leading-relaxed">{s.text}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection>
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border-l-4 border-primary rounded-r-xl p-5">
            <h3 className="font-bold text-primary-dark dark:text-white mb-1">💡 Quick Tip</h3>
            <p className="text-sm text-neutral-600 dark:text-slate-300 leading-relaxed">
              The Google Search web tool shows a curated subset of pairings — slightly fewer than the native Gboard experience, though the same underlying library powers both.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
