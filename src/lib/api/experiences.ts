import { apiFetch } from "./client";
import type { ApiResponse } from "@/types/api";
import type { Experience } from "@/types/experience";

export async function getExperiences(): Promise<Experience[]> {
  const res = await apiFetch<ApiResponse<Experience[]>>("/experiences", {
    revalidate: 0,
    tags: ["experiences"],
  });
  return res.data ?? [];
}
