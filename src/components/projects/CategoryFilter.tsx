import { cn } from "@/lib/utils/cn";
import type { Category } from "@/types/category";

interface CategoryFilterProps {
  categories: Category[];
  selected: string;
  onChange: (slug: string) => void;
}

export function CategoryFilter({ categories, selected, onChange }: CategoryFilterProps) {
  return (
    <div
      className="flex flex-wrap gap-2"
      role="group"
      aria-label="Filter by category"
    >
      <button
        onClick={() => onChange("")}
        className={cn(
          "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
          selected === ""
            ? "text-white shadow-[var(--shadow-glow-sm)]"
            : "border text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-hover)]"
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
          onClick={() => onChange(cat.slug)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
            selected === cat.slug
              ? "text-white shadow-[var(--shadow-glow-sm)]"
              : "border text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-hover)]"
          )}
          style={{
            background: selected === cat.slug ? "var(--accent)" : "transparent",
            borderColor: selected === cat.slug ? "transparent" : "var(--border-default)",
          }}
          aria-pressed={selected === cat.slug}
        >
          {cat.name}
          {cat.projects_count !== undefined && (
            <span
              className="ml-1.5 text-xs opacity-70"
            >
              ({cat.projects_count})
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
