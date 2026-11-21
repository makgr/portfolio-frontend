import { ApiError } from "@/types/api";

export const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";

/** Seconds a GET response stays in Next's data cache before it is refetched. */
export const API_CACHE_SECONDS = Number(process.env.API_CACHE_SECONDS ?? 300);

export type FetchOptions = Omit<RequestInit, "next"> & {
  revalidate?: number | false;
  tags?: string[];
};

export async function apiFetch<T>(
  path: string,
  options: FetchOptions = {}
): Promise<T> {
  const { revalidate, tags, ...fetchOptions } = options;

  // Only GETs are cached; tags let /api/revalidate drop a resource on demand.
  const isGet = (fetchOptions.method ?? "GET").toUpperCase() === "GET";
  const nextOptions: { revalidate?: number | false; tags?: string[] } = {};
  if (isGet) {
    nextOptions.revalidate = revalidate ?? API_CACHE_SECONDS;
    if (tags) nextOptions.tags = tags;
  }

  const url = `${API_BASE}${path}`;

  const res = await fetch(url, {
    ...fetchOptions,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...fetchOptions.headers,
    },
    ...(Object.keys(nextOptions).length > 0 ? { next: nextOptions } : {}),
  });

  if (!res.ok) {
    let message = `HTTP ${res.status}`;
    try {
      const body = await res.json();
      message = body?.message ?? message;
    } catch {
      // ignore parse error
    }
    throw new ApiError(res.status, message);
  }

  return res.json() as Promise<T>;
}
