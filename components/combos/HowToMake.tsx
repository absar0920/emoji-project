import { KSection } from "@/components/kitchen/Section";

const STEPS: [string, string][] = [
  ["Start with an emotion or vibe, not a topic", "The most effective combos communicate a feeling, not just a subject. “Summer” as a topic gives you 🌞🌊🍦. “That specific feeling of a hot afternoon with nowhere to be” gives you 🌊☀️🍋🌿 — more specific, more memorable, more shareable. Nail the feeling first."],
  ["Pick your anchor emoji first", "Every strong combo has one lead emoji that carries the core meaning; everything else supports it. If your combo is about a cozy night in, the anchor might be 🕯️ or 🛁. Build outward from there — what textures, colors, or feelings surround that anchor?"],
  ["Keep it between 2 and 5 emojis", "Two-emoji combos are punchy and immediate. Three is the sweet spot for most bios and captions. Four works when there's a clear rhythm. Five is the maximum before it becomes noise — more than five in a row almost always loses the reader's focus."],
  ["Test it in the actual context", "A combo that looks good in a notes app can read differently in an Instagram bio field or a Discord status. Paste it where it will actually live before committing, and check that it renders correctly on both iOS and Android — some emojis display differently across platforms."],
  ["Use color harmony as a guide", "Emojis have dominant colors, and combos where the colors flow naturally feel more cohesive. Pink combos (🌸💗🍥), dark combos (🖤🌑🦇), and golden combos (⭐🌻🍯) each create a distinct palette. Clashing colors — say, 🍎🌊🟡 — feel random rather than intentional."],
];

export default function HowToMake() {
  return (
    <KSection
      kicker="Section 02"
      title="How to Make Your Own Emoji Combos"
      dek="Less technical skill, more the logic of visual communication at small scale."
    >
      <ol className="fg-steps mb-8">
        {STEPS.map(([title, body], i) => (
          <li key={i} className="fg-step">
            <span className="fg-step__n tabular-nums">{i + 1}</span>
            <div>
              <h3 className="fg-step__h">{title}</h3>
              <p className="fg-step__t">{body}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="fg-pull fg-pull--sm">
        <span className="fg-kicker">Pro Tip</span>
        <p>
          Browse by color or category using an emoji keyboard or your phone’s emoji search. Filtering
          by “yellow emojis” or “nature emojis” speeds up the combo-building process significantly.
        </p>
      </div>
    </KSection>
  );
}
