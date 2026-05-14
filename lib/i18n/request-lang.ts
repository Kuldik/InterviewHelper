import { cookies } from "next/headers";

import type { Language } from "@/types/interview";

import { LANG_COOKIE } from "@/lib/i18n/lang-cookie";

export { LANG_COOKIE };

export async function getRequestLang(): Promise<Language> {
  const jar = await cookies();
  return jar.get(LANG_COOKIE)?.value === "ru" ? "ru" : "en";
}
