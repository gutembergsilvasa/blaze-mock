/* eslint-disable react-hooks/set-state-in-effect */
import { useCallback, useEffect, useState } from "react";
import { getCmsCollectionBySlug } from "../services/api";
import type { SemanticText, SeoMetadata } from "../utils/types";

export type ContentBlock =
  | { type: "paragraph"; html: string }
  | { type: "heading"; level: 2 | 3; text: string };

export interface RichTextBlock {
  [key: string]: unknown; // Para garantir flexibilidade dependendo do CMS
}

export interface ArticleData {
  article_title: SemanticText;
  article_date: string; // Formato de data (geralmente 'YYYY-MM-DD' ou ISO string)
  article_banner: string;
  article_main_content: RichTextBlock;
}

const ARTICLE_ENDPOINT = "artigos";

export function useArticle(slug: string | undefined) {
  const [data, setData] = useState<ArticleData | null>(null);
  const [seo, setSeo] = useState<SeoMetadata | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(Boolean(slug));
  const [error, setError] = useState<Error | null>(null);

  const fetchArticle = useCallback(
    async (currentSlug: string, signal?: AbortSignal) => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await getCmsCollectionBySlug(
          ARTICLE_ENDPOINT,
          currentSlug,
          { signal },
        );
        setData(result.data as ArticleData);
        setSeo(result.seo as SeoMetadata | undefined);
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
      setSeo(undefined);
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

  return { data, seo, isLoading, error, refetch };
}
