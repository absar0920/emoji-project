import { AnimatedSection } from "@/components/MotionWrappers";

const UPDATES = [
  { icon: "🦊", title: "New Animal Hybrids", desc: "Pairings for several Unicode 16 animal and nature emojis — newer animals are now part of the combination system for the first time." },
  { icon: "🍔", title: "Expanded Food Combos", desc: "Extended batch of cross-category pairings: food + face, food + object combinations that were previously unavailable." },
  { icon: "🪄", title: "More Blob Variants", desc: "The magic wand trick was refined to surface additional legacy blob designs that were previously inaccessible — Google revisited the archived blob library." },
  { icon: "⚡", title: "Faster Suggestions", desc: "The suggestion row now appears faster after emoji selection — reduced latency between tapping and seeing combination results." },
  { icon: "📐", title: "More Visible Options", desc: "Visible sticker count in the suggestion row increased from 4 to up to 6 simultaneously, reducing horizontal scrolling." },
  { icon: "🔍", title: "Search Integration", desc: "Searching for an emoji by name or keyword now surfaces Kitchen suggestions alongside standard search results." },
];

export default function Android16Updates() {
  return (
    <section className="py-14 rule-top">
      <div className="max-w-5xl mx-auto px-4">
        <AnimatedSection>
          <p className="eyebrow mb-3 flex items-center gap-2"><span className="inline-block w-6 h-px bg-primary" aria-hidden="true" />What&apos;s New</p>
          <h2 className="font-display text-3xl sm:text-4xl text-primary-dark dark:text-white leading-[1.1] mb-2">
            Emoji Kitchen and Android 16 — What&apos;s New in 2026
          </h2>
          <p className="text-neutral-500 dark:text-slate-400 mt-3 mb-8">New combinations, faster suggestions, and expanded blob access</p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {UPDATES.map((u) => (
            <AnimatedSection key={u.title}>
              <div className="bg-neutral-50 dark:bg-slate-800 rounded-2xl p-5 border border-neutral-200/80 dark:border-slate-700 shadow-sm card-lift hover:shadow-md hover:border-primary/40">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{u.icon}</span>
                  <h3 className="font-bold text-sm text-primary-dark dark:text-white">{u.title}</h3>
                </div>
                <p className="text-sm text-neutral-600 dark:text-slate-400 leading-relaxed">{u.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
