import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import { Toaster } from "sonner";

import { AppShell } from "@/components/layout/app-shell";
import { LanguageProvider } from "@/components/providers/language-context";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { LANG_COOKIE } from "@/lib/i18n/lang-cookie";
import type { Language } from "@/types/interview";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter"
});

export const metadata: Metadata = {
  title: {
    default: "Interview Helper",
    template: "%s | Interview Helper"
  },
  description:
    "A bilingual frontend interview retrieval system for React, JavaScript, TypeScript, browser APIs, CSS, performance, networking, and architecture."
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const jar = await cookies();
  const initialLang: Language = jar.get(LANG_COOKIE)?.value === "ru" ? "ru" : "en";

  return (
    <html lang={initialLang} suppressHydrationWarning>
      <body className={inter.variable}>
        <ThemeProvider>
          <LanguageProvider initialLang={initialLang}>
            <AppShell>{children}</AppShell>
            <Toaster richColors position="bottom-right" />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
