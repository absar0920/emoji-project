import { KSection } from "@/components/kitchen/Section";
import { Kbd, QuickAnswer } from "./parts";

const INTRO = "Common emoji keyboard problems include the panel not opening, emojis displaying as boxes, emojis not copying correctly, the keyboard missing from a device, and emoji not appearing in specific applications. Most issues resolve through one of three actions: updating the OS, enabling the keyboard in settings, or switching to a Unicode-compatible font in the receiving application.";

const PROBLEMS = [
  { dt: "1 · Win+. does not open anything on Windows", dd: "Fix in order: click inside a text field first (the most common cause — the shortcut requires an active cursor); check your Windows version is 1709 or later; restart the TabTip.exe (Touch Keyboard) process through Task Manager; or restart the device. If the issue persists, re-enable the Touch Keyboard service in Windows Services." },
  { dt: "2 · Emoji keyboard missing on iPhone", dd: "Go to Settings → General → Keyboard → Keyboards. If Emoji is not listed, tap Add New Keyboard and select Emoji. Once added, the 🌐 globe icon appears on your keyboard." },
  { dt: "3 · Emojis display as boxes or □", dd: "A font or application-support issue. On Windows, check the text is set to a font that includes Segoe UI Emoji, or switch to a system default. In Microsoft Office, update to the latest version. In web browsers, no action is needed — emoji display correctly in all modern browsers." },
  { dt: "4 · Emoji will not paste correctly", dd: "Try pasting as plain text (Ctrl+Shift+V on Windows and Linux) to strip any formatting that might interfere. Check whether the target application supports Unicode input. If pasting into a form field on a website, try a different browser." },
  { dt: "5 · Panel opens but emoji will not insert", dd: "The most common cause is the cursor losing focus when you moved to click the panel. Click directly in the text field again, then use the panel. In some applications the panel must be triggered with the cursor already placed — not opened first and then the text field selected." },
  { dt: "6 · New emojis not showing in keyboard", dd: "New emojis arrive through OS updates, not app updates. On Windows, run Windows Update; on iPhone, update iOS in Settings → General → Software Update; on Android, update the Gboard app from the Play Store. New Unicode emojis (15.1 and 16.0) require the OS or keyboard app to be updated to a version that includes them." },
  { dt: "7 · Emoji keyboard slow or laggy on Android", dd: "Open Android Settings → Apps → Gboard (or your keyboard app) → Storage → Clear Cache. This clears accumulated prediction data that can slow the keyboard without deleting your personalization. Restart the device or update the app if the problem persists." },
];

export default function Troubleshooting() {
  return (
    <KSection
      kicker="Troubleshooting"
      title="Emoji Keyboard Problems — Fixes for Every Issue"
      dek="The section every competitor leaves out — and where most frustrated searches end up."
    >
      <div className="fg-prose max-w-2xl mb-8">
        <p>{INTRO}</p>
      </div>

      <dl className="fg-deflist border-t border-[var(--line)] mb-8">
        {PROBLEMS.map((row) => (
          <div key={row.dt}><dt>{row.dt}</dt><dd>{row.dd}</dd></div>
        ))}
      </dl>

      <QuickAnswer q="Why Is My Emoji Keyboard Not Showing Up?">
        On iPhone, go to Settings → General → Keyboard → Keyboards and confirm Emoji is listed — if
        not, tap Add New Keyboard and add it. On Android, open your keyboard settings and confirm the
        emoji icon is enabled in the toolbar layout. On Windows, click inside a text field before
        pressing <Kbd>Win + .</Kbd>, as the shortcut requires an active cursor to trigger the Emoji
        Panel.
      </QuickAnswer>
    </KSection>
  );
}
