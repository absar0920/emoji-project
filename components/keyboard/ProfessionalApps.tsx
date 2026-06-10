import { KSection } from "@/components/kitchen/Section";
import { Kbd, QuickAnswer } from "./parts";

const INTRO = [
  "Professional apps including Slack, Microsoft Teams, Outlook, Gmail, and Google Docs all support emoji input, each with a slightly different access method. Slack and Discord use a colon (:) trigger for keyboard-driven search. Outlook and Gmail support both the OS shortcut and their own emoji buttons. Google Docs uses the OS shortcut and an Insert menu option, with emojis rendering in printed and PDF output since the 2023 Docs update.",
  "Nobody talks about this enough: the universal shortcut — Win + . on Windows, Ctrl+Cmd+Space on Mac — works across all of these apps without exception. You never need to learn each app's specific emoji button location if you have the OS shortcut memorized. That is the single most practical takeaway for professionals moving between Outlook, Teams, a browser, and Docs all day.",
];

const DETAILS = [
  { dt: "Slack", dd: "Type a colon (:) in any message field to trigger the emoji search popover — :fir returns fire-related emojis, :heart returns all heart variations. Arrow keys navigate, Enter inserts. Slack also supports custom workspace emojis (:company-logo:, :approved:) and emoji reactions on any message." },
  { dt: "Microsoft Teams", dd: "Teams has a native emoji button (smiley icon) in the compose toolbar. Win+. also works in the message field on Windows. Teams expanded emoji reactions in 2023, allowing any emoji as a reaction rather than a fixed set." },
  { dt: "Outlook", dd: "The emoji button in new Outlook lives in the formatting toolbar. In classic Outlook, insert via Win+. or copy-paste. Emojis display correctly across modern email clients — Gmail, Apple Mail, Thunderbird, Yahoo Mail — as Unicode characters." },
  { dt: "Gmail", dd: "The smiley icon in the compose toolbar opens a small picker. The OS shortcut also works while the compose window is focused. Emojis in Gmail subject lines display in most email clients." },
  { dt: "Google Docs", dd: "Use Insert → Emoji in the menu, or the OS shortcut while your cursor is in the document. Since a 2023 update, emojis render in exported PDFs and printed documents when using Chrome-based export." },
];

const TABLE = [
  { app: "Slack", method: ": + emoji name", os: "Yes (Win/Mac)", custom: "Yes (workspace)", reactions: "Yes (any emoji)" },
  { app: "Microsoft Teams", method: "Toolbar emoji button", os: "Yes", custom: "Limited", reactions: "Yes (expanded set)" },
  { app: "Outlook", method: "Toolbar button (new Outlook)", os: "Yes", custom: "No", reactions: "No" },
  { app: "Gmail", method: "Smiley icon in compose", os: "Yes", custom: "No", reactions: "No" },
  { app: "Google Docs", method: "Insert → Emoji", os: "Yes", custom: "No", reactions: "No" },
  { app: "Google Slides", method: "Insert → Special Characters", os: "Yes", custom: "No", reactions: "No" },
  { app: "Notion", method: "/emoji command", os: "Yes", custom: "No", reactions: "No" },
  { app: "Zoom Chat", method: "Emoji icon in chat", os: "Yes (desktop app)", custom: "No", reactions: "Yes" },
];

export default function ProfessionalApps() {
  return (
    <KSection
      kicker="At Work"
      title="Emoji Keyboard in Professional Apps"
      dek="Slack, Teams, Outlook, Gmail, Docs — and the one shortcut that works in all of them."
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
            <tr><th>App</th><th>Primary Emoji Method</th><th>OS Shortcut?</th><th>Custom Emoji</th><th>Reactions</th></tr>
          </thead>
          <tbody>
            {TABLE.map((row) => (
              <tr key={row.app}>
                <td className="strong whitespace-nowrap">{row.app}</td>
                <td>{row.method}</td>
                <td className="muted">{row.os}</td>
                <td className="muted">{row.custom}</td>
                <td className="muted">{row.reactions}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <QuickAnswer q="How Do I Type an Emoji in Outlook?">
        In Outlook, press <Kbd>Win + .</Kbd> (Windows) or <Kbd>Ctrl + Cmd + Space</Kbd> (Mac) from the
        compose window to open the emoji keyboard. New Outlook also includes an emoji button in the
        formatting toolbar. Both methods insert Unicode emojis that display correctly when received in
        Gmail, Apple Mail, and other modern clients. The OS shortcut is faster if your hands are
        already on the keyboard.
      </QuickAnswer>
    </KSection>
  );
}
