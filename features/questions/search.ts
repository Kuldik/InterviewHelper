import type { Language, QuestionCategory, QuestionDifficulty, QuestionSummary } from "@/types/interview";

export type QuestionFilters = {
  query: string;
  language: Language;
  category: QuestionCategory | "all";
  difficulty: QuestionDifficulty | "all";
  favoritesOnly: boolean;
};

function normalize(value: string) {
  return value.toLocaleLowerCase().replaceAll("ё", "е").trim();
}

export function searchQuestions(questions: QuestionSummary[], filters: QuestionFilters) {
  const query = normalize(filters.query);
  const tokens = query.split(/\s+/).filter(Boolean);

  return questions.filter((question) => {
    if (filters.category !== "all" && question.category !== filters.category) return false;
    if (filters.difficulty !== "all" && question.difficulty !== filters.difficulty) return false;
    if (filters.favoritesOnly && !question.isFavorite) return false;
    if (!tokens.length) return true;

    const haystack = normalize(
      [
        question.question.ru,
        question.question.en,
        question.shortAnswer.ru,
        question.shortAnswer.en,
        question.category,
        question.difficulty,
        ...question.tags,
        ...question.keywords
      ].join(" ")
    );

    return tokens.every((token) => haystack.includes(token));
  });
}
