import { AnimatedSection } from "@/components/MotionWrappers";
import SectionShell from "./SectionShell";

export default function BottomLine() {
  return (
    <SectionShell tone="tint" eyebrow="Wrap-Up" title="The Bottom Line">
        <AnimatedSection>
          <div className="prose prose-neutral dark:prose-invert max-w-3xl -mt-4">
            <p>Emoji meanings operate across multiple layers simultaneously — and that is precisely what makes them worth understanding correctly. Official Unicode definition, cultural context, platform rendering, relationship history, and generational background all interact to form what a symbol actually communicates.</p>
            <p>The most important principle this guide establishes: <strong>emoji meanings are not fixed.</strong> They evolve continuously with internet culture, viral moments, generational shifts, and platform trends.</p>
            <p>Understanding the gap between what you meant and what someone received is how communication improves. Staying current with how symbols are actually used — not just officially defined — is how you stay fluent in the language people are genuinely speaking.</p>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <p className="text-xs text-neutral-400 dark:text-slate-600 mt-8 leading-relaxed max-w-3xl">
            Sources: Unicode Consortium Emoji Charts (unicode.org/emoji/charts), Unicode 16.0 Specification, Emojipedia (emojipedia.org), Meta/WhatsApp platform documentation, Apple and Google emoji design resources, NTT DoCoMo corporate history documentation, Unicode Emoji Subcommittee release notes. All Unicode version numbers, emoji counts, and platform availability data sourced from official documentation. Last reviewed: May 2026.
          </p>
        </AnimatedSection>
    </SectionShell>
  );
}
