import { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "../lib/cn";
import {
  useBlog,
  type BlogArticle,
  type Category,
  type CategoryId,
  type FeaturedArticle,
} from "../hooks/useBlog";

const fallbackCategories: Category[] = [
  { id: "all", label: "All Articles" },
  { id: "esportes", label: "Esportes", count: 353 },
  { id: "esports", label: "Esports", count: 58 },
  { id: "cassino-online", label: "Cassino Online", count: 55 },
  { id: "enciclopedia", label: "Enciclopédia das Apostas", count: 43 },
  { id: "curadoria", label: "Curadoria da Blaze", count: 24 },
  { id: "leituras-essenciais", label: "Leituras Essenciais" },
];

const fallbackFeatured: FeaturedArticle = {
  id: "a1",
  date: "2026-05-20",
  dateLabel: "2026 maio 20",
  title:
    "Final da Liga Europa 2025/26: Veja que é o Favorito entre Freiburg e Aston Villa e Onde Assistir!",
  description:
    "Começou a época das finais dos continentais europeus, com a grande decisão da Liga Europa 2025/26 abrindo as últimas semanas da temporada do futebol do Velho Continente!",
  category: "esportes",
};

const fallbackArticles: BlogArticle[] = [
  {
    id: "a1",
    date: "2026-05-20",
    dateLabel: "2026 maio 20",
    title:
      "Final da Liga Europa 2025/26: Veja que é o Favorito entre Freiburg e Aston Villa e Onde Assistir!",
    category: "esportes",
  },
  {
    id: "a2",
    date: "2026-05-19",
    dateLabel: "2026 maio 19",
    title:
      "DreamLeague Season 29: guia completo do torneio de Dota 2, favoritos e onde assistir!",
    category: "esports",
    tags: ["esports"],
  },
  {
    id: "a3",
    date: "2026-05-18",
    dateLabel: "2026 maio 18",
    title: "“Eu tô no jogo”, diz Neymar ao vestir a camisa do Jogo Responsável",
    category: "leituras-essenciais",
    tags: ["jogo responsável", "leituras essenciais"],
  },
  {
    id: "a4",
    date: "2026-05-17",
    dateLabel: "2026 maio 17",
    title:
      "Estratégias de Blackjack para iniciantes: como começar a jogar com segurança",
    category: "cassino-online",
    tags: ["cassino"],
  },
  {
    id: "a5",
    date: "2026-05-16",
    dateLabel: "2026 maio 16",
    title:
      "O que é handicap asiático? Entenda o tipo de aposta mais usado no futebol",
    category: "enciclopedia",
    tags: ["glossário"],
  },
  {
    id: "a6",
    date: "2026-05-15",
    dateLabel: "2026 maio 15",
    title: "Os 5 melhores slots em destaque na Blaze neste mês",
    category: "curadoria",
    tags: ["slots"],
  },
];

function Blog() {
  const { data } = useBlog();

  const featured = data?.featured ?? fallbackFeatured;
  const categories = data?.categories ?? fallbackCategories;
  const articles = data?.articles ?? fallbackArticles;

  const [active, setActive] = useState<CategoryId>("all");

  const visible =
    active === "all" ? articles : articles.filter((a) => a.category === active);

  return (
    <div className="space-y-10 pt-4 pb-12">
      <header>
        <h1 className="text-3xl font-bold text-white">Blog</h1>
      </header>

      {/* Artigo em destaque */}
      <article
        aria-labelledby="featured-title"
        className="grid overflow-hidden rounded-xl bg-blaze-surface lg:grid-cols-[2fr_3fr]"
      >
        <Link
          to={`/article/${featured.slug ?? featured.id}`}
          aria-label={featured.title}
          className="block"
        >
          <div
            aria-hidden="true"
            className="aspect-[16/10] w-full bg-blaze-surface-2 lg:aspect-auto lg:h-full"
          />
        </Link>

        <div className="flex flex-col justify-center gap-5 p-8 lg:p-12">
          <time
            dateTime={featured.date}
            className="text-xs font-bold uppercase tracking-wider text-blaze-red"
          >
            {featured.dateLabel}
          </time>
          <h2
            id="featured-title"
            className="text-3xl font-bold leading-[1.15] text-white lg:text-4xl"
          >
            <Link
              to={`/article/${featured.slug ?? featured.id}`}
              className="hover:text-white/90"
            >
              {featured.title}
            </Link>
          </h2>
          <p className="text-sm leading-relaxed text-blaze-muted">
            {featured.description}
          </p>
        </div>
      </article>

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
            {categories.map((c) => {
              const isActive = active === c.id;
              return (
                <li key={c.id} role="presentation">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActive(c.id)}
                    className={cn(
                      "relative flex h-10 items-center whitespace-nowrap rounded-md bg-blaze-surface-2 px-4 transition-colors",
                      isActive
                        ? "text-white"
                        : "text-blaze-muted hover:text-white",
                    )}
                  >
                    {c.label}
                    {c.count !== undefined && (
                      <span className="ml-1 opacity-70">({c.count})</span>
                    )}
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

        {visible.map((a) => (
          <article key={a.id} className="flex flex-col gap-3">
            <Link
              to={`/article/${a.slug ?? a.id}`}
              className="block overflow-hidden rounded-lg"
            >
              <div
                aria-hidden="true"
                className="aspect-[16/10] w-full bg-blaze-surface-2"
              />
            </Link>
            <time
              dateTime={a.date}
              className="text-xs font-bold uppercase tracking-wider text-blaze-red"
            >
              {a.dateLabel}
            </time>
            <h3 className="text-lg font-bold leading-tight text-white">
              <Link
                to={`/article/${a.slug ?? a.id}`}
                className="hover:text-white/90"
              >
                {a.title}
              </Link>
            </h3>
            {a.tags && a.tags.length > 0 && (
              <ul
                aria-label="Tags"
                className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs font-semibold text-blaze-red"
              >
                {a.tags.map((tag) => (
                  <li key={tag}>
                    <a href={`#tag-${tag}`} className="hover:underline">
                      #{tag}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </section>
    </div>
  );
}

export default Blog;
