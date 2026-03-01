export interface Education {
  id: number;
  institution: string;
  degree: string;
  field_of_study?: string;
  description?: string;
  location?: string;
  start_date?: string;
  end_date?: string | null;
  is_current?: boolean;
  grade?: string | null;
  activities?: string[];
  courses?: string[];
  institution_logo?: string | null;
  certificate_url?: string | null;
  order?: number;
  is_active?: boolean;
}
