import { apiFetch } from "./client";
import type { ApiResponse, PaginatedApiResponse } from "@/types/api";
import type { BlogPost, BlogFilter } from "@/types/blog";

export async function getBlogPosts(
  filter?: BlogFilter,
  cacheable = true
): Promise<{ posts: BlogPost[]; meta: ApiResponse<BlogPost[]>["meta"] }> {
  const params = new URLSearchParams();
  if (filter?.search) params.set("search", filter.search);
  if (filter?.category) params.set("category", filter.category);
  if (filter?.tag) params.set("tag", filter.tag);
  if (filter?.per_page) params.set("per_page", String(filter.per_page));
  if (filter?.page) params.set("page", String(filter.page));
  if (filter?.sort) params.set("sort", filter.sort);
  const query = params.toString() ? `?${params.toString()}` : "";

  const res = await apiFetch<PaginatedApiResponse<BlogPost>>(`/blog-posts${query}`, {
    tags: cacheable ? ["blog-posts"] : undefined,
  });

  return { posts: res.data ?? [], meta: res.meta };
}

export async function getFeaturedBlogPosts(): Promise<BlogPost[]> {
  const res = await apiFetch<ApiResponse<BlogPost[]>>("/blog-posts/featured", {
    tags: ["blog-posts", "blog-posts-featured"],
  });
  return res.data ?? [];
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const res = await apiFetch<ApiResponse<BlogPost>>(`/blog-posts/${slug}`, {
      tags: ["blog-posts", `blog-post-${slug}`],
    });
    return res.data ?? null;
  } catch {
    return null;
  }
}
