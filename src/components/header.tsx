import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LocaleSwitcher } from "./locale-switcher";
import { UserMenu } from "./user-menu";

export function Header({ user }: { user: { name: string; role?: string | null } | null }) {
  const t = useTranslations("Nav");
  return (
    <header className="sticky top-0 z-10 border-b border-line bg-bg/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <i className="bi bi-compass text-accent" aria-hidden />
          Northkit
        </Link>
        <div className="flex items-center gap-2">
          <LocaleSwitcher />
          {user ? (
            <UserMenu isAdmin={user.role === "admin"} />
          ) : (
            <Link href="/login" className="inline-flex min-h-9 items-center rounded-lg bg-accent px-3.5 text-sm font-medium text-accent-fg">
              {t("login")}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
