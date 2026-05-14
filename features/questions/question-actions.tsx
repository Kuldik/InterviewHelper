"use client";

import { useTransition } from "react";
import { CheckCircle2, HelpCircle, Star, XCircle } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { setQuestionProgress, toggleFavorite } from "@/features/progress/actions";
import { useProgressStore } from "@/stores/progress-store";
import type { ProgressState } from "@/types/interview";

export function QuestionActions({
  questionId,
  progressState,
  isFavorite
}: {
  questionId: string;
  progressState: ProgressState;
  isFavorite: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const setOptimisticProgress = useProgressStore((state) => state.setProgress);
  const setOptimisticFavorite = useProgressStore((state) => state.setFavorite);
  const optimisticFavorite = useProgressStore((state) => state.optimisticFavorites[questionId]);
  const currentFavorite = optimisticFavorite ?? isFavorite;

  function mark(state: ProgressState) {
    setOptimisticProgress(questionId, state);
    startTransition(async () => {
      await setQuestionProgress(questionId, state);
      toast.success(`Marked as ${state}`);
    });
  }

  function favorite() {
    setOptimisticFavorite(questionId, !currentFavorite);
    startTransition(async () => {
      await toggleFavorite(questionId);
      toast.success(currentFavorite ? "Removed from saved" : "Saved question");
    });
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button disabled={isPending} onClick={() => mark("known")} variant={progressState === "known" ? "default" : "outline"}>
        <CheckCircle2 className="h-4 w-4" />
        Known
      </Button>
      <Button disabled={isPending} onClick={() => mark("unknown")} variant="outline">
        <HelpCircle className="h-4 w-4" />
        Need practice
      </Button>
      <Button disabled={isPending} onClick={() => mark("failed")} variant="outline">
        <XCircle className="h-4 w-4" />
        Failed
      </Button>
      <Button disabled={isPending} onClick={favorite} variant={currentFavorite ? "default" : "outline"}>
        <Star className={currentFavorite ? "h-4 w-4 fill-current" : "h-4 w-4"} />
        {currentFavorite ? "Saved" : "Save"}
      </Button>
    </div>
  );
}
