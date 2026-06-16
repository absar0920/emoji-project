import { KSection } from "@/components/kitchen/Section";

const ROWS: [string, string, string, string, string][] = [
  ["Instagram", "150 chars", "2–4 emojis/line", "Aesthetic bio lines, caption closers, Story stickers", "More than 5 combos total — looks cluttered"],
  ["TikTok", "80 chars", "2–3 emojis max", "Bio personality signal, caption punch, comment reactions", "Long combo strings — bio space too limited"],
  ["Discord", "128 chars (status)", "3–5 emojis", "Status messages, channel names, server descriptions", "Unicode combos that render differently — test first"],
  ["Snapchat", "No bio — Stories & Snaps", "2–4 emojis", "Snap captions, Story text overlays, friend emojis", "Combos with fine detail — small display size"],
  ["WhatsApp", "139 chars (About)", "3–5 emojis", "Status messages, group reactions, About field", "Emoji 17.0 emojis — may not render on older Android"],
];

export default function ByPlatform() {
  return (
    <KSection
      kicker="Section 03"
      title="Emoji Combos by Platform"
      dek="Different cultures, character limits, and display environments — what actually works where."
    >
      <div className="fg-prose max-w-2xl mb-8">
        <p>A combo that works perfectly as a Discord status will feel out of place in an Instagram bio. Here is what actually works on each major platform — and what to avoid.</p>
      </div>

      <div className="fg-table-wrap">
        <table className="fg-table">
          <thead>
            <tr><th>Platform</th><th>Bio Limit</th><th>Best Length</th><th>Top Use Cases</th><th>Avoid</th></tr>
          </thead>
          <tbody>
            {ROWS.map((r) => (
              <tr key={r[0]}>
                <td className="strong whitespace-nowrap">{r[0]}</td>
                <td className="mono whitespace-nowrap">{r[1]}</td>
                <td className="muted whitespace-nowrap">{r[2]}</td>
                <td>{r[3]}</td>
                <td className="muted">{r[4]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="fg-pull fg-pull--sm mt-8">
        <span className="fg-kicker">Platform Note</span>
        <p>Funny combos land differently across platforms. What reads as dark humor on Twitter/X may feel out of place in a professional Slack channel. Match your combo energy to your audience and context.</p>
      </div>
    </KSection>
  );
}
