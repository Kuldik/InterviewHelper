"use client";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/providers/language-context";
import type { Language } from "@/types/interview";

const options: { value: Language; label: string }[] = [
  { value: "en", label: "EN" },
  { value: "ru", label: "RU" }
];

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="inline-flex rounded-xl border p-1">
      {options.map((option) => (
        <Button
          key={option.value}
          size="sm"
          variant={language === option.value ? "default" : "ghost"}
          onClick={() => setLanguage(option.value)}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
}
