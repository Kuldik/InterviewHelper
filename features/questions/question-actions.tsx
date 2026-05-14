"use client";

import { useTransition } from "react";
import { CheckCircle2, HelpCircle, Star, XCircle } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { setQuestionProgress, toggleFavorite } from "@/features/progress/actions";
import { useUi } from "@/lib/i18n/use-ui";
import { useProgressStore } from "@/stores/progress-store";
import type { ProgressState } from "@/types/interview";

function labelForState(state: ProgressState, u: ReturnType<typeof useUi>) {
  switch (state) {
    case "known":
      return u.actions.known;
    case "unknown":
      return u.actions.needPractice;
    case "failed":
      return u.actions.failed;
    case "skipped":
      return u.actions.skipped;
    case "new":
      return u.actions.newLabel;
    default:
      return state;
  }
}

export function QuestionActions({
  questionId,
  progressState,
  isFavorite
}: {
  questionId: string;
  progressState: ProgressState;
  isFavorite: boolean;
}) {
  const u = useUi();
  const [isPending, startTransition] = useTransition();
  const setOptimisticProgress = useProgressStore((state) => state.setProgress);
  const setOptimisticFavorite = useProgressStore((state) => state.setFavorite);
  const optimisticFavorite = useProgressStore((state) => state.optimisticFavorites[questionId]);
  const currentFavorite = optimisticFavorite ?? isFavorite;

  function mark(state: ProgressState) {
    setOptimisticProgress(questionId, state);
    startTransition(async () => {
      await setQuestionProgress(questionId, state);
      toast.success(u.actions.toastMarked(labelForState(state, u)));
    });
  }

  function favorite() {
    setOptimisticFavorite(questionId, !currentFavorite);
    startTransition(async () => {
      await toggleFavorite(questionId);
      toast.success(currentFavorite ? u.actions.toastRemoved : u.actions.toastSaved);
    });
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button disabled={isPending} onClick={() => mark("known")} variant={progressState === "known" ? "default" : "outline"}>
        <CheckCircle2 className="h-4 w-4" />
        {u.actions.known}
      </Button>
      <Button disabled={isPending} onClick={() => mark("unknown")} variant="outline">
        <HelpCircle className="h-4 w-4" />
        {u.actions.needPractice}
      </Button>
      <Button disabled={isPending} onClick={() => mark("failed")} variant="outline">
        <XCircle className="h-4 w-4" />
        {u.actions.failed}
      </Button>
      <Button disabled={isPending} onClick={favorite} variant={currentFavorite ? "default" : "outline"}>
        <Star className={currentFavorite ? "h-4 w-4 fill-current" : "h-4 w-4"} />
        {currentFavorite ? u.actions.saved : u.actions.save}
      </Button>
    </div>
  );
}
