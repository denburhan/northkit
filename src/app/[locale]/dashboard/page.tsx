import { cookies } from "next/headers";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { redirect } from "@/i18n/navigation";
import { getSession } from "@/lib/session";
import { isTheme, THEME_COOKIE } from "@/lib/themes";
import { ThemeSwitcher } from "@/components/theme-switcher";

export default async function Dashboard({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const session = await getSession();
  if (!session) return redirect({ href: "/login", locale });
  const t = await getTranslations("Dashboard");
  const raw = (await cookies()).get(THEME_COOKIE)?.value;
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">{t("title")}</h1>
      <dl className="mt-6 divide-y divide-line rounded-lg border border-line bg-surface">
        <div className="flex justify-between gap-4 p-4"><dt className="text-muted">{t("welcome")}</dt><dd>{session.user.email}</dd></div>
        <div className="flex justify-between gap-4 p-4"><dt className="text-muted">{t("role")}</dt><dd>{session.user.role ?? "user"}</dd></div>
        <div className="flex flex-wrap items-center justify-between gap-3 p-4"><dt className="text-muted">{t("theme")}</dt><dd><ThemeSwitcher initial={isTheme(raw) ? raw : "midnight"} /></dd></div>
      </dl>
    </div>
  );
}

export const metadata: Metadata = { robots: { index: false, follow: false } };
