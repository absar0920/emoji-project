import { KSection } from "@/components/kitchen/Section";
import { QuickAnswer } from "./parts";

const INTRO = [
  "The iPhone emoji keyboard is built into iOS and switched to by tapping the globe 🌐 or smiley face 😊 icon on the standard keyboard. It displays a full scrollable emoji library sorted into categories, a Frequently Used row that updates based on your habits, and a search bar that accepts plain-language descriptions — a feature most iPhone users scroll past without ever tapping.",
  "That search bar at the top is easy to miss, because the Frequently Used row draws your eye first. But it accepts natural-language queries with genuine intelligence. Type “nervous” and 😰😟😬 appear. Type “celebration” and you get 🎉🥳🎊. Type “dog” and every dog-related emoji surfaces. For anyone who regularly hunts through emoji categories, this single feature saves meaningful time.",
];

const STEPS = [
  "Open any app with a text field and tap to bring up the keyboard.",
  "Tap the globe 🌐 icon (if you have multiple keyboards) or the smiley face 😊 icon.",
  "The emoji keyboard opens — scroll horizontally through categories at the bottom.",
  "Or tap the search bar at the top and type a descriptive word.",
  "Tap any emoji to insert it at the cursor position.",
  "Tap the ABC key (bottom-left) to return to the standard keyboard.",
];

const DETAILS = [
  { dt: "Category navigation", dd: "The categories run: Often Used, People & Smiles, Nature & Animals, Food & Drink, Travel & Places, Activities, Objects, Symbols, and Flags." },
  { dt: "Skin tone & gender modifiers", dd: "Press and hold a person, hand, or face emoji to see a popover with skin tone options, then release on your selection. This works for hundreds of emojis including 👍, 🤝, and 🙋." },
  { dt: "iOS 17 & iOS 18 updates", dd: "iOS 17 expanded emoji search accuracy and added new categories. iOS 18 introduced predictive emoji suggestions in the suggestion bar — type a word like “fire” or “heart” and the relevant emoji appears above the keyboard, letting you insert it without opening the emoji keyboard at all." },
  { dt: "If the emoji keyboard is missing", dd: "Go to Settings → General → Keyboard → Keyboards → Add New Keyboard, scroll to Emoji, and tap it. It will appear as a keyboard option going forward." },
];

export default function IPhoneGuide() {
  return (
    <KSection
      kicker="iPhone · iOS 17 & 18"
      title="The iPhone Emoji Keyboard"
      dek="A globe-tap away — with a natural-language search bar most people never notice."
    >
      <div className="fg-prose max-w-2xl mb-8">
        {INTRO.map((p, i) => <p key={i}>{p}</p>)}
      </div>

      <p className="fg-label mb-4">Using the iPhone emoji keyboard</p>
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

      <QuickAnswer q="How Do I Get the Emoji Keyboard on My iPhone?">
        Tap any text field to open the keyboard, then tap the globe 🌐 icon or smiley face icon at
        the bottom-left to switch to the emoji keyboard. If neither icon is visible, go to Settings →
        General → Keyboard → Keyboards → Add New Keyboard and select Emoji. After adding it, the
        globe icon appears on your keyboard permanently for switching between keyboards.
      </QuickAnswer>

      <QuickAnswer q="How Do I Search for Emojis on iPhone?">
        Tap the search bar at the top of the emoji keyboard and type a descriptive word — “heart,”
        “laugh,” “fire,” “nervous.” iOS returns matching emojis instantly using natural-language
        recognition, not just exact Unicode names. This arrived in iOS 14 and has improved with each
        version. It is the fastest way to find a specific emoji when you know what you want but
        cannot locate it by scrolling.
      </QuickAnswer>
    </KSection>
  );
}
