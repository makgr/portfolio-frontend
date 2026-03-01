import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="min-h-[70vh] flex items-center justify-center px-6"
      style={{ color: "var(--text-primary)" }}
    >
      <div className="text-center max-w-lg">
        <p
          className="text-[8rem] font-bold leading-none mb-4 select-none"
          style={{ color: "var(--bg-elevated)" }}
          aria-hidden="true"
        >
          404
        </p>

        <h1
          className="text-display-sm font-bold mb-3 -mt-4"
          style={{ color: "var(--text-primary)" }}
        >
          Page not found
        </h1>
        <p className="text-base mb-8" style={{ color: "var(--text-secondary)" }}>
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="px-5 py-2.5 rounded-lg text-sm font-medium transition-all"
            style={{
              background: "var(--accent)",
              color: "#fff",
            }}
          >
            Go home
          </Link>
          <Link
            href="/projects"
            className="px-5 py-2.5 rounded-lg text-sm font-medium transition-all"
            style={{
              background: "var(--bg-tertiary)",
              border: "1px solid var(--border-default)",
              color: "var(--text-secondary)",
            }}
          >
            Browse projects
          </Link>
        </div>
      </div>
    </div>
  );
}
