import Link from "next/link";
import Footer from "@/components/Footer";
import ClientShell from "@/components/ClientShell";
import HeroSearchBar from "@/components/HeroSearchBar";
import { FadeIn } from "@/components/MotionWrappers";
import HomeSidebar from "@/components/HomeSidebar";
import WhatAreEmojiMeanings from "@/components/home/WhatAreEmojiMeanings";
import QuickReferenceTable from "@/components/home/QuickReferenceTable";
import EmojiOriginHistory from "@/components/home/EmojiOriginHistory";
import CategoryReference from "@/components/home/CategoryReference";
import MostUsedGlobally from "@/components/home/MostUsedGlobally";
import FaceEmojiGuide from "@/components/home/FaceEmojiGuide";
import EmojiDeepDives from "@/components/home/EmojiDeepDives";
import HeartColorGuide from "@/components/home/HeartColorGuide";
import HandEmojiGuide from "@/components/home/HandEmojiGuide";
import TextingContextSection from "@/components/home/TextingContextSection";
import FlirtingEmojiGuide from "@/components/home/FlirtingEmojiGuide";
import PlatformGuides from "@/components/home/PlatformGuides";
import EmojiCombinations from "@/components/home/EmojiCombinations";
import InternetSlangEmojis from "@/components/home/InternetSlangEmojis";
import SymbolEmojis from "@/components/home/SymbolEmojis";
import CulturalMeanings from "@/components/home/CulturalMeanings";
import MisunderstoodEmojis from "@/components/home/MisunderstoodEmojis";
import PlatformRendering from "@/components/home/PlatformRendering";
import ProfessionalEtiquette from "@/components/home/ProfessionalEtiquette";
import NewEmojis2026 from "@/components/home/NewEmojis2026";
import HowToFindEmoji from "@/components/home/HowToFindEmoji";
import CopyPasteReference from "@/components/home/CopyPasteReference";
import FAQAccordion from "@/components/home/FAQAccordion";
import BottomLine from "@/components/home/BottomLine";

const TOOLS = [
  { icon: "🍳", name: "Emoji Kitchen", desc: "Mix two emojis into a new design", href: "/tools/emoji-kitchen" },
  { icon: "🔍", name: "Smart Search", desc: "AI-powered emoji finder", href: "/tools/smart-search" },
  { icon: "✨", name: "Emoji Maker", desc: "Generate custom emojis", href: "/tools/emoji-maker" },
  { icon: "📝", name: "Text to Emoji", desc: "Convert text to emoji style", href: "/tools/text-to-emoji" },
  { icon: "🎯", name: "Vibe Search", desc: "Find emojis by feeling", href: "/tools/vibe-search" },
  { icon: "💬", name: "Caption Generator", desc: "Viral captions with emojis", href: "/tools/caption-generator" },
];

// Iconic, frequently-misread emojis shown as the cover specimen plate.
const SPECIMENS = [
  { emoji: "🥺", label: "Pleading" },
  { emoji: "🫠", label: "Melting" },
  { emoji: "💀", label: "Dying" },
  { emoji: "🧿", label: "Nazar" },
  { emoji: "❤️‍🔥", label: "On Fire" },
  { emoji: "😤", label: "Triumph" },
  { emoji: "🚩", label: "Red Flag" },
  { emoji: "💅", label: "Unbothered" },
];

