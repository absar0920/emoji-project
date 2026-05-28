import { AnimatedSection } from "@/components/MotionWrappers";

const LAYERS = [
  { icon: "📜", title: "Official Unicode Definition", desc: "The formal name issued by the Unicode Consortium, the global standards body governing all emoji approvals." },
  { icon: "💬", title: "Real Conversational Usage", desc: "How people actually deploy it in texting, DMs, and comments." },
  { icon: "📱", title: "Platform Rendering", desc: "How Apple, Android, Samsung, and Meta each draw the same character differently — sometimes dramatically." },
  { icon: "👥", title: "Generational Reading", desc: "Millennials, Gen Z, and Boomers often interpret identical symbols in opposite ways." },
];

export default function WhatAreEmojiMeanings() {
  return (
    <section className="py-14 bg-white dark:bg-slate-900">
      <div className="max-w-5xl mx-auto px-4">
        <AnimatedSection>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-primary-dark dark:text-white mb-4">
            What Are Emoji Meanings?
          </h2>
          <p className="text-neutral-600 dark:text-slate-300 leading-relaxed mb-3 max-w-3xl">
            Emoji meanings are the official and real-world interpretations of pictogram symbols used in digital communication. Every emoji carries a formal name assigned by the Unicode Consortium — but what an emoji actually communicates is shaped by platform, generation, culture, and the relationship between sender and receiver.
          </p>
          <p className="text-neutral-600 dark:text-slate-300 leading-relaxed mb-8 max-w-3xl">
            Over <strong className="text-primary-dark dark:text-white">10 billion emojis</strong> are sent daily across messaging apps and social platforms, and a significant share land differently than the sender intended. Every emoji operates on four layers simultaneously:
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {LAYERS.map((layer, i) => (
            <AnimatedSection key={layer.title}>
              <div className="bg-neutral-50 dark:bg-slate-800 rounded-xl p-5 border border-neutral-100 dark:border-slate-700">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{layer.icon}</span>
                  <span className="text-xs font-bold text-primary uppercase tracking-wider">Layer {i + 1}</span>
                </div>
                <h3 className="font-bold text-primary-dark dark:text-white mb-1">{layer.title}</h3>
                <p className="text-sm text-neutral-600 dark:text-slate-400 leading-relaxed">{layer.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection>
          <p className="text-neutral-600 dark:text-slate-300 leading-relaxed mt-6 max-w-3xl">
            This guide covers all four layers across every major category, platform, and use case — including the slang readings that internet culture invents faster than any standards body can document.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
