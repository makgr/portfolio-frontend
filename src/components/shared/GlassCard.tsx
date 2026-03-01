import { cn } from "@/lib/utils/cn";
import type { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
  as?: "div" | "article" | "section" | "li";
}

export function GlassCard({
  children,
  className,
  hoverable = false,
  as: Tag = "div",
}: GlassCardProps) {
  return (
    <Tag
      className={cn(
        "glass-card",
        hoverable &&
          "transition-all duration-300 hover:border-[var(--border-hover)] hover:shadow-[var(--shadow-card-hover)] cursor-pointer",
        className
      )}
    >
      {children}
    </Tag>
  );
}
