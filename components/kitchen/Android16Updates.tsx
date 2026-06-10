import { KSection } from "./Section";

const UPDATES = [
  { icon: "🦊", title: "New Animal Hybrids", desc: "Pairings for several Unicode 16 animal and nature emojis — newer animals join the combination system for the first time." },
  { icon: "🍔", title: "Expanded Food Combos", desc: "Extended batch of cross-category pairings: food + face, food + object combinations previously unavailable." },
  { icon: "🪄", title: "More Blob Variants", desc: "The magic wand trick was refined to surface additional legacy blob designs — Google revisited the archived blob library." },
  { icon: "⚡", title: "Faster Suggestions", desc: "The suggestion row now appears faster after emoji selection — reduced latency between tapping and seeing results." },
  { icon: "📐", title: "More Visible Options", desc: "Visible sticker count rose from 4 to up to 6 at once, reducing horizontal scrolling." },
  { icon: "🔍", title: "Search Integration", desc: "Searching for an emoji by name now surfaces Kitchen suggestions alongside standard results." },
];

export default function Android16Updates() {
  return (
    <KSection kicker="What's New" title="Emoji Kitchen & Android 16 in 2026" dek="New combinations, faster suggestions, and expanded blob access.">
      <div className="fg-list">
        {UPDATES.map((u) => (
          <div key={u.title} className="fg-entry fg-entry--ledger">
            <span className="fg-entry__glyph" style={{ fontSize: "1.5rem" }}>{u.icon}</span>
            <div className="fg-entry__main">
              <span className="fg-entry__name">{u.title}</span>
              <p className="fg-entry__text">{u.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </KSection>
  );
}
