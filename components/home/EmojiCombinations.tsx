import { AnimatedSection } from "@/components/MotionWrappers";
import SectionShell from "./SectionShell";

const COMBOS = [
  { combo: "🥺👉👈", meaning: "Maximum vulnerability plea — shy, irresistible ask", origin: "Twitter/X ~2019" },
  { combo: "💀😭", meaning: "Dying of laughter while completely overwhelmed", origin: "Gen Z internet, TikTok 2021–2022" },
  { combo: "✨💕", meaning: "Sparkling warm affection — magical love energy", origin: "Instagram creator culture, 2020+" },
  { combo: "💅✨", meaning: "\"I am unbothered and I look great\"", origin: "Instagram & TikTok confidence culture" },
  { combo: "😭🙏", meaning: "Desperate gratitude or overwhelmed appreciation", origin: "Global WhatsApp & iMessage" },
  { combo: "💀🙏", meaning: "\"This killed me and now I'm praying\"", origin: "Discord & TikTok, 2022–2023" },
  { combo: "🙈❤️", meaning: "Bashful love — \"I shouldn't say this but here it is\"", origin: "WhatsApp, iMessage flirting" },
  { combo: "🤌💯", meaning: "Absolutely perfect — no notes, flawless", origin: "TikTok international spread, 2022–2024" },
  { combo: "🫠😭", meaning: "Complete melting overwhelm — total dissolution", origin: "Discord & Twitter/X, 2022+" },
  { combo: "😮‍💨✨", meaning: "Exhale of relief — \"we made it\"", origin: "TikTok, 2023+" },
];

export default function EmojiCombinations() {
  return (
    <SectionShell
      n="13"
      id="combos"
      title="Emoji Combination Meanings"
      count="10 combos"
      dek="Combinations generate meanings that neither symbol carries alone."
    >
      <AnimatedSection>
        <div className="fg-list">
          {COMBOS.map((c) => (
            <div key={c.combo} className="fg-entry">
              <span className="fg-entry__glyph" style={{ width: "4rem", fontSize: "1.55rem" }}>{c.combo}</span>
              <div className="fg-entry__main">
                <p className="fg-entry__text t-ink">{c.meaning}</p>
                <p className="fg-entry__meta">Origin — {c.origin}</p>
              </div>
            </div>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <dl className="fg-deflist mt-10 max-w-3xl border-t-2 border-[var(--rule)] pt-6">
          <dt>👉👈</dt>
          <dd>Two index fingers pointing toward each other — shorthand for shyness, nervous hesitation, or gentle pleading. Pairs almost automatically with 🥺 for amplified effect.</dd>
          <dt>💀😭</dt>
          <dd>Extreme emotional overwhelm — usually laughter so intense the sender describes it as fatal. Something simultaneously hilarious and completely devastating, in the best way.</dd>
        </dl>
      </AnimatedSection>
    </SectionShell>
  );
}
