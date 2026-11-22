export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  // Contact lives on the "Let's talk" button in the header and mobile menu
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
