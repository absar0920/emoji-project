"use client";

import { useState } from "react";
import { AnimatedSection } from "@/components/MotionWrappers";
import SectionShell from "./SectionShell";

const SECTIONS = [
  { label: "Face emojis", emojis: ["😀","😃","😄","😁","😆","😅","😂","🤣","😊","😇","😍","🥰","😘","😗","🙂","🤗","🤩","🤔","😏","😌","😛","😜","🥺","🫠","😭","😤","😬","🥴","🤪","😎","🫡","😮‍💨","🥲","🫥","🫩"] },
  { label: "Heart emojis", emojis: ["❤️","🧡","💛","💚","💙","💜","🖤","🤍","🤎","💕","💞","💓","💗","💖","💘","💝","❤️‍🔥","❤️‍🩹","💔","🫶"] },
  { label: "Hand emojis", emojis: ["👋","🤚","🖐️","✋","👌","🤌","🤏","✌️","🤞","🤟","🤘","🤙","👈","👉","👆","🖕","👇","☝️","👍","👎","✊","👊","🤛","🤜","👏","🙌","🤲","🤝","🙏"] },
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
    <SectionShell n="22" id="copy-paste" title="Emoji Copy &amp; Paste" dek="Click any glyph to copy it to your clipboard.">
      {SECTIONS.map((section) => (
        <AnimatedSection key={section.label}>
          <p className="fg-kicker mt-9 first:mt-0 mb-3">{section.label}</p>
          <div className="fg-glyphgrid">
            {section.emojis.map((emoji) => (
              <button
                key={emoji}
                onClick={() => handleCopy(emoji)}
                className={`fg-glyph ${copied === emoji ? "copied" : ""}`}
                title={`Copy ${emoji}`}
                aria-label={`Copy ${emoji}`}
              >
                {emoji}
              </button>
            ))}
          </div>
        </AnimatedSection>
      ))}

      {copied && (
        <div role="status" aria-live="polite" className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-accent-ed text-[var(--paper)] px-4 py-2 text-sm font-medium z-50 mono">
          {copied} copied
        </div>
      )}
    </SectionShell>
  );
}
