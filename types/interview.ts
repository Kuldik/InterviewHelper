export const categories = [
  "javascript",
  "react",
  "typescript",
  "browser",
  "css",
  "architecture",
  "performance",
  "networking"
] as const;

export const difficulties = ["junior", "junior_plus", "middle"] as const;

export const languages = ["ru", "en"] as const;

export type QuestionCategory = (typeof categories)[number];
export type QuestionDifficulty = (typeof difficulties)[number];
export type Language = (typeof languages)[number];

export type LocalizedText = Record<Language, string>;
export type LocalizedList = Record<Language, string[]>;

export type InterviewQuestion = {
  id: string;
  category: QuestionCategory;
  difficulty: QuestionDifficulty;
  tags: string[];
  frequencyScore: number;
  question: LocalizedText;
  shortAnswer: LocalizedText;
  detailedAnswer: LocalizedText;
  followUpQuestion: LocalizedText;
  followUpAnswer: LocalizedText;
  interviewerExpectation: LocalizedList;
  commonMistakes: LocalizedList;
  keywords: string[];
  relatedQuestions: string[];
};

export type QuestionSummary = Pick<
  InterviewQuestion,
  "id" | "category" | "difficulty" | "tags" | "frequencyScore" | "question" | "shortAnswer" | "keywords"
> & {
  isFavorite: boolean;
  progressState: ProgressState;
};

export type ProgressState = "new" | "known" | "unknown" | "skipped" | "failed";

export type QuizMode = "random" | "category" | "weak";

export type QuizQuestion = {
  questionId: string;
  prompt: LocalizedText;
  variants: LocalizedText[];
  correctIndex: number;
};

export const categoryLabels: Record<QuestionCategory, LocalizedText> = {
  javascript: { en: "JavaScript", ru: "JavaScript" },
  react: { en: "React", ru: "React" },
  typescript: { en: "TypeScript", ru: "TypeScript" },
  browser: { en: "Browser APIs", ru: "Browser APIs" },
  css: { en: "CSS", ru: "CSS" },
  architecture: { en: "Architecture", ru: "Архитектура" },
  performance: { en: "Performance", ru: "Производительность" },
  networking: { en: "Networking", ru: "Сеть" }
};

export const difficultyLabels: Record<QuestionDifficulty, LocalizedText> = {
  junior: { en: "Junior", ru: "Junior" },
  junior_plus: { en: "Junior+", ru: "Junior+" },
  middle: { en: "Middle", ru: "Middle" }
};
