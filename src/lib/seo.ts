// Author: Mohammad Ali Khan <xvirus.bd@gmail.com>
import type { Metadata } from "next";
import { getProfile } from "@/lib/api/profile";
import { isMaintenanceMode } from "@/lib/api/settings";
import { resolveImageUrl } from "@/lib/utils/imageUrl";
import type { Profile, SocialLinks } from "@/types/profile";

/** Public URL of this site, no trailing slash. Set NEXT_PUBLIC_SITE_URL in production. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");

/** Plain-text description of at most `max` characters, cut at a word boundary. */
export function clip(text: string | null | undefined, max = 160): string {
  const plain = (text ?? "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  if (plain.length <= max) return plain;
  const cut = plain.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" ") > 80 ? cut.lastIndexOf(" ") : cut.length)}…`;
}

/** Backend meta_tags arrive as `{ title, description }` or `[]` when empty. */
type MetaTags = { title?: string; description?: string; og_image?: string };
export function metaTags(tags: unknown): MetaTags {
  return tags && typeof tags === "object" && !Array.isArray(tags) ? (tags as MetaTags) : {};
}

export function socialUrls(profile: Profile | null): string[] {
  const links: SocialLinks = { ...(profile?.social_links ?? {}), ...(profile?.site_info?.social ?? {}) };
  return Object.values(links).filter((u): u is string => !!u);
}

interface PageMetaInput {
  title: string;
  description?: string | null;
  /** Path of the page, e.g. "/about"; used for the canonical URL and og:url. */
  path: string;
  /** Backend image paths or URLs; defaults to the owner's photo. */
  images?: (string | null | undefined)[];
  article?: { publishedTime?: string; modifiedTime?: string; authors?: string[]; tags?: string[] };
}

/**
 * Title, description, canonical URL and share previews for one page. Each page
 * needs its own openGraph block: Next does not merge it with the layout's, so a
 * page without one would share as the home page.
 */
export async function pageMetadata({ title, description, path, images, article }: PageMetaInput): Promise<Metadata> {
  // While in maintenance the layout's "Back soon" title and noindex apply to every page.
  if (await isMaintenanceMode()) return {};
  const profile = await getProfile().catch(() => null);
  const desc = clip(description ?? profile?.short_bio);
  const pictures = (images ?? []).filter(Boolean).length
    ? (images ?? []).filter((i): i is string => !!i)
    : [profile?.hero_image_url ?? profile?.avatar_url].filter((i): i is string => !!i);
  const ogImages = pictures.map((src) => ({ url: resolveImageUrl(src) }));
  // <title> gets the site name from the layout template; share cards need it spelled out
  const shareTitle = profile ? `${title} — ${profile.full_name}` : title;

  return {
    title,
    description: desc,
    alternates: { canonical: path },
    openGraph: article
      ? { type: "article", title: shareTitle, description: desc, url: path, images: ogImages, ...article }
      : { type: "website", title: shareTitle, description: desc, url: path, images: ogImages },
    twitter: { card: "summary_large_image", title: shareTitle, description: desc, images: ogImages.map((i) => i.url) },
  };
}
