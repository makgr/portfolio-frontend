export interface Service {
  id: number;
  title: string;
  slug?: string;
  short_description?: string;
  description?: string;
  icon?: string;
  image?: string | null;
  features?: string[];
  technologies?: string[];
  starting_price?: number | null;
  price_unit?: string | null;
  formatted_price?: string;
  order?: number;
  is_active?: boolean;
}
