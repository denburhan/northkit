import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { getPost, getPosts } from "@/lib/blog";
import { pageAlternates } from "@/lib/seo";

type P = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => getPosts(locale).map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPost(locale, slug);
  if (!post) return {};
  return { title: post.title, description: post.description, alternates: { canonical: pageAlternates(locale, `/blog/${slug}`)!.canonical }, openGraph: { type: "article", publishedTime: post.date } };
}

export default async function Post({ params }: P) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const post = getPost(locale, slug);
  if (!post) notFound();
  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{post.title}</h1>
      <time dateTime={post.date} className="mt-2 block text-sm text-muted">{post.date}</time>
      <div className="post-body mt-8" dangerouslySetInnerHTML={{ __html: post.html }} />
    </article>
  );
}
