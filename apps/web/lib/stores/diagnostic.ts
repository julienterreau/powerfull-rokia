"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type Answer = "oui" | "non";

type DiagnosticState = {
  name: string;
  email: string;
  answers: Record<number, Answer>;
  hydrated: boolean;
  setHydrated: (value: boolean) => void;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setAnswer: (order: number, answer: Answer) => void;
  reset: () => void;
};

export const useDiagnosticStore = create<DiagnosticState>()(
  persist(
    (set) => ({
      name: "",
      email: "",
      answers: {},
      hydrated: false,
      setHydrated: (hydrated) => set({ hydrated }),
      setName: (name) => set({ name }),
      setEmail: (email) => set({ email }),
      setAnswer: (order, answer) => set((state) => ({ answers: { ...state.answers, [order]: answer } })),
      reset: () => set({ name: "", email: "", answers: {} }),
    }),
    {
      name: "pr-diagnostic",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({ name: state.name, email: state.email, answers: state.answers }),
      onRehydrateStorage: () => (state) => state?.setHydrated(true),
    },
  ),
);
