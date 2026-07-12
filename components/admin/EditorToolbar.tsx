"use client";

import { useRef, useState } from "react";
import type { Editor } from "@tiptap/react";

export default function EditorToolbar({ editor }: { editor: Editor | null }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleImageFile(file: File) {
    if (!editor) return;
    setUploading(true);
    setError(null);
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok) {
        setError(typeof data.error === "string" ? data.error : "Upload failed");
        return;
      }
      editor.chain().focus().setImage({ src: data.url }).run();
    } catch {
      setError("Upload failed");
    } finally {
      setUploading(false);
    }
  }

  if (!editor) return null;

  function promptForLink() {
    if (!editor) return;
    const previous = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Link URL", previous ?? "https://");
    if (url === null) return;
    if (url.trim() === "") {
      editor.chain().focus().unsetLink().run();
      return;
    }
    editor.chain().focus().setLink({ href: url.trim() }).run();
  }

  return (
    <div className="flex flex-wrap items-center gap-2 border border-[var(--line)] p-2.5 mb-4">
      <button
        type="button"
        data-active={editor.isActive("bold")}
        onClick={() => editor.chain().focus().toggleBold().run()}
        className="fg-chip px-3 py-1.5"
      >
        Bold
      </button>
      <button
        type="button"
        data-active={editor.isActive("italic")}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className="fg-chip px-3 py-1.5"
      >
        Italic
      </button>
      <button
        type="button"
        data-active={editor.isActive("underline")}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className="fg-chip px-3 py-1.5"
      >
        Underline
      </button>
      <button
        type="button"
        data-active={editor.isActive("strike")}
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className="fg-chip px-3 py-1.5"
      >
        Strike
      </button>

      <span className="w-px h-5 bg-[var(--line)] mx-1" aria-hidden="true" />

      <button
        type="button"
        data-active={editor.isActive("heading", { level: 2 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className="fg-chip px-3 py-1.5"
      >
        H2
      </button>
      <button
        type="button"
        data-active={editor.isActive("heading", { level: 3 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className="fg-chip px-3 py-1.5"
      >
        H3
      </button>
      <button
        type="button"
        data-active={editor.isActive("heading", { level: 4 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className="fg-chip px-3 py-1.5"
      >
        H4
      </button>

      <span className="w-px h-5 bg-[var(--line)] mx-1" aria-hidden="true" />

      <button
        type="button"
        data-active={editor.isActive("bulletList")}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className="fg-chip px-3 py-1.5"
      >
        Bullet list
      </button>
      <button
        type="button"
        data-active={editor.isActive("orderedList")}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className="fg-chip px-3 py-1.5"
      >
        Numbered list
      </button>
      <button
        type="button"
        data-active={editor.isActive("blockquote")}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className="fg-chip px-3 py-1.5"
      >
        Quote
      </button>
      <button
        type="button"
        data-active={editor.isActive("codeBlock")}
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className="fg-chip px-3 py-1.5"
      >
        Code
      </button>

      <span className="w-px h-5 bg-[var(--line)] mx-1" aria-hidden="true" />

      <button
        type="button"
        data-active={editor.isActive("link")}
        onClick={promptForLink}
        className="fg-chip px-3 py-1.5"
      >
        Link
      </button>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="fg-chip px-3 py-1.5"
      >
        {uploading ? "Uploading…" : "Image"}
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        className="fg-chip px-3 py-1.5"
      >
        Divider
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
        className="fg-chip px-3 py-1.5"
      >
        Table
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          e.target.value = "";
          if (file) handleImageFile(file);
        }}
      />

      {error && <span className="fg-alert px-2 py-1 text-xs">{error}</span>}
    </div>
  );
}
