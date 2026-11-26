import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getPosts } from "@/lib/blog";
import { pageAlternates } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Blog" });
  return { title: t("title"), alternates: { ...pageAlternates(locale, "/blog"), types: { "application/rss+xml": `/${locale}/rss.xml` } } };
}

export default async function Blog({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Blog");
  const posts = getPosts(locale);
  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">{t("title")}</h1>
      {posts.length === 0 && <p className="mt-6 text-muted">{t("empty")}</p>}
      <ul className="mt-8 divide-y divide-line border-y border-line">
        {posts.map((p) => (
          <li key={p.slug} className="py-5">
            <Link href={`/blog/${p.slug}`} className="text-lg font-medium hover:text-accent">{p.title}</Link>
            <p className="mt-1 text-sm text-muted">{p.description}</p>
            <time dateTime={p.date} className="mt-2 block text-xs text-muted">{p.date}</time>
          </li>
        ))}
      </ul>
    </section>
  );
}
