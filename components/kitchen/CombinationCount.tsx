import { KSection } from "./Section";

const COVERAGE = [
  { category: "Face & expression emojis", level: "Extensive", tone: "good", examples: "😂 😭 🥺 🤡 😍" },
  { category: "Animal emojis", level: "Strong", tone: "good", examples: "🐱 🐶 🐸 🦊 🐻" },
  { category: "Food & drink emojis", level: "Moderate", tone: "warn", examples: "🍕 🍔 🎂 🍣" },
  { category: "Nature & weather", level: "Moderate", tone: "warn", examples: "🌸 ☀️ 🌈 ⛈️" },
  { category: "Objects & activities", level: "Selective", tone: "warn", examples: "Some work, many don't" },
  { category: "People with skin tones", level: "Not supported", tone: "bad", examples: "👨 👩 🧑 + modifiers" },
  { category: "Flag emojis", level: "Not supported", tone: "bad", examples: "🇺🇸 🇬🇧 🇯🇵" },
  { category: "Symbol / number emojis", level: "Mostly not", tone: "bad", examples: "🔢 © 📊" },
];

const STATS = [
  { value: "100,000+", label: "unique combinations" },
  { value: "😂 😭 🥺", label: "most paired emojis" },
  { value: "Hand-crafted", label: "every sticker by Google" },
];

const toneVar: Record<string, string> = { good: "var(--good)", warn: "var(--warn)", bad: "var(--bad)" };

export default function CombinationCount() {
  return (
    <KSection kicker="By the Numbers" title="How Many Combinations Exist?" dek="Over 100,000 hand-crafted pairings — and growing with each Gboard update.">
      <dl className="grid grid-cols-3 gap-px overflow-hidden border border-[var(--line)] bg-[var(--line)] mb-9">
        {STATS.map((s) => (
          <div key={s.label} className="bg-[var(--paper)] px-3 py-4 text-center">
            <dd className="font-display t-ink text-xl leading-tight">{s.value}</dd>
            <dd className="fg-label mt-1.5">{s.label}</dd>
          </div>
        ))}
      </dl>

      <p className="fg-kicker mb-4">Coverage by category</p>
      <div className="fg-table-wrap mb-8">
        <table className="fg-table">
          <thead>
            <tr><th>Category</th><th>Support</th><th>Examples</th></tr>
          </thead>
          <tbody>
            {COVERAGE.map((row) => (
              <tr key={row.category}>
                <td className="strong">{row.category}</td>
                <td><span className="mono text-[0.66rem] uppercase tracking-[0.1em]" style={{ color: toneVar[row.tone] }}>{row.level}</span></td>
                <td className="muted">{row.examples}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="fg-pull fg-pull--sm">
        <span className="fg-kicker">Why Some Are Excluded</span>
        <p>Flag emojis use two-character Regional Indicator sequences incompatible with Kitchen&apos;s lookup. Human figures with skin tones were deliberately excluded to avoid insensitive combinations. The 100,000+ figure counts curated pairings — not all mathematical permutations.</p>
      </div>
    </KSection>
  );
}
