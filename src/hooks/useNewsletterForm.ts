"use client";

import { useState, useCallback } from "react";
import { subscribeNewsletter } from "@/lib/api/contact";

type Status = "idle" | "loading" | "success" | "error";

export function useNewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const submit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!email.trim()) return;

      setStatus("loading");
      try {
        const res = await subscribeNewsletter({ email });
        setStatus("success");
        setMessage(res.message);
        setEmail("");
      } catch (err) {
        setStatus("error");
        setMessage(
          err instanceof Error ? err.message : "Failed to subscribe. Please try again."
        );
      }
    },
    [email]
  );

  const reset = useCallback(() => {
    setStatus("idle");
    setMessage("");
  }, []);

  return { email, setEmail, status, message, submit, reset };
}
