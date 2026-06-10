import { AnimatedSection } from "@/components/MotionWrappers";
import SectionShell from "./SectionShell";

const TOP_EMOJIS = [
  { rank: 1, emoji: "😂", platform: "WhatsApp, Facebook", demo: "Millennials, Gen X, Boomers" },
  { rank: 2, emoji: "❤️", platform: "All platforms", demo: "Universal" },
  { rank: 3, emoji: "🤣", platform: "WhatsApp, Messenger", demo: "Millennials" },
  { rank: 4, emoji: "👍", platform: "WhatsApp, iMessage", demo: "Universal" },
  { rank: 5, emoji: "😭", platform: "TikTok, Twitter/X", demo: "Gen Z (positive overwhelm)" },
  { rank: 6, emoji: "🙏", platform: "WhatsApp, iMessage", demo: "Universal" },
  { rank: 7, emoji: "😘", platform: "WhatsApp, iMessage", demo: "Universal (romantic)" },
  { rank: 8, emoji: "🥰", platform: "Instagram, iMessage", demo: "Millennials, Gen Z" },
  { rank: 9, emoji: "😍", platform: "Instagram, TikTok", demo: "Universal" },
  { rank: 10, emoji: "😊", platform: "WhatsApp, iMessage", demo: "Universal" },
  { rank: 11, emoji: "🔥", platform: "Instagram, Twitter/X", demo: "Universal" },
  { rank: 12, emoji: "💀", platform: "TikTok, Discord", demo: "Gen Z" },
  { rank: 13, emoji: "✨", platform: "Instagram, TikTok", demo: "Millennials, Gen Z" },
  { rank: 14, emoji: "💕", platform: "WhatsApp, iMessage", demo: "Universal" },
  { rank: 15, emoji: "🥺", platform: "TikTok, Instagram", demo: "Gen Z, younger Millennials" },
];

export default function MostUsedGlobally() {
  return (
    <SectionShell
      n="05"
      id="most-used"
      title="Most Used Emojis Globally in 2026"
      count="Top 15"
      dek="Ranked by send volume across all major platforms."
    >
      <AnimatedSection>
        <div className="fg-list">
          {TOP_EMOJIS.map((item) => (
            <div key={item.rank} className="fg-entry fg-entry--ledger">
              <span className="mono t-muted text-[0.7rem] w-5 shrink-0 pt-2 tabular-nums">{String(item.rank).padStart(2, "0")}</span>
              <span className="fg-entry__glyph">{item.emoji}</span>
              <div className="fg-entry__main">
                <span className="fg-entry__name">{item.platform}</span>
                <p className="fg-entry__text">{item.demo}</p>
              </div>
            </div>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <div className="fg-pull fg-pull--sm mt-10">
          <span className="fg-kicker">The Defining Shift</span>
          <p>
            😂 is still the most-sent emoji on earth — but Gen Z moved to 💀 as the honest laughter signal around 2022, because 😂 had begun to feel performative: sent to <em>show</em> you laughed rather than because you did.
          </p>
        </div>
      </AnimatedSection>
    </SectionShell>
  );
}
