"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";

import { LANG_COOKIE } from "@/lib/i18n/lang-cookie";
import type { Language } from "@/types/interview";

type LanguageContextValue = {
  language: Language;
  setLanguage: (lang: Language) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const COOKIE_MAX_AGE = 60 * 60 * 24 * 400;

function writeLangCookie(lang: Language) {
  document.cookie = `${LANG_COOKIE}=${lang};path=/;max-age=${COOKIE_MAX_AGE};SameSite=Lax`;
}

export function LanguageProvider({ initialLang, children }: { initialLang: Language; children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(initialLang);
  const router = useRouter();

  useEffect(() => {
    setLanguageState(initialLang);
  }, [initialLang]);

  const setLanguage = useCallback(
    (lang: Language) => {
      setLanguageState(lang);
      writeLangCookie(lang);
      router.refresh();
    },
    [router]
  );

  const value = useMemo(() => ({ language, setLanguage }), [language, setLanguage]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return ctx;
}
