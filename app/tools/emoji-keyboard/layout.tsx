import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Emoji Keyboard – Copy & Paste Any Emoji Instantly",
  description:
    "Why scroll endlessly? Our Emoji Keyboard gives you 3700+ emojis, instant copy-paste, and zero downloads. Find your emoji in seconds — free!",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
