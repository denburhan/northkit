"use client";

import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { authClient } from "@/lib/auth-client";

export function UserMenu({ isAdmin }: { isAdmin: boolean }) {
  const t = useTranslations("Nav");
  const router = useRouter();
  const item = "inline-flex min-h-9 items-center rounded-lg border border-line px-3 text-sm hover:bg-surface-2";
  return (
    <nav className="flex items-center gap-2">
      <Link href="/dashboard" className={item}>{t("dashboard")}</Link>
      {isAdmin && <Link href="/admin" className={item}>{t("admin")}</Link>}
      <button
        type="button"
        className={item}
        onClick={async () => {
          await authClient.signOut();
          router.replace("/");
          router.refresh();
        }}
      >
        {t("logout")}
      </button>
    </nav>
  );
}
