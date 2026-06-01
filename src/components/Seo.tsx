import { useHead } from "@unhead/react";
import type { SeoMetadata } from "../utils/types";

type Props = {
  seo?: SeoMetadata;
  fallbackTitle?: string;
  fallbackDescription?: string;
  fallbackImage?: string;
  url?: string;
};

function buildRobotsContent(seo?: SeoMetadata): string | undefined {
  if (!seo) return undefined;
  const directives: string[] = [];
  if (seo.noIndex) directives.push("noindex");
  if (seo.noFollow) directives.push("nofollow");
  if (seo.noArchive) directives.push("noarchive");
  if (seo.noSnippet) directives.push("nosnippet");
  return directives.length > 0 ? directives.join(", ") : undefined;
}

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

  const twitterTitle = seo?.twitterTitle ?? ogTitle;
  const twitterDescription = seo?.twitterDescription ?? ogDescription;
  const twitterImage = seo?.twitterImage ?? ogImage;

  useHead({
    title,
    meta: [
      { name: "description", content: description },
      { name: "keywords", content: seo?.focusKeyphrase },
      { name: "robots", content: buildRobotsContent(seo) },
      { property: "og:title", content: ogTitle },
      { property: "og:description", content: ogDescription },
      { property: "og:image", content: ogImage },
      { property: "og:url", content: canonical },
      { property: "og:type", content: seo?.ogType ?? "website" },
      { property: "og:locale", content: "pt_BR" },
      {
        name: "twitter:card",
        content: seo?.twitterCard ?? "summary_large_image",
      },
      { name: "twitter:title", content: twitterTitle },
      { name: "twitter:description", content: twitterDescription },
      { name: "twitter:image", content: twitterImage },
    ],
    link: [{ rel: "canonical", href: canonical }],
  });

  return null;
}
