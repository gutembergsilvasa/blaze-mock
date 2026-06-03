import { EditorContent, useEditor, type Content } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import { TextStyleKit } from "@tiptap/extension-text-style";
import { Markdown } from "@tiptap/markdown";

type Props = {
  /** Conteúdo: string markdown ou um doc JSON do tiptap (`{ type: "doc", ... }`). */
  content: unknown;
  /**
   * Força o tipo de conteúdo. Quando omitido, auto-detecta:
   * `string` → markdown, objeto → json.
   */
  contentType?: "markdown" | "json";
};

const PROSE_CLASS =
  "prose prose-invert max-w-none text-sm leading-relaxed text-blaze-muted";

/**
 * Renderiza conteúdo de rich text (somente leitura) usando o tiptap.
 * Aceita tanto markdown quanto um doc JSON do tiptap.
 */
export function RichText({ content, contentType }: Props) {
  const isMarkdown = contentType
    ? contentType === "markdown"
    : typeof content === "string";

  const editor = useEditor(
    {
      editable: false,
      extensions: [StarterKit, Link, Markdown, TextStyleKit],
      editorProps: {
        attributes: { class: PROSE_CLASS },
      },
      content: content as Content,
      ...(isMarkdown ? { contentType: "markdown" as const } : {}),
    },
    [content, contentType],
  );

  if (!editor) return null;

  return <EditorContent editor={editor} />;
}
