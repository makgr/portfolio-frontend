"use client";

import { useScrollProgress } from "@/hooks/useScrollProgress";

export function ReadingProgressBar() {
  const progress = useScrollProgress();

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 h-0.5 pointer-events-none"
      style={{ background: "var(--bg-secondary)" }}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress * 100)}
      aria-label="Reading progress"
    >
      <div
        className="h-full transition-none"
        style={{
          width: `${progress * 100}%`,
          background: "linear-gradient(90deg, var(--accent), var(--accent-light))",
        }}
      />
    </div>
  );
}
