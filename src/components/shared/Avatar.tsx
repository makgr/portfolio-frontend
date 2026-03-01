import Image from "next/image";
import { cn } from "@/lib/utils/cn";
import { resolveImageUrl } from "@/lib/utils/imageUrl";

interface AvatarProps {
  src?: string | null;
  alt: string;
  size?: number;
  className?: string;
  fallback?: string;
}

export function Avatar({ src, alt, size = 48, className, fallback }: AvatarProps) {
  const initials =
    fallback ??
    (alt ?? "")
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  const px = size;

  if (!src) {
    return (
      <div
        className={cn(
          "flex items-center justify-center rounded-full",
          "bg-[var(--accent-dim)] border border-[rgba(124,58,237,0.3)]",
          "text-[var(--accent-light)] font-semibold select-none",
          className
        )}
        style={{ width: px, height: px, fontSize: px * 0.38 }}
        aria-label={alt}
      >
        {initials}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-full flex-shrink-0",
        "ring-2 ring-[var(--border-hover)]",
        className
      )}
      style={{ width: px, height: px }}
    >
      <Image
        src={resolveImageUrl(src)}
        alt={alt}
        fill
        sizes={`${px}px`}
        className="object-cover"
      />
    </div>
  );
}
