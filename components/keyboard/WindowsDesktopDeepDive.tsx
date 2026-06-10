import { KSection } from "@/components/kitchen/Section";
import { Kbd, QuickAnswer } from "./parts";

const INTRO = [
  "On a Windows PC, the emoji keyboard — the Emoji Panel — is accessible from any desktop application using Win + ., and it works everywhere: Microsoft Word, Excel, Outlook, Notepad, every major browser, and messaging clients. No additional software is needed on Windows 10 or Windows 11.",
  "The difference between the Windows panel and a mobile keyboard is subtle but worth understanding. On mobile, the emoji keyboard replaces your entire text keyboard. On Windows, the Emoji Panel floats over whatever you are working in — your cursor stays exactly where it was, the panel opens on top, you click an emoji, and it either closes or stays open depending on your settings. Your workflow is interrupted for about two seconds on the first use and practically not at all once the shortcut is muscle memory.",
];

const DETAILS = [
  { dt: "Microsoft Word", dd: "Win+. works directly in the document window — click inside, press the shortcut, and the panel opens. Word renders Unicode emojis in color using Segoe UI Emoji, installed by default. The alternative, Insert → Symbol → More Symbols, reaches the same characters but takes far more clicks for common emojis." },
  { dt: "Microsoft Excel", dd: "Emojis insert into cells as text characters and display in color. Increase the row height and the emoji renders larger. Emojis export correctly to PDF from modern Office versions; if you are building emoji-containing spreadsheets for sharing, test recipient rendering first, as older Excel versions occasionally render certain Unicode characters inconsistently." },
  { dt: "Outlook email", dd: "Win+. works in the compose window, and new Outlook (2023+) also added an emoji button in the formatting toolbar. The shortcut is generally faster because your fingers are already on the keyboard. Emojis render correctly in Gmail, Apple Mail, and other modern clients when received." },
  { dt: "Windows 11 Notepad", dd: "The refreshed Notepad supports full Unicode rendering, so emojis paste and display correctly for the first time. Older Notepad on Windows 10 rendered some Unicode characters as boxes — fixed in the Windows 11 version." },
];

export default function WindowsDesktopDeepDive() {
  return (
    <KSection
      kicker="Windows · Desktop"
      title="Emoji Keyboard for PC — Windows Desktop Deep Dive"
      dek="One floating panel that works the same across Word, Excel, Outlook, and Notepad."
    >
      <div className="fg-prose max-w-2xl mb-8">
        {INTRO.map((p, i) => <p key={i}>{p}</p>)}
      </div>

      <dl className="fg-deflist border-t border-[var(--line)] mb-8">
        {DETAILS.map((row) => (
          <div key={row.dt}><dt>{row.dt}</dt><dd>{row.dd}</dd></div>
        ))}
      </dl>

      <QuickAnswer q="How Do I Add Emoji to a Windows PC Keyboard?">
        No addition is necessary — Windows PCs already have a built-in emoji keyboard. Press{" "}
        <Kbd>Win + .</Kbd> from any text field to open the Emoji Panel on both Windows 10 and Windows
        11. It works across all applications: Word, Excel, Outlook, Notepad, Chrome, Firefox, and
        messaging apps. No download, installation, or third-party software is required.
      </QuickAnswer>

      <QuickAnswer q="Can I Use Emojis in Microsoft Word on Windows?">
        Yes. In Word, press <Kbd>Win + .</Kbd> to open the emoji panel and click any emoji to insert
        it at the cursor. Word renders Unicode emojis in color using the Segoe UI Emoji font included
        with Windows. For less common characters, use Insert → Symbol as a secondary option. The
        shortcut is faster for standard emojis in everyday documents and requires no menu navigation.
      </QuickAnswer>
    </KSection>
  );
}
