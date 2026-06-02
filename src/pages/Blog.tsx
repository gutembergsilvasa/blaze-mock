import { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "../lib/cn";
import { Seo } from "../components/Seo";
import {
  SECAO_INCIAL,
  useBlog,
  type BlogPostData,
  type FeaturedArticle,
} from "../hooks/useBlog";
import type { SeoMetadata } from "../utils/types";

function FeaturedBanner({ featured }: { featured: FeaturedArticle }) {
  const href = `/article/${featured.slug ?? featured.id}`;
  const TitleTag = (featured.titleTag === "h1" ? "h1" : "h2") as "h1" | "h2";

  return (
    <article
      aria-labelledby="featured-title"
      className="grid overflow-hidden lg:grid-cols-[2fr_3fr]"
    >
      <Link to={href} aria-label={featured.title} className="block">
        {featured.image ? (
          <picture>
            {featured.image_mobile && (
              <source
                media="(max-width: 768px)"
                srcSet={featured.image_mobile}
              />
            )}
            <img
              src={featured.image}
              alt={featured.image_alt ?? ""}
              className="aspect-[16/10] w-full object-cover lg:aspect-auto lg:h-full"
            />
          </picture>
        ) : (
          <div
            aria-hidden="true"
            className="aspect-[16/10] w-full bg-blaze-surface-2 lg:aspect-auto lg:h-full"
          />
        )}
      </Link>

      <div className="flex flex-col justify-center gap-5 p-8 lg:p-12">
        <time
          dateTime={featured.date}
          className="text-xs font-bold uppercase tracking-wider text-blaze-red"
        >
          {featured.date}
        </time>
        <TitleTag
          id="featured-title"
          className="text-3xl font-bold leading-[1.15] text-white lg:text-4xl"
        >
          <Link to={href} className="hover:text-white/90">
            {featured.title}
          </Link>
        </TitleTag>
        <p className="text-sm leading-relaxed text-blaze-muted">
          {featured.description}
        </p>
      </div>
    </article>
  );
}

const ALL = "all" as const;

function Blog() {
  const [active, setActive] = useState<string>(ALL);
  const { data, articles } = useBlog(active === ALL ? undefined : active);

  const postData = data?.data as BlogPostData | undefined;
  const seo = data?.seo as SeoMetadata | undefined;
  console.log({ articles });
  const visible = articles;

  const banner_principal_data = postData?.banner_principal_data ?? "";
  const banner_principal_img = postData?.banner_principal_img?.url ?? "";
  const banner_principal_img_mobile =
    postData?.banner_principal_img?.mobile?.url ?? "";
  const banner_principal_img_alt = postData?.banner_principal_img?.alt ?? "";
  const banner_principal_descricao = postData?.banner_principal_descricao;
  const banner_principal_texto = postData?.banner_principal_texto;
  const tags = data?.tags ?? [];

  const banner: FeaturedArticle = {
    id: data?.id,
    slug: data?.uid ?? SECAO_INCIAL,
    date: banner_principal_data,
    title: banner_principal_texto?.text || "",
    tags,
    image: banner_principal_img,
    image_mobile: banner_principal_img_mobile,
    image_alt: banner_principal_img_alt,
    description: banner_principal_descricao?.text || "",
    titleTag: banner_principal_texto?.semanticTag,
    descriptionTag: banner_principal_descricao?.semanticTag,
  };

  return (
    <div className="space-y-10 pt-4 pb-12">
      <Seo
        seo={seo}
        fallbackTitle="Blog - Blaze"
        fallbackDescription={banner_principal_descricao?.text}
        fallbackImage={banner_principal_img}
      />

      <header>
        <h1 className="text-3xl font-bold text-white">Blog</h1>
      </header>

      {/* Artigo em destaque */}
      <FeaturedBanner featured={banner} />

      {/* Filtros */}
      <nav
        aria-label="Filtrar artigos"
        className="relative border-b border-blaze-border/60"
      >
        <div className="h-20 flex items-stretch gap-3 pb-4">
          <button
            type="button"
            aria-label="Ordenar"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-blaze-border/60 text-white/80 hover:text-white"
          >
            <i className="fa-solid fa-arrow-up-arrow-down" aria-hidden="true" />
          </button>

          <ul
            role="tablist"
            className="flex items-stretch gap-2 text-[11px] font-bold uppercase overflow-y-visible overflow-x-auto"
          >
            <li role="presentation">
              <button
                type="button"
                role="tab"
                aria-selected={active === ALL}
                onClick={() => setActive(ALL)}
                className={cn(
                  "relative flex h-10 items-center whitespace-nowrap rounded-md bg-blaze-surface-2 px-4 transition-colors",
                  active === ALL
                    ? "text-white"
                    : "text-blaze-muted hover:text-white",
                )}
              >
                All Articles
                {active === ALL && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-3 bottom-4.5 h-0.5 bg-blaze-red"
                  />
                )}
              </button>
            </li>

            {tags.map((tag) => {
              const isActive = active === tag;
              return (
                <li key={tag} role="presentation">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActive(tag)}
                    className={cn(
                      "relative flex h-10 items-center whitespace-nowrap rounded-md bg-blaze-surface-2 px-4 transition-colors",
                      isActive
                        ? "text-white"
                        : "text-blaze-muted hover:text-white",
                    )}
                  >
                    {tag}
                    {isActive && (
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-3 -bottom-[18px] h-0.5 bg-blaze-red"
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          <button
            type="button"
            aria-label="Mais filtros"
            className="ml-auto grid h-10 w-10 shrink-0 place-items-center text-white/70 hover:text-white"
          >
            <i className="fa-solid fa-chevron-right" aria-hidden="true" />
          </button>
        </div>
      </nav>

      {/* Grid de artigos */}
      <section
        aria-label="Lista de artigos"
        aria-live="polite"
        className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3"
      >
        {visible.length === 0 && (
          <p className="col-span-full text-sm text-blaze-muted">
            Nenhum artigo nesta categoria.
          </p>
        )}

        {visible.map((a) => {
          const aData = a.data as BlogPostData | undefined;
          const aTitle = aData?.banner_principal_texto?.text ?? "";
          const aImage = aData?.banner_principal_img?.url;
          const aImageMobile = aData?.banner_principal_img?.mobile?.url ?? "";
          const aImageAlt = aData?.banner_principal_img?.alt ?? "";
          const aDate = aData?.banner_principal_data ?? "";
          const aSlug = a.uid;
          const aTags = a.tags ?? [];
          const aHref = `/article/${aSlug}`;

          return (
            <article key={a.id} className="flex flex-col gap-3">
              <Link to={aHref} className="block overflow-hidden rounded-lg">
                {aImage ? (
                  <picture>
                    {aImageMobile && (
                      <source
                        media="(max-width: 768px)"
                        srcSet={aImageMobile}
                      />
                    )}
                    <img
                      src={aImage}
                      alt={aImageAlt}
                      className="aspect-[16/10] w-full object-cover"
                    />
                  </picture>
                ) : (
                  <div
                    aria-hidden="true"
                    className="aspect-[16/10] w-full bg-blaze-surface-2"
                  />
                )}
              </Link>
              <time
                dateTime={aDate}
                className="text-xs font-bold uppercase tracking-wider text-blaze-red"
              >
                {aDate}
              </time>
              <h3 className="text-lg font-bold leading-tight text-white min-h-[67px]">
                <Link to={aHref} className="hover:text-white/90">
                  {aTitle}
                </Link>
              </h3>
              {aTags.length > 0 && (
                <ul
                  aria-label="Tags"
                  className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs font-semibold text-blaze-red"
                >
                  {aTags.map((tag) => (
                    <li key={tag}>
                      <a href={`#tag-${tag}`} className="hover:underline">
                        #{tag}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          );
        })}
      </section>
    </div>
  );
}

export default Blog;
