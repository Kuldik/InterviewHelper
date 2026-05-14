import { PrismaClient } from "@prisma/client";

import { interviewQuestions } from "../data/questions/seed";

const prisma = new PrismaClient();

async function main() {
  for (const question of interviewQuestions) {
    await prisma.question.upsert({
      where: { id: question.id },
      update: {
        category: question.category,
        difficulty: question.difficulty,
        tags: question.tags,
        frequencyScore: question.frequencyScore,
        question: question.question,
        shortAnswer: question.shortAnswer,
        detailedAnswer: question.detailedAnswer,
        followUpQuestion: question.followUpQuestion,
        followUpAnswer: question.followUpAnswer,
        interviewerExpectation: question.interviewerExpectation,
        commonMistakes: question.commonMistakes,
        keywords: question.keywords,
        relatedQuestions: question.relatedQuestions
      },
      create: {
        id: question.id,
        category: question.category,
        difficulty: question.difficulty,
        tags: question.tags,
        frequencyScore: question.frequencyScore,
        question: question.question,
        shortAnswer: question.shortAnswer,
        detailedAnswer: question.detailedAnswer,
        followUpQuestion: question.followUpQuestion,
        followUpAnswer: question.followUpAnswer,
        interviewerExpectation: question.interviewerExpectation,
        commonMistakes: question.commonMistakes,
        keywords: question.keywords,
        relatedQuestions: question.relatedQuestions
      }
    });
  }

  console.log(`Seeded ${interviewQuestions.length} interview questions.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
