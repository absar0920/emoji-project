"use client";

import { useState } from "react";
import { AnimatedSection } from "@/components/MotionWrappers";

const DEEP_DIVES = [
  { emoji: "🥺", title: "What Does 🥺 Mean?", text: "The Pleading Face expresses vulnerability, softness, and near-irresistible emotional appeal. People deploy it to make requests feel impossible to refuse, to signal that something is overwhelmingly adorable, or to communicate fragility. It frequently pairs with 👉👈 on Instagram and TikTok to accentuate timid, apprehensive energy. The entire message lives in the downturned eyes." },
  { emoji: "🫠", title: "What Does 🫠 Mean?", text: "The Melting Face communicates feeling overwhelmed, embarrassed, or like you want to dissolve into the floor. It went viral after its 2022 Unicode 14.0 release and became the default reaction for awkward situations, extreme heat, social discomfort, and exhausted defeat. The humor is entirely visual — a face slowly losing structure captures a specific kind of helpless collapse that no earlier symbol conveyed." },
  { emoji: "😇", title: "What Does 😇 Mean in a Text?", text: "The 😇 emoji has a split identity. Officially it represents innocence. In real texting, it is used almost entirely sarcastically — to announce a mischievous act while performing angelic ignorance. The halo is the punchline. If someone sends it right after saying something at your expense, they know exactly what they did." },
  { emoji: "😌", title: "What Does 😌 Mean From a Girl?", text: "When a girl sends 😌, it communicates quiet contentment, peaceful confidence, or understated satisfaction — \"I handled this and I am at peace with how it went.\" In many contexts it reads as soft smugness. The closed-eye design causes persistent misreading as sleepy or tired, but that is not what it signals." },
  { emoji: "🥰", title: "What Does 🥰 Mean From a Guy?", text: "When a guy sends 🥰 (Smiling Face with Hearts), it signals genuine warmth and tender affection. It means something real was felt. The emotional weight here is significantly heavier than a casual 😊 and it is rarely sent without intention." },
];

export default function EmojiDeepDives() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-14 bg-white dark:bg-slate-900">
      <div className="max-w-5xl mx-auto px-4">
        <AnimatedSection>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-primary-dark dark:text-white mb-2">
            Individual Emoji Deep Dives
          </h2>
          <p className="text-neutral-500 dark:text-slate-400 mb-8">Tap to expand each emoji&apos;s full meaning</p>
        </AnimatedSection>

        <div className="space-y-3">
          {DEEP_DIVES.map((item, i) => (
            <AnimatedSection key={item.emoji}>
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full text-left bg-neutral-50 dark:bg-slate-800 rounded-xl border border-neutral-100 dark:border-slate-700 overflow-hidden transition-shadow hover:shadow-md"
              >
                <div className="flex items-center gap-4 p-4">
                  <span className="text-4xl">{item.emoji}</span>
                  <span className="font-bold text-primary-dark dark:text-white flex-1">{item.title}</span>
                  <span className="text-neutral-400 dark:text-slate-500 text-lg">{openIndex === i ? "▼" : "▸"}</span>
                </div>
                {openIndex === i && (
                  <div className="px-4 pb-4 pt-0">
                    <p className="text-sm text-neutral-600 dark:text-slate-300 leading-relaxed pl-14">{item.text}</p>
                  </div>
                )}
              </button>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
