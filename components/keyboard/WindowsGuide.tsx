import { KSection } from "@/components/kitchen/Section";
import { Kbd, QuickAnswer } from "./parts";

const INTRO = [
  "On Windows 10 and Windows 11, the emoji keyboard is called the Emoji Panel. Press the Windows key + period (.) or the Windows key + semicolon (;) from any active text field to open it instantly. The panel is fully searchable, organized by category, and also includes GIFs via Tenor, kaomoji, and a symbols tab — making it considerably more than a basic emoji picker.",
  "Here is what most people discover only after a few sessions: the Emoji Panel remembers every emoji you pick. Your Recently Used row fills up fast, and by the third or fourth time you open the panel, you can usually find what you need in the first row without scrolling at all. That first session feels slow. The tenth feels instant.",
];

const STEPS = [
  "Click inside any text field in any application.",
  "Press Win + . (period) or Win + ; (semicolon).",
  "The Emoji Panel opens — browse categories along the top or use the search bar.",
  "Type a keyword in the search box (try “heart” rather than “red heart” — broader terms return better results).",
  "Click any emoji to insert it directly at your cursor.",
  "The panel stays open so you can insert multiple emojis without reopening.",
];

const TABS = [
  { dt: "Search function", dd: "Typing “party” returns 🎉🎊🥳 and related options in one result; “face” returns every facial emoji in the library. You do not need the official Unicode name — descriptive everyday words work reliably." },
  { dt: "GIF tab", dd: "Opens a Tenor-powered GIF search directly inside the Emoji Panel. Type a subject, select a GIF, and it inserts into supported apps (Slack, Teams, some messaging clients). It works best in apps that handle rich media input." },
  { dt: "Kaomoji tab", dd: "A full library of text-face expressions — ¯\\_(ツ)_/¯, (ง'̀-'́)ง, (ʘ‿ʘ) and hundreds more — organized by emotion. Genuinely underused; worth browsing once just to know it exists." },
  { dt: "Symbols tab", dd: "Currency signs, math operators, punctuation marks, and special characters from the same interface — faster than Insert → Symbol in Word for common characters." },
];

const WIN10_11 = "Windows 10 vs Windows 11: the panel works identically in both. Windows 11 added slightly smoother animations and improved search indexing for emoji names, but the core shortcut, layout, and features are the same. If you are on Windows 10 version 1709 or later, everything here applies to your system.";

const FEATURES: { feature: string; access: React.ReactNode; contains: string; tip: string }[] = [
  { feature: "Open Emoji Panel", access: <><Kbd>Win + .</Kbd> or <Kbd>Win + ;</Kbd></>, contains: "All Unicode emojis", tip: "Click a text field first" },
  { feature: "Search Function", access: "Type in search bar at top", contains: "Keyword-matched results", tip: "Use broad terms, not exact names" },
  { feature: "Recently Used", access: "First row of panel", contains: "Your last ~36 emojis", tip: "Gets useful faster than you expect" },
  { feature: "GIF Tab", access: "GIF icon in panel nav", contains: "Tenor GIF search", tip: "Works in rich media apps only" },
  { feature: "Kaomoji Tab", access: "(ツ) icon in panel nav", contains: "Text-face expressions", tip: "¯\\_(ツ)_/¯ lives here" },
  { feature: "Symbols Tab", access: "Ω icon in panel nav", contains: "Currency, math, punctuation", tip: "Faster than Insert → Symbol" },
  { feature: "Windows 10 Access", access: "Same shortcut", contains: "Full panel available", tip: "Requires build 1709+" },
  { feature: "Windows 11 Access", access: "Same shortcut", contains: "Identical panel, smoother UI", tip: "No setup needed" },
];

export default function WindowsGuide() {
  return (
    <KSection
      kicker="Windows · 11 & 10"
      title="How to Use the Emoji Keyboard on Windows"
      dek="The Emoji Panel — one shortcut, every app, plus GIFs, kaomoji, and symbols."
    >
      <div className="fg-prose max-w-2xl mb-8">
        {INTRO.map((p, i) => <p key={i}>{p}</p>)}
      </div>

      <p className="fg-label mb-4">Opening the Windows Emoji Panel</p>
      <ol className="fg-steps mb-8">
        {STEPS.map((text, i) => (
          <li key={i} className="fg-step">
            <span className="fg-step__n tabular-nums">{i + 1}</span>
            <div><p className="fg-step__t">{text}</p></div>
          </li>
        ))}
      </ol>

      <p className="fg-label mb-3">The four tabs most people never open</p>
      <dl className="fg-deflist border-t border-[var(--line)] mb-8">
        {TABS.map((row) => (
          <div key={row.dt}><dt>{row.dt}</dt><dd>{row.dd}</dd></div>
        ))}
      </dl>

      <div className="fg-pull fg-pull--sm mb-8">
        <span className="fg-kicker">Version Note</span>
        <p>{WIN10_11}</p>
      </div>

      <div className="fg-table-wrap mb-8">
        <table className="fg-table">
          <thead>
            <tr><th>Feature</th><th>How to Access</th><th>What It Contains</th><th>Pro Tip</th></tr>
          </thead>
          <tbody>
            {FEATURES.map((row) => (
              <tr key={row.feature}>
                <td className="strong">{row.feature}</td>
                <td>{row.access}</td>
                <td>{row.contains}</td>
                <td className="muted">{row.tip}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <QuickAnswer q="What Is the Shortcut for Emoji on Windows?">
        Press <Kbd>Win + .</Kbd> to open the emoji panel on Windows 10 and Windows 11.{" "}
        <Kbd>Win + ;</Kbd> is an identical alternative. Click a text field first to place your cursor
        — the panel requires an active insertion point to function. Once open, the panel stays
        available until you dismiss it, and it opens in under a second on any contemporary Windows
        device.
      </QuickAnswer>

      <QuickAnswer q="Why Is My Emoji Panel Not Working on Windows?">
        If <Kbd>Win + .</Kbd> does nothing, check three things in order: first, click directly inside
        a text field before pressing the shortcut — a cursor must be active or the panel will not
        trigger. Second, confirm your Windows version is 1709 or later (Settings → System → About).
        Third, open Windows Services and verify the Touch Keyboard and Handwriting Panel Service is
        running. Restarting the device resolves most panel issues after the first two checks pass.
      </QuickAnswer>
    </KSection>
  );
}
