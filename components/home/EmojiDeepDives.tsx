"use client";

import { useState } from "react";
import { AnimatedSection } from "@/components/MotionWrappers";
import SectionShell from "./SectionShell";

const DEEP_DIVES = [
  { emoji: "🥺", title: "What Does 🥺 Mean?", text: "The Pleading Face expresses vulnerability, softness, and near-irresistible emotional appeal. People deploy it to make requests feel impossible to refuse, to signal that something is overwhelmingly adorable, or to communicate fragility. It frequently pairs with 👉👈 on Instagram and TikTok to accentuate timid, apprehensive energy. The entire message lives in the downturned eyes." },
  { emoji: "🫠", title: "What Does 🫠 Mean?", text: "The Melting Face communicates feeling overwhelmed, embarrassed, or like you want to dissolve into the floor. It went viral after its 2022 Unicode 14.0 release and became the default reaction for awkward situations, extreme heat, social discomfort, and exhausted defeat. The humor is entirely visual — a face slowly losing structure captures a specific kind of helpless collapse that no earlier symbol conveyed." },
  { emoji: "😇", title: "What Does 😇 Mean in a Text?", text: "The 😇 emoji has a split identity. Officially it represents innocence. In real texting, it is used almost entirely sarcastically — to announce a mischievous act while performing angelic ignorance. The halo is the punchline. If someone sends it right after saying something at your expense, they know exactly what they did." },
  { emoji: "😌", title: "What Does 😌 Mean From a Girl?", text: "When a girl sends 😌, it communicates quiet contentment, peaceful confidence, or understated satisfaction — \"I handled this and I am at peace with how it went.\" In many contexts it reads as soft smugness. The closed-eye design causes persistent misreading as sleepy or tired, but that is not what it signals." },
  { emoji: "🥰", title: "What Does 🥰 Mean From a Guy?", text: "When a guy sends 🥰 (Smiling Face with Hearts), it signals genuine warmth and tender affection. It means something real was felt. The emotional weight here is significantly heavier than a casual 😊 and it is rarely sent without intention." },
];

export default function EmojiDeepDives() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <SectionShell n="07" id="deep-dives" title="Individual Emoji Deep Dives" dek="The five most-searched meanings, in full.">
      <div className="fg-list">
        {DEEP_DIVES.map((item, i) => {
          const open = openIndex === i;
          return (
            <AnimatedSection key={item.emoji}>
              <div className="border-b border-[var(--line)]">
                <button
                  onClick={() => setOpenIndex(open ? null : i)}
                  aria-expanded={open}
                  className="w-full text-left flex items-center gap-3 sm:gap-4 py-4 cursor-pointer"
                >
                  <span className="mono t-muted text-[0.62rem] w-5 shrink-0 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-2xl shrink-0">{item.emoji}</span>
                  <span className="font-read font-medium t-ink flex-1">{item.title}</span>
                  <svg className={`w-4 h-4 t-muted shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {open && (
                  <p className="t-body leading-relaxed pb-5 max-w-2xl sm:pl-[3.65rem]">{item.text}</p>
                )}
              </div>
            </AnimatedSection>
          );
        })}
      </div>
    </SectionShell>
  );
}
