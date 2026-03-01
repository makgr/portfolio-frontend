import { cn } from "@/lib/utils/cn";

interface DividerProps {
  className?: string;
  orientation?: "horizontal" | "vertical";
}

export function Divider({ className, orientation = "horizontal" }: DividerProps) {
  if (orientation === "vertical") {
    return (
      <div
        className={cn("w-px self-stretch bg-[var(--border-default)]", className)}
        role="separator"
        aria-orientation="vertical"
      />
    );
  }

  return (
    <hr
      className={cn("border-[var(--border-default)]", className)}
      role="separator"
    />
  );
}
