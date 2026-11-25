import { test, expect } from "@playwright/test";
import Database from "better-sqlite3";

const email = `user${Date.now()}@example.com`;
const password = "password123";

test("locale redirect and switcher", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/en$/);
  await page.getByRole("button", { name: "id", exact: true }).click();
  await expect(page).toHaveURL(/\/id$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Luncurkan");
  await expect(page.locator("html")).toHaveAttribute("lang", "id");
});

test("dashboard requires login", async ({ page }) => {
  await page.goto("/en/dashboard");
  await expect(page).toHaveURL(/\/en\/login$/);
});

test("signup, theme persists, admin gate, ban flow", async ({ page }) => {
  await page.goto("/en/signup");
  await page.getByLabel("Name").fill("E2E User");
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Password").fill(password);
  await page.getByRole("button", { name: "Create account" }).click();
  await expect(page).toHaveURL(/\/en\/dashboard$/);
  await expect(page.getByText(email)).toBeVisible();

  await page.getByRole("radio", { name: "Ember" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "ember");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "ember");

  await page.goto("/en/admin");
  await expect(page.getByText("Admins only.")).toBeVisible();

  const db = new Database("./data/e2e.db");
  db.prepare("update user set role='admin' where email=?").run(email);
  db.close();

  await page.goto("/en/admin");
  await expect(page.getByRole("heading", { name: "Users" })).toBeVisible();
  await expect(page.getByText(email)).toBeVisible();
});

test("wrong password shows error", async ({ page }) => {
  await page.goto("/en/login");
  await page.getByLabel("Email").fill("nobody@example.com");
  await page.getByLabel("Password").fill("wrongpass1");
  await page.getByRole("button", { name: "Log in" }).click();
  await expect(page.getByRole("alert")).toBeVisible();
});
