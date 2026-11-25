import type { Metadata } from "next";
import { routing } from "@/i18n/routing";

export function pageAlternates(locale: string, path = ""): Metadata["alternates"] {
  return {
    canonical: `/${locale}${path}`,
    languages: Object.fromEntries(routing.locales.map((l) => [l, `/${l}${path}`])),
  };
}
