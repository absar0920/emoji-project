import { AnimatedSection } from "@/components/MotionWrappers";
import SectionShell from "./SectionShell";

const SYMBOLS = [
  { symbol: "‼️", context: "Universal", meaning: "Urgency, shock, emphasis", note: "Gen Z also uses for ironic theatrical emphasis" },
  { symbol: ")) or )", context: "Russian / E. European", meaning: "Smile or laughter — a text emoticon tradition", note: "Common in WhatsApp from CIS-region users" },
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
    <SectionShell
      n="15"
      id="symbols"
      title="Symbol Emoji Meanings — ‼️ )) 〽️ and More"
      dek="Punctuation marks, keyboard symbols, and text emoticons that most guides never cover."
    >
      <AnimatedSection>
        <div className="fg-table-wrap">
          <table className="fg-table">
            <thead>
              <tr><th>Symbol</th><th>Context</th><th>Meaning</th><th>Notes</th></tr>
            </thead>
            <tbody>
              {SYMBOLS.map((row) => (
                <tr key={row.symbol}>
                  <td className="mono t-ink whitespace-nowrap" style={{ fontSize: "0.95rem" }}>{row.symbol}</td>
                  <td className="muted whitespace-nowrap">{row.context}</td>
                  <td className="strong">{row.meaning}</td>
                  <td className="muted">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <div className="fg-pull fg-pull--sm mt-10">
          <span className="fg-kicker">Most Searched</span>
          <p>‼️ signals genuine urgency when sincere (&ldquo;CALL ME NOW ‼️&rdquo;) — but in Gen Z texting it&apos;s ironic theatrical emphasis, treating something minor as dramatically important.</p>
        </div>
      </AnimatedSection>
    </SectionShell>
  );
}
