import { apiFetch } from "./client";
import type { ApiResponse } from "@/types/api";
import type { ContactPayload, NewsletterPayload } from "@/types/contact";

interface ContactResponse {
  id: number;
  submitted_at: string;
}

interface NewsletterResponse {
  email: string;
  subscribed_at: string;
}

export async function submitContact(
  payload: ContactPayload
): Promise<{ success: boolean; message: string; data?: ContactResponse }> {
  const res = await apiFetch<ApiResponse<ContactResponse>>("/contact", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return {
    success: res.success,
    message: res.message ?? "Message sent successfully!",
    data: res.data,
  };
}

export async function subscribeNewsletter(
  payload: NewsletterPayload
): Promise<{ success: boolean; message: string }> {
  const res = await apiFetch<ApiResponse<NewsletterResponse>>(
    "/newsletter/subscribe",
    {
      method: "POST",
      body: JSON.stringify(payload),
    }
  );
  return {
    success: res.success,
    message: res.message ?? "Successfully subscribed!",
  };
}

export async function unsubscribeNewsletter(
  email: string
): Promise<{ success: boolean; message: string }> {
  const res = await apiFetch<ApiResponse<null>>("/newsletter/unsubscribe", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
  return {
    success: res.success,
    message: res.message ?? "Unsubscribed successfully.",
  };
}
