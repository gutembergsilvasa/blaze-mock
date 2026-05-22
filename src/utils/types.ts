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
