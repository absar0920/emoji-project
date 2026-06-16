import { AnimatedSection } from "@/components/MotionWrappers";
import { StatStrip } from "./parts";

const STATS = [
  { value: "200+", label: "Copy-paste combos in this guide" },
  { value: "10B+", label: "Emojis sent globally every day" },
  { value: "92%", label: "Of online users use emojis" },
  { value: "48%", label: "Higher engagement with combos" },
];

export default function IntroLead() {
  return (
    <AnimatedSection>
      <section className="mt-14 pt-9 border-t-2 border-[var(--rule)]">
        <p className="fg-kicker mb-4">The Complete Guide · 2026</p>
        <h2 className="font-display t-ink leading-[1.05] tracking-[-0.015em] text-[1.9rem] sm:text-[2.6rem] mb-3 max-w-3xl">
          200+ Best Combos to Copy &amp; Paste
        </h2>
        <p className="mono text-[0.66rem] uppercase tracking-[0.16em] t-muted mb-8">
          Updated June 2026 · 5,200 words · 20 min read
        </p>

        <div className="fg-pull">
          <p>
            Single emojis are fine. Emoji combos are a whole other language. The right sequence of
            two, three, or four emojis can say in a glance what a sentence takes ten words to express
            — and it can do it with personality, aesthetic, and vibe all built in.
          </p>
        </div>

        <StatStrip stats={STATS} />

        <div className="fg-lead max-w-2xl">
          <p>
            Whether you need cute combos for your Instagram bio, funny combos for a group chat,
            aesthetic combos for your TikTok captions, or seasonal combos for Halloween and Christmas
            — this guide has every category, fully organized and copy-paste ready in the browser above.
          </p>
        </div>
      </section>
    </AnimatedSection>
  );
}
