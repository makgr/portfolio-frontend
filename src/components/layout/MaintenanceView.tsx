// Author: Mohammad Ali Khan <xvirus.bd@gmail.com>
import type { Profile } from "@/types/profile";
import { SocialLinks } from "@/components/shared/SocialLinks";

/**
 * Shown instead of the whole site while maintenance mode is on. The profile
 * may be missing (the backend can be down too), so every detail is optional.
 */
export function MaintenanceView({ profile }: { profile: Profile | null }) {
  const name = profile?.full_name;
  const email = profile?.email ?? profile?.site_info?.contact?.email;
  const social = { ...(profile?.social_links ?? {}), ...(profile?.site_info?.social ?? {}) };

  return (
    <main className="maint" id="main">
      <div className="maint-inner">
        <p className="code-label">{"// maintenance"}</p>
        <h1>
          Shipping an update.
          <span className="caret" aria-hidden="true" />
        </h1>
        <p className="maint-lede">
          {name ? `${name}'s site` : "This site"} is down for a short upgrade. Everything will be back in a few minutes;
          refresh this page then.
        </p>

        <div className="maint-term" aria-hidden="true">
          <div className="maint-head">
            <span>mak@portfolio: ~</span>
            <span>zsh</span>
          </div>
          <div className="maint-body">
            <p>
              <span className="pr">~/mak $</span> php artisan down
            </p>
            <p>
              <span className="ok">✓</span> maintenance mode on
            </p>
            <p>
              <span className="ok">✓</span> backing up the database
            </p>
            <p>
              <span className="pr maint-spin" /> deploying the new release
            </p>
            <p className="dim">{"// next: php artisan up"}</p>
          </div>
        </div>

        {(email || Object.values(social).some(Boolean)) && (
          <div className="maint-contact">
            <span>Need me right now?</span>
            {email && (
              <a className="btn-pill amber sm" href={`mailto:${email}`} data-cursor="mail">
                Email {email}
              </a>
            )}
            <SocialLinks links={social} size="sm" />
          </div>
        )}
      </div>
    </main>
  );
}
