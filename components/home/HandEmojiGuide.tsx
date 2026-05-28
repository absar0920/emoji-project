import { AnimatedSection } from "@/components/MotionWrappers";

const HANDS = [
  { emoji: "👋", gesture: "Waving Hand", meaning: "Hello or goodbye", warning: "" },
  { emoji: "👍", gesture: "Thumbs Up", meaning: "Approval, agreement", warning: "Reads as passive-aggressive to Gen Z when sent alone" },
  { emoji: "👎", gesture: "Thumbs Down", meaning: "Disapproval, rejection", warning: "Offensive in parts of the Middle East and West Africa" },
  { emoji: "👌", gesture: "OK Hand", meaning: "Perfection or approval (US)", warning: "Vulgar insult in Brazil and parts of Southern Europe" },
  { emoji: "✌️", gesture: "Peace / Victory", meaning: "Peace, casual chill", warning: "UK/Australia: palm-facing-inward version is offensive" },
  { emoji: "🤞", gesture: "Crossed Fingers", meaning: "Hoping for luck", warning: "Considered rude in Vietnam and parts of Southeast Asia" },
  { emoji: "🫶", gesture: "Heart Hands", meaning: "Love, care, warmth", warning: "" },
  { emoji: "🤝", gesture: "Handshake", meaning: "Agreement, partnership", warning: "" },
  { emoji: "🖕", gesture: "Middle Finger", meaning: "Explicit insult", warning: "Universally understood — no ambiguity" },
  { emoji: "🤙", gesture: "Call Me / Shaka", meaning: "\"Hang loose,\" casual cool", warning: "Unfamiliar in many parts of Europe and Asia" },
  { emoji: "🙏", gesture: "Folded Hands", meaning: "Prayer, gratitude, \"thank you\"", warning: "Three distinct readings depending on cultural context" },
  { emoji: "👏", gesture: "Clapping Hands", meaning: "Applause, approval", warning: "👏 between 👏 words signals sarcasm" },
];

export default function HandEmojiGuide() {
  return (
    <section className="py-14 bg-white dark:bg-slate-900">
      <div className="max-w-5xl mx-auto px-4">
        <AnimatedSection>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-primary-dark dark:text-white mb-2">
            Hand Emoji Meanings — Gestures & Cultural Warnings
          </h2>
          <p className="text-neutral-500 dark:text-slate-400 mb-8">Hand emojis are the most culturally variable symbols in the vocabulary.</p>
        </AnimatedSection>

        <AnimatedSection>
          <div className="overflow-x-auto rounded-xl border border-neutral-200 dark:border-slate-700 mb-8">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-neutral-100 dark:bg-slate-700 text-left">
                  <th className="px-4 py-3 font-bold text-primary-dark dark:text-white">Emoji</th>
                  <th className="px-4 py-3 font-bold text-primary-dark dark:text-white">Gesture</th>
                  <th className="px-4 py-3 font-bold text-primary-dark dark:text-white">Core Meaning</th>
                  <th className="px-4 py-3 font-bold text-primary-dark dark:text-white">Cultural Warning</th>
                </tr>
              </thead>
              <tbody>
                {HANDS.map((h, i) => (
                  <tr key={h.emoji} className={i % 2 === 0 ? "bg-white dark:bg-slate-800" : "bg-neutral-50 dark:bg-slate-800/50"}>
                    <td className="px-4 py-3 text-2xl">{h.emoji}</td>
                    <td className="px-4 py-3 font-medium text-primary-dark dark:text-white">{h.gesture}</td>
                    <td className="px-4 py-3 text-neutral-600 dark:text-slate-300">{h.meaning}</td>
                    <td className="px-4 py-3">
                      {h.warning ? (
                        <span className="inline-block text-xs px-2 py-1 rounded-full bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300">{h.warning}</span>
                      ) : (
                        <span className="text-xs text-neutral-400 dark:text-slate-500">None</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <div className="bg-amber-50 dark:bg-amber-950/30 border-l-4 border-accent-amber rounded-r-xl p-5">
            <h3 className="font-bold text-primary-dark dark:text-white mb-1">⚠️ The 👌 Situation</h3>
            <p className="text-sm text-neutral-600 dark:text-slate-300 leading-relaxed">
              In the United States, 👌 means &ldquo;perfect&rdquo; or &ldquo;okay.&rdquo; In Brazil and parts of Southern Europe, the same gesture is a vulgar insult. In France it has historically meant &ldquo;zero&rdquo; or &ldquo;worthless.&rdquo; No platform will alert you when your &ldquo;perfect&rdquo; reads as offensive to someone else.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
