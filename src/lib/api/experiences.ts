import { apiFetch } from "./client";
import type { ApiResponse } from "@/types/api";
import type { Experience } from "@/types/experience";

export async function getExperiences(): Promise<Experience[]> {
  const res = await apiFetch<ApiResponse<Experience[]>>("/experiences", {
    revalidate: 3600,
    tags: ["experiences"],
  });
  return res.data ?? [];
}
