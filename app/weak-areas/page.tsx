import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getWeakAreas } from "@/features/progress/queries";
import { categoryLabels } from "@/types/interview";

export default async function WeakAreasPage() {
  const weakAreas = await getWeakAreas();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-muted-foreground">Weak Areas</p>
        <h1 className="text-3xl font-semibold tracking-tight">Where recall breaks first</h1>
      </div>
      <div className="grid gap-4">
        {weakAreas.length ? (
          weakAreas.map((item) => (
            <Link key={item.questionId} href={`/questions/${item.questionId}`}>
              <Card className="transition-colors hover:bg-muted/30">
                <CardHeader className="flex flex-row items-start justify-between gap-4">
                  <div className="space-y-2">
                    <Badge>{categoryLabels[item.category].en}</Badge>
                    <CardTitle className="text-base">{item.title.en}</CardTitle>
                    <p className="text-sm text-muted-foreground">{item.title.ru}</p>
                  </div>
                  <div className="text-right text-sm text-muted-foreground">
                    <p>Failed: {item.failedCount}</p>
                    <p>Skipped: {item.skippedCount}</p>
                    <p>Practiced: {item.practicedCount}</p>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))
        ) : (
          <Card>
            <CardContent className="p-8 text-muted-foreground">
              No weak topics yet. Finish a quiz or mark questions as failed/skipped.
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
