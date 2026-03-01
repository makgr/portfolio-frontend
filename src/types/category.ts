export interface Category {
  id: number;
  name: string;
  slug: string;
  type?: "project" | "blog";
  description?: string;
  color?: string;
  icon?: string;
  order?: number;
  is_active?: boolean;
  projects_count?: number;
  blog_posts_count?: number;
}
