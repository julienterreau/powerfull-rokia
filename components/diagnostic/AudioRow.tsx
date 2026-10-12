"use client";

import { useEffect, useRef } from "react";
import type { Answer } from "@/lib/stores/diagnostic";
import { useAudioStore } from "@/lib/stores/audio";
import { PlayIcon } from "../ui/icons";

const waves = [6, 12, 18, 10, 16, 8, 14, 20, 9, 13, 7, 15];

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
  const active = currentId === order && playing;

  useEffect(() => {
    const node = audioRef.current;
    if (!node) return;
    if (active) {
      void node.play().catch(() => undefined);
    } else {
      node.pause();
    }
  }, [active]);

  return (
    <div className={active ? "dr on" : answer ? "dr done" : "dr"}>
      <button className="pb" type="button" aria-label={active ? `Pause ${title}` : `Lire ${title}`} aria-pressed={active} onClick={() => toggle(order)}>
        <PlayIcon />
      </button>
      <span>{title}</span>
      <em className={active ? "wv play" : "wv"} aria-hidden>
        {waves.map((height, index) => (
          <i key={index} style={{ height }} />
        ))}
      </em>
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
