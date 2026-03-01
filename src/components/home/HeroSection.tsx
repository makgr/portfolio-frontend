import Image from "next/image";
import Link from "next/link";
import type { Profile } from "@/types/profile";
import { Button } from "@/components/shared/Button";
import { SocialLinks } from "@/components/shared/SocialLinks";

interface HeroSectionProps {
  profile: Profile;
}

export function HeroSection({ profile }: HeroSectionProps) {
  const socialLinks = {
    ...(profile.social_links ?? {}),
    ...(profile.site_info?.social ?? {}),
  };

  return (
    <section
      className="relative min-h-[90vh] flex items-center overflow-hidden"
      aria-label="Hero"
    >
      {/* Background grid + radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 80% 50% at 50% -20%, rgba(124,58,237,0.15) 0%, transparent 60%),
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "auto, 60px 60px, 60px 60px",
        }}
        aria-hidden="true"
      />

      <div
        className="relative mx-auto w-full px-6 py-20"
        style={{ maxWidth: "var(--max-width-container)" }}
      >
        <div className="flex flex-col-reverse lg:flex-row items-center gap-16">
          {/* Text */}
          <div className="flex-1 max-w-2xl">
            {/* Label */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 text-xs font-medium"
              style={{
                background: "var(--accent-dim)",
                border: "1px solid rgba(124,58,237,0.3)",
                color: "var(--accent-light)",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "#22c55e" }}
                aria-hidden="true"
              />
              Available for work
            </div>

            <h1
              className="text-display-xl lg:text-display-2xl text-[var(--text-primary)] mb-4"
              style={{ fontWeight: 800 }}
            >
              {profile.full_name}
            </h1>

            <p
              className="text-display-sm lg:text-display-md mb-4"
              style={{ color: "var(--accent-light)", fontWeight: 600 }}
            >
              {profile.title}
            </p>

            {profile.subtitle && (
              <p
                className="text-lg mb-6 leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                {profile.subtitle}
              </p>
            )}

            {(profile.short_bio ?? profile.bio) && (
              <p
                className="text-base mb-8 leading-relaxed max-w-xl"
                style={{ color: "var(--text-secondary)" }}
              >
                {profile.short_bio ?? profile.bio}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-3 mb-8">
              <Button as="link" href="/projects" variant="primary" size="lg">
                View My Work
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Button>
              <Button as="link" href="/contact" variant="outline" size="lg">
                Contact Me
              </Button>
              {profile.resume_url && (
                <a
                  href={profile.resume_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-[var(--radius-button)] text-base font-medium transition-colors duration-200"
                  style={{
                    color: "var(--text-secondary)",
                    border: "1px solid var(--border-default)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--border-hover)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--border-default)";
                  }}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                  </svg>
                  Resume
                </a>
              )}
            </div>

            <SocialLinks links={socialLinks} size="md" />
          </div>

          {/* Avatar */}
          {(profile.avatar_url || profile.hero_image_url) && (
            <div className="relative flex-shrink-0">
              <div
                className="relative w-56 h-56 lg:w-72 lg:h-72 rounded-2xl overflow-hidden"
                style={{
                  border: "1px solid var(--border-default)",
                  boxShadow: "0 0 60px rgba(124,58,237,0.2)",
                }}
              >
                <Image
                  src={profile.hero_image_url ?? profile.avatar_url ?? ""}
                  alt={profile.full_name}
                  fill
                  sizes="(min-width: 1024px) 288px, 224px"
                  className="object-cover"
                  priority
                />
              </div>
              {/* Glow ring */}
              <div
                className="absolute -inset-1 rounded-2xl -z-10"
                style={{
                  background: "radial-gradient(ellipse at center, rgba(124,58,237,0.3) 0%, transparent 70%)",
                }}
                aria-hidden="true"
              />
            </div>
          )}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
        style={{ color: "var(--text-muted)" }}
        aria-hidden="true"
      >
        <span className="text-xs text-label">Scroll</span>
        <div
          className="w-5 h-8 rounded-full border flex items-start justify-center p-1"
          style={{ borderColor: "var(--border-default)" }}
        >
          <div
            className="w-1 h-2 rounded-full animate-bounce"
            style={{ background: "var(--accent-light)" }}
          />
        </div>
      </div>
    </section>
  );
}
