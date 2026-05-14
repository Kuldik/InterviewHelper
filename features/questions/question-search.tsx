"use client";

import { useMemo, useState } from "react";

import { Input } from "@/components/ui/input";
import { QuestionCard } from "@/features/questions/question-card";
import { searchQuestions } from "@/features/questions/search";
import { useLanguageStore } from "@/stores/language-store";
import {
  categories,
  categoryLabels,
  difficulties,
  difficultyLabels,
  type QuestionCategory,
  type QuestionDifficulty,
  type QuestionSummary
} from "@/types/interview";

export function QuestionSearch({ questions }: { questions: QuestionSummary[] }) {
  const language = useLanguageStore((state) => state.language);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<QuestionCategory | "all">("all");
  const [difficulty, setDifficulty] = useState<QuestionDifficulty | "all">("all");
  const [favoritesOnly, setFavoritesOnly] = useState(false);

  const results = useMemo(
    () => searchQuestions(questions, { query, language, category, difficulty, favoritesOnly }),
    [questions, query, language, category, difficulty, favoritesOnly]
  );

  return (
    <div className="space-y-5">
      <div className="grid gap-3 rounded-2xl border bg-card p-4 lg:grid-cols-[1fr_180px_180px_140px]">
        <Input
          placeholder={language === "ru" ? "Поиск по вопросам, тегам, ключевым словам..." : "Search questions, tags, keywords..."}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <select
          className="h-11 rounded-xl border bg-background px-3 text-sm"
          value={category}
          onChange={(event) => setCategory(event.target.value as QuestionCategory | "all")}
        >
          <option value="all">All topics</option>
          {categories.map((item) => (
            <option key={item} value={item}>
              {categoryLabels[item][language]}
            </option>
          ))}
        </select>
        <select
          className="h-11 rounded-xl border bg-background px-3 text-sm"
          value={difficulty}
          onChange={(event) => setDifficulty(event.target.value as QuestionDifficulty | "all")}
        >
          <option value="all">All levels</option>
          {difficulties.map((item) => (
            <option key={item} value={item}>
              {difficultyLabels[item][language]}
            </option>
          ))}
        </select>
        <button
          className="rounded-xl border px-3 text-sm transition-colors hover:bg-muted"
          onClick={() => setFavoritesOnly((current) => !current)}
        >
          {favoritesOnly ? "Saved only" : "All saved"}
        </button>
      </div>
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>{results.length} questions</span>
        <span>Instant RU/EN search</span>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {results.map((question) => (
          <QuestionCard key={question.id} question={question} language={language} />
        ))}
      </div>
    </div>
  );
}
