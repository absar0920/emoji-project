"use client";

import { useState } from "react";
import { AnimatedSection } from "@/components/MotionWrappers";

const FAQS = [
  { q: "What is Emoji Kitchen?", a: "Emoji Kitchen is a feature built into Google's Gboard keyboard that lets users combine two standard emojis into a single illustrated sticker image. The resulting sticker is a hand-crafted PNG created by Google's design team — not AI-generated in real time. Android users access it directly from the keyboard, while iPhone users can use the Google Search web interface." },
  { q: "How do I use Emoji Kitchen on Android?", a: "Open any messaging app with Gboard as your keyboard, tap the emoji icon, and select any supported emoji. A row of Emoji Kitchen sticker suggestions appears above the keyboard — tap any sticker to send it as an image. If the row doesn't appear, go to Gboard Settings → Preferences and confirm Emoji Kitchen is toggled on." },
  { q: "Does Emoji Kitchen work on iPhone?", a: "Emoji Kitchen is not natively available on iPhone because Gboard for iOS does not include the feature. iPhone users can access it through Google Search: search \"emoji kitchen\" on google.com in Safari or Chrome, use the interactive tool in the results, then save and share the sticker image manually." },
  { q: "How many Emoji Kitchen combinations are there?", a: "Google has confirmed over 100,000 unique Emoji Kitchen combinations — a milestone celebrated publicly around World Emoji Day 2025 (July 17, 2025). This number grows with each major Gboard update. Not every emoji pairs with every other — the library consists of specifically hand-crafted pairs selected and designed by Google's team." },
  { q: "Is Emoji Kitchen free?", a: "Emoji Kitchen is completely free. It is a built-in feature of Gboard, which is a free keyboard app. No subscription, in-app purchase, or sign-in is required to use it on Android. The web version via Google Search is also free and requires no account." },
  { q: "Why doesn't Emoji Kitchen work on Instagram comments or Twitter/X?", a: "Instagram comments and Twitter/X compose boxes use plain text input fields that only accept Unicode characters. Emoji Kitchen outputs are PNG image files, not Unicode text — so they cannot be embedded in plain text fields. Messaging apps like WhatsApp and Telegram work because they use rich media input fields that accept image attachments." },
  { q: "What is the Emoji Kitchen magic wand trick?", a: "When you select the 🪄 (magic wand) emoji in Gboard and then choose a face emoji as the second selection, certain combinations reveal Google's legacy blob emoji designs — the round, blobby style Google used before 2017. These blob variants were retired from the standard emoji set but are preserved as special Emoji Kitchen stickers. The Android 16 update expanded the number of accessible blob variants." },
  { q: "What happens when you use the same emoji twice?", a: "Selecting the same emoji twice produces an exaggerated or amplified version of that single emoji — not a combination of two different ones. For example, 😭+😭 generates an ultra-crying face with more visual intensity than the standard emoji. This double-emoji trick works reliably for most face emojis and some animal emojis." },
  { q: "Which emojis are NOT supported in Emoji Kitchen?", a: "Three categories are not supported: flag emojis (like 🇺🇸 or 🇬🇧), human figure emojis with skin tone modifiers (like 👨 or 👩), and most symbol and number emojis. Flags are excluded due to technical constraints with Unicode regional indicator sequences. Human emojis were deliberately excluded to avoid culturally insensitive combinations." },
  { q: "Does Emoji Kitchen work on WhatsApp?", a: "Yes. On Android with Gboard, Emoji Kitchen stickers send in WhatsApp as image messages. Open a chat, tap the emoji icon, select a supported emoji, and tap any sticker in the suggestion row. The sticker sends as an image that WhatsApp recipients on both Android and iPhone can see." },
  { q: "Can I use Emoji Kitchen offline?", a: "Partially. Emoji Kitchen stickers load from Google's servers and require an internet connection for new combinations. Stickers loaded in the current session may be cached briefly. Unlike regular emojis — which are built-in Unicode characters — Emoji Kitchen stickers are fetched images that require connectivity for first-time loads." },
  { q: "How do I save an Emoji Kitchen sticker?", a: "On Android, long-press any Emoji Kitchen sticker in the suggestion row — an option to save to gallery appears. On the web via Google Search, right-click on desktop or long-press on mobile and select Save Image. Saved stickers are standard PNG files shareable anywhere." },
  { q: "How often does Google update Emoji Kitchen?", a: "Google updates Emoji Kitchen with major Gboard releases, which typically align with Android version updates and the annual Unicode emoji release cycle. Major expansion batches have come with Android 12 through 16. The library crossed 100,000+ combinations and has continued growing through 2025 and 2026." },
  { q: "Does Emoji Kitchen work on Discord?", a: "Yes. Emoji Kitchen stickers send as image uploads to server channels and Discord DMs on Android devices using Gboard. Desktop Discord users can use the Google Search web tool to generate a sticker, download the PNG, and drag it into any Discord channel." },
  { q: "What are the best Emoji Kitchen combinations?", a: "The most popular combos capture specific moods that individual emojis miss: 😂+😭 (crying-laughing), 😈+🥺 (devil pleading), and 🤡+😭 (crying clown). The double-emoji trick amplifies any expression. For unusual results, try cross-category combos like 🍕+😭 or the 🪄 magic wand trick to unlock legacy blob designs." },
  { q: "Is Emoji Kitchen AI-generated?", a: "No. Every combination is a hand-crafted sticker illustration created by Google's internal design team. When two emojis are selected, Gboard retrieves a pre-drawn sticker from the library — it does not generate anything in real time. If a combination has no hand-crafted artwork, no sticker appears. This is a curated design archive, not a generative system." },
];

export default function KitchenFAQ() {
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
    <section className="py-14 rule-top">
      <div className="max-w-5xl mx-auto px-4">
        <AnimatedSection>
          <p className="eyebrow mb-3 flex items-center gap-2"><span className="inline-block w-6 h-px bg-primary" aria-hidden="true" />FAQ</p>
          <h2 className="font-display text-3xl sm:text-4xl text-primary-dark dark:text-white leading-[1.1] mb-2">
            Frequently Asked Questions
          </h2>
          <p className="text-neutral-500 dark:text-slate-400 mt-3 mb-8">Everything you need to know about Emoji Kitchen</p>
        </AnimatedSection>

        <div className="space-y-2">
          {FAQS.map((faq, i) => (
            <AnimatedSection key={i}>
              <div className="bg-neutral-50 dark:bg-slate-800 rounded-2xl border border-neutral-200/80 dark:border-slate-700 shadow-sm card-lift hover:shadow-md hover:border-primary/40 overflow-hidden">
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
