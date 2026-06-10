import { AnimatedSection } from "@/components/MotionWrappers";
import SectionShell from "./SectionShell";

const HEARTS = [
  { emoji: "❤️", name: "Red Heart", meaning: "Deep romantic love or serious affection", send: "you mean it at full weight", avoid: "too weighty for casual" },
  { emoji: "🧡", name: "Orange Heart", meaning: "Warm enthusiasm, friendly energy", send: "celebrating or cheering on", avoid: "romantic contexts — reads platonic" },
  { emoji: "💛", name: "Yellow Heart", meaning: "Happiness, sunshine, platonic warmth", send: "sending bright good vibes", avoid: "situations requiring depth" },
  { emoji: "💚", name: "Green Heart", meaning: "Nature, health, loyalty in fandoms", send: "environmental content, wellness", avoid: "romantic substitution — doesn't work" },
  { emoji: "💙", name: "Blue Heart", meaning: "Platonic loyalty, steady support", send: "close friendships, sports teams", avoid: "romantic conversations" },
  { emoji: "💜", name: "Purple Heart", meaning: "Spirituality, creativity, luxury", send: "creative work, fan culture", avoid: "professional communication" },
  { emoji: "🖤", name: "Black Heart", meaning: "Elegance, dark humor, grief, ironic affection", send: "gothic aesthetic, mourning", avoid: "sympathy messages — reads grim" },
  { emoji: "🤍", name: "White Heart", meaning: "Minimalist sincerity, peaceful warmth", send: "minimalist aesthetic, light affection", avoid: "dark backgrounds — disappears" },
  { emoji: "🤎", name: "Brown Heart", meaning: "Earthiness, warmth, cozy texture", send: "autumn aesthetics, natural themes", avoid: "when contrast is needed" },
  { emoji: "💕", name: "Two Hearts", meaning: "Soft mutual affection, warmth in both directions", send: "early romance, close friendships", avoid: "when you want full gravity of ❤️" },
  { emoji: "❤️‍🔥", name: "Heart on Fire", meaning: "Intense passion, burning attraction", send: "attraction with urgency", avoid: "platonic contexts — unmistakably romantic" },
  { emoji: "❤️‍🩹", name: "Mending Heart", meaning: "Healing after heartbreak", send: "supporting emotional recovery", avoid: "happy contexts — signals prior damage" },
  { emoji: "💖", name: "Sparkling Heart", meaning: "Celebratory, sparkling love", send: "exciting announcements, admiration", avoid: "understated situations — high energy" },
];

export default function HeartColorGuide() {
  return (
    <SectionShell
      n="08"
      id="hearts"
      title="Heart Emoji Meanings — Every Color Explained"
      count="13 hearts"
      dek="Heart emojis are not interchangeable. Each color sends a distinct emotional signal."
    >
      <AnimatedSection>
        <div className="fg-list">
          {HEARTS.map((h) => (
            <div key={h.emoji} className="fg-entry fg-entry--ledger">
              <span className="fg-entry__glyph">{h.emoji}</span>
              <div className="fg-entry__main">
                <span className="fg-entry__name">{h.name}</span>
                <div>
                  <p className="fg-entry__text">{h.meaning}</p>
                  <p className="fg-entry__meta"><b>Send</b> {h.send} &nbsp; <b>Avoid</b> {h.avoid}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <div className="fg-pull fg-pull--sm mt-10">
          <span className="fg-kicker">The Psychology</span>
          <p>
            When younger users stopped reaching for ❤️ in casual chat, it wasn&apos;t arbitrary — the red heart had grown too loaded for everyday warmth. 💕 and 💙 filled the gap: genuine care, no romantic gravity.
          </p>
        </div>
      </AnimatedSection>
    </SectionShell>
  );
}
