export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const SITE_NAME = "Portfolio";

export const SOCIAL_ICON_MAP: Record<string, string> = {
  github: "github",
  linkedin: "linkedin",
  twitter: "twitter",
  facebook: "facebook",
  instagram: "instagram",
  youtube: "youtube",
  website: "globe",
};
