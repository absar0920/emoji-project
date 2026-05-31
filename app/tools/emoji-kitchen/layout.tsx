import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Emoji Kitchen — Combine Emojis Into Unique Stickers [2026]",
  description: "Mix any two emojis to create unique hand-crafted stickers from Google's 100,000+ combination library. Best combos, supported apps, hidden features, and troubleshooting.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
