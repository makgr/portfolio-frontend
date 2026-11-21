import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/api/blog";
import { BlogDetail } from "@/components/blog/BlogDetail";
import { JsonLd } from "@/components/shared/JsonLd";
import { pageMetadata, metaTags, clip, SITE_URL } from "@/lib/seo";
import { resolveImageUrl } from "@/lib/utils/imageUrl";

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };

  const meta = metaTags(post.meta_tags);
  return pageMetadata({
    title: meta.title ?? post.title,
    description: meta.description ?? post.excerpt ?? post.content,
    path: `/blog/${post.slug}`,
    images: [post.featured_image],
    article: {
      publishedTime: post.published_at,
      modifiedTime: post.updated_at,
      authors: post.author?.name ? [post.author.name] : [],
      tags: post.tags ?? [],
    },
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: clip(post.excerpt ?? post.content, 300),
    url: `${SITE_URL}/blog/${post.slug}`,
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
    ...(post.featured_image ? { image: resolveImageUrl(post.featured_image) } : {}),
    ...(post.published_at ? { datePublished: post.published_at } : {}),
    ...(post.updated_at ? { dateModified: post.updated_at } : {}),
    ...(post.author?.name ? { author: { "@type": "Person", name: post.author.name, url: SITE_URL } } : {}),
    ...(post.tags?.length ? { keywords: post.tags.join(", ") } : {}),
  };

  return (
    <div
      className="mx-auto px-6 py-16"
      style={{ maxWidth: "var(--max-width-container)" }}
    >
      {/* Breadcrumb */}
      <nav
        className="flex items-center gap-2 text-sm mb-8"
        style={{ color: "var(--text-muted)" }}
        aria-label="Breadcrumb"
      >
        <Link href="/" className="hover:text-[var(--text-primary)] transition-colors">Home</Link>
        <span>/</span>
        <Link href="/blog" className="hover:text-[var(--text-primary)] transition-colors">Blog</Link>
        <span>/</span>
        <span
          style={{ color: "var(--text-primary)" }}
          className="line-clamp-1 max-w-xs"
        >
          {post.title}
        </span>
      </nav>

      <JsonLd data={jsonLd} />
      <BlogDetail post={post} />

      {/* Back link */}
      <div className="mt-16 pt-8" style={{ borderTop: "1px solid var(--border-default)" }}>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-medium transition-colors"
          style={{ color: "var(--accent-light)" }}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Back to Blog
        </Link>
      </div>
    </div>
  );
}
