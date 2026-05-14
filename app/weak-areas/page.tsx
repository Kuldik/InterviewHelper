import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getWeakAreas } from "@/features/progress/queries";
import { getRequestLang } from "@/lib/i18n/request-lang";
import { uiStrings } from "@/lib/i18n/ui-strings";
import { categoryLabels } from "@/types/interview";

export default async function WeakAreasPage() {
  const lang = await getRequestLang();
  const u = uiStrings(lang);
  const weakAreas = await getWeakAreas();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-muted-foreground">{u.weakAreas.kicker}</p>
        <h1 className="text-3xl font-semibold tracking-tight">{u.weakAreas.title}</h1>
      </div>
      <div className="grid gap-4">
        {weakAreas.length ? (
          weakAreas.map((item) => (
            <Link key={item.questionId} href={`/questions/${item.questionId}`}>
              <Card className="transition-colors hover:bg-muted/30">
                <CardHeader className="flex flex-row items-start justify-between gap-4">
                  <div className="space-y-2">
                    <Badge>{categoryLabels[item.category][lang]}</Badge>
                    <CardTitle className="text-base">{item.title[lang]}</CardTitle>
                  </div>
                  <div className="text-right text-sm text-muted-foreground">
                    <p>
                      {u.weakAreas.failed}: {item.failedCount}
                    </p>
                    <p>
                      {u.weakAreas.skipped}: {item.skippedCount}
                    </p>
                    <p>
                      {u.weakAreas.practiced}: {item.practicedCount}
                    </p>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))
        ) : (
          <Card>
            <CardContent className="p-8 text-muted-foreground">{u.weakAreas.empty}</CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
