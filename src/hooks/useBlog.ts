/* eslint-disable react-hooks/set-state-in-effect */
import { useCallback, useEffect, useState } from "react";
import {
  getCmsCollectionBySlug,
  getCmsCollectionByType,
} from "../services/api";
import type { DeliveryAPIPayload, SemanticText } from "../utils/types";

export type BlogPostData = {
  banner_principal_img?: string;
  banner_principal_data?: string;
  banner_principal_texto?: SemanticText;
  banner_principal_descricao?: SemanticText;
};

export type BlogArticle = {
  id?: string;
  slug: string;
  date: string;
  title: string;
  tags?: string[];
  image?: string;
};

export type FeaturedArticle = BlogArticle & {
  description: string;
  titleTag?: string;
  descriptionTag?: string;
};

export type UseBlogResult = {
  data: DeliveryAPIPayload | null;
  articles: DeliveryAPIPayload[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
};

const BLOG_ENDPOINT = "blog";
const ARTICLES_ENDPOINT = "blog-artigos";
export const SECAO_INCIAL = "secao-principal";

export function useBlog(): UseBlogResult {
  const [data, setData] = useState<DeliveryAPIPayload | null>(null);
  const [articles, setArticles] = useState<DeliveryAPIPayload[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchBlog = useCallback(async (signal?: AbortSignal) => {
    setIsLoading(true);
    setError(null);
    try {
      const [bannerResult, articlesResult] = await Promise.all([
        getCmsCollectionBySlug(BLOG_ENDPOINT, SECAO_INCIAL, { signal }),
        getCmsCollectionByType(ARTICLES_ENDPOINT, { signal }),
      ]);
      setData(bannerResult);
      setArticles(articlesResult.results);
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

  return { data, articles, isLoading, error, refetch };
}
