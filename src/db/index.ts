import { mkdirSync } from "node:fs";
import { dirname } from "node:path";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import * as schema from "./schema";

const url = process.env.DATABASE_URL ?? "./data/northkit.db";
mkdirSync(dirname(url), { recursive: true });
const sqlite = new Database(url);
sqlite.pragma("journal_mode = WAL");
sqlite.pragma("foreign_keys = ON");

export const db = drizzle(sqlite, { schema });

if (process.env.NEXT_PHASE !== "phase-production-build") {
  migrate(db, { migrationsFolder: "./drizzle" });
}
