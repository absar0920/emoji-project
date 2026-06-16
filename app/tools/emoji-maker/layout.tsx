import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Emoji Maker — Create Custom Emoji for Discord, Slack & Twitch [2026]",
  description:
    "Generate custom emoji from a text prompt, then learn how to make, refine, and export custom emoji and stickers for Discord, Slack, Twitch, WhatsApp, and Telegram.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
