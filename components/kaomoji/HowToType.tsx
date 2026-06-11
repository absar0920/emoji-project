import Link from "next/link";
import { KSection } from "@/components/kitchen/Section";
import { Kbd } from "./parts";

const IPHONE_1 = [
  "Open Settings on your iPhone.",
  "Tap General, then Keyboard, then Keyboards.",
  "Tap Add New Keyboard.",
  "Select Japanese, then select Romaji.",
  "Tap Done to save the keyboard.",
  "Open any app with a text field.",
  "Press and hold the Globe icon at the bottom left of the keyboard.",
  "Select Japanese from the keyboard options.",
  "Tap the symbol key — you will see a ^_^ button appear.",
  "Tap that button to open the kaomoji menu.",
  "Browse the categories and tap any kaomoji to insert it instantly.",
];

const IPHONE_2 = [
  "Follow the same steps as Method 1, but select Kana instead of Romaji.",
  "Switch to the Japanese Kana keyboard in any text field.",
  "Tap the ^_^ button in the keyboard layout.",
  "Browse and tap to insert.",
];

const WINDOWS = [
  "Click into any text field where you want to type.",
  "Press Win + . (the Windows key and the period key together).",
  "The emoji panel opens near your cursor.",
  "Click the kaomoji tab at the top of the panel — it looks like a text-face icon.",
  "Browse by emotion category or scroll the full list.",
  "Click any kaomoji to insert it at your cursor position.",
];

const MAC = [
  "Open System Preferences (or System Settings on newer macOS).",
  "Click Keyboard, then Text Replacements.",
  "Click the + button to add a new replacement.",
  "In the Replace field, type a short trigger word (example: shrug).",
  "In the With field, paste the kaomoji: ¯\\_(ツ)_/¯",
  "Click Add to save.",
];

const ANDROID = [
  { dt: "Copy & paste", dd: "Copy from a kaomoji library website or app into any text field. This is the most universal method and works in every app on Android." },
  { dt: "Samsung Keyboard", dd: "Galaxy devices include some kaomoji-style text faces in the emoticon category. Tap the emoji icon in the keyboard, then look for the text emoticons or emoticon tab." },
  { dt: "Third-party keyboard apps", dd: "Apps on the Google Play Store include dedicated kaomoji libraries. SwiftKey has historically offered some kaomoji support. Search for “kaomoji keyboard” in the Play Store for current options." },
];

const REPLACEMENTS: [string, string, string][] = [
  ["shrug", "¯\\_(ツ)_/¯", "Indifference"],
  ["happy", "(^_^)", "Joy"],
  ["sad", "(T_T)", "Sadness"],
  ["cry", "(╥﹏╥)", "Deep sadness"],
  ["angry", "(╬▔皿▔)", "Anger"],
  ["flip", "(╯°□°）╯︵ ┻━┻", "Frustration"],
  ["fight", "(ง •̀_•́)ง", "Determination"],
  ["love", "(｡♥‿♥｡)", "Affection"],
  ["hug", "(づ｡◕‿‿◕｡)づ", "Comfort"],
  ["bear", "ʕ•ᴥ•ʔ", "Cute affection"],
];

function Steps({ items }: { items: string[] }) {
  return (
    <ol className="fg-steps mb-8">
      {items.map((text, i) => (
        <li key={i} className="fg-step">
          <span className="fg-step__n tabular-nums">{i + 1}</span>
          <div><p className="fg-step__t">{text}</p></div>
        </li>
      ))}
    </ol>
  );
}

