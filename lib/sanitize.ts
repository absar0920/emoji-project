// lib/sanitize.ts
import "server-only";
import DOMPurify from "isomorphic-dompurify";

const ALLOWED_TAGS = [
  "p", "br", "hr", "h2", "h3", "h4", "strong", "em", "u", "s", "a",
  "ul", "ol", "li", "blockquote", "code", "pre", "img", "figure", "figcaption",
  "table", "thead", "tbody", "tr", "th", "td", "span", "div", "label", "input",
];
const ALLOWED_ATTR = ["href", "src", "alt", "title", "class", "target", "rel", "colspan", "rowspan", "data-type", "data-checked", "type", "checked", "disabled"];

// TipTap task-list checkboxes (<input type="checkbox">) must render as read-only
// on published posts — readers shouldn't be able to toggle them. Force `disabled`
// on every surviving <input>, regardless of what the source HTML set. Registered
// once at module load so it applies to every sanitizeHtml() call without being
// re-added per invocation.
DOMPurify.addHook("afterSanitizeAttributes", (node) => {
  if (node.nodeName === "INPUT") {
    node.setAttribute("disabled", "");
  }
});

export function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
    ALLOWED_URI_REGEXP: /^(https?:|mailto:|\/)/i, // block javascript:
    // DOMPurify checks any non-empty attribute value against ALLOWED_URI_REGEXP
    // unless the attribute name is URI-safe-listed (see DEFAULT_URI_SAFE_ATTRIBUTES
    // in dompurify's source). "checkbox" would otherwise fail that URI check and
    // get silently stripped, leaving <input> with no `type`.
    ADD_URI_SAFE_ATTR: ["type"],
  });
}
