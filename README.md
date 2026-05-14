# Interview Helper

Production-grade MVP for frontend interview preparation.

Interview Helper is not a tutorial site. It is a bilingual retrieval-practice system for frontend developers preparing for Russian-speaking and English-speaking interviews.

## Stack

- Next.js 15 App Router
- TypeScript strict mode
- Tailwind CSS
- shadcn/ui-style primitives
- Zustand
- Prisma
- PostgreSQL (Neon / Supabase / local; SQLite removed for deploy compatibility)
- Framer Motion
- Dark mode via next-themes

## Features

- Question database with bilingual RU/EN content
- Instant search by text, category, tags, keywords, and difficulty
- Topic navigation
- Question detail pages with short answer, detailed answer, follow-up, mistakes, interviewer expectations, related questions
- Quiz mode with random, category, and weak-topic practice
- Four answer variants, score tracking, completion stats, and mistake review
- Weak areas dashboard
- Daily streak tracking
- Progress overview
- Favorites / saved questions

## Getting Started

```bash
npm install
cp .env.example .env
# Set DATABASE_URL to your Postgres connection string (e.g. Neon).
npm run db:generate
npm run db:deploy
npm run db:seed
npm run dev
```

Open `http://localhost:3000`.

## Database

Use **PostgreSQL**. Set in `.env`:

```env
DATABASE_URL="postgresql://..."
```

Prisma commands:

```bash
npm run db:generate
npm run db:deploy      # apply migrations (CI / production)
npm run db:migrate     # create new migrations in dev (prisma migrate dev)
npm run db:seed
npm run db:studio
```

`npm run build` runs **`prisma migrate deploy`** first so Vercel applies migrations using `DATABASE_URL`.

The initial seed contains 80 curated high-frequency frontend interview questions across JavaScript, React, TypeScript, Browser APIs, CSS, Networking, Performance, and Architecture. The schema and seed pipeline are designed for expansion to 300+ questions without changing the product architecture.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run typecheck
```
