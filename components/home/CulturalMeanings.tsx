import { AnimatedSection } from "@/components/MotionWrappers";

const OFFENSIVE_EMOJIS = [
  { emoji: "👌", issue: "Offensive in Brazil and parts of Southern Europe (vulgar insult)" },
  { emoji: "🤘", issue: "Offensive in some Mediterranean and Latin American cultures (implies infidelity)" },
  { emoji: "👍", issue: "Offensive in parts of the Middle East and West Africa" },
];

export default function CulturalMeanings() {
  return (
    <section className="py-14 bg-neutral-50 dark:bg-slate-800/50">
      <div className="max-w-5xl mx-auto px-4">
        <AnimatedSection>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-primary-dark dark:text-white mb-2">
            Emoji Meanings Across Cultures
          </h2>
          <p className="text-neutral-500 dark:text-slate-400 mb-8">What every global communicator must know — emojis are not universally interpreted the same way.</p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <AnimatedSection>
            <div className="bg-amber-50 dark:bg-amber-950/30 border-l-4 border-accent-amber rounded-r-xl p-5">
              <h3 className="font-bold text-primary-dark dark:text-white mb-1">⚠️ The 👌 Situation</h3>
              <p className="text-sm text-neutral-600 dark:text-slate-300 leading-relaxed">In the US, 👌 means &ldquo;perfect.&rdquo; In Brazil and parts of Southern Europe, it&apos;s a vulgar insult. In France it historically means &ldquo;zero.&rdquo; No platform warns you.</p>
            </div>
          </AnimatedSection>
          <AnimatedSection>
            <div className="bg-indigo-50 dark:bg-indigo-950/30 border-l-4 border-primary rounded-r-xl p-5">
              <h3 className="font-bold text-primary-dark dark:text-white mb-1">🤙 The Shaka Gesture</h3>
              <p className="text-sm text-neutral-600 dark:text-slate-300 leading-relaxed">Deep roots in Hawaiian and Pacific Island culture, signaling friendship and aloha. Outside those communities — particularly across Europe and Asia — many people simply don&apos;t recognize it.</p>
            </div>
          </AnimatedSection>
          <AnimatedSection>
            <div className="bg-violet-50 dark:bg-violet-950/30 border-l-4 border-accent-violet rounded-r-xl p-5">
              <h3 className="font-bold text-primary-dark dark:text-white mb-1">🎨 Skin Tone Modifiers</h3>
              <p className="text-sm text-neutral-600 dark:text-slate-300 leading-relaxed">The choice of skin tone communicates something about identity and solidarity. There is no fully neutral choice, which is why this layer is more nuanced than it first appears.</p>
            </div>
          </AnimatedSection>
          <AnimatedSection>
            <div className="bg-pink-50 dark:bg-pink-950/30 border-l-4 border-pink-400 rounded-r-xl p-5">
              <h3 className="font-bold text-primary-dark dark:text-white mb-1">👥 The Generational Gap</h3>
              <p className="text-sm text-neutral-600 dark:text-slate-300 leading-relaxed">The 😂 a Boomer sends sincerely reads as performative to Gen Z. The 🙂 an older sender intends warmly registers as passive-aggressive to someone younger. Neither interpretation is wrong.</p>
            </div>
          </AnimatedSection>
        </div>

        <AnimatedSection>
          <h3 className="text-lg font-bold text-primary-dark dark:text-white mb-4">Which Emojis Are Offensive in Other Countries?</h3>
          <div className="space-y-2">
            {OFFENSIVE_EMOJIS.map((item) => (
              <div key={item.emoji} className="flex items-center gap-4 bg-white dark:bg-slate-800 rounded-xl p-4 border border-neutral-100 dark:border-slate-700">
                <span className="text-3xl">{item.emoji}</span>
                <span className="inline-block text-sm px-3 py-1 rounded-full bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300">{item.issue}</span>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
