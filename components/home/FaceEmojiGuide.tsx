import { AnimatedSection } from "@/components/MotionWrappers";

const CORE_FACES = [
  { emoji: "😊", name: "Smiling Face with Smiling Eyes", meaning: "Warm, genuine happiness", note: "Gen Z in ironic contexts: slightly passive-aggressive" },
  { emoji: "😍", name: "Smiling Face with Heart-Eyes", meaning: "Intense admiration or attraction", note: "Instagram DMs, visual appreciation" },
  { emoji: "🥺", name: "Pleading Face", meaning: "Vulnerability plea — hard to refuse", note: "Pairs with 👉👈 for maximum effect" },
  { emoji: "🫠", name: "Melting Face", meaning: "Overwhelmed, embarrassed, want to vanish", note: "Viral since Unicode 14.0 (2022)" },
  { emoji: "😇", name: "Smiling Face with Halo", meaning: "Sarcastic innocence — \"I did the thing\"", note: "Almost never sincere in modern texting" },
  { emoji: "😌", name: "Relieved Face", meaning: "Smug contentment — not sleepy", note: "Closed-eye design causes widespread misreading" },
  { emoji: "😘", name: "Face Blowing a Kiss", meaning: "Playful affection, light flirtation", note: "Light enough for close non-romantic friends" },
  { emoji: "🥰", name: "Smiling Face with Hearts", meaning: "Genuine warmth toward someone", note: "Heavier emotional weight than 😊" },
  { emoji: "🤗", name: "Hugging Face", meaning: "Virtual embrace, supportive warmth", note: "After long silence: can read as hollow" },
  { emoji: "😅", name: "Grinning Face with Sweat", meaning: "Nervous laughter — \"this is awkward\"", note: "Clearest on Apple where sweat drop is visible" },
  { emoji: "😂", name: "Face with Tears of Joy", meaning: "Genuine laughter for Millennials+", note: "Gen Z prefers 💀" },
  { emoji: "😒", name: "Unamused Face", meaning: "Quiet irritation or deliberate boredom", note: "Carries more weight than its expression suggests" },
  { emoji: "😉", name: "Winking Face", meaning: "Playful suggestion, mild flirtation", note: "Cleaner flirt signal than 😏" },
  { emoji: "🙂", name: "Slightly Smiling Face", meaning: "Passive-aggression or cold acknowledgment", note: "Highest misread risk of any face emoji" },
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
    <section className="py-14 bg-neutral-50 dark:bg-slate-800/50">
      <div className="max-w-5xl mx-auto px-4">
        <AnimatedSection>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-primary-dark dark:text-white mb-2">
            Face Emoji Meanings — Every Expression Decoded
          </h2>
          <p className="text-neutral-500 dark:text-slate-400 mb-8">The gap between official Unicode names and real conversational meanings is wider here than anywhere else.</p>
        </AnimatedSection>

        <AnimatedSection>
          <h3 className="text-lg font-bold text-primary-dark dark:text-white mb-4">Core Face Emojis</h3>
        </AnimatedSection>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
          {CORE_FACES.map((item) => (
            <AnimatedSection key={item.emoji}>
              <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-neutral-100 dark:border-slate-700">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{item.emoji}</span>
                  <h4 className="font-bold text-sm text-primary-dark dark:text-white leading-tight">{item.name}</h4>
                </div>
                <p className="text-sm text-neutral-600 dark:text-slate-300 mb-1">{item.meaning}</p>
                <p className="text-xs text-neutral-400 dark:text-slate-500">{item.note}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection>
          <div className="bg-amber-50 dark:bg-amber-950/30 border-l-4 border-accent-amber rounded-r-xl p-5 mb-8">
            <h3 className="font-bold text-primary-dark dark:text-white mb-1">⚠️ Why 🙂 Is the Most Dangerous Face Emoji</h3>
            <p className="text-sm text-neutral-600 dark:text-slate-300 leading-relaxed">
              Officially it means a gentle smile. In practice by 2024–2026, a standalone 🙂 in conversation signals lukewarm engagement at best and deliberate emotional distance at worst. Nobody sends it when genuinely happy. It has become the emoji equivalent of &ldquo;noted.&rdquo;
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <h3 className="text-lg font-bold text-primary-dark dark:text-white mb-4">Extended Face Emoji Meanings</h3>
        </AnimatedSection>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {EXTENDED_FACES.map((item) => (
            <AnimatedSection key={item.emoji}>
              <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-neutral-100 dark:border-slate-700">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{item.emoji}</span>
                </div>
                <p className="text-sm text-neutral-600 dark:text-slate-300 mb-1">{item.meaning}</p>
                <p className="text-xs text-neutral-400 dark:text-slate-500">{item.note}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
