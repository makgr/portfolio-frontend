import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/api/blog";
import { BlogDetail } from "@/components/blog/BlogDetail";

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: post.title,
    description: post.excerpt ?? "",
    openGraph: {
      title: post.title,
      description: post.excerpt ?? "",
      type: "article",
      publishedTime: post.published_at,
      authors: post.author?.name ? [post.author.name] : [],
      ...(post.featured_image ? { images: [{ url: post.featured_image }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt ?? "",
      ...(post.featured_image ? { images: [post.featured_image] } : {}),
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) notFound();

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
