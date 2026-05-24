import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Emoji Comparison Tool — Compare Any Two Emojis [2026]",
  description: "Compare emoji meanings side by side. See differences in Gen-Z, TikTok, dating, and meme contexts.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
