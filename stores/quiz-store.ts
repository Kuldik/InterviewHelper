"use client";

import { create } from "zustand";

type QuizStore = {
  lastScore: number | null;
  setLastScore: (score: number) => void;
};

export const useQuizStore = create<QuizStore>((set) => ({
  lastScore: null,
  setLastScore: (score) => set({ lastScore: score })
}));
