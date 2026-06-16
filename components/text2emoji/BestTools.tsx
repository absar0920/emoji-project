import { KSection } from "@/components/kitchen/Section";
import { CodeBlock } from "./parts";

const TOOLS: [string, string, string][] = [
  ["LingoJam Text to Emoji", "Web Tool", "One of the most-used text-to-emoji translators online. Paste any sentence and it swaps recognizable words for corresponding emoji. Best for quick casual conversions and testing emoji density before posting."],
  ["Emojify.it", "Web Tool", "A clean converter that processes full sentences and returns emoji-substituted text with direct copy-paste output. Best for social media captions, bio writing, and WhatsApp messages."],
  ["TxtMoji (Emoji Encryption)", "Encoder", "Encrypts text to emoji — converting your message into a sequence of emoji that can be decoded back to the original. Best for fun coded messages and “emoji cipher” use cases."],
  ["Emoji API (emoji-api.com)", "REST API", "A RESTful API that returns emoji data based on keywords. Developers query it to fetch matching emoji by name, category, or platform. Best for integrating emoji suggestion logic into web apps."],
  ["AI Emoji Generator (2026)", "AI-Powered", "AI tools now use language models to semantically match your sentence to the most contextually relevant emoji sequence — not just keyword matching. Several launched or upgraded in late 2025."],
  ["Discord Built-in Conversion", "Platform Native", "Discord auto-converts shortcodes like :fire: to 🔥 on send. No external tool needed. Best for Discord servers, bios, and channel names (see Section 07)."],
];

const SUMMARY: [string, string, string, string][] = [
  ["LingoJam Text to Emoji", "Web", "Quick word-to-emoji swaps", "Yes"],
  ["Emojify.it", "Web", "Social captions & bios", "Yes"],
  ["TxtMoji", "Web / Encoder", "Emoji encryption / cipher", "Yes"],
  ["Emoji API", "REST API", "Developer integration", "Free tier"],
  ["AI Emoji Generator", "AI Tool", "Contextual emoji matching", "Mostly free"],
  ["Discord Auto-Convert", "Platform", "Discord messages & bios", "Built-in"],
  ["node-emoji (npm)", "JS Library", "Dev: JS text to emoji", "Open source"],
];

export default function BestTools() {
  return (
    <KSection
      kicker="Section 02"
      title="Text to Emoji Converter: Best Free Tools in 2026"
      dek="Browser generators, AI adders, API services, and platform-native features worth bookmarking."
    >
      <div className="fg-table-wrap mb-8">
        <table className="fg-table">
          <thead>
            <tr><th>Tool</th><th>Type</th><th>Description</th></tr>
          </thead>
          <tbody>
            {TOOLS.map((r) => (
              <tr key={r[0]}>
                <td className="strong whitespace-nowrap">{r[0]}</td>
                <td className="muted whitespace-nowrap">{r[1]}</td>
                <td>{r[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="fg-label mb-3">At a glance</p>
      <div className="fg-table-wrap mb-8">
        <table className="fg-table">
          <thead>
            <tr><th>Tool</th><th>Type</th><th>Best For</th><th>Free?</th></tr>
          </thead>
          <tbody>
            {SUMMARY.map((r) => (
              <tr key={r[0]}>
                <td className="strong whitespace-nowrap">{r[0]}</td>
                <td className="muted whitespace-nowrap">{r[1]}</td>
                <td>{r[2]}</td>
                <td className="mono t-accent whitespace-nowrap">{r[3]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="fg-pull fg-pull--sm mb-2">
        <span className="fg-kicker">Pro Tip · JavaScript</span>
        <p>For converting text to emoji in JavaScript projects, the node-emoji npm package handles shortcode-to-character conversion natively.</p>
      </div>

      <CodeBlock
        lang="bash"
        code={`npm install node-emoji
# then:
nodeEmoji.emojify('I :heart: pizza')  // → "I ❤️ pizza"`}
      />
    </KSection>
  );
}
