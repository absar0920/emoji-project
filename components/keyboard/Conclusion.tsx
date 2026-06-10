import { KSection } from "@/components/kitchen/Section";

const PARAS = [
  "Every modern device already has a built-in emoji keyboard. For most users, the shortcut is the only thing standing between them and fast access: Win + . on Windows, Ctrl+Cmd+Space on Mac, a tap on the 🌐 icon on iPhone, and the smiley icon on Android. The right method shifts by context — OS shortcuts for speed on your own device, online keyboards for public computers or unusual platforms, app-specific methods (Slack's colon trigger, Teams' toolbar button) for professional tools. Once any of these becomes muscle memory — usually within a few days of intentional use — opening an emoji keyboard feels as natural as pressing Backspace.",
  "Emoji keyboards keep improving with every OS cycle. Each year Unicode releases new emoji sets, integrated by system updates on every platform. Gboard's Emoji Kitchen keeps expanding its combination library, Mac's Character Viewer search grows more accurate with each macOS release, and the Windows Emoji Panel's GIF integration becomes more reliable. Staying current with OS updates means staying current with the latest emoji access features — no separate app or tool needed.",
];

export default function Conclusion() {
  return (
    <KSection kicker="The Bottom Line" title="The Shortcut Is All You Need" dek="Your device is already equipped — the rest is muscle memory.">
      <div className="fg-prose max-w-2xl mb-8">
        {PARAS.map((p, i) => <p key={i}>{p}</p>)}
      </div>

      <div className="fg-pull">
        <span className="fg-kicker">Keep This Handy</span>
        <p>The right emoji keyboard for your workflow is already on your device — the shortcut is all you need.</p>
      </div>
    </KSection>
  );
}
