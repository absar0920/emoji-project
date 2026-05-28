import { AnimatedSection } from "@/components/MotionWrappers";

const MISUNDERSTOOD = [
  { emoji: "😤", think: "Angry, frustrated", official: "Face with Steam = triumph", actual: "Both readings coexist — original meaning largely lost" },
  { emoji: "😌", think: "Sleepy or tired", official: "Relieved Face", actual: "Smug contentment, peaceful satisfaction" },
  { emoji: "😪", think: "Tired or sleepy", official: "Sneezing Face with snot bubble", actual: "Still routinely misread as sleepy" },
  { emoji: "🙂", think: "Friendly, polite", official: "Slightly Smiling Face", actual: "Passive-aggressive, cold acknowledgment" },
  { emoji: "😇", think: "Innocent, angelic", official: "Smiling Face with Halo", actual: "Almost always ironic — \"I did the thing\"" },
  { emoji: "💀", think: "Death, darkness", official: "Skull", actual: "Dying of laughter (Gen Z)" },
  { emoji: "🙃", think: "Happy (upside-down)", official: "Upside-Down Face", actual: "Irony, chaos, \"I'm fine\" (definitely not)" },
  { emoji: "👍", think: "Strong agreement", official: "Thumbs Up = approval", actual: "Cold or dismissive to younger demographics" },
  { emoji: "🥴", think: "Drunk or woozy", official: "Woozy Face", actual: "Stunned by beauty, overwhelmed" },
  { emoji: "😮‍💨", think: "Surprise", official: "Face Exhaling", actual: "Relief, unbothered sigh" },
  { emoji: "🤧", think: "Crying", official: "Sneezing Face", actual: "Sick, sneezing — not emotional tears" },
  { emoji: "😑", think: "Calm", official: "Expressionless Face", actual: "Low-grade irritation, done-ness" },
  { emoji: "🫠", think: "Nothing specific", official: "Melting Face", actual: "Overwhelmed, embarrassed, want to disappear" },
  { emoji: "🫥", think: "Nothing special", official: "Dotted Line Face = invisible", actual: "Dissociation, feeling absent or checked out" },
  { emoji: "💢", think: "Decoration", official: "Anger Symbol (manga origin)", actual: "Frustration, explosive irritation" },
];

export default function MisunderstoodEmojis() {
  return (
    <section className="py-14 bg-white dark:bg-slate-900">
      <div className="max-w-5xl mx-auto px-4">
        <AnimatedSection>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-primary-dark dark:text-white mb-2">
            The 15 Most Misunderstood Emojis in the World
          </h2>
          <p className="text-neutral-500 dark:text-slate-400 mb-8">What most people think vs. what they officially mean vs. how they&apos;re actually used</p>
        </AnimatedSection>

        <AnimatedSection>
          <div className="overflow-x-auto rounded-xl border border-neutral-200 dark:border-slate-700">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-neutral-100 dark:bg-slate-700 text-left">
                  <th className="px-4 py-3 font-bold text-primary-dark dark:text-white">Emoji</th>
                  <th className="px-4 py-3 font-bold text-primary-dark dark:text-white">What People Think</th>
                  <th className="px-4 py-3 font-bold text-primary-dark dark:text-white">Official Meaning</th>
                  <th className="px-4 py-3 font-bold text-primary-dark dark:text-white">Actual Usage in 2026</th>
                </tr>
              </thead>
              <tbody>
                {MISUNDERSTOOD.map((row, i) => (
                  <tr key={row.emoji} className={i % 2 === 0 ? "bg-white dark:bg-slate-800" : "bg-neutral-50 dark:bg-slate-800/50"}>
                    <td className="px-4 py-3 text-2xl">{row.emoji}</td>
                    <td className="px-4 py-3 text-neutral-500 dark:text-slate-400">{row.think}</td>
                    <td className="px-4 py-3 text-neutral-600 dark:text-slate-300">{row.official}</td>
                    <td className="px-4 py-3 font-medium text-primary-dark dark:text-white">{row.actual}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
