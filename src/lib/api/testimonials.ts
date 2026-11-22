import { apiFetch } from "./client";
import type { ApiResponse } from "@/types/api";
import type { Testimonial } from "@/types/testimonial";

export async function getTestimonials(): Promise<Testimonial[]> {
  const res = await apiFetch<ApiResponse<Testimonial[]>>("/testimonials", {
    tags: ["testimonials"],
  });
  return res.data ?? [];
}

export async function getFeaturedTestimonials(): Promise<Testimonial[]> {
  const res = await apiFetch<ApiResponse<Testimonial[]>>("/testimonials/featured", {
    tags: ["testimonials", "testimonials-featured"],
  });
  return res.data ?? [];
}
