import { AnimatedSection } from "@/components/MotionWrappers";
import { StatStrip } from "./parts";

const STATS = [
  { value: "10B+", label: "Emojis sent per day globally" },
  { value: "3,950+", label: "Standard Unicode emojis in 2026" },
  { value: "92%", label: "Online users who use emojis" },
  { value: "163", label: "New emojis in Unicode 17.0" },
];

const TOC = [
  "What Is Text to Emoji and How Does It Work",
  "Text to Emoji Converter: Best Free Tools in 2026",
  "Text to Emoji Letters & Alphabet Generator",
  "How to Convert Text to Emoji — Step by Step",
  "How to Remove Emoji from Text",
  "How to Add or Respond to Text with Emoji",
  "Text to Emoji on Discord: Auto-Convert Settings",
  "Emoji Meaning in Text — What Common Combos Mean",
  "Text to Speech with Emoji (Group Chat, Roblox, Xbox)",
  "Frequently Asked Questions",
];

export default function IntroLead() {
  return (
    <AnimatedSection>
      <section className="mt-14 pt-9 border-t-2 border-[var(--rule)]">
        <p className="fg-kicker mb-4">The Complete Guide · 2026</p>
        <h2 className="font-display t-ink leading-[1.05] tracking-[-0.015em] text-[1.9rem] sm:text-[2.6rem] mb-3 max-w-3xl">
          Converting, Creating &amp; Using Emoji Text
        </h2>
        <p className="mono text-[0.66rem] uppercase tracking-[0.16em] t-muted mb-8">
          Updated June 2026 · 5,200+ words · Tools + Code · All Platforms
        </p>

        <StatStrip stats={STATS} />

        <div className="fg-lead max-w-2xl mb-9">
          <p>
            Whether you want to convert text to emoji for a Discord bio, turn your words into fun
            emoji letters for Instagram, or strip emoji from a string of Python data — this guide
            covers every method, tool, and platform for text-to-emoji conversion in 2026, from casual
            copy-paste tricks to developer-grade code snippets.
          </p>
        </div>

        <div className="fg-pull fg-pull--sm">
          <span className="fg-kicker">Contents</span>
          <ol className="mt-2 space-y-1.5 list-none">
            {TOC.map((t, i) => (
              <li key={i} className="flex gap-3 t-body font-read not-italic text-base leading-snug">
                <span className="mono t-accent text-[0.72rem] tabular-nums shrink-0 pt-0.5">{String(i + 1).padStart(2, "0")}</span>
                <span>{t}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </AnimatedSection>
  );
}
