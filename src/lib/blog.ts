import { readdirSync, readFileSync, existsSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

export type Post = { slug: string; title: string; description: string; date: string };

const dir = (locale: string) => path.join(process.cwd(), "content", "blog", locale);
const SLUG = /^[a-z0-9-]+$/;

export function getPosts(locale: string): Post[] {
  if (!existsSync(dir(locale))) return [];
  return readdirSync(dir(locale))
    .filter((f) => f.endsWith(".md") && SLUG.test(f.slice(0, -3)))
    .map((f) => {
      const { data } = matter(readFileSync(path.join(dir(locale), f), "utf8"));
      return { slug: f.slice(0, -3), title: String(data.title), description: String(data.description ?? ""), date: new Date(data.date).toISOString().slice(0, 10) };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(locale: string, slug: string) {
  if (!SLUG.test(slug)) return null;
  const file = path.join(dir(locale), `${slug}.md`);
  if (!existsSync(file)) return null;
  const { data, content } = matter(readFileSync(file, "utf8"));
  // Content is authored in the repo (trusted). Do not feed user input here.
  return { title: String(data.title), description: String(data.description ?? ""), date: new Date(data.date).toISOString().slice(0, 10), html: marked.parse(content, { async: false }) as string };
}
