import { Metadata } from "next";
import Link from "next/link";
import ClientShell from "@/components/ClientShell";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About — Emoji Intelligence",
  description: "Emoji Intelligence is the world's most comprehensive emoji meaning platform. 3,700+ emojis, 15 platforms, 31 cultures.",
};

export default function AboutPage() {
  return (
    <ClientShell>
      <main className="theme-editorial min-h-screen">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 py-9 sm:py-12">
          <div className="fg-runhead mb-10 sm:mb-12">
            <span className="flex items-center gap-2">
              <Link href="/" className="fg-link">Home</Link>
              <span className="opacity-40" aria-hidden="true">/</span>
              <span className="t-ink">About</span>
            </span>
            <span className="hidden sm:inline">Field Guide</span>
          </div>

          <div className="border-b-2 border-[var(--rule)] pb-7 mb-9">
            <p className="fg-kicker mb-4">Colophon</p>
            <h1 className="font-display t-ink leading-[1.02] tracking-[-0.015em] text-[2.6rem] sm:text-[3.6rem]">About Emoji Intelligence</h1>
          </div>

          <div className="fg-article">
            <p className="fg-lead">Emoji Intelligence is the world&apos;s most comprehensive emoji-meaning field guide. We go beyond simple definitions to provide multi-layer semantic analysis of every emoji across cultures, platforms, and generations.</p>

            <h2>What We Cover</h2>
            <ul>
              <li><strong>3,700+ emojis</strong> with full meaning breakdowns</li>
              <li><strong>15 platforms</strong> — TikTok, WhatsApp, Instagram, X, Discord, Snapchat, and more</li>
              <li><strong>31 cultural regions</strong> — from Western Gen-Z to South Asian, Middle Eastern, and East Asian interpretations</li>
              <li><strong>8 meaning layers</strong> — official, Gen-Z, emotional, dating, sarcastic, meme, and more</li>
              <li><strong>10+ interactive tools</strong> — Emoji Kitchen, AI text translator, vibe search, caption generator, and more</li>
            </ul>

            <h2>How It Works</h2>
            <p>Our data is generated through AI-powered semantic analysis, combining large language models with structured cultural and platform research. Every emoji page is enriched with contextual meaning layers that reflect how emojis are actually used in real conversations.</p>
          </div>

          <div className="mt-10 pt-7 border-t border-[var(--line)]">
            <p className="fg-kicker mb-4">Explore</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/search" className="fg-btn px-5 py-2.5">Search emojis</Link>
              <Link href="/tools/emoji-kitchen" className="fg-btn-ghost mono text-[0.66rem] uppercase tracking-[0.14em] px-5 py-2.5">Emoji Kitchen</Link>
              <Link href="/trending" className="fg-btn-ghost mono text-[0.66rem] uppercase tracking-[0.14em] px-5 py-2.5">Trending</Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </ClientShell>
  );
}
