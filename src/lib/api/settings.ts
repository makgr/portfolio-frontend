import { cache } from "react";
import { apiFetch } from "./client";
import { ApiError } from "@/types/api";
import type { ApiResponse } from "@/types/api";
import type { Settings } from "@/types/settings";

// cache(): the layout, its metadata and the maintenance check share one request
export const getSettings = cache(async (): Promise<Settings> => {
  const res = await apiFetch<ApiResponse<Settings>>("/settings", {
    tags: ["settings"],
  });
  return res.data ?? {};
});

/**
 * True when the admin turned on Settings > Maintenance Mode, or when the
 * backend itself is down for maintenance (`php artisan down` answers 503).
 */
export async function isMaintenanceMode(): Promise<boolean> {
  try {
    const flag = (await getSettings()).features?.maintenance_mode;
    return flag === true || flag === "1" || flag === "true";
  } catch (e) {
    return e instanceof ApiError && e.status === 503;
  }
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
