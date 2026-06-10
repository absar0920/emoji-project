import { KSection } from "@/components/kitchen/Section";

const FAQS = [
  { q: "How do I get an emoji keyboard on my laptop?", a: "Both Windows and Mac laptops include a built-in emoji keyboard. On a Windows laptop, click a text field and press Windows key + period (.) to open the Emoji Panel. On a MacBook, click a text field and press Control + Command + Space bar to open the Character Viewer. Neither requires any download, installation, or setup on any laptop manufactured in the last five years." },
  { q: "What is the shortcut for the emoji keyboard on Windows?", a: "Press Windows key + period (.) to open the emoji keyboard on Windows 10 and Windows 11. Windows key + semicolon (;) works identically. Click inside a text field first — the shortcut requires an active cursor to function. The panel opens within one second and works across every Windows application including browsers, email clients, Word, and messaging apps." },
  { q: "What is the shortcut for emoji on Mac?", a: "Press Control + Command + Space bar simultaneously on Mac to open the Character Viewer emoji keyboard. Your cursor must be inside a text field before pressing the shortcut. Use Edit → Emoji & Symbols in the menu bar of most macOS apps as an alternative. Double-click any emoji in the panel to insert it at your cursor position." },
  { q: "How do I type emojis on a PC without a mouse?", a: "Press Win + . to open the emoji panel, then use Tab to navigate between sections and arrow keys to move between individual emojis. Press Enter to insert the highlighted emoji without clicking. In Slack or Discord, type a colon (:) followed by an emoji name — arrow keys navigate the suggestion list and Enter inserts — making emoji input entirely keyboard-driven with no mouse required." },
  { q: "How do I get the emoji keyboard on my iPhone?", a: "Tap any text field to bring up the keyboard, then tap the globe 🌐 icon or smiley face icon at the bottom-left to switch to the emoji keyboard. If neither icon appears, go to Settings → General → Keyboard → Keyboards → Add New Keyboard and select Emoji. The globe icon appears on your keyboard after adding it, allowing you to switch to emoji input from any app." },
  { q: "How do I use the emoji keyboard on Android?", a: "Tap any text field to open your keyboard, then tap the smiley face or emoji icon in the keyboard toolbar — usually near the spacebar. On Gboard, tap the magnifying glass inside the emoji panel to search by keyword. If the emoji icon is not visible, tap and hold the comma key, which often reveals a shortcut to the emoji keyboard in most Android keyboard apps." },
  { q: "What is the best emoji keyboard app for Android?", a: "Gboard by Google is the best emoji keyboard app for Android. It includes the full Unicode emoji set, keyword search, Emoji Kitchen combination stickers, GIF access, and sticker packs at no cost, and comes pre-installed on most Android devices. SwiftKey (Microsoft) is a strong alternative for users who want advanced emoji prediction based on their individual typing and emoji usage habits." },
  { q: "What is the best emoji keyboard app for iPhone?", a: "The built-in iOS emoji keyboard is excellent and includes the full Unicode set, natural-language emoji search, and skin tone modifiers. For users who want more features, Gboard for iOS adds Emoji Kitchen mashup stickers and GIF search. The native iOS keyboard requires no download and integrates seamlessly with every iPhone app — it is the best starting point for most users." },
  { q: "How do I use emojis in Outlook?", a: "In Outlook, press Win + . (Windows) or Ctrl+Cmd+Space (Mac) while the compose window is active to open the system emoji keyboard. New Outlook also has an emoji button in the formatting toolbar. Both methods insert Unicode characters that render correctly in Gmail, Apple Mail, and other modern email clients when the email is received." },
  { q: "How do I add emojis in Slack?", a: "In Slack, type a colon (:) in any message field to trigger emoji search. Begin typing any emoji name and a suggestion popover appears — arrow keys navigate it, Enter inserts. Alternatively, click the smiley face icon in the message toolbar for a visual emoji picker. Slack also supports custom workspace emojis uploaded by workspace administrators." },
  { q: "How do I fix the emoji keyboard not working on Windows?", a: "Try these fixes in order: click inside a text field before pressing Win + . (a cursor must be active); verify the Windows version is 1709 or later in Settings → System → About; restart the Touch Keyboard and Handwriting Panel Service in Windows Services (services.msc); restart the device. Most cases resolve after clicking inside a text field and retrying the shortcut." },
  { q: "Why do emojis show as boxes when I paste them?", a: "Boxes appear when the receiving application or active font does not support the Unicode character range for that emoji. In document editors on Windows this is typically fixed by switching to the Segoe UI Emoji font. Updating the receiving application to its current version is the most reliable fix. All modern web browsers, email clients, and updated versions of Microsoft Office render Unicode emojis correctly." },
  { q: "Can I use an emoji keyboard on a Chromebook?", a: "Yes. Chromebooks include a built-in emoji keyboard accessible by pressing Search + Shift + Space, or by right-clicking any text field and selecting “Emoji” from the context menu. Any online emoji keyboard also works in the Chrome browser on a Chromebook. The right-click method is often the most straightforward approach for Chromebook users." },
  { q: "How do I copy and paste an emoji on a PC?", a: "Press Win + . to open the Windows Emoji Panel and click an emoji — it inserts directly at the cursor with no copy-paste step needed. For a manual copy-paste workflow, find an emoji on an online emoji keyboard, click to copy, then press Ctrl+V to paste into any text field. Direct insertion via Win + . is faster for regular use." },
  { q: "Is there an online emoji keyboard I can use for free?", a: "Yes — multiple browser-based emoji keyboards are available at no cost and without creating an account. They display the full Unicode emoji set in a clickable interface: click an emoji to copy it, then paste with Ctrl+V or Cmd+V. They work on any device with a browser including public computers, Chromebooks, and tablets where installing a keyboard app is not possible." },
  { q: "How do I get new emojis on my keyboard?", a: "New emojis arrive through operating-system updates, not separate emoji keyboard updates. On Windows, run Windows Update; on iPhone, update iOS in Settings → General → Software Update; on Android, update the Gboard app via the Play Store. New emojis introduced in Unicode 15.1 and Unicode 16.0 require the OS or keyboard app to be updated to a version that includes them." },
  { q: "How do I add emoji to my keyboard on Android?", a: "Android keyboards (Gboard, Samsung Keyboard) already include emoji access — tap the smiley face or emoji icon in the keyboard toolbar to open the emoji panel. If you want a different keyboard experience, download a new keyboard app (like Gboard or SwiftKey) from the Play Store, install it, then go to Settings → General Management → Keyboard list and default to set it as your active keyboard." },
  { q: "What is Emoji Kitchen and how do I use it?", a: "Emoji Kitchen is a Gboard feature on Android that combines two standard emojis into a mashup sticker. When you type an emoji in a message on Android with Gboard, the suggestion bar above the keyboard shows Kitchen-generated combinations as tappable stickers. Tap any combination to send it as an image sticker in messaging apps that support image sharing. Google has created thousands of combinations, and the feature works automatically without any setup." },
];

export default function KeyboardFAQ() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({ "@type": "Question", name: faq.q, acceptedAnswer: { "@type": "Answer", text: faq.a } })),
  };

  return (
    <KSection kicker="FAQ" title="Emoji Keyboard — Frequently Asked Questions" dek="Quick answers to the questions people ask most.">
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
