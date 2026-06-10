import { KSection } from "@/components/kitchen/Section";
import { Kbd, QuickAnswer } from "./parts";

const INTRO = [
  "Every major platform has a dedicated keyboard shortcut for opening the emoji keyboard. Windows uses Win + ., Mac uses Ctrl+Cmd+Space, iPhone and Android rely on the smiley icon in the touch keyboard, and Chrome OS uses Search+Shift+Space. Knowing your platform's shortcut — and only needing to know one — is the fastest path to emoji input in any context.",
  "This trips most people up: they learn the Windows shortcut, try it on a Mac, and get confused. The shortcuts are not universal — each platform made independent decisions. But each is easy to remember once you use it a few times; the muscle memory forms faster than you might expect, usually within a week of intentional use.",
];

const DETAILS = [
  { dt: "App-specific shortcuts", dd: "Slack uses the colon (:) trigger — type a colon then an emoji name (:fire:, :tada:, :heart:) and a suggestion popover appears. Discord uses the identical system. Gmail's emoji button sits in the compose toolbar. New Outlook has an emoji button in the message toolbar, but Win+. works directly in the compose field and is faster." },
  { dt: "Keyboard-only in Slack & Discord", dd: "Type a colon, then begin spelling the emoji name. A picker appears above your cursor — use arrow keys to navigate, Enter to insert. You never leave the keyboard or reach for the mouse. For heavy users, this colon shortcut becomes faster than any panel-based method." },
];

const ROWS: { platform: string; primary: React.ReactNode; alt: React.ReactNode; works: string }[] = [
  { platform: "Windows 11", primary: <Kbd>Win + .</Kbd>, alt: <Kbd>Win + ;</Kbd>, works: "All apps with text fields" },
  { platform: "Windows 10", primary: <Kbd>Win + .</Kbd>, alt: <Kbd>Win + ;</Kbd>, works: "All apps (build 1709+)" },
  { platform: "macOS", primary: <Kbd>Ctrl + Cmd + Space</Kbd>, alt: "Edit → Emoji & Symbols", works: "All native apps" },
  { platform: "iPhone iOS", primary: "Tap 🌐 or 😊 icon", alt: "Search bar in emoji panel", works: "All iOS apps" },
  { platform: "Android Gboard", primary: "Tap emoji / smiley icon", alt: "Hold comma key", works: "All Android apps" },
  { platform: "Samsung Android", primary: "Tap emoji icon", alt: "Samsung keyboard settings", works: "Samsung + third-party" },
  { platform: "Chrome OS", primary: <Kbd>Search + Shift + Space</Kbd>, alt: "Right-click → Emoji", works: "Chrome browser + native apps" },
  { platform: "Linux", primary: <Kbd>Ctrl + .</Kbd>, alt: "IBus emoji picker", works: "Varies by distro" },
  { platform: "Slack", primary: "Type : + emoji name", alt: "Toolbar emoji button", works: "Slack only" },
  { platform: "Discord", primary: "Type : + emoji name", alt: "+ Emoji button", works: "Discord only" },
  { platform: "Microsoft Teams", primary: "Emoji icon in toolbar", alt: <Kbd>Win + .</Kbd>, works: "Teams messages" },
  { platform: "Outlook", primary: <Kbd>Win + .</Kbd>, alt: "Outlook emoji button", works: "Compose window" },
  { platform: "Gmail", primary: "Smiley icon in toolbar", alt: "OS shortcut", works: "Compose window" },
];

export default function ShortcutsReference() {
  return (
    <KSection
      kicker="Reference"
      title="Emoji Keyboard Shortcuts — Every Platform in One Place"
      dek="Bookmark this. One shortcut per platform is all the muscle memory you need."
    >
      <div className="fg-prose max-w-2xl mb-8">
        {INTRO.map((p, i) => <p key={i}>{p}</p>)}
      </div>

      <dl className="fg-deflist border-t border-[var(--line)] mb-8">
        {DETAILS.map((row) => (
          <div key={row.dt}><dt>{row.dt}</dt><dd>{row.dd}</dd></div>
        ))}
      </dl>

      <div className="fg-table-wrap mb-8">
        <table className="fg-table">
          <thead>
            <tr><th>Platform / Device</th><th>Primary Shortcut</th><th>Alternative</th><th>Works In</th></tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.platform}>
                <td className="strong whitespace-nowrap">{row.platform}</td>
                <td>{row.primary}</td>
                <td>{row.alt}</td>
                <td className="muted">{row.works}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <QuickAnswer q="What Is the Keyboard Shortcut for Emojis on a Laptop?">
        On a Windows laptop, press <Kbd>Win + .</Kbd> from any text field to open the emoji panel. On
        a MacBook, press <Kbd>Ctrl + Cmd + Space</Kbd> to open Character Viewer. Both work in any
        application — email, browsers, document editors, messaging apps. No setup is required on any
        laptop purchased in the last four years; both OSes include native emoji panels as standard.
      </QuickAnswer>

      <QuickAnswer q="How Do I Type Emojis Using Only My Keyboard (No Mouse)?">
        On Windows, press <Kbd>Win + .</Kbd>, then use Tab to move between sections (emoji, GIF,
        kaomoji, symbols) and arrow keys to navigate individual emojis — press Enter to insert. On
        Mac, press <Kbd>Ctrl + Cmd + Space</Kbd>, then Tab and arrow keys work similarly. In Slack and
        Discord, type a colon followed by the emoji name, then arrow keys plus Enter — entirely
        keyboard-driven, no mouse required.
      </QuickAnswer>
    </KSection>
  );
}
