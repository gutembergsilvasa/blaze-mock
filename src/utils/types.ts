export interface DeliveryAPIPayload {
  id: string;
  uid: string;
  type: "blog" | string; // Fixado como "blog", mas aceitando extensões
  lang: "pt-BR" | string;
  first_publication_date: string; // ISO Date String
  last_publication_date: string; // ISO Date String
  alternate_languages: string[]; // Defina um tipo específico se houver dados aqui futuramente
  data: unknown;
  sections: unknown; // Tipificado como null baseado no payload, mas flexível
  seo: Record<string, unknown>; // Objeto vazio no payload, geralmente mapeia metadados
  tags: string[];
}

export interface DeliveryByTypeAPIPayload {
  page: number;
  results_per_page: number;
  total_pages: number;
  total_results_size: number;
  results: DeliveryAPIPayload[];
}

export type SemanticText = {
  text: string;
  semanticTag?: string;
};

export interface SeoMetadata {
  // Meta
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  focusKeyphrase?: string;
  // OpenGraph
  ogType?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  // Twitter Cards
  twitterCard?: "summary" | "summary_large_image" | "app" | "player" | string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  // Robots directives
  noIndex?: boolean;
  noFollow?: boolean;
  noArchive?: boolean;
  noSnippet?: boolean;
  // Reservados pro follow-up (declarados pra não quebrar tipos)
  schemaType?: string;
  breadcrumbTitle?: string;
  sitemapChangefreq?: string;
}

export interface TableData {
  columns: string[];
  rows: string[][];
}

export interface MobileImage {
  alt: string;
  url: string;
  size: number;
  width: number | null;
  height: number | null;
  blurHash: string | null;
  filename: string;
  mimeType: string; // Você também pode usar uma união de strings literais se souber os tipos exatos, ex: 'image/jpeg' | 'image/webp'
}

export interface MediaItem {
  alt: string;
  url: string;
  size: number;
  width: number;
  height: number;
  mobile: MobileImage;
  blurHash: string;
  filename: string;
  mimeType: string;
}
