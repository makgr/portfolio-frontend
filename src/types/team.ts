// Author: Mohammad Ali Khan <xvirus.bd@gmail.com>
import type { SocialLinks } from "./profile";

// The API also returns email and phone; they are left out on purpose so they never get rendered.
export interface TeamMember {
  id: number;
  name: string;
  slug: string;
  position: string;
  department?: string | null;
  employment_type?: "full_time" | "part_time" | "contract" | "intern";
  bio?: string | null;
  image?: string | null;
  social_links?: SocialLinks | [];
  skills?: string[] | null;
  join_date?: string | null;
  is_featured?: boolean;
  order?: number;
  initials?: string;
}
