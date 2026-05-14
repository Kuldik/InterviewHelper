"use client";

import { useMemo, useState, useTransition } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { submitQuizAttempt } from "@/features/quiz/actions";
import { buildQuizQuestions, scoreQuiz } from "@/features/quiz/engine";
import { useLanguageStore } from "@/stores/language-store";
import { useQuizStore } from "@/stores/quiz-store";
import type { InterviewQuestion, QuestionCategory, QuizMode } from "@/types/interview";

export function QuizRunner({
  questions,
  mode,
  category
}: {
  questions: InterviewQuestion[];
  mode: QuizMode;
  category?: QuestionCategory;
}) {
  const language = useLanguageStore((state) => state.language);
  const quiz = useMemo(() => buildQuizQuestions(questions, language, 10), [questions, language]);
  const [startedAt] = useState(() => Date.now());
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number | null>>({});
  const [isFinished, setIsFinished] = useState(false);
  const [isPending, startTransition] = useTransition();
  const setLastScore = useQuizStore((state) => state.setLastScore);

  const current = quiz[index];
  const completion = quiz.length ? ((index + Number(isFinished)) / quiz.length) * 100 : 0;
  const scored = scoreQuiz(quiz.map((item) => ({ selectedIndex: answers[item.questionId] ?? null, correctIndex: item.correctIndex })));

  function answer(selectedIndex: number | null) {
    if (!current) return;

    const nextAnswers = { ...answers, [current.questionId]: selectedIndex };
    setAnswers(nextAnswers);

    if (index < quiz.length - 1) {
      setIndex((value) => value + 1);
      return;
    }

    setIsFinished(true);
    setLastScore(scoreQuiz(quiz.map((item) => ({ selectedIndex: nextAnswers[item.questionId] ?? null, correctIndex: item.correctIndex }))).percent);
    startTransition(async () => {
      await submitQuizAttempt({
        mode,
        category,
        language,
        durationMs: Date.now() - startedAt,
        answers: quiz.map((item) => ({
          questionId: item.questionId,
          selectedIndex: nextAnswers[item.questionId] ?? null,
          correctIndex: item.correctIndex
        }))
      });
      toast.success("Quiz saved");
    });
  }

  if (!quiz.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No questions yet</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">Seed the database or pick another mode.</CardContent>
      </Card>
    );
  }

  if (isFinished) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Session complete</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-4">
            <Metric label="Score" value={`${scored.percent}%`} />
            <Metric label="Correct" value={`${scored.correct}/${scored.total}`} />
            <Metric label="Skipped" value={String(scored.skipped)} />
            <Metric label="Saved" value={isPending ? "Saving" : "Done"} />
          </CardContent>
        </Card>
        <div className="grid gap-3">
          {quiz.map((item) => {
            const selected = answers[item.questionId] ?? null;
            const missed = selected !== item.correctIndex;
            return (
              <Card key={item.questionId} className={missed ? "border-destructive/50" : ""}>
                <CardContent className="p-4">
                  <p className="font-medium">{item.prompt[language]}</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Correct: {item.variants[item.correctIndex]?.[language]}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      key={current.questionId}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18 }}
      className="space-y-5"
    >
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>
            Question {index + 1} of {quiz.length}
          </span>
          <span>{Math.round(completion)}%</span>
        </div>
        <Progress value={completion} />
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{current.prompt[language]}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3">
          {current.variants.map((variant, variantIndex) => (
            <Button key={variant[language]} className="h-auto justify-start whitespace-normal p-4 text-left" variant="outline" onClick={() => answer(variantIndex)}>
              {variant[language]}
            </Button>
          ))}
          <Button variant="ghost" onClick={() => answer(null)}>
            Skip
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-muted p-4">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-semibold">{value}</p>
    </div>
  );
}
