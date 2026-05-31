"use client";

import { useState } from "react";
import { AnimatedSection } from "@/components/MotionWrappers";

const TABS = ["WhatsApp", "TikTok", "Discord", "Snapchat"] as const;
type Tab = typeof TABS[number];

const TAB_ICONS: Record<Tab, string> = {
  WhatsApp: "💬", TikTok: "🎵", Discord: "🎮", Snapchat: "👻",
};

function WhatsAppTab() {
  return (
    <div>
      <p className="text-neutral-600 dark:text-slate-300 leading-relaxed mb-4">
        On Android with Gboard active, Emoji Kitchen stickers send through WhatsApp as image messages. The workflow is identical to any other supported app — Gboard surfaces combination stickers above the emoji keyboard, and tapping one sends it directly into the chat. Recipients on both Android and iPhone see the sticker image.
      </p>
      <h4 className="font-bold text-primary-dark dark:text-white mb-3">How to Send</h4>
      <p className="text-sm text-neutral-600 dark:text-slate-300 leading-relaxed mb-6">
        Open any WhatsApp conversation → tap the emoji icon → select any supported emoji. The Kitchen suggestion row appears above the keyboard. Tap any sticker to send it as an image message.
      </p>
      <div className="bg-amber-50 dark:bg-amber-950/30 border-l-4 border-accent-amber rounded-r-xl p-5 mb-4">
        <h4 className="font-bold text-primary-dark dark:text-white mb-1">⚠️ Not the Same as WhatsApp Stickers</h4>
        <p className="text-sm text-neutral-600 dark:text-slate-300 leading-relaxed">
          WhatsApp&apos;s built-in sticker store is entirely separate from Emoji Kitchen. Kitchen runs through Gboard, not through WhatsApp&apos;s sticker system. You do not need to add sticker packs.
        </p>
      </div>
      <div className="bg-violet-50 dark:bg-violet-950/30 border-l-4 border-accent-violet rounded-r-xl p-5">
        <h4 className="font-bold text-primary-dark dark:text-white mb-1">💡 Best for WhatsApp</h4>
        <p className="text-sm text-neutral-600 dark:text-slate-300 leading-relaxed">
          Face mashups and animal hybrids perform best as reaction stickers — the large, expressive images read clearly at the small display size of chat bubbles, carrying more visual weight than a plain emoji response.
        </p>
      </div>
    </div>
  );
}

function TikTokTab() {
  return (
    <div>
      <p className="text-neutral-600 dark:text-slate-300 leading-relaxed mb-4">
        Emoji Kitchen does not appear natively in TikTok&apos;s comment keyboard. Creators use a workaround to get stickers into their content.
      </p>
      <h4 className="font-bold text-primary-dark dark:text-white mb-3">TikTok Video Overlay Method</h4>
      <div className="space-y-2 mb-6">
        {[
          "Generate the sticker in Gboard from any text field (not necessarily TikTok itself)",
          "Long-press the sticker in the suggestion row → save to gallery",
          "Use the saved PNG in TikTok's video editor as an overlay sticker by importing from camera roll",
        ].map((step, i) => (
          <div key={i} className="flex gap-3 bg-neutral-50 dark:bg-slate-700/50 rounded-lg p-3">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white font-bold text-xs shrink-0">{i + 1}</span>
            <p className="text-sm text-neutral-600 dark:text-slate-300">{step}</p>
          </div>
        ))}
      </div>
      <div className="bg-indigo-50 dark:bg-indigo-950/30 border-l-4 border-primary rounded-r-xl p-5">
        <h4 className="font-bold text-primary-dark dark:text-white mb-1">TikTok Comments</h4>
        <p className="text-sm text-neutral-600 dark:text-slate-300 leading-relaxed">
          The copy-paste route works in some cases — generating in Gboard, copying, then pasting into the comment field — but behavior varies by platform version and region. The gallery-import method for video overlays is more reliable.
        </p>
      </div>
    </div>
  );
}

