import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, rtlLocales } from "@/i18n/routing";
import { isTheme, THEME_COOKIE } from "@/lib/themes";
import { getSession } from "@/lib/session";
import { Header } from "@/components/header";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../globals.css";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  return {
    metadataBase: new URL(SITE),
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(routing.locales.map((l) => [l, `/${l}`])),
    },
    openGraph: { title: t("title"), description: t("description"), type: "website", locale },
  };
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const jar = await cookies();
  const raw = jar.get(THEME_COOKIE)?.value;
  const theme = isTheme(raw) ? raw : "midnight";
  const session = await getSession();

  return (
    <html lang={locale} dir={rtlLocales.includes(locale) ? "rtl" : "ltr"} data-theme={theme} className={geist.variable}>
      <body className="flex min-h-dvh flex-col">
        <NextIntlClientProvider>
          <Header user={session ? { name: session.user.name, role: session.user.role } : null} />
          <main className="flex-1">{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
