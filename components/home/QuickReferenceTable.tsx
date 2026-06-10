import { AnimatedSection } from "@/components/MotionWrappers";
import SectionShell from "./SectionShell";

const QUICK_REF = [
  { emoji: "🥺", name: "Pleading Face", meaning: "Vulnerable plea — nearly impossible to refuse" },
  { emoji: "🫠", name: "Melting Face", meaning: "Overwhelmed, embarrassed, want to disappear" },
  { emoji: "🥰", name: "Smiling Face w/ Hearts", meaning: "Genuine tender affection" },
  { emoji: "😇", name: "Smiling Face w/ Halo", meaning: "Sarcastic innocence — \"I did the thing\"" },
  { emoji: "😌", name: "Relieved Face", meaning: "Smug contentment — not sleepy" },
  { emoji: "🙂", name: "Slightly Smiling Face", meaning: "Passive-aggression or cold acknowledgment" },
  { emoji: "💀", name: "Skull", meaning: "Dying of laughter (Gen Z)" },
  { emoji: "🧿", name: "Nazar Amulet", meaning: "Evil eye protection — cultural blessing" },
  { emoji: "😤", name: "Face w/ Steam from Nose", meaning: "Triumph (official) vs. frustration (how most read it)" },
  { emoji: "❤️‍🔥", name: "Heart on Fire", meaning: "Intense burning passion" },
  { emoji: "🚩", name: "Triangular Flag", meaning: "Red flag — warning sign in a person or situation" },
  { emoji: "💅", name: "Nail Polish", meaning: "Unbothered confidence, \"not my problem\"" },
];

export default function QuickReferenceTable() {
  return (
    <SectionShell
      n="02"
      id="quick-ref"
      title="Most Searched Emoji Meanings in 2026"
      count="12 entries"
      dek="The emojis people look up most — official name, then what it actually says."
    >
      <AnimatedSection>
        <div className="fg-list">
          {QUICK_REF.map((item) => (
            <div key={item.emoji} className="fg-entry fg-entry--ledger">
              <span className="fg-entry__glyph">{item.emoji}</span>
              <div className="fg-entry__main">
                <span className="fg-entry__name">{item.name}</span>
                <p className="fg-entry__text">{item.meaning}</p>
              </div>
            </div>
          ))}
        </div>
      </AnimatedSection>
    </SectionShell>
  );
}
