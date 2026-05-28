import { AnimatedSection } from "@/components/MotionWrappers";

const WEIGHT_COLORS: Record<string, string> = {
  "Very High": "bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300",
  "High": "bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300",
  "Medium-High": "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300",
  "Medium": "bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300",
  "Medium-Low": "bg-lime-100 dark:bg-lime-900/40 text-lime-700 dark:text-lime-300",
};

const FLIRT_EMOJIS = [
  { emoji: "❤️", signal: "Direct, serious — \"I have real feelings\"", weight: "High" },
  { emoji: "❤️‍🔥", signal: "Intense attraction with urgency attached", weight: "Very High" },
  { emoji: "🥰", signal: "Genuine tenderness — you made me feel something", weight: "High" },
  { emoji: "😘", signal: "Playful affection — flirtatious but light", weight: "Medium" },
  { emoji: "💕", signal: "Soft mutual warmth — \"I like this without pressure\"", weight: "Medium-Low" },
  { emoji: "😏", signal: "\"I am aware of what I'm saying\" — deliberate mischief", weight: "Medium" },
  { emoji: "👀", signal: "\"I see you\" — noticing something unspoken", weight: "Medium" },
  { emoji: "🙈", signal: "\"I shouldn't say this but I feel it\" — shy love", weight: "Medium" },
  { emoji: "😍", signal: "Strong admiration or physical attraction", weight: "High" },
  { emoji: "🥴", signal: "\"You left me dazed\" — attraction so strong it disorients", weight: "Medium-High" },
];

export default function FlirtingEmojiGuide() {
  return (
    <section className="py-14 bg-white dark:bg-slate-900">
      <div className="max-w-5xl mx-auto px-4">
        <AnimatedSection>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-primary-dark dark:text-white mb-2">
            Flirting Emoji Meanings — Romantic Signals Decoded
          </h2>
          <p className="text-neutral-500 dark:text-slate-400 mb-8">What each emoji communicates in a romantic context</p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          {FLIRT_EMOJIS.map((item) => (
            <AnimatedSection key={item.emoji}>
              <div className="flex items-start gap-4 bg-neutral-50 dark:bg-slate-800 rounded-xl p-4 border border-neutral-100 dark:border-slate-700">
                <span className="text-3xl shrink-0">{item.emoji}</span>
                <div className="min-w-0">
                  <p className="text-sm text-neutral-600 dark:text-slate-300 mb-2">{item.signal}</p>
                  <span className={`inline-block text-xs font-medium px-2 py-1 rounded-full ${WEIGHT_COLORS[item.weight]}`}>{item.weight}</span>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection>
          <div className="bg-pink-50 dark:bg-pink-950/30 border-l-4 border-pink-400 rounded-r-xl p-5">
            <h3 className="font-bold text-primary-dark dark:text-white mb-1">What Does 😏 Mean When a Guy Sends It?</h3>
            <p className="text-sm text-neutral-600 dark:text-slate-300 leading-relaxed">
              The Smirking Face signals playful confidence, flirtation, or mild suggestion. In light conversation it reads as teasing. In response to something personal or complimentary, it signals romantic interest — he noticed something and chose to acknowledge it with a deliberate smirk rather than words.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <div className="bg-violet-50 dark:bg-violet-950/30 border-l-4 border-accent-violet rounded-r-xl p-5 mt-4">
            <h3 className="font-bold text-primary-dark dark:text-white mb-1">💡 Receiving 👀 With No Text Following</h3>
            <p className="text-sm text-neutral-600 dark:text-slate-300 leading-relaxed">
              Usually signals the sender is thinking about something they have not decided to say yet. It is an invitation, not a statement.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
