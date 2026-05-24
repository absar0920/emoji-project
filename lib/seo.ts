import { EmojiDocument, ComparisonDocument, ComboDocument, PLATFORM_LABELS, PlatformKey, CULTURE_INFO, CultureRegion } from "@/types/emoji";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://emojintel.com";
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || "Emoji Intelligence";

export function generateEmojiMeta(emoji: EmojiDocument) {
  const year = new Date().getFullYear();
  return {
    title: `${emoji.character} ${emoji.name} Emoji Meaning — Gen-Z, TikTok, WhatsApp [${year}]`,
    description: `What does ${emoji.character} mean? Official, Gen-Z slang, dating, meme, and sarcastic meanings across TikTok, WhatsApp & Instagram.`.slice(
      0,
      155
    ),
    canonical: `${SITE_URL}/emoji/${emoji.slug}`,
    openGraph: {
      title: `${emoji.character} ${emoji.name} Emoji Meaning`,
      description: `Discover what ${emoji.character} really means across platforms, cultures, and Gen-Z slang.`,
      url: `${SITE_URL}/emoji/${emoji.slug}`,
      siteName: SITE_NAME,
      type: "article" as const,
    },
  };
}

export function generateFAQSchema(emoji: EmojiDocument) {
  const faqs = [
    {
      question: `What does the ${emoji.character} ${emoji.name} emoji mean?`,
      answer: emoji.official_meaning?.description || `The ${emoji.name} emoji is a commonly used emoji.`,
    },
    {
      question: `What does ${emoji.character} mean on TikTok?`,
      answer: (emoji as any).platforms?.tiktok?.meaning || emoji.tiktok?.meaning || `The ${emoji.name} emoji is used on TikTok in various contexts.`,
    },
    {
      question: `What does ${emoji.character} mean on WhatsApp?`,
      answer: (emoji as any).platforms?.whatsapp?.chat_meaning || emoji.whatsapp?.chat_meaning || `The ${emoji.name} emoji is commonly used in WhatsApp chats.`,
    },
    {
      question: `What does ${emoji.character} mean in Gen-Z slang?`,
      answer: emoji.genz_meaning?.interpretation || `The ${emoji.name} emoji has various meanings in Gen-Z culture.`,
    },
    {
      question: `Is the ${emoji.character} emoji safe to use?`,
      answer: emoji.safety?.safe_meaning || `The ${emoji.name} emoji is generally safe to use.`,
    },
    {
      question: `What does ${emoji.character} mean in texting?`,
      answer: emoji.emotional_meaning?.psychology_note || `The ${emoji.name} emoji conveys various emotions in texting.`,
    },
    {
      question: `What is the shortcode for ${emoji.character}?`,
      answer: `The shortcode for ${emoji.name} is ${emoji.shortcode}`,
    },
    {
      question: `What does ${emoji.character} mean in dating?`,
      answer: emoji.dating_meaning?.flirt_usage || `The ${emoji.name} emoji can be used in dating contexts.`,
    },
  ];

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function generateBreadcrumbSchema(emoji: EmojiDocument) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Emojis",
        item: `${SITE_URL}/emoji`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${emoji.character} ${emoji.name}`,
        item: `${SITE_URL}/emoji/${emoji.slug}`,
      },
    ],
  };
}

export function generateHomeMeta() {
  return {
    title: `${SITE_NAME} — Every Emoji. Every Meaning.`,
    description:
      "Discover what every emoji really means. Gen-Z slang, TikTok meanings, cultural intelligence, and platform-specific usage for 1000+ emojis.",
    canonical: SITE_URL,
  };
}

export function generatePlatformMeta(emoji: EmojiDocument, platform: PlatformKey) {
  const year = new Date().getFullYear();
  const platformLabel = PLATFORM_LABELS[platform];
  return {
    title: `${emoji.character} ${emoji.name} Emoji on ${platformLabel} — Meaning, Trends [${year}]`,
    description: `What does ${emoji.character} mean on ${platformLabel}? Usage, trends, and context for the ${emoji.name} emoji on ${platformLabel}.`.slice(0, 155),
    canonical: `${SITE_URL}/${platform}/${emoji.slug}`,
    openGraph: {
      title: `${emoji.character} ${emoji.name} on ${platformLabel}`,
      description: `How ${emoji.character} is used on ${platformLabel} — meanings, trends, and context.`,
      url: `${SITE_URL}/${platform}/${emoji.slug}`,
      siteName: SITE_NAME,
      type: "article" as const,
    },
  };
}

export function generatePlatformBreadcrumb(emoji: EmojiDocument, platform: PlatformKey) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: PLATFORM_LABELS[platform], item: `${SITE_URL}/${platform}` },
      { "@type": "ListItem", position: 3, name: `${emoji.character} ${emoji.name}`, item: `${SITE_URL}/${platform}/${emoji.slug}` },
    ],
  };
}

export function generatePlatformFAQ(emoji: EmojiDocument, platform: PlatformKey) {
  const label = PLATFORM_LABELS[platform];
  const platformData = ((emoji as any).platforms?.[platform] || emoji[platform]) as Record<string, unknown> | undefined;
  const firstValue = platformData ? String(Object.values(platformData)[0] || "") : "";

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What does ${emoji.character} mean on ${label}?`,
        acceptedAnswer: { "@type": "Answer", text: firstValue },
      },
      {
        "@type": "Question",
        name: `How is ${emoji.character} used on ${label}?`,
        acceptedAnswer: { "@type": "Answer", text: `The ${emoji.name} emoji is commonly used on ${label} in various contexts.` },
      },
      {
        "@type": "Question",
        name: `Is ${emoji.character} popular on ${label}?`,
        acceptedAnswer: { "@type": "Answer", text: `Check the trend score and usage frequency for ${emoji.name} on ${label}.` },
      },
    ],
  };
}

