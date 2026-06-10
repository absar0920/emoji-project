import { KSection } from "./Section";

const FAQS = [
  { q: "What is Emoji Kitchen?", a: "Emoji Kitchen is a feature built into Google's Gboard keyboard that lets users combine two standard emojis into a single illustrated sticker image. The resulting sticker is a hand-crafted PNG created by Google's design team — not AI-generated in real time. Android users access it directly from the keyboard, while iPhone users can use the Google Search web interface." },
  { q: "How do I use Emoji Kitchen on Android?", a: "Open any messaging app with Gboard as your keyboard, tap the emoji icon, and select any supported emoji. A row of Emoji Kitchen sticker suggestions appears above the keyboard — tap any sticker to send it as an image. If the row doesn't appear, go to Gboard Settings → Preferences and confirm Emoji Kitchen is toggled on." },
  { q: "Does Emoji Kitchen work on iPhone?", a: "Emoji Kitchen is not natively available on iPhone because Gboard for iOS does not include the feature. iPhone users can access it through Google Search: search \"emoji kitchen\" on google.com in Safari or Chrome, use the interactive tool in the results, then save and share the sticker image manually." },
  { q: "How many Emoji Kitchen combinations are there?", a: "Google has confirmed over 100,000 unique Emoji Kitchen combinations — a milestone celebrated publicly around World Emoji Day 2025. This number grows with each major Gboard update. Not every emoji pairs with every other — the library consists of specifically hand-crafted pairs." },
  { q: "Is Emoji Kitchen free?", a: "Emoji Kitchen is completely free. It is a built-in feature of Gboard, a free keyboard app. No subscription, in-app purchase, or sign-in is required on Android. The web version via Google Search is also free and requires no account." },
  { q: "Why doesn't Emoji Kitchen work on Instagram comments or Twitter/X?", a: "Instagram comments and Twitter/X compose boxes use plain text input fields that only accept Unicode characters. Emoji Kitchen outputs are PNG image files, not Unicode text — so they cannot be embedded in plain text fields. Messaging apps like WhatsApp and Telegram work because they use rich media input fields." },
  { q: "What is the Emoji Kitchen magic wand trick?", a: "When you select the 🪄 (magic wand) emoji in Gboard and then choose a face emoji, certain combinations reveal Google's legacy blob emoji designs — the round, blobby style Google used before 2017. These blob variants were retired from the standard set but preserved as special Emoji Kitchen stickers. Android 16 expanded the accessible blob variants." },
  { q: "What happens when you use the same emoji twice?", a: "Selecting the same emoji twice produces an exaggerated version of that single emoji — not a combination of two different ones. For example, 😭+😭 generates an ultra-crying face with more visual intensity. This double-emoji trick works reliably for most face emojis and some animals." },
  { q: "Which emojis are NOT supported?", a: "Three categories: flag emojis (like 🇺🇸), human figure emojis with skin-tone modifiers (like 👨), and most symbol/number emojis. Flags are excluded due to Unicode regional indicator constraints. Human emojis were deliberately excluded to avoid culturally insensitive combinations." },
  { q: "Does Emoji Kitchen work on WhatsApp?", a: "Yes. On Android with Gboard, Emoji Kitchen stickers send in WhatsApp as image messages. Open a chat, tap the emoji icon, select a supported emoji, and tap any sticker in the suggestion row. The sticker sends as an image that recipients on both Android and iPhone can see." },
  { q: "Can I use Emoji Kitchen offline?", a: "Partially. Stickers load from Google's servers and require an internet connection for new combinations. Stickers loaded in the current session may be cached briefly. Unlike regular emojis — built-in Unicode characters — Kitchen stickers are fetched images that need connectivity for first-time loads." },
  { q: "How do I save an Emoji Kitchen sticker?", a: "On Android, long-press any sticker in the suggestion row — an option to save to gallery appears. On the web via Google Search, right-click on desktop or long-press on mobile and select Save Image. Saved stickers are standard PNG files shareable anywhere." },
  { q: "How often does Google update Emoji Kitchen?", a: "Google updates Emoji Kitchen with major Gboard releases, typically aligned with Android version updates and the annual Unicode emoji cycle. Major expansions came with Android 12 through 16. The library crossed 100,000+ combinations and has continued growing through 2025 and 2026." },
  { q: "Does Emoji Kitchen work on Discord?", a: "Yes. Stickers send as image uploads to server channels and DMs on Android devices using Gboard. Desktop Discord users can use the Google Search web tool to generate a sticker, download the PNG, and drag it into any channel." },
  { q: "What are the best Emoji Kitchen combinations?", a: "The most popular combos capture moods individual emojis miss: 😂+😭 (crying-laughing), 😈+🥺 (devil pleading), and 🤡+😭 (crying clown). The double-emoji trick amplifies any expression. For unusual results, try cross-category combos like 🍕+😭 or the 🪄 magic wand trick." },
  { q: "Is Emoji Kitchen AI-generated?", a: "No. Every combination is a hand-crafted sticker illustration by Google's design team. When two emojis are selected, Gboard retrieves a pre-drawn sticker from the library — it doesn't generate anything in real time. If a combination has no artwork, no sticker appears. It's a curated archive, not a generative system." },
];

export default function KitchenFAQ() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({ "@type": "Question", name: faq.q, acceptedAnswer: { "@type": "Answer", text: faq.a } })),
  };

  return (
    <KSection kicker="FAQ" title="Frequently Asked Questions" dek="Everything you need to know about Emoji Kitchen.">
      <div className="fg-list">
        {FAQS.map((faq, i) => (
          <details key={i} className="fg-detail border-b border-[var(--line)]">
            <summary className="flex items-baseline gap-3 sm:gap-4 py-3.5 cursor-pointer">
              <span className="mono t-muted text-[0.62rem] w-6 shrink-0 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              <span className="font-read t-ink flex-1">{faq.q}</span>
              <svg className="fg-chev w-4 h-4 t-muted shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <p className="t-body leading-relaxed pb-4 max-w-2xl sm:pl-[2.6rem]">{faq.a}</p>
          </details>
        ))}
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </KSection>
  );
}
