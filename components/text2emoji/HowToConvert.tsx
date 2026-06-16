import { KSection } from "@/components/kitchen/Section";
import { CodeBlock, Kbd } from "./parts";

const UNIVERSAL = [
  "Launch an online text-to-emoji converter in your browser, such as Emojify.it or LingoJam.",
  "Type or paste your text into the input field — any sentence, word, or phrase you want to convert.",
  "Hit Convert or Generate — the tool replaces matched words with corresponding emoji in the output field.",
  "Review and tweak — before copying, manually replace any emoji that don't fit your intent or change the density.",
  "Copy and paste the emoji-rich text into your social post, bio, chat, or document.",
];

const PLATFORMS = [
  { dt: "🍎 iPhone / iMessage", dd: "Type in the compose bar; words with emoji equivalents highlight in orange — tap to replace. Or tap the 😊 key for the full picker. Use Gboard or SwiftKey if your keyboard doesn't highlight suggestions." },
  { dt: "🤖 Android / Google Messages", dd: "Tap the 😊 icon on Gboard to open the picker, then use its search bar — type “fire” and the emoji appears instantly. Samsung users can use Samsung Keyboard's emoji search and AR emoji." },
  { dt: "💬 WhatsApp", dd: "Tap the 😊 icon left of the text field and use the search bar to find emoji by keyword. WhatsApp does NOT auto-convert shortcodes — select manually or paste from an external converter." },
  { dt: "📝 Notion", dd: "Type /emoji to open the emoji picker block, or use the OS shortcut (Win + . / Ctrl + Cmd + Space) for inline text. You can also paste emoji-rich text directly — it renders natively." },
  { dt: "🎨 Canva", dd: "Click into a text box and use your OS emoji shortcut (Win + . / Ctrl + Cmd + Space; on mobile switch to the emoji keyboard). Canva renders most standard Unicode emoji — test custom ones before downloading." },
];

const AUTO: [string, string, string][] = [
  ["Discord", "Yes — :fire: → 🔥", "Type : and start typing the name"],
  ["iMessage (iOS)", "Suggests replacements", "Tap 😊 key → picker"],
  ["Android / Gboard", "No", "Tap 😊 → search or browse"],
  ["WhatsApp", "No", "Tap 😊 icon in chat bar"],
  ["Notion", "No", "Type /emoji or OS shortcut"],
  ["Canva", "No", "OS emoji shortcut in text box"],
  ["Windows (any app)", "No", "Win + . opens the emoji panel"],
  ["Mac (any app)", "No", "Ctrl + Cmd + Space opens the picker"],
  ["Google Hangouts", "Converts some shortcodes", "Click 😊 icon in chat"],
  ["Facebook Messenger", "Smileys auto-convert", "Click 😊 in message bar"],
];

const JS_CODE = `const nodeEmoji = require('node-emoji');

// Convert shortcodes to emoji
const result = nodeEmoji.emojify('I :heart: to :pizza: at :night_with_stars:');
console.log(result);
// Output: I ❤️ to 🍕 at 🌃

// Find emoji by keyword
console.log(nodeEmoji.get('fire')); // → 🔥

// Replace words with matching emoji, keeping unmatched as-is
function textToEmoji(text) {
  return nodeEmoji.emojify(text, { fallback: (name) => name });
}
console.log(textToEmoji('Good :sunny: morning! :coffee: time :tada:'));
// Output: Good ☀️ morning! ☕ time 🎉`;

const PY_CODE = `# Install: pip install emoji
import emoji

# Convert emoji shortcodes to characters
text = 'I :red_heart: coding :laptop: and :coffee:'
print(emoji.emojize(text, language='alias'))
# Output: I ❤️ coding 💻 and ☕

# Convert emoji back to a text description
print(emoji.demojize('Hello 🌍 how are you 😊'))
# Output: Hello :globe_showing_europe-africa: how are you :slightly_smiling_face:`;

export default function HowToConvert() {
  return (
    <KSection
      kicker="Section 04"
      title="How to Convert Text to Emoji — Step by Step"
      dek="The universal online method, then platform-specific steps and developer code."
    >
      <p className="fg-label mb-4">Universal method · online converter</p>
      <ol className="fg-steps mb-9">
        {UNIVERSAL.map((text, i) => (
          <li key={i} className="fg-step">
            <span className="fg-step__n tabular-nums">{i + 1}</span>
            <div><p className="fg-step__t">{text}</p></div>
          </li>
        ))}
      </ol>

      <p className="fg-label mb-3">By platform</p>
      <dl className="fg-deflist border-t border-[var(--line)] mb-9">
        {PLATFORMS.map((p) => (
          <div key={p.dt}><dt>{p.dt}</dt><dd>{p.dd}</dd></div>
        ))}
      </dl>

      <h3 className="font-display t-ink text-[1.35rem] sm:text-[1.6rem] mb-3">Converting Text to Emoji with JavaScript</h3>
      <CodeBlock lang="javascript · node-emoji" code={JS_CODE} />

      <h3 className="font-display t-ink text-[1.35rem] sm:text-[1.6rem] mt-8 mb-3">Converting Text to Emoji in Python</h3>
      <CodeBlock lang="python · emoji" code={PY_CODE} />

      <div className="fg-pull fg-pull--sm mt-8 mb-9">
        <span className="fg-kicker">Cross-Platform</span>
        <p>iOS and Android render the same Unicode emoji differently — Apple’s are more detailed and 3D-styled, Google’s flatter and bolder. Always test emoji-heavy content on both before publishing.</p>
      </div>

      <p className="fg-label mb-3">Auto-convert support by platform</p>
      <div className="fg-table-wrap">
        <table className="fg-table">
          <thead>
            <tr><th>Platform</th><th>Auto-Converts Shortcodes?</th><th>Manual Emoji Method</th></tr>
          </thead>
          <tbody>
            {AUTO.map((r) => (
              <tr key={r[0]}>
                <td className="strong whitespace-nowrap">{r[0]}</td>
                <td className="muted">{r[1]}</td>
                <td>{r[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="t-muted font-read mt-4 text-sm max-w-2xl">
        On <Kbd>Win + .</Kbd> (Windows) and <Kbd>Ctrl + Cmd + Space</Kbd> (Mac), the system emoji
        panel works in almost any text field. Apple’s emoji differ from Google’s — test on both.
      </p>
    </KSection>
  );
}
