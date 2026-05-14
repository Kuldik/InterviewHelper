import type { Metadata } from "next";

import { QuestionSearch } from "@/features/questions/question-search";
import { getQuestionSummaries } from "@/features/questions/queries";
import { getRequestLang } from "@/lib/i18n/request-lang";
import { uiStrings } from "@/lib/i18n/ui-strings";

export const metadata: Metadata = {
  title: "Question Database"
};

export default async function QuestionsPage() {
  const lang = await getRequestLang();
  const u = uiStrings(lang);
  const questions = await getQuestionSummaries();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-muted-foreground">{u.questions.kicker}</p>
        <h1 className="text-3xl font-semibold tracking-tight">{u.questions.title}</h1>
      </div>
      <QuestionSearch questions={questions} />
    </div>
  );
}
