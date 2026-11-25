"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { authClient } from "@/lib/auth-client";

export function AuthForm({ mode, social }: { mode: "login" | "signup"; social: ("github" | "google")[] }) {
  const t = useTranslations("Auth");
  const router = useRouter();
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState(false);
  const signup = mode === "signup";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError(false);
    const f = new FormData(e.currentTarget);
    const email = String(f.get("email"));
    const password = String(f.get("password"));
    const res = signup
      ? await authClient.signUp.email({ name: String(f.get("name")), email, password })
      : await authClient.signIn.email({ email, password });
    setBusy(false);
    if (res.error) return setError(true);
    router.replace("/dashboard");
    router.refresh();
  }

  const input = "mt-1 block min-h-11 w-full rounded-lg border border-line bg-surface px-3 text-base";
  return (
    <div className="mx-auto w-full max-w-sm px-4 py-12">
      <h1 className="text-2xl font-semibold tracking-tight">{t(signup ? "signupTitle" : "loginTitle")}</h1>
      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        {signup && (
          <label className="block text-sm">{t("name")}
            <input name="name" required autoComplete="name" className={input} />
          </label>
        )}
        <label className="block text-sm">{t("email")}
          <input name="email" type="email" required autoComplete="email" className={input} />
        </label>
        <label className="block text-sm">{t("password")}
          <input name="password" type="password" required minLength={8} autoComplete={signup ? "new-password" : "current-password"} className={input} />
        </label>
        {error && <p role="alert" className="text-sm text-danger">{t("error")}</p>}
        <button disabled={busy} className="min-h-11 w-full rounded-lg bg-accent font-medium text-accent-fg disabled:opacity-60">
          {t(signup ? "signup" : "login")}
        </button>
      </form>
      {social.length > 0 && (
        <div className="mt-4 grid gap-2">
          {social.map((p) => (
            <button key={p} type="button" onClick={() => authClient.signIn.social({ provider: p, callbackURL: "/dashboard" })}
              className="min-h-11 rounded-lg border border-line bg-surface text-sm capitalize hover:bg-surface-2">
              <i className={`bi bi-${p} mr-2`} aria-hidden />{p}
            </button>
          ))}
        </div>
      )}
      <p className="mt-6 text-sm text-muted">
        {t(signup ? "haveAccount" : "noAccount")}{" "}
        <Link href={signup ? "/login" : "/signup"} className="text-accent underline underline-offset-4">
          {t(signup ? "login" : "signup")}
        </Link>
      </p>
    </div>
  );
}
