import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getCategoryProgress, getProgressOverview } from "@/features/progress/queries";
import { categoryLabels } from "@/types/interview";

export default async function ProgressPage() {
  const [overview, categories] = await Promise.all([getProgressOverview(), getCategoryProgress()]);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-muted-foreground">Progress</p>
        <h1 className="text-3xl font-semibold tracking-tight">Interview readiness dashboard</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        <Metric label="Completion" value={`${overview.completion}%`} />
        <Metric label="Known" value={`${overview.known}/${overview.total}`} />
        <Metric label="Saved" value={String(overview.favorites)} />
        <Metric label="Practice days" value={String(overview.streakDays.length)} />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Category progress</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          {categories.map((item) => (
            <div key={item.category} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{categoryLabels[item.category].en}</span>
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
          <CardTitle>Recent quiz attempts</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-2 text-sm text-muted-foreground">
          {overview.attempts.length ? (
            overview.attempts.map((attempt) => (
              <div key={attempt.id} className="flex justify-between rounded-xl bg-muted p-3">
                <span>{attempt.mode}</span>
                <span>
                  {attempt.correctCount}/{attempt.totalQuestions} correct
                </span>
              </div>
            ))
          ) : (
            <p>No attempts yet.</p>
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
