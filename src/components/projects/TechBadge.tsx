interface TechBadgeProps {
  tech: string;
}

export function TechBadge({ tech }: TechBadgeProps) {
  return (
    <span
      className="inline-flex items-center px-3 py-1.5 rounded text-xs font-mono font-medium"
      style={{
        background: "var(--bg-elevated)",
        border: "1px solid var(--border-default)",
        color: "var(--accent-light)",
      }}
    >
      {tech}
    </span>
  );
}
