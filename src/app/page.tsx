import type { Metadata } from "next";
import { getProfile } from "@/lib/api/profile";
import { getFeaturedProjects } from "@/lib/api/projects";
import { getFeaturedTestimonials } from "@/lib/api/testimonials";
import { getFeaturedBlogPosts } from "@/lib/api/blog";
import { getSkills } from "@/lib/api/skills";
import { getServices } from "@/lib/api/services";
import { getExperiences } from "@/lib/api/experiences";
import { HeroSection } from "@/components/home/HeroSection";
import { StatsBar } from "@/components/home/StatsBar";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { SkillsSnapshot } from "@/components/home/SkillsSnapshot";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { ExperiencePreview } from "@/components/home/ExperiencePreview";
import { TestimonialsCarousel } from "@/components/home/TestimonialsCarousel";
import { BlogPreview } from "@/components/home/BlogPreview";
import { NewsletterCTA } from "@/components/home/NewsletterCTA";

export const revalidate = 0;

export default async function HomePage() {
  const [profile, featuredProjects, testimonials, featuredPosts, skillsData, services, experiences] =
    await Promise.allSettled([
      getProfile(),
      getFeaturedProjects(),
      getFeaturedTestimonials(),
      getFeaturedBlogPosts(),
      getSkills(),
      getServices(),
      getExperiences(),
    ]);

  const p = profile.status === "fulfilled" ? profile.value : null;
  const projects = featuredProjects.status === "fulfilled" ? featuredProjects.value : [];
  const reviews = testimonials.status === "fulfilled" ? testimonials.value : [];
  const posts = featuredPosts.status === "fulfilled" ? featuredPosts.value : [];
  const { skills, categories } =
    skillsData.status === "fulfilled"
      ? skillsData.value
      : { skills: [], categories: [] };
  const svcs = services.status === "fulfilled" ? services.value : [];
  const exps = experiences.status === "fulfilled" ? experiences.value : [];

  if (!p) {
    return (
      <div
        className="min-h-[60vh] flex items-center justify-center"
        style={{ color: "var(--text-secondary)" }}
      >
        <div className="text-center">
          <p className="text-lg">Could not load profile data.</p>
          <p className="text-sm mt-2" style={{ color: "var(--text-muted)" }}>
            Make sure the Laravel API is running at{" "}
            {process.env.NEXT_PUBLIC_API_URL ?? "http://localhost/personalportfolio/public/api/v1"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <HeroSection profile={p} />
      <StatsBar
        yearsOfExperience={p.years_of_experience}
        totalProjects={p.total_projects}
        happyClients={p.happy_clients}
      />
      {projects.length > 0 && <FeaturedProjects projects={projects} />}
      {(skills.length > 0 || categories.length > 0) && (
        <SkillsSnapshot skills={skills} categories={categories} />
      )}
      {svcs.length > 0 && <ServicesGrid services={svcs} />}
      {exps.length > 0 && <ExperiencePreview experiences={exps} />}
      {reviews.length > 0 && <TestimonialsCarousel testimonials={reviews} />}
      {posts.length > 0 && <BlogPreview posts={posts} />}
      <NewsletterCTA />
    </>
  );
}
