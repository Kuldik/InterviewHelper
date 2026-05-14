-- CreateTable
CREATE TABLE "Question" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "category" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL,
    "tags" JSONB NOT NULL,
    "frequencyScore" INTEGER NOT NULL,
    "question" JSONB NOT NULL,
    "shortAnswer" JSONB NOT NULL,
    "detailedAnswer" JSONB NOT NULL,
    "followUpQuestion" JSONB NOT NULL,
    "followUpAnswer" JSONB NOT NULL,
    "interviewerExpectation" JSONB NOT NULL,
    "commonMistakes" JSONB NOT NULL,
    "keywords" JSONB NOT NULL,
    "relatedQuestions" JSONB NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "QuestionProgress" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "questionId" TEXT NOT NULL,
    "state" TEXT NOT NULL DEFAULT 'new',
    "knownCount" INTEGER NOT NULL DEFAULT 0,
    "unknownCount" INTEGER NOT NULL DEFAULT 0,
    "skippedCount" INTEGER NOT NULL DEFAULT 0,
    "failedCount" INTEGER NOT NULL DEFAULT 0,
    "practicedCount" INTEGER NOT NULL DEFAULT 0,
    "lastPracticedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "QuestionProgress_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "FavoriteQuestion" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "questionId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "FavoriteQuestion_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "QuizAttempt" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "mode" TEXT NOT NULL,
    "category" TEXT,
    "language" TEXT NOT NULL,
    "totalQuestions" INTEGER NOT NULL,
    "correctCount" INTEGER NOT NULL,
    "skippedCount" INTEGER NOT NULL,
    "durationMs" INTEGER NOT NULL,
    "completedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "QuizAnswer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "attemptId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "selectedIndex" INTEGER,
    "correctIndex" INTEGER NOT NULL,
    "isCorrect" BOOLEAN NOT NULL,
    "isSkipped" BOOLEAN NOT NULL DEFAULT false,
    "answeredAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "QuizAnswer_attemptId_fkey" FOREIGN KEY ("attemptId") REFERENCES "QuizAttempt" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "QuizAnswer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "StreakDay" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" TEXT NOT NULL,
    "practicedCount" INTEGER NOT NULL DEFAULT 0,
    "completedQuiz" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE INDEX "Question_category_idx" ON "Question"("category");

-- CreateIndex
CREATE INDEX "Question_difficulty_idx" ON "Question"("difficulty");

-- CreateIndex
CREATE INDEX "Question_frequencyScore_idx" ON "Question"("frequencyScore");

-- CreateIndex
CREATE UNIQUE INDEX "QuestionProgress_questionId_key" ON "QuestionProgress"("questionId");

-- CreateIndex
CREATE INDEX "QuestionProgress_state_idx" ON "QuestionProgress"("state");

-- CreateIndex
CREATE INDEX "QuestionProgress_lastPracticedAt_idx" ON "QuestionProgress"("lastPracticedAt");

-- CreateIndex
CREATE UNIQUE INDEX "FavoriteQuestion_questionId_key" ON "FavoriteQuestion"("questionId");

-- CreateIndex
CREATE INDEX "QuizAttempt_mode_idx" ON "QuizAttempt"("mode");

-- CreateIndex
CREATE INDEX "QuizAttempt_completedAt_idx" ON "QuizAttempt"("completedAt");

-- CreateIndex
CREATE INDEX "QuizAnswer_questionId_idx" ON "QuizAnswer"("questionId");

-- CreateIndex
CREATE INDEX "QuizAnswer_isCorrect_idx" ON "QuizAnswer"("isCorrect");

-- CreateIndex
CREATE UNIQUE INDEX "StreakDay_date_key" ON "StreakDay"("date");
