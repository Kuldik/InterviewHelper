import Link from "next/link";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { QuestionActions } from "@/features/questions/question-actions";
import { getQuestionDetail } from "@/features/questions/queries";
import { getRequestLang } from "@/lib/i18n/request-lang";
import { uiStrings } from "@/lib/i18n/ui-strings";
import { categoryLabels, difficultyLabels } from "@/types/interview";

export default async function QuestionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lang = await getRequestLang();
  const u = uiStrings(lang);

  const detail = await getQuestionDetail(id);

  if (!detail) {
    notFound();
  }

  const { question, related, progressState, isFavorite } = detail;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <article className="space-y-6">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Badge>{categoryLabels[question.category][lang]}</Badge>
            <Badge variant="outline">{difficultyLabels[question.difficulty][lang]}</Badge>
            <Badge variant="secondary">{u.questionDetail.frequency(question.frequencyScore)}</Badge>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight">{question.question[lang]}</h1>
          <QuestionActions questionId={question.id} progressState={progressState} isFavorite={isFavorite} />
        </div>
        <Card>
          <CardHeader>
            <CardTitle>{u.questionDetail.shortAnswer}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{question.shortAnswer[lang]}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{u.questionDetail.detailedAnswer}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{question.detailedAnswer[lang]}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{u.questionDetail.followUp}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <strong>{question.followUpQuestion[lang]}</strong>
            <Separator />
            <p>{question.followUpAnswer[lang]}</p>
          </CardContent>
        </Card>
      </article>
      <aside className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>{u.questionDetail.interviewerExpects}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            {question.interviewerExpectation[lang].map((item) => (
              <p key={item}>{item}</p>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{u.questionDetail.commonMistakes}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            {question.commonMistakes[lang].map((item) => (
              <p key={item}>{item}</p>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{u.questionDetail.relatedQuestions}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {related.map((item) => (
              <Link
                key={item.id}
                href={`/questions/${item.id}`}
                className="block text-sm text-muted-foreground hover:text-foreground"
              >
                {item.question[lang]}
              </Link>
            ))}
          </CardContent>
        </Card>
      </aside>
    </div>
  );
}
