/* eslint-disable react-hooks/set-state-in-effect */
import { useCallback, useEffect, useState } from "react";
import {
  getCmsCollection,
  type CmsResponse,
  type CmsResult,
} from "../services/api";

export type CategoryId =
  | "all"
  | "esportes"
  | "esports"
  | "cassino-online"
  | "enciclopedia"
  | "curadoria"
  | "leituras-essenciais";

export type Category = {
  id: CategoryId;
  label: string;
  count?: number;
};

export type BlogArticle = {
  id: string;
  slug?: string;
  date: string;
  dateLabel: string;
  title: string;
  category: Exclude<CategoryId, "all">;
  tags?: string[];
  image?: string;
};

export type FeaturedArticle = BlogArticle & {
  description: string;
};

export type BlogData = {
  featured: FeaturedArticle | null;
  categories: Category[];
  articles: BlogArticle[];
};

export type UseBlogResult = {
  data: BlogData | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
};

export type BlogPostData = {
  title?: string;
  description?: string;
  summary?: string;
  image?: string;
  media?: string;
  category?: Exclude<CategoryId, "all">;
};

const MONTHS_PT = [
  "janeiro",
  "fevereiro",
  "março",
  "abril",
  "maio",
  "junho",
  "julho",
  "agosto",
  "setembro",
  "outubro",
  "novembro",
  "dezembro",
];

function formatDateLabel(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return `${date.getFullYear()} ${MONTHS_PT[date.getMonth()]} ${date.getDate()}`;
}

const KNOWN_CATEGORIES: Exclude<CategoryId, "all">[] = [
  "esportes",
  "esports",
  "cassino-online",
  "enciclopedia",
  "curadoria",
  "leituras-essenciais",
];

function resolveCategory(
  item: CmsResult<BlogPostData>,
): Exclude<CategoryId, "all"> {
  if (item.data?.category && KNOWN_CATEGORIES.includes(item.data.category)) {
    return item.data.category;
  }
  const matched = item.tags.find((t) =>
    KNOWN_CATEGORIES.includes(t as Exclude<CategoryId, "all">),
  );
  return (matched as Exclude<CategoryId, "all">) ?? "esportes";
}

function adaptArticle(item: CmsResult<BlogPostData>): BlogArticle {
  return {
    id: item.id,
    slug: item.uid,
    date: item.first_publication_date,
    dateLabel: formatDateLabel(item.first_publication_date),
    title: item.data?.title ?? "(Sem título)",
    category: resolveCategory(item),
    tags: item.tags,
    image: item.data?.image ?? item.data?.media,
  };
}

const DEFAULT_CATEGORIES: Category[] = [
  { id: "all", label: "All Articles" },
  { id: "esportes", label: "Esportes" },
  { id: "esports", label: "Esports" },
  { id: "cassino-online", label: "Cassino Online" },
  { id: "enciclopedia", label: "Enciclopédia das Apostas" },
  { id: "curadoria", label: "Curadoria da Blaze" },
  { id: "leituras-essenciais", label: "Leituras Essenciais" },
];

function adaptToBlogData(response: CmsResponse<BlogPostData>): BlogData {
  const articles = response.results.map(adaptArticle);

  const firstResult = response.results[0];
  const first = articles[0];
  const featured: FeaturedArticle | null =
    first && firstResult
      ? {
          ...first,
          description:
            firstResult.data?.description ?? firstResult.data?.summary ?? "",
        }
      : null;

  const counts = new Map<Exclude<CategoryId, "all">, number>();
  articles.forEach((a) => {
    counts.set(a.category, (counts.get(a.category) ?? 0) + 1);
  });

  const categories: Category[] = DEFAULT_CATEGORIES.map((c) => {
    if (c.id === "all") return c;
    const count = counts.get(c.id as Exclude<CategoryId, "all">);
    return count !== undefined ? { ...c, count } : c;
  });

  return {
    featured,
    categories,
    articles,
  };
}

export function useBlog(): UseBlogResult {
  const [data, setData] = useState<BlogData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchBlog = useCallback(async (signal?: AbortSignal) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getCmsCollection<BlogPostData>("blog", { signal });
      setData(adaptToBlogData(response));
    } catch (err) {
      if (err instanceof Error && err.name === "CanceledError") return;
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetchBlog(controller.signal);
    return () => controller.abort();
  }, [fetchBlog]);

  const refetch = useCallback(() => {
    fetchBlog();
  }, [fetchBlog]);

  return { data, isLoading, error, refetch };
}
