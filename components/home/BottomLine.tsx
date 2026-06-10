import { AnimatedSection } from "@/components/MotionWrappers";
import SectionShell from "./SectionShell";

export default function BottomLine() {
  return (
    <SectionShell n="24" id="bottom-line" title="The Bottom Line">
      <AnimatedSection>
        <div className="fg-prose fg-cols2 max-w-4xl">
          <p className="fg-lead--cap">Emoji meanings operate across multiple layers simultaneously — and that is precisely what makes them worth understanding correctly. Official Unicode definition, cultural context, platform rendering, relationship history, and generational background all interact to form what a symbol actually communicates.</p>
          <p>The most important principle this guide establishes: <strong className="t-ink">emoji meanings are not fixed.</strong> They evolve continuously with internet culture, viral moments, generational shifts, and platform trends.</p>
          <p>Understanding the gap between what you meant and what someone received is how communication improves. Staying current with how symbols are actually used — not just officially defined — is how you stay fluent in the language people are genuinely speaking.</p>
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <p className="mono text-[0.7rem] leading-relaxed t-muted mt-12 max-w-3xl border-t border-[var(--line)] pt-5">
          Sources — Unicode Consortium Emoji Charts (unicode.org/emoji/charts), Unicode 16.0 Specification, Emojipedia (emojipedia.org), Meta/WhatsApp platform documentation, Apple and Google emoji design resources, NTT DoCoMo corporate history, Unicode Emoji Subcommittee release notes. All version numbers, counts, and availability data from official documentation. Last reviewed May 2026.
        </p>
      </AnimatedSection>
    </SectionShell>
  );
}