function DiscordTab() {
  return (
    <div>
      <p className="text-neutral-600 dark:text-slate-300 leading-relaxed mb-4">
        On Android with Gboard, Emoji Kitchen stickers send in Discord DMs and server channels as image uploads. They appear embedded in the chat thread as full-size images.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="bg-neutral-50 dark:bg-slate-700/50 rounded-xl p-4">
          <h4 className="font-bold text-sm text-primary-dark dark:text-white mb-2">📱 Mobile (Android)</h4>
          <p className="text-sm text-neutral-600 dark:text-slate-300">Stickers send directly from Gboard into DMs and server channels as image uploads — indistinguishable from any other uploaded image.</p>
        </div>
        <div className="bg-neutral-50 dark:bg-slate-700/50 rounded-xl p-4">
          <h4 className="font-bold text-sm text-primary-dark dark:text-white mb-2">🖥️ Desktop / Web</h4>
          <p className="text-sm text-neutral-600 dark:text-slate-300">Desktop clients don&apos;t use Gboard. Generate a sticker through Google Search, download the PNG, and drag it into any Discord channel or DM window.</p>
        </div>
      </div>
    </div>
  );
}

function SnapchatTab() {
  return (
    <div>
      <p className="text-neutral-600 dark:text-slate-300 leading-relaxed mb-4">
        On Android with Gboard, Emoji Kitchen works in Snapchat direct messages — stickers send as image snaps within the chat thread.
      </p>
      <div className="bg-amber-50 dark:bg-amber-950/30 border-l-4 border-accent-amber rounded-r-xl p-5 mb-4">
        <h4 className="font-bold text-primary-dark dark:text-white mb-1">⚠️ Limitation</h4>
        <p className="text-sm text-neutral-600 dark:text-slate-300 leading-relaxed">
          Emoji Kitchen stickers cannot be applied as sticker overlays to the Snapchat camera layer (where Snapchat&apos;s own sticker collection lives). They work only as chat message images.
        </p>
      </div>
      <div className="bg-violet-50 dark:bg-violet-950/30 border-l-4 border-accent-violet rounded-r-xl p-5">
        <h4 className="font-bold text-primary-dark dark:text-white mb-1">💡 iPhone Users</h4>
        <p className="text-sm text-neutral-600 dark:text-slate-300 leading-relaxed">
          iOS Snapchat users follow the web method: generate the sticker through google.com, save it to Camera Roll, then share it from the photo library into a Snapchat DM.
        </p>
      </div>
    </div>
  );
}

const TAB_CONTENT: Record<Tab, () => React.JSX.Element> = {
  WhatsApp: WhatsAppTab,
  TikTok: TikTokTab,
  Discord: DiscordTab,
  Snapchat: SnapchatTab,
};

export default function PlatformUsage() {
  const [activeTab, setActiveTab] = useState<Tab>("WhatsApp");
  const Content = TAB_CONTENT[activeTab];

  return (
    <section className="py-14 bg-white dark:bg-slate-900">
      <div className="max-w-5xl mx-auto px-4">
        <AnimatedSection>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-primary-dark dark:text-white mb-2">
            Emoji Kitchen on Every Platform
          </h2>
          <p className="text-neutral-500 dark:text-slate-400 mb-6">Platform-specific guides for WhatsApp, TikTok, Discord, and Snapchat</p>
        </AnimatedSection>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide mb-6">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab
                  ? "bg-primary text-white shadow-md"
                  : "bg-white dark:bg-slate-700 text-neutral-600 dark:text-slate-300 border border-neutral-200 dark:border-slate-600 hover:bg-neutral-50 dark:hover:bg-slate-600"
              }`}
            >
              <span>{TAB_ICONS[tab]}</span>
              {tab}
            </button>
          ))}
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-neutral-200 dark:border-slate-700">
          <Content />
        </div>
      </div>
    </section>
  );
}
