"use client";

import Link from "next/link";

import { LanguageSwitcher } from "@/features/questions/language-switcher";
import { ThemeToggle } from "@/components/providers/theme-toggle";
import { Button } from "@/components/ui/button";
import { useUi } from "@/lib/i18n/use-ui";

const paths = ["/questions", "/quiz", "/weak-areas", "/progress"] as const;

export function SiteHeader() {
  const u = useUi();

  const navigation = [
    { href: "/questions", label: u.nav.questions },
    { href: "/quiz", label: u.nav.quiz },
    { href: "/weak-areas", label: u.nav.weakAreas },
    { href: "/progress", label: u.nav.progress }
  ] as const;

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 font-semibold tracking-tight">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-foreground text-sm text-background">IH</span>
          <span>{u.nav.brand}</span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {navigation.map((item) => (
            <Button key={item.href} variant="ghost" asChild>
              <Link href={item.href}>{item.label}</Link>
            </Button>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <Button className="hidden sm:inline-flex" asChild>
            <Link href="/quiz">{u.nav.startPractice}</Link>
          </Button>
          <ThemeToggle />
        </div>
      </div>
      <nav className="flex flex-wrap gap-1 border-t px-4 py-2 md:hidden">
        {paths.map((href) => {
          const label =
            href === "/questions"
              ? u.nav.questions
              : href === "/quiz"
                ? u.nav.quiz
                : href === "/weak-areas"
                  ? u.nav.weakAreas
                  : u.nav.progress;
          return (
            <Button key={href} size="sm" variant="ghost" asChild>
              <Link href={href}>{label}</Link>
            </Button>
          );
        })}
      </nav>
    </header>
  );
}
