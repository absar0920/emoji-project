"use client";

import { useState } from "react";
import { AnimatedSection } from "@/components/MotionWrappers";

const TABS = ["WhatsApp", "Instagram", "TikTok", "Snapchat", "Discord"] as const;
type Tab = typeof TABS[number];

const TAB_ICONS: Record<Tab, string> = {
  WhatsApp: "💬", Instagram: "📸", TikTok: "🎵", Snapchat: "👻", Discord: "🎮",
};

const WHATSAPP_DATA = [
  { emoji: "🙂", misreading: "Friendly smile", actual: "Passive-aggression in modern use" },
  { emoji: "😐", misreading: "Neutral", actual: "Deliberate flatness — \"I have nothing to say\"" },
  { emoji: "🧿", misreading: "Decorative blue circle", actual: "Nazar Amulet — evil eye protection" },
  { emoji: "😬", misreading: "Mild awkwardness", actual: "Strong discomfort — \"this is bad\"" },
  { emoji: "🙏", misreading: "\"Thank you\" gesture", actual: "Prayer, gratitude, AND contextual high-five" },
  { emoji: "💯", misreading: "\"100 percent\"", actual: "Full endorsement, perfection, no notes" },
  { emoji: "😪", misreading: "Tired or sleepy", actual: "Sneezing or sick — the drop is a snot bubble" },
];

const INSTAGRAM_BIOS = [
  { emoji: "✨", meaning: "Magic, positivity, sparkle energy", identity: "Creator, wellness, optimist" },
  { emoji: "🌙", meaning: "Night aesthetic, introspective", identity: "Aesthetic accounts, poets" },
  { emoji: "🎯", meaning: "Goal-oriented, ambitious", identity: "Business, fitness, productivity" },
  { emoji: "📍", meaning: "Location — based in [city]", identity: "Local businesses, travel" },
  { emoji: "🤍", meaning: "Minimalist, clean aesthetic", identity: "Lifestyle, fashion" },
  { emoji: "💻", meaning: "Tech, remote work", identity: "Tech workers, freelancers" },
  { emoji: "🌱", meaning: "Sustainability, growth", identity: "Eco accounts, wellness" },
  { emoji: "📸", meaning: "Photography, visual creation", identity: "Photographers, artists" },
  { emoji: "☕", meaning: "Coffee lover, cozy aesthetic", identity: "Lifestyle bloggers" },
  { emoji: "🔮", meaning: "Mystical, spiritual", identity: "Astrology accounts" },
  { emoji: "🦋", meaning: "Transformation, growth", identity: "Mental health, self-dev" },
  { emoji: "🌊", meaning: "Nature, travel, free spirit", identity: "Travel bloggers, surfers" },
];

const TIKTOK_DATA = [
  { emoji: "💀", meaning: "Dying of laughter — \"this killed me\"", why: "Replaced 😂 as authentic laughter ~2022" },
  { emoji: "😭", meaning: "Overwhelmingly moved or funny — not sad", why: "\"Crying\" became ironic positive overwhelm" },
  { emoji: "🤌", meaning: "Perfect, flawless, chef's kiss", why: "Italian gesture adopted globally" },
  { emoji: "🗿", meaning: "Deadpan witness to chaos", why: "Easter Island statue = emotionless stoniness" },
  { emoji: "🫶", meaning: "Community support, wholesome mutual care", why: "Creators thanking audiences" },
  { emoji: "🤡", meaning: "\"I am the clown here\" — self-deprecating", why: "Reddit/Twitter origin, TikTok amplified" },
  { emoji: "💅", meaning: "Unbothered, confident, \"not my problem\"", why: "Creator culture confidence signal" },
  { emoji: "😤", meaning: "\"I did that\" — satisfied triumph", why: "Opposite of how most people read it" },
  { emoji: "🫃", meaning: "Food baby, bloated from overeating", why: "Ironic self-deprecation" },
];

const SNAPCHAT_DATA = [
  { emoji: "🌟", meaning: "Super BFF — mutual #1 for 2+ months", trigger: "Both send most snaps for 2+ months" },
  { emoji: "💛", meaning: "#1 Best Friends mutually", trigger: "You are each other's top snap contact" },
  { emoji: "❤️", meaning: "Best Friends for two weeks", trigger: "Mutual #1 for 14 consecutive days" },
  { emoji: "💕", meaning: "Best Friends for two months", trigger: "Mutual #1 for 2 consecutive months" },
  { emoji: "😊", meaning: "Good Friend — one of their best friends", trigger: "You send many snaps, not necessarily most" },
  { emoji: "😬", meaning: "You share a mutual #1 best friend", trigger: "Your top contact is also their top contact" },
  { emoji: "🔥", meaning: "Active Snap Streak", trigger: "Snapped each other daily for N days" },
  { emoji: "💯", meaning: "100-Day Streak milestone", trigger: "A streak that reached exactly 100 days" },
  { emoji: "⌛", meaning: "Streak about to end", trigger: "No snap exchanged in past 24 hours" },
  { emoji: "🎂", meaning: "Birthday", trigger: "Birthday date from their profile" },
];

