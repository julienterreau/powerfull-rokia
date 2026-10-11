"use client";

import { useEffect, useMemo, useState } from "react";
import type { DiagnosticAudio, DiagnosticPageContent, ResultBand, Video } from "@/content/types";
import { diagnosticIdentity, diagnosticSchema } from "@/lib/schemas/forms";
import { useDiagnosticStore } from "@/lib/stores/diagnostic";
import { AudioRow } from "./AudioRow";
import { ProgressBar } from "./ProgressBar";
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
  const reset = useDiagnosticStore((state) => state.reset);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<{ score: number; band: ResultBand; videos: Video[] } | null>(null);

  useEffect(() => {
    if (!hydrated) setHydrated(true);
  }, [hydrated, setHydrated]);

  const identity = diagnosticIdentity.safeParse({ name, email }).success;
  const answered = Object.keys(answers).length;
  const ready = identity && answered === audios.length;
  const sorted = useMemo(() => [...audios].sort((a, b) => a.order - b.order), [audios]);

  async function submit() {
    setError("");
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
  }

  if (result) {
    return (
      <div className="tool">
        <ResultScreen band={result.band} score={result.score} videos={result.videos} />
        <div className="send">
          <span>{page.confidential}</span>
          <button
            className="btn bl"
            type="button"
            onClick={() => {
              reset();
              setResult(null);
            }}
          >
            Recommencer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="tool">
      <div className="fields">
        <input aria-label={page.nameLabel} placeholder={`${page.nameLabel} *`} value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" />
        <input aria-label={page.emailLabel} placeholder={`${page.emailLabel} *`} type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" />
      </div>
      {!identity ? <p className="err">Indiquez votre nom et un e-mail valide pour répondre.</p> : null}
      <ProgressBar value={answered} max={audios.length} label={page.progressLabel} />
      {sorted.map((audio) => (
        <AudioRow
          key={audio.order}
          order={audio.order}
          title={audio.title}
          url={audio.url}
          answer={answers[audio.order]}
          locked={!identity}
          yesLabel={page.yesLabel}
          noLabel={page.noLabel}
          onAnswer={setAnswer}
        />
      ))}
      {error ? <p className="err">{error}</p> : null}
      <div className="send">
        <span>{page.confidential}</span>
        <button className="btn bg" type="button" disabled={!ready || pending} onClick={submit}>
          {pending ? "Envoi…" : page.submitLabel}
        </button>
      </div>
    </div>
  );
}
