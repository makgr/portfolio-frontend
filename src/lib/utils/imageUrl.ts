import { API_BASE as API_URL } from "@/lib/api/client";

const API_BASE = API_URL.replace(/\/api\/v\d+$/, "");

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
