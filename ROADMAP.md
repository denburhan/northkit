# Northkit - Roadmap

Working name: **Northkit** (github.com/denburhan/northkit, nama belum dipakai di GitHub, kolisi hanya repo 0 bintang).
Tagline: The self-owned, global-ready Next.js starter. No vendor lock-in.

## Positioning
Menang di celah, bukan head-to-head:
1. i18n sungguhan sejak hari 1 (EN + ID, siap tambah bahasa, termasuk RTL)
2. Tanpa Clerk: Better Auth + Drizzle, self-host penuh
3. Admin dashboard + user management sudah jadi
4. Dark premium, mobile paritas penuh
5. Deploy: Docker, Vercel, panduan Cloudflare
6. AGENTS.md untuk AI agent
7. SEO bawaan (lihat bawah)

## Model bisnis: open-core
- **Free (MIT)**: seluruh fondasi + 3 tema. Selamanya gratis, tidak dipotong.
- **Pro (berbayar, lisensi per developer, sekali bayar)**: tema tambahan, billing, modul lanjutan, Theme-from-URL.
- Pro dikirim lewat repo privat (akses via GitHub invite) atau paket privat. Core tetap bisa dipakai tanpa Pro.
- Jangan menahan fitur dasar di balik Pro. Tamu gratis harus sukses dulu, baru tergoda upgrade.

## Fase 0 - Fondasi (minggu 1)
- Repo, MIT, CI, lint, typecheck, Playwright smoke test
- Next.js + TypeScript + Tailwind + shadcn/ui
- Better Auth (email, Google, GitHub), Drizzle, SQLite lokal / Postgres produksi
- next-intl: EN + ID, switcher bahasa, hreflang
- Dark premium design tokens, komponen seragam, mobile-first

## Fase 1 - v0.1 Free launch (minggu 2-3)
- Landing page + docs + dashboard + halaman akun
- Admin: daftar user, peran, ban/hapus (aksi destruktif tersembunyi)
- **3 tema gratis**: Midnight (dark premium), Paper (light bersih), Ember (dark hangat). Ganti tema lewat satu file token.
- SEO bawaan: metadata API per halaman, sitemap.xml, robots, OpenGraph image dinamis, JSON-LD (Organization, SoftwareApplication, Article), canonical + hreflang, skor Lighthouse >= 95 diuji
- Docker + panduan Vercel + panduan Cloudflare (diuji nyata)
- README Inggris + screenshot + demo live + GIF
- AGENTS.md
- Publish, lalu launch: Product Hunt, Hacker News (Show HN), r/nextjs, dev.to, X

## Fase 2 - v0.2 Pertumbuhan (bulan 2)
- Bahasa tambahan oleh kontributor (template terjemahan + panduan), RTL (Arab)
- Blog/MDX + RSS + SEO artikel
- Email transaksional (Resend/SMTP), reset password, verifikasi
- Tutorial video singkat, galeri "dibuat dengan Northkit"
- Terima PR, label good-first-issue

## Fase 3 - Pro v1 (bulan 3)
- Pack tema Pro (10+ tema, pilihan industri: SaaS, agency, e-commerce, portfolio)
- Billing: Stripe, Polar, Midtrans/Xendit (pasar Indonesia, pembeda lokal)
- Multi-tenant/organisasi + peran
- Panel SEO: editor meta per halaman, cek skor, redirect manager, laporan internal link
- Audit log, rate limit, 2FA

## Fase 4 - Pro v2 (bulan 4-6)
- **Theme-from-URL**: masukkan URL situs referensi, sistem membaca warna, font, spacing, radius, lalu menghasilkan file tema. Hanya token desain (angka), bukan salin konten/gambar/kode.
- AI: chat/asisten terpasang, generator konten + SEO
- Template siap pakai: dashboard SaaS, landing produk, direktori, marketplace
- CLI: `npx create-northkit` dengan pilihan modul

## Soal fitur "clone website lain"
Salin utuh situs orang lain berisiko hak cipta (konten, gambar, kode) dan merusak reputasi repo publik. Versi aman dan tetap kuat:
- Theme-from-URL (token desain saja), di Pro v2
- Mode "inspirasi": ekstrak struktur layout (hero, grid, footer) jadi kerangka kosong, tanpa teks/gambar asli
- Pengguna wajib mengganti konten sendiri; ada peringatan lisensi di UI dan docs
Ini juga sejalan dengan cara kerja benchmark yang sudah kamu pakai (ukur tipografi dari situs contoh).

## Ide tambahan
- **Marketplace tema** pihak ketiga, bagi hasil
- **Northkit Cloud** (hosted, nanti kalau sudah ada traksi)
- **Sponsor/GitHub Sponsors** sejak v0.1
- **Template per niche** dijual terpisah (mis. kit klinik, kit sekolah, kit toko)
- Lisensi komersial untuk agency (banyak klien)

## Metrik
- v0.1: 200 bintang di 30 hari, 10 kontributor di 90 hari
- Pro: pembeli pertama sebelum bulan 4
- Kualitas: Lighthouse >= 95, 0 vuln kritis, CI hijau

## Risiko
- Bintang tidak otomatis jadi pembeli. Uji minat Pro dengan waitlist di README.
- Next.js di Cloudflare masih bergesekan (OpenNext); utamakan Docker/Vercel, Cloudflare jadi panduan terverifikasi saja.
- Kompetitor besar bisa menambah i18n. Keunggulan harus tetap di paket lengkap + kualitas tampilan, bukan satu fitur.
