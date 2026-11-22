import type { Category } from "./category";

export interface Project {
  id: number;
  title: string;
  slug: string;
  short_description?: string;
  description?: string;
  category?: Category;
  featured_image?: string | null;
  images?: string[];
  type?: string;
  status?: "published" | "draft";
  client_name?: string | null;
  project_date?: string;
  project_url?: string | null;
  github_url?: string | null;
  demo_url?: string | null;
  tech_stack?: string[];
  features?: string[];
  challenges?: string[];
  solutions?: string[];
  duration_weeks?: number | null;
  team_size?: number | null;
  my_role?: string | null;
  is_featured?: boolean;
  order?: number;
  views?: number;
  meta_tags?: Record<string, string>;
  published_at?: string;
  updated_at?: string;
}

export interface ProjectsFilter {
  category?: string;
  type?: string;
  limit?: number;
}
