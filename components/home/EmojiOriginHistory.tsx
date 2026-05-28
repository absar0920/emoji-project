import { AnimatedSection } from "@/components/MotionWrappers";

const MILESTONES = [
  { year: "1999", title: "First Emojis Created", desc: "Shigetaka Kurita at NTT DoCoMo designed 176 symbols (12×12 pixels) for Japanese pagers and early mobile internet." },
  { year: "2010", title: "Unicode Standardization", desc: "Cross-platform emoji exchange became possible globally. A 🥺 sent from iPhone now renders correctly on Android." },
  { year: "2026", title: "3,600+ Emojis", desc: "The Unicode Consortium has approved over 3,600 emojis under Unicode 16.0, spanning every major category." },
];

export default function EmojiOriginHistory() {
  return (
    <section className="py-14 bg-white dark:bg-slate-900">
      <div className="max-w-5xl mx-auto px-4">
        <AnimatedSection>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-primary-dark dark:text-white mb-4">
            What Is an Emoji? Origin, History & How the Standard Works
          </h2>
          <p className="text-neutral-600 dark:text-slate-300 leading-relaxed mb-8 max-w-3xl">
            An emoji is a standardized graphic pictogram governed by the Unicode standard. The <strong className="text-primary-dark dark:text-white">Unicode Consortium</strong> — a global non-profit — controls all approvals, assigns each symbol a unique codepoint, and releases additions on an annual cycle.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {MILESTONES.map((m) => (
            <AnimatedSection key={m.year}>
              <div className="bg-neutral-50 dark:bg-slate-800 rounded-xl p-5 border border-neutral-100 dark:border-slate-700">
                <span className="text-2xl font-extrabold text-primary">{m.year}</span>
                <h3 className="font-bold text-primary-dark dark:text-white mt-2 mb-1">{m.title}</h3>
                <p className="text-sm text-neutral-600 dark:text-slate-400 leading-relaxed">{m.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection>
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border-l-4 border-primary rounded-r-xl p-5">
            <h3 className="font-bold text-primary-dark dark:text-white mb-1">Emoji vs. Emoticon — What Is the Difference?</h3>
            <p className="text-sm text-neutral-600 dark:text-slate-300 leading-relaxed">
              Emoticons are text symbols assembled from keyboard characters — like :-) or :( — used in early internet communication. Emojis are standardized graphic pictograms displayed as colorful images and governed by an international standard. Same communicative purpose. Completely different technology, visual form, and cultural weight.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
