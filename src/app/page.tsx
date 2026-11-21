import type { Metadata } from "next";
import { Suspense } from "react";
import { API_BASE } from "@/lib/api/client";
import { getProfile } from "@/lib/api/profile";
import { getFeaturedProjects } from "@/lib/api/projects";
import { getFeaturedTestimonials } from "@/lib/api/testimonials";
import { getSkills } from "@/lib/api/skills";
import { getServices } from "@/lib/api/services";
import { getExperiences } from "@/lib/api/experiences";
import { getEducation } from "@/lib/api/education";
import { resolveImageUrl } from "@/lib/utils/imageUrl";
import type { Profile } from "@/types/profile";
import type { Project } from "@/types/project";
import type { Experience } from "@/types/experience";
import type { Education } from "@/types/education";
import type { Skill } from "@/types/skill";
import type { Service } from "@/types/service";
import type { Testimonial } from "@/types/testimonial";
import { HeroSection, type HeroSlide } from "@/components/home/HeroSection";
import { AboutBento } from "@/components/home/AboutBento";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { ExperiencePreview } from "@/components/home/ExperiencePreview";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { TestimonialsCarousel } from "@/components/home/TestimonialsCarousel";
import { ContactCTA } from "@/components/home/ContactCTA";
import { JsonLd } from "@/components/shared/JsonLd";
import { SITE_URL, socialUrls } from "@/lib/seo";
import "@/components/home/home.css";

export const revalidate = 0;

// Title, description and share image come from the layout; the home page only adds its canonical URL.
export const metadata: Metadata = { alternates: { canonical: "/" } };

// shortcut: placeholder portrait until the backend serves profile.hero_cutout_url
const FALLBACK_PORTRAIT = "/images/hero-portrait.jpg";
const ROLES = ["Laravel back ends", "React and Vue front ends", "Flutter mobile apps", "REST APIs that scale"];

/** File name for the hero's project card, e.g. "e-commerce-platform.tsx". */
function projectFile(p: Project) {
  const stack = (p.tech_stack ?? []).join(" ").toLowerCase();
  const ext = stack.includes("flutter") ? "dart"
    : stack.includes("laravel") || stack.includes("php") ? "php"
    : stack.includes("vue") ? "vue"
    : stack.includes("react") || stack.includes("next") ? "tsx"
    : "ts";
  return `${p.slug}.${ext}`;
}

/** Never rejects, so a failed endpoint only empties the sections that use it. */
const settle = <T,>(p: Promise<T>, fallback: T) => p.catch(() => fallback);

const isCurrent = (e: Experience) => !!e.is_current || !e.end_date;

/*
 * Each section is its own async component inside a Suspense boundary. All API
 * calls start once at the top of the request; a section waits only for the
 * data it needs, so fast sections show while slow ones are still loading.
 */

async function Hero({ profile, projects }: { profile: Promise<Profile | null>; projects: Promise<Project[]> }) {
  const [p, list] = await Promise.all([profile, projects]);
  if (!p) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-[var(--text-secondary)]">
        <div className="text-center">
          <p className="text-lg">Could not load profile data.</p>
          {process.env.NODE_ENV === "development" && (
            <p className="text-sm mt-2 text-[var(--text-muted)]">Make sure the Laravel API is running at {API_BASE}</p>
          )}
        </div>
      </div>
    );
  }

  const years = p.years_of_experience;
  const intro =
    p.subtitle ??
    `I build back ends, front ends and mobile apps that ship.${years ? ` ${years} years in` : ""}${
      p.total_projects ? `, ${p.total_projects} projects live.` : "."
    }`;
  const since = [years ? `// est. ${new Date().getFullYear() - years}` : "//", p.location].filter(Boolean).join(", ");
  const slides: HeroSlide[] = list
    .filter((pr) => pr.featured_image)
    .slice(0, 4)
    .map((pr) => ({
      slug: pr.slug,
      title: pr.title,
      image: resolveImageUrl(pr.featured_image),
      file: projectFile(pr),
      category: pr.type ?? pr.category?.slug ?? "web",
    }));

  return (
    <HeroSection
      name={p.full_name}
      title={p.title}
      intro={intro}
      since={since}
      portrait={p.hero_cutout_url ?? FALLBACK_PORTRAIT}
      email={p.email ?? p.site_info?.contact?.email}
      roles={ROLES}
      slides={slides}
    />
  );
}

