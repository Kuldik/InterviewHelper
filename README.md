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
- SQLite for MVP
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
npm run db:generate
npm run db:migrate -- --name init
npm run db:seed
npm run dev
```

Open `http://localhost:3000`.

## Database

SQLite is configured through:

```env
DATABASE_URL="file:./dev.db"
```

Prisma commands:

```bash
npm run db:generate
npm run db:migrate -- --name init
npm run db:seed
npm run db:studio
```

The initial seed contains 80 curated high-frequency frontend interview questions across JavaScript, React, TypeScript, Browser APIs, CSS, Networking, Performance, and Architecture. The schema and seed pipeline are designed for expansion to 300+ questions without changing the product architecture.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run typecheck
```

## Deployment

For Vercel:

1. Set `DATABASE_URL`.
2. Run Prisma migrations during deployment or use a managed database for production.
3. Build with `npm run build`.

SQLite is fine for the MVP and portfolio demo. For multi-user production, move Prisma to Postgres before adding auth, teams, or payments.

