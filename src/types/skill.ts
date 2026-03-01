export interface Skill {
  id: number;
  name: string;
  slug?: string;
  category?: string;
  proficiency?: number;
  years_experience?: number;
  icon?: string;
  color?: string;
  description?: string;
  certifications?: string[];
  is_primary?: boolean;
  order?: number;
  is_active?: boolean;
}

export interface SkillCategory {
  name: string;
  count: number;
  skills: string[];
}

export interface SkillsResponse {
  data: Skill[];
  categories?: SkillCategory[];
}
