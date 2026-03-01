import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/types/blog";
import { Badge } from "@/components/shared/Badge";
import { Avatar } from "@/components/shared/Avatar";
import { formatDateFull } from "@/lib/utils/formatDate";
import { resolveImageUrl } from "@/lib/utils/imageUrl";

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="block group h-full">
      <article
        className="h-full flex flex-col overflow-hidden rounded-[var(--radius-card)] transition-all duration-300"
        style={{
          background: "var(--bg-tertiary)",
          border: "1px solid var(--border-default)",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = "var(--border-hover)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = "var(--border-default)";
        }}
      >
        {post.featured_image && (
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={resolveImageUrl(post.featured_image)}
              alt={post.title}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}

        <div className="p-5 flex flex-col flex-1">
          {post.category && (
            <Badge variant="accent" className="mb-3 self-start">
              {post.category.name}
            </Badge>
          )}

          <h2
            className="font-semibold text-base mb-2 line-clamp-2 group-hover:text-[var(--accent-light)] transition-colors"
            style={{ color: "var(--text-primary)" }}
          >
            {post.title}
          </h2>

          {post.excerpt && (
            <p
              className="text-sm leading-relaxed flex-1 line-clamp-3 mb-4"
              style={{ color: "var(--text-secondary)" }}
            >
              {post.excerpt}
            </p>
          )}

          {/* Footer */}
          <div
            className="flex items-center justify-between gap-2 pt-3 mt-auto"
            style={{
              borderTop: "1px solid var(--border-default)",
              color: "var(--text-muted)",
            }}
          >
            <div className="flex items-center gap-2">
              {post.author && (
                <Avatar
                  src={post.author.avatar}
                  alt={post.author.name ?? "Author"}
                  size={24}
                />
              )}
              <span className="text-xs">
                {post.author?.name ?? "Anonymous"}
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <span>{formatDateFull(post.published_at)}</span>
              {post.reading_time && (
                <>
                  <span>·</span>
                  <span>{post.reading_time} min</span>
                </>
              )}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
