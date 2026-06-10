import { KSection } from "@/components/kitchen/Section";
import { Kbd, QuickAnswer } from "./parts";

const INTRO = [
  "An online emoji keyboard is a browser-based tool displaying a clickable emoji panel on a web page — no installation, no account, no setup. Click an emoji and it copies automatically to your clipboard, then paste it anywhere: email, messaging apps, documents, social media. It works on any device with a browser, which makes it the universal fallback when other methods are not available.",
  "The use case is more specific than most people assume. An online keyboard is not really a replacement for your built-in shortcut on your own device. Where it shines: public computers at libraries or hotel business centers where you cannot change settings, work computers where IT policy prevents installing keyboards, Chromebooks where the built-in shortcut is less intuitive, older devices that predate the built-in panels, and Linux systems without a native emoji picker configured.",
  "The workflow is simple: navigate to the site, browse or search for your emoji, click it (most sites auto-copy), switch to your target app, and paste with Ctrl+V or Cmd+V. Some online keyboards let you click several emojis to build a sequence, then copy them all at once for a post or caption.",
  "Browser extensions are a compromise between built-in keyboards and websites. A Chrome emoji extension adds a clickable emoji icon to your toolbar, giving you a full panel one click away without leaving the page you are on — worth considering if you work mostly in a browser and find Win+. disruptive to your flow.",
  "For rare emojis, the built-in panels on Windows and Mac are comprehensive, but specialized Unicode characters — combining characters, archaic symbols, specific regional indicators — are often easier to find with a web-based Unicode tool than with the Character Viewer or Emoji Panel. For everyday emojis, online keyboards add little the built-in option lacks. For specialized characters, they often add a lot.",
];

const TABLE: { feature: string; builtin: string; online: string; winner: string }[] = [
  { feature: "Speed", builtin: "Instant shortcut", online: "Click + switch app + paste", winner: "Built-in" },
  { feature: "Emoji Range", builtin: "Full Unicode set", online: "Full Unicode set", winner: "Tie" },
  { feature: "Device Requirement", builtin: "Your own device", online: "Any device with a browser", winner: "Online" },
  { feature: "Installation", builtin: "None (built-in)", online: "None (website)", winner: "Tie" },
  { feature: "Works on Public PC", builtin: "No (shortcut blocked)", online: "Yes", winner: "Online" },
  { feature: "Rare Emoji Access", builtin: "Good", online: "Excellent (Unicode tools)", winner: "Online" },
  { feature: "Copy-Paste Workflow", builtin: "Direct insertion", online: "Manual paste step", winner: "Built-in" },
  { feature: "Offline Use", builtin: "Yes", online: "No", winner: "Built-in" },
];

export default function OnlineKeyboard() {
  return (
    <KSection
      kicker="Browser-Based"
      title="Online Emoji Keyboard — Use Emojis Without Installing Anything"
      dek="The universal fallback for public, locked-down, or unusual machines."
    >
      <div className="fg-prose max-w-2xl mb-8">
        {INTRO.map((p, i) => <p key={i}>{p}</p>)}
      </div>

      <div className="fg-table-wrap mb-8">
        <table className="fg-table">
          <thead>
            <tr><th>Feature</th><th>Built-In OS Keyboard</th><th>Online Emoji Keyboard</th><th>Winner</th></tr>
          </thead>
          <tbody>
            {TABLE.map((row) => (
              <tr key={row.feature}>
                <td className="strong">{row.feature}</td>
                <td>{row.builtin}</td>
                <td>{row.online}</td>
                <td className="muted">{row.winner}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <QuickAnswer q="What Is the Best Online Emoji Keyboard?">
        The best online emoji keyboards offer click-to-copy, the full Unicode 16.0 emoji set, keyword
        search, and category browsing — from any browser, without an account. For most users, any
        browser-based tool covering the complete current Unicode standard with a search bar satisfies
        every practical need. The differentiating factor is search quality and whether the site
        auto-copies on click versus requiring a manual copy step.
      </QuickAnswer>

      <QuickAnswer q="Can I Use an Emoji Keyboard on a Chromebook?">
        Yes. Chromebooks have a built-in emoji keyboard accessible with <Kbd>Search + Shift + Space</Kbd>,
        or by right-clicking any text field and selecting “Emoji” from the context menu. Any online
        emoji keyboard also works in Chrome on a Chromebook, giving you copy-paste access as a second
        option. The right-click method is often fastest for users who do not remember the shortcut.
      </QuickAnswer>
    </KSection>
  );
}
