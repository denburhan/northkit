"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { authClient } from "@/lib/auth-client";

export function ResetForm() {
  const t = useTranslations("Auth");
  const token = useSearchParams().get("token");
  const [state, setState] = useState<"idle" | "done" | "error">("idle");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!token) return setState("error");
    setBusy(true);
    const newPassword = String(new FormData(e.currentTarget).get("password"));
    const res = await authClient.resetPassword({ newPassword, token });
    setBusy(false);
    setState(res.error ? "error" : "done");
  }

  return (
    <div className="mx-auto w-full max-w-sm px-4 py-12">
      <h1 className="text-2xl font-semibold tracking-tight">{t("resetTitle")}</h1>
      {state === "done" ? (
        <p role="status" className="mt-6 text-sm">{t("resetDone")}</p>
      ) : (
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <label className="block text-sm">{t("newPassword")}
            <input name="password" type="password" required minLength={8} autoComplete="new-password" className="mt-1 block min-h-11 w-full rounded-lg border border-line bg-surface px-3 text-base" />
          </label>
          {state === "error" && <p role="alert" className="text-sm text-danger">{t("error")}</p>}
          <button disabled={busy} className="min-h-11 w-full rounded-lg bg-accent font-medium text-accent-fg disabled:opacity-60">{t("reset")}</button>
        </form>
      )}
      <p className="mt-6 text-sm"><Link href="/login" className="text-accent underline underline-offset-4">{t("backToLogin")}</Link></p>
    </div>
  );
}
