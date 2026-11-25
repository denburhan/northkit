import { defineConfig } from "@playwright/test";

const PORT = 3200;
const env = {
  BETTER_AUTH_SECRET: "e2e-secret-e2e-secret-e2e-secret-0123456789",
  BETTER_AUTH_URL: `http://localhost:${PORT}`,
  NEXT_PUBLIC_SITE_URL: `http://localhost:${PORT}`,
  DATABASE_URL: "./data/e2e.db",
};

export default defineConfig({
  testDir: "./e2e",
  workers: 1,
  use: { baseURL: `http://localhost:${PORT}`, trace: "retain-on-failure" },
  webServer: {
    command: `rm -f data/e2e.db* && npm run build && npx next start -p ${PORT}`,
    url: `http://localhost:${PORT}/en`,
    timeout: 240_000,
    reuseExistingServer: false,
    env,
  },
});
