"use server";

import { revalidatePath } from "next/cache";

import { touchStreak } from "@/features/progress/actions";
import { prisma } from "@/lib/prisma";
import type { Language, QuizMode, QuestionCategory } from "@/types/interview";

export type SubmitQuizAnswer = {
  questionId: string;
  selectedIndex: number | null;
  correctIndex: number;
};

export async function submitQuizAttempt(input: {
  mode: QuizMode;
  category?: QuestionCategory;
  language: Language;
  durationMs: number;
  answers: SubmitQuizAnswer[];
}) {
  const correctCount = input.answers.filter((answer) => answer.selectedIndex === answer.correctIndex).length;
  const skippedCount = input.answers.filter((answer) => answer.selectedIndex === null).length;

  await prisma.quizAttempt.create({
    data: {
      mode: input.mode,
      category: input.category,
      language: input.language,
      totalQuestions: input.answers.length,
      correctCount,
      skippedCount,
      durationMs: input.durationMs,
      answers: {
        create: input.answers.map((answer) => ({
          questionId: answer.questionId,
          selectedIndex: answer.selectedIndex,
          correctIndex: answer.correctIndex,
          isCorrect: answer.selectedIndex === answer.correctIndex,
          isSkipped: answer.selectedIndex === null
        }))
      }
    }
  });

  for (const answer of input.answers) {
    await prisma.questionProgress.upsert({
      where: { questionId: answer.questionId },
      update: {
        practicedCount: { increment: 1 },
        lastPracticedAt: new Date(),
        state: answer.selectedIndex === answer.correctIndex ? "known" : answer.selectedIndex === null ? "skipped" : "failed",
        knownCount: answer.selectedIndex === answer.correctIndex ? { increment: 1 } : undefined,
        skippedCount: answer.selectedIndex === null ? { increment: 1 } : undefined,
        failedCount:
          answer.selectedIndex !== null && answer.selectedIndex !== answer.correctIndex ? { increment: 1 } : undefined
      },
      create: {
        questionId: answer.questionId,
        practicedCount: 1,
        lastPracticedAt: new Date(),
        state: answer.selectedIndex === answer.correctIndex ? "known" : answer.selectedIndex === null ? "skipped" : "failed",
        knownCount: answer.selectedIndex === answer.correctIndex ? 1 : 0,
        skippedCount: answer.selectedIndex === null ? 1 : 0,
        failedCount: answer.selectedIndex !== null && answer.selectedIndex !== answer.correctIndex ? 1 : 0
      }
    });
  }

  await touchStreak(true);
  revalidatePath("/");
  revalidatePath("/quiz");
  revalidatePath("/weak-areas");
  revalidatePath("/progress");
}
