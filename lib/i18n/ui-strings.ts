import type { Language } from "@/types/interview";

export type UiStrings = typeof uiEn;

const uiEn = {
  nav: {
    questions: "Questions",
    quiz: "Quiz",
    weakAreas: "Weak areas",
    progress: "Progress",
    startPractice: "Start practice",
    brand: "Interview Helper"
  },
  home: {
    kicker: "Frontend interview retrieval system",
    heroTitle: "Prepare answers that survive interview stress.",
    heroSubtitle:
      "Practice concise answers, follow-ups, weak topics, and quizzes for React, JavaScript, TypeScript, browser APIs, CSS, networking, performance, and architecture.",
    explore: "Explore questions",
    startQuiz: "Start quiz",
    today: "Today",
    todayDesc: "Small daily retrieval beats passive reading.",
    dailyStreak: "Daily streak",
    weakTopics: "Weak topics",
    saved: "Saved questions",
    streakDays: "days",
    progressTitle: "Progress overview",
    progressKnown: (known: number, total: number) => `${known}/${total} questions marked as known.`,
    continue: "Continue",
    continueDesc: "Jump into adaptive recall.",
    weakCta: "Practice weak topics",
    database: "Database",
    databaseDesc: (n: number) => `${n} seeded questions.`,
    openSearch: "Open search",
    quickSearch: "Quick search",
    quickSearchTitle: "Find an answer under pressure",
    topics: "Topics",
    recentTitle: "Recent high-frequency questions"
  },
  questions: {
    kicker: "Question database",
    title: "High-frequency frontend questions"
  },
  topics: {
    kicker: "Topic",
    title: (label: string) => label
  },
  quiz: {
    title: "Quiz",
    mode: "Mode",
    modeDesc: "Fast recall. Four plausible wrong answers. Review mistakes.",
    random: "Random",
    weakTopics: "Weak topics",
    categories: "Categories",
    recentAttempts: "Recent attempts",
    noAttempts: "No attempts yet."
  },
  weakAreas: {
    kicker: "Weak areas",
    title: "Where recall breaks first",
    failed: "Failed",
    skipped: "Skipped",
    practiced: "Practiced",
    empty: "No weak topics yet. Finish a quiz or mark questions as failed/skipped."
  },
  progress: {
    kicker: "Progress",
    title: "Interview readiness dashboard",
    completion: "Completion",
    known: "Known",
    saved: "Saved",
    practiceDays: "Practice days",
    categoryProgress: "Category progress",
    recentQuiz: "Recent quiz attempts",
    noAttempts: "No attempts yet.",
    correct: "correct",
    quizModes: {
      random: "Random",
      category: "Category",
      weak: "Weak topics"
    }
  },
  questionDetail: {
    shortAnswer: "Short answer",
    detailedAnswer: "Detailed answer",
    followUp: "Follow-up",
    interviewerExpects: "Interviewer expects",
    commonMistakes: "Common mistakes",
    relatedQuestions: "Related questions",
    frequency: (n: number) => `Frequency ${n}`
  },
  search: {
    placeholder: "Search questions, tags, keywords…",
    allTopics: "All topics",
    allLevels: "All levels",
    savedOnly: "Saved only",
    allSaved: "All questions",
    results: (n: number) => (n === 1 ? "1 question" : `${n} questions`)
  },
  actions: {
    known: "Known",
    needPractice: "Need practice",
    failed: "Failed",
    save: "Save",
    saved: "Saved",
    skipped: "Skipped",
    newLabel: "New",
    toastMarked: (state: string) => `Marked as ${state}`,
    toastSaved: "Saved question",
    toastRemoved: "Removed from saved"
  },
  quizRunner: {
    noQuestions: "No questions yet",
    noQuestionsHint: "Seed the database or pick another mode.",
    sessionComplete: "Session complete",
    score: "Score",
    correct: "Correct",
    skipped: "Skipped",
    saving: "Saving…",
    done: "Done",
    saveStatus: "Save status",
    questionProgress: (i: number, total: number) => `Question ${i} of ${total}`,
    skip: "Skip",
    correctLabel: "Correct:",
    toastSaved: "Quiz saved"
  }
};

