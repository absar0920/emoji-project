import Fuse, { IFuseOptions } from "fuse.js";
import { EmojiSearchItem } from "@/types/emoji";

const fuseOptions: IFuseOptions<EmojiSearchItem> = {
  keys: [
    { name: "name", weight: 1.0 },
    { name: "tags", weight: 0.8 },
    { name: "genz_summary", weight: 0.7 },
    { name: "shortcode", weight: 0.6 },
    { name: "category", weight: 0.5 },
  ],
  threshold: 0.4,
  includeScore: true,
  minMatchCharLength: 2,
};

export function createSearchIndex(items: EmojiSearchItem[]): Fuse<EmojiSearchItem> {
  return new Fuse(items, fuseOptions);
}

export function searchEmojis(fuse: Fuse<EmojiSearchItem>, query: string, limit: number = 20): EmojiSearchItem[] {
  if (!query.trim()) return [];
  const results = fuse.search(query, { limit });
  return results.map((r) => r.item);
}
