"use client";

import { useState } from "react";
import { AnimatedSection } from "@/components/MotionWrappers";

const SECTIONS = [
  { label: "Face Emojis", emojis: ["😀","😃","😄","😁","😆","😅","😂","🤣","😊","😇","😍","🥰","😘","😗","🙂","🤗","🤩","🤔","😏","😌","😛","😜","🥺","🫠","😭","😤","😬","🥴","🤪","😎","🫡","😮‍💨","🥲","🫥","🫩"] },
  { label: "Heart Emojis", emojis: ["❤️","🧡","💛","💚","💙","💜","🖤","🤍","🤎","💕","💞","💓","💗","💖","💘","💝","❤️‍🔥","❤️‍🩹","💔","🫶"] },
  { label: "Hand Emojis", emojis: ["👋","🤚","🖐️","✋","👌","🤌","🤏","✌️","🤞","🤟","🤘","🤙","👈","👉","👆","🖕","👇","☝️","👍","👎","✊","👊","🤛","🤜","👏","🙌","🤲","🤝","🙏"] },
  { label: "Symbols", emojis: ["✨","🔥","💯","✅","❌","⭐","🌟","💫","⚡","🎉","💡","📌","👑","🏆","🚩","💢","⚜️","🧿","‼️"] },
];

export default function CopyPasteReference() {
  const [copied, setCopied] = useState<string | null>(null);

  async function handleCopy(emoji: string) {
    await navigator.clipboard.writeText(emoji);
    setCopied(emoji);
    setTimeout(() => setCopied(null), 1500);
  }

  return (
    <section className="py-14 bg-neutral-50 dark:bg-slate-800/50">
      <div className="max-w-5xl mx-auto px-4">
        <AnimatedSection>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-primary-dark dark:text-white mb-2">
            Emoji Copy & Paste
          </h2>
          <p className="text-neutral-500 dark:text-slate-400 mb-8">Click any emoji to copy it to your clipboard</p>
        </AnimatedSection>

        {SECTIONS.map((section) => (
          <AnimatedSection key={section.label}>
            <div className="mb-6">
              <h3 className="font-bold text-sm text-primary-dark dark:text-white mb-3">{section.label}</h3>
              <div className="flex flex-wrap gap-2">
                {section.emojis.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => handleCopy(emoji)}
                    className={`w-11 h-11 flex items-center justify-center rounded-lg text-xl transition-all ${
                      copied === emoji
                        ? "bg-emerald-100 dark:bg-emerald-900/40 scale-110"
                        : "bg-white dark:bg-slate-700 border border-neutral-200 dark:border-slate-600 hover:scale-105 hover:shadow-sm"
                    }`}
                    title={`Copy ${emoji}`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          </AnimatedSection>
        ))}

        {copied && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg z-50">
            {copied} copied!
          </div>
        )}
      </div>
    </section>
  );
}
