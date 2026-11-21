// Author: Mohammad Ali Khan <xvirus.bd@gmail.com>
import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/api/projects";
import { getBlogPosts } from "@/lib/api/blog";
import { SITE_URL } from "@/lib/seo";
import type { BlogPost } from "@/types/blog";

async function allPosts(): Promise<BlogPost[]> {
  const posts: BlogPost[] = [];
  for (let page = 1; page <= 50; page++) {
    const { posts: batch, meta } = await getBlogPosts({ per_page: 100, page });
    posts.push(...batch);
    if (!meta?.last_page || page >= meta.last_page) break;
  }
  return posts;
}

/** /sitemap.xml: fixed pages plus every project and blog post from the API. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const fixed: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/projects`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/services`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/blog`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/contact`, changeFrequency: "yearly", priority: 0.5 },
  ];

  // An API outage should still give search engines the fixed pages.
  const [projects, posts] = await Promise.all([getProjects().catch(() => []), allPosts().catch(() => [])]);

  return [
    ...fixed,
    ...projects.map((p) => ({
      url: `${SITE_URL}/projects/${p.slug}`,
      lastModified: p.updated_at ?? p.published_at,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...posts.map((p) => ({
      url: `${SITE_URL}/blog/${p.slug}`,
      lastModified: p.updated_at ?? p.published_at,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
