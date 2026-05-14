import { prisma } from "@/lib/prisma";
import type { QuestionCategory } from "@/types/interview";

export type CategoryProgress = {
  category: QuestionCategory;
  total: number;
  known: number;
  failed: number;
  skipped: number;
  completion: number;
};

export async function getProgressOverview() {
  const [total, known, favorites, attempts, streakDays] = await Promise.all([
    prisma.question.count(),
    prisma.questionProgress.count({ where: { state: "known" } }),
    prisma.favoriteQuestion.count(),
    prisma.quizAttempt.findMany({ orderBy: { completedAt: "desc" }, take: 5 }),
    prisma.streakDay.findMany({ orderBy: { date: "desc" }, take: 30 })
  ]);

  return {
    total,
    known,
    favorites,
    attempts,
    streakDays,
    completion: total ? Math.round((known / total) * 100) : 0
  };
}

export async function getWeakAreas() {
  const progress = await prisma.questionProgress.findMany({
    include: { question: true },
    where: {
      OR: [{ failedCount: { gt: 0 } }, { skippedCount: { gt: 0 } }, { state: "unknown" }]
    },
    orderBy: [{ failedCount: "desc" }, { skippedCount: "desc" }],
    take: 20
  });

  return progress.map((item) => ({
    questionId: item.questionId,
    category: item.question.category as QuestionCategory,
    title: item.question.question as { ru: string; en: string },
    state: item.state,
    failedCount: item.failedCount,
    skippedCount: item.skippedCount,
    practicedCount: item.practicedCount
  }));
}

export async function getCategoryProgress(): Promise<CategoryProgress[]> {
  const questions = await prisma.question.findMany({
    include: { progress: true }
  });

  const grouped = new Map<QuestionCategory, CategoryProgress>();

  for (const question of questions) {
    const category = question.category as QuestionCategory;
    const current =
      grouped.get(category) ??
      ({
        category,
        total: 0,
        known: 0,
        failed: 0,
        skipped: 0,
        completion: 0
      } satisfies CategoryProgress);

    current.total += 1;
    if (question.progress?.state === "known") current.known += 1;
    current.failed += question.progress?.failedCount ?? 0;
    current.skipped += question.progress?.skippedCount ?? 0;
    current.completion = current.total ? Math.round((current.known / current.total) * 100) : 0;
    grouped.set(category, current);
  }

  return Array.from(grouped.values()).sort((a, b) => a.category.localeCompare(b.category));
}
