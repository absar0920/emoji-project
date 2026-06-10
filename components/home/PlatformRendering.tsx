import { AnimatedSection } from "@/components/MotionWrappers";
import SectionShell from "./SectionShell";

const RENDERING = [
  { emoji: "😬", apple: "Slightly strained — mild cringe", google: "Moderately uncomfortable", samsung: "Most teeth showing — most alarmed", meta: "More alarmed than Apple" },
  { emoji: "🙂", apple: "Small warm smile — reads polite", google: "Fairly warm", samsung: "Slightly more upturned", meta: "Noticeably warmer than Apple" },
  { emoji: "😌", apple: "Closed eyes, soft expression", google: "Close to Apple", samsung: "Slightly different softness", meta: "Close to Apple" },
  { emoji: "😍", apple: "Large heart eyes", google: "Similar to Apple", samsung: "Stars in some versions", meta: "Similar to Apple" },
  { emoji: "👍", apple: "Angled fist, realistic", google: "Flatter graphic design", samsung: "More stylized", meta: "Rounder, more graphic" },
];

export default function PlatformRendering() {
  return (
    <SectionShell
      n="18"
      id="rendering"
      title="Apple vs. Android vs. Samsung vs. WhatsApp"
      dek="The same emoji can look strikingly different across devices — and visual differences carry emotional weight."
    >
      <AnimatedSection>
        <div className="fg-table-wrap">
          <table className="fg-table">
            <thead>
              <tr><th>Emoji</th><th>Apple (iOS)</th><th>Google</th><th>Samsung</th><th>WhatsApp / Meta</th></tr>
            </thead>
            <tbody>
              {RENDERING.map((row) => (
                <tr key={row.emoji}>
                  <td className="em">{row.emoji}</td>
                  <td className="muted">{row.apple}</td>
                  <td className="muted">{row.google}</td>
                  <td className="muted">{row.samsung}</td>
                  <td className="muted">{row.meta}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <div className="fg-pull fg-pull--sm mt-10">
          <span className="fg-kicker">Practical Guidance</span>
          <p>When emotional precision matters, remember subtle faces — 😬 😌 🙂 — may render differently on the receiver&apos;s device. When in doubt, use words alongside the symbol.</p>
        </div>
      </AnimatedSection>
    </SectionShell>
  );
}
