"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { THEMES, THEME_COOKIE, type Theme } from "@/lib/themes";

export function ThemeSwitcher({ initial }: { initial: Theme }) {
  const t = useTranslations("Theme");
  const [theme, setTheme] = useState<Theme>(initial);

  function pick(next: Theme) {
    setTheme(next);
    document.documentElement.dataset.theme = next;
    document.cookie = `${THEME_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
  }

  return (
    <div role="radiogroup" aria-label="Theme" className="inline-flex rounded-lg border border-line bg-surface p-0.5">
      {THEMES.map((name) => (
        <button
          key={name}
          type="button"
          role="radio"
          aria-checked={theme === name}
          onClick={() => pick(name)}
          className={`min-h-9 rounded-md px-3 text-sm transition-colors ${
            theme === name ? "bg-accent text-accent-fg" : "text-muted hover:text-fg"
          }`}
        >
          {t(name)}
        </button>
      ))}
    </div>
  );
}
