import { apiFetch } from "./client";
import type { ApiResponse } from "@/types/api";
import type { Training } from "@/types/training";

export async function getTraining(): Promise<Training[]> {
  const res = await apiFetch<ApiResponse<Training[]>>("/training", {
    revalidate: 0,
    tags: ["training"],
  });
  return res.data ?? [];
}

export async function getFeaturedTraining(): Promise<Training[]> {
  const res = await apiFetch<ApiResponse<Training[]>>("/training/featured", {
    revalidate: 0,
    tags: ["training", "training-featured"],
  });
  return res.data ?? [];
}
