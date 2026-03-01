import { apiFetch } from "./client";
import type { ApiResponse } from "@/types/api";
import type { Skill, SkillCategory } from "@/types/skill";

interface SkillsApiResponse {
  success: boolean;
  data: Skill[];
  categories?: SkillCategory[];
}

export async function getSkills(options?: {
  category?: string;
  primary?: boolean;
}): Promise<{ skills: Skill[]; categories: SkillCategory[] }> {
  const params = new URLSearchParams();
  if (options?.category) params.set("category", options.category);
  if (options?.primary) params.set("primary", "true");
  const query = params.toString() ? `?${params.toString()}` : "";

  const res = await apiFetch<SkillsApiResponse>(`/skills${query}`, {
    revalidate: 0,
    tags: ["skills"],
  });

  return {
    skills: res.data ?? [],
    categories: res.categories ?? [],
  };
}
