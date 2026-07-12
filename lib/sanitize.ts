// lib/sanitize.ts
import "server-only";
import sanitizeHtmlLib from "sanitize-html";

// Server-side HTML sanitizer for published blog posts.
//
// This deliberately does NOT use DOMPurify/jsdom. DOMPurify is a browser
// library; running it under Node requires a DOM shim (jsdom), and jsdom@29 is
// ESM-only via `@exodus/bytes`. Next externalizes `jsdom` by default, so in
// production it gets `require()`d at runtime and throws `ERR_REQUIRE_ESM`,
// crashing every route that imports this module (see the /blog outage).
// `sanitize-html` is a pure-JS, htmlparser2-based sanitizer with no DOM
// dependency, so it bundles cleanly into the serverless runtime.

const ALLOWED_TAGS = [
  "p", "br", "hr", "h2", "h3", "h4", "strong", "em", "u", "s", "a",
  "ul", "ol", "li", "blockquote", "code", "pre", "img", "figure", "figcaption",
  "table", "thead", "tbody", "tr", "th", "td", "span", "div", "label", "input",
];

// Applied to every tag (DOMPurify's ALLOWED_ATTR was a flat, tag-agnostic list).
// `href`/`src` are additionally scheme-checked below; unknown attributes and any
// event handlers (on*) are dropped.
const ALLOWED_ATTR = [
  "href", "src", "alt", "title", "class", "target", "rel", "colspan", "rowspan",
  "data-type", "data-checked", "type", "checked", "disabled",
];

export function sanitizeHtml(html: string): string {
  return sanitizeHtmlLib(html, {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: { "*": ALLOWED_ATTR },
    // Only these URL schemes survive on href/src; `javascript:`, `data:`, etc.
    // are stripped. Protocol-relative URLs (`//evil.com`) are also rejected,
    // while root-relative (`/path`) and fragment/query URLs pass.
    allowedSchemes: ["http", "https", "mailto"],
    allowProtocolRelative: false,
    // Drop <script>/<style> tags *and their text content* (default nonTextTags),
    // matching DOMPurify's removal of executable content.
    transformTags: {
      // TipTap task-list checkboxes must render read-only on published posts —
      // force `disabled` on every surviving <input>, regardless of source HTML.
      input: (tagName, attribs) => ({
        tagName,
        attribs: { ...attribs, disabled: "" },
      }),
      // Tab-nabbing hardening: any link opening a new tab gets noopener/noreferrer.
      a: (tagName, attribs) => {
        if (attribs.target) {
          attribs.rel = "noopener noreferrer";
        }
        return { tagName, attribs };
      },
    },
  });
}
