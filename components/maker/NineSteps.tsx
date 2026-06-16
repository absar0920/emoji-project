import { KSection } from "@/components/kitchen/Section";

const STEPS: [string, string][] = [
  ["Define the emotion or reaction first", "Before opening any design panel, write a single sentence describing what the emoji should communicate — “Slow approval,” “Chaotic energy,” “Dry disbelief.” A well-defined objective produces a targeted, understandable design; an unclear goal produces a random collection of features that don't cohere at tiny sizes."],
  ["Choose your creation method", "Match the workflow to your starting point. From scratch: a component-based builder. Existing image: an upload-based creator. A concept but no source: an AI text-to-emoji generator to produce the raw artwork first, then refine it in an editor."],
  ["Select a base shape or upload your source", "In a component editor, choose the base shape before adding features — changing it after layering often misaligns everything above it. For upload-based tools, transparent PNG files produce the cleanest results because no background detection is required."],
  ["Add facial features and core elements", "In a component editor, start with the largest visual elements: eyes, then mouth, then nose — working from the center outward. In an upload-based tool, use the crop controls to center the focal point; a tight crop reads better at chat size than a wide composition with empty space."],
  ["Layer accessories and manage stack order", "Add accessories after the core expression is established, then verify the stack: hair above the face base, glasses above the eyes, hats above the hair. Skipping this check is the most common cause of accidental overlaps — invisible on a large canvas, obvious at 28 pixels."],
  ["Set background or confirm transparency", "If the emoji will appear against varying background colors, set the background to transparent and export as PNG. Discord and Slack serve emoji against dark backgrounds for dark-mode users and light backgrounds for light-mode users — a transparent export handles both automatically."],
  ["Add animation if the use case calls for it", "Not every emoji needs to move; animation adds file weight and production time. Keep loops short — three to five seconds at most — and choose one clear motion direction: a nodding head, blinking eyes, a gentle bounce. A single readable action communicates instantly where complex multi-element motion does not."],
  ["Preview at real platform size", "Before exporting, preview at the actual chat size. Discord displays emoji at roughly 22 pixels in the message input; Twitch emotes show at 28, 56, and 112 pixels. If details disappear, simplify: remove fine line work, merge similar-colored areas, and increase contrast."],
  ["Export with the correct platform settings", "Export static emoji as PNG, animated emoji as GIF, WhatsApp stickers as WebP. After export, check the file size before uploading — platform limits are enforced without exception. If the file is too big, compress it with a free browser-based tool first."],
];

export default function NineSteps() {
  return (
    <KSection
      kicker="Section 05"
      title="How to Make Your Own Emoji: Step by Step"
      dek="A nine-step process that works across every serious emoji tool in 2026."
    >
      <ol className="fg-steps mb-8">
        {STEPS.map(([title, body], i) => (
          <li key={i} className="fg-step">
            <span className="fg-step__n tabular-nums">{i + 1}</span>
            <div>
              <h3 className="fg-step__h">{title}</h3>
              <p className="fg-step__t">{body}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="fg-pull fg-pull--sm">
        <span className="fg-kicker">Time Expectation</span>
        <p>
          A first-time user should have a publish-ready emoji in under fifteen minutes. Experienced
          users complete a single static emoji in three to five. Because of the preview and
          compression stages, animated emoji take longer.
        </p>
      </div>
    </KSection>
  );
}
