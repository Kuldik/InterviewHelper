import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { QuestionSearch } from "@/features/questions/question-search";
import { getQuestionSummaries, getRecentQuestions } from "@/features/questions/queries";
import { getProgressOverview, getWeakAreas } from "@/features/progress/queries";
import { getRequestLang } from "@/lib/i18n/request-lang";
import { uiStrings } from "@/lib/i18n/ui-strings";
import { categories, categoryLabels } from "@/types/interview";

export default async function HomePage() {
  const lang = await getRequestLang();
  const u = uiStrings(lang);

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
          <div className="inline-flex rounded-full border px-3 py-1 text-sm text-muted-foreground">{u.home.kicker}</div>
          <div className="space-y-4">
            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight sm:text-6xl">{u.home.heroTitle}</h1>
            <p className="max-w-2xl text-lg text-muted-foreground">{u.home.heroSubtitle}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/questions">{u.home.explore}</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/quiz">{u.home.startQuiz}</Link>
            </Button>
          </div>
        </div>
        <Card className="bg-background/60">
          <CardHeader>
            <CardTitle>{u.home.today}</CardTitle>
            <CardDescription>{u.home.todayDesc}</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 text-sm text-muted-foreground">
            <div className="flex justify-between rounded-xl bg-muted p-3">
              <span>{u.home.dailyStreak}</span>
              <strong className="text-foreground">
                {overview.streakDays.length} {u.home.streakDays}
              </strong>
            </div>
            <div className="flex justify-between rounded-xl bg-muted p-3">
              <span>{u.home.weakTopics}</span>
              <strong className="text-foreground">{weakAreas.length}</strong>
            </div>
            <div className="flex justify-between rounded-xl bg-muted p-3">
              <span>{u.home.saved}</span>
              <strong className="text-foreground">{overview.favorites}</strong>
            </div>
          </CardContent>
        </Card>
      </section>
      <section className="grid gap-4 md:grid-cols-4">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>{u.home.progressTitle}</CardTitle>
            <CardDescription>{u.home.progressKnown(overview.known, overview.total)}</CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={overview.completion} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{u.home.continue}</CardTitle>
            <CardDescription>{u.home.continueDesc}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" asChild>
              <Link href="/quiz?mode=weak">{u.home.weakCta}</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{u.home.database}</CardTitle>
            <CardDescription>{u.home.databaseDesc(questions.length)}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline" asChild>
              <Link href="/questions">{u.home.openSearch}</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
      <section className="space-y-4">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{u.home.quickSearch}</p>
            <h2 className="text-2xl font-semibold tracking-tight">{u.home.quickSearchTitle}</h2>
          </div>
        </div>
        <QuestionSearch questions={questions.slice(0, 24)} />
      </section>
      <section className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>{u.home.topics}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Link key={category} href={`/topics/${category}`}>
                <Badge variant="outline">{categoryLabels[category][lang]}</Badge>
              </Link>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{u.home.recentTitle}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recent.map((question) => (
              <Link
                key={question.id}
                href={`/questions/${question.id}`}
                className="block text-sm text-muted-foreground hover:text-foreground"
              >
                {question.question[lang]}
              </Link>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
