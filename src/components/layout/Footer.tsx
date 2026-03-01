import Link from "next/link";
import { SocialLinks } from "@/components/shared/SocialLinks";
import { NAV_LINKS } from "@/lib/utils/constants";
import type { Profile } from "@/types/profile";
import { Divider } from "@/components/shared/Divider";

interface FooterProps {
  profile?: Profile | null;
}

export function Footer({ profile }: FooterProps) {
  const year = new Date().getFullYear();
  const name = profile?.full_name ?? "Developer";
  const socialLinks = {
    ...(profile?.social_links ?? {}),
    ...(profile?.site_info?.social ?? {}),
  };

  return (
    <footer
      className="mt-auto"
      style={{ borderTop: "1px solid var(--border-default)", background: "var(--bg-secondary)" }}
    >
      <div
        className="mx-auto px-6 py-12"
        style={{ maxWidth: "var(--max-width-container)" }}
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="font-semibold text-[var(--text-primary)] text-lg tracking-tight"
            >
              <span style={{ color: "var(--accent)" }}>&lt;</span>
              {name.split(" ")[0]}
              <span style={{ color: "var(--accent)" }}>/&gt;</span>
            </Link>
            <p className="mt-2 text-sm text-[var(--text-muted)] max-w-xs">
              {profile?.short_bio ?? `Building modern web experiences.`}
            </p>
          </div>

          {/* Nav */}
          <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Footer navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Social */}
          <SocialLinks links={socialLinks} size="md" />
        </div>

        <Divider className="my-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[var(--text-muted)]">
          <p>
            &copy; {year} {name}. All rights reserved.
          </p>
          <p>
            Built with{" "}
            <span style={{ color: "var(--accent-light)" }}>Next.js</span> &amp;{" "}
            <span style={{ color: "var(--accent-light)" }}>Laravel</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
