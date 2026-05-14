import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getCategoryProgress, getProgressOverview } from "@/features/progress/queries";
import { getRequestLang } from "@/lib/i18n/request-lang";
import { uiStrings } from "@/lib/i18n/ui-strings";
import { categoryLabels } from "@/types/interview";

function formatQuizMode(mode: string, u: ReturnType<typeof uiStrings>) {
  if (mode === "random") return u.progress.quizModes.random;
  if (mode === "weak") return u.progress.quizModes.weak;
  if (mode === "category") return u.progress.quizModes.category;
  return mode;
}

export default async function ProgressPage() {
  const lang = await getRequestLang();
  const u = uiStrings(lang);
  const [overview, categoryRows] = await Promise.all([getProgressOverview(), getCategoryProgress()]);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-muted-foreground">{u.progress.kicker}</p>
        <h1 className="text-3xl font-semibold tracking-tight">{u.progress.title}</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        <Metric label={u.progress.completion} value={`${overview.completion}%`} />
        <Metric label={u.progress.known} value={`${overview.known}/${overview.total}`} />
        <Metric label={u.progress.saved} value={String(overview.favorites)} />
        <Metric label={u.progress.practiceDays} value={String(overview.streakDays.length)} />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{u.progress.categoryProgress}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          {categoryRows.map((item) => (
            <div key={item.category} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{categoryLabels[item.category][lang]}</span>
                <span className="text-muted-foreground">
                  {item.known}/{item.total}
                </span>
              </div>
              <Progress value={item.completion} />
            </div>
          ))}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>{u.progress.recentQuiz}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-2 text-sm text-muted-foreground">
          {overview.attempts.length ? (
            overview.attempts.map((attempt) => (
              <div key={attempt.id} className="flex justify-between rounded-xl bg-muted p-3">
                <span>{formatQuizMode(attempt.mode, u)}</span>
                <span>
                  {attempt.correctCount}/{attempt.totalQuestions} {u.progress.correct}
                </span>
              </div>
            ))
          ) : (
            <p>{u.progress.noAttempts}</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <Card>
      <CardContent className="p-5">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="mt-2 text-3xl font-semibold">{value}</p>
      </CardContent>
    </Card>
  );
}
