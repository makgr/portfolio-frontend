"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import type { Category } from "@/types/category";
import { cn } from "@/lib/utils/cn";

interface BlogCategoryFilterProps {
  categories: Category[];
}

export function BlogCategoryFilter({ categories }: BlogCategoryFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();
  const selected = searchParams.get("category") ?? "";

  const setCategory = (slug: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (slug) {
      params.set("category", slug);
    } else {
      params.delete("category");
    }
    params.delete("page");
    startTransition(() => {
      router.push(`/blog?${params.toString()}`);
    });
  };

  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
      <button
        onClick={() => setCategory("")}
        className={cn(
          "px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200",
          selected === ""
            ? "text-white"
            : "border text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
        )}
        style={{
          background: selected === "" ? "var(--accent)" : "transparent",
          borderColor: selected === "" ? "transparent" : "var(--border-default)",
        }}
        aria-pressed={selected === ""}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => setCategory(cat.slug)}
          className={cn(
            "px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200",
            selected === cat.slug
              ? "text-white"
              : "border text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          )}
          style={{
            background: selected === cat.slug ? "var(--accent)" : "transparent",
            borderColor: selected === cat.slug ? "transparent" : "var(--border-default)",
          }}
          aria-pressed={selected === cat.slug}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}
