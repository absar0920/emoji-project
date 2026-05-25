import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Smart Emoji Search — Find Emojis by Meaning & Context [2026]",
  description:
    "AI-powered emoji search. Find emojis by mood, platform, cultural context, or use case. Understands natural language queries.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
