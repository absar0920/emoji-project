import { AnimatedSection } from "@/components/MotionWrappers";
import { StatStrip } from "./parts";

const STATS = [
  { value: "3,800+", label: "Official Unicode emojis" },
  { value: "10B+", label: "Emojis sent every day" },
  { value: "92%", label: "Of the online population" },
  { value: "$790M", label: "Maker market, 2026" },
];

export default function IntroLead() {
  return (
    <AnimatedSection>
      <section className="mt-14 pt-9 border-t-2 border-[var(--rule)]">
        <p className="fg-kicker mb-4">The Complete Guide · 2026</p>
        <h2 className="font-display t-ink leading-[1.05] tracking-[-0.015em] text-[1.9rem] sm:text-[2.6rem] mb-3 max-w-3xl">
          The Complete Guide to Custom Emoji Creation
        </h2>
        <p className="mono text-[0.66rem] uppercase tracking-[0.16em] t-muted mb-8">
          Updated June 2026 · 5,000 words · 18 min read
        </p>

        <div className="fg-pull">
          <p>
            You scroll through thousands of official Unicode emojis looking for exactly the right
            reaction. Nothing fits. You settle for a thumbs up. That disconnect — between what you
            feel and what the keyboard offers — is precisely why the emoji maker category now serves
            hundreds of millions of users worldwide.
          </p>
        </div>

        <StatStrip stats={STATS} />

        <div className="fg-lead max-w-2xl">
          <p>
            Custom emoji creation has moved from niche hobby into a standard layer of how communities,
            brands, and individuals communicate online. This guide covers how emoji makers work at a
            technical level, which tool types serve which goals, a complete nine-step creation
            process, platform-specific export needs, the errors that frequently damage designs, and
            the professional techniques that separate excellent emoji from poor ones.
          </p>
        </div>
      </section>
    </AnimatedSection>
  );
}
