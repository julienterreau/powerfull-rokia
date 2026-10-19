"use client";

import { useEffect, useRef, useState } from "react";
import type { Answer } from "@/lib/stores/diagnostic";
import { useAudioStore } from "@/lib/stores/audio";
import { PauseIcon, PlayIcon } from "../ui/icons";

type Props = {
  order: number;
  title: string;
  url: string;
  answer?: Answer;
  yesLabel: string;
  noLabel: string;
  onAnswer: (order: number, answer: Answer) => void;
};

export function AudioRow({ order, title, url, answer, yesLabel, noLabel, onAnswer }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const currentId = useAudioStore((state) => state.currentId);
  const playing = useAudioStore((state) => state.playing);
  const toggle = useAudioStore((state) => state.toggle);
  const pause = useAudioStore((state) => state.pause);
  const active = currentId === order && playing;
  const [failed, setFailed] = useState(false);
  const action = active ? `Pause ${title}` : `Écouter ${title}`;

  useEffect(() => {
    const node = audioRef.current;
    if (!node || active) return;
    node.pause();
  }, [active]);

  function onToggle() {
    const node = audioRef.current;
    if (!node) return;
    setFailed(false);
    if (active) {
      node.pause();
      pause();
      return;
    }
    toggle(order);
    void node.play().catch(() => {
      useAudioStore.getState().pause();
      setFailed(true);
    });
  }

  return (
    <div
      id={`q-${order}`}
      className={`flex items-center gap-4 rounded-xl border bg-[var(--d-card)] p-4 transition ${answer ? "border-[oklch(78%_0.17_55/0.5)]" : "border-[var(--d-border)]"}`}
    >
      <button
        className="inline-flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[var(--d-primary)] text-[var(--d-primary-fg)] shadow"
        type="button"
        aria-label={action}
        title={action}
        aria-pressed={active}
        onClick={onToggle}
      >
        {active ? <PauseIcon color="currentColor" size={18} /> : <PlayIcon color="currentColor" size={18} />}
      </button>
      <div className="min-w-0 flex-1">
        <span className="font-serif text-xl">{title}</span>
        {failed ? <p className="mt-1 text-sm text-[var(--d-primary)]">Lecture indisponible. Réessayez.</p> : null}
      </div>
      <div className="flex shrink-0 gap-2" role="radiogroup" aria-label={title}>
        {(
          [
            ["oui", yesLabel],
            ["non", noLabel],
          ] as const
        ).map(([value, label]) => (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={answer === value}
            className={`inline-flex h-10 min-w-14 cursor-pointer items-center justify-center rounded-md px-3 text-sm font-semibold capitalize sm:min-w-16 ${answer === value ? "bg-[var(--d-primary)] text-[var(--d-primary-fg)] shadow" : "border border-[var(--d-input)] bg-[var(--d-bg)] text-[var(--d-fg)] shadow-sm"}`}
            onClick={() => onAnswer(order, value)}
          >
            {label}
          </button>
        ))}
      </div>
      <audio ref={audioRef} src={url} preload="none" onEnded={() => useAudioStore.getState().pause()} />
    </div>
  );
}
