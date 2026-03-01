export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
}

export interface NewsletterPayload {
  email: string;
  name?: string;
}

export interface ContactFormState {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone: string;
}

export interface ContactFormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  phone?: string;
  general?: string;
}
