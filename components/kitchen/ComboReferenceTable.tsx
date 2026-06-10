import { KSection } from "./Section";

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
    <KSection kicker="Reference" title="Emoji Kitchen Combos — Complete Reference" dek="Quick reference for the best combinations across every category.">
      <div className="fg-table-wrap">
        <table className="fg-table">
          <thead>
            <tr><th>Category</th><th>Combo</th><th>What You Get</th><th>Why It Works</th></tr>
          </thead>
          <tbody>
            {COMBOS.map((row) => (
              <tr key={row.combo}>
                <td className="muted whitespace-nowrap">{row.category}</td>
                <td className="mono whitespace-nowrap" style={{ fontSize: "1rem" }}>{row.combo}</td>
                <td className="strong">{row.result}</td>
                <td className="muted">{row.why}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </KSection>
  );
}
