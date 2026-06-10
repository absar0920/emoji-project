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
      n="04"
      id="categories"
      title="Complete Emoji Category Reference"
      count="8 categories"
      dek="The Unicode Consortium organizes all 3,700+ emojis into eight major categories."
    >
      <AnimatedSection>
        <div className="fg-table-wrap">
          <table className="fg-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Count</th>
                <th>Most Used</th>
                <th>Most Misunderstood</th>
              </tr>
            </thead>
            <tbody>
              {CATEGORIES.map((cat) => (
                <tr key={cat.name}>
                  <td className="strong whitespace-nowrap">{cat.name}</td>
                  <td className="mono tabular-nums">{cat.count}</td>
                  <td className="emrow">{cat.mostUsed}</td>
                  <td className="muted">{cat.misunderstood}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimatedSection>
    </SectionShell>
  );
}
