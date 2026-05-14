import type { Question } from "@prisma/client";

import type { InterviewQuestion } from "@/types/interview";

export function mapQuestionRecord(question: Question): InterviewQuestion {
  return {
    id: question.id,
    category: question.category as InterviewQuestion["category"],
    difficulty: question.difficulty as InterviewQuestion["difficulty"],
    tags: question.tags as string[],
    frequencyScore: question.frequencyScore,
    question: question.question as InterviewQuestion["question"],
    shortAnswer: question.shortAnswer as InterviewQuestion["shortAnswer"],
    detailedAnswer: question.detailedAnswer as InterviewQuestion["detailedAnswer"],
    followUpQuestion: question.followUpQuestion as InterviewQuestion["followUpQuestion"],
    followUpAnswer: question.followUpAnswer as InterviewQuestion["followUpAnswer"],
    interviewerExpectation:
      question.interviewerExpectation as InterviewQuestion["interviewerExpectation"],
    commonMistakes: question.commonMistakes as InterviewQuestion["commonMistakes"],
    keywords: question.keywords as string[],
    relatedQuestions: question.relatedQuestions as string[]
  };
}
