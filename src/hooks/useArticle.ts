/* eslint-disable react-hooks/set-state-in-effect */
import { useCallback, useEffect, useState } from "react";
import {
  getCmsCollection,
  type CmsResponse,
  type CmsResult,
} from "../services/api";

export type ContentBlock =
  | { type: "paragraph"; html: string }
  | { type: "heading"; level: 2 | 3; text: string };

export type ArticleDetail = {
  id: string;
  slug: string;
  title: string;
  date: string;
  dateLabel: string;
  category: string;
  tags?: string[];
  image?: string;
  shareUrls?: {
    twitter?: string;
    facebook?: string;
  };
  body: ContentBlock[];
};

export type UseArticleResult = {
  data: ArticleDetail | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
};

export type ArticlePageData = {
  title?: string;
  category?: string;
  image?: string;
  media?: string;
  twitter_url?: string;
  facebook_url?: string;
  body?: ContentBlock[];
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

function adaptArticle(
  item: CmsResult<ArticlePageData>,
): ArticleDetail {
  const d = item.data ?? {};
  return {
    id: item.id,
    slug: item.uid,
    title: d.title ?? "(Sem título)",
    date: item.first_publication_date,
    dateLabel: formatDateLabel(item.first_publication_date),
    category: d.category ?? item.tags[0] ?? "",
    tags: item.tags,
    image: d.image ?? d.media,
    shareUrls: {
      twitter: d.twitter_url,
      facebook: d.facebook_url,
    },
    body: d.body ?? [],
  };
}

export function useArticle(slug: string | undefined): UseArticleResult {
  const [data, setData] = useState<ArticleDetail | null>(null);
  const [isLoading, setIsLoading] = useState(Boolean(slug));
  const [error, setError] = useState<Error | null>(null);

  const fetchArticle = useCallback(
    async (currentSlug: string, signal?: AbortSignal) => {
      setIsLoading(true);
      setError(null);
      try {
        const response: CmsResponse<ArticlePageData> =
          await getCmsCollection<ArticlePageData>("article", { signal });

        const found = response.results.find((r) => r.uid === currentSlug);
        setData(found ? adaptArticle(found) : null);
      } catch (err) {
        if (err instanceof Error && err.name === "CanceledError") return;
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    if (!slug) {
      setData(null);
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();
    fetchArticle(slug, controller.signal);
    return () => controller.abort();
  }, [slug, fetchArticle]);

  const refetch = useCallback(() => {
    if (slug) fetchArticle(slug);
  }, [slug, fetchArticle]);

  return { data, isLoading, error, refetch };
}
