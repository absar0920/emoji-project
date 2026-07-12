"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useEditor, EditorContent, type Content } from "@tiptap/react";
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from "@tiptap/extension-character-count";
import { editorExtensions } from "@/lib/editor-extensions";
import { slugify } from "@/lib/slug";
import { savePost } from "@/app/admin/posts/actions";
import PostMetaFields from "@/components/admin/PostMetaFields";
import CategoryInput from "@/components/admin/CategoryInput";
import FeaturedImageInput from "@/components/admin/FeaturedImageInput";
import EditorToolbar from "@/components/admin/EditorToolbar";
import type { BlogCategoryRef, BlogPost, BlogPostInput, BlogStatus } from "@/types/blog";

const AUTOSAVE_DELAY_MS = 1500;

type MetaPatch = Partial<{
  title: string;
  slug: string;
  excerpt: string;
  seoTitle: string;
  seoDescription: string;
  status: BlogStatus;
}>;

function formatSavedAt(date: Date): string {
  return `Saved · ${date.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })}`;
}

export default function BlogEditor({ initial, suggestions }: { initial?: BlogPost; suggestions: string[] }) {
  const [id, setId] = useState<string | undefined>(initial?.id);
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [title, setTitle] = useState(initial?.title ?? "");
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
  const [seoTitle, setSeoTitle] = useState(initial?.seo_title ?? "");
  const [seoDescription, setSeoDescription] = useState(initial?.seo_description ?? "");
  const [status, setStatus] = useState<BlogStatus>(initial?.status ?? "draft");
  const [categories, setCategories] = useState<BlogCategoryRef[]>(initial?.categories ?? []);
  const [featuredImage, setFeaturedImage] = useState<string | null>(initial?.featured_image ?? null);
  const [featuredImageAlt, setFeaturedImageAlt] = useState(initial?.featured_image_alt ?? "");

  // Once the user hand-edits the slug field, stop deriving it from the title.
  const slugTouchedRef = useRef(Boolean(initial?.slug));
  // Bumped by the editor's onUpdate so the autosave effect notices content edits
  // (TipTap content changes don't otherwise trigger a React re-render/dep change).
  const [contentTick, setContentTick] = useState(0);

  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const savingRef = useRef(false);

  const editor = useEditor({
    extensions: [
      ...editorExtensions,
      Placeholder.configure({ placeholder: "Tell the story…" }),
      CharacterCount,
    ],
    content: (initial?.content_json as Content | undefined) ?? "",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "fg-article focus:outline-none min-h-[420px]",
      },
    },
    onUpdate: () => setContentTick((n) => n + 1),
  });

  useEffect(() => {
    if (!slugTouchedRef.current) {
      setSlug(slugify(title || "post"));
    }
  }, [title]);

  function handleMetaChange(patch: MetaPatch) {
    if (patch.title !== undefined) setTitle(patch.title);
    if (patch.slug !== undefined) {
      slugTouchedRef.current = true;
      setSlug(patch.slug);
    }
    if (patch.excerpt !== undefined) setExcerpt(patch.excerpt);
    if (patch.seoTitle !== undefined) setSeoTitle(patch.seoTitle);
    if (patch.seoDescription !== undefined) setSeoDescription(patch.seoDescription);
    if (patch.status !== undefined) setStatus(patch.status);
  }

  const buildInput = useCallback(
    (explicitStatus: BlogStatus): BlogPostInput & { id?: string } => ({
      ...(id ? { id } : {}),
      title,
      slug: slug || slugify(title || "post"),
      excerpt,
      content_json: editor?.getJSON() ?? (initial?.content_json ?? {}),
      status: explicitStatus,
      featured_image: featuredImage,
      featured_image_alt: featuredImageAlt,
      categories,
      seo_title: seoTitle,
      seo_description: seoDescription,
    }),
    [id, title, slug, excerpt, featuredImage, featuredImageAlt, categories, seoTitle, seoDescription, editor, initial]
  );

  const runSave = useCallback(
    async (explicitStatus: BlogStatus) => {
      if (savingRef.current) return;
      savingRef.current = true;
      setSaving(true);
      setSaveError(null);
      try {
        const input = buildInput(explicitStatus);
        const result = await savePost(input);
        setId(result.id);
        setSlug(result.slug);
        slugTouchedRef.current = true;
        setStatus(explicitStatus);
        setSavedAt(new Date());
      } catch (err) {
        setSaveError(err instanceof Error ? err.message : "Save failed");
      } finally {
        savingRef.current = false;
        setSaving(false);
      }
    },
    [buildInput]
  );

  // Autosave: only once the post already has an id (i.e. a manual save has
  // happened) and there's a title to save. Never autosaves a brand-new,
  // untitled post.
  useEffect(() => {
    if (!editor || !id || !title.trim()) return;
    const timer = setTimeout(() => {
      void runSave("draft");
    }, AUTOSAVE_DELAY_MS);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    editor,
    id,
    title,
    slug,
    excerpt,
    seoTitle,
    seoDescription,
    categories,
    featuredImage,
    featuredImageAlt,
    contentTick,
  ]);

  const characterCount = editor?.storage.characterCount;

  const previewHref = id && slug ? `/blog/${slug}?preview=1` : null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 items-start">
      <div>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => void runSave("draft")}
              disabled={saving || !title.trim()}
              className="fg-btn fg-btn-ghost px-5 py-2.5"
            >
              {saving ? "Saving…" : "Save draft"}
            </button>
            <button
              type="button"
              onClick={() => void runSave("published")}
              disabled={saving || !title.trim()}
              className="fg-btn px-5 py-2.5"
            >
              Publish
            </button>
            {previewHref ? (
              <a
                href={previewHref}
                target="_blank"
                rel="noopener noreferrer"
                className="fg-btn fg-btn-ghost px-5 py-2.5"
              >
                Preview →
              </a>
            ) : (
              <span
                aria-disabled="true"
                className="fg-btn fg-btn-ghost px-5 py-2.5 opacity-40 cursor-not-allowed"
              >
                Preview →
              </span>
            )}
          </div>
          <p className="mono text-[0.72rem] uppercase tracking-[0.14em] t-muted">
            {saveError ? <span className="t-accent">{saveError}</span> : savedAt ? formatSavedAt(savedAt) : "Not saved yet"}
          </p>
        </div>

        <EditorToolbar editor={editor} />
        <div className="fg-field px-4 py-3">
          <EditorContent editor={editor} />
        </div>
        {characterCount && (
          <p className="mono text-[0.68rem] uppercase tracking-[0.14em] t-muted mt-2">
            {characterCount.words()} words · {characterCount.characters()} characters
          </p>
        )}
      </div>

      <aside className="flex flex-col gap-8">
        <PostMetaFields
          title={title}
          slug={slug}
          excerpt={excerpt}
          seoTitle={seoTitle}
          seoDescription={seoDescription}
          status={status}
          onChange={handleMetaChange}
        />
        <CategoryInput value={categories} onChange={setCategories} suggestions={suggestions} />
        <FeaturedImageInput
          value={featuredImage}
          alt={featuredImageAlt}
          onChange={(url, alt) => {
            setFeaturedImage(url);
            setFeaturedImageAlt(alt);
          }}
        />
      </aside>
    </div>
  );
}
