import Link from "next/link";
import { PLATFORM_KEYS, PLATFORM_LABELS, PLATFORM_ICONS, PlatformKey } from "@/types/emoji";

interface PlatformLinksProps {
  emojiSlug: string;
  currentPlatform?: PlatformKey;
  /** "editorial" = Field Guide ruled index. Use only inside .theme-editorial. */
  tone?: "default" | "editorial";
}

export default function PlatformLinks({ emojiSlug, currentPlatform, tone = "default" }: PlatformLinksProps) {
  if (tone === "editorial") {
    return (
      <div className="flex flex-wrap gap-x-6 gap-y-2.5 border-t border-[var(--line)] pt-5">
        {PLATFORM_KEYS.map((platform) => {
          const active = currentPlatform === platform;
          return (
            <Link
              key={platform}
              href={`/${platform}/${emojiSlug}`}
              data-active={active}
              className="fg-navlink"
              style={active ? { color: "var(--accent)", borderBottom: "2px solid var(--accent)", paddingBottom: "2px" } : undefined}
            >
              <span aria-hidden="true">{PLATFORM_ICONS[platform]}</span>
              {PLATFORM_LABELS[platform]}
            </Link>
          );
        })}
      </div>
    );
  }

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {PLATFORM_KEYS.map((platform) => (
        <Link
          key={platform}
          href={`/${platform}/${emojiSlug}`}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
            currentPlatform === platform
              ? "bg-primary text-white"
              : "bg-white dark:bg-slate-800 border border-neutral-200/80 dark:border-slate-700 text-neutral-600 dark:text-slate-300 hover:bg-neutral-100 dark:hover:bg-slate-700"
          }`}
        >
          <span>{PLATFORM_ICONS[platform]}</span>
          <span>{PLATFORM_LABELS[platform]}</span>
        </Link>
      ))}
    </div>
  );
}
