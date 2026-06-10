import Link from "next/link";
import { EmojiDocument } from "@/types/emoji";

interface RelatedEmojisProps {
  emojis: Pick<EmojiDocument, "character" | "name" | "slug">[];
}

export default function RelatedEmojis({ emojis }: RelatedEmojisProps) {
  if (emojis.length === 0) return null;
  return (
    <div className="flex gap-7 sm:gap-9 overflow-x-auto scrollbar-hide pb-2 border-y border-[var(--line)] py-6">
      {emojis.map((emoji) => (
        <Link key={emoji.slug} href={`/emoji/${emoji.slug}`} className="fg-specimen fg-link shrink-0 w-20">
          <span className="fg-specimen__g">{emoji.character}</span>
          <span className="fg-specimen__c block text-center leading-tight line-clamp-2">{emoji.name}</span>
        </Link>
      ))}
    </div>
  );
}
