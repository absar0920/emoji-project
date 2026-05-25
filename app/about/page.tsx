import { Metadata } from "next";
import Link from "next/link";
import ClientShell from "@/components/ClientShell";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About — Emoji Intelligence",
  description:
    "Emoji Intelligence is the world's most comprehensive emoji meaning platform. 3,700+ emojis, 15 platforms, 31 cultures.",
};

export default function AboutPage() {
  return (
    <ClientShell>
      <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-extrabold text-primary-dark mb-6">
          About Emoji Intelligence
        </h1>

        <div className="prose prose-neutral max-w-none space-y-6 text-neutral-700">
          <p className="text-lg">
            Emoji Intelligence is the world&apos;s most comprehensive emoji
            meaning platform. We go beyond simple definitions to provide
            multi-layer semantic analysis of every emoji across cultures,
            platforms, and generations.
          </p>

          <h2 className="text-xl font-bold text-primary-dark">What We Cover</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>3,700+ emojis</strong> with full meaning breakdowns
            </li>
            <li>
              <strong>15 platforms</strong> — TikTok, WhatsApp, Instagram, X,
              Discord, Snapchat, and more
            </li>
            <li>
              <strong>31 cultural regions</strong> — from Western Gen-Z to South
              Asian, Middle Eastern, and East Asian interpretations
            </li>
            <li>
              <strong>8 meaning layers</strong> — official, Gen-Z, emotional,
              dating, sarcastic, meme, and more
            </li>
            <li>
              <strong>10+ interactive tools</strong> — Emoji Kitchen, AI text
              translator, vibe search, caption generator, and more
            </li>
          </ul>

          <h2 className="text-xl font-bold text-primary-dark">
            How It Works
          </h2>
          <p>
            Our data is generated through AI-powered semantic analysis,
            combining large language models with structured cultural and
            platform research. Every emoji page is enriched with contextual
            meaning layers that reflect how emojis are actually used in
            real conversations.
          </p>

          <h2 className="text-xl font-bold text-primary-dark">Explore</h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/search"
              className="px-4 py-2 rounded-full bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors"
            >
              Search Emojis
            </Link>
            <Link
              href="/tools/emoji-kitchen"
              className="px-4 py-2 rounded-full bg-neutral-100 text-neutral-700 text-sm font-medium hover:bg-neutral-200 transition-colors"
            >
              Emoji Kitchen
            </Link>
            <Link
              href="/trending"
              className="px-4 py-2 rounded-full bg-neutral-100 text-neutral-700 text-sm font-medium hover:bg-neutral-200 transition-colors"
            >
              Trending Emojis
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </ClientShell>
  );
}
