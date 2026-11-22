import { apiFetch } from "./client";
import type { ApiResponse } from "@/types/api";
import type { Training } from "@/types/training";

export async function getTraining(): Promise<Training[]> {
  const res = await apiFetch<ApiResponse<Training[]>>("/training", {
    tags: ["training"],
  });
  return res.data ?? [];
}

export async function getFeaturedTraining(): Promise<Training[]> {
  const res = await apiFetch<ApiResponse<Training[]>>("/training/featured", {
    tags: ["training", "training-featured"],
  });
  return res.data ?? [];
}
