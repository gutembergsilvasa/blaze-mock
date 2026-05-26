/* eslint-disable react-hooks/set-state-in-effect */
import { useCallback, useEffect, useState } from "react";
import { getCmsCollectionBySlug } from "../services/api";
import { useLanguage } from "../context/LanguageContext";
import type { DeliveryAPIPayload, SeoMetadata } from "../utils/types";

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
  seo: SeoMetadata | undefined;
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

const HOME_ENDPOINT = "home";
export const HOME_SLUG = "principal";

function adaptToHomeData(
  payload: DeliveryAPIPayload | null | undefined,
): HomeData | null {
  if (!payload) return null;
  const d = (payload.data ?? {}) as HomePageData;

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
  const { lang } = useLanguage();
  const [data, setData] = useState<HomeData | null>(null);
  const [seo, setSeo] = useState<SeoMetadata | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchHome = useCallback(
    async (currentLang: string, signal?: AbortSignal) => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await getCmsCollectionBySlug(
          HOME_ENDPOINT,
          HOME_SLUG,
          currentLang,
          { signal },
        );
        setData(adaptToHomeData(result));
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
    const controller = new AbortController();
    fetchHome(lang, controller.signal);
    return () => controller.abort();
  }, [lang, fetchHome]);

  const refetch = useCallback(() => {
    fetchHome(lang);
  }, [lang, fetchHome]);

  return { data, seo, isLoading, error, refetch };
}
