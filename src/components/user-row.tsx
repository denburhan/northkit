"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { authClient } from "@/lib/auth-client";

type U = { id: string; name: string; email: string; role: string; banned: boolean };

export function UserRow({ user, self }: { user: U; self: boolean }) {
  const t = useTranslations("Admin");
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const btn = "inline-flex min-h-9 items-center rounded-lg border border-line px-3 text-sm hover:bg-surface-2";

  async function toggleBan() {
    await (user.banned ? authClient.admin.unbanUser({ userId: user.id }) : authClient.admin.banUser({ userId: user.id }));
    router.refresh();
  }
  async function remove() {
    await authClient.admin.removeUser({ userId: user.id });
    router.refresh();
  }

  return (
    <li className="p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate font-medium">{user.name}</p>
          <p className="truncate text-sm text-muted">{user.email} &middot; {user.role}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-xs ${user.banned ? "text-danger" : "text-muted"}`}>{user.banned ? t("banned") : t("active")}</span>
          {!self && <button type="button" className={btn} onClick={toggleBan}>{user.banned ? t("unban") : t("ban")}</button>}
          {!self && (
            <button type="button" aria-label={t("more")} aria-expanded={open} className={btn} onClick={() => setOpen(!open)}>
              <i className="bi bi-three-dots" aria-hidden />
            </button>
          )}
        </div>
      </div>
      {open && !self && (
        <div className="mt-3 flex justify-end">
          {confirm ? (
            <button type="button" onClick={remove} className="inline-flex min-h-9 items-center rounded-lg bg-danger px-3 text-sm font-medium text-bg">{t("confirm")}</button>
          ) : (
            <button type="button" onClick={() => setConfirm(true)} className="inline-flex min-h-9 items-center rounded-lg border border-danger px-3 text-sm text-danger">{t("remove")}</button>
          )}
        </div>
      )}
    </li>
  );
}
