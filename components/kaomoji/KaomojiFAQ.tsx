import { KSection } from "@/components/kitchen/Section";

const FAQS = [
  {
    q: "What is the difference between kaomoji and emoji?",
    a: "Kaomoji are plain Unicode text characters that render identically on every device, browser, and platform. Emoji are graphic images rendered by each operating system independently, which means a smiling emoji looks different on Apple, Samsung, and Google devices. Kaomoji originated in Japan in 1986; emoji originated in Japan in 1999, partly inspired by kaomoji culture. Both express emotion but through entirely different technical approaches. The practical consequence is that kaomoji are more portable — they work in plain text files, code comments, terminal windows, and email clients that block images, whereas emoji require an image-capable rendering environment.",
  },
  {
    q: "What does ¯\\_(ツ)_/¯ mean?",
    a: "The shruggie expresses indifference, resigned acceptance, uncertainty, or the feeling that something is beyond your control or understanding. It is the most widely recognized kaomoji in Western internet culture. The central character ツ is the Japanese katakana syllable “tsu” — it has no inherent emotional meaning in Japanese; it simply looks like a smiling face to eyes trained on Western facial reading conventions. The arms ¯\\ and /¯ complete the shrugging body posture. The combination captures something no standard emoji quite manages: the feeling of knowing something is wrong but having absolutely no ability to do anything about it.",
  },
  {
    q: "Is kaomoji Japanese?",
    a: "Yes. Kaomoji originated in Japan on June 20, 1986, when Yasushi Wakabayashi posted (^_^) on ASCII NET, a Japanese bulletin board service. The word itself is Japanese: kao (顔) means face, moji (文字) means character. The face-on reading direction, the kawaii aesthetic, the wide expressive range using eye characters, and the cultural tradition all have deep Japanese roots. Western emoticons developed independently and approximately simultaneously — Dr. Scott Fahlman proposed :-) four years earlier in 1982 — but the two traditions arrived at completely different visual languages through separate cultural paths.",
  },
  {
    q: "How do you get kaomoji on iPhone?",
    a: "Add the Japanese Romaji keyboard in Settings: go to Settings → General → Keyboard → Keyboards → Add New Keyboard, select Japanese, then Romaji, then Done. In any text field, press and hold the Globe icon, select the Japanese keyboard, tap the ^_^ symbol button, and browse the full kaomoji menu. Alternatively, set up text replacements in Settings under General and Keyboard for your most-used kaomoji, and they will auto-insert when you type their trigger words.",
  },
  {
    q: "What is the most popular kaomoji?",
    a: "(^_^) is the most used happy kaomoji globally and the oldest, dating to Yasushi Wakabayashi's 1986 post. ¯\\_(ツ)_/¯, known as the shruggie, is the most recognized kaomoji in Western internet culture. (╯°□°）╯︵ ┻━┻, the table flip, is the most iconic action kaomoji. (T_T) is the most used sad kaomoji. (´・ω・`) is the most used cute kaomoji.",
  },
  {
    q: "Why do kaomoji look different on some devices?",
    a: "Some kaomoji use full-width Japanese Unicode characters that not all fonts render equally. In older email clients, SMS messages, or environments with limited Unicode support, some characters may display as small boxes or question marks instead of their intended appearance. Standard kaomoji built from basic parentheses, underscores, carets, and common ASCII characters work universally. Advanced kaomoji that use Shift JIS characters, rare Unicode ranges, or combining characters may not render on all platforms. If you need a kaomoji that works everywhere without exception, stick to expressions built from characters in the basic Unicode range.",
  },
  {
    q: "Can you use kaomoji in professional settings?",
    a: "Yes, with appropriate context awareness. Developer documentation and commit messages are the most kaomoji-friendly professional environments. Internal team communication in Slack or Microsoft Teams casual channels is widely accepted across technology and creative industries. Client-facing email works only in established, informal relationships where the tone already allows it. Formal business proposals, legal documents, and first-contact professional correspondence are not appropriate contexts for kaomoji. The key question is whether the recipient will read the kaomoji as a sign of personality and warmth, or as a sign of unprofessionalism — in most technical communities, the answer is the former.",
  },
];

export default function KaomojiFAQ() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({ "@type": "Question", name: faq.q, acceptedAnswer: { "@type": "Answer", text: faq.a } })),
  };

  return (
    <KSection kicker="FAQ" title="Common Kaomoji Questions Answered" dek="The questions people ask most about Japanese text emoticons.">
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
