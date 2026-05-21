/* eslint-disable react-hooks/set-state-in-effect */
import { useCallback, useEffect, useState } from "react";
import {
  getCmsCollection,
  type CmsResponse,
  type CmsResult,
} from "../services/api";

export type HeroStep = {
  id: string;
  icon: string;
  label: string;
};

export type Hero = {
  title: string;
  subtitle: string;
  cta: { label: string; href: string };
  backgroundImage?: string;
  steps: HeroStep[];
};

export type Category = {
  id: string;
  title: string;
  description: string;
  image: string;
  cta: { label: string; href: string };
};

export type Payment = {
  logo: string;
  alt: string;
  cta: { label: string; href: string };
};

export type Sponsor = {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  description?: string;
  image: string;
  imagePosition: "cover" | "right";
};

export type HomeData = {
  hero: Hero | null;
  categories: Category[];
  payment: Payment | null;
  sponsors: Sponsor[];
};

export type UseHomeResult = {
  data: HomeData | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
};

export type HomePageData = {
  hero_title?: string;
  hero_subtitle?: string;
  hero_cta_label?: string;
  hero_cta_href?: string;
  hero_background?: string;
  hero_steps?: HeroStep[];
  categories?: Category[];
  payment?: Payment;
  sponsors?: Sponsor[];
  media?: string;
};

function adaptToHomeData(
  result: CmsResult<HomePageData> | undefined,
): HomeData | null {
  if (!result) return null;
  const d = result.data ?? {};

  const hero: Hero | null = d.hero_title
    ? {
        title: d.hero_title,
        subtitle: d.hero_subtitle ?? "",
        cta: {
          label: d.hero_cta_label ?? "Cadastre-se",
          href: d.hero_cta_href ?? "#cadastre-se",
        },
        backgroundImage: d.hero_background ?? d.media,
        steps: d.hero_steps ?? [],
      }
    : null;

  return {
    hero,
    categories: d.categories ?? [],
    payment: d.payment ?? null,
    sponsors: d.sponsors ?? [],
  };
}

export function useHome(): UseHomeResult {
  const [data, setData] = useState<HomeData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchHome = useCallback(async (signal?: AbortSignal) => {
    setIsLoading(true);
    setError(null);
    try {
      const response: CmsResponse<HomePageData> =
        await getCmsCollection<HomePageData>("home", { signal });
      setData(adaptToHomeData(response.results[0]));
    } catch (err) {
      if (err instanceof Error && err.name === "CanceledError") return;
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetchHome(controller.signal);
    return () => controller.abort();
  }, [fetchHome]);

  const refetch = useCallback(() => {
    fetchHome();
  }, [fetchHome]);

  return { data, isLoading, error, refetch };
}
