import { prisma } from "@/lib/prisma";
import { mapQuestionRecord } from "@/lib/question-mapper";
import type { QuestionCategory } from "@/types/interview";

export async function getQuizPool(mode: "random" | "category" | "weak", category?: QuestionCategory) {
  if (mode === "weak") {
    const weak = await prisma.questionProgress.findMany({
      where: {
        OR: [{ failedCount: { gt: 0 } }, { skippedCount: { gt: 0 } }, { state: "unknown" }]
      },
      include: { question: true },
      orderBy: [{ failedCount: "desc" }, { skippedCount: "desc" }],
      take: 20
    });

    if (weak.length) {
      return weak.map((item) => mapQuestionRecord(item.question));
    }
  }

  const questions = await prisma.question.findMany({
    where: mode === "category" && category ? { category } : undefined,
    orderBy: { frequencyScore: "desc" },
    take: 80
  });

  return questions.map(mapQuestionRecord);
}

export async function getRecentAttempts() {
  return prisma.quizAttempt.findMany({
    orderBy: { completedAt: "desc" },
    take: 8
  });
}
