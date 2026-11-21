"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";
import { useEffect } from "react";

export function BlogSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get("search") ?? "");
  const debounced = useDebounce(value, 400);
  const [, startTransition] = useTransition();

  useEffect(() => {
    // Only navigate when the typed text differs from the URL; otherwise each push
    // changes searchParams, re-runs this effect and loops ("Throttling navigation").
    if (debounced === (searchParams.get("search") ?? "")) return;
    const params = new URLSearchParams(searchParams.toString());
    if (debounced) {
      params.set("search", debounced);
      params.delete("page");
    } else {
      params.delete("search");
    }
    startTransition(() => {
      router.push(`/blog?${params.toString()}`);
    });
  }, [debounced, router, searchParams]);

  return (
    <div className="relative">
      <label htmlFor="blog-search" className="sr-only">Search articles</label>
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none" aria-hidden="true">
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          style={{ color: "var(--text-muted)" }}
        >
          <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <input
        id="blog-search"
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search articles…"
        className="w-full pl-10 pr-4 py-2.5 rounded-[var(--radius-button)] text-sm transition-colors"
        style={{
          background: "var(--bg-elevated)",
          border: "1px solid var(--border-default)",
          color: "var(--text-primary)",
          outline: "none",
        }}
        onFocus={(e) => {
          (e.target as HTMLInputElement).style.borderColor = "var(--accent)";
        }}
        onBlur={(e) => {
          (e.target as HTMLInputElement).style.borderColor = "var(--border-default)";
        }}
      />
    </div>
  );
}
