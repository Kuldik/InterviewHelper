"use client";

import { useMemo } from "react";

import { useLanguage } from "@/components/providers/language-context";

import { uiStrings } from "./ui-strings";

export function useUi() {
  const { language } = useLanguage();
  return useMemo(() => uiStrings(language), [language]);
}
