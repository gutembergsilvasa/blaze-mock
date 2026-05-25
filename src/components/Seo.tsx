import { useHead } from "@unhead/react";
import type { SeoMetadata } from "../utils/types";

type Props = {
  seo?: SeoMetadata;
  fallbackTitle?: string;
  fallbackDescription?: string;
  fallbackImage?: string;
  url?: string;
};

export function Seo({
  seo,
  fallbackTitle,
  fallbackDescription,
  fallbackImage,
  url,
}: Props) {
  const title = seo?.metaTitle ?? fallbackTitle;
  const description = seo?.metaDescription ?? fallbackDescription;
  const ogTitle = seo?.ogTitle ?? title;
  const ogDescription = seo?.ogDescription ?? description;
  const ogImage = seo?.ogImage ?? fallbackImage;
  const canonical = seo?.canonicalUrl ?? url;

  useHead({
    title,
    meta: [
      { name: "description", content: description },
      { name: "keywords", content: seo?.focusKeyphrase },
      { property: "og:title", content: ogTitle },
      { property: "og:description", content: ogDescription },
      { property: "og:image", content: ogImage },
      { property: "og:url", content: canonical },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "pt_BR" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: ogTitle },
      { name: "twitter:description", content: ogDescription },
      { name: "twitter:image", content: ogImage },
    ],
    link: [{ rel: "canonical", href: canonical }],
  });

  return null;
}
