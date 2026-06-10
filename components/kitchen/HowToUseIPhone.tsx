import { KSection } from "./Section";

const STEPS = [
  "Open Safari or Chrome on your iPhone.",
  "Go to google.com and search \"emoji kitchen.\"",
  "Tap the interactive tool that appears in search results.",
  "Tap the first emoji you want to combine.",
  "Tap the second emoji from the suggested pairing options.",
  "The sticker appears — long-press it → Save Image to add it to Camera Roll.",
  "Open iMessage, WhatsApp, or your preferred app.",
  "Attach the saved image from your photo library as you would any photo.",
];

export default function HowToUseIPhone() {
  return (
    <KSection kicker="Setup · iPhone" title="How to Use Emoji Kitchen on iPhone (iOS)" dek="Emoji Kitchen isn't native on iPhone — here's the workaround.">
      <div className="fg-pull fg-pull--sm mb-8">
        <span className="fg-kicker">Why It Is Not Native</span>
        <p>Gboard for iOS exists as a third-party keyboard, but the iOS version omits Emoji Kitchen — Apple&apos;s sandboxing prevents the server-side image fetching the feature relies on. Apple&apos;s own keyboard has no equivalent.</p>
      </div>

      <p className="fg-kicker mb-4">Step-by-step via Google Search</p>
      <ol className="fg-steps mb-8">
        {STEPS.map((text, i) => (
          <li key={i} className="fg-step">
            <span className="fg-step__n tabular-nums">{i + 1}</span>
            <div><p className="fg-step__t">{text}</p></div>
          </li>
        ))}
      </ol>

      <div className="fg-pull fg-pull--sm">
        <span className="fg-kicker">Quick Tip</span>
        <p>The Google Search web tool shows a curated subset of pairings — slightly fewer than native Gboard, though the same underlying library powers both.</p>
      </div>
    </KSection>
  );
}
