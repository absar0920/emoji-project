import { KSection } from "@/components/kitchen/Section";
import { Kbd, QuickAnswer } from "./parts";

const INTRO = [
  "On Mac, the emoji keyboard is called the Character Viewer, and it opens by pressing Control + Command + Space bar simultaneously from any text field. A floating panel appears containing emojis, symbols, and special characters from across the entire Unicode standard — not just common emojis. Double-click any character to insert it at your cursor without closing the panel.",
  "Here is where Mac pulls ahead of Windows for power users: the Character Viewer search accepts descriptive language with unusual accuracy. Type “celebration” and you get 🎉🥳🎊. Type “money face” and you get 🤑. Type “thumbs” and both thumbs-up and thumbs-down appear immediately. Apple's search indexing inside the Character Viewer is quietly one of the best emoji search experiences across any platform.",
];

const STEPS = [
  "Click inside any text field.",
  "Press Control + Command + Space bar.",
  "Character Viewer opens as a floating panel.",
  "Browse emoji categories in the sidebar, or type in the search bar.",
  "Double-click any emoji to insert at cursor position.",
  "Or drag an emoji directly from the panel into a text field.",
];

const DETAILS = [
  { dt: "Full view mode", dd: "The compact view shows only emoji. Click the expand button (grid icon, top-right) to open the full Character Viewer window — every Unicode category: Technical Symbols, Braille Patterns, Letterlike Symbols, Mathematical Operators, Enclosed Alphanumerics, and more. If you work with special characters as well as emoji, the expanded view is worth knowing well." },
  { dt: "Favorites", dd: "Drag frequently used emojis or characters into a persistent Favorites row — the Mac equivalent of Windows' Recently Used, except you choose what goes there. Right-click any emoji and select “Add to Favorites,” or drag it to the Favorites section in the sidebar." },
  { dt: "Menu bar access", dd: "Most apps also expose it under Edit → Emoji & Symbols. Slower than the keyboard shortcut, but useful if you forget the key combination." },
  { dt: "Ventura & Sonoma updates", dd: "Apple improved Character Viewer search in both releases, with better handling of descriptive multi-word queries, faster indexing of newer Unicode additions, and smoother insertion in third-party apps." },
];

const TABLE: { method: string; access: React.ReactNode; works: string; extra: string }[] = [
  { method: "Character Viewer", access: <Kbd>Ctrl + Cmd + Space</Kbd>, works: "Any app with text input", extra: "Full Unicode character access" },
  { method: "Menu Bar Access", access: "Edit → Emoji & Symbols", works: "Most native Mac apps", extra: "No keyboard shortcut needed" },
  { method: "Search Function", access: "Type in search bar", works: "Within Character Viewer", extra: "Accepts descriptive language" },
  { method: "Favorites", access: "Right-click → Add to Favorites", works: "Persists across sessions", extra: "You choose what appears" },
  { method: "Full View Mode", access: "Expand icon (top-right)", works: "Character Viewer window", extra: "All Unicode categories" },
  { method: "Drag and Drop", access: "Drag from panel", works: "Supported apps", extra: "Precise placement" },
  { method: "Ventura / Sonoma Update", access: "Automatic with OS update", works: "All features", extra: "Improved search accuracy" },
];

export default function MacGuide() {
  return (
    <KSection
      kicker="macOS"
      title="How to Use the Emoji Keyboard on Mac"
      dek="Character Viewer — the deepest Unicode access of any built-in keyboard."
    >
      <div className="fg-prose max-w-2xl mb-8">
        {INTRO.map((p, i) => <p key={i}>{p}</p>)}
      </div>

      <p className="fg-label mb-4">Opening the Mac Character Viewer</p>
      <ol className="fg-steps mb-8">
        {STEPS.map((text, i) => (
          <li key={i} className="fg-step">
            <span className="fg-step__n tabular-nums">{i + 1}</span>
            <div><p className="fg-step__t">{text}</p></div>
          </li>
        ))}
      </ol>

      <dl className="fg-deflist border-t border-[var(--line)] mb-8">
        {DETAILS.map((row) => (
          <div key={row.dt}><dt>{row.dt}</dt><dd>{row.dd}</dd></div>
        ))}
      </dl>

      <div className="fg-table-wrap mb-8">
        <table className="fg-table">
          <thead>
            <tr><th>Method</th><th>Shortcut / Access</th><th>Works In</th><th>Extra Feature</th></tr>
          </thead>
          <tbody>
            {TABLE.map((row) => (
              <tr key={row.method}>
                <td className="strong">{row.method}</td>
                <td>{row.access}</td>
                <td>{row.works}</td>
                <td className="muted">{row.extra}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <QuickAnswer q="What Is the Emoji Keyboard Shortcut on Mac?">
        Press <Kbd>Ctrl + Cmd + Space</Kbd> simultaneously to open Character Viewer on any Mac. Your
        cursor must be inside a text field first. Edit → Emoji &amp; Symbols in the menu bar of most
        macOS apps is another way to access it. Double-click any emoji to insert it at the cursor.
        The shortcut works in Safari, Mail, Notes, Pages, Word for Mac, and any application that
        accepts standard text input.
      </QuickAnswer>

      <QuickAnswer q="How Do I Get More Emojis on My Mac Keyboard?">
        Click the expand button — a small grid icon in the top-right corner of the compact Character
        Viewer — to open the full window. This reveals every Unicode category, not just common
        emojis. Use Customize List in the sidebar to add categories like Technical Symbols, Braille,
        or Letterlike Symbols. Every emoji from Unicode 16.0 is available in the full view, including
        the most recently added characters.
      </QuickAnswer>
    </KSection>
  );
}
