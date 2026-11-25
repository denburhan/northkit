"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { authClient } from "@/lib/auth-client";

export function ForgotForm() {
  const t = useTranslations("Auth");
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    const email = String(new FormData(e.currentTarget).get("email"));
    await authClient.requestPasswordReset({ email, redirectTo: `${window.location.origin}${window.location.pathname.replace("forgot-password", "reset-password")}` });
    setBusy(false);
    setSent(true);
  }

  return (
    <div className="mx-auto w-full max-w-sm px-4 py-12">
      <h1 className="text-2xl font-semibold tracking-tight">{t("forgotTitle")}</h1>
      <p className="mt-2 text-sm text-muted">{t("forgotHelp")}</p>
      {sent ? (
        <p role="status" className="mt-6 text-sm">{t("sent")}</p>
      ) : (
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <label className="block text-sm">{t("email")}
            <input name="email" type="email" required autoComplete="email" className="mt-1 block min-h-11 w-full rounded-lg border border-line bg-surface px-3 text-base" />
          </label>
          <button disabled={busy} className="min-h-11 w-full rounded-lg bg-accent font-medium text-accent-fg disabled:opacity-60">{t("sendLink")}</button>
        </form>
      )}
      <p className="mt-6 text-sm"><Link href="/login" className="text-accent underline underline-offset-4">{t("backToLogin")}</Link></p>
    </div>
  );
}
