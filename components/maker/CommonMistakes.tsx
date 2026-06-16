import { KSection } from "@/components/kitchen/Section";
import { MarkerList } from "./parts";

const MISTAKES = [
  { title: "Designing at large size without testing small", body: "The most common mistake is perfecting a design at 500 pixels and never checking it at 28 or 48. At chat display size, fine details, delicate shading, small text, and thin borders all vanish. Build small-size preview checks into your process from the first few minutes, not only at the end." },
  { title: "Overcrowding the design", body: "More accessories do not make a better emoji. At 28 pixels, five conflicting elements create visual noise rather than expression. The most effective designs are built around one clear dominant feature; everything beyond the essential expression competes for attention where attention is already scarce." },
  { title: "Ignoring layer order", body: "Adding components without managing layer order produces accidental overlaps. Check the stack before every export — hair behind the base shape, glasses under the eyes, hats below the hair. These errors are invisible at design size and obvious the moment the emoji appears in a real conversation." },
  { title: "Exporting in the wrong file format", body: "PNG supports transparency; JPG does not. GIF supports animation loops; PNG does not. Match the format to the platform requirement every time. Exporting a face emoji as JPG produces a white rectangle around it in dark-mode chat." },
  { title: "Skipping the project file save", body: "Always save the editable project file, not only the exported flat image. When you need to revise later, reopening the project takes seconds — rebuilding from a flat PNG is far more time-consuming and rarely reproduces the original accurately." },
  { title: "Ignoring platform file-size limits", body: "Upload limits are enforced without exception. Check the file size of every export before uploading. Discord enforces 256 KB on static and animated emoji, Slack enforces 128 KB, and WhatsApp stickers require export under 100 KB." },
  { title: "Skipping dark-mode testing", body: "An emoji that looks clean against a white canvas can become invisible against a dark background if it relies on white elements without outlines. Test every export against a dark background before publishing." },
];

export default function CommonMistakes() {
  return (
    <KSection
      kicker="Section 07"
      title="Common Mistakes with Emoji Creator Tools"
      dek="These errors consistently produce poor results — and every one is preventable."
    >
      <MarkerList tone="bad" items={MISTAKES} />
    </KSection>
  );
}
