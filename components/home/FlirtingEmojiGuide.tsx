import { AnimatedSection } from "@/components/MotionWrappers";
import SectionShell from "./SectionShell";

const FLIRT_EMOJIS = [
  { emoji: "❤️", signal: "Direct, serious — \"I have real feelings\"", weight: "High" },
  { emoji: "❤️‍🔥", signal: "Intense attraction with urgency attached", weight: "Very High" },
  { emoji: "🥰", signal: "Genuine tenderness — you made me feel something", weight: "High" },
  { emoji: "😘", signal: "Playful affection — flirtatious but light", weight: "Medium" },
  { emoji: "💕", signal: "Soft mutual warmth — \"I like this without pressure\"", weight: "Medium-Low" },
  { emoji: "😏", signal: "\"I am aware of what I'm saying\" — deliberate mischief", weight: "Medium" },
  { emoji: "👀", signal: "\"I see you\" — noticing something unspoken", weight: "Medium" },
  { emoji: "🙈", signal: "\"I shouldn't say this but I feel it\" — shy love", weight: "Medium" },
  { emoji: "😍", signal: "Strong admiration or physical attraction", weight: "High" },
  { emoji: "🥴", signal: "\"You left me dazed\" — attraction so strong it disorients", weight: "Medium-High" },
];

export default function FlirtingEmojiGuide() {
  return (
    <SectionShell
      n="11"
      id="flirting"
      title="Flirting Emoji Meanings — Romantic Signals Decoded"
      count="10 signals"
      dek="What each emoji communicates in a romantic context — and how much weight it carries."
    >
      <AnimatedSection>
        <div className="fg-list">
          {FLIRT_EMOJIS.map((item) => (
            <div key={item.emoji} className="fg-entry">
              <span className="fg-entry__glyph">{item.emoji}</span>
              <div className="fg-entry__main">
                <p className="fg-entry__text">{item.signal}</p>
                <p className="fg-entry__meta">Weight — {item.weight}</p>
              </div>
            </div>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <dl className="fg-deflist mt-10 max-w-3xl border-t-2 border-[var(--rule)] pt-6">
          <dt>😏 when a guy sends it</dt>
          <dd>Playful confidence, flirtation, or mild suggestion. In light conversation it reads as teasing; in response to something personal, it signals interest — he noticed something and chose a smirk over words.</dd>
          <dt>👀 with no text following</dt>
          <dd>Usually the sender is thinking about something they haven&apos;t decided to say yet. It is an invitation, not a statement.</dd>
        </dl>
      </AnimatedSection>
    </SectionShell>
  );
}
