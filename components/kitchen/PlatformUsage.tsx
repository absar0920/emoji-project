"use client";

import { useState } from "react";
import { KSection } from "./Section";

const TABS = ["WhatsApp", "TikTok", "Discord", "Snapchat"] as const;
type Tab = typeof TABS[number];
const TAB_ICONS: Record<Tab, string> = { WhatsApp: "💬", TikTok: "🎵", Discord: "🎮", Snapchat: "👻" };

function WhatsAppTab() {
  return (
    <div className="fg-prose">
      <p>On Android with Gboard active, Emoji Kitchen stickers send through WhatsApp as image messages. Gboard surfaces combination stickers above the emoji keyboard; tapping one sends it into the chat. Recipients on both Android and iPhone see the sticker.</p>
      <p className="t-muted text-[0.95rem]">Open any chat → tap the emoji icon → select a supported emoji. The Kitchen row appears above the keyboard. Tap a sticker to send it as an image.</p>
      <div className="fg-pull fg-pull--sm mt-6">
        <span className="fg-kicker">Not WhatsApp Stickers</span>
        <p>WhatsApp&apos;s built-in sticker store is entirely separate. Kitchen runs through Gboard, not WhatsApp&apos;s sticker system — no packs to add.</p>
      </div>
    </div>
  );
}
function TikTokTab() {
  const steps = [
    "Generate the sticker in Gboard from any text field (not necessarily TikTok itself).",
    "Long-press the sticker in the suggestion row → save to gallery.",
    "Import the saved PNG into TikTok's video editor as an overlay sticker from camera roll.",
  ];
  return (
    <div className="fg-prose">
      <p>Emoji Kitchen doesn&apos;t appear natively in TikTok&apos;s comment keyboard. Creators use a workaround to get stickers into content.</p>
      <ol className="fg-steps mt-5">
        {steps.map((s, i) => (
          <li key={i} className="fg-step"><span className="fg-step__n tabular-nums">{i + 1}</span><div><p className="fg-step__t">{s}</p></div></li>
        ))}
      </ol>
      <div className="fg-pull fg-pull--sm mt-6">
        <span className="fg-kicker">TikTok Comments</span>
        <p>The copy-paste route works sometimes — generate in Gboard, copy, paste into the comment — but behavior varies by version and region. The gallery-import method for overlays is more reliable.</p>
      </div>
    </div>
  );
}
function DiscordTab() {
  return (
    <div className="fg-prose">
      <p>On Android with Gboard, Emoji Kitchen stickers send in Discord DMs and server channels as image uploads, embedded full-size in the thread.</p>
      <dl className="fg-deflist border-t border-[var(--line)] mt-5">
        <div><dt>📱 Mobile (Android)</dt><dd>Stickers send directly from Gboard into DMs and channels as image uploads — indistinguishable from any other uploaded image.</dd></div>
        <div><dt>🖥️ Desktop / Web</dt><dd>Desktop clients don&apos;t use Gboard. Generate via Google Search, download the PNG, and drag it into any channel or DM window.</dd></div>
      </dl>
    </div>
  );
}
function SnapchatTab() {
  return (
    <div className="fg-prose">
      <p>On Android with Gboard, Emoji Kitchen works in Snapchat direct messages — stickers send as image snaps within the chat thread.</p>
      <div className="fg-pull fg-pull--sm mt-6">
        <span className="fg-kicker">Limitation</span>
        <p>Kitchen stickers can&apos;t be applied as overlays on the Snapchat camera layer (where Snapchat&apos;s own stickers live). They work only as chat message images. On iOS, use the web method: generate via google.com, save to Camera Roll, share into a DM.</p>
      </div>
    </div>
  );
}

const TAB_CONTENT: Record<Tab, () => React.JSX.Element> = {
  WhatsApp: WhatsAppTab, TikTok: TikTokTab, Discord: DiscordTab, Snapchat: SnapchatTab,
};

export default function PlatformUsage() {
  const [activeTab, setActiveTab] = useState<Tab>("WhatsApp");
  const Content = TAB_CONTENT[activeTab];

  return (
    <KSection kicker="Platforms" title="Emoji Kitchen on Every Platform" dek="Platform-specific guides for WhatsApp, TikTok, Discord, and Snapchat.">
      <div className="fg-tabs mb-7 overflow-x-auto scrollbar-hide">
        {TABS.map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} aria-pressed={activeTab === tab} data-active={activeTab === tab} className="fg-tab">
            <span aria-hidden="true">{TAB_ICONS[tab]}</span>{tab}
          </button>
        ))}
      </div>
      <Content />
    </KSection>
  );
}
