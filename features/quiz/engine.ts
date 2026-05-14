import { defaultMistakesEn, defaultMistakesRu } from "@/data/questions/default-mistakes";
import type { InterviewQuestion, Language, LocalizedList, LocalizedText, QuizQuestion } from "@/types/interview";

function shuffle<T>(items: T[]): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = a[i];
    a[i] = a[j]!;
    a[j] = tmp!;
  }
  return a;
}

function isGenericMistakes(m: LocalizedList): boolean {
  if (m.ru.length !== defaultMistakesRu.length || m.en.length !== defaultMistakesEn.length) return false;
  return (
    m.ru.every((s, i) => s === defaultMistakesRu[i]) && m.en.every((s, i) => s === defaultMistakesEn[i])
  );
}

function mistakesToTexts(m: LocalizedList): LocalizedText[] {
  const n = Math.min(m.ru.length, m.en.length);
  const out: LocalizedText[] = [];
  for (let i = 0; i < n; i++) {
    out.push({ ru: m.ru[i]!, en: m.en[i]! });
  }
  return out;
}

function tokenize(text: string): Set<string> {
  const normalized = text.toLocaleLowerCase().replace(/[^\p{L}\p{N}\s]/gu, " ");
  const words = normalized.split(/\s+/).filter((w) => w.length > 2);
  return new Set(words);
}

function wordOverlap(a: Set<string>, b: Set<string>): number {
  let n = 0;
  for (const w of b) {
    if (a.has(w)) n++;
  }
  return n;
}

function lengthScore(correctLen: number, candidateLen: number): number {
  if (correctLen < 8) return 0;
  const ratio = candidateLen / correctLen;
  if (ratio >= 0.45 && ratio <= 2.2) return 3;
  if (ratio >= 0.3 && ratio <= 3) return 1;
  return -4;
}

function overlapScore(
  q: InterviewQuestion,
  candidate: InterviewQuestion,
  lang: Language
): number {
  if (candidate.id === q.id || candidate.category !== q.category) return -Infinity;

  let score = 0;
  const sharedTags = q.tags.filter((t) => candidate.tags.includes(t)).length;
  score += sharedTags * 12;

  const kw = q.keywords.map((k) => k.toLocaleLowerCase());
  const candKw = candidate.keywords.map((k) => k.toLocaleLowerCase());
  score += kw.filter((k) => candKw.includes(k)).length * 10;

  const qText = `${q.question[lang]} ${q.shortAnswer[lang]} ${q.keywords.join(" ")}`;
  const qTokens = tokenize(qText);
  const shortTokens = tokenize(candidate.shortAnswer[lang]);
  const followTokens = tokenize(candidate.followUpAnswer[lang]);
  score += wordOverlap(qTokens, shortTokens) * 3;
  score += wordOverlap(qTokens, followTokens) * 2;

  if (candidate.difficulty === q.difficulty) score += 4;

  const correctLen = q.shortAnswer[lang].length;
  score += lengthScore(correctLen, candidate.shortAnswer[lang].length);
  if (candidate.followUpAnswer[lang].length >= 20) {
    score += lengthScore(correctLen, candidate.followUpAnswer[lang].length) * 0.35;
  }

  return score;
}

function collectScoredDistractors(
  q: InterviewQuestion,
  pool: InterviewQuestion[],
  lang: Language,
  exclude: Set<string>,
  needed: number
): LocalizedText[] {
  type Scored = { text: LocalizedText; score: number };
  const scored: Scored[] = [];

  for (const other of pool) {
    if (other.id === q.id || other.category !== q.category) continue;

    const base = overlapScore(q, other, lang);
    if (!Number.isFinite(base) || base < 4) continue;

    const push = (text: LocalizedText, bonus: number) => {
      const key = text[lang].trim().toLocaleLowerCase();
      if (exclude.has(key)) return;
      if (text[lang].trim().length < 12) return;
      scored.push({ text, score: base + bonus });
    };

    push(other.shortAnswer, 3);
    push(other.followUpAnswer, 0.5);
  }

  scored.sort((a, b) => b.score - a.score);
  const topBand = scored.filter((s) => s.score >= Math.max(8, (scored[0]?.score ?? 0) - 6)).slice(0, 24);
  const pickFrom = topBand.length >= needed ? topBand : scored.slice(0, Math.max(needed * 4, 16));

  const picked: LocalizedText[] = [];
  for (const item of shuffle(pickFrom)) {
    if (picked.length >= needed) break;
    const key = item.text[lang].trim().toLocaleLowerCase();
    if (exclude.has(key)) continue;
    exclude.add(key);
    picked.push(item.text);
  }

  return picked;
}

