import { AnimatedSection } from "@/components/MotionWrappers";
import SectionShell from "./SectionShell";

const SLANG = [
  { emoji: "💀", official: "Skull", slang: "Dying of laughter", origin: "Gen Z internet, ~2021" },
  { emoji: "🚩", official: "Triangular Flag", slang: "Red flag — warning sign", origin: "Twitter/X dating culture, 2021" },
  { emoji: "🧢", official: "Billed Cap", slang: "\"Cap\" = lie; \"no cap\" = no lie", origin: "AAVE, spread through rap and TikTok" },
  { emoji: "💅", official: "Nail Polish", slang: "Unbothered, confident, glamorous dismissal", origin: "Drag and LGBTQ+ culture" },
  { emoji: "🌽", official: "Ear of Corn", slang: "Adult content (censorship workaround)", origin: "Platform content moderation bypass" },
  { emoji: "🐍", official: "Snake", slang: "Two-faced, untrustworthy person", origin: "Taylor Swift fan culture, 2016" },
  { emoji: "🤡", official: "Clown", slang: "\"I am the fool in this situation\"", origin: "Reddit/Twitter self-aware culture" },
  { emoji: "🫖", official: "Teapot", slang: "\"Tea\" = gossip; \"spill the tea\"", origin: "Black and LGBTQ+ internet culture" },
  { emoji: "🥵", official: "Hot Face", slang: "That person is physically attractive", origin: "TikTok thirst culture" },
  { emoji: "🫀", official: "Anatomical Heart", slang: "Deep visceral love — more intense than ❤️", origin: "TikTok emotional expression, 2022+" },
];

export default function InternetSlangEmojis() {
  return (
    <SectionShell
      n="14"
      id="slang"
      title="Internet Slang &amp; Emoji Meanings"
      count="10 terms"
      dek="Cultural meanings that internet slang created — found in no official standard."
    >
      <AnimatedSection>
        <div className="fg-list">
          {SLANG.map((item) => (
            <div key={item.emoji} className="fg-entry fg-entry--ledger">
              <span className="fg-entry__glyph">{item.emoji}</span>
              <div className="fg-entry__main">
                <span className="fg-entry__name">{item.official}</span>
                <div>
                  <p className="fg-entry__text t-ink">{item.slang}</p>
                  <p className="fg-entry__meta">Origin — {item.origin}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <dl className="fg-deflist mt-10 max-w-3xl border-t-2 border-[var(--rule)] pt-6">
          <dt>🚩 in texting</dt>
          <dd>A warning sign — a character flaw, suspicious behavior, or concerning pattern. Went viral for relationship red flags on Twitter/X in 2021. 🚩🚩🚩 means multiple serious warnings.</dd>
          <dt>💅 in texting</dt>
          <dd>Unbothered confidence — &ldquo;this does not affect me, and I look great while not being affected.&rdquo; From LGBTQ+ and drag culture, spread through TikTok and Instagram.</dd>
        </dl>
      </AnimatedSection>
    </SectionShell>
  );
}
