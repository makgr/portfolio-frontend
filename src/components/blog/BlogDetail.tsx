import Image from "next/image";
import type { BlogPost } from "@/types/blog";
import { Badge } from "@/components/shared/Badge";
import { Avatar } from "@/components/shared/Avatar";
import { TableOfContents } from "./TableOfContents";
import { ReadingProgressBar } from "./ReadingProgressBar";
import { formatDateFull } from "@/lib/utils/formatDate";
import { resolveImageUrl } from "@/lib/utils/imageUrl";

interface BlogDetailProps {
  post: BlogPost;
}

export function BlogDetail({ post }: BlogDetailProps) {
  return (
    <>
      <ReadingProgressBar />

      <article>
        {/* Hero image */}
        {post.featured_image && (
          <div
            className="relative aspect-video w-full overflow-hidden rounded-[var(--radius-card)] mb-10"
            style={{ border: "1px solid var(--border-default)" }}
          >
            <Image
              src={resolveImageUrl(post.featured_image)}
              alt={post.title}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Header */}
        <header className="mb-10">
          {post.category && (
            <Badge variant="accent" className="mb-4">
              {post.category.name}
            </Badge>
          )}

          <h1
            className="text-display-lg font-bold mb-6"
            style={{ color: "var(--text-primary)" }}
          >
            {post.title}
          </h1>

          {/* Meta */}
          <div
            className="flex flex-wrap items-center gap-4 pb-6"
            style={{ borderBottom: "1px solid var(--border-default)", color: "var(--text-muted)" }}
          >
            {post.author && (
              <div className="flex items-center gap-2">
                <Avatar
                  src={post.author.avatar}
                  alt={post.author.name ?? "Author"}
                  size={32}
                />
                <div>
                  <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                    {post.author.name}
                  </p>
                </div>
              </div>
            )}
            <span className="text-sm">{formatDateFull(post.published_at)}</span>
            {post.reading_time && (
              <>
                <span>·</span>
                <span className="text-sm">{post.reading_time} min read</span>
              </>
            )}
            {post.views !== undefined && (
              <>
                <span>·</span>
                <span className="text-sm">{post.views.toLocaleString()} views</span>
              </>
            )}
          </div>
        </header>

        {/* Content layout */}
        <div className="flex gap-12 items-start">
          {/* Article body */}
          <div className="flex-1 min-w-0">
            {post.excerpt && (
              <p
                className="text-lg leading-relaxed mb-8 pb-8 italic"
                style={{
                  color: "var(--text-secondary)",
                  borderBottom: "1px solid var(--border-default)",
                }}
              >
                {post.excerpt}
              </p>
            )}

            {post.content ? (
              <div
                className="prose-portfolio"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            ) : (
              <p style={{ color: "var(--text-secondary)" }}>Content not available.</p>
            )}

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div
                className="flex flex-wrap gap-2 mt-10 pt-8"
                style={{ borderTop: "1px solid var(--border-default)" }}
              >
                <span className="text-sm font-medium mr-2" style={{ color: "var(--text-muted)" }}>
                  Tags:
                </span>
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    #{tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* TOC sidebar */}
          {post.content && <TableOfContents content={post.content} />}
        </div>
      </article>
    </>
  );
}
