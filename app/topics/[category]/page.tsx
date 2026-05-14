import { notFound } from "next/navigation";

import { QuestionSearch } from "@/features/questions/question-search";
import { getQuestionsByCategory } from "@/features/questions/queries";
import { getRequestLang } from "@/lib/i18n/request-lang";
import { uiStrings } from "@/lib/i18n/ui-strings";
import { categories, categoryLabels, type QuestionCategory } from "@/types/interview";

export default async function TopicPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const lang = await getRequestLang();
  const u = uiStrings(lang);

  if (!categories.includes(category as QuestionCategory)) {
    notFound();
  }

  const typedCategory = category as QuestionCategory;
  const questions = await getQuestionsByCategory(typedCategory);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-muted-foreground">{u.topics.kicker}</p>
        <h1 className="text-3xl font-semibold tracking-tight">{u.topics.title(categoryLabels[typedCategory][lang])}</h1>
      </div>
      <QuestionSearch questions={questions} />
    </div>
  );
}
