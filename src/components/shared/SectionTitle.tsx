import { cn } from "@/lib/utils/cn";
import type { ReactNode } from "react";

interface SectionTitleProps {
  label?: string;
  title: ReactNode;
  subtitle?: string;
  center?: boolean;
  className?: string;
  /** h1 when this is the page title, h2 for a section inside a page. */
  as?: "h1" | "h2";
}

export function SectionTitle({
  label,
  title,
  subtitle,
  center = false,
  className,
  as: Heading = "h2",
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        "mb-12",
        center && "text-center",
        className
      )}
    >
      {label && (
        <p
          className="text-label text-[var(--accent-light)] mb-3"
          style={{ letterSpacing: "0.08em", textTransform: "uppercase", fontSize: "0.75rem", fontWeight: 500 }}
        >
          {label}
        </p>
      )}
      <Heading
        className="text-display-md text-[var(--text-primary)]"
        style={{ fontWeight: 700 }}
      >
        {title}
      </Heading>
      {subtitle && (
        <p
          className="mt-4 max-w-2xl text-[var(--text-secondary)] text-lg leading-relaxed"
          style={{ maxWidth: center ? "42rem" : undefined, margin: center ? "1rem auto 0" : "1rem 0 0" }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
