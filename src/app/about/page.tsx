import type { Metadata } from "next";
import { Suspense, type ReactNode } from "react";
import { getProfile } from "@/lib/api/profile";
import { getExperiences } from "@/lib/api/experiences";
import { getEducation } from "@/lib/api/education";
import { getTraining } from "@/lib/api/training";
import { getSkills } from "@/lib/api/skills";
import { getTeam } from "@/lib/api/teams";
import { ProfileBio } from "@/components/about/ProfileBio";
import { ExperienceTimeline } from "@/components/about/ExperienceTimeline";
import { EducationList } from "@/components/about/EducationList";
import { TrainingCerts } from "@/components/about/TrainingCerts";
import { SkillsGrid } from "@/components/about/SkillsGrid";
import { TeamGrid } from "@/components/about/TeamGrid";
import type { TeamMember } from "@/types/team";
import { Divider } from "@/components/shared/Divider";
import { TimelineSkeleton } from "@/components/skeletons/TimelineSkeleton";
import { SkillsSkeleton } from "@/components/skeletons/SkillsSkeleton";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "About",
  description: "Professional background, experience, education, the technologies I work with and the team I build with.",
};

/*
 * Each section fetches its own data inside a Suspense boundary, so the page
 * shell renders at once and sections stream in as their API call finishes.
 * A slow or failing endpoint only affects its own section.
 */

function BlockSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-4" aria-hidden="true">
      <div className="skeleton h-8 w-56 rounded" />
      {Array.from({ length: lines }, (_, i) => (
        <div key={i} className="skeleton h-4 rounded" style={{ width: `${90 - i * 12}%` }} />
      ))}
    </div>
  );
}

/** Renders a section followed by a divider, or nothing when it has no data. */
function Section({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <Divider className="my-16" />
    </>
  );
}

async function BioSection() {
  const profile = await getProfile().catch(() => null);
  if (!profile) return <p className="text-[var(--text-secondary)]">Could not load profile data.</p>;
  return <ProfileBio profile={profile} />;
}

async function ExperienceSection() {
  const items = await getExperiences().catch(() => []);
  return items.length > 0 ? <Section><ExperienceTimeline experiences={items} /></Section> : null;
}

async function EducationSection() {
  const items = await getEducation().catch(() => []);
  return items.length > 0 ? <Section><EducationList education={items} /></Section> : null;
}

async function TrainingSection() {
  const items = await getTraining().catch(() => []);
  return items.length > 0 ? <Section><TrainingCerts training={items} /></Section> : null;
}

async function SkillsSection() {
  const { skills, categories } = await getSkills().catch(() => ({ skills: [], categories: [] }));
  return skills.length > 0 || categories.length > 0 ? <SkillsGrid skills={skills} categories={categories} /> : null;
}

async function TeamSection() {
  const raw = await getTeam().catch(() => []);
  // Copy only public fields: props of a client component are serialised into the
  // page, so passing the API object as-is would leak members' email and phone.
  const members: TeamMember[] = raw.map((m) => ({
    id: m.id,
    name: m.name,
    slug: m.slug,
    position: m.position,
    department: m.department,
    employment_type: m.employment_type,
    bio: m.bio,
    image: m.image,
    social_links: m.social_links,
    skills: m.skills,
    join_date: m.join_date,
    initials: m.initials,
  }));
  // the divider lives here so it only appears when there is a team to separate
  return members.length > 0 ? (
    <>
      <Divider className="my-16" />
      <TeamGrid members={members} />
    </>
  ) : null;
}

export default function AboutPage() {
  return (
    <div className="mx-auto px-6 py-16" style={{ maxWidth: "var(--max-width-container)" }}>
      <Suspense fallback={<BlockSkeleton lines={4} />}>
        <BioSection />
      </Suspense>
      <Divider className="my-16" />

      <Suspense fallback={<Section><TimelineSkeleton count={3} /></Section>}>
        <ExperienceSection />
      </Suspense>
      <Suspense fallback={<Section><BlockSkeleton /></Section>}>
        <EducationSection />
      </Suspense>
      <Suspense fallback={<Section><BlockSkeleton /></Section>}>
        <TrainingSection />
      </Suspense>
      <Suspense fallback={<SkillsSkeleton />}>
        <SkillsSection />
      </Suspense>
      <Suspense fallback={<BlockSkeleton lines={2} />}>
        <TeamSection />
      </Suspense>
    </div>
  );
}
