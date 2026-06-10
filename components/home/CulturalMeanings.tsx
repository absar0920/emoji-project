import { AnimatedSection } from "@/components/MotionWrappers";
import SectionShell from "./SectionShell";

const NOTES = [
  { dt: "The 👌 situation", dd: "In the US, 👌 means “perfect.” In Brazil and parts of Southern Europe it’s a vulgar insult. In France it historically means “zero.” No platform warns you." },
  { dt: "The 🤙 shaka gesture", dd: "Deep roots in Hawaiian and Pacific Island culture, signaling friendship and aloha. Outside those communities — across Europe and Asia — many simply don’t recognize it." },
  { dt: "Skin-tone modifiers", dd: "The choice of skin tone communicates something about identity and solidarity. There is no fully neutral choice, which is why this layer is more nuanced than it first appears." },
  { dt: "The generational gap", dd: "The 😂 a Boomer sends sincerely reads as performative to Gen Z. The 🙂 an older sender intends warmly registers as passive-aggressive to someone younger. Neither reading is wrong." },
];

const OFFENSIVE = [
  { emoji: "👌", issue: "Brazil and parts of Southern Europe — a vulgar insult" },
  { emoji: "🤘", issue: "Some Mediterranean and Latin American cultures — implies infidelity" },
  { emoji: "👍", issue: "Parts of the Middle East and West Africa" },
];

export default function CulturalMeanings() {
  return (
    <SectionShell
      n="16"
      id="culture"
      title="Emoji Meanings Across Cultures"
      dek="What every global communicator must know — emojis are not interpreted the same way everywhere."
    >
      <AnimatedSection>
        <dl className="fg-deflist max-w-3xl border-t border-[var(--line)] pt-1">
          {NOTES.map((n) => (
            <div key={n.dt}>
              <dt>{n.dt}</dt>
              <dd>{n.dd}</dd>
            </div>
          ))}
        </dl>
      </AnimatedSection>

      <AnimatedSection>
        <p className="fg-kicker mt-11 mb-4">Offensive in other countries</p>
        <div className="fg-list">
          {OFFENSIVE.map((item) => (
            <div key={item.emoji} className="fg-entry">
              <span className="fg-entry__glyph">{item.emoji}</span>
              <div className="fg-entry__main self-center">
                <p className="fg-entry__text">{item.issue}</p>
              </div>
            </div>
          ))}
        </div>
      </AnimatedSection>
    </SectionShell>
  );
}
