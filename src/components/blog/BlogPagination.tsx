import Link from "next/link";
import { cn } from "@/lib/utils/cn";

interface BlogPaginationProps {
  currentPage: number;
  lastPage: number;
  baseUrl?: string;
  searchParams?: Record<string, string>;
}

export function BlogPagination({
  currentPage,
  lastPage,
  searchParams = {},
}: BlogPaginationProps) {
  if (lastPage <= 1) return null;

  const buildUrl = (page: number) => {
    const params = new URLSearchParams({ ...searchParams, page: String(page) });
    if (page === 1) params.delete("page");
    const qs = params.toString();
    return `/blog${qs ? `?${qs}` : ""}`;
  };

  const pages: (number | "ellipsis")[] = [];
  if (lastPage <= 7) {
    for (let i = 1; i <= lastPage; i++) pages.push(i);
  } else {
    pages.push(1);
    if (currentPage > 3) pages.push("ellipsis");
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(lastPage - 1, currentPage + 1);
      i++
    ) {
      pages.push(i);
    }
    if (currentPage < lastPage - 2) pages.push("ellipsis");
    pages.push(lastPage);
  }

  return (
    <nav
      className="flex items-center justify-center gap-1 mt-12"
      aria-label="Blog pagination"
    >
      {/* Prev */}
      {currentPage > 1 ? (
        <Link
          href={buildUrl(currentPage - 1)}
          className="w-9 h-9 flex items-center justify-center rounded-lg border text-sm font-medium transition-colors"
          style={{ borderColor: "var(--border-default)", color: "var(--text-secondary)" }}
          aria-label="Previous page"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
      ) : (
        <span
          className="w-9 h-9 flex items-center justify-center rounded-lg border opacity-40"
          style={{ borderColor: "var(--border-default)", color: "var(--text-muted)" }}
          aria-disabled="true"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </span>
      )}

      {pages.map((p, i) =>
        p === "ellipsis" ? (
          <span
            key={`ellipsis-${i}`}
            className="w-9 h-9 flex items-center justify-center text-sm"
            style={{ color: "var(--text-muted)" }}
            aria-hidden="true"
          >
            …
          </span>
        ) : (
          <Link
            key={p}
            href={buildUrl(p)}
            className={cn(
              "w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-colors"
            )}
            style={
              p === currentPage
                ? { background: "var(--accent)", color: "white" }
                : {
                    border: "1px solid var(--border-default)",
                    color: "var(--text-secondary)",
                  }
            }
            aria-current={p === currentPage ? "page" : undefined}
          >
            {p}
          </Link>
        )
      )}

      {/* Next */}
      {currentPage < lastPage ? (
        <Link
          href={buildUrl(currentPage + 1)}
          className="w-9 h-9 flex items-center justify-center rounded-lg border text-sm font-medium transition-colors"
          style={{ borderColor: "var(--border-default)", color: "var(--text-secondary)" }}
          aria-label="Next page"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      ) : (
        <span
          className="w-9 h-9 flex items-center justify-center rounded-lg border opacity-40"
          style={{ borderColor: "var(--border-default)", color: "var(--text-muted)" }}
          aria-disabled="true"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </span>
      )}
    </nav>
  );
}
