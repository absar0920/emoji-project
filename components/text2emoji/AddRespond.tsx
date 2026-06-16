import { KSection } from "@/components/kitchen/Section";
import { Kbd } from "./parts";

const REACTIONS = [
  { dt: "🍎 iPhone — iMessage Tapback", dd: "Long-press the message bubble (~0.5s); a row of six Tapback options appears — ❤️ 👍 👎 😂 ‼️ ❓ — tap one to badge the corner of the bubble. On iOS 17+, tap “+” after the Tapbacks to add any emoji from the full picker as a custom reaction." },
  { dt: "🤖 Android — Message Reactions", dd: "In Google Messages, long-press any bubble; a row of quick reactions appears — tap one, or tap “+” for the full picker. Samsung Messages uses a similar long-press, opening a 😂 ❤️ 👍 reaction strip." },
  { dt: "💬 WhatsApp Reactions", dd: "Long-press any message, tap the 😊 icon in the action bar, then choose from the quick strip or tap “+” for any emoji from the full picker." },
];

const TABLE: [string, string, string][] = [
  ["iPhone / iMessage", "Tap 😊 key → picker", "Long-press → Tapback / + any emoji"],
  ["Android / Google Messages", "Tap 😊 in keyboard", "Long-press message → + emoji"],
  ["Samsung Messages", "Samsung Keyboard 😊 row", "Long-press → reaction strip"],
  ["WhatsApp (iOS/Android)", "Tap 😊 in compose bar", "Long-press → tap 😊 icon"],
  ["Windows (any app)", "Win + . → emoji panel", "N/A"],
  ["Mac (any app)", "Ctrl + Cmd + Space → picker", "N/A"],
  ["Discord", "Type : + name → shortcode", "Hover message → 😊 icon"],
  ["Notion", "/emoji or OS shortcut", "Hover block → emoji react"],
];

export default function AddRespond() {
  return (
    <KSection
      kicker="Section 06"
      title="How to Add or Respond to Text with Emoji"
      dek="Adding emoji to text and reacting to messages — two overlapping actions, every platform."
    >
      <div className="fg-prose max-w-2xl mb-8">
        <p>The fastest way to add emoji to text on any device is your OS-native picker. On Windows, press <strong>Win + .</strong> or <strong>Win + ;</strong> anywhere — a floating panel opens. On Mac, <strong>Ctrl + Cmd + Space</strong> opens the Character Viewer. Both work in almost all text fields, including code editors and browser address bars.</p>
      </div>

      <p className="fg-label mb-3">Responding with emoji (Tapback / reactions)</p>
      <dl className="fg-deflist border-t border-[var(--line)] mb-9">
        {REACTIONS.map((r) => (
          <div key={r.dt}><dt>{r.dt}</dt><dd>{r.dd}</dd></div>
        ))}
      </dl>

      <div className="fg-table-wrap mb-4">
        <table className="fg-table">
          <thead>
            <tr><th>Device / Platform</th><th>Add Emoji to Text</th><th>React with Emoji</th></tr>
          </thead>
          <tbody>
            {TABLE.map((r) => (
              <tr key={r[0]}>
                <td className="strong whitespace-nowrap">{r[0]}</td>
                <td>{r[1]}</td>
                <td className="muted">{r[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="t-muted font-read text-sm max-w-2xl">
        On desktop you can drag emoji from a picker straight into a text field (<Kbd>Win + .</Kbd> /{" "}
        <Kbd>Ctrl + Cmd + Space</Kbd>); on mobile, use copy-paste instead.
      </p>
    </KSection>
  );
}
