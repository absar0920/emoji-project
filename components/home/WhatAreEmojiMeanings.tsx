import { AnimatedSection } from "@/components/MotionWrappers";
import SectionShell from "./SectionShell";

const LAYERS = [
  { n: "01", title: "Official Unicode Definition", desc: "The formal name issued by the Unicode Consortium, the global standards body governing all emoji approvals." },
  { n: "02", title: "Real Conversational Usage", desc: "How people actually deploy it in texting, DMs, and comments." },
  { n: "03", title: "Platform Rendering", desc: "How Apple, Android, Samsung, and Meta each draw the same character differently — sometimes dramatically." },
  { n: "04", title: "Generational Reading", desc: "Millennials, Gen Z, and Boomers often interpret identical symbols in opposite ways." },
];

export default function WhatAreEmojiMeanings() {
  return (
    <SectionShell n="01" id="what-are" title="What Are Emoji Meanings?">
      <AnimatedSection>
        <div className="fg-prose max-w-3xl">
          <p className="fg-lead fg-lead--cap mb-5">
            Emoji meanings are the official and real-world interpretations of pictogram symbols used in digital communication. Every emoji carries a formal name assigned by the Unicode Consortium — but what an emoji actually communicates is shaped by platform, generation, culture, and the relationship between sender and receiver.
          </p>
          <p>
            Over <strong className="t-ink">10 billion emojis</strong> are sent daily across messaging apps and social platforms, and a significant share land differently than the sender intended. Every emoji operates on four layers simultaneously:
          </p>
        </div>

        <ol className="fg-steps mt-9 max-w-3xl">
          {LAYERS.map((l) => (
            <li key={l.n} className="fg-step">
              <span className="fg-step__n">{l.n}</span>
              <div>
                <h3 className="fg-step__h">{l.title}</h3>
                <p className="fg-step__t">{l.desc}</p>
              </div>
            </li>
          ))}
        </ol>

        <p className="fg-prose max-w-3xl mt-9">
          This guide covers all four layers across every major category, platform, and use case — including the slang readings that internet culture invents faster than any standards body can document.
        </p>
      </AnimatedSection>
    </SectionShell>
  );
}
