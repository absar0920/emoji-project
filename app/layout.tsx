import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Libre_Bodoni, Public_Sans, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-jb",
});

// Editorial / Magazine type — Libre Bodoni display + Public Sans body (homepage theme)
const libreBodoni = Libre_Bodoni({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-bodoni",
});

const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public",
});

// Field-guide reading serif (homepage body)
const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-source-serif",
});

export const metadata: Metadata = {
  title: {
    default: "Emoji Intelligence — Every Emoji. Every Meaning.",
    template: "%s | Emoji Intelligence",
  },
  description:
    "Discover what every emoji really means. Gen-Z slang, TikTok meanings, cultural intelligence, and platform-specific usage for 1000+ emojis.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${jetbrainsMono.variable} ${libreBodoni.variable} ${publicSans.variable} ${sourceSerif.variable}`}>
      <body className="font-sans antialiased bg-[#f7f2e9] dark:bg-[#100e0c] text-neutral-700 dark:text-slate-300">
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('theme');if(t==='dark'){document.documentElement.classList.add('dark')}var s=localStorage.getItem('sidebar-collapsed');document.documentElement.dataset.sidebar=s==='1'?'collapsed':'expanded';})();`,
          }}
        />
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
