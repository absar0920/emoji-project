import { AnimatedSection } from "@/components/MotionWrappers";

const COMBOS = [
  { category: "Emotional extremes", combo: "😂 + 😭", result: "Crying-laughing hybrid", why: "Captures \"too funny to handle\"" },
  { category: "Villain energy", combo: "😈 + 🥺", result: "Pleading devil", why: "Conflict between cute and evil" },
  { category: "Chaos face", combo: "🤡 + 😭", result: "Crying clown", why: "Peak internet meltdown energy" },
  { category: "Woozy sadness", combo: "🥴 + 😭", result: "Dizzy-crying face", why: "Overwhelmed feeling" },
  { category: "Cute predator", combo: "🐱 + 😈", result: "Devil cat", why: "Perfectly captures cat energy" },
  { category: "Cross-species", combo: "🐶 + 🐸", result: "Frog-dog hybrid", why: "Unexpectedly adorable" },
  { category: "Classic blob", combo: "🪄 + 😊", result: "Retro blob smiley", why: "Unlocks pre-2017 Google blob art" },
  { category: "Food horror", combo: "🎂 + 💀", result: "Birthday death cake", why: "Dark humor at its best" },
  { category: "Melting chaos", combo: "🫠 + 🔥", result: "Melting in flames", why: "Relatable stressed feeling" },
  { category: "Sleepy animal", combo: "🐻 + 😴", result: "Sleeping bear", why: "Cozy combination" },
  { category: "Cosmic sadness", combo: "🌕 + 😭", result: "Crying moon", why: "Lonely/late-night energy" },
  { category: "Plant face", combo: "🌸 + 😊", result: "Flower-smile hybrid", why: "Spring/happy aesthetic" },
  { category: "Spicy emotion", combo: "🌶️ + 😤", result: "Angry pepper face", why: "Fiery personality" },
  { category: "Cool predator", combo: "🦊 + 😎", result: "Sunglasses fox", why: "Charismatic animal combo" },
  { category: "Haunted food", combo: "🍕 + 👻", result: "Ghost pizza", why: "Surreal viral content" },
];

export default function ComboReferenceTable() {
  return (
    <section className="py-14 bg-neutral-50 dark:bg-slate-800/50">
      <div className="max-w-5xl mx-auto px-4">
        <AnimatedSection>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-primary-dark dark:text-white mb-2">
            Emoji Kitchen Combos — Complete Category Reference
          </h2>
          <p className="text-neutral-500 dark:text-slate-400 mb-8">Quick reference for the best combinations across every category</p>
        </AnimatedSection>

        <AnimatedSection>
          <div className="overflow-x-auto rounded-xl border border-neutral-200 dark:border-slate-700">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-neutral-100 dark:bg-slate-700 text-left">
                  <th className="px-4 py-3 font-bold text-primary-dark dark:text-white">Category</th>
                  <th className="px-4 py-3 font-bold text-primary-dark dark:text-white">Combo</th>
                  <th className="px-4 py-3 font-bold text-primary-dark dark:text-white">What You Get</th>
                  <th className="px-4 py-3 font-bold text-primary-dark dark:text-white">Why It Works</th>
                </tr>
              </thead>
              <tbody>
                {COMBOS.map((row, i) => (
                  <tr key={row.combo} className={i % 2 === 0 ? "bg-white dark:bg-slate-800" : "bg-neutral-50 dark:bg-slate-800/50"}>
                    <td className="px-4 py-3 font-medium text-primary-dark dark:text-white text-xs">{row.category}</td>
                    <td className="px-4 py-3 font-mono text-sm">{row.combo}</td>
                    <td className="px-4 py-3 text-neutral-600 dark:text-slate-300">{row.result}</td>
                    <td className="px-4 py-3 text-neutral-500 dark:text-slate-400 text-xs">{row.why}</td>
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
