import axios, { type AxiosRequestConfig } from "axios";

const CMS_API_TOKEN =
  import.meta.env.VITE_CMS_API_TOKEN ??
  "cms_1603b8ec37d38b8236a32ab26eb144f63da6da77a08fe3edbe9aab92440545e4";

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

export async function getCmsCollection<TData = Record<string, unknown>>(
  type: string,
  config?: AxiosRequestConfig,
): Promise<CmsResponse<TData>> {
  return get<CmsResponse<TData>>(`/delivery/${type}?images=original`, config);
}
