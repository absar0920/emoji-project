import Link from "next/link";
import Footer from "@/components/Footer";
import ClientShell from "@/components/ClientShell";
import HeroSearchBar from "@/components/HeroSearchBar";
import { FadeIn, StaggerContainer, StaggerItem, AnimatedCard } from "@/components/MotionWrappers";
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
  { icon: "🍳", name: "Emoji Kitchen", desc: "Mix emojis into new designs", href: "/tools/emoji-kitchen" },
  { icon: "🔍", name: "Smart Search", desc: "AI-powered emoji finder", href: "/tools/smart-search" },
  { icon: "✨", name: "Emoji Maker", desc: "Generate custom emojis", href: "/tools/emoji-maker" },
  { icon: "📝", name: "Text to Emoji", desc: "Convert text to emoji style", href: "/tools/text-to-emoji" },
  { icon: "🎯", name: "Vibe Search", desc: "Find emojis by feeling", href: "/tools/vibe-search" },
  { icon: "💬", name: "Caption Generator", desc: "Viral captions with emojis", href: "/tools/caption-generator" },
];

const CATEGORIES = [
  { icon: "😀", name: "Smileys & Emotion", href: "/search?category=Smileys+%26+Emotion" },
  { icon: "👥", name: "People & Body", href: "/search?category=People+%26+Body" },
  { icon: "🐱", name: "Animals & Nature", href: "/search?category=Animals+%26+Nature" },
  { icon: "🍕", name: "Food & Drink", href: "/search?category=Food+%26+Drink" },
  { icon: "✈️", name: "Travel & Places", href: "/search?category=Travel+%26+Places" },
  { icon: "⚽", name: "Activities", href: "/search?category=Activities" },
  { icon: "💡", name: "Objects", href: "/search?category=Objects" },
  { icon: "❤️", name: "Symbols", href: "/search?category=Symbols" },
  { icon: "🏁", name: "Flags", href: "/search?category=Flags" },
];

export default function HomePage() {
  return (
    <ClientShell>
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-[#F8F7FF] to-[#EEF2FF] dark:from-slate-800 dark:to-indigo-950 py-16 sm:py-24">
          <FadeIn className="max-w-3xl mx-auto px-4 text-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 dark:bg-indigo-500/20 text-primary text-sm font-medium mb-6">
              ✨ AI-Powered Emoji Intelligence
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-primary-dark dark:text-white leading-tight mb-4">
              Every Emoji.{" "}
              <span className="bg-gradient-to-r from-primary to-accent-violet bg-clip-text text-transparent">
                Every Meaning.
              </span>
            </h1>
            <p className="text-lg text-neutral-500 dark:text-slate-400 mb-8">
              3,700+ emojis · 15 platforms · 31 cultures
            </p>

            {/* Search bar */}
            <HeroSearchBar />
          </FadeIn>
        </section>

        {/* Tools Playground */}
        <section className="py-12 bg-neutral-50/50 dark:bg-slate-800/80">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-xl font-bold text-primary-dark dark:text-white mb-6">Tools Playground</h2>
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {TOOLS.map((tool) => (
                <StaggerItem key={tool.href}>
                  <AnimatedCard>
                    <Link
                      href={tool.href}
                      className="bg-gradient-to-br from-primary-light/50 to-violet-50/50 dark:from-slate-700 dark:to-slate-700 rounded-2xl shadow-md dark:shadow-lg dark:shadow-black/20 p-5 hover:shadow-lg dark:hover:shadow-xl dark:hover:shadow-black/30 transition-shadow block dark:border dark:border-slate-600"
                    >
                      <div className="bg-white dark:bg-slate-600 rounded-xl shadow-sm w-12 h-12 flex items-center justify-center text-2xl mb-3">
                        {tool.icon}
                      </div>
                      <div className="font-semibold text-primary-dark dark:text-white">{tool.name}</div>
                      <div className="text-sm text-neutral-500 dark:text-slate-400 mt-1">{tool.desc}</div>
                    </Link>
                  </AnimatedCard>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Category Browse */}
        <section className="py-12">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-xl font-bold text-primary-dark dark:text-white mb-6">Browse by Category</h2>
            <StaggerContainer className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {CATEGORIES.map((cat) => (
                <StaggerItem key={cat.name}>
                  <Link
                    href={cat.href}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-slate-800 shadow-sm border border-neutral-100 dark:border-slate-700 text-sm font-medium text-neutral-700 dark:text-slate-300 hover:shadow-md transition-shadow whitespace-nowrap shrink-0"
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.name}</span>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* === EDITORIAL CONTENT SECTIONS === */}
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: "Emoji Meanings: The Complete Guide (2026)",
              description: "The definitive guide to emoji meanings — every face, heart, hand, and symbol decoded across WhatsApp, Instagram, TikTok, Snapchat, and Discord.",
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
