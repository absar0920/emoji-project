import { KSection } from "@/components/kitchen/Section";

const FAQS = [
  { q: "What is the best free emoji maker available right now?", a: "It depends on your workflow. For component-based design with full layer control, photo import, text tools, and custom export dimensions, a browser-based builder that requires no account is the most accessible starting point. For converting existing images into Discord, Slack, or Twitch-ready emoji with automatic background removal and animation, look for an upload-first creator. Most AI generators offer a limited number of free daily generations from text prompts before requiring a premium plan." },
  { q: "Can you make your own emoji without any design experience?", a: "Yes. The tools available in 2026 are built specifically for users with no design background. Component-based editors work through point-and-click selection of pre-built features. Upload-based tools require only an existing image and a few adjustments. AI generators require nothing more than a clear text description. The most important skill is clear intent — knowing what emotion or reaction you want makes every tool easier to use." },
  { q: "How do you make your own emoji on iPhone for free?", a: "Apple's Memoji system is built in and completely free: open Messages, tap the App Store icon next to the input field, select Memoji, and tap the plus icon to start. For a custom emoji that works outside the Apple ecosystem on Discord, Slack, or Twitch, open Safari and use any browser-based free emoji maker — the canvas loads on mobile without an app download. Export as PNG or GIF, save to your camera roll, and upload to the target platform." },
  { q: "How do you add a custom emoji to Discord?", a: "You need the Manage Emoji permission in the target server. Go to Server Settings → Emoji → Upload Emoji. Discord accepts PNG, JPG, and GIF; static emoji must be under 256 KB at a maximum of 128 × 128 pixels. After upload, the emoji appears in the server's picker and any member can use it. There are 50 emoji slots at the base boost level and 500 at the maximum tier." },
  { q: "What is the difference between an emoji sticker maker and a regular emoji creator?", a: "A standard emoji creator produces small images — typically 128 × 128 pixels — for inline chat reactions. A sticker maker produces larger images — typically 512 × 512 pixels — for sticker packs on WhatsApp and Telegram. The format differs too: WhatsApp stickers require WebP, while standard chat emoji use PNG or GIF. Stickers can carry more visual detail because they render at a significantly larger size." },
  { q: "What file format should I export a custom emoji in?", a: "For nearly every static emoji that needs a transparent background, use PNG. Use GIF for animated emoji that loop. Use WebP for WhatsApp and Telegram sticker packs. Avoid JPG for emoji under any circumstances — it doesn't support transparency and introduces visible compression artifacts at small sizes. Always check your target platform's file-size limit before uploading." },
  { q: "How do I make a Twitch emote that meets all channel requirements?", a: "Twitch requires emotes in three sizes — 28 × 28, 56 × 56, and 112 × 112 pixels — all PNG, with a 1 MB limit. The key consideration is that emotes display at 28 pixels by default in chat, so design with extreme simplicity: thick outlines, high contrast, one dominant expression, and zero fine detail. If it isn't immediately readable at 28 pixels, viewers won't adopt it no matter how impressive it looks at 112." },
  { q: "What is an emoji mixer and how does it work?", a: "An emoji mixer (emojimix) combines two existing Unicode emoji into a single hybrid design. You select two standard emoji as inputs and the tool generates a blended image incorporating features from both — Google's Emoji Kitchen is the most widely used implementation. Beyond entertainment, it's genuinely useful for design inspiration: combinations that stay readable at small sizes teach you which visual features carry the most expressive weight when compressed to chat dimensions." },
];

export default function MakerFAQ() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({ "@type": "Question", name: faq.q, acceptedAnswer: { "@type": "Answer", text: faq.a } })),
  };

  return (
    <KSection kicker="Section 09 · FAQ" title="Frequently Asked Questions" dek="The questions people ask most about making custom emoji.">
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
