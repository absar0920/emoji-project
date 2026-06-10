import { AnimatedSection } from "@/components/MotionWrappers";
import SectionShell from "./SectionShell";

const PLATFORMS = [
  { name: "iPhone (iOS 14+)", steps: "Open any text field → tap the emoji icon on the keyboard → type a keyword in the search bar." },
  { name: "Android (Gboard)", steps: "Open the keyboard → tap the emoji smiley icon → tap the search icon → type any keyword." },
  { name: "Windows 11", steps: "Press Win + . to open the emoji panel → type in the search box." },
  { name: "Mac", steps: "Press Control + Command + Space → the emoji viewer opens → search by keyword." },
  { name: "Discord", steps: "Type : (colon) in any message field → type the emoji name to search → click to insert." },
];

export default function HowToFindEmoji() {
  return (
    <SectionShell n="21" id="how-to-find" title="How to Find What Any Emoji Means" dek="Platform-specific search instructions.">
      <AnimatedSection>
        <dl className="fg-deflist max-w-3xl border-t border-[var(--line)] pt-1">
          {PLATFORMS.map((p) => (
            <div key={p.name}>
              <dt>{p.name}</dt>
              <dd>{p.steps}</dd>
            </div>
          ))}
        </dl>
      </AnimatedSection>

      <AnimatedSection>
        <div className="fg-pull fg-pull--sm mt-10">
          <span className="fg-kicker">Pro Tip</span>
          <p>Don&apos;t know the name? Describe what it does. &ldquo;Melting&rdquo; finds 🫠. &ldquo;Pleading&rdquo; finds 🥺. &ldquo;Fire heart&rdquo; finds ❤️‍🔥.</p>
        </div>
      </AnimatedSection>
    </SectionShell>
  );
}
