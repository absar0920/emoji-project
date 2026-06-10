import { AnimatedSection } from "@/components/MotionWrappers";
import SectionShell from "./SectionShell";

const MILESTONES = [
  { year: "1999", title: "First Emojis Created", desc: "Shigetaka Kurita at NTT DoCoMo designed 176 symbols (12×12 pixels) for Japanese pagers and early mobile internet." },
  { year: "2010", title: "Unicode Standardization", desc: "Cross-platform emoji exchange became possible globally. A 🥺 sent from iPhone now renders correctly on Android." },
  { year: "2026", title: "3,600+ Emojis", desc: "The Unicode Consortium has approved over 3,600 emojis under Unicode 16.0, spanning every major category." },
];

export default function EmojiOriginHistory() {
  return (
    <SectionShell n="03" id="origin" title="What Is an Emoji? Origin &amp; History">
      <AnimatedSection>
        <div className="fg-prose max-w-3xl">
          <p className="fg-lead fg-lead--cap">
            An emoji is a standardized graphic pictogram governed by the Unicode standard. The <strong className="t-ink">Unicode Consortium</strong> — a global non-profit — controls all approvals, assigns each symbol a unique codepoint, and releases additions on an annual cycle.
          </p>
        </div>

        <ol className="fg-steps mt-9 max-w-3xl">
          {MILESTONES.map((m) => (
            <li key={m.year} className="fg-step">
              <span className="fg-step__n tabular-nums" style={{ width: "4.75rem" }}>{m.year}</span>
              <div>
                <h3 className="fg-step__h">{m.title}</h3>
                <p className="fg-step__t">{m.desc}</p>
              </div>
            </li>
          ))}
        </ol>

        <dl className="fg-deflist mt-10 max-w-3xl border-t-2 border-[var(--rule)] pt-6">
          <p className="fg-kicker mb-1">Emoji vs. Emoticon</p>
          <dt>Emoticon</dt>
          <dd>Text symbols assembled from keyboard characters — like :-) or :( — used in early internet communication to suggest emotion.</dd>
          <dt>Emoji</dt>
          <dd>Standardized graphic pictograms displayed as colorful images and governed by an international standard.</dd>
          <dd className="!mt-3 italic t-muted">Same communicative purpose. Completely different technology, visual form, and cultural weight.</dd>
        </dl>
      </AnimatedSection>
    </SectionShell>
  );
}
