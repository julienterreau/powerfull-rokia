"use client";

import { useEffect, useRef } from "react";
import type { Answer } from "@/lib/stores/diagnostic";
import { useAudioStore } from "@/lib/stores/audio";
import { PauseIcon, PlayIcon } from "../ui/icons";

type Props = {
  order: number;
  title: string;
  url: string;
  answer?: Answer;
  locked: boolean;
  yesLabel: string;
  noLabel: string;
  onAnswer: (order: number, answer: Answer) => void;
};

export function AudioRow({ order, title, url, answer, locked, yesLabel, noLabel, onAnswer }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const currentId = useAudioStore((state) => state.currentId);
  const playing = useAudioStore((state) => state.playing);
  const toggle = useAudioStore((state) => state.toggle);
  const pause = useAudioStore((state) => state.pause);
  const active = currentId === order && playing;
  const action = active ? `Pause ${title}` : `Lire ${title}`;

  useEffect(() => {
    const node = audioRef.current;
    if (!node || active) return;
    node.pause();
  }, [active]);

  function onToggle() {
    const node = audioRef.current;
    if (!node) return;
    if (active) {
      node.pause();
      pause();
      return;
    }
    toggle(order);
    void node.play().catch(() => useAudioStore.getState().pause());
  }

  return (
    <div className={active ? "dr on" : answer ? "dr done" : "dr"}>
      <button className="pb" type="button" aria-label={action} title={action} aria-pressed={active} onClick={onToggle}>
        {active ? <PauseIcon /> : <PlayIcon />}
      </button>
      <span>{title}</span>
      <div className="yn" role="radiogroup" aria-label={title}>
        <button type="button" role="radio" aria-checked={answer === "oui"} className={answer === "oui" ? "sel" : undefined} disabled={locked} onClick={() => onAnswer(order, "oui")}>
          {yesLabel}
        </button>
        <button type="button" role="radio" aria-checked={answer === "non"} className={answer === "non" ? "sel" : undefined} disabled={locked} onClick={() => onAnswer(order, "non")}>
          {noLabel}
        </button>
      </div>
      <audio ref={audioRef} src={url} preload="none" onEnded={() => useAudioStore.getState().pause()} />
    </div>
  );
}
