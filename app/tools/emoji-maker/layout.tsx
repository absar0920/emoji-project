import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Emoji Maker — Generate Custom Emojis [2026]",
  description:
    "Create custom AI-generated emojis from text descriptions. Choose Emoji, Cartoon, Pixel Art, or Sticker styles.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
