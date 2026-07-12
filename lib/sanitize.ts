// lib/sanitize.ts
import "server-only";
import DOMPurify from "isomorphic-dompurify";

const ALLOWED_TAGS = [
  "p", "br", "hr", "h2", "h3", "h4", "strong", "em", "u", "s", "a",
  "ul", "ol", "li", "blockquote", "code", "pre", "img", "figure", "figcaption",
  "table", "thead", "tbody", "tr", "th", "td", "span", "div",
];
const ALLOWED_ATTR = ["href", "src", "alt", "title", "class", "target", "rel", "colspan", "rowspan", "data-type", "data-checked"];

export function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
    ALLOWED_URI_REGEXP: /^(https?:|mailto:|\/)/i, // block javascript:
  });
}
