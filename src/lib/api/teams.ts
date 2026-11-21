// Author: Mohammad Ali Khan <xvirus.bd@gmail.com>
import { apiFetch } from "./client";
import type { ApiResponse } from "@/types/api";
import type { TeamMember } from "@/types/team";

export async function getTeam(): Promise<TeamMember[]> {
  const res = await apiFetch<ApiResponse<TeamMember[]>>("/teams", {
    revalidate: 0,
    tags: ["teams"],
  });
  return res.data ?? [];
}
