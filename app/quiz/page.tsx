import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LanguageSwitcher } from "@/features/questions/language-switcher";
import { getQuizPool, getRecentAttempts } from "@/features/quiz/queries";
import { QuizRunner } from "@/features/quiz/quiz-runner";
import { categories, categoryLabels, type QuestionCategory, type QuizMode } from "@/types/interview";

export default async function QuizPage({
  searchParams
}: {
  searchParams: Promise<{ mode?: string; category?: string }>;
}) {
  const params = await searchParams;
  const mode = parseMode(params.mode);
  const category = categories.includes(params.category as QuestionCategory)
    ? (params.category as QuestionCategory)
    : undefined;
  const [questions, attempts] = await Promise.all([getQuizPool(mode, category), getRecentAttempts()]);

  return (
    <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
      <aside className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold tracking-tight">Quiz</h1>
          <LanguageSwitcher />
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Mode</CardTitle>
            <CardDescription>Fast recall. Four variants. Review mistakes.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2">
            <Button variant={mode === "random" ? "default" : "outline"} asChild>
              <Link href="/quiz?mode=random">Random</Link>
            </Button>
            <Button variant={mode === "weak" ? "default" : "outline"} asChild>
              <Link href="/quiz?mode=weak">Weak topics</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Categories</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {categories.map((item) => (
              <Link key={item} href={`/quiz?mode=category&category=${item}`}>
                <Badge variant={category === item ? "default" : "outline"}>{categoryLabels[item].en}</Badge>
              </Link>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent attempts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            {attempts.length ? (
              attempts.map((attempt) => (
                <div key={attempt.id} className="flex justify-between rounded-lg bg-muted p-2">
                  <span>{attempt.mode}</span>
                  <span>
                    {attempt.correctCount}/{attempt.totalQuestions}
                  </span>
                </div>
              ))
            ) : (
              <p>No attempts yet.</p>
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
