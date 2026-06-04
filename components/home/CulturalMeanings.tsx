import { AnimatedSection } from "@/components/MotionWrappers";
import SectionShell from "./SectionShell";

const OFFENSIVE_EMOJIS = [
  { emoji: "👌", issue: "Offensive in Brazil and parts of Southern Europe (vulgar insult)" },
  { emoji: "🤘", issue: "Offensive in some Mediterranean and Latin American cultures (implies infidelity)" },
  { emoji: "👍", issue: "Offensive in parts of the Middle East and West Africa" },
];

export default function CulturalMeanings() {
  return (
    <SectionShell
      tone="tint"
      eyebrow="Culture"
      title="Emoji Meanings Across Cultures"
      subtitle="What every global communicator must know — emojis are not universally interpreted the same way."
    >
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
            <div key={item.emoji} className="flex items-center gap-4 bg-white dark:bg-slate-800 rounded-2xl p-4 border border-neutral-200/80 dark:border-slate-700 shadow-sm card-lift hover:shadow-md hover:border-primary/30">
              <span className="text-3xl">{item.emoji}</span>
              <span className="inline-block text-sm px-3 py-1 rounded-full bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300">{item.issue}</span>
            </div>
          ))}
        </div>
      </AnimatedSection>
    </SectionShell>
  );
}
