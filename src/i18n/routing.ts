import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "id"],
  defaultLocale: "en",
});

export const rtlLocales = ["ar", "he", "fa", "ur"];
