import { AnimatedSection } from "@/components/MotionWrappers";
import SectionShell from "./SectionShell";

const CORE_FACES = [
  { emoji: "😊", name: "Smiling, Smiling Eyes", meaning: "Warm, genuine happiness", note: "Gen Z, ironic contexts: slightly passive-aggressive" },
  { emoji: "😍", name: "Heart-Eyes", meaning: "Intense admiration or attraction", note: "Instagram DMs, visual appreciation" },
  { emoji: "🥺", name: "Pleading Face", meaning: "Vulnerability plea — hard to refuse", note: "Pairs with 👉👈 for maximum effect" },
  { emoji: "🫠", name: "Melting Face", meaning: "Overwhelmed, embarrassed, want to vanish", note: "Viral since Unicode 14.0 (2022)" },
  { emoji: "😇", name: "Halo", meaning: "Sarcastic innocence — \"I did the thing\"", note: "Almost never sincere in modern texting" },
  { emoji: "😌", name: "Relieved Face", meaning: "Smug contentment — not sleepy", note: "Closed-eye design causes widespread misreading" },
  { emoji: "😘", name: "Blowing a Kiss", meaning: "Playful affection, light flirtation", note: "Light enough for close non-romantic friends" },
  { emoji: "🥰", name: "Smiling w/ Hearts", meaning: "Genuine warmth toward someone", note: "Heavier emotional weight than 😊" },
  { emoji: "🤗", name: "Hugging Face", meaning: "Virtual embrace, supportive warmth", note: "After long silence: can read as hollow" },
  { emoji: "😅", name: "Grinning w/ Sweat", meaning: "Nervous laughter — \"this is awkward\"", note: "Clearest on Apple where sweat drop is visible" },
  { emoji: "😂", name: "Tears of Joy", meaning: "Genuine laughter for Millennials+", note: "Gen Z prefers 💀" },
  { emoji: "😒", name: "Unamused Face", meaning: "Quiet irritation or deliberate boredom", note: "Carries more weight than its expression suggests" },
  { emoji: "😉", name: "Winking Face", meaning: "Playful suggestion, mild flirtation", note: "Cleaner flirt signal than 😏" },
  { emoji: "🙂", name: "Slightly Smiling", meaning: "Passive-aggression or cold acknowledgment", note: "Highest misread risk of any face emoji" },
  { emoji: "☺️", name: "Smiling Face", meaning: "Soft, bashful happiness", note: "Renders especially warmly on Apple" },
];

const EXTENDED_FACES = [
  { emoji: "🙃", meaning: "Irony, chaos, \"everything is fine\" (it is not)", note: "Very clear on Apple; less expressive on Samsung" },
  { emoji: "🥲", meaning: "Bittersweet — happy but hurting underneath", note: "Often read as simply happy — nuance gets lost" },
  { emoji: "🥴", meaning: "Disorientation, stunned by attraction, overwhelm", note: "High on TikTok for attraction signals" },
  { emoji: "😬", meaning: "Strong discomfort — \"this is bad and we both know it\"", note: "WhatsApp renders more teeth than iOS" },
  { emoji: "😏", meaning: "Flirtatious confidence, knowing mischief", note: "Rarely ambiguous across platforms" },
  { emoji: "🫡", meaning: "Respect, mock-military acknowledgment", note: "Sincere or sarcastic — context is everything" },
  { emoji: "🤭", meaning: "Suppressed laughter, \"oops did I say that?\"", note: "Universally clear reading" },
  { emoji: "😪", meaning: "Sick or sneezing — NOT tired", note: "The teardrop is a snot bubble; widely misread" },
  { emoji: "😤", meaning: "Official: triumph. Actual: frustration", note: "Most globally misread emoji" },
  { emoji: "🫩", meaning: "Exhaustion, sleep deprivation, tired humor", note: "New 2026 — iOS 18+, Android 15+" },
  { emoji: "🤩", meaning: "Pure excitement — \"this is incredible\"", note: "Universally positive; rarely misread" },
  { emoji: "😎", meaning: "Cool confidence — \"I have this handled\"", note: "Reads as try-hard in some Gen Z contexts" },
];

export default function FaceEmojiGuide() {
  return (
    <SectionShell
      n="06"
      id="faces"
      title="Face Emoji Meanings — Every Expression Decoded"
      count="27 faces"
      dek="The gap between official Unicode names and real conversational meanings is wider here than anywhere else."
    >
      <AnimatedSection>
        <p className="fg-kicker mb-4">Core faces</p>
        <div className="fg-list">
          {CORE_FACES.map((item) => (
            <div key={item.emoji} className="fg-entry fg-entry--ledger">
              <span className="fg-entry__glyph">{item.emoji}</span>
              <div className="fg-entry__main">
                <span className="fg-entry__name">{item.name}</span>
                <div>
                  <p className="fg-entry__text">{item.meaning}</p>
                  <p className="fg-entry__meta">{item.note}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <div className="fg-pull fg-pull--sm my-11">
          <span className="fg-kicker">In Practice</span>
          <p>
            🙂 is the most dangerous face in modern texting. Officially a gentle smile — but by 2024 a standalone 🙂 reads as cold distance. Nobody sends it when they&apos;re happy. It&apos;s become the emoji for &ldquo;noted.&rdquo;
          </p>
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <p className="fg-kicker mb-4">Extended readings</p>
        <div className="fg-list">
          {EXTENDED_FACES.map((item) => (
            <div key={item.emoji} className="fg-entry">
              <span className="fg-entry__glyph">{item.emoji}</span>
              <div className="fg-entry__main">
                <p className="fg-entry__text">{item.meaning}</p>
                <p className="fg-entry__meta">{item.note}</p>
              </div>
            </div>
          ))}
        </div>
      </AnimatedSection>
    </SectionShell>
  );
}
