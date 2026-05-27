import Link from "next/link";
import { PLATFORM_KEYS, PLATFORM_LABELS, PLATFORM_ICONS, PlatformKey } from "@/types/emoji";

interface PlatformLinksProps {
  emojiSlug: string;
  currentPlatform?: PlatformKey;
}

export default function PlatformLinks({ emojiSlug, currentPlatform }: PlatformLinksProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {PLATFORM_KEYS.map((platform) => (
        <Link
          key={platform}
          href={`/${platform}/${emojiSlug}`}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
            currentPlatform === platform
              ? "bg-primary text-white"
              : "bg-white dark:bg-slate-800 border border-neutral-200 dark:border-slate-700 text-neutral-600 dark:text-slate-300 hover:bg-neutral-50 dark:hover:bg-slate-700"
          }`}
        >
          <span>{PLATFORM_ICONS[platform]}</span>
          <span>{PLATFORM_LABELS[platform]}</span>
        </Link>
      ))}
    </div>
  );
}
