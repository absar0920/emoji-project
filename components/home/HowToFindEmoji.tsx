import { AnimatedSection } from "@/components/MotionWrappers";

const PLATFORMS = [
  { name: "iPhone (iOS 14+)", icon: "📱", steps: "Open any text field → tap the emoji icon on the keyboard → type a keyword in the search bar." },
  { name: "Android (Gboard)", icon: "🤖", steps: "Open the keyboard → tap the emoji smiley icon → tap the search icon → type any keyword." },
  { name: "Windows 11", icon: "🪟", steps: "Press Win + . to open the emoji panel → type in the search box." },
  { name: "Mac", icon: "💻", steps: "Press Control + Command + Space → the emoji viewer opens → search by keyword." },
  { name: "Discord", icon: "🎮", steps: "Type : (colon) in any message field → type the emoji name to search → click to insert." },
];

export default function HowToFindEmoji() {
  return (
    <section className="py-14 bg-white dark:bg-slate-900">
      <div className="max-w-5xl mx-auto px-4">
        <AnimatedSection>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-primary-dark dark:text-white mb-2">
            How to Find What Any Emoji Means
          </h2>
          <p className="text-neutral-500 dark:text-slate-400 mb-8">Platform-specific search instructions</p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
          {PLATFORMS.map((p) => (
            <AnimatedSection key={p.name}>
              <div className="bg-neutral-50 dark:bg-slate-800 rounded-xl p-5 border border-neutral-100 dark:border-slate-700">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">{p.icon}</span>
                  <h3 className="font-bold text-sm text-primary-dark dark:text-white">{p.name}</h3>
                </div>
                <p className="text-sm text-neutral-600 dark:text-slate-300 leading-relaxed">{p.steps}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection>
          <div className="bg-violet-50 dark:bg-violet-950/30 border-l-4 border-accent-violet rounded-r-xl p-5">
            <h3 className="font-bold text-primary-dark dark:text-white mb-1">💡 The Keyword Approach</h3>
            <p className="text-sm text-neutral-600 dark:text-slate-300 leading-relaxed">When you don&apos;t know the official name, describe what the emoji looks like. Searching &ldquo;melting&rdquo; finds 🫠. &ldquo;Pleading&rdquo; finds 🥺. &ldquo;Fire heart&rdquo; finds ❤️‍🔥.</p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
