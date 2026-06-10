import { KSection } from "@/components/kitchen/Section";
import { Kbd, QuickAnswer } from "./parts";

const INTRO = [
  "The emoji copy-paste workflow means locating an emoji on a keyboard interface or website, copying it to your clipboard, then pasting it into a text field using Ctrl+V on Windows and Android, or Command+V on Mac and iPhone. This works universally — every platform, every application, every text field that accepts standard input.",
  "Most built-in emoji keyboards on Windows and Mac insert directly without a copy-paste step — you click the emoji and it appears where your cursor sits. The copy-paste workflow becomes relevant when you use an online emoji keyboard, when you need a sequence of emojis built in advance, or when you are sourcing an emoji from a conversation, website, or document to reuse elsewhere.",
];

const DETAILS = [
  { dt: "Building an emoji sequence", dd: "Rather than inserting emojis one at a time, type or paste several together in a notepad or text field, copy the entire row (🎉🎊🥳🎈), then paste the sequence wherever you need it — useful for social captions, email subject lines, or any specific combination." },
  { dt: "Copy-paste in specific apps", dd: "Gmail accepts pasted emojis in subject lines and bodies. New Outlook handles them in both the subject and body. WhatsApp Web pastes them correctly. Instagram captions accept them from desktop browsers. Twitter/X handles them normally. Discord and Slack accept pasted emojis but also have built-in pickers that are faster for single insertions." },
  { dt: "Why some emojis paste as boxes", dd: "This is a font-rendering problem, not a copy issue. The character was copied correctly — the receiving app lacks support for that Unicode range or uses a font without the emoji. The fix is usually updating the application, or on Windows ensuring the text uses a Unicode-compatible font like Segoe UI Emoji." },
  { dt: "Unicode character vs image emoji", dd: "When you copy an emoji from a keyboard or website, you are copying a Unicode text character — invisible in the clipboard but rendered as a colored symbol by the receiving app. A JPG or PNG of an emoji is an image file, not a text character, and cannot be pasted into a text field. Any legitimate copy-paste workflow copies the Unicode character." },
];

export default function CopyPasteWorkflow() {
  return (
    <KSection
      kicker="Copy & Paste"
      title="Emoji Keyboard Copy and Paste — The Complete Workflow"
      dek="When direct insertion isn't an option, the clipboard works everywhere."
    >
      <div className="fg-prose max-w-2xl mb-8">
        {INTRO.map((p, i) => <p key={i}>{p}</p>)}
      </div>

      <dl className="fg-deflist border-t border-[var(--line)] mb-8">
        {DETAILS.map((row) => (
          <div key={row.dt}><dt>{row.dt}</dt><dd>{row.dd}</dd></div>
        ))}
      </dl>

      <QuickAnswer q="How Do I Copy and Paste an Emoji on a PC?">
        Press <Kbd>Win + .</Kbd> to open the emoji panel, then click your emoji — it inserts right at
        the cursor with no further steps. For a copy-paste workflow, find your emoji on an online
        keyboard, click it to copy, then press <Kbd>Ctrl + V</Kbd> to paste into any text field. Both
        methods work across all Windows applications: browsers, email clients, Word, Outlook, and
        messaging apps.
      </QuickAnswer>

      <QuickAnswer q="Why Do Emojis Show as Boxes When I Paste Them?">
        Emojis appear as boxes or question marks when the receiving application or font does not
        support that Unicode range. This most commonly happens in older versions of Microsoft Office,
        some PDF editors, and apps with limited Unicode support. On Windows, switching to the Segoe UI
        Emoji font usually resolves it. Updating the application to its current version is the most
        reliable fix, as modern software handles all Unicode 16.0 characters correctly.
      </QuickAnswer>
    </KSection>
  );
}
