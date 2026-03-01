const API_BASE = (
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost/personalportfolio/public/api/v1"
).replace(/\/api\/v\d+$/, "");

/**
 * Resolves a potentially relative image path from the backend into an
 * absolute URL that next/image can accept.
 *
 * - Already-absolute URLs (http:// / https://) are returned unchanged.
 * - Paths that already start with "/" are returned unchanged.
 * - Bare relative paths (e.g. "uploads/project/foo.png") are prefixed
 *   with the API base URL.
 * - null / undefined / empty string returns "".
 */
export function resolveImageUrl(src: string | null | undefined): string {
  if (!src) return "";
  if (src.startsWith("http://") || src.startsWith("https://") || src.startsWith("/")) {
    return src;
  }
  return `${API_BASE}/${src}`;
}
