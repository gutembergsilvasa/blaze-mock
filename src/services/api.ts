import axios, { type AxiosRequestConfig } from "axios";
import type {
  DeliveryAPIPayload,
  DeliveryByTypeAPIPayload,
} from "../utils/types";

const CMS_API_TOKEN =
  import.meta.env.VITE_CMS_API_TOKEN ??
  "cms_a7ef14110b75651524deb928fe1440a61deaf446a161b44d7915b4bf93a4a639";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "/api",
  timeout: 10_000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "x-api-token": CMS_API_TOKEN,
  },
});

api.interceptors.request.use((config) => {
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  },
);

export type CmsResult<TData = Record<string, unknown>> = {
  id: string;
  uid: string;
  type: string;
  tags: string[];
  lang: string;
  alternate_languages: unknown[];
  data: TData;
  sections: unknown | null;
  seo: Record<string, unknown>;
  first_publication_date: string;
  last_publication_date: string;
};

export type CmsResponse<TData = Record<string, unknown>> = {
  page: number;
  results_per_page: number;
  total_results_size: number;
  total_pages: number;
  results: CmsResult<TData>[];
};

export async function get<T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<T> {
  const { data } = await api.get<T>(url, config);
  return data;
}

export async function post<T, B = unknown>(
  url: string,
  body?: B,
  config?: AxiosRequestConfig,
): Promise<T> {
  const { data } = await api.post<T>(url, body, config);
  return data;
}

export async function put<T, B = unknown>(
  url: string,
  body?: B,
  config?: AxiosRequestConfig,
): Promise<T> {
  const { data } = await api.put<T>(url, body, config);
  return data;
}

export async function patch<T, B = unknown>(
  url: string,
  body?: B,
  config?: AxiosRequestConfig,
): Promise<T> {
  const { data } = await api.patch<T>(url, body, config);
  return data;
}

export async function del<T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<T> {
  const { data } = await api.delete<T>(url, config);
  return data;
}

export async function getCmsCollectionByType(
  type: string,
  lang: string = "en-US",
  config?: AxiosRequestConfig,
): Promise<DeliveryByTypeAPIPayload> {
  return get<DeliveryByTypeAPIPayload>(
    `/delivery/${type}?images=original&lang=${lang}`,
    config,
  );
}

export async function getCmsCollectionBySlug(
  type: string,
  slug: string,
  lang: string = "en-US",
  config?: AxiosRequestConfig,
): Promise<DeliveryAPIPayload> {
  return get<DeliveryAPIPayload>(
    `/delivery/${type}/${slug}?images=original&lang=${lang}`,
    config,
  );
}

export async function getCmsCollectionByTag(
  type: string,
  tag: string,
  lang: string = "en-US",
  config?: AxiosRequestConfig,
): Promise<DeliveryAPIPayload[]> {
  return get<DeliveryAPIPayload[]>(
    `/delivery/${type}/tag/${tag}?images=original&lang=${lang}`,
    config,
  );
}

export async function getCmsCollectionByTagAndSlug(
  type: string,
  tag: string,
  slug: string,
  lang: string = "en-US",
  config?: AxiosRequestConfig,
): Promise<DeliveryAPIPayload[]> {
  return get<DeliveryAPIPayload[]>(
    `/delivery/${type}/tag/${tag}/${slug}?images=original&lang=${lang}`,
    config,
  );
}
