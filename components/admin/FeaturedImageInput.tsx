"use client";

import { useRef, useState } from "react";

export default function FeaturedImageInput({
  value,
  alt,
  onChange,
}: {
  value: string | null;
  alt: string;
  onChange: (url: string | null, alt: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File) {
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
      onChange(data.url, alt);
    } catch {
      setError("Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <label className="fg-label block mb-2">Featured image</label>

      {value && (
        <div className="mb-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt={alt} className="border border-[var(--line)] max-w-full h-auto mb-3" />
          <input
            value={alt}
            onChange={(e) => onChange(value, e.target.value)}
            placeholder="Alt text"
            className="fg-field w-full px-4 py-2.5"
          />
        </div>
      )}

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="fg-btn fg-btn-ghost px-4 py-2"
        >
          {uploading ? "Uploading…" : value ? "Replace image" : "Upload image"}
        </button>
        {value && (
          <button
            type="button"
            onClick={() => onChange(null, "")}
            disabled={uploading}
            className="fg-btn fg-btn-ghost px-4 py-2"
          >
            Remove
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          e.target.value = "";
          if (file) handleFile(file);
        }}
      />

      {error && <p className="fg-alert px-3 py-2 mt-3">{error}</p>}
    </div>
  );
}
