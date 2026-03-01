import type { Metadata } from "next";
import { getProfile } from "@/lib/api/profile";
import { getExperiences } from "@/lib/api/experiences";
import { getEducation } from "@/lib/api/education";
import { getTraining } from "@/lib/api/training";
import { getSkills } from "@/lib/api/skills";
import { ProfileBio } from "@/components/about/ProfileBio";
import { ExperienceTimeline } from "@/components/about/ExperienceTimeline";
import { EducationList } from "@/components/about/EducationList";
import { TrainingCerts } from "@/components/about/TrainingCerts";
import { SkillsGrid } from "@/components/about/SkillsGrid";
import { Divider } from "@/components/shared/Divider";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "About",
  description: "Professional background, experience, education, and the technologies I work with.",
};

export default async function AboutPage() {
  const [profileRes, expRes, eduRes, trainingRes, skillsRes] = await Promise.allSettled([
    getProfile(),
    getExperiences(),
    getEducation(),
    getTraining(),
    getSkills(),
  ]);

  const profile = profileRes.status === "fulfilled" ? profileRes.value : null;
  const experiences = expRes.status === "fulfilled" ? expRes.value : [];
  const education = eduRes.status === "fulfilled" ? eduRes.value : [];
  const training = trainingRes.status === "fulfilled" ? trainingRes.value : [];
  const { skills, categories } =
    skillsRes.status === "fulfilled"
      ? skillsRes.value
      : { skills: [], categories: [] };

  if (!profile) {
    return (
      <div
        className="min-h-[50vh] flex items-center justify-center"
        style={{ color: "var(--text-secondary)" }}
      >
        <p>Could not load profile data.</p>
      </div>
    );
  }

  return (
    <div
      className="mx-auto px-6 py-16"
      style={{ maxWidth: "var(--max-width-container)" }}
    >
      {/* Bio */}
      <ProfileBio profile={profile} />

      <Divider className="my-16" />

      {/* Experience */}
      {experiences.length > 0 && (
        <>
          <ExperienceTimeline experiences={experiences} />
          <Divider className="my-16" />
        </>
      )}

      {/* Education */}
      {education.length > 0 && (
        <>
          <EducationList education={education} />
          <Divider className="my-16" />
        </>
      )}

      {/* Training & Certifications */}
      {training.length > 0 && (
        <>
          <TrainingCerts training={training} />
          <Divider className="my-16" />
        </>
      )}

      {/* Skills */}
      {(skills.length > 0 || categories.length > 0) && (
        <SkillsGrid skills={skills} categories={categories} />
      )}
    </div>
  );
}
