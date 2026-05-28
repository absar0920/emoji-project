"use client";

import { useState } from "react";
import { AnimatedSection } from "@/components/MotionWrappers";

const FAQS = [
  { q: "What does emoji mean?", a: "The Japanese word \"emoji\" combines \"e\" (image) and \"moji\" (character). Emojis are standardized pictogram symbols governed by the Unicode Consortium. The first 176 were created in 1999 by Shigetaka Kurita at NTT DoCoMo, Japan." },
  { q: "What does 🥺 emoji mean?", a: "Officially the Pleading Face. It expresses vulnerability, softness, and near-irresistible emotional appeal — making requests feel impossible to refuse. Pairs with 👉👈 for maximum shy, pleading effect." },
  { q: "What does 🫠 mean?", a: "The Melting Face means you feel overwhelmed, embarrassed, or like you want to dissolve into the floor. Popular for awkward situations, extreme heat, social discomfort, and exhausted defeat since its Unicode 14.0 debut in 2022." },
  { q: "What does 🥰 mean from a guy?", a: "Smiling Face with Hearts — when sent by a guy, it signals genuine warmth and tender affection. Something real was felt. Carries significantly more weight than a plain 😊." },
  { q: "What does 💀 mean in texting?", a: "Among Gen Z, dying of laughter — \"this is so funny it killed me.\" It displaced 😂 as the authentic laughter signal around 2022 because 😂 had started to feel performative." },
  { q: "What does 😌 mean?", a: "The Relieved Face communicates quiet contentment or smug satisfaction — not sleepiness. The closed-eye design causes widespread misreading as tired." },
  { q: "What does 😭 mean in Gen Z texting?", a: "In Gen Z communication, 😭 does not primarily signal sadness. It signals positive overwhelm — the content was so good, funny, or relatable it caused an emotional overflow reaction." },
  { q: "What do different heart emoji colors mean?", a: "Each color carries a distinct signal. ❤️ red = serious romantic love. 💙 blue = platonic loyalty. 💛 yellow = bright friendly warmth. 🖤 black = edge, irony, or mourning. 🤍 white = minimalist sincerity. ❤️‍🔥 fire = intense passion." },
  { q: "What does 🧿 mean on WhatsApp?", a: "The Nazar Amulet — a traditional evil eye protection symbol from Turkish, Middle Eastern, and South Asian cultures. Sent to bless good news, celebrate milestones with protective energy." },
  { q: "What does 💯 mean?", a: "Complete agreement, full endorsement, or perfection — \"no notes, this is exactly right.\" One of the most stable emoji meanings across all platforms." },
  { q: "What does 🔥 mean in texting?", a: "Something is excellent, impressive, or intensely good. On Snapchat specifically it indicates an active Snap Streak. On TikTok and Instagram it is the primary quality-approval signal." },
  { q: "What does 🤌 mean?", a: "Originated as an Italian hand gesture, evolved through TikTok into a universal signal for perfection — chef's kiss, flawless execution." },
  { q: "What does 🫶 mean?", a: "Heart Hands — wholesome mutual care and community support. Quickly adopted as a warmer, more inclusive alternative to individual heart emojis." },
  { q: "What does 🚩 mean in texting?", a: "A warning sign — a character flaw, suspicious behavior, or concerning pattern. Became viral shorthand for relationship red flags on Twitter/X in 2021." },
  { q: "What does 🗿 mean in texting?", a: "Complete deadpan — emotionless witnessing of something so absurd or chaotic that no other response is adequate. Developed through Discord and TikTok meme culture." },
  { q: "Do emoji meanings differ on iPhone vs. Android?", a: "Yes. Apple, Google, Samsung, and Meta each design their own artwork for identical Unicode codepoints. The same symbol can look visually different across devices, affecting how it reads emotionally." },
  { q: "What does ‼️ mean in texting?", a: "The Double Exclamation Mark signals urgency or shock when used sincerely. In Gen Z texting it also appears as ironic theatrical emphasis." },
  { q: "What does 😤 mean?", a: "Officially, triumph and pride. In actual usage, most people read it as anger or frustration. One of the most globally misunderstood emojis." },
  { q: "What does 🥴 mean?", a: "The Woozy Face communicates disorientation or overwhelm. Also expresses that someone is so attractive the sender is left dazed." },
  { q: "What does 💕 mean in texting?", a: "Soft, mutual warmth — lighter and less committal than a single red heart. Suggests affection flowing in both directions." },
  { q: "What does 🙂 mean in texting?", a: "Officially a slight smile. In practice by 2024–2026, it signals passive-aggression, cold acknowledgment, or deliberate emotional distance." },
  { q: "How many emojis are there in 2026?", a: "Over 3,700+ individual emojis under Unicode 16.0, spanning smileys, people, animals, food, travel, activities, objects, symbols, and flags." },
  { q: "Who decides what new emojis get made?", a: "The Unicode Consortium controls all emoji approvals globally. Anyone may submit a proposal. The Emoji Subcommittee evaluates based on predicted usage, distinctiveness, and cross-cultural accessibility." },
  { q: "What are the new emojis in 2026?", a: "Unicode 15.1 and 16.0 additions include 🫩 Face with Bags Under Eyes, 🪮 Hair Pick, 🐦‍🔥 Phoenix, 🍋‍🟩 Lime, and 🪭 Folding Hand Fan. Availability depends on your OS version." },
];

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  return (
    <section className="py-14 bg-white dark:bg-slate-900">
      <div className="max-w-5xl mx-auto px-4">
        <AnimatedSection>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-primary-dark dark:text-white mb-2">
            Frequently Asked Questions
          </h2>
          <p className="text-neutral-500 dark:text-slate-400 mb-8">Quick answers to the most common emoji meaning questions</p>
        </AnimatedSection>

        <div className="space-y-2">
          {FAQS.map((faq, i) => (
            <AnimatedSection key={i}>
              <div className="bg-neutral-50 dark:bg-slate-800 rounded-xl border border-neutral-100 dark:border-slate-700 overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-neutral-100 dark:hover:bg-slate-700 transition-colors"
                >
                  <span className="font-semibold text-sm text-primary-dark dark:text-white">{faq.q}</span>
                  <span className="text-neutral-400 dark:text-slate-500 shrink-0">{openIndex === i ? "▼" : "▸"}</span>
                </button>
                {openIndex === i && (
                  <div className="px-5 pb-4 border-t border-neutral-100 dark:border-slate-700">
                    <p className="text-sm text-neutral-600 dark:text-slate-300 leading-relaxed pt-3">{faq.a}</p>
                  </div>
                )}
              </div>
            </AnimatedSection>
          ))}
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </div>
    </section>
  );
}
