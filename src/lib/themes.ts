export const THEMES = ["midnight", "paper", "ember"] as const;
export type Theme = (typeof THEMES)[number];
export const THEME_COOKIE = "nk-theme";
export const isTheme = (v: unknown): v is Theme => THEMES.includes(v as Theme);
