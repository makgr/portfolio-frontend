import { apiFetch } from "./client";
import type { ApiResponse } from "@/types/api";
import type { Profile } from "@/types/profile";

export async function getProfile(): Promise<Profile> {
  const res = await apiFetch<ApiResponse<Profile>>("/profile", {
    revalidate: 3600,
    tags: ["profile"],
  });
  return res.data;
}
