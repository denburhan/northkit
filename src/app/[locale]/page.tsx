import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import { Link } from "@/i18n/navigation";

const FEATURES = [
  ["1", "translate"], ["2", "shield-lock"], ["3", "people"], ["4", "palette"], ["5", "search"], ["6", "cloud-arrow-up"],
] as const;

export default function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("Home");
  const f = useTranslations("Footer");
  return (
    <>
      <section className="mx-auto max-w-5xl px-4 pb-14 pt-16 sm:pt-24">
        <p className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 text-xs text-muted">
          <i className="bi bi-github" aria-hidden /> {t("badge")}
        </p>
        <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">{t("title")}</h1>
        <p className="mt-5 max-w-xl text-lg text-muted">{t("subtitle")}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/signup" className="inline-flex min-h-11 items-center rounded-lg bg-accent px-5 font-medium text-accent-fg">{t("cta")}</Link>
          <a href="https://github.com/denburhan/northkit" className="inline-flex min-h-11 items-center rounded-lg border border-line px-5 hover:bg-surface-2">{t("ctaSecondary")}</a>
        </div>
      </section>
      <section className="mx-auto max-w-5xl px-4 pb-20">
        <h2 className="text-xl font-semibold tracking-tight">{t("featuresTitle")}</h2>
        <ul className="mt-6 divide-y divide-line border-y border-line">
          {FEATURES.map(([n, icon]) => (
            <li key={n} className="flex gap-4 py-5">
              <i className={`bi bi-${icon} mt-0.5 text-xl text-accent`} aria-hidden />
              <div>
                <h3 className="font-medium">{t(`f${n}t`)}</h3>
                <p className="mt-1 text-sm text-muted">{t(`f${n}d`)}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <footer className="border-t border-line py-6 text-center text-sm text-muted">&copy; {new Date().getFullYear()} {f("rights")}</footer>
    </>
  );
}
