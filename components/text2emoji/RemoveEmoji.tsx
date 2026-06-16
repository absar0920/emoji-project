import { KSection } from "@/components/kitchen/Section";
import { CodeBlock } from "./parts";

const METHODS = [
  { dt: "Manual (any device)", dd: "Copy your emoji-containing text, paste it into a plain-text editor (Notepad, TextEdit in plain-text mode, or any notes app), then select and delete the visible emoji characters. Use Find & Replace if available — paste an emoji into “Find” and leave “Replace” empty." },
  { dt: "iPhone", dd: "Long-press the message → Copy, paste into the Notes app, then position the cursor just before and after each emoji and delete." },
  { dt: "Android / Samsung", dd: "Paste into Google Keep or Samsung Notes and long-press each emoji to select and delete it. Or paste into Google Docs and use Find & Replace (Ctrl+H) with the emoji in the search field." },
];

const PY_CODE = `# Method 1: regex (no extra libraries)
import re

def remove_emoji_regex(text):
    emoji_pattern = re.compile(
        "["
        "\\U0001F600-\\U0001F64F"  # emoticons
        "\\U0001F300-\\U0001F5FF"  # symbols & pictographs
        "\\U0001F680-\\U0001F6FF"  # transport & map
        "\\U0001F1E0-\\U0001F1FF"  # flags (regional indicators)
        "\\U00002700-\\U000027BF"  # dingbats
        "\\U0001F900-\\U0001FAFF"  # supplemental symbols
        "]+",
        flags=re.UNICODE,
    )
    return emoji_pattern.sub(r"", text)

print(remove_emoji_regex("Hello 🌍 how are you 😊 today 🔥"))
# Output: Hello  how are you  today

# Method 2: the emoji library (cleaner, handles ZWJ + skin tones)
import emoji
def remove_emoji_lib(text):
    return emoji.replace_emoji(text, replace='')

print(remove_emoji_lib("Great job! 🎉 Keep going 💪 you got this 🚀"))
# Output: Great job!  Keep going  you got this`;

const JS_CODE = `// Remove all emoji from a JavaScript string (ES2018+)
function removeEmoji(str) {
  return str.replace(
    /\\p{Emoji_Presentation}|\\p{Extended_Pictographic}(\\u200D\\p{Extended_Pictographic})*/gu,
    ''
  );
}
console.log(removeEmoji("Coding is fun 💻 and rewarding 🏆 every day 🌟"));
// Output: "Coding is fun  and rewarding  every day "

// Trim leftover whitespace after removal
function cleanTextFromEmoji(str) {
  return removeEmoji(str).replace(/\\s+/g, ' ').trim();
}
console.log(cleanTextFromEmoji("  Hello 🌍 world 🌎 !"));
// Output: "Hello world !"`;

export default function RemoveEmoji() {
  return (
    <KSection
      kicker="Section 05"
      title="How to Remove Emoji from Text"
      dek="For devs cleaning user content, writers pasting from social media, and anyone needing plain text."
    >
      <dl className="fg-deflist border-t border-[var(--line)] mb-9">
        {METHODS.map((m) => (
          <div key={m.dt}><dt>{m.dt}</dt><dd>{m.dd}</dd></div>
        ))}
      </dl>

      <h3 className="font-display t-ink text-[1.35rem] sm:text-[1.6rem] mb-3">Python — Remove Emoji from Text</h3>
      <CodeBlock lang="python" code={PY_CODE} />

      <h3 className="font-display t-ink text-[1.35rem] sm:text-[1.6rem] mt-8 mb-3">JavaScript — Strip Emoji from a String</h3>
      <CodeBlock lang="javascript" code={JS_CODE} />

      <div className="fg-pull fg-pull--sm mt-8">
        <span className="fg-kicker">Compatibility</span>
        <p>The JavaScript \\p{"{"}Emoji_Presentation{"}"} regex flag requires ES2018+ (Node 10+, Chrome 64+, Firefox 78+). For older environments, port the Python range method to JS.</p>
      </div>
    </KSection>
  );
}
