import type { Metadata } from "next";
import { Suspense } from "react";
import { getBlogPosts } from "@/lib/api/blog";
import { getCategoriesByType } from "@/lib/api/categories";
import { BlogCard } from "@/components/blog/BlogCard";
import { BlogSearch } from "@/components/blog/BlogSearch";
import { BlogCategoryFilter } from "@/components/blog/BlogCategoryFilter";
import { BlogPagination } from "@/components/blog/BlogPagination";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

interface Props {
  searchParams: Promise<{ search?: string; category?: string; page?: string }>;
}

export const metadata: Metadata = {
  title: "Blog",
  description: "Articles on software engineering, architecture, and lessons from real-world projects.",
};

export default async function BlogPage({ searchParams }: Props) {
  const sp = await searchParams;
  const isFiltered = !!(sp.search || sp.category);
  const page = parseInt(sp.page ?? "1", 10);

  const [blogData, categories] = await Promise.allSettled([
    getBlogPosts(
      {
        search: sp.search,
        category: sp.category,
        page,
        per_page: 12,
      },
      !isFiltered
    ),
    getCategoriesByType("blog"),
  ]);

  const { posts, meta } =
    blogData.status === "fulfilled"
      ? blogData.value
      : { posts: [], meta: undefined };

  const categoriesList =
    categories.status === "fulfilled" ? categories.value : [];

  const currentPage = meta?.current_page ?? 1;
  const lastPage = meta?.last_page ?? 1;
  const total = meta?.total ?? posts.length;

  return (
    <div
      className="mx-auto px-6 py-16"
      style={{ maxWidth: "var(--max-width-container)" }}
    >
      <AnimatedSection className="mb-12">
        <SectionTitle
          label="Writing"
          title={
            <>
              The <span className="gradient-text">Blog</span>
            </>
          }
          subtitle="Thoughts on software engineering, system design, and lessons from the field."
        />
      </AnimatedSection>

      {/* Search + Filter */}
      <AnimatedSection delay={0.1} className="mb-10 flex flex-col sm:flex-row gap-4 items-start">
        <div className="w-full sm:max-w-xs">
          <Suspense fallback={<div className="h-10 skeleton rounded-lg w-full" />}>
            <BlogSearch />
          </Suspense>
        </div>
        {categoriesList.length > 0 && (
          <Suspense fallback={<div className="h-10 skeleton rounded-lg w-40" />}>
            <BlogCategoryFilter categories={categoriesList} />
          </Suspense>
        )}
      </AnimatedSection>

      {/* Results */}
      {posts.length === 0 ? (
        <div className="text-center py-20" style={{ color: "var(--text-muted)" }}>
          <p className="text-lg">
            {isFiltered ? "No articles match your search." : "No articles published yet."}
          </p>
        </div>
      ) : (
        <>
          {isFiltered && (
            <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
              Found {total} article{total !== 1 ? "s" : ""}
              {sp.search ? ` for "${sp.search}"` : ""}
            </p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>

          <BlogPagination
            currentPage={currentPage}
            lastPage={lastPage}
            searchParams={Object.fromEntries(
              Object.entries(sp).filter(([k, v]) => k !== "page" && v !== undefined)
            ) as Record<string, string>}
          />
        </>
      )}
    </div>
  );
}
