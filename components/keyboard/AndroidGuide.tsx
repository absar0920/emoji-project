import { KSection } from "@/components/kitchen/Section";
import { QuickAnswer } from "./parts";

const INTRO = [
  "Android devices use Gboard (Google's keyboard) or a manufacturer keyboard like Samsung Keyboard, both of which include a full built-in emoji keyboard accessed by tapping the smiley face or emoji icon in the keyboard's toolbar. Gboard adds emoji search, real-time suggestions as you type, and Emoji Kitchen — a feature that combines two emojis into a mashup sticker that almost nobody outside dedicated Android communities knows about.",
  "Gboard's emoji search is genuinely excellent, and most Android users have no idea it exists. Once you know it is there — tap the magnifying glass inside the emoji panel — it changes how fast you can find specific emojis. It works with descriptive words exactly as you would expect: “fire,” “heart eyes,” “birthday,” “confused.” The results are accurate and fast, surfacing emojis that would take a full minute to locate by scrolling.",
];

const STEPS = [
  "Tap any text field to open the keyboard.",
  "Tap the smiley face or emoji icon in the toolbar (usually left of the spacebar).",
  "Browse categories along the top of the emoji panel, or tap the magnifying glass to search.",
  "Type a descriptive word in the search bar.",
  "Tap any emoji to insert at cursor position.",
];

const DETAILS = [
  { dt: "Emoji suggestions in the bar", dd: "As you type regular text, Gboard reads the context and places relevant emoji above the keyboard. Type “happy birthday” and birthday emojis appear as tappable suggestions; type “I love” and hearts surface. Most users dismiss this row as autocorrect — those small emoji icons are worth a second look." },
  { dt: "Samsung Keyboard differences", dd: "Samsung's emoji panel has a slightly different layout with direct access to Samsung's animated AR Emoji stickers and tighter integration with Samsung messaging apps. The core emoji library is identical to Gboard; the interface design and extra features differ." },
  { dt: "Android 14 & 15 updates", dd: "Android 14 improved emoji prediction accuracy and expanded Emoji Kitchen combinations. Android 15 added more nuanced skin-tone pairings and extended the emoji suggestion bar to more contexts, including Google Docs and the Chrome address bar." },
];

const TABLE = [
  { keyboard: "Gboard", access: "Smiley icon in toolbar", search: "Yes — magnifying glass", unique: "Emoji Kitchen mashups", best: "Most Android users" },
  { keyboard: "Samsung Keyboard", access: "Emoji icon in toolbar", search: "Yes", unique: "AR Emoji sticker integration", best: "Samsung device owners" },
  { keyboard: "SwiftKey", access: "Emoji icon", search: "Yes", unique: "Emoji prediction learning", best: "Heavy typists" },
  { keyboard: "Facemoji", access: "Emoji tab", search: "Yes", unique: "Custom emoji drawing", best: "Creative users" },
  { keyboard: "Default AOSP", access: "Basic emoji icon", search: "Limited", unique: "Standard Unicode only", best: "Stock Android / minimal" },
];

export default function AndroidGuide() {
  return (
    <KSection
      kicker="Android · Gboard & Samsung"
      title="The Android Emoji Keyboard — Gboard, Samsung, and Beyond"
      dek="Excellent built-in search, real-time suggestions, and Emoji Kitchen mashups."
    >
      <div className="fg-prose max-w-2xl mb-8">
        {INTRO.map((p, i) => <p key={i}>{p}</p>)}
      </div>

      <p className="fg-label mb-4">Using the Android emoji keyboard (Gboard)</p>
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
            <tr><th>Keyboard</th><th>Emoji Access</th><th>Search</th><th>Unique Feature</th><th>Best For</th></tr>
          </thead>
          <tbody>
            {TABLE.map((row) => (
              <tr key={row.keyboard}>
                <td className="strong">{row.keyboard}</td>
                <td>{row.access}</td>
                <td className="muted">{row.search}</td>
                <td>{row.unique}</td>
                <td className="muted">{row.best}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <QuickAnswer q="How Do I Get the Emoji Keyboard on Android?">
        Tap any text field to bring up the keyboard, then tap the smiley face or emoji icon — usually
        in the bottom row near the spacebar. On Gboard specifically, look for it in the symbol area
        next to the comma key. If the icon is not visible, tap and hold the comma key, which often
        reveals hidden shortcuts including the emoji access button.
      </QuickAnswer>

      <QuickAnswer q="How Do I Search for Emojis on Gboard?">
        Open the emoji keyboard by tapping the emoji icon, then tap the magnifying glass at the top
        of the panel. Type any descriptive word — “pizza,” “happy,” “celebration,” “confused” — and
        Gboard returns matching emojis instantly. This handles obscure emojis that would take several
        minutes to find by browsing categories manually, making it the fastest path to any specific
        emoji on Android.
      </QuickAnswer>
    </KSection>
  );
}
