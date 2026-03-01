export interface Testimonial {
  id: number;
  client_name: string;
  client_position?: string;
  client_company?: string;
  content: string;
  rating?: number;
  client_image?: string | null;
  client_linkedin?: string | null;
  project_id?: number | null;
  is_featured?: boolean;
  is_active?: boolean;
  order?: number;
}
