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
              : "bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-50"
          }`}
        >
          <span>{PLATFORM_ICONS[platform]}</span>
          <span>{PLATFORM_LABELS[platform]}</span>
        </Link>
      ))}
    </div>
  );
}
