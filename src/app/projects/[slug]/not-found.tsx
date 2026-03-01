import Link from "next/link";

export default function ProjectNotFound() {
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
            <path d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
          </svg>
        </div>

        <h1
          className="text-display-sm font-bold mb-3"
          style={{ color: "var(--text-primary)" }}
        >
          Project not found
        </h1>
        <p className="text-base mb-8" style={{ color: "var(--text-secondary)" }}>
          This project doesn&apos;t exist or may have been removed.
        </p>

        <Link
          href="/projects"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all"
          style={{
            background: "var(--accent)",
            color: "#fff",
          }}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to projects
        </Link>
      </div>
    </div>
  );
}
