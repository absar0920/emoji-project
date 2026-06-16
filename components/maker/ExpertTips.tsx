import { KSection } from "@/components/kitchen/Section";
import { MarkerList } from "./parts";

const TIPS = [
  { title: "Build emoji in sets, not singles", body: "A single custom emoji is a novelty. A set of eight to twelve that share the same base style, palette, and line weight is a communication system. Communities adopt sets far more readily than individual emoji because visual consistency signals deliberate design." },
  { title: "Use bold, high-contrast features", body: "Emoji live at tiny sizes. Thin strokes, light colors, and subtle expressions all fail at those dimensions. Use exaggerated facial expressions that read even when the image is smaller than a capital letter, thick contours, and strong contrast between the face and background." },
  { title: "Test every emoji in dark and light mode", body: "Most platforms offer both display modes. An emoji that looks polished on a white surface can become unusable against a dark background. This test takes thirty seconds and prevents one of the most common post-publish complaints." },
  { title: "For animation, favor clarity over complexity", body: "Choose a single clear motion direction per animation: a nodding head, blinking eyes, a waving hand, a gentle bounce. One readable action communicates immediately; complex multi-element animation will not land in a fast-moving chat at 28 pixels." },
  { title: "Batch-create variations from one base", body: "Once you have a strong base, create smiling, sad, surprised, and angry versions before closing the project file. Four complete expressions from one well-designed base form a usable reaction set at a fraction of the effort of building each independently." },
  { title: "Use an emoji mixer for inspiration", body: "Spend five minutes browsing an emoji mixer before starting a new design. Watching how the visual components of two standard emoji blend into a readable hybrid teaches more about small-size legibility than any written instructions." },
  { title: "Match line weight across a set", body: "Inconsistent stroke thickness reads as unfinished even when individual designs are strong. Decide on a line weight — typically 2 to 4 pixels at 128 × 128 px design size — and apply it consistently across every emoji in the collection." },
];

export default function ExpertTips() {
  return (
    <KSection
      kicker="Section 08"
      title="Expert Tips and Best Practices"
      dek="What separates emoji used daily from emoji that sit untouched in the picker."
    >
      <MarkerList tone="accent" items={TIPS} />

      <div className="fg-pull fg-pull--sm mt-9">
        <span className="fg-kicker">Pro Strategy</span>
        <p>
          Design your base emoji at 512 × 512 pixels for maximum detail, then export at 128 × 128 for
          Discord and Slack. Downscaling sharpens fine details on export — something you cannot achieve
          by designing at the final size.
        </p>
      </div>
    </KSection>
  );
}
