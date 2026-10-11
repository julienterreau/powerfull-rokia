"use client";

import { create } from "zustand";

type AudioState = {
  currentId: number | null;
  playing: boolean;
  play: (id: number) => void;
  pause: () => void;
  toggle: (id: number) => void;
};

export const useAudioStore = create<AudioState>((set, get) => ({
  currentId: null,
  playing: false,
  play: (id) => set({ currentId: id, playing: true }),
  pause: () => set({ playing: false }),
  toggle: (id) => {
    const { currentId, playing } = get();
    if (currentId === id && playing) set({ playing: false });
    else set({ currentId: id, playing: true });
  },
}));
