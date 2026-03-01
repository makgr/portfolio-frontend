export interface Experience {
  id: number;
  company_name?: string;
  company?: string;
  position: string;
  employment_type?: string;
  location?: string;
  description?: string;
  responsibilities?: string[];
  achievements?: string[];
  technologies?: string[];
  start_date?: string;
  end_date?: string | null;
  is_current?: boolean;
  company_logo?: string | null;
  company_url?: string | null;
  duration?: string | number;
  formatted_duration?: string;
  formatted_dates?: string;
  order?: number;
  is_active?: boolean;
}
