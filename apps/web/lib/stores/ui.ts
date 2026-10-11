"use client";

import { create } from "zustand";

type UiState = {
  menuOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;
};

export const useUiStore = create<UiState>((set) => ({
  menuOpen: false,
  openMenu: () => set({ menuOpen: true }),
  closeMenu: () => set({ menuOpen: false }),
}));
