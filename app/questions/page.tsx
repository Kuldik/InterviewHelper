import type { Metadata } from "next";

import { LanguageSwitcher } from "@/features/questions/language-switcher";
import { QuestionSearch } from "@/features/questions/question-search";
import { getQuestionSummaries } from "@/features/questions/queries";

export const metadata: Metadata = {
  title: "Question Database"
};

export default async function QuestionsPage() {
  const questions = await getQuestionSummaries();

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm text-muted-foreground">Question database</p>
          <h1 className="text-3xl font-semibold tracking-tight">High-frequency frontend questions</h1>
        </div>
        <LanguageSwitcher />
      </div>
      <QuestionSearch questions={questions} />
    </div>
  );
}
