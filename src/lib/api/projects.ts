import { apiFetch } from "./client";
import type { ApiResponse } from "@/types/api";
import type { Project, ProjectsFilter } from "@/types/project";

export async function getProjects(filter?: ProjectsFilter): Promise<Project[]> {
  const params = new URLSearchParams();
  if (filter?.category) params.set("category", filter.category);
  if (filter?.type) params.set("type", filter.type);
  if (filter?.limit) params.set("limit", String(filter.limit));
  const query = params.toString() ? `?${params.toString()}` : "";

  const res = await apiFetch<ApiResponse<Project[]>>(`/projects${query}`, {
    revalidate: 0,
    tags: ["projects"],
  });
  return res.data ?? [];
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const res = await apiFetch<ApiResponse<Project[]>>("/projects/featured", {
    revalidate: 0,
    tags: ["projects", "projects-featured"],
  });
  return res.data ?? [];
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const res = await apiFetch<ApiResponse<Project>>(`/projects/${slug}`, {
      revalidate: 0,
      tags: [`project-${slug}`],
    });
    return res.data ?? null;
  } catch {
    return null;
  }
}