export function generateComparisonMeta(comparison: ComparisonDocument) {
  const year = new Date().getFullYear();
  return {
    title: `${comparison.emoji1_character} ${comparison.emoji1_name} vs ${comparison.emoji2_character} ${comparison.emoji2_name} — Emoji Comparison [${year}]`,
    description: `What's the difference between ${comparison.emoji1_character} and ${comparison.emoji2_character}? Compare meanings across Gen-Z, TikTok, dating, and more.`.slice(0, 155),
    canonical: `${SITE_URL}/vs/${comparison.slug}`,
  };
}

export function generateComparisonFAQ(comparison: ComparisonDocument) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What's the difference between ${comparison.emoji1_character} and ${comparison.emoji2_character}?`,
        acceptedAnswer: { "@type": "Answer", text: comparison.differences?.official || "These emojis have different meanings and usage contexts." },
      },
      {
        "@type": "Question",
        name: `Which is more popular, ${comparison.emoji1_character} or ${comparison.emoji2_character}?`,
        acceptedAnswer: { "@type": "Answer", text: `${comparison.winner || "One of these emojis"} is more popular. ${comparison.winner_reason || ""}` },
      },
      {
        "@type": "Question",
        name: `When should I use ${comparison.emoji1_character} vs ${comparison.emoji2_character}?`,
        acceptedAnswer: { "@type": "Answer", text: comparison.when_to_use || "Choose based on the context and tone you want to convey." },
      },
    ],
  };
}

export function generateComboMeta(combo: ComboDocument) {
  const year = new Date().getFullYear();
  const previewEmojis = combo.combos[0]?.emojis.join("") || "";
  return {
    title: `${combo.theme} Emoji Combos — Copy & Paste ${previewEmojis} [${year}]`,
    description: combo.seo_description || `Best ${combo.theme.toLowerCase()} emoji combinations for Instagram, TikTok, and WhatsApp. Copy and paste ready.`,
    canonical: `${SITE_URL}/combo/${combo.slug}`,
  };
}

export function generateCultureMeta(region: CultureRegion) {
  const year = new Date().getFullYear();
  const info = CULTURE_INFO[region];
  return {
    title: `Emoji Meanings in ${info.label} — Cultural Guide [${year}]`,
    description: `How emojis are used in ${info.label}. Cultural meanings, local interpretations, and usage context.`.slice(0, 155),
    canonical: `${SITE_URL}/culture/${region}`,
  };
}

export function generateCultureBreadcrumb(region: CultureRegion) {
  const info = CULTURE_INFO[region];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Cultures", item: `${SITE_URL}/culture` },
      { "@type": "ListItem", position: 3, name: info.label, item: `${SITE_URL}/culture/${region}` },
    ],
  };
}
