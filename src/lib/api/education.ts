import { apiFetch } from "./client";
import type { ApiResponse } from "@/types/api";
import type { Education } from "@/types/education";

export async function getEducation(): Promise<Education[]> {
  const res = await apiFetch<ApiResponse<Education[]>>("/education", {
    revalidate: 86400,
    tags: ["education"],
  });
  return res.data ?? [];
}
