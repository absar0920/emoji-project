import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Emoji Kitchen — Combine Emojis Into New Designs [2026]",
  description: "Mix and match emojis to create unique combinations. Powered by Google Emoji Kitchen data.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
