import EmojiCard from "./EmojiCard";
import { EmojiDocument } from "@/types/emoji";

interface RelatedEmojisProps {
  emojis: Pick<EmojiDocument, "character" | "name" | "slug">[];
  title?: string;
}

export default function RelatedEmojis({ emojis, title = "Related Emojis" }: RelatedEmojisProps) {
  if (emojis.length === 0) return null;
  return (
    <div>
      <h2 className="text-lg font-bold text-primary-dark mb-4">{title}</h2>
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {emojis.map((emoji) => (
          <div key={emoji.slug} className="flex-shrink-0">
            <EmojiCard character={emoji.character} name={emoji.name} slug={emoji.slug} />
          </div>
        ))}
      </div>
    </div>
  );
}
