"use client";

import { useEffect, useRef, useState } from "react";
import { extractHeadings, type TocHeading } from "@/lib/utils/extractHeadings";
import { cn } from "@/lib/utils/cn";

interface TableOfContentsProps {
  content: string;
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<TocHeading[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const parsed = extractHeadings(content);
    setHeadings(parsed);
  }, [content]);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0% -75% 0%" }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 3) return null;

  return (
    <nav
      className="hidden xl:block sticky top-28 self-start"
      aria-label="Table of contents"
    >
      <div
        className="p-4 rounded-[var(--radius-card)]"
        style={{
          background: "var(--bg-tertiary)",
          border: "1px solid var(--border-default)",
          maxWidth: "220px",
        }}
      >
        <p
          className="text-xs font-semibold mb-3 text-label"
          style={{
            color: "var(--text-muted)",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            fontSize: "0.7rem",
          }}
        >
          On this page
        </p>

        <ol className="space-y-1.5">
          {headings.map(({ id, text, level }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={cn(
                  "block text-xs leading-snug transition-colors duration-150",
                  level === 3 && "pl-3",
                  level === 4 && "pl-6"
                )}
                style={{
                  color: activeId === id ? "var(--accent-light)" : "var(--text-muted)",
                  fontWeight: activeId === id ? 500 : 400,
                }}
              >
                {text}
              </a>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
