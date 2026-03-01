"use client";

import { useEffect } from "react";
import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

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
            style={{ color: "var(--accent-light)" }}
          >
            <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
        </div>

        <h1
          className="text-display-sm font-bold mb-3"
          style={{ color: "var(--text-primary)" }}
        >
          Something went wrong
        </h1>
        <p className="text-base mb-8" style={{ color: "var(--text-secondary)" }}>
          {error.message || "An unexpected error occurred. Please try again."}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={reset}
            className="px-5 py-2.5 rounded-lg text-sm font-medium transition-all"
            style={{
              background: "var(--accent)",
              color: "#fff",
            }}
          >
            Try again
          </button>
          <Link
            href="/"
            className="px-5 py-2.5 rounded-lg text-sm font-medium transition-all"
            style={{
              background: "var(--bg-tertiary)",
              border: "1px solid var(--border-default)",
              color: "var(--text-secondary)",
            }}
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
