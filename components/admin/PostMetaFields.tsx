"use client";

import type { BlogStatus } from "@/types/blog";

type MetaPatch = Partial<{
  title: string;
  slug: string;
  excerpt: string;
  seoTitle: string;
  seoDescription: string;
  status: BlogStatus;
}>;

export default function PostMetaFields({
  title,
  slug,
  excerpt,
  seoTitle,
  seoDescription,
  status,
  onChange,
}: {
  title: string;
  slug: string;
  excerpt: string;
  seoTitle: string;
  seoDescription: string;
  status: BlogStatus;
  onChange: (patch: MetaPatch) => void;
}) {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <label className="fg-label block mb-2">Title</label>
        <input
          value={title}
          onChange={(e) => onChange({ title: e.target.value })}
          className="fg-field w-full px-4 py-2.5"
        />
      </div>

      <div>
        <label className="fg-label block mb-2">Slug</label>
        <input
          value={slug}
          onChange={(e) => onChange({ slug: e.target.value })}
          className="fg-field w-full px-4 py-2.5"
        />
      </div>

      <div>
        <label className="fg-label block mb-2">Excerpt</label>
        <textarea
          value={excerpt}
          onChange={(e) => onChange({ excerpt: e.target.value })}
          rows={3}
          className="fg-field w-full px-4 py-2.5"
        />
      </div>

      <div>
        <label className="fg-label block mb-2">SEO title</label>
        <input
          value={seoTitle}
          onChange={(e) => onChange({ seoTitle: e.target.value })}
          className="fg-field w-full px-4 py-2.5"
        />
      </div>

      <div>
        <label className="fg-label block mb-2">SEO description</label>
        <textarea
          value={seoDescription}
          onChange={(e) => onChange({ seoDescription: e.target.value })}
          rows={2}
          className="fg-field w-full px-4 py-2.5"
        />
      </div>

      <div>
        <label className="fg-label block mb-2">Status</label>
        <select
          value={status}
          onChange={(e) => onChange({ status: e.target.value as BlogStatus })}
          className="fg-field w-full px-4 py-2.5"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>
    </div>
  );
}
