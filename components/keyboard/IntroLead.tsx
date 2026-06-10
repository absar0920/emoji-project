import { AnimatedSection } from "@/components/MotionWrappers";

const PARAS = [
  "Most people have spent time hunting for an emoji — opening a browser tab, scrolling through a website, copying, switching back to their message, pasting — when a built-in emoji keyboard was sitting on their device the entire time, one shortcut away. Windows, Mac, iPhone, and Android all ship with native emoji keyboards that most users have never deliberately opened, simply because nobody pointed them to the right key combination.",
  "This guide covers every platform: Windows 11, Windows 10, macOS, iPhone (iOS 17 and iOS 18), Android with Gboard and Samsung Keyboard, Chrome OS, Linux, and browser-based tools. Beyond that, it covers keyboard shortcuts, emoji apps, online emoji keyboards, professional app integrations in Slack, Teams, Outlook, Gmail, and Google Docs, plus a full troubleshooting section for when things go wrong. Everything here reflects current 2026 platform features — including the latest emoji additions and interface changes from the most recent OS updates.",
  "An emoji keyboard is a specialized input interface built into your operating system or available as an app or website that lets you browse, search, and insert emoji characters into any text field. Every major platform includes one natively. The question is never whether you have an emoji keyboard — you almost certainly do — it is whether you know how to open it.",
];

export default function IntroLead() {
  return (
    <AnimatedSection>
      <section className="mt-14 pt-9 border-t-2 border-[var(--rule)]">
        <p className="fg-kicker mb-4">The Complete Guide · 2026</p>
        <h2 className="font-display t-ink leading-[1.05] tracking-[-0.015em] text-[1.9rem] sm:text-[2.6rem] mb-7 max-w-3xl">
          The Complete Emoji Keyboard Guide for Every Device
        </h2>
        <div className="fg-lead fg-lead--cap fg-prose max-w-2xl">
          {PARAS.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </section>
    </AnimatedSection>
  );
}
