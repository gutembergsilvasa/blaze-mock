/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import {
  getCmsCollectionBySlug,
  getCmsCollectionByTag,
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
};

const BLOG_ENDPOINT = "blog";
const ARTICLES_ENDPOINT = "blog-artigos";
export const SECAO_INCIAL = "secao-principal";

export function useBlog(activeTag?: string): UseBlogResult {
  const [data, setData] = useState<DeliveryAPIPayload | null>(null);
  const [articles, setArticles] = useState<DeliveryAPIPayload[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Banner — fetched once
  useEffect(() => {
    const controller = new AbortController();
    getCmsCollectionBySlug(BLOG_ENDPOINT, SECAO_INCIAL, {
      signal: controller.signal,
    })
      .then(setData)
      .catch((err: unknown) => {
        if (err instanceof Error && err.name === "CanceledError") return;
        setError(err instanceof Error ? err : new Error(String(err)));
      });
    return () => controller.abort();
  }, []);

  // Articles — re-fetched whenever the active tag changes
  useEffect(() => {
    const controller = new AbortController();
    setIsLoading(true);
    setError(null);

    const promise: Promise<DeliveryAPIPayload[]> = activeTag
      ? getCmsCollectionByTag(ARTICLES_ENDPOINT, activeTag, {
          signal: controller.signal,
        })
      : getCmsCollectionByType(ARTICLES_ENDPOINT, {
          signal: controller.signal,
        }).then((r) => r.results);

    promise
      .then(setArticles)
      .catch((err: unknown) => {
        if (err instanceof Error && err.name === "CanceledError") return;
        setError(err instanceof Error ? err : new Error(String(err)));
      })
      .finally(() => setIsLoading(false));

    return () => controller.abort();
  }, [activeTag]);

  return { data, articles, isLoading, error };
}
