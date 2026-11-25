# Northkit

Open-source Next.js starter you fully own: Better Auth, Drizzle + SQLite, native i18n (EN/ID, RTL-ready), three themes, admin panel and SEO basics. No vendor lock-in.

## Quick start

```bash
cp .env.example .env        # set BETTER_AUTH_SECRET: openssl rand -base64 32
npm install
npm run db:generate && npm run db:migrate
npm run dev
```

Open http://localhost:3000. Sign up, then set your user's `role` to `admin` in the `user` table to see `/admin`.

## Stack

Next.js 16, React 19, Tailwind 4, Better Auth (email + optional GitHub/Google), Drizzle ORM, better-sqlite3, next-intl.

## Roadmap

See [ROADMAP.md](./ROADMAP.md).

## License

MIT