const uiRu: UiStrings = {
  nav: {
    questions: "Вопросы",
    quiz: "Квиз",
    weakAreas: "Слабые места",
    progress: "Прогресс",
    startPractice: "Тренировка",
    brand: "Interview Helper"
  },
  home: {
    kicker: "Система извлечения ответов для фронтенд-собесов",
    heroTitle: "Ответы, которые не ломаются под стрессом собеседования.",
    heroSubtitle:
      "Короткие ответы, уточнения, слабые темы и квизы: React, JavaScript, TypeScript, браузер, CSS, сеть, производительность, архитектура.",
    explore: "К базе вопросов",
    startQuiz: "Квиз",
    today: "Сегодня",
    todayDesc: "Короткая ежедневная практика сильнее пассивного чтения.",
    dailyStreak: "Стрик",
    weakTopics: "Слабые темы",
    saved: "Сохранено",
    streakDays: "дн.",
    progressTitle: "Общий прогресс",
    progressKnown: (known: number, total: number) => `Знаю: ${known} из ${total} вопросов.`,
    continue: "Продолжить",
    continueDesc: "Адаптивное повторение.",
    weakCta: "Слабые темы",
    database: "База",
    databaseDesc: (n: number) => `В базе ${n} вопросов.`,
    openSearch: "Поиск",
    quickSearch: "Быстрый поиск",
    quickSearchTitle: "Найти формулировку под давлением",
    topics: "Темы",
    recentTitle: "Частые вопросы"
  },
  questions: {
    kicker: "База вопросов",
    title: "Частые фронтенд-вопросы"
  },
  topics: {
    kicker: "Тема",
    title: (label: string) => label
  },
  quiz: {
    title: "Квиз",
    mode: "Режим",
    modeDesc: "Быстрое вспоминание. Четыре правдоподобных неверных варианта. Разбор ошибок.",
    random: "Случайно",
    weakTopics: "Слабые темы",
    categories: "Категории",
    recentAttempts: "Последние попытки",
    noAttempts: "Пока нет попыток."
  },
  weakAreas: {
    kicker: "Слабые места",
    title: "Где провалы по памяти случаются первыми",
    failed: "Ошибок",
    skipped: "Пропусков",
    practiced: "Практик",
    empty: "Пока нет слабых тем. Пройдите квиз или отметьте вопросы как ошибка/пропуск."
  },
  progress: {
    kicker: "Прогресс",
    title: "Готовность к собеседованиям",
    completion: "Покрытие",
    known: "Знаю",
    saved: "Сохранено",
    practiceDays: "Дней практики",
    categoryProgress: "По категориям",
    recentQuiz: "Последние квизы",
    noAttempts: "Пока нет попыток.",
    correct: "верно",
    quizModes: {
      random: "Случайно",
      category: "Категория",
      weak: "Слабые темы"
    }
  },
  questionDetail: {
    shortAnswer: "Короткий ответ",
    detailedAnswer: "Развёрнутый ответ",
    followUp: "Уточнение",
    interviewerExpects: "Ожидание интервьюера",
    commonMistakes: "Типичные ошибки",
    relatedQuestions: "Связанные вопросы",
    frequency: (n: number) => `Частота ${n}`
  },
  search: {
    placeholder: "Поиск по вопросам, тегам, ключевым словам…",
    allTopics: "Все темы",
    allLevels: "Все уровни",
    savedOnly: "Только сохранённые",
    allSaved: "Все вопросы",
    results: (n: number) => {
      const mod10 = n % 10;
      const mod100 = n % 100;
      if (mod10 === 1 && mod100 !== 11) return `${n} вопрос`;
      if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return `${n} вопроса`;
      return `${n} вопросов`;
    }
  },
  actions: {
    known: "Знаю",
    needPractice: "Нужна практика",
    failed: "Ошибка",
    save: "Сохранить",
    saved: "Сохранено",
    skipped: "Пропуск",
    newLabel: "Новый",
    toastMarked: (state: string) => `Отмечено: ${state}`,
    toastSaved: "Вопрос сохранён",
    toastRemoved: "Убрано из сохранённых"
  },
  quizRunner: {
    noQuestions: "Нет вопросов",
    noQuestionsHint: "Заполните базу или выберите другой режим.",
    sessionComplete: "Сессия завершена",
    score: "Результат",
    correct: "Верно",
    skipped: "Пропуски",
    saving: "Сохранение…",
    done: "Готово",
    saveStatus: "Статус сохранения",
    questionProgress: (i: number, total: number) => `Вопрос ${i} из ${total}`,
    skip: "Пропустить",
    correctLabel: "Верно:",
    toastSaved: "Квиз сохранён"
  }
};

export function uiStrings(lang: Language): UiStrings {
  return lang === "ru" ? uiRu : uiEn;
}
