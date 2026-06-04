import Link from "next/link";
import Footer from "@/components/Footer";
import ClientShell from "@/components/ClientShell";
import HeroSearchBar from "@/components/HeroSearchBar";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/MotionWrappers";
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
import HomeSidebar from "@/components/HomeSidebar";

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
      <main className="theme-editorial">
        {/* Sidebar + All Content */}
        <div className="max-w-7xl mx-auto px-4 flex gap-10">
          <HomeSidebar />
          <div className="min-w-0 flex-1">
            {/* Hero — editorial masthead */}
            <section className="pt-10 sm:pt-14 pb-14">
              <FadeIn>
                <p className="eyebrow mb-6 flex items-center gap-2.5">
                  <span className="inline-block w-8 h-px bg-primary" aria-hidden="true" />
                  AI-Powered Emoji Intelligence
                </p>
                <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-primary-dark dark:text-white leading-[0.98] max-w-3xl">
                  Every Emoji.{" "}
                  <span className="text-primary italic">Every Meaning.</span>
                </h1>
                <p className="mt-7 text-lg sm:text-xl text-neutral-600 dark:text-slate-300 max-w-xl leading-relaxed">
                  Decode what every emoji really means across platforms, cultures, and generations.
                </p>

                {/* Search bar */}
                <div className="mt-8 max-w-xl">
                  <HeroSearchBar />
                </div>

                {/* Stat row — ruled, tabular */}
                <div className="mt-10 max-w-xl rule-top pt-5 flex items-center gap-6 text-sm text-neutral-600 dark:text-slate-300">
                  {[
                    { value: "3,700+", label: "emojis" },
                    { value: "15", label: "platforms" },
                    { value: "31", label: "cultures" },
                  ].map((stat, i) => (
                    <div key={stat.label} className="flex items-center gap-6">
                      {i > 0 && <span className="w-px h-5 bg-current opacity-20" aria-hidden="true" />}
                      <span>
                        <span className="font-display text-xl text-primary-dark dark:text-white tabular-nums">{stat.value}</span>{" "}
                        <span className="text-neutral-500 dark:text-slate-400">{stat.label}</span>
                      </span>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </section>

            {/* Tools Playground — editorial index */}
            <section className="py-14 sm:py-16 rule-top">
              <FadeIn className="mb-10">
                <p className="eyebrow mb-3 flex items-center gap-2">
                  <span className="inline-block w-6 h-px bg-primary" aria-hidden="true" />
                  Tools Playground
                </p>
                <h2 className="font-display text-3xl sm:text-4xl text-primary-dark dark:text-white leading-[1.1]">
                  Play, create &amp; explore
                </h2>
                <p className="text-neutral-500 dark:text-slate-400 mt-3">Interactive tools for every emoji need.</p>
              </FadeIn>
              <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {TOOLS.map((tool, i) => (
                  <StaggerItem key={tool.href}>
                    <Link
                      href={tool.href}
                      className="card-lift group block h-full rounded-xl border border-neutral-200/80 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 hover:border-primary/60 hover:shadow-md"
                    >
                      <div className="flex items-center justify-between mb-5">
                        <span className="font-mono text-xs text-neutral-400 dark:text-slate-500 tabular-nums">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-2xl">{tool.icon}</span>
                      </div>
                      <div className="flex items-center gap-1.5 font-semibold text-primary-dark dark:text-white group-hover:text-primary transition-colors">
                        {tool.name}
                        <span className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" aria-hidden="true">→</span>
                      </div>
                      <div className="text-sm text-neutral-500 dark:text-slate-400 mt-1.5 leading-relaxed">{tool.desc}</div>
                    </Link>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </section>

            {/* Category Browse — mobile only */}
            <section className="py-12 lg:hidden">
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
            </section>

            {/* Editorial Content */}
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
        </div>
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
