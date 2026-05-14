import type { InterviewQuestion, Language, QuizQuestion } from "@/types/interview";

function shuffle<T>(items: T[]) {
  return [...items].sort(() => Math.random() - 0.5);
}

export function buildQuizQuestions(questions: InterviewQuestion[], language: Language, limit = 10): QuizQuestion[] {
  const pool = shuffle(questions).slice(0, limit);

  return pool.map((question) => {
    const distractors = shuffle(
      questions
        .filter((item) => item.id !== question.id && item.category === question.category)
        .map((item) => item.shortAnswer)
    ).slice(0, 3);

    const fallback = shuffle(questions.filter((item) => item.id !== question.id).map((item) => item.shortAnswer)).slice(
      0,
      3 - distractors.length
    );

    const variants = shuffle([question.shortAnswer, ...distractors, ...fallback]).slice(0, 4);
    const correctIndex = variants.findIndex((variant) => variant[language] === question.shortAnswer[language]);

    return {
      questionId: question.id,
      prompt: question.question,
      variants,
      correctIndex: correctIndex >= 0 ? correctIndex : 0
    };
  });
}

export function scoreQuiz(answers: { selectedIndex: number | null; correctIndex: number }[]) {
  const correct = answers.filter((answer) => answer.selectedIndex === answer.correctIndex).length;
  const skipped = answers.filter((answer) => answer.selectedIndex === null).length;

  return {
    correct,
    skipped,
    total: answers.length,
    percent: answers.length ? Math.round((correct / answers.length) * 100) : 0
  };
}
