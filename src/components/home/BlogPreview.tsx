"use client";

import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/types/blog";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { AnimatedSection, staggerContainer, staggerItem } from "@/components/shared/AnimatedSection";
import { Badge } from "@/components/shared/Badge";
import { formatDateShort } from "@/lib/utils/formatDate";
import { motion } from "framer-motion";
import { resolveImageUrl } from "@/lib/utils/imageUrl";

interface BlogPreviewProps {
  posts: BlogPost[];
}

export function BlogPreview({ posts }: BlogPreviewProps) {
  if (posts.length === 0) return null;

  return (
    <section className="py-24" aria-labelledby="blog-heading">
      <div
        className="mx-auto px-6"
        style={{ maxWidth: "var(--max-width-container)" }}
      >
        <AnimatedSection className="flex items-start justify-between mb-12 flex-wrap gap-4">
          <SectionTitle
            label="Writing"
            title={
              <>
                Latest <span className="gradient-text">Articles</span>
              </>
            }
            className="mb-0"
          />
          <Link
            href="/blog"
            className="text-sm font-medium transition-colors"
            style={{ color: "var(--accent-light)" }}
          >
            View all posts →
          </Link>
        </AnimatedSection>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {posts.slice(0, 3).map((post) => (
            <motion.div key={post.id} variants={staggerItem}>
              <Link href={`/blog/${post.slug}`} className="block h-full group">
                <article
                  className="h-full flex flex-col overflow-hidden rounded-[var(--radius-card)] transition-all duration-300 hover:border-[var(--border-hover)]"
                  style={{
                    background: "var(--bg-tertiary)",
                    border: "1px solid var(--border-default)",
                  }}
                >
                  {post.featured_image && (
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={resolveImageUrl(post.featured_image)}
                        alt={post.title}
                        fill
                        sizes="(min-width: 768px) 33vw, 100vw"
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

                    <h3
                      className="font-semibold text-base mb-2 line-clamp-2 group-hover:text-[var(--accent-light)] transition-colors"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {post.title}
                    </h3>

                    {post.excerpt && (
                      <p
                        className="text-sm leading-relaxed mb-4 flex-1 line-clamp-2"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {post.excerpt}
                      </p>
                    )}

                    <div
                      className="flex items-center gap-3 text-xs mt-auto pt-3"
                      style={{
                        color: "var(--text-muted)",
                        borderTop: "1px solid var(--border-default)",
                      }}
                    >
                      <span>{formatDateShort(post.published_at)}</span>
                      {post.reading_time && (
                        <>
                          <span>·</span>
                          <span>{post.reading_time} min read</span>
                        </>
                      )}
                    </div>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
