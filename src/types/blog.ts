import type { Category } from "./category";

export interface BlogPostAuthor {
  id?: number;
  name?: string;
  avatar?: string;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  category?: Category;
  author?: BlogPostAuthor;
  featured_image?: string | null;
  status?: "published" | "draft" | "scheduled";
  reading_time?: number;
  tags?: string[];
  meta_tags?: Record<string, string>;
  is_featured?: boolean;
  allow_comments?: boolean;
  views?: number;
  likes?: number;
  published_at?: string;
  updated_at?: string;
}

export interface BlogFilter {
  search?: string;
  category?: string;
  tag?: string;
  per_page?: number;
  page?: number;
  sort?: "latest" | "popular" | "oldest";
}
