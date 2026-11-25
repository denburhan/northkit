import type { Metadata } from "next";
import { pageAlternates } from "@/lib/seo";
import { setRequestLocale } from "next-intl/server";
import { AuthForm } from "@/components/auth-form";

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const social = [
    ...(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET ? (["github"] as const) : []),
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET ? (["google"] as const) : []),
  ];
  return <AuthForm mode="login" social={[...social]} />;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return { alternates: pageAlternates(locale, "/login") };
}
