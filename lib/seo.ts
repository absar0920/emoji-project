import { EmojiDocument } from "@/types/emoji";

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
      answer: emoji.official_meaning.description,
    },
    {
      question: `What does ${emoji.character} mean on TikTok?`,
      answer: emoji.tiktok.meaning,
    },
    {
      question: `What does ${emoji.character} mean on WhatsApp?`,
      answer: emoji.whatsapp.chat_meaning,
    },
    {
      question: `What does ${emoji.character} mean in Gen-Z slang?`,
      answer: emoji.genz_meaning.interpretation,
    },
    {
      question: `Is the ${emoji.character} emoji safe to use?`,
      answer: emoji.safety.safe_meaning,
    },
    {
      question: `What does ${emoji.character} mean in texting?`,
      answer: emoji.emotional_meaning.psychology_note,
    },
    {
      question: `What is the shortcode for ${emoji.character}?`,
      answer: `The shortcode for ${emoji.name} is ${emoji.shortcode}`,
    },
    {
      question: `What does ${emoji.character} mean in dating?`,
      answer: emoji.dating_meaning.flirt_usage,
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
