import { prisma } from "@/lib/prisma";
import { mapQuestionRecord } from "@/lib/question-mapper";
import type { InterviewQuestion, ProgressState, QuestionCategory, QuestionSummary } from "@/types/interview";

export async function getQuestionSummaries(): Promise<QuestionSummary[]> {
  const questions = await prisma.question.findMany({
    include: {
      favorite: true,
      progress: true
    },
    orderBy: [{ frequencyScore: "desc" }, { id: "asc" }]
  });

  return questions.map((record) => {
    const question = mapQuestionRecord(record);

    return {
      id: question.id,
      category: question.category,
      difficulty: question.difficulty,
      tags: question.tags,
      frequencyScore: question.frequencyScore,
      question: question.question,
      shortAnswer: question.shortAnswer,
      keywords: question.keywords,
      isFavorite: Boolean(record.favorite),
      progressState: (record.progress?.state ?? "new") as ProgressState
    };
  });
}

export async function getQuestionById(id: string): Promise<InterviewQuestion | null> {
  const question = await prisma.question.findUnique({
    where: { id }
  });

  return question ? mapQuestionRecord(question) : null;
}

export async function getQuestionDetail(id: string) {
  const record = await prisma.question.findUnique({
    where: { id },
    include: {
      favorite: true,
      progress: true
    }
  });

  if (!record) {
    return null;
  }

  const question = mapQuestionRecord(record);
  const related = question.relatedQuestions.length
    ? await prisma.question.findMany({
        where: { id: { in: question.relatedQuestions } },
        take: 6
      })
    : await prisma.question.findMany({
        where: {
          category: question.category,
          id: { not: question.id }
        },
        orderBy: { frequencyScore: "desc" },
        take: 4
      });

  return {
    question,
    related: related.map(mapQuestionRecord),
    isFavorite: Boolean(record.favorite),
    progressState: (record.progress?.state ?? "new") as ProgressState
  };
}

export async function getQuestionsByCategory(category: QuestionCategory) {
  const questions = await prisma.question.findMany({
    where: { category },
    include: {
      favorite: true,
      progress: true
    },
    orderBy: [{ frequencyScore: "desc" }, { id: "asc" }]
  });

  return questions.map((record) => {
    const question = mapQuestionRecord(record);
    return {
      id: question.id,
      category: question.category,
      difficulty: question.difficulty,
      tags: question.tags,
      frequencyScore: question.frequencyScore,
      question: question.question,
      shortAnswer: question.shortAnswer,
      keywords: question.keywords,
      isFavorite: Boolean(record.favorite),
      progressState: (record.progress?.state ?? "new") as ProgressState
    };
  });
}

export async function getRecentQuestions(limit = 6) {
  const questions = await prisma.question.findMany({
    orderBy: { frequencyScore: "desc" },
    take: limit
  });

  return questions.map(mapQuestionRecord);
}
