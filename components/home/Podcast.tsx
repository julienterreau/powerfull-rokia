"use client";

import { useState, type FormEvent } from "react";
import type { PodcastSection } from "@/content/types";
import { Pattern } from "../ui/Pattern";
import { Eyebrow } from "../ui/Eyebrow";

export function Podcast({ data }: { data: PodcastSection }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");
  const [company, setCompany] = useState("");

  if (!data.enabled) return null;

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setStatus("idle");
    const response = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, company, source: "podcast" }),
    });
    setStatus(response.ok ? "ok" : "error");
    if (response.ok) setEmail("");
  }

  return (
    <section className="cta">
      <Pattern />
      <div className="c">
        <Eyebrow onDark>{data.eyebrow}</Eyebrow>
        <h2 style={{ marginTop: 16 }}>
          {data.title} <em>{data.titleAccent}</em> {data.titleAfter}
        </h2>
        <p>{data.lead}</p>
        <form className="form" onSubmit={onSubmit}>
          <label className="hp">
            Société
            <input value={company} onChange={(event) => setCompany(event.target.value)} tabIndex={-1} autoComplete="off" />
          </label>
          <input type="email" required placeholder={data.placeholder} aria-label={data.placeholder} value={email} onChange={(event) => setEmail(event.target.value)} />
          <button className="btn bg" type="submit">
            {data.button}
          </button>
        </form>
        <p className="small">{status === "ok" ? "C'est noté. Nous vous écrirons à la sortie." : status === "error" ? "L'inscription n'a pas abouti. Réessayez." : data.note}</p>
      </div>
    </section>
  );
}
