import { AnimatedSection } from "@/components/MotionWrappers";
import SectionShell from "./SectionShell";

const HANDS = [
  { emoji: "👋", gesture: "Waving Hand", meaning: "Hello or goodbye", warning: "" },
  { emoji: "👍", gesture: "Thumbs Up", meaning: "Approval, agreement", warning: "Reads as passive-aggressive to Gen Z when sent alone" },
  { emoji: "👎", gesture: "Thumbs Down", meaning: "Disapproval, rejection", warning: "Offensive in parts of the Middle East and West Africa" },
  { emoji: "👌", gesture: "OK Hand", meaning: "Perfection or approval (US)", warning: "Vulgar insult in Brazil and parts of Southern Europe" },
  { emoji: "✌️", gesture: "Peace / Victory", meaning: "Peace, casual chill", warning: "UK/Australia: palm-facing-inward version is offensive" },
  { emoji: "🤞", gesture: "Crossed Fingers", meaning: "Hoping for luck", warning: "Considered rude in Vietnam and parts of Southeast Asia" },
  { emoji: "🫶", gesture: "Heart Hands", meaning: "Love, care, warmth", warning: "" },
  { emoji: "🤝", gesture: "Handshake", meaning: "Agreement, partnership", warning: "" },
  { emoji: "🖕", gesture: "Middle Finger", meaning: "Explicit insult", warning: "Universally understood — no ambiguity" },
  { emoji: "🤙", gesture: "Call Me / Shaka", meaning: "\"Hang loose,\" casual cool", warning: "Unfamiliar in many parts of Europe and Asia" },
  { emoji: "🙏", gesture: "Folded Hands", meaning: "Prayer, gratitude, \"thank you\"", warning: "Three distinct readings depending on cultural context" },
  { emoji: "👏", gesture: "Clapping Hands", meaning: "Applause, approval", warning: "👏 between 👏 words signals sarcasm" },
];

export default function HandEmojiGuide() {
  return (
    <SectionShell
      n="09"
      id="hands"
      title="Hand Emoji Meanings — Gestures &amp; Cultural Warnings"
      count="12 gestures"
      dek="Hand emojis are the most culturally variable symbols in the vocabulary."
    >
      <AnimatedSection>
        <div className="fg-table-wrap">
          <table className="fg-table">
            <thead>
              <tr>
                <th>Emoji</th>
                <th>Gesture</th>
                <th>Core Meaning</th>
                <th>Cultural Warning</th>
              </tr>
            </thead>
            <tbody>
              {HANDS.map((h) => (
                <tr key={h.emoji}>
                  <td className="em">{h.emoji}</td>
                  <td className="strong whitespace-nowrap">{h.gesture}</td>
                  <td>{h.meaning}</td>
                  <td className={h.warning ? "t-accent" : "muted"} style={h.warning ? { color: "var(--accent)" } : undefined}>
                    {h.warning || "— none —"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <div className="fg-pull mt-10">
          <span className="fg-kicker">Watch Out · 👌</span>
          <p>In the US it means &ldquo;perfect.&rdquo; In Brazil and parts of Southern Europe it&apos;s a vulgar insult. No platform warns you.</p>
        </div>
      </AnimatedSection>
    </SectionShell>
  );
}
