import { KSection } from "@/components/kitchen/Section";

const FEATURES = [
  { dt: "Component library depth", dd: "The range of eyes, accessories, hairstyles, and overlays determines how distinctive your emoji can look. A tool with fifty eye options produces genuinely unique results; a tool with five produces emoji that look like everyone else's." },
  { dt: "Full layer control", dd: "A proper editor gives you complete layer management: move, resize, rotate, copy, paste, and reorder every component independently. Without it, changing one component means rebuilding the whole design." },
  { dt: "Photo-to-emoji", dd: "Upload a photo and the tool maps it to a stylized template, letting you layer emoji components on top — the fastest route to a recognizable personal emoji." },
  { dt: "Animated output", dd: "Static images lack the expressiveness of animated GIF output. Motion arcs, loop length, and frame rate can all be meaningfully controlled with the best tools." },
  { dt: "Background removal", dd: "Any emoji uploaded to Discord, Slack, or Twitch needs a transparent background to look clean in both dark and light mode. Built-in removal saves the extra step." },
  { dt: "Platform export presets", dd: "Each platform has its own file-size limits, pixel dimensions, and supported formats. Export presets let you pick the destination and the tool handles the specifications automatically." },
];

const EXPORT: [string, string, string, string][] = [
  ["Discord (Static)", "256 KB", "128 × 128 px", "PNG, JPG"],
  ["Discord (Animated)", "256 KB", "128 × 128 px", "GIF, WebP"],
  ["Slack", "128 KB", "128 × 128 px", "PNG, JPG, GIF"],
  ["Twitch (Static)", "1 MB", "28, 56, 112 px", "PNG"],
  ["Twitch (Animated)", "3 MB", "112 × 112 px max", "GIF"],
  ["WhatsApp Sticker", "100 KB", "512 × 512 px", "WebP"],
  ["Telegram Sticker", "512 KB", "512 × 512 px", "WebP, PNG"],
];

const ANIM: [string, string, string][] = [
  ["Nodding", "Agreement, approval, affirmation", "GIF"],
  ["Blinking", "Calm acknowledgment, subtle humor", "GIF"],
  ["Shaking", "Disagreement, nervous energy, denial", "GIF"],
  ["Zoom pulse", "Excitement, celebration, emphasis", "GIF or WebP"],
  ["Idle bounce", "General expression, mascot loops", "GIF or WebP"],
];

export default function FeaturesAndExport() {
  return (
    <KSection
      kicker="Section 03"
      title="Key Features, Export Specs &amp; Animation"
      dek="The capabilities that separate functional tools from excellent ones — and the numbers every platform enforces."
    >
      <dl className="fg-deflist border-t border-[var(--line)] mb-10">
        {FEATURES.map((f) => (
          <div key={f.dt}><dt>{f.dt}</dt><dd>{f.dd}</dd></div>
        ))}
      </dl>

      <p className="fg-label mb-3">Platform-specific export requirements</p>
      <div className="fg-table-wrap mb-9">
        <table className="fg-table">
          <thead>
            <tr><th>Platform</th><th>Max File Size</th><th>Recommended Dimensions</th><th>Accepted Formats</th></tr>
          </thead>
          <tbody>
            {EXPORT.map((r) => (
              <tr key={r[0]}>
                <td className="strong whitespace-nowrap">{r[0]}</td>
                <td className="mono">{r[1]}</td>
                <td className="mono">{r[2]}</td>
                <td className="muted">{r[3]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="fg-label mb-3">Animation style reference</p>
      <div className="fg-table-wrap">
        <table className="fg-table">
          <thead>
            <tr><th>Animation Style</th><th>Best Use Case</th><th>Recommended Format</th></tr>
          </thead>
          <tbody>
            {ANIM.map((r) => (
              <tr key={r[0]}>
                <td className="strong whitespace-nowrap">{r[0]}</td>
                <td>{r[1]}</td>
                <td className="muted whitespace-nowrap">{r[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </KSection>
  );
}
