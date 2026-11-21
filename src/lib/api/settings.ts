import { apiFetch } from "./client";
import type { ApiResponse } from "@/types/api";
import type { Settings } from "@/types/settings";

export async function getSettings(): Promise<Settings> {
  const res = await apiFetch<ApiResponse<Settings>>("/settings", {
    tags: ["settings"],
  });
  return res.data ?? {};
}

export async function getSetting(key: string): Promise<string | null> {
  try {
    const res = await apiFetch<ApiResponse<{ value: string }>>(`/settings/${key}`, {
      tags: ["settings"],
    });
    return res.data?.value ?? null;
  } catch {
    return null;
  }
}
