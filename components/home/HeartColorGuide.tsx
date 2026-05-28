import { AnimatedSection } from "@/components/MotionWrappers";

const HEARTS = [
  { emoji: "❤️", name: "Red Heart", meaning: "Deep romantic love or serious affection", send: "You mean it at full weight", avoid: "Too weighty for casual", bg: "bg-red-50 dark:bg-red-950/30", border: "border-red-200 dark:border-red-900/50" },
  { emoji: "🧡", name: "Orange Heart", meaning: "Warm enthusiasm, friendly energy", send: "Celebrating or cheering on", avoid: "Romantic contexts — reads platonic", bg: "bg-orange-50 dark:bg-orange-950/30", border: "border-orange-200 dark:border-orange-900/50" },
  { emoji: "💛", name: "Yellow Heart", meaning: "Happiness, sunshine, platonic warmth", send: "Sending bright good vibes", avoid: "Situations requiring depth", bg: "bg-yellow-50 dark:bg-yellow-950/30", border: "border-yellow-200 dark:border-yellow-900/50" },
  { emoji: "💚", name: "Green Heart", meaning: "Nature, health, loyalty in fandoms", send: "Environmental content, wellness", avoid: "Romantic substitution — doesn't work", bg: "bg-green-50 dark:bg-green-950/30", border: "border-green-200 dark:border-green-900/50" },
  { emoji: "💙", name: "Blue Heart", meaning: "Platonic loyalty, steady support", send: "Close friendships, sports teams", avoid: "Romantic conversations — signals non-romantic", bg: "bg-blue-50 dark:bg-blue-950/30", border: "border-blue-200 dark:border-blue-900/50" },
  { emoji: "💜", name: "Purple Heart", meaning: "Spirituality, creativity, luxury", send: "Creative work, fan culture", avoid: "Professional communication", bg: "bg-purple-50 dark:bg-purple-950/30", border: "border-purple-200 dark:border-purple-900/50" },
  { emoji: "🖤", name: "Black Heart", meaning: "Elegance, dark humor, grief, ironic affection", send: "Gothic aesthetic, mourning", avoid: "Sympathy messages — reads as grim", bg: "bg-neutral-100 dark:bg-neutral-800/50", border: "border-neutral-300 dark:border-neutral-700" },
  { emoji: "🤍", name: "White Heart", meaning: "Minimalist sincerity, peaceful warmth", send: "Minimalist aesthetic, light affection", avoid: "Dark backgrounds — disappears visually", bg: "bg-neutral-50 dark:bg-slate-800/50", border: "border-neutral-200 dark:border-slate-700" },
  { emoji: "🤎", name: "Brown Heart", meaning: "Earthiness, warmth, cozy texture", send: "Autumn aesthetics, natural themes", avoid: "When contrast is needed — reads muted", bg: "bg-amber-50 dark:bg-amber-950/30", border: "border-amber-200 dark:border-amber-900/50" },
  { emoji: "💕", name: "Two Hearts", meaning: "Soft mutual affection, warmth in both directions", send: "Early romance, close friendships", avoid: "When you want full gravity of ❤️", bg: "bg-pink-50 dark:bg-pink-950/30", border: "border-pink-200 dark:border-pink-900/50" },
  { emoji: "❤️‍🔥", name: "Heart on Fire", meaning: "Intense passion, burning attraction", send: "Expressing attraction with urgency", avoid: "Platonic contexts — unmistakably romantic", bg: "bg-red-50 dark:bg-red-950/30", border: "border-red-200 dark:border-red-900/50" },
  { emoji: "❤️‍🩹", name: "Mending Heart", meaning: "Healing after heartbreak", send: "Supporting emotional recovery", avoid: "Happy contexts — signals prior damage", bg: "bg-pink-50 dark:bg-pink-950/30", border: "border-pink-200 dark:border-pink-900/50" },
  { emoji: "💖", name: "Sparkling Heart", meaning: "Celebratory, sparkling love", send: "Exciting announcements, admiration", avoid: "Understated situations — high energy", bg: "bg-fuchsia-50 dark:bg-fuchsia-950/30", border: "border-fuchsia-200 dark:border-fuchsia-900/50" },
];

export default function HeartColorGuide() {
  return (
    <section className="py-14 bg-neutral-50 dark:bg-slate-800/50">
      <div className="max-w-5xl mx-auto px-4">
        <AnimatedSection>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-primary-dark dark:text-white mb-2">
            Heart Emoji Meanings — Every Color Explained
          </h2>
          <p className="text-neutral-500 dark:text-slate-400 mb-8">Heart emojis are not interchangeable. Each color sends a distinct emotional signal.</p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
          {HEARTS.map((h) => (
            <AnimatedSection key={h.emoji}>
              <div className={`${h.bg} ${h.border} border rounded-xl p-4`}>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{h.emoji}</span>
                  <h3 className="font-bold text-sm text-primary-dark dark:text-white">{h.name}</h3>
                </div>
                <p className="text-sm text-neutral-600 dark:text-slate-300 mb-3">{h.meaning}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300">✓ {h.send}</span>
                  <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300">✗ {h.avoid}</span>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection>
          <div className="bg-violet-50 dark:bg-violet-950/30 border-l-4 border-accent-violet rounded-r-xl p-5">
            <h3 className="font-bold text-primary-dark dark:text-white mb-1">💡 The Psychology Behind Heart Color Migration</h3>
            <p className="text-sm text-neutral-600 dark:text-slate-300 leading-relaxed">
              When younger users stopped reaching for ❤️ in casual conversations, it was not arbitrary. The red heart had become too emotionally loaded for everyday warmth. That is why 💕 and 💙 filled the gap — both communicate genuine care without romantic gravity.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
