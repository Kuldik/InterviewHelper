import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { QuestionSearch } from "@/features/questions/question-search";
import { getQuestionSummaries, getRecentQuestions } from "@/features/questions/queries";
import { getProgressOverview, getWeakAreas } from "@/features/progress/queries";
import { categories, categoryLabels } from "@/types/interview";

export default async function HomePage() {
  const [questions, recent, overview, weakAreas] = await Promise.all([
    getQuestionSummaries(),
    getRecentQuestions(5),
    getProgressOverview(),
    getWeakAreas()
  ]);

  return (
    <div className="space-y-8">
      <section className="grid gap-8 rounded-3xl border bg-card p-8 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="space-y-6">
          <div className="inline-flex rounded-full border px-3 py-1 text-sm text-muted-foreground">
            Frontend interview retrieval system
          </div>
          <div className="space-y-4">
            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight sm:text-6xl">
              Prepare answers that survive interview stress.
            </h1>
            <p className="max-w-2xl text-lg text-muted-foreground">
              Practice concise bilingual answers, follow-ups, weak topics, and quiz sessions for
              React, JavaScript, TypeScript, browser APIs, CSS, networking, performance, and
              architecture.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/questions">Explore questions</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/quiz">Start quiz</Link>
            </Button>
          </div>
        </div>
        <Card className="bg-background/60">
          <CardHeader>
            <CardTitle>Today</CardTitle>
            <CardDescription>Small daily retrieval beats passive reading.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 text-sm text-muted-foreground">
            <div className="flex justify-between rounded-xl bg-muted p-3">
              <span>Daily streak</span>
              <strong className="text-foreground">{overview.streakDays.length} days</strong>
            </div>
            <div className="flex justify-between rounded-xl bg-muted p-3">
              <span>Weak topics</span>
              <strong className="text-foreground">{weakAreas.length}</strong>
            </div>
            <div className="flex justify-between rounded-xl bg-muted p-3">
              <span>Saved questions</span>
              <strong className="text-foreground">{overview.favorites}</strong>
            </div>
          </CardContent>
        </Card>
      </section>
      <section className="grid gap-4 md:grid-cols-4">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Progress overview</CardTitle>
            <CardDescription>
              {overview.known}/{overview.total} questions marked as known.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={overview.completion} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Continue</CardTitle>
            <CardDescription>Jump into adaptive recall.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" asChild>
              <Link href="/quiz?mode=weak">Practice weak topics</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Database</CardTitle>
            <CardDescription>{questions.length} seeded questions.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline" asChild>
              <Link href="/questions">Open search</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
      <section className="space-y-4">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Quick search</p>
            <h2 className="text-2xl font-semibold tracking-tight">Find an answer under pressure</h2>
          </div>
        </div>
        <QuestionSearch questions={questions.slice(0, 24)} />
      </section>
      <section className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Topics</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Link key={category} href={`/topics/${category}`}>
                <Badge variant="outline">{categoryLabels[category].en}</Badge>
              </Link>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent high-frequency questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recent.map((question) => (
              <Link key={question.id} href={`/questions/${question.id}`} className="block text-sm text-muted-foreground hover:text-foreground">
                {question.question.en}
              </Link>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
