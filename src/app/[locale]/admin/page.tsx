import { headers } from "next/headers";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { redirect } from "@/i18n/navigation";
import { auth } from "@/lib/auth";
import { getSession } from "@/lib/session";
import { UserRow } from "@/components/user-row";

export default async function Admin({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const session = await getSession();
  if (!session) return redirect({ href: "/login", locale });
  const t = await getTranslations("Admin");
  if (session.user.role !== "admin") {
    return <p className="mx-auto max-w-5xl px-4 py-10 text-muted">{t("forbidden")}</p>;
  }
  const { users } = await auth.api.listUsers({ query: { limit: 100 }, headers: await headers() });
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">{t("title")}</h1>
      <ul className="mt-6 divide-y divide-line rounded-lg border border-line bg-surface">
        {users.map((u) => (
          <UserRow key={u.id} self={u.id === session.user.id}
            user={{ id: u.id, name: u.name, email: u.email, role: u.role ?? "user", banned: !!u.banned }} />
        ))}
      </ul>
    </div>
  );
}
