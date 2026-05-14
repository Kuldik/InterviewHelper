import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomePage() {
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
            <CardDescription>Your practice cockpit will appear here after seeding.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 text-sm text-muted-foreground">
            <div className="flex justify-between rounded-xl bg-muted p-3">
              <span>Daily streak</span>
              <strong className="text-foreground">0 days</strong>
            </div>
            <div className="flex justify-between rounded-xl bg-muted p-3">
              <span>Weak topics</span>
              <strong className="text-foreground">Loading from DB</strong>
            </div>
            <div className="flex justify-between rounded-xl bg-muted p-3">
              <span>Saved questions</span>
              <strong className="text-foreground">0</strong>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
