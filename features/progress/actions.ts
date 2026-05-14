"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import type { ProgressState } from "@/types/interview";

const stateToCounter: Partial<Record<ProgressState, "knownCount" | "unknownCount" | "skippedCount" | "failedCount">> = {
  known: "knownCount",
  unknown: "unknownCount",
  skipped: "skippedCount",
  failed: "failedCount"
};

export async function setQuestionProgress(questionId: string, state: ProgressState) {
  const counter = stateToCounter[state];

  await prisma.questionProgress.upsert({
    where: { questionId },
    update: {
      state,
      practicedCount: { increment: 1 },
      lastPracticedAt: new Date(),
      ...(counter ? { [counter]: { increment: 1 } } : {})
    },
    create: {
      questionId,
      state,
      practicedCount: 1,
      lastPracticedAt: new Date(),
      ...(counter ? { [counter]: 1 } : {})
    }
  });

  await touchStreak();
  revalidatePath("/");
  revalidatePath("/questions");
  revalidatePath(`/questions/${questionId}`);
  revalidatePath("/weak-areas");
  revalidatePath("/progress");
}

export async function toggleFavorite(questionId: string) {
  const favorite = await prisma.favoriteQuestion.findUnique({
    where: { questionId }
  });

  if (favorite) {
    await prisma.favoriteQuestion.delete({ where: { questionId } });
  } else {
    await prisma.favoriteQuestion.create({ data: { questionId } });
  }

  revalidatePath("/");
  revalidatePath("/questions");
  revalidatePath(`/questions/${questionId}`);
}

export async function touchStreak(completedQuiz = false) {
  const date = new Date().toISOString().slice(0, 10);

  await prisma.streakDay.upsert({
    where: { date },
    update: {
      practicedCount: { increment: 1 },
      completedQuiz: completedQuiz ? true : undefined
    },
    create: {
      date,
      practicedCount: 1,
      completedQuiz
    }
  });
}
