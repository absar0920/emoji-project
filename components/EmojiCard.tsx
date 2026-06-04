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
      className="flex flex-col items-center gap-1 p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-sm card-lift hover:shadow-md hover:border-primary/40 border border-neutral-200/80 dark:border-slate-700"
    >
      <span className="text-4xl">{character}</span>
      <span className="text-xs text-primary-dark dark:text-white font-medium text-center truncate w-full">{name}</span>
      {trendScore !== undefined && (
        <span className="text-xs px-2 py-0.5 rounded-full border border-neutral-200 dark:border-slate-700 text-accent-amber font-medium">
          🔥 {trendScore}
        </span>
      )}
    </Link>
  );
}