function sameCategoryFallback(
  q: InterviewQuestion,
  pool: InterviewQuestion[],
  lang: Language,
  exclude: Set<string>,
  needed: number
): LocalizedText[] {
  const others = shuffle(pool.filter((item) => item.id !== q.id && item.category === q.category));
  const picked: LocalizedText[] = [];
  for (const item of others) {
    if (picked.length >= needed) break;
    const key = item.shortAnswer[lang].trim().toLocaleLowerCase();
    if (exclude.has(key)) continue;
    exclude.add(key);
    picked.push(item.shortAnswer);
  }
  return picked;
}

export function buildQuizQuestions(questions: InterviewQuestion[], language: Language, limit = 10): QuizQuestion[] {
  const selected = shuffle(questions).slice(0, limit);

  return selected.map((question) => {
    const correct = question.shortAnswer;
    const exclude = new Set<string>([correct[language].trim().toLocaleLowerCase()]);

    const wrong: LocalizedText[] = [];

    if (!isGenericMistakes(question.commonMistakes)) {
      const fromMistakes = shuffle(mistakesToTexts(question.commonMistakes));
      for (const m of fromMistakes) {
        if (wrong.length >= 3) break;
        const key = m[language].trim().toLocaleLowerCase();
        if (exclude.has(key)) continue;
        exclude.add(key);
        wrong.push(m);
      }
    }

    if (wrong.length < 3) {
      const need = 3 - wrong.length;
      const scored = collectScoredDistractors(question, questions, language, exclude, need);
      wrong.push(...scored);
    }

    if (wrong.length < 3) {
      const need = 3 - wrong.length;
      const fallback = sameCategoryFallback(question, questions, language, exclude, need);
      wrong.push(...fallback);
    }

    if (wrong.length < 3) {
      const lastResort: LocalizedText[] = [
        {
          en: "It is mainly about memorizing API names, not how the mechanism behaves.",
          ru: "Это в основном про запоминание имён API, а не про то, как работает механизм."
        },
        {
          en: "It always makes the app faster regardless of what you measure.",
          ru: "Это всегда ускоряет приложение независимо от того, что мы измеряем."
        },
        {
          en: "It is unrelated to rendering and only affects build tooling.",
          ru: "Это не связано с рендером и влияет только на сборку."
        }
      ];
      for (const item of lastResort) {
        if (wrong.length >= 3) break;
        const key = item[language].trim().toLocaleLowerCase();
        if (exclude.has(key)) continue;
        exclude.add(key);
        wrong.push(item);
      }
    }

    const variants = shuffle([correct, ...wrong.slice(0, 3)]);
    const correctIndex = variants.findIndex((v) => v[language] === correct[language]);

    return {
      questionId: question.id,
      prompt: question.question,
      variants,
      correctIndex: correctIndex >= 0 ? correctIndex : 0
    };
  });
}

export function scoreQuiz(answers: { selectedIndex: number | null; correctIndex: number }[]) {
  const correct = answers.filter((answer) => answer.selectedIndex === answer.correctIndex).length;
  const skipped = answers.filter((answer) => answer.selectedIndex === null).length;

  return {
    correct,
    skipped,
    total: answers.length,
    percent: answers.length ? Math.round((correct / answers.length) * 100) : 0
  };
}
