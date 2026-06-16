import { KSection } from "@/components/kitchen/Section";

const IPHONE = [
  "Apple's built-in Memoji system is the fastest starting point on iPhone. Open the Messages app, tap the App Store icon next to the message input field, and select Memoji; tap the plus sign to make a new one. You customize skin tone, head shape, hair, eyes, nose, mouth, ears, facial hair, eyewear, and headwear through sliders and presets.",
  "The limitation is platform lock-in — the result is confined to the Apple ecosystem and cannot be exported to Discord, Slack, or Twitch. For a custom emoji that works anywhere, open Safari and use any browser-based emoji creator, export as PNG or GIF, save to your camera roll, and upload directly to the target platform.",
];

const ANDROID = [
  "Android has no built-in emoji creation system at the OS level. The main native option is Gboard's Emoji Kitchen, which combines two common Unicode symbols into a hybrid — helpful for inspiration but not for creating unique emoji for server upload.",
  "For custom emoji that work on Discord, Slack, or Twitch, use a browser-based emoji maker in Chrome on Android. The workflow is identical to the desktop version, and exports work the same way.",
];

const PC = [
  "On a desktop computer, browser-based tools give you the most screen space and the most precise control. Open the tool in any modern browser, use a mouse or trackpad for accurate component placement, and export directly to your downloads folder.",
  "Desktop is the recommended starting point for anyone creating emoji sets or animated emoji, because the larger canvas makes layer management significantly more efficient than working on a mobile screen.",
];

function Sub({ title, paras }: { title: string; paras: string[] }) {
  return (
    <div className="mt-10 first:mt-0">
      <h3 className="font-display t-ink text-[1.35rem] sm:text-[1.6rem] mb-4">{title}</h3>
      <div className="fg-prose max-w-2xl">
        {paras.map((p, i) => <p key={i}>{p}</p>)}
      </div>
    </div>
  );
}

export default function DeviceGuides() {
  return (
    <KSection
      kicker="Section 06"
      title="How to Make Your Own Emoji on iPhone, Android &amp; PC"
      dek="Native shortcuts get you started; the browser gets you everywhere."
    >
      <Sub title="On iPhone" paras={IPHONE} />
      <Sub title="On Android" paras={ANDROID} />
      <Sub title="On a Computer" paras={PC} />

      <div className="fg-pull fg-pull--sm mt-9">
        <span className="fg-kicker">Desktop Advantage</span>
        <p>
          Layer panels, fine positioning, and multi-size previews are all substantially easier on
          desktop. If you plan to create more than a few emoji, desktop is worth using even if you
          mainly communicate from a phone.
        </p>
      </div>
    </KSection>
  );
}
