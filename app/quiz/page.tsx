import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getQuizPool, getRecentAttempts } from "@/features/quiz/queries";
import { QuizRunner } from "@/features/quiz/quiz-runner";
import { getRequestLang } from "@/lib/i18n/request-lang";
import { uiStrings } from "@/lib/i18n/ui-strings";
import { categories, categoryLabels, type QuestionCategory, type QuizMode } from "@/types/interview";

function formatQuizMode(mode: string, u: ReturnType<typeof uiStrings>) {
  if (mode === "random") return u.progress.quizModes.random;
  if (mode === "weak") return u.progress.quizModes.weak;
  if (mode === "category") return u.progress.quizModes.category;
  return mode;
}

export default async function QuizPage({
  searchParams
}: {
  searchParams: Promise<{ mode?: string; category?: string }>;
}) {
  const lang = await getRequestLang();
  const u = uiStrings(lang);

  const params = await searchParams;
  const mode = parseMode(params.mode);
  const category = categories.includes(params.category as QuestionCategory)
    ? (params.category as QuestionCategory)
    : undefined;
  const [questions, attempts] = await Promise.all([getQuizPool(mode, category), getRecentAttempts()]);

  return (
    <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
      <aside className="space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight">{u.quiz.title}</h1>
        <Card>
          <CardHeader>
            <CardTitle>{u.quiz.mode}</CardTitle>
            <CardDescription>{u.quiz.modeDesc}</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2">
            <Button variant={mode === "random" ? "default" : "outline"} asChild>
              <Link href="/quiz?mode=random">{u.quiz.random}</Link>
            </Button>
            <Button variant={mode === "weak" ? "default" : "outline"} asChild>
              <Link href="/quiz?mode=weak">{u.quiz.weakTopics}</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{u.quiz.categories}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {categories.map((item) => (
              <Link key={item} href={`/quiz?mode=category&category=${item}`}>
                <Badge variant={category === item ? "default" : "outline"}>{categoryLabels[item][lang]}</Badge>
              </Link>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{u.quiz.recentAttempts}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            {attempts.length ? (
              attempts.map((attempt) => (
                <div key={attempt.id} className="flex justify-between rounded-lg bg-muted p-2">
                  <span>{formatQuizMode(attempt.mode, u)}</span>
                  <span>
                    {attempt.correctCount}/{attempt.totalQuestions}
                  </span>
                </div>
              ))
            ) : (
              <p>{u.quiz.noAttempts}</p>
            )}
          </CardContent>
        </Card>
      </aside>
      <QuizRunner questions={questions} mode={mode} category={category} />
    </div>
  );
}

function parseMode(value: string | undefined): QuizMode {
  if (value === "category" || value === "weak") return value;
  return "random";
}
