import { AnimatedSection } from "@/components/MotionWrappers";
import SectionShell from "./SectionShell";

const CONTEXT_TABLE = [
  { emoji: "🙂", perceived: "Friendly or polite", actual: "Passive-aggressive, cold", risk: "Very High" },
  { emoji: "😌", perceived: "Sleepy", actual: "Smug contentment, satisfied", risk: "High" },
  { emoji: "💀", perceived: "Death or darkness", actual: "Dying of laughter (Gen Z)", risk: "High" },
  { emoji: "😂", perceived: "Genuine laughter", actual: "Still laughter — but performative to Gen Z", risk: "Medium" },
  { emoji: "👍", perceived: "Enthusiasm", actual: "Cold dismissal to younger receivers", risk: "High" },
  { emoji: "😑", perceived: "Calm", actual: "Low-grade irritation, done-ness", risk: "Low" },
  { emoji: "🥴", perceived: "Drunk", actual: "Stunned by attraction, total overwhelm", risk: "Medium" },
  { emoji: "🤡", perceived: "A clown character", actual: "\"I am the fool here\" — self-deprecation", risk: "Medium" },
  { emoji: "💅", perceived: "Nail polish", actual: "Unbothered, detached confidence", risk: "Low" },
  { emoji: "🗿", perceived: "Easter Island statue", actual: "Deadpan witness to chaos", risk: "High" },
];

export default function TextingContextSection() {
  return (
    <SectionShell
      n="10"
      id="texting"
      title="Emoji Meanings in Texting — Context Changes Everything"
      dek="What you think you're sending vs. what they actually read."
    >
      <AnimatedSection>
        <div className="fg-table-wrap">
          <table className="fg-table">
            <thead>
              <tr>
                <th>Emoji</th>
                <th>Perceived</th>
                <th>Actual 2026 Meaning</th>
                <th>Misread Risk</th>
              </tr>
            </thead>
            <tbody>
              {CONTEXT_TABLE.map((row) => {
                const hot = row.risk === "Very High" || row.risk === "High";
                return (
                  <tr key={row.emoji}>
                    <td className="em">{row.emoji}</td>
                    <td className="muted">{row.perceived}</td>
                    <td className="strong">{row.actual}</td>
                    <td>
                      <span className="mono" style={{ fontSize: "0.66rem", letterSpacing: "0.1em", textTransform: "uppercase", color: hot ? "var(--accent)" : "var(--ink-3)" }}>{row.risk}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <dl className="fg-deflist mt-10 max-w-3xl border-t-2 border-[var(--rule)] pt-6">
          <dt>Frequency matters</dt>
          <dd>One ❤️ signals care. Three in a row signals enthusiasm. Five or more means either overwhelming emotion or performative excess — and the receiver usually knows which based on the relationship.</dd>
          <dt>Single-emoji replies</dt>
          <dd>A standalone 👍 after something personal reads as dismissive. A solitary 🙂 after a vulnerable message is almost never warm. These one-symbol responses communicate &ldquo;I received this and I am not going further.&rdquo;</dd>
        </dl>
      </AnimatedSection>
    </SectionShell>
  );
}
