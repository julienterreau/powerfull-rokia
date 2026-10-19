"use client";

import { useState, type FormEvent } from "react";
import { toast } from "sonner";

export function Newsletter({ title, text, placeholder, button }: { title: string; text: string; placeholder: string; button: string }) {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    const response = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, company, source: "blog" }),
    });
    const result = await response.json().catch(() => null);
    if (response.ok && result?.already) {
      toast("Cette adresse est déjà enregistrée.");
      return;
    }
    if (response.ok) {
      setEmail("");
      toast.success("Votre e-mail a bien été enregistré.");
      return;
    }
    toast.error("L'inscription n'a pas abouti. Réessayez.");
  }

  return (
    <form className="nl" onSubmit={onSubmit}>
      <div>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
      <div className="form">
        <label className="hp">
          Société
          <input value={company} onChange={(event) => setCompany(event.target.value)} tabIndex={-1} autoComplete="off" />
        </label>
        <input type="email" required placeholder={placeholder} aria-label={placeholder} value={email} onChange={(event) => setEmail(event.target.value)} />
        <button className="btn bp" type="submit">
          {button}
        </button>
      </div>
    </form>
  );
}
