// Author: Mohammad Ali Khan <xvirus.bd@gmail.com>
import Link from "next/link";
import type { SocialLinks } from "@/types/profile";
import { CopyEmailButton } from "./CopyEmailButton";

export function ContactCTA({ email, resumeUrl, social }: { email?: string; resumeUrl?: string; social: SocialLinks }) {
  const links = Object.entries(social).filter(([, url]) => !!url);

  return (
    <section className="cta" id="contact">
      <div className="wrap">
        <div className="prompt">
          <span>~/mak $</span> ./start-project.sh
        </div>
        <h2>
          Let&apos;s build your next product.
          <span className="caret" />
        </h2>
        <div className="ctas">
          {email ? (
            <a className="btn-pill amber" href={`mailto:${email}`} data-cursor="mail">
              Email me
            </a>
          ) : (
            <Link className="btn-pill amber" href="/contact" data-cursor="hi">
              Get in touch
            </Link>
          )}
          {email && <CopyEmailButton email={email} className="btn-pill" />}
          {resumeUrl && (
            <a className="btn-pill" href={resumeUrl} target="_blank" rel="noopener" data-cursor="get">
              Download CV
            </a>
          )}
        </div>
        {links.length > 0 && (
          <div className="socials">
            {links.map(([key, url]) => (
              <a key={key} href={url} target="_blank" rel="noopener" data-cursor="open">
                {key === "twitter" ? "x.com" : key}
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
