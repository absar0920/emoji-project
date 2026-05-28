import { AnimatedSection } from "@/components/MotionWrappers";

const SYMBOLS = [
  { symbol: "‼️", context: "Universal", meaning: "Urgency, shock, emphasis", note: "Gen Z also uses for ironic theatrical emphasis" },
  { symbol: ")) or )", context: "Russian/E. European texting", meaning: "Smile or laughter — a text emoticon tradition", note: "Common in WhatsApp from CIS-region users" },
  { symbol: "^^ or ^_^", context: "East Asian internet", meaning: "Happy, pleased, smiling", note: "From Japanese and Korean online culture" },
  { symbol: ".-. or ._.", context: "Western internet", meaning: "Uncomfortable, awkward, deadpan", note: "Signals mild distress or social unease" },
  { symbol: ">:(", context: "Universal", meaning: "Angry or frustrated", note: "Classic text emoticon still in use" },
  { symbol: ":'(", context: "Universal", meaning: "Crying, sad, genuinely emotional", note: "Classic emoticon for real sadness" },
  { symbol: "〽️", context: "Japanese", meaning: "Part Alternation Mark — karaoke notation", note: "Frequently searched by non-Japanese users" },
  { symbol: "⚜️", context: "Universal", meaning: "French royalty, New Orleans Saints, prestige", note: "Elegance, luxury, fleur-de-lis symbolism" },
  { symbol: "💢", context: "Universal", meaning: "Anger — vein-popping symbol from manga", note: "Frustration, explosive irritation" },
  { symbol: "🔴🔵🟡", context: "Universal", meaning: "Colored circles — often used as bullet points", note: "Context-dependent; common in project management" },
];

export default function SymbolEmojis() {
  return (
    <section className="py-14 bg-white dark:bg-slate-900">
      <div className="max-w-5xl mx-auto px-4">
        <AnimatedSection>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-primary-dark dark:text-white mb-2">
            Symbol Emoji Meanings — ‼️ )) 〽️ and More
          </h2>
          <p className="text-neutral-500 dark:text-slate-400 mb-8">Punctuation marks, keyboard symbols, and text emoticons that most guides never cover</p>
        </AnimatedSection>

        <AnimatedSection>
          <div className="overflow-x-auto rounded-xl border border-neutral-200 dark:border-slate-700 mb-8">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-neutral-100 dark:bg-slate-700 text-left">
                  <th className="px-4 py-3 font-bold text-primary-dark dark:text-white">Symbol</th>
                  <th className="px-4 py-3 font-bold text-primary-dark dark:text-white">Context</th>
                  <th className="px-4 py-3 font-bold text-primary-dark dark:text-white">Meaning</th>
                  <th className="px-4 py-3 font-bold text-primary-dark dark:text-white">Notes</th>
                </tr>
              </thead>
              <tbody>
                {SYMBOLS.map((row, i) => (
                  <tr key={row.symbol} className={i % 2 === 0 ? "bg-white dark:bg-slate-800" : "bg-neutral-50 dark:bg-slate-800/50"}>
                    <td className="px-4 py-3 font-mono text-lg">{row.symbol}</td>
                    <td className="px-4 py-3 text-neutral-500 dark:text-slate-400 text-xs">{row.context}</td>
                    <td className="px-4 py-3 font-medium text-primary-dark dark:text-white">{row.meaning}</td>
                    <td className="px-4 py-3 text-xs text-neutral-400 dark:text-slate-500">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <div className="bg-violet-50 dark:bg-violet-950/30 border-l-4 border-accent-violet rounded-r-xl p-5">
            <h3 className="font-bold text-primary-dark dark:text-white mb-1">💡 Why ‼️ Is One of the Most Searched Symbols</h3>
            <p className="text-sm text-neutral-600 dark:text-slate-300 leading-relaxed">The Double Exclamation Mark signals genuine urgency when used sincerely (&ldquo;CALL ME NOW ‼️&rdquo;), but in Gen Z texting it is frequently deployed for ironic theatrical emphasis — treating something minor as dramatically important.</p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
