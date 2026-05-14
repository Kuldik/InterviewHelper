"use client";

import { create } from "zustand";

import type { ProgressState } from "@/types/interview";

type ProgressStore = {
  optimisticProgress: Record<string, ProgressState>;
  optimisticFavorites: Record<string, boolean>;
  setProgress: (questionId: string, state: ProgressState) => void;
  setFavorite: (questionId: string, value: boolean) => void;
};

export const useProgressStore = create<ProgressStore>((set) => ({
  optimisticProgress: {},
  optimisticFavorites: {},
  setProgress: (questionId, state) =>
    set((current) => ({
      optimisticProgress: { ...current.optimisticProgress, [questionId]: state }
    })),
  setFavorite: (questionId, value) =>
    set((current) => ({
      optimisticFavorites: { ...current.optimisticFavorites, [questionId]: value }
    }))
}));
