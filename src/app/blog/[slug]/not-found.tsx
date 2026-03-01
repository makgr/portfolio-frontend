import Link from "next/link";

export default function BlogPostNotFound() {
  return (
    <div
      className="min-h-[60vh] flex items-center justify-center px-6"
      style={{ color: "var(--text-primary)" }}
    >
      <div className="text-center max-w-md">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
          style={{ background: "var(--bg-tertiary)", border: "1px solid var(--border-default)" }}
        >
          <svg
            className="w-8 h-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
            style={{ color: "var(--text-muted)" }}
          >
            <path d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
        </div>

        <h1
          className="text-display-sm font-bold mb-3"
          style={{ color: "var(--text-primary)" }}
        >
          Post not found
        </h1>
        <p className="text-base mb-8" style={{ color: "var(--text-secondary)" }}>
          This blog post doesn&apos;t exist or may have been removed.
        </p>

        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all"
          style={{
            background: "var(--accent)",
            color: "#fff",
          }}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to blog
        </Link>
      </div>
    </div>
  );
}
