import { cn } from "@/lib/utils/cn";
import type { AnchorHTMLAttributes, ReactNode } from "react";

interface ExternalLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  showArrow?: boolean;
}

export function ExternalLink({
  children,
  showArrow = true,
  className,
  ...props
}: ExternalLinkProps) {
  return (
    <a
      {...props}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-1 text-[var(--accent-light)]",
        "hover:text-[var(--accent)] transition-colors duration-150",
        "underline underline-offset-2",
        className
      )}
    >
      {children}
      {showArrow && (
        <svg
          className="w-3 h-3 flex-shrink-0"
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5v5" />
        </svg>
      )}
    </a>
  );
}
