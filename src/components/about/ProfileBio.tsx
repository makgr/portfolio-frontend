import Image from "next/image";
import type { Profile } from "@/types/profile";
import { SocialLinks } from "@/components/shared/SocialLinks";
import { Button } from "@/components/shared/Button";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { resolveImageUrl } from "@/lib/utils/imageUrl";

interface ProfileBioProps {
  profile: Profile;
}

export function ProfileBio({ profile }: ProfileBioProps) {
  const socialLinks = {
    ...(profile.social_links ?? {}),
    ...(profile.site_info?.social ?? {}),
  };

  return (
    <AnimatedSection>
      <div className="flex flex-col md:flex-row gap-10 items-center md:items-start">
        {/* Avatar */}
        {(profile.avatar_url || profile.hero_image_url) && (
          <div className="flex-shrink-0">
            <div
              className="relative w-40 h-40 rounded-2xl overflow-hidden"
              style={{
                border: "1px solid var(--border-default)",
                boxShadow: "var(--shadow-glow-sm)",
              }}
            >
              <Image
                src={resolveImageUrl(profile.avatar_url ?? profile.hero_image_url)}
                alt={profile.full_name}
                fill
                sizes="160px"
                className="object-cover"
                priority
              />
            </div>
          </div>
        )}

        {/* Bio */}
        <div className="flex-1 w-full">
          <h1
            className="text-display-md font-bold mb-2"
            style={{ color: "var(--text-primary)" }}
          >
            {profile.full_name}
          </h1>
          <p
            className="text-lg font-medium mb-4"
            style={{ color: "var(--accent-light)" }}
          >
            {profile.title}
            {profile.subtitle && (
              <span style={{ color: "var(--text-muted)" }}>
                {" "}— {profile.subtitle}
              </span>
            )}
          </p>

          {(profile.bio ?? profile.short_bio) && (
            <p
              className="text-base leading-relaxed mb-6"
              style={{ color: "var(--text-secondary)", maxWidth: "60ch" }}
            >
              {profile.bio ?? profile.short_bio}
            </p>
          )}

          {/* Info row */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm mb-6" style={{ color: "var(--text-muted)" }}>
            {profile.location && (
              <span className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {profile.location}
              </span>
            )}
            {profile.email && (
              <span className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {profile.email}
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {profile.resume_url && (
              <Button as="link" href={profile.resume_url} variant="primary" size="md">
                Download Resume
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                </svg>
              </Button>
            )}
            <SocialLinks links={socialLinks} size="md" />
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
