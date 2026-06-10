import { AnimatedSection } from "@/components/MotionWrappers";
import SectionShell from "./SectionShell";

const ETIQUETTE = [
  { context: "Formal email to client", safe: "None", caution: "✅ 📌 for clarity only", avoid: "All face emojis, all hearts" },
  { context: "Internal Slack channel", safe: "✅ 👍 📌 💡 🎉", caution: "😊 in established teams", avoid: "😏 💋 any heart" },
  { context: "LinkedIn message", safe: "None", caution: "✅ 💡 📊", avoid: "Hearts, face emojis" },
  { context: "WhatsApp with colleague", safe: "👍 ✅ 🙏", caution: "😊 in close team contexts", avoid: "😍 ❤️ 💋" },
  { context: "Job application", safe: "None", caution: "None", avoid: "Everything" },
];

export default function ProfessionalEtiquette() {
  return (
    <SectionShell
      n="19"
      id="work"
      title="Professional Emoji Etiquette — Usage at Work in 2026"
      dek="What's safe, what's risky, and what to never send."
    >
      <AnimatedSection>
        <div className="fg-table-wrap">
          <table className="fg-table">
            <thead>
              <tr>
                <th>Context</th>
                <th style={{ color: "var(--accent)" }}>Safe</th>
                <th>Caution</th>
                <th>Avoid</th>
              </tr>
            </thead>
            <tbody>
              {ETIQUETTE.map((row) => (
                <tr key={row.context}>
                  <td className="strong whitespace-nowrap">{row.context}</td>
                  <td className="emrow">{row.safe}</td>
                  <td className="emrow muted">{row.caution}</td>
                  <td className="emrow muted">{row.avoid}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <div className="fg-pull fg-pull--sm mt-10">
          <span className="fg-kicker">The Safest Rule</span>
          <p>A manager&apos;s 😊 after a correction means warmth; a younger reader may hear passive-aggression. Use symbols that behave like punctuation — ✅ 📌 ✔️ 💡 — over expression emojis.</p>
        </div>
      </AnimatedSection>
    </SectionShell>
  );
}
