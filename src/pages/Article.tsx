import { useParams } from "react-router-dom";
import { EditorContent, type Content } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import { TextStyleKit } from "@tiptap/extension-text-style";

import { useArticle } from "../hooks/useArticle";
import { Seo } from "../components/Seo";
import { Table } from "../components/Table";

import { Editor } from "@tiptap/core";
import { Markdown } from "@tiptap/markdown";

function RenderTiptapContent({ content }: { content: Content }) {
  const editor = new Editor({
    editable: false,
    extensions: [StarterKit, Link, Markdown, TextStyleKit],
    editorProps: {
      attributes: {
        class:
          "prose prose-invert max-w-none text-sm leading-relaxed text-blaze-muted",
      },
    },
    content,
    contentType: "markdown",
  });

  return <EditorContent editor={editor} />;
}

const fallback = {
  title:
    "Final da Liga Europa 2025/26: Veja que é o Favorito entre Freiburg e Aston Villa e Onde Assistir!",
  date: "2026-05-20",
  shareUrls: {
    twitter: "#share-twitter",
    facebook: "#share-facebook",
  },
};

function Article() {
  const { slug } = useParams<{ slug: string }>();
  const { data, seo } = useArticle(slug);

  const title = data?.article_title.text ?? fallback.title;
  const date = data?.article_date ?? fallback.date;
  const banner = data?.article_banner?.url;
  const bannerMobile = data?.article_banner?.mobile?.url;
  const bannerAlt = data?.article_banner?.alt ?? "";
  const shareUrls = fallback.shareUrls;
  const content = data?.article_main_content;
  const table = data?.table;

  return (
    <article className="mx-auto max-w-3xl px-4 py-8">
      <Seo
        seo={seo}
        fallbackTitle={data?.article_title.text}
        fallbackImage={banner}
        url={typeof window !== "undefined" ? window.location.href : undefined}
      />

      <header className="text-center">
        <h1 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
          {title}
        </h1>

        <time
          dateTime={date}
          className="mt-6 inline-block text-xs font-bold uppercase tracking-wider text-blaze-red"
        >
          {date}
        </time>

        <div
          aria-label="Compartilhar"
          className="mt-4 flex items-center justify-center gap-3"
        >
          {shareUrls?.twitter && (
            <a
              href={shareUrls.twitter}
              aria-label="Compartilhar no Twitter"
              className="grid h-8 w-8 place-items-center rounded-full border border-blaze-border text-xs text-white/80 hover:bg-white/5 hover:text-white"
            >
              <i className="fa-brands fa-twitter" aria-hidden="true" />
            </a>
          )}
          {shareUrls?.facebook && (
            <a
              href={shareUrls.facebook}
              aria-label="Compartilhar no Facebook"
              className="grid h-8 w-8 place-items-center rounded-full border border-blaze-border text-xs text-white/80 hover:bg-white/5 hover:text-white"
            >
              <i className="fa-brands fa-facebook-f" aria-hidden="true" />
            </a>
          )}
        </div>
      </header>

      {banner ? (
        <figure className="mt-8">
          <picture>
            {bannerMobile && (
              <source media="(max-width: 768px)" srcSet={bannerMobile} />
            )}
            <img
              src={banner}
              alt={bannerAlt}
              className="aspect-[16/9] w-full overflow-hidden rounded-lg bg-blaze-surface-2"
            />
          </picture>
        </figure>
      ) : null}

      {content ? (
        <div className="mx-auto mt-8 max-w-2xl">
          <RenderTiptapContent content={content as Content} />
        </div>
      ) : null}

      {table ? (
        <div className="mx-auto mt-4 max-w-2xl">
          <Table table={table} />
        </div>
      ) : null}
    </article>
  );
}

export default Article;