const DISCORD_DATA = [
  { emoji: "🗿", standard: "Moai / Easter Island Statue", discord: "Deadpan, emotionless witness to chaos" },
  { emoji: "👀", standard: "Looking, watching", discord: "\"I see what is happening here\"" },
  { emoji: "💀", standard: "Death", discord: "Dying of laughter — primary humor signal" },
  { emoji: "🤡", standard: "Clown", discord: "\"That take is foolish\" or self-deprecation" },
  { emoji: "🔥", standard: "Fire", discord: "Excellent, high-quality content" },
  { emoji: "😭", standard: "Crying", discord: "Positive overwhelm — not sadness" },
  { emoji: "💯", standard: "100%", discord: "Full agreement, perfect, no criticism" },
  { emoji: "🧌", standard: "Troll", discord: "Internet troll reference" },
];

function WhatsAppTab() {
  return (
    <div>
      <p className="text-neutral-600 dark:text-slate-300 leading-relaxed mb-6">WhatsApp uses Meta&apos;s custom emoji designs, which can appear noticeably different from Apple iOS or Android versions.</p>
      <div className="overflow-x-auto rounded-xl border border-neutral-200 dark:border-slate-700 mb-6">
        <table className="w-full text-sm">
          <thead><tr className="bg-neutral-100 dark:bg-slate-700 text-left">
            <th className="px-4 py-3 font-bold text-primary-dark dark:text-white">Emoji</th>
            <th className="px-4 py-3 font-bold text-primary-dark dark:text-white">Common Misreading</th>
            <th className="px-4 py-3 font-bold text-primary-dark dark:text-white">Actual Meaning</th>
          </tr></thead>
          <tbody>{WHATSAPP_DATA.map((row, i) => (
            <tr key={row.emoji} className={i % 2 === 0 ? "bg-white dark:bg-slate-800" : "bg-neutral-50 dark:bg-slate-800/50"}>
              <td className="px-4 py-3 text-2xl">{row.emoji}</td>
              <td className="px-4 py-3 text-neutral-500 dark:text-slate-400">{row.misreading}</td>
              <td className="px-4 py-3 font-medium text-primary-dark dark:text-white">{row.actual}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>
      <div className="bg-indigo-50 dark:bg-indigo-950/30 border-l-4 border-primary rounded-r-xl p-5">
        <h4 className="font-bold text-primary-dark dark:text-white mb-1">🧿 The Nazar Amulet</h4>
        <p className="text-sm text-neutral-600 dark:text-slate-300 leading-relaxed">A centuries-old tradition across Turkish, Middle Eastern, and South Asian cultures — a blue glass eye charm to deflect negative energy. On WhatsApp it became mainstream: people send it to bless good news, celebrate milestones, or as culturally familiar shorthand.</p>
      </div>
    </div>
  );
}

function InstagramTab() {
  return (
    <div>
      <p className="text-neutral-600 dark:text-slate-300 leading-relaxed mb-4">Instagram has developed its own emoji dialect. Bio emojis function as compressed personal branding.</p>
      <h4 className="font-bold text-primary-dark dark:text-white mb-3">Instagram Bio Emoji Meanings</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
        {INSTAGRAM_BIOS.map((item) => (
          <div key={item.emoji} className="flex items-center gap-3 bg-neutral-50 dark:bg-slate-700/50 rounded-lg p-3">
            <span className="text-xl">{item.emoji}</span>
            <div>
              <p className="text-sm font-medium text-primary-dark dark:text-white">{item.meaning}</p>
              <p className="text-xs text-neutral-500 dark:text-slate-400">{item.identity}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-violet-50 dark:bg-violet-950/30 border-l-4 border-accent-violet rounded-r-xl p-5">
        <h4 className="font-bold text-primary-dark dark:text-white mb-1">💡 DM Signal Guide</h4>
        <p className="text-sm text-neutral-600 dark:text-slate-300 leading-relaxed">A single 👀 on a story means they found it interesting. A ❤️ reaction is warmer than a Like. A 🔥 signals strong approval. A 😭 DM reaction is almost always positive — &ldquo;this content wrecked me in the best way.&rdquo;</p>
      </div>
    </div>
  );
}

function TikTokTab() {
  return (
    <div>
      <p className="text-neutral-600 dark:text-slate-300 leading-relaxed mb-6">TikTok accelerated emoji meaning evolution faster than any other platform. Several symbols carry meanings that contradict their official definitions.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {TIKTOK_DATA.map((item) => (
          <div key={item.emoji} className="bg-neutral-50 dark:bg-slate-700/50 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-1">
              <span className="text-2xl">{item.emoji}</span>
              <span className="font-medium text-sm text-primary-dark dark:text-white">{item.meaning}</span>
            </div>
            <p className="text-xs text-neutral-500 dark:text-slate-400 pl-10">{item.why}</p>
          </div>
        ))}
      </div>
      <div className="bg-violet-50 dark:bg-violet-950/30 border-l-4 border-accent-violet rounded-r-xl p-5">
        <h4 className="font-bold text-primary-dark dark:text-white mb-1">💡 Emoji Combo Punchlines</h4>
        <p className="text-sm text-neutral-600 dark:text-slate-300 leading-relaxed">TikTok popularized emoji combinations as standalone punchlines. 💀🙏 = &ldquo;this killed me and I&apos;m praying for myself.&rdquo; 😭✋ = &ldquo;stop, I cannot take it.&rdquo; Two symbols forming complete emotional sentences.</p>
      </div>
    </div>
  );
}

function SnapchatTab() {
  return (
    <div>
      <p className="text-neutral-600 dark:text-slate-300 leading-relaxed mb-6">Snapchat&apos;s emoji system works differently — most emojis are <strong className="text-primary-dark dark:text-white">assigned automatically by the algorithm</strong> based on interaction patterns, not sent by users.</p>
      <div className="overflow-x-auto rounded-xl border border-neutral-200 dark:border-slate-700 mb-6">
        <table className="w-full text-sm">
          <thead><tr className="bg-neutral-100 dark:bg-slate-700 text-left">
            <th className="px-4 py-3 font-bold text-primary-dark dark:text-white">Emoji</th>
            <th className="px-4 py-3 font-bold text-primary-dark dark:text-white">Snapchat Meaning</th>
            <th className="px-4 py-3 font-bold text-primary-dark dark:text-white">What Triggers It</th>
          </tr></thead>
          <tbody>{SNAPCHAT_DATA.map((row, i) => (
            <tr key={row.emoji} className={i % 2 === 0 ? "bg-white dark:bg-slate-800" : "bg-neutral-50 dark:bg-slate-800/50"}>
              <td className="px-4 py-3 text-2xl">{row.emoji}</td>
              <td className="px-4 py-3 font-medium text-primary-dark dark:text-white">{row.meaning}</td>
              <td className="px-4 py-3 text-neutral-500 dark:text-slate-400 text-xs">{row.trigger}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>
      <div className="bg-amber-50 dark:bg-amber-950/30 border-l-4 border-accent-amber rounded-r-xl p-5">
        <h4 className="font-bold text-primary-dark dark:text-white mb-1">⚠️ Descriptive, Not Expressive</h4>
        <p className="text-sm text-neutral-600 dark:text-slate-300 leading-relaxed">😬 next to a name does not mean they are grimacing at you. It indicates you both have the same #1 best friend. This entire system describes the relationship algorithmically — these are not messages anyone sent.</p>
      </div>
    </div>
  );
}

function DiscordTab() {
  return (
    <div>
      <p className="text-neutral-600 dark:text-slate-300 leading-relaxed mb-6">Discord runs two distinct systems: standard Unicode emojis and custom server emotes uploaded by administrators.</p>
      <div className="overflow-x-auto rounded-xl border border-neutral-200 dark:border-slate-700 mb-6">
        <table className="w-full text-sm">
          <thead><tr className="bg-neutral-100 dark:bg-slate-700 text-left">
            <th className="px-4 py-3 font-bold text-primary-dark dark:text-white">Emoji</th>
            <th className="px-4 py-3 font-bold text-primary-dark dark:text-white">Standard Meaning</th>
            <th className="px-4 py-3 font-bold text-primary-dark dark:text-white">Discord Reading</th>
          </tr></thead>
          <tbody>{DISCORD_DATA.map((row, i) => (
            <tr key={row.emoji} className={i % 2 === 0 ? "bg-white dark:bg-slate-800" : "bg-neutral-50 dark:bg-slate-800/50"}>
              <td className="px-4 py-3 text-2xl">{row.emoji}</td>
              <td className="px-4 py-3 text-neutral-500 dark:text-slate-400">{row.standard}</td>
              <td className="px-4 py-3 font-medium text-primary-dark dark:text-white">{row.discord}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>
      <div className="bg-indigo-50 dark:bg-indigo-950/30 border-l-4 border-primary rounded-r-xl p-5">
        <h4 className="font-bold text-primary-dark dark:text-white mb-1">Emojis vs. Emotes on Discord</h4>
        <p className="text-sm text-neutral-600 dark:text-slate-300 leading-relaxed"><strong>Emojis</strong> are standard Unicode symbols — same across all platforms. <strong>Emotes</strong> are custom images uploaded to a specific server. Discord Nitro subscribers can use animated emojis across all servers — a notable status marker in communities where this matters.</p>
      </div>
    </div>
  );
}

const TAB_CONTENT: Record<Tab, () => React.JSX.Element> = {
  WhatsApp: WhatsAppTab,
  Instagram: InstagramTab,
  TikTok: TikTokTab,
  Snapchat: SnapchatTab,
  Discord: DiscordTab,
};

export default function PlatformGuides() {
  const [activeTab, setActiveTab] = useState<Tab>("WhatsApp");
  const Content = TAB_CONTENT[activeTab];

  return (
    <section className="py-14 bg-neutral-50 dark:bg-slate-800/50">
      <div className="max-w-5xl mx-auto px-4">
        <AnimatedSection>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-primary-dark dark:text-white mb-2">
            Platform-Specific Emoji Guides
          </h2>
          <p className="text-neutral-500 dark:text-slate-400 mb-6">Every platform has its own emoji dialect — pick a platform to see the differences</p>
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
