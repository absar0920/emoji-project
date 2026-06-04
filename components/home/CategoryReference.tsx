import { AnimatedSection } from "@/components/MotionWrappers";
import SectionShell from "./SectionShell";

const CATEGORIES = [
  { name: "Smileys & People", count: "200+", mostUsed: "😂 😊 ❤️ 🙏", misunderstood: "😌 (looks sleepy, signals contentment)" },
  { name: "Animals & Nature", count: "150+", mostUsed: "🐶 🌸 🌞", misunderstood: "🦅 (nationalist connotations)" },
  { name: "Food & Drink", count: "130+", mostUsed: "🍕 🍓 ☕", misunderstood: "🍑 🍆 (sexual slang readings)" },
  { name: "Travel & Places", count: "120+", mostUsed: "✈️ 🏠 🌍", misunderstood: "🏳️ (surrender vs. plain white flag)" },
  { name: "Activities", count: "80+", mostUsed: "⚽ 🎉 🎶", misunderstood: "🎯 (ambition signal vs. dart game)" },
  { name: "Objects", count: "200+", mostUsed: "💻 📱 🎁", misunderstood: "🔮 (mystical vs. ironic prediction)" },
  { name: "Symbols", count: "300+", mostUsed: "❤️ ✅ ⭐ 💯", misunderstood: "‼️ (urgency vs. theatrical emphasis)" },
  { name: "Flags", count: "270+", mostUsed: "🏁 🚩 🏳️‍🌈", misunderstood: "🚩 (red flag relationship warning)" },
];

export default function CategoryReference() {
  return (
    <SectionShell
      tone="tint"
      eyebrow="Categories"
      title="Complete Emoji Category Reference"
      subtitle="The Unicode Consortium organizes all 3,700+ emojis into eight major categories."
    >
      <AnimatedSection>
        <div className="overflow-x-auto rounded-xl border border-neutral-200 dark:border-slate-700">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-neutral-100 dark:bg-slate-700 text-left">
                <th className="px-4 py-3 font-bold text-primary-dark dark:text-white">Category</th>
                <th className="px-4 py-3 font-bold text-primary-dark dark:text-white">Count</th>
                <th className="px-4 py-3 font-bold text-primary-dark dark:text-white">Most Used</th>
                <th className="px-4 py-3 font-bold text-primary-dark dark:text-white">Most Misunderstood</th>
              </tr>
            </thead>
            <tbody>
              {CATEGORIES.map((cat, i) => (
                <tr key={cat.name} className={i % 2 === 0 ? "bg-white dark:bg-slate-800" : "bg-neutral-50 dark:bg-slate-800/50"}>
                  <td className="px-4 py-3 font-medium text-primary-dark dark:text-white">{cat.name}</td>
                  <td className="px-4 py-3 text-neutral-600 dark:text-slate-300">{cat.count}</td>
                  <td className="px-4 py-3">{cat.mostUsed}</td>
                  <td className="px-4 py-3 text-neutral-500 dark:text-slate-400 text-xs">{cat.misunderstood}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimatedSection>
    </SectionShell>
  );
}
