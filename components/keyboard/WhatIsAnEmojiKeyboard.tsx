import { KSection } from "@/components/kitchen/Section";
import { Kbd, QuickAnswer } from "./parts";

const TYPES = [
  {
    t: "Built-in OS emoji keyboards",
    d: "Come pre-installed with Windows, macOS, iOS, and Android — no setup required beyond knowing the shortcut.",
  },
  {
    t: "Third-party emoji keyboard apps",
    d: "Apps like Gboard, SwiftKey, and Facemoji replace or extend the built-in keyboard with larger libraries, smarter predictions, and custom features.",
  },
  {
    t: "Online emoji keyboards",
    d: "Browser-based tools that display a clickable emoji panel on any web page — click an emoji, it copies to your clipboard, then paste it anywhere.",
  },
];

const BODY = [
  "An emoji keyboard is an input tool — either built into your operating system, available as a third-party app, or accessible through a browser — that lets you find and insert any emoji character into a text field. Unlike typing letters, emoji input requires a visual interface because there are over 3,700 emojis in the Unicode 16.0 standard, each with its own code point that your device translates into a visible colored symbol.",
  "The key distinction between an emoji keyboard and an emoji website matters for how you actually use them. An emoji keyboard integrates directly with your current text field — click or tap an emoji and it appears where your cursor sits, instantly. An emoji copy-paste website requires you to visit an external page, copy a character, switch back to your app, and paste manually. Keyboards are faster for regular use. Websites are useful for rare or specialized emojis that might not appear in the standard panel.",
  "Every emoji you type is, at the technical level, a Unicode character — a standardized code point assigned by the Unicode Consortium that all modern operating systems and apps recognize. When you press the 😂 emoji, your device inserts Unicode character U+1F602. The receiving app or device renders that code point as its own visual version of the emoji, which is why the same emoji can look different on an iPhone versus an Android phone.",
];

export default function WhatIsAnEmojiKeyboard() {
  return (
    <KSection
      kicker="Fundamentals"
      title="What Is an Emoji Keyboard? Definition, Types, and How It Works"
      dek="Three kinds of keyboard, one shared idea: a visual way to insert Unicode characters."
    >
      <div className="fg-prose max-w-2xl mb-8">
        <p>{BODY[0]}</p>
      </div>

      <p className="fg-label mb-3">The three categories</p>
      <dl className="fg-deflist border-t border-[var(--line)] mb-8">
        {TYPES.map((row) => (
          <div key={row.t}>
            <dt>{row.t}</dt>
            <dd>{row.d}</dd>
          </div>
        ))}
      </dl>

      <div className="fg-prose max-w-2xl mb-8">
        <p>{BODY[1]}</p>
        <p>{BODY[2]}</p>
      </div>

      <div className="fg-pull fg-pull--sm">
        <span className="fg-kicker">Why This Matters in 2026</span>
        <p>
          Emoji are no longer casual extras in personal messaging. They appear in professional
          communications, marketing copy, product descriptions, and even legal documents. Accessing
          an emoji keyboard fluidly — without breaking your typing flow — has become a genuine
          productivity factor.
        </p>
      </div>

      <QuickAnswer q="What Is the Difference Between an Emoji Keyboard and Emoji Copy-Paste?">
        An emoji keyboard inserts a character directly into your active text field the moment you
        click or tap it — no switching between apps. An emoji copy-paste workflow involves visiting
        an external site or panel, copying the character, then returning to your document to paste.
        For everyday use, keyboards are meaningfully faster. Copy-paste from a website makes sense
        mainly for obscure emojis absent from the built-in set.
      </QuickAnswer>

      <QuickAnswer q="Are Emoji Keyboards Built Into Every Device?">
        Yes — Windows 10 and later, macOS, iOS, and Android all include native emoji keyboards at no
        cost and with no download. Windows calls it the Emoji Panel, accessible with{" "}
        <Kbd>Win + .</Kbd>. Mac calls it Character Viewer, opened with <Kbd>Ctrl + Cmd + Space</Kbd>.
        iPhone displays an emoji tab in the standard keyboard. Android keyboards (Gboard, Samsung)
        include an emoji icon in the keyboard toolbar. Nothing to install on any modern device.
      </QuickAnswer>
    </KSection>
  );
}
