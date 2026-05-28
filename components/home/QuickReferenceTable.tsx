import { AnimatedSection } from "@/components/MotionWrappers";

const QUICK_REF = [
  { emoji: "🥺", name: "Pleading Face", meaning: "Vulnerable plea — nearly impossible to refuse" },
  { emoji: "🫠", name: "Melting Face", meaning: "Overwhelmed, embarrassed, want to disappear" },
  { emoji: "🥰", name: "Smiling Face with Hearts", meaning: "Genuine tender affection" },
  { emoji: "😇", name: "Smiling Face with Halo", meaning: "Sarcastic innocence — \"I did the thing\"" },
  { emoji: "😌", name: "Relieved Face", meaning: "Smug contentment — not sleepy" },
  { emoji: "🙂", name: "Slightly Smiling Face", meaning: "Passive-aggression or cold acknowledgment" },
  { emoji: "💀", name: "Skull", meaning: "Dying of laughter (Gen Z)" },
  { emoji: "🧿", name: "Nazar Amulet", meaning: "Evil eye protection — cultural blessing" },
  { emoji: "😤", name: "Face with Steam from Nose", meaning: "Triumph (official) vs. frustration (how most read it)" },
  { emoji: "❤️‍🔥", name: "Heart on Fire", meaning: "Intense burning passion" },
  { emoji: "🚩", name: "Triangular Flag", meaning: "Red flag — warning sign in a person or situation" },
  { emoji: "💅", name: "Nail Polish", meaning: "Unbothered confidence, \"not my problem\"" },
];

export default function QuickReferenceTable() {
  return (
    <section className="py-14 bg-neutral-50 dark:bg-slate-800/50">
      <div className="max-w-5xl mx-auto px-4">
        <AnimatedSection>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-primary-dark dark:text-white mb-2">
            Most Searched Emoji Meanings in 2026
          </h2>
          <p className="text-neutral-500 dark:text-slate-400 mb-8">Quick reference for the emojis people search most</p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {QUICK_REF.map((item) => (
            <AnimatedSection key={item.emoji}>
              <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-neutral-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                <span className="text-4xl block mb-2">{item.emoji}</span>
                <h3 className="font-bold text-sm text-primary-dark dark:text-white">{item.name}</h3>
                <p className="text-xs text-neutral-500 dark:text-slate-400 mt-1 leading-relaxed">{item.meaning}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
