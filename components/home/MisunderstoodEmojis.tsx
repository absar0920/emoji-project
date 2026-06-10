import { AnimatedSection } from "@/components/MotionWrappers";
import SectionShell from "./SectionShell";

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
    <SectionShell
      n="17"
      id="misread"
      title="The 15 Most Misunderstood Emojis in the World"
      count="15 entries"
      dek="What most people think · what it officially means · how it's actually used."
    >
      <AnimatedSection>
        <div className="fg-table-wrap">
          <table className="fg-table">
            <thead>
              <tr><th>Emoji</th><th>People Think</th><th>Official Meaning</th><th>Actual Usage, 2026</th></tr>
            </thead>
            <tbody>
              {MISUNDERSTOOD.map((row) => (
                <tr key={row.emoji}>
                  <td className="em">{row.emoji}</td>
                  <td className="muted">{row.think}</td>
                  <td>{row.official}</td>
                  <td className="strong">{row.actual}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimatedSection>
    </SectionShell>
  );
}