export default function HowToType() {
  return (
    <KSection
      kicker="How to Type"
      title="How to Type Kaomoji on Any Device"
      dek="Every major platform can reach kaomoji — the method just differs by device."
    >
      <h3 className="font-display t-ink text-[1.35rem] sm:text-[1.6rem] mb-2">How to Get Kaomoji on iPhone</h3>
      <p className="t-muted font-read max-w-2xl mb-5">iPhone has a hidden kaomoji keyboard built into the Japanese input system. There are two ways in.</p>
      <p className="fg-label mb-4">Method 1 · Japanese Romaji keyboard</p>
      <Steps items={IPHONE_1} />
      <p className="fg-label mb-4">Method 2 · Japanese Kana keyboard</p>
      <Steps items={IPHONE_2} />
      <div className="fg-pull fg-pull--sm mb-10">
        <span className="fg-kicker">Pro Tip</span>
        <p>Set up text replacements on a Mac sharing your Apple ID and they sync to iPhone automatically through iCloud — your saved kaomoji shortcuts follow you across devices with no extra setup.</p>
      </div>

      <h3 className="font-display t-ink text-[1.35rem] sm:text-[1.6rem] mb-2">How to Type Kaomoji on Windows 10 &amp; 11</h3>
      <p className="t-muted font-read max-w-2xl mb-5">
        Windows has a full kaomoji library built directly into its emoji panel — press <Kbd>Win + .</Kbd> to open it.
      </p>
      <Steps items={WINDOWS} />
      <p className="t-body font-read max-w-2xl mb-10">This works in any text field across Windows: email, browser address bars, Notepad, Word, and messaging apps. The kaomoji panel on Windows 11 organizes expressions by category including happy, sad, angry, surprised, and more.</p>

      <h3 className="font-display t-ink text-[1.35rem] sm:text-[1.6rem] mb-2">How to Type Kaomoji on Mac</h3>
      <p className="t-muted font-read max-w-2xl mb-5">
        Mac’s Character Viewer (<Kbd>Ctrl + Cmd + Space</Kbd>) has no dedicated kaomoji tab. The best method is text replacements, which give you permanent one-word access to your favorites.
      </p>
      <Steps items={MAC} />
      <p className="t-body font-read max-w-2xl mb-3">Now every time you type “shrug” followed by a space in any Mac application, it auto-replaces with ¯\_(ツ)_/¯. Set up your ten most-used kaomoji as shortcuts and you never need to look them up again.</p>
      <p className="t-body font-read max-w-2xl mb-10">iCloud syncs these replacements to your iPhone automatically if both devices share the same Apple ID. One setup, two devices covered.</p>

      <h3 className="font-display t-ink text-[1.35rem] sm:text-[1.6rem] mb-2">How to Type Kaomoji on Android</h3>
      <p className="t-muted font-read max-w-2xl mb-5">Android is less straightforward: standard Gboard has no dedicated kaomoji tab, and its Emoji Kitchen output is images, not kaomoji text. Your practical options:</p>
      <dl className="fg-deflist border-t border-[var(--line)] mb-10">
        {ANDROID.map((row) => (
          <div key={row.dt}><dt>{row.dt}</dt><dd>{row.dd}</dd></div>
        ))}
      </dl>

      <h3 className="font-display t-ink text-[1.35rem] sm:text-[1.6rem] mb-2">Add Kaomoji to Your Keyboard Permanently</h3>
      <p className="t-muted font-read max-w-2xl mb-5">Text replacements are the most efficient long-term solution on both Mac and iPhone. Here are ten recommended shortcuts to set up:</p>
      <div className="fg-table-wrap mb-8">
        <table className="fg-table">
          <thead>
            <tr><th>Trigger Word</th><th>Kaomoji</th><th>Emotion</th></tr>
          </thead>
          <tbody>
            {REPLACEMENTS.map(([trigger, k, emotion]) => (
              <tr key={trigger}>
                <td className="mono t-accent whitespace-nowrap">{trigger}</td>
                <td className="mono" style={{ fontSize: "0.95rem" }}>{k}</td>
                <td className="muted">{emotion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="t-body font-read max-w-2xl">
        These methods lean on the built-in emoji panels each platform ships — for the full tour, see the{" "}
        <Link href="/tools/emoji-keyboard" className="fg-link">Emoji Keyboard guide</Link>.
      </p>
    </KSection>
  );
}
