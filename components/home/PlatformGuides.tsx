"use client";

import { useState } from "react";
import SectionShell from "./SectionShell";

const TABS = ["WhatsApp", "Instagram", "TikTok", "Snapchat", "Discord"] as const;
type Tab = typeof TABS[number];
const TAB_ICONS: Record<Tab, string> = { WhatsApp: "💬", Instagram: "📸", TikTok: "🎵", Snapchat: "👻", Discord: "🎮" };

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

function Table({ head, rows }: { head: string[]; rows: React.ReactNode }) {
  return (
    <div className="fg-table-wrap">
      <table className="fg-table">
        <thead><tr>{head.map((h) => <th key={h}>{h}</th>)}</tr></thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}

function WhatsAppTab() {
  return (
    <div>
      <p className="fg-prose max-w-2xl mb-6">WhatsApp uses Meta&apos;s custom emoji designs, which can appear noticeably different from Apple iOS or Android versions.</p>
      <Table head={["Emoji", "Common Misreading", "Actual Meaning"]} rows={WHATSAPP_DATA.map((r) => (
        <tr key={r.emoji}><td className="em">{r.emoji}</td><td className="muted">{r.misreading}</td><td className="strong">{r.actual}</td></tr>
      ))} />
      <dl className="fg-deflist mt-7 max-w-2xl">
        <dt>🧿 The Nazar Amulet</dt>
        <dd>A centuries-old tradition across Turkish, Middle Eastern, and South Asian cultures — a blue glass eye charm to deflect negative energy. On WhatsApp it went mainstream: sent to bless good news or celebrate milestones.</dd>
      </dl>
    </div>
  );
}
function InstagramTab() {
  return (
    <div>
      <p className="fg-prose max-w-2xl mb-6">Instagram developed its own dialect. Bio emojis function as compressed personal branding.</p>
      <div className="fg-list">
        {INSTAGRAM_BIOS.map((item) => (
          <div key={item.emoji} className="fg-entry fg-entry--ledger">
            <span className="fg-entry__glyph" style={{ fontSize: "1.5rem" }}>{item.emoji}</span>
            <div className="fg-entry__main">
              <span className="fg-entry__name">{item.meaning}</span>
              <p className="fg-entry__text">{item.identity}</p>
            </div>
          </div>
        ))}
      </div>
      <dl className="fg-deflist mt-7 max-w-2xl">
        <dt>Reading DM reactions</dt>
        <dd>A single 👀 on a story means they found it interesting. A ❤️ reaction is warmer than a Like. A 🔥 signals strong approval. A 😭 reaction is almost always positive — &ldquo;this wrecked me in the best way.&rdquo;</dd>
      </dl>
    </div>
  );
}
function TikTokTab() {
  return (
    <div>
      <p className="fg-prose max-w-2xl mb-6">TikTok accelerated emoji evolution faster than any platform. Several symbols here contradict their official definitions.</p>
      <div className="fg-list">
        {TIKTOK_DATA.map((item) => (
          <div key={item.emoji} className="fg-entry fg-entry--ledger">
            <span className="fg-entry__glyph">{item.emoji}</span>
            <div className="fg-entry__main">
              <span className="fg-entry__name normal-case" style={{ textTransform: "none", letterSpacing: 0, fontFamily: "var(--font-read)", fontSize: "0.97rem", color: "var(--ink)" }}>{item.meaning}</span>
              <p className="fg-entry__text t-muted">{item.why}</p>
            </div>
          </div>
        ))}
      </div>
      <dl className="fg-deflist mt-7 max-w-2xl">
        <dt>Combo punchlines</dt>
        <dd>TikTok turned combinations into standalone punchlines. 💀🙏 = &ldquo;this killed me and I&apos;m praying for myself.&rdquo; 😭✋ = &ldquo;stop, I cannot take it.&rdquo;</dd>
      </dl>
    </div>
  );
}
function SnapchatTab() {
  return (
    <div>
      <p className="fg-prose max-w-2xl mb-6">Snapchat works differently — most emojis are <strong className="t-ink">assigned automatically by the algorithm</strong> based on interaction patterns, not sent by users.</p>
      <Table head={["Emoji", "Snapchat Meaning", "What Triggers It"]} rows={SNAPCHAT_DATA.map((r) => (
        <tr key={r.emoji}><td className="em">{r.emoji}</td><td className="strong">{r.meaning}</td><td className="muted">{r.trigger}</td></tr>
      ))} />
      <div className="fg-pull fg-pull--sm mt-7">
        <span className="fg-kicker">Important</span>
        <p>😬 beside a name doesn&apos;t mean they&apos;re grimacing at you — it means you share a #1 best friend. The whole system describes the relationship; nobody sent it.</p>
      </div>
    </div>
  );
}
function DiscordTab() {
  return (
    <div>
      <p className="fg-prose max-w-2xl mb-6">Discord runs two systems: standard Unicode emojis, and custom server emotes uploaded by administrators.</p>
      <Table head={["Emoji", "Standard Meaning", "Discord Reading"]} rows={DISCORD_DATA.map((r) => (
        <tr key={r.emoji}><td className="em">{r.emoji}</td><td className="muted">{r.standard}</td><td className="strong">{r.discord}</td></tr>
      ))} />
      <dl className="fg-deflist mt-7 max-w-2xl">
        <dt>Emojis vs. emotes</dt>
        <dd><strong className="t-ink">Emojis</strong> are standard Unicode — the same everywhere. <strong className="t-ink">Emotes</strong> are custom images uploaded to one server. Nitro subscribers use animated emojis across all servers — a status marker in communities that care.</dd>
      </dl>
    </div>
  );
}

const TAB_CONTENT: Record<Tab, () => React.JSX.Element> = {
  WhatsApp: WhatsAppTab, Instagram: InstagramTab, TikTok: TikTokTab, Snapchat: SnapchatTab, Discord: DiscordTab,
};

export default function PlatformGuides() {
  const [activeTab, setActiveTab] = useState<Tab>("WhatsApp");
  const Content = TAB_CONTENT[activeTab];
  return (
    <SectionShell
      n="12"
      id="platforms"
      title="Platform-Specific Emoji Guides"
      dek="Every platform has its own dialect — choose one to see the differences."
    >
      <div className="fg-tabs mb-7 overflow-x-auto scrollbar-hide">
        {TABS.map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} aria-pressed={activeTab === tab} data-active={activeTab === tab} className="fg-tab">
            <span aria-hidden="true">{TAB_ICONS[tab]}</span>{tab}
          </button>
        ))}
      </div>
      <Content />
    </SectionShell>
  );
}
