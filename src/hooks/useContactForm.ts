"use client";

import { useState, useCallback } from "react";
import { submitContact } from "@/lib/api/contact";
import type { ContactFormState, ContactFormErrors } from "@/types/contact";

type Status = "idle" | "loading" | "success" | "error";

const initialState: ContactFormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
  phone: "",
};

function validate(form: ContactFormState): ContactFormErrors {
  const errors: ContactFormErrors = {};
  if (!form.name.trim()) errors.name = "Name is required";
  if (!form.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Enter a valid email address";
  }
  if (!form.subject.trim()) errors.subject = "Subject is required";
  if (!form.message.trim()) {
    errors.message = "Message is required";
  } else if (form.message.trim().length < 20) {
    errors.message = "Message must be at least 20 characters";
  }
  return errors;
}

export function useContactForm() {
  const [form, setForm] = useState<ContactFormState>(initialState);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [successMessage, setSuccessMessage] = useState("");

  const updateField = useCallback(
    (field: keyof ContactFormState, value: string) => {
      setForm((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    },
    []
  );

  const submit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const validationErrors = validate(form);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      setStatus("loading");
      setErrors({});

      try {
        const res = await submitContact({
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
          phone: form.phone || undefined,
        });
        setStatus("success");
        setSuccessMessage(res.message);
        setForm(initialState);
      } catch (err) {
        setStatus("error");
        setErrors({
          general:
            err instanceof Error ? err.message : "Failed to send. Please try again.",
        });
      }
    },
    [form]
  );

  const reset = useCallback(() => {
    setStatus("idle");
    setErrors({});
    setSuccessMessage("");
  }, []);

  return { form, errors, status, successMessage, updateField, submit, reset };
}
