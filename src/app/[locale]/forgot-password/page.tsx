import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ForgotForm } from "@/components/forgot-form";

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  setRequestLocale((await params).locale);
  return <ForgotForm />;
}
