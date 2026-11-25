import { setRequestLocale } from "next-intl/server";
import { AuthForm } from "@/components/auth-form";

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const social = [
    ...(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET ? (["github"] as const) : []),
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET ? (["google"] as const) : []),
  ];
  return <AuthForm mode="signup" social={[...social]} />;
}
