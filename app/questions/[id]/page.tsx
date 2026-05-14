import Link from "next/link";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { QuestionActions } from "@/features/questions/question-actions";
import { getQuestionDetail } from "@/features/questions/queries";
import { categoryLabels, difficultyLabels } from "@/types/interview";

export default async function QuestionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
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
            <Badge>{categoryLabels[question.category].en}</Badge>
            <Badge variant="outline">{difficultyLabels[question.difficulty].en}</Badge>
            <Badge variant="secondary">Frequency {question.frequencyScore}</Badge>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight">{question.question.en}</h1>
          <p className="text-xl text-muted-foreground">{question.question.ru}</p>
          <QuestionActions questionId={question.id} progressState={progressState} isFavorite={isFavorite} />
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Short answer</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <p>{question.shortAnswer.en}</p>
            <p className="text-muted-foreground">{question.shortAnswer.ru}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Detailed answer</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <p>{question.detailedAnswer.en}</p>
            <p className="text-muted-foreground">{question.detailedAnswer.ru}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Follow-up</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <strong>{question.followUpQuestion.en}</strong>
              <strong className="text-muted-foreground">{question.followUpQuestion.ru}</strong>
            </div>
            <Separator />
            <div className="grid gap-4 md:grid-cols-2">
              <p>{question.followUpAnswer.en}</p>
              <p className="text-muted-foreground">{question.followUpAnswer.ru}</p>
            </div>
          </CardContent>
        </Card>
      </article>
      <aside className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Interviewer expects</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            {question.interviewerExpectation.en.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Common mistakes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            {question.commonMistakes.en.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Related questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {related.map((item) => (
              <Link key={item.id} href={`/questions/${item.id}`} className="block text-sm text-muted-foreground hover:text-foreground">
                {item.question.en}
              </Link>
            ))}
          </CardContent>
        </Card>
      </aside>
    </div>
  );
}
