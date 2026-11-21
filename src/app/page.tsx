import { API_BASE } from "@/lib/api/client";
import { getProfile } from "@/lib/api/profile";
import { getFeaturedProjects } from "@/lib/api/projects";
import { getFeaturedTestimonials } from "@/lib/api/testimonials";
import { getSkills } from "@/lib/api/skills";
import { getServices } from "@/lib/api/services";
import { getExperiences } from "@/lib/api/experiences";
import { getEducation } from "@/lib/api/education";
import { resolveImageUrl } from "@/lib/utils/imageUrl";
import type { Project } from "@/types/project";
import { HeroSection, type HeroSlide } from "@/components/home/HeroSection";
import { AboutBento } from "@/components/home/AboutBento";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { ExperiencePreview } from "@/components/home/ExperiencePreview";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { TestimonialsCarousel } from "@/components/home/TestimonialsCarousel";
import { ContactCTA } from "@/components/home/ContactCTA";
import "@/components/home/home.css";

export const revalidate = 0;

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

export default async function HomePage() {
  const [profile, featuredProjects, testimonials, skillsData, services, experiences, education] =
    await Promise.allSettled([
      getProfile(),
      getFeaturedProjects(),
      getFeaturedTestimonials(),
      getSkills(),
      getServices(),
      getExperiences(),
      getEducation(),
    ]);

  const p = profile.status === "fulfilled" ? profile.value : null;
  const projects = featuredProjects.status === "fulfilled" ? featuredProjects.value : [];
  const reviews = testimonials.status === "fulfilled" ? testimonials.value : [];
  const skills = skillsData.status === "fulfilled" ? skillsData.value.skills : [];
  const svcs = services.status === "fulfilled" ? services.value : [];
  const exps = experiences.status === "fulfilled" ? experiences.value : [];
  const edu = education.status === "fulfilled" ? education.value : [];

  if (!p) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-[var(--text-secondary)]">
        <div className="text-center">
          <p className="text-lg">Could not load profile data.</p>
          {process.env.NODE_ENV === "development" && (
            <p className="text-sm mt-2 text-[var(--text-muted)]">
              Make sure the Laravel API is running at {API_BASE}
            </p>
          )}
        </div>
      </div>
    );
  }

  const portrait = p.hero_cutout_url ?? FALLBACK_PORTRAIT;
  const years = p.years_of_experience;
  const intro =
    p.subtitle ??
    `I build back ends, front ends and mobile apps that ship.${years ? ` ${years} years in` : ""}${
      p.total_projects ? `, ${p.total_projects} projects live.` : "."
    }`;
  const since = [years ? `// est. ${new Date().getFullYear() - years}` : "//", p.location].filter(Boolean).join(", ");

  const slides: HeroSlide[] = projects
    .filter((pr) => pr.featured_image)
    .slice(0, 4)
    .map((pr) => ({
      slug: pr.slug,
      title: pr.title,
      image: resolveImageUrl(pr.featured_image),
      file: projectFile(pr),
      category: pr.type ?? pr.category?.slug ?? "web",
    }));

  // Longest-running current role goes in the "currently" card.
  const current = exps
    .filter((e) => e.is_current || !e.end_date)
    .sort((a, b) => (a.start_date ?? "").localeCompare(b.start_date ?? ""))[0];
  const eduSorted = [...edu].sort((a, b) => (b.end_date ?? "9999").localeCompare(a.end_date ?? "9999"));
  const degree = edu.find((e) => /b\.?\s?s\.?c|bachelor/i.test(e.degree));
  const social = { ...(p.social_links ?? {}), ...(p.site_info?.social ?? {}) };
  const email = p.email ?? p.site_info?.contact?.email;

  return (
    <div className="home">
      <HeroSection
        name={p.full_name}
        title={p.title}
        intro={intro}
        since={since}
        portrait={portrait}
        email={email}
        roles={ROLES}
        slides={slides}
      />
      <AboutBento
        profile={p}
        photo={p.hero_image_url ?? p.avatar_url ?? portrait}
        skills={skills}
        current={current}
        education={eduSorted}
        projectSlugs={projects.map((pr) => pr.slug)}
      />
      {projects.length > 0 && <FeaturedProjects projects={projects} />}
      {exps.length > 0 && <ExperiencePreview experiences={exps} degree={degree} authorName={p.full_name} />}
      {svcs.length > 0 && <ServicesGrid services={svcs} />}
      {reviews.length > 0 && <TestimonialsCarousel testimonials={reviews} />}
      <ContactCTA email={email} resumeUrl={p.resume_url} social={social} />
    </div>
  );
}
