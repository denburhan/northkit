import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const PAGES = ["", "/login", "/signup"];

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.flatMap((p) =>
    routing.locales.map((l) => ({
      url: `${SITE}/${l}${p}`,
      alternates: { languages: Object.fromEntries(routing.locales.map((x) => [x, `${SITE}/${x}${p}`])) },
    })),
  );
}
