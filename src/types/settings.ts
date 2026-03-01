export interface GeneralSettings {
  site_title?: string;
  site_description?: string;
  contact_email?: string;
  contact_phone?: string;
  timezone?: string;
  [key: string]: string | undefined;
}

export interface SocialSettings {
  facebook_url?: string;
  twitter_url?: string;
  linkedin_url?: string;
  github_url?: string;
  instagram_url?: string;
  youtube_url?: string;
  [key: string]: string | undefined;
}

export interface SeoSettings {
  site_name?: string;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  google_analytics?: string;
  og_image?: string;
  [key: string]: string | undefined;
}

export interface FeatureSettings {
  maintenance_mode?: boolean | string;
  registration_enabled?: boolean | string;
  comments_enabled?: boolean | string;
  newsletter_enabled?: boolean | string;
  [key: string]: boolean | string | undefined;
}

export interface Settings {
  general?: GeneralSettings;
  social?: SocialSettings;
  seo?: SeoSettings;
  features?: FeatureSettings;
  [key: string]: Record<string, unknown> | undefined;
}
