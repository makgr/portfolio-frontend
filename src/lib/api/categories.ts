import { apiFetch } from "./client";
import type { ApiResponse } from "@/types/api";
import type { Category } from "@/types/category";

export async function getCategories(options?: {
  type?: "project" | "blog";
  withCounts?: boolean;
}): Promise<Category[]> {
  const params = new URLSearchParams();
  if (options?.type) params.set("type", options.type);
  if (options?.withCounts) params.set("with_counts", "true");
  const query = params.toString() ? `?${params.toString()}` : "";

  const res = await apiFetch<ApiResponse<Category[]>>(`/categories${query}`, {
    revalidate: 0,
    tags: ["categories"],
  });
  return res.data ?? [];
}

export async function getCategoriesByType(
  type: "project" | "blog"
): Promise<Category[]> {
  const res = await apiFetch<ApiResponse<Category[]>>(`/categories/type/${type}`, {
    revalidate: 0,
    tags: ["categories", `categories-${type}`],
  });
  return res.data ?? [];
}
