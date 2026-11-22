export interface SocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
  website?: string;
}

export interface SiteInfo {
  title?: string;
  description?: string;
  contact?: {
    email?: string;
    phone?: string;
  };
  social?: SocialLinks;
}

export interface MetaTags {
  title?: string;
  description?: string;
  keywords?: string;
  og_image?: string;
  [key: string]: string | undefined;
}

export interface Profile {
  id: number;
  full_name: string;
  title: string;
  subtitle?: string;
  bio?: string;
  short_bio?: string;
  email?: string;
  phone?: string;
  location?: string;
  avatar_url?: string;
  hero_image_url?: string;
  /** Portrait on a dark or transparent background for the home hero. */
  hero_cutout_url?: string;
  resume_url?: string;
  years_of_experience?: number;
  total_projects?: number;
  happy_clients?: number;
  social_links?: SocialLinks;
  meta_tags?: MetaTags;
  site_info?: SiteInfo;
}
