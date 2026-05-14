import { notFound } from "next/navigation";

import { LanguageSwitcher } from "@/features/questions/language-switcher";
import { QuestionSearch } from "@/features/questions/question-search";
import { getQuestionsByCategory } from "@/features/questions/queries";
import { categories, categoryLabels, type QuestionCategory } from "@/types/interview";

export default async function TopicPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;

  if (!categories.includes(category as QuestionCategory)) {
    notFound();
  }

  const typedCategory = category as QuestionCategory;
  const questions = await getQuestionsByCategory(typedCategory);

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm text-muted-foreground">Topic</p>
          <h1 className="text-3xl font-semibold tracking-tight">{categoryLabels[typedCategory].en}</h1>
        </div>
        <LanguageSwitcher />
      </div>
      <QuestionSearch questions={questions} />
    </div>
  );
}
