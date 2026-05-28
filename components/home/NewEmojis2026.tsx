import { AnimatedSection } from "@/components/MotionWrappers";

const NEW_EMOJIS = [
  { emoji: "🫩", name: "Face with Bags Under Eyes", meaning: "Exhaustion, sleep deprivation, tired humor", availability: "iOS 18+, Android 15+" },
  { emoji: "🪮", name: "Hair Pick", meaning: "Grooming, Black hair care culture", availability: "iOS 18+, Android 15+" },
  { emoji: "🐦‍🔥", name: "Phoenix", meaning: "Rebirth, resilience, rising from difficulty", availability: "iOS 18+, Android 15+" },
  { emoji: "🍋‍🟩", name: "Lime", meaning: "Citrus, cocktails — finally distinct from 🍋 lemon", availability: "iOS 17.4+, Android 14+" },
  { emoji: "🪭", name: "Folding Hand Fan", meaning: "Heat, elegance, traditional Asian culture", availability: "iOS 17.4+, Android 14+" },
  { emoji: "🪈", name: "Flute", meaning: "Music, classical instruments", availability: "iOS 17.4+, Android 14+" },
  { emoji: "🪇", name: "Maracas", meaning: "Latin music, celebration, rhythm", availability: "iOS 17.4+, Android 14+" },
  { emoji: "🫏", name: "Donkey", meaning: "Stubbornness, political symbolism", availability: "iOS 17+, Android 14+" },
];

export default function NewEmojis2026() {
  return (
    <section className="py-14 bg-neutral-50 dark:bg-slate-800/50">
      <div className="max-w-5xl mx-auto px-4">
        <AnimatedSection>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-primary-dark dark:text-white mb-2">
            New Emojis in 2026 — Unicode 15.1 & 16.0
          </h2>
          <p className="text-neutral-500 dark:text-slate-400 mb-8">The latest additions to the emoji vocabulary</p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          {NEW_EMOJIS.map((item) => (
            <AnimatedSection key={item.name}>
              <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-neutral-100 dark:border-slate-700">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{item.emoji}</span>
                  <h3 className="font-bold text-sm text-primary-dark dark:text-white">{item.name}</h3>
                </div>
                <p className="text-sm text-neutral-600 dark:text-slate-300 mb-2">{item.meaning}</p>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300">{item.availability}</span>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <AnimatedSection>
            <div className="bg-indigo-50 dark:bg-indigo-950/30 border-l-4 border-primary rounded-r-xl p-5">
              <h3 className="font-bold text-primary-dark dark:text-white mb-1">How the Unicode Approval Process Works</h3>
              <p className="text-sm text-neutral-600 dark:text-slate-300 leading-relaxed">Anyone may submit an emoji proposal. The Emoji Subcommittee evaluates based on predicted usage frequency, distinctiveness, and cross-cultural accessibility. From submission to keyboard: typically 18+ months.</p>
            </div>
          </AnimatedSection>
          <AnimatedSection>
            <div className="bg-emerald-50 dark:bg-emerald-950/30 border-l-4 border-accent-emerald rounded-r-xl p-5">
              <h3 className="font-bold text-primary-dark dark:text-white mb-1">How to Get New Emojis on iPhone</h3>
              <p className="text-sm text-neutral-600 dark:text-slate-300 leading-relaxed">Go to Settings → General → Software Update and install any available update. New emojis arrive through iOS system updates — there is no separate download.</p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
