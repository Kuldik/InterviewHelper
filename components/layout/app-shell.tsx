import Link from "next/link";

import { ThemeToggle } from "@/components/providers/theme-toggle";
import { Button } from "@/components/ui/button";

const navigation = [
  { href: "/questions", label: "Questions" },
  { href: "/quiz", label: "Quiz" },
  { href: "/weak-areas", label: "Weak Areas" },
  { href: "/progress", label: "Progress" }
] as const;

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3 font-semibold tracking-tight">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-foreground text-sm text-background">
              IH
            </span>
            <span>Interview Helper</span>
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            {navigation.map((item) => (
              <Button key={item.href} variant="ghost" asChild>
                <Link href={item.href}>{item.label}</Link>
              </Button>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button className="hidden sm:inline-flex" asChild>
              <Link href="/quiz">Start practice</Link>
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}
