"use client";

import { useState, type FormEvent } from "react";
import type { ContactPageContent } from "@/content/types";

export function ContactForm({ page }: { page: ContactPageContent }) {
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const payload = {
      name: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      subject: String(form.get("subject") || ""),
      message: String(form.get("message") || ""),
      consent: form.get("consent") === "on",
      company: String(form.get("company") || ""),
    };
    setPending(true);
    setError("");
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setPending(false);
    if (!response.ok) {
      const body = (await response.json().catch(() => null)) as { error?: string } | null;
      setStatus("error");
      setError(body?.error || "L'envoi n'a pas abouti.");
      return;
    }
    setStatus("ok");
    event.currentTarget.reset();
  }

  return (
    <form className="frm" onSubmit={onSubmit}>
      <h2>{page.formTitle}</h2>
      {status === "ok" ? <p className="form-ok">{page.success}</p> : null}
      <label className="hp">
        Société
        <input name="company" tabIndex={-1} autoComplete="off" />
      </label>
      <div className="row2">
        <div>
          <label htmlFor="name">{page.nameLabel}</label>
          <input id="name" name="name" placeholder={page.namePlaceholder} required autoComplete="name" />
        </div>
        <div>
          <label htmlFor="email">{page.emailLabel}</label>
          <input id="email" name="email" type="email" placeholder={page.emailPlaceholder} required autoComplete="email" />
        </div>
      </div>
      <label htmlFor="subject">{page.subjectLabel}</label>
      <input id="subject" name="subject" placeholder={page.subjectPlaceholder} required />
      <label htmlFor="message">{page.messageLabel}</label>
      <textarea id="message" name="message" className="ta" placeholder={page.messagePlaceholder} required />
      <label className="ok">
        <input type="checkbox" name="consent" required />
        {page.consent}
      </label>
      {error ? <p className="form-error">{error}</p> : null}
      <button className="btn bp" type="submit" disabled={pending}>
        {pending ? "Envoi…" : page.submit}
      </button>
    </form>
  );
}
