"use client";

import Link from "next/link";
import { ArrowUpRight, Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useProgressStore } from "@/stores/progress-store";
import { categoryLabels, difficultyLabels, type Language, type QuestionSummary } from "@/types/interview";

export function QuestionCard({ question, language }: { question: QuestionSummary; language: Language }) {
  const optimisticProgress = useProgressStore((state) => state.optimisticProgress[question.id]);
  const optimisticFavorite = useProgressStore((state) => state.optimisticFavorites[question.id]);
  const state = optimisticProgress ?? question.progressState;
  const isFavorite = optimisticFavorite ?? question.isFavorite;

  return (
    <Link href={`/questions/${question.id}`}>
      <Card className="h-full transition-colors hover:border-accent/60 hover:bg-muted/30">
        <CardHeader className="space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              <Badge>{categoryLabels[question.category][language]}</Badge>
              <Badge variant="outline">{difficultyLabels[question.difficulty][language]}</Badge>
              {state !== "new" ? <Badge variant={state === "failed" ? "danger" : "secondary"}>{state}</Badge> : null}
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              {isFavorite ? <Star className="h-4 w-4 fill-current text-accent" /> : null}
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>
          <CardTitle className="line-clamp-2 text-base">{question.question[language]}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="line-clamp-3 text-sm text-muted-foreground">{question.shortAnswer[language]}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {question.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-xs text-muted-foreground">
                #{tag}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
