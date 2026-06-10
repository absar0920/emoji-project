import { AnimatedSection } from "@/components/MotionWrappers";
import SectionShell from "./SectionShell";

const NEW_EMOJIS = [
  { emoji: "🫩", name: "Face w/ Bags Under Eyes", meaning: "Exhaustion, sleep deprivation, tired humor", availability: "iOS 18+, Android 15+" },
  { emoji: "🪮", name: "Hair Pick", meaning: "Grooming, Black hair care culture", availability: "iOS 18+, Android 15+" },
  { emoji: "🐦‍🔥", name: "Phoenix", meaning: "Rebirth, resilience, rising from difficulty", availability: "iOS 18+, Android 15+" },
  { emoji: "🍋‍🟩", name: "Lime", meaning: "Citrus, cocktails — finally distinct from 🍋 lemon", availability: "iOS 17.4+, Android 14+" },
  { emoji: "🪭", name: "Folding Hand Fan", meaning: "Heat, elegance, traditional Asian culture", availability: "iOS 17.4+, Android 14+" },
  { emoji: "🪈", name: "Flute", meaning: "Music, classical instruments", availability: "iOS 17.4+, Android 14+" },
  { emoji: "🪇", name: "Maracas", meaning: "Latin music, celebration, rhythm", availability: "iOS 17.4+, Android 14+" },
  { emoji: "🫏", name: "Donkey", meaning: "Stubbornness, political symbolism", availability: "iOS 17+, Android 14+" },
];

export default function NewEmojis2026() {
  return (
    <SectionShell
      n="20"
      id="new-2026"
      title="New Emojis in 2026 — Unicode 15.1 &amp; 16.0"
      count="8 new"
      dek="The latest additions to the emoji vocabulary."
    >
      <AnimatedSection>
        <div className="fg-list">
          {NEW_EMOJIS.map((item) => (
            <div key={item.name} className="fg-entry fg-entry--ledger">
              <span className="fg-entry__glyph">{item.emoji}</span>
              <div className="fg-entry__main">
                <span className="fg-entry__name">{item.name}</span>
                <div>
                  <p className="fg-entry__text">{item.meaning}</p>
                  <p className="fg-entry__meta">Available — {item.availability}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <dl className="fg-deflist mt-10 max-w-3xl border-t-2 border-[var(--rule)] pt-6">
          <dt>How approval works</dt>
          <dd>Anyone may submit a proposal. The Emoji Subcommittee evaluates predicted usage, distinctiveness, and cross-cultural accessibility. From submission to keyboard: typically 18+ months.</dd>
          <dt>Getting them on iPhone</dt>
          <dd>Settings → General → Software Update, then install any available update. New emojis arrive through iOS system updates — there is no separate download.</dd>
        </dl>
      </AnimatedSection>
    </SectionShell>
  );
}
