import { cn } from "@/lib/utils/cn";
import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "ghost" | "outline" | "accent";
type Size = "sm" | "md" | "lg";

interface BaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

interface ButtonProps
  extends BaseProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> {
  as?: "button";
  href?: never;
}

interface LinkButtonProps
  extends BaseProps,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children" | "href"> {
  as: "link";
  href: string;
}

type Props = ButtonProps | LinkButtonProps;

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-[var(--accent)] text-white hover:bg-[var(--accent-light)] shadow-[var(--shadow-glow-sm)] hover:shadow-[var(--shadow-glow-lg)]",
  ghost:
    "text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] border border-transparent hover:border-[var(--border-hover)]",
  outline:
    "border border-[var(--border-default)] text-[var(--text-primary)] hover:border-[var(--border-hover)] hover:bg-[var(--bg-tertiary)]",
  accent:
    "bg-[var(--accent-dim)] text-[var(--accent-light)] border border-[rgba(124,58,237,0.3)] hover:bg-[rgba(124,58,237,0.2)]",
};

const sizeStyles: Record<Size, string> = {
  sm: "px-3 py-1.5 text-sm gap-1.5",
  md: "px-5 py-2.5 text-base gap-2",
  lg: "px-7 py-3.5 text-base gap-2.5",
};

function getClassName(variant: Variant, size: Size, extra?: string): string {
  return cn(
    "inline-flex items-center justify-center font-medium rounded-[var(--radius-button)]",
    "transition-all duration-200 cursor-pointer select-none",
    "focus-visible:outline-2 focus-visible:outline-[var(--accent)] focus-visible:outline-offset-2",
    "disabled:opacity-50 disabled:pointer-events-none",
    variantStyles[variant],
    sizeStyles[size],
    extra
  );
}

export function Button(props: Props) {
  const { variant = "primary", size = "md", className, children } = props;
  const cls = getClassName(variant, size, className);

  if (props.as === "link") {
    const { as: _as, variant: _v, size: _s, className: _c, ...rest } = props;
    return (
      <Link {...rest} className={cls}>
        {children}
      </Link>
    );
  }

  const { as: _as, variant: _v, size: _s, className: _c, ...rest } =
    props as ButtonProps;
  return (
    <button {...rest} className={cls}>
      {children}
    </button>
  );
}
