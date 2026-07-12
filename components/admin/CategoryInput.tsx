"use client";

import { useId, useState } from "react";
import type { BlogCategoryRef } from "@/types/blog";
import { slugify } from "@/lib/slug";

export default function CategoryInput({
  value,
  onChange,
  suggestions,
}: {
  value: BlogCategoryRef[];
  onChange: (next: BlogCategoryRef[]) => void;
  suggestions: string[];
}) {
  const [draft, setDraft] = useState("");
  const listId = useId();

  function addTag(name: string) {
    const trimmed = name.trim();
    if (!trimmed) return;
    const slug = slugify(trimmed);
    if (!value.some((c) => c.slug === slug)) {
      onChange([...value, { name: trimmed, slug }]);
    }
    setDraft("");
  }

  function removeTag(slug: string) {
    onChange(value.filter((c) => c.slug !== slug));
  }

  return (
    <div>
      <label className="fg-label block mb-2">Categories</label>
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {value.map((cat) => (
            <span key={cat.slug} className="fg-chip inline-flex items-center gap-1.5 px-3 py-1.5">
              {cat.name}
              <button
                type="button"
                onClick={() => removeTag(cat.slug)}
                aria-label={`Remove ${cat.name}`}
                className="leading-none opacity-70 hover:opacity-100"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
      <input
        list={listId}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            addTag(draft);
          }
        }}
        placeholder="Add a category and press Enter"
        className="fg-field w-full px-4 py-2.5"
      />
      <datalist id={listId}>
        {suggestions.map((s) => (
          <option key={s} value={s} />
        ))}
      </datalist>
    </div>
  );
}
