import Link from "next/link";

interface EmojiCardProps {
  character: string;
  name: string;
  slug: string;
  trendScore?: number;
}

export default function EmojiCard({ character, name, slug, trendScore }: EmojiCardProps) {
  return (
    <Link
      href={`/emoji/${slug}`}
      className="flex flex-col items-center gap-1 p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md hover:scale-105 transition-all border border-neutral-100 dark:border-slate-700"
    >
      <span className="text-4xl">{character}</span>
      <span className="text-xs text-neutral-600 dark:text-slate-300 font-medium text-center truncate w-full">{name}</span>
      {trendScore !== undefined && (
        <span className="text-xs px-2 py-0.5 rounded-full bg-amber-50 text-accent-amber font-medium">
          🔥 {trendScore}
        </span>
      )}
    </Link>
  );
}
