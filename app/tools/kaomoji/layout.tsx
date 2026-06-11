import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kaomoji: Complete Guide — Examples, Meanings & How to Type",
  description:
    "Kaomoji are Japanese text emoticons that work on every device. Copy 100+ examples by category, learn the history, and type them on iPhone, Windows, or Mac.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
