"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { DiagnosticAudio, DiagnosticPageContent, ResultBand, Video } from "@/content/types";
import { diagnosticIdentity, diagnosticSchema } from "@/lib/schemas/forms";
import { useDiagnosticStore, type Answer } from "@/lib/stores/diagnostic";
import { AudioRow } from "./AudioRow";
import { ResultScreen } from "./ResultScreen";

type Props = {
  page: DiagnosticPageContent;
  audios: DiagnosticAudio[];
};

export function DiagnosticTool({ page, audios }: Props) {
  const name = useDiagnosticStore((state) => state.name);
  const email = useDiagnosticStore((state) => state.email);
  const answers = useDiagnosticStore((state) => state.answers);
  const hydrated = useDiagnosticStore((state) => state.hydrated);
  const setName = useDiagnosticStore((state) => state.setName);
  const setEmail = useDiagnosticStore((state) => state.setEmail);
  const setAnswer = useDiagnosticStore((state) => state.setAnswer);
  const setHydrated = useDiagnosticStore((state) => state.setHydrated);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<{ score: number; band: ResultBand; videos: Video[] } | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const identity = diagnosticIdentity.safeParse({ name, email }).success;

  useEffect(() => {
    if (!hydrated) setHydrated(true);
  }, [hydrated, setHydrated]);

  useEffect(() => {
    if (!notice) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") closeNotice();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [notice]);

  const answered = Object.keys(answers).length;
  const sorted = useMemo(() => [...audios].sort((a, b) => a.order - b.order), [audios]);

  function answer(order: number, value: Answer) {
    setAnswer(order, value);
    document.getElementById(`q-${order + 1}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function askIdentity() {
    const nameOk = name.trim().length >= 2;
    const emailOk = diagnosticIdentity.shape.email.safeParse(email).success;
    const message = !nameOk && !emailOk
      ? "Indiquez votre nom et votre adresse e-mail pour voir votre résultat."
      : !nameOk
        ? "Indiquez votre nom pour voir votre résultat."
        : "Indiquez une adresse e-mail valide pour voir votre résultat.";
    setNotice(message);
  }

  function closeNotice() {
    setNotice("");
    const field = name.trim().length >= 2 ? emailRef.current : nameRef.current;
    field?.scrollIntoView({ behavior: "smooth", block: "center" });
    field?.focus();
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    if (!identity) {
      askIdentity();
      return;
    }
    const parsed = diagnosticSchema.safeParse({ name, email, answers });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Vérifiez vos réponses.");
      return;
    }
    setPending(true);
    const response = await fetch("/api/diagnostic", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed.data),
    });
    setPending(false);
    if (!response.ok) {
      setError("L'envoi n'a pas abouti. Réessayez dans un instant.");
      return;
    }
    setResult(await response.json());
    setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
  }

  return (
    <div className="mx-auto max-w-2xl px-5 pt-28 pb-32 md:pt-32">
      <header className="text-center">
        <p className="text-xs tracking-[0.3em] text-(--d-primary) uppercase">Powerfull Rokia</p>
        <h1 className="mt-3 font-serif text-5xl leading-tight font-semibold">Diagnostic audio</h1>
        <p className="mx-auto mt-4 max-w-md text-(--d-muted-fg)">
          20 questions, un audio pour chacune. Écoutez, puis cochez « oui » si vous ressentez une réaction, « non » sinon.
        </p>
      </header>
      <form onSubmit={submit} className="mt-10 space-y-4">
        <div className="grid gap-3 rounded-xl border border-(--d-border) bg-(--d-card) p-5 sm:grid-cols-2">
          <input
            ref={nameRef}
            aria-label={page.nameLabel}
            placeholder={`${page.nameLabel} *`}
            value={name}
            onChange={(event) => setName(event.target.value)}
            autoComplete="name"
            className="rounded-md border border-(--d-border) bg-[oklch(78%_0.17_55/0.1)] px-4 py-3 text-(--d-fg) outline-none placeholder:text-(--d-muted-fg) focus:ring-2 focus:ring-(--d-primary)"
          />
          <input
            ref={emailRef}
            aria-label={page.emailLabel}
            placeholder={`${page.emailLabel} *`}
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            className="rounded-md border border-(--d-border) bg-[oklch(78%_0.17_55/0.1)] px-4 py-3 text-(--d-fg) outline-none placeholder:text-(--d-muted-fg) focus:ring-2 focus:ring-(--d-primary)"
          />
        </div>
        {sorted.map((audio) => (
          <AudioRow
            key={audio.order}
            order={audio.order}
            title={audio.title}
            url={audio.url}
            answer={answers[audio.order]}
            yesLabel={page.yesLabel}
            noLabel={page.noLabel}
            onAnswer={answer}
          />
        ))}
        {error ? <p className="text-sm text-(--d-primary)">{error}</p> : null}
        <button
          className={`inline-flex h-14 w-full items-center justify-center rounded-md bg-(--d-primary) text-lg font-semibold text-(--d-primary-fg) shadow ${identity ? "cursor-pointer" : "cursor-not-allowed opacity-50"}`}
          type="submit"
          disabled={pending}
          aria-disabled={!identity || pending}
        >
          {pending ? "Envoi…" : page.submitLabel}
        </button>
      </form>
      <div className="fixed bottom-4 left-4 right-[92px] z-30 flex h-14 items-center md:bottom-7 md:left-auto md:right-28 md:h-16 md:w-md">
        <div className="flex h-full min-w-0 flex-1 items-center gap-3 rounded-2xl border border-(--d-border) bg-[oklch(23%_0.035_165/0.96)] px-4 shadow-[0_16px_40px_rgba(0,0,0,0.35)] backdrop-blur md:gap-4 md:px-5">
          <span className="shrink-0 text-sm text-(--d-muted-fg)">{page.progressLabel}</span>
          <div className="h-2 min-w-0 flex-1 overflow-hidden rounded-full bg-(--d-muted)">
            <div className="h-full rounded-full bg-(--d-primary) transition-all" style={{ width: `${audios.length ? (answered / audios.length) * 100 : 0}%` }} />
          </div>
          <span className="shrink-0 text-sm text-(--d-muted-fg) tabular-nums">
            {answered} / {audios.length}
          </span>
        </div>
      </div>
      {notice ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/55 px-5" role="presentation" onMouseDown={closeNotice}>
          <div
            className="w-full max-w-sm rounded-2xl border border-(--d-border) bg-(--d-card) px-6 py-6 text-center shadow-[0_20px_50px_rgba(0,0,0,0.45)]"
            role="dialog"
            aria-modal="true"
            aria-labelledby="identity-notice"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <p id="identity-notice" className="font-serif text-2xl font-semibold">Coordonnées manquantes</p>
            <p className="mt-3 text-(--d-muted-fg)">{notice}</p>
            <button className="mt-5 inline-flex h-11 cursor-pointer items-center justify-center rounded-md bg-(--d-primary) px-5 font-semibold text-(--d-primary-fg)" type="button" onClick={closeNotice}>
              Compris
            </button>
          </div>
        </div>
      ) : null}
      {result ? (
        <div ref={resultRef} className="mt-10">
          <ResultScreen
            name={name.trim()}
            band={result.band}
            score={result.score}
            reactions={sorted.filter((audio) => answers[audio.order] === "oui").map((audio) => audio.order)}
            videos={result.videos}
          />
        </div>
      ) : null}
    </div>
  );
}
