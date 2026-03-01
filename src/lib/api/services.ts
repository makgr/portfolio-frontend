import { apiFetch } from "./client";
import type { ApiResponse } from "@/types/api";
import type { Service } from "@/types/service";

export async function getServices(): Promise<Service[]> {
  const res = await apiFetch<ApiResponse<Service[]>>("/services", {
    revalidate: 3600,
    tags: ["services"],
  });
  return res.data ?? [];
}