export default function HomePage() {
  return (
    <ClientShell>
      <main className="theme-editorial">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          {/* ───────────── Masthead ───────────── */}
          <header className="pt-8 sm:pt-10 pb-12 sm:pb-16">
            <div className="fg-runhead mb-10 sm:mb-14">
              <span>Emoji Meanings — A Field Guide</span>
              <span>Nº 2026</span>
            </div>

            <FadeIn>
              <p className="fg-kicker mb-5">The Complete Guide</p>
              <h1 className="font-display t-ink tracking-[-0.02em] leading-[0.95] text-[2.9rem] sm:text-[4.75rem] lg:text-[6.25rem]">
                Every emoji.
                <br />
                <span className="t-accent italic">Every meaning.</span>
              </h1>
              <p className="font-read t-body mt-7 max-w-2xl text-lg sm:text-xl leading-relaxed">
                Decode what every emoji really means — the official Unicode name, the real texting usage,
                and how it shifts by platform, culture, and generation.
              </p>
            </FadeIn>

            {/* Search + stat ledger */}
            <FadeIn>
              <div className="mt-10 max-w-2xl">
                <HeroSearchBar />
              </div>
              <p className="mt-5 fg-label flex flex-wrap items-center gap-x-3 gap-y-1">
                <span>3,700+ emojis</span>
                <span aria-hidden="true" className="opacity-50">/</span>
                <span>15 platforms</span>
                <span aria-hidden="true" className="opacity-50">/</span>
                <span>31 cultures</span>
              </p>
            </FadeIn>

            {/* Specimen plate */}
            <FadeIn>
              <div className="mt-10 border-y border-[var(--line)] py-5 flex gap-7 sm:gap-10 overflow-x-auto scrollbar-hide -mx-5 px-5 sm:mx-0 sm:px-0">
                {SPECIMENS.map((s) => (
                  <figure key={s.label} className="fg-specimen shrink-0">
                    <span className="fg-specimen__g">{s.emoji}</span>
                    <figcaption className="fg-specimen__c">{s.label}</figcaption>
                  </figure>
                ))}
              </div>
            </FadeIn>
          </header>

          {/* ───────────── Tools (front matter) ───────────── */}
          <section className="pb-14">
            <div className="fg-chapter__bar">
              <span className="fg-chapter__n">Tools</span>
              <span className="fg-chapter__count">{TOOLS.length} interactive</span>
            </div>
            <div className="mt-6 fg-list">
              {TOOLS.map((tool, i) => (
                <Link key={tool.href} href={tool.href} className="fg-link group flex items-baseline gap-3 sm:gap-4 border-b border-[var(--line)] py-3.5">
                  <span className="mono text-[0.62rem] t-muted w-5 shrink-0 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-lg shrink-0 w-6 text-center">{tool.icon}</span>
                  <span className="font-read font-medium t-ink">{tool.name}</span>
                  <span className="hidden sm:block flex-1 t-muted text-sm">{tool.desc}</span>
                  <span className="t-muted group-hover:t-accent transition-colors ml-auto sm:ml-0">→</span>
                </Link>
              ))}
            </div>
          </section>

          {/* ───────────── Chapters + on-this-page rail ───────────── */}
          <div className="flex gap-10 lg:gap-16">
            <div className="min-w-0 flex-1">
              <WhatAreEmojiMeanings />
              <QuickReferenceTable />
              <EmojiOriginHistory />
              <CategoryReference />
              <MostUsedGlobally />
              <FaceEmojiGuide />
              <EmojiDeepDives />
              <HeartColorGuide />
              <HandEmojiGuide />
              <TextingContextSection />
              <FlirtingEmojiGuide />
              <PlatformGuides />
              <EmojiCombinations />
              <InternetSlangEmojis />
              <SymbolEmojis />
              <CulturalMeanings />
              <MisunderstoodEmojis />
              <PlatformRendering />
              <ProfessionalEtiquette />
              <NewEmojis2026 />
              <HowToFindEmoji />
              <CopyPasteReference />
              <FAQAccordion />
              <BottomLine />
            </div>
            <HomeSidebar />
          </div>
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: "Emoji Meanings: The Complete Guide (2026)",
              description:
                "The definitive guide to emoji meanings — every face, heart, hand, and symbol decoded across WhatsApp, Instagram, TikTok, Snapchat, and Discord.",
              datePublished: "2026-01-01",
              dateModified: "2026-05-28",
              author: { "@type": "Organization", name: "Emoji Project" },
            }),
          }}
        />
      </main>

      <Footer />
    </ClientShell>
  );
}
