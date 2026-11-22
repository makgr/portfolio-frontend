import type { Profile } from "@/types/profile";
import { SocialLinks } from "@/components/shared/SocialLinks";
import { CopyEmailButton } from "@/components/home/CopyEmailButton";
import { LocalClock } from "@/components/home/LocalClock";
import { BackToTop } from "./BackToTop";

interface FooterProps {
  profile?: Profile | null;
}

export function Footer({ profile }: FooterProps) {
  const year = new Date().getFullYear();
  const name = profile?.full_name ?? "Developer";
  const email = profile?.email ?? profile?.site_info?.contact?.email;
  const social = { ...(profile?.social_links ?? {}), ...(profile?.site_info?.social ?? {}) };

  return (
    <footer className="mt-auto">
      <div
        className="mx-auto px-5 sm:px-10 pt-8 pb-9 text-sm text-[var(--text-secondary)]"
        style={{ maxWidth: 1320, borderTop: "1px solid var(--border-default)" }}
      >
        <div className="flex flex-wrap items-center justify-between gap-5">
          <span>
            &copy; {year} {name}
          </span>
          <span className="font-mono text-[var(--text-muted)]">
            {"// "}
            {profile?.location ?? "Remote"}
            <LocalClock />
            {/* shortcut: availability is fixed text; add profile.is_available to drive it from the API */}
            <span className="inline-flex items-center gap-2 ml-1">
              , <span className="dot-live" aria-hidden="true" /> open to new projects
            </span>
          </span>
          <BackToTop />
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-5">
          <div className="flex flex-wrap items-center gap-5">
            {email && (
              <CopyEmailButton
                email={email}
                label={email}
                className="font-mono text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors min-h-11"
              />
            )}
            <SocialLinks links={social} size="sm" />
          </div>
          {process.env.BUILD_DATE && (
            <span className="font-mono text-[var(--text-muted)]">{`// last deployed ${process.env.BUILD_DATE}`}</span>
          )}
        </div>
      </div>
    </footer>
  );
}
