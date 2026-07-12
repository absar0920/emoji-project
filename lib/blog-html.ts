// lib/blog-html.ts
import "server-only";
import type { JSONContent } from "@tiptap/core";
// `@tiptap/core`'s own `generateHTML` needs a global `document`/`window`
// (browser only) — it throws `ReferenceError: window is not defined` under
// Next.js's Node.js server runtime. `@tiptap/html/server` wraps the same
// serialization with a `happy-dom` document, which is what actually works
// here.
import { generateHTML } from "@tiptap/html/server";
import { editorExtensions } from "./editor-extensions";
import { sanitizeHtml } from "./sanitize";

export function jsonToSanitizedHtml(json: unknown): string {
  const html = generateHTML(json as JSONContent, editorExtensions);
  return sanitizeHtml(html);
}

/** ~200 wpm over the plain text of the doc. */
export function estimateReadingTime(json: unknown): number {
  const text = collectText(json as JSONContent);
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function collectText(node: JSONContent | undefined): string {
  if (!node) return "";
  let out = node.text ?? "";
  for (const child of node.content ?? []) out += " " + collectText(child);
  return out;
}
