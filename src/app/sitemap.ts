import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/blog";
import { routing } from "@/i18n/routing";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const PAGES = ["", "/blog", "/login", "/signup"];

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = PAGES.flatMap((p) =>
    routing.locales.map((l) => ({
      url: `${SITE}/${l}${p}`,
      alternates: { languages: Object.fromEntries(routing.locales.map((x) => [x, `${SITE}/${x}${p}`])) },
    })),
  );
  const posts = routing.locales.flatMap((l) =>
    getPosts(l).map((p) => ({ url: `${SITE}/${l}/blog/${p.slug}`, lastModified: p.date })),
  );
  return [...pages, ...posts];
}
