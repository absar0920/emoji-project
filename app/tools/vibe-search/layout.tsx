import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vibe Search — Find Emojis by Feeling [2026]",
  description: "Search emojis by mood, feeling, or vibe. Find the perfect emoji for sad, love, toxic, funny, aesthetic, and more.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
