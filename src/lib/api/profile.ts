import { cache } from "react";
import { apiFetch } from "./client";
import type { ApiResponse } from "@/types/api";
import type { Profile } from "@/types/profile";

// cache(): the layout, its metadata and the page all need the profile; fetch it once per request.
export const getProfile = cache(async (): Promise<Profile> => {
  const res = await apiFetch<ApiResponse<Profile>>("/profile", {
    revalidate: 0,
    tags: ["profile"],
  });
  return res.data;
});