async function About(props: {
  profile: Promise<Profile | null>;
  skills: Promise<Skill[]>;
  experiences: Promise<Experience[]>;
  education: Promise<Education[]>;
  projects: Promise<Project[]>;
}) {
  const [p, skills, exps, edu, projects] = await Promise.all([
    props.profile,
    props.skills,
    props.experiences,
    props.education,
    props.projects,
  ]);
  if (!p) return null;
  // Longest-running current role goes in the "currently" card.
  const current = exps.filter(isCurrent).sort((a, b) => (a.start_date ?? "").localeCompare(b.start_date ?? ""))[0];
  const eduSorted = [...edu].sort((a, b) => (b.end_date ?? "9999").localeCompare(a.end_date ?? "9999"));
  return (
    <AboutBento
      profile={p}
      photo={p.hero_image_url ?? p.avatar_url ?? p.hero_cutout_url ?? FALLBACK_PORTRAIT}
      skills={skills}
      current={current}
      education={eduSorted}
      projectSlugs={projects.map((pr) => pr.slug)}
    />
  );
}

async function Projects({ projects }: { projects: Promise<Project[]> }) {
  const list = await projects;
  return list.length > 0 ? <FeaturedProjects projects={list} /> : null;
}

async function Experiences(props: {
  experiences: Promise<Experience[]>;
  education: Promise<Education[]>;
  profile: Promise<Profile | null>;
}) {
  const [exps, edu, p] = await Promise.all([props.experiences, props.education, props.profile]);
  if (exps.length === 0) return null;
  const degree = edu.find((e) => /b\.?\s?s\.?c|bachelor/i.test(e.degree));
  return <ExperiencePreview experiences={exps} degree={degree} authorName={p?.full_name ?? "me"} />;
}

async function Services({ services }: { services: Promise<Service[]> }) {
  const list = await services;
  return list.length > 0 ? <ServicesGrid services={list} /> : null;
}

async function Reviews({ testimonials }: { testimonials: Promise<Testimonial[]> }) {
  const list = await testimonials;
  return list.length > 0 ? <TestimonialsCarousel testimonials={list} /> : null;
}

async function Contact({ profile }: { profile: Promise<Profile | null> }) {
  const p = await profile;
  return (
    <ContactCTA
      email={p?.email ?? p?.site_info?.contact?.email}
      resumeUrl={p?.resume_url}
      social={{ ...(p?.social_links ?? {}), ...(p?.site_info?.social ?? {}) }}
    />
  );
}

/** Tells search engines who the site belongs to and links their social profiles. */
async function HomeJsonLd({ profile }: { profile: Promise<Profile | null> }) {
  const p = await profile;
  if (!p) return null;
  const image = p.hero_cutout_url ?? p.hero_image_url ?? p.avatar_url;
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Person",
            "@id": `${SITE_URL}/#person`,
            name: p.full_name,
            jobTitle: p.title,
            url: SITE_URL,
            ...(image ? { image: resolveImageUrl(image) } : {}),
            ...(p.location ? { address: { "@type": "PostalAddress", addressCountry: p.location } } : {}),
            sameAs: socialUrls(p),
          },
          {
            "@type": "WebSite",
            "@id": `${SITE_URL}/#website`,
            url: SITE_URL,
            name: p.full_name,
            publisher: { "@id": `${SITE_URL}/#person` },
          },
        ],
      }}
    />
  );
}

/** Keeps roughly the section's height while it loads so the page doesn't jump. */
function Placeholder({ height }: { height: number | string }) {
  return <div aria-hidden="true" style={{ minHeight: height }} />;
}

export default function HomePage() {
  const profile = settle(getProfile(), null);
  const projects = settle(getFeaturedProjects(), []);
  const testimonials = settle(getFeaturedTestimonials(), []);
  const skills = settle(getSkills().then((r) => r.skills), []);
  const services = settle(getServices(), []);
  const experiences = settle(getExperiences(), []);
  const education = settle(getEducation(), []);

  return (
    <div className="home">
      <Suspense fallback={<Placeholder height="clamp(800px, 100vh, 1100px)" />}>
        <Hero profile={profile} projects={projects} />
      </Suspense>
      <Suspense fallback={<Placeholder height={900} />}>
        <About profile={profile} skills={skills} experiences={experiences} education={education} projects={projects} />
      </Suspense>
      <Suspense fallback={<Placeholder height={1200} />}>
        <Projects projects={projects} />
      </Suspense>
      <Suspense fallback={<Placeholder height={800} />}>
        <Experiences experiences={experiences} education={education} profile={profile} />
      </Suspense>
      <Suspense fallback={<Placeholder height={700} />}>
        <Services services={services} />
      </Suspense>
      <Suspense fallback={<Placeholder height={500} />}>
        <Reviews testimonials={testimonials} />
      </Suspense>
      <Suspense fallback={<Placeholder height={600} />}>
        <Contact profile={profile} />
      </Suspense>
      <Suspense fallback={null}>
        <HomeJsonLd profile={profile} />
      </Suspense>
    </div>
  );
}
