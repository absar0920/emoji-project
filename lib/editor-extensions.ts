// lib/editor-extensions.ts
//
// Framework-agnostic TipTap extension array (`@tiptap/core` nodes/marks only —
// no React-specific extensions like Placeholder/CharacterCount here). This is
// shared by BOTH the client-side editor and server-side `generateHTML`
// (see lib/blog-html.ts), so nothing in this file may depend on the DOM or
// React at module-eval time.
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { CodeBlockLowlight } from "@tiptap/extension-code-block-lowlight";
import { Table, TableRow, TableHeader, TableCell } from "@tiptap/extension-table";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import { createLowlight, common } from "lowlight";

const lowlight = createLowlight(common);

export const editorExtensions = [
  // StarterKit v3 already bundles `link` and `underline` (and `horizontalRule`,
  // `blockquote`, lists, etc.) — configure them here instead of adding the
  // standalone @tiptap/extension-link / @tiptap/extension-underline packages,
  // which would register the same node/mark name twice and throw a
  // duplicate-extension error.
  StarterKit.configure({
    codeBlock: false, // replaced by CodeBlockLowlight below
    heading: { levels: [2, 3, 4] },
    link: {
      openOnClick: false,
      autolink: true,
      HTMLAttributes: { rel: "noopener noreferrer" },
    },
  }),
  Image.configure({ HTMLAttributes: { class: "fg-article__img" } }),
  CodeBlockLowlight.configure({ lowlight }),
  Table.configure({ resizable: false }),
  TableRow,
  TableHeader,
  TableCell,
  TaskList,
  TaskItem.configure({ nested: true }),
];
