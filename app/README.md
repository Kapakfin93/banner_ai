# BannerAI - AI Prompt Generator untuk Desainer

> Dari brief klien ke prompt AI dalam 60 detik.

## Apa ini?

BannerAI adalah tool web-based yang mengubah form input spesifikasi banner dari klien menjadi prompt AI yang di-optimasi untuk menghasilkan desain banner & spanduk berkualitas tinggi. Cocok untuk desainer grafis, print shop owner, dan marketing agency.

## Fitur

- **Form Input Intuitif** - Isi spesifikasi banner dengan mudah
- **Prompt Otomatis** - Generate prompt AI optimized secara real-time
- **Copy & Paste** - Langsung salin prompt ke Midjourney, DALL-E, dll
- **History** - Simpan riwayat desain untuk digunakan kembali
- **Image Generation** - Generate image langsung dari sistem (fullstack)
- **Responsive** - Bisa dipakai di desktop maupun mobile

## Tech Stack

- **Frontend**: React 19 + TypeScript + Vite + Tailwind CSS + shadcn/ui
- **Backend**: Hono + tRPC + Drizzle ORM
- **Database**: MySQL

## Persyaratan

- Node.js 20+
- MySQL (local atau cloud)
- npm atau yarn

## Setup Lokal

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Environment Variables

Copy file `.env.example` ke `.env` dan isi:

```bash
cp .env.example .env
```

Edit file `.env`:

```env
DATABASE_URL=mysql://username:password@localhost:3306/bannerai
# Ganti username, password, dan nama database sesuai MySQL Anda
```

### 3. Setup Database

```bash
# Push schema ke database
npm run db:push
```

### 4. Jalankan Development Server

```bash
npm run dev
```

Buka browser: http://localhost:3000

## Build untuk Production

```bash
npm run build
```

Hasil build ada di folder `dist/`.

```bash
# Jalankan production server
npm start
```

## Commands

| Command | Deskripsi |
|---------|-----------|
| `npm run dev` | Development server (port 3000) |
| `npm run build` | Build untuk production |
| `npm start` | Jalankan production server |
| `npm run check` | TypeScript type check |
| `npm run db:push` | Sync database schema |
| `npm run db:generate` | Generate migration file |
| `npm run db:migrate` | Apply migration |
| `npm run format` | Format code |
| `npm run test` | Run tests |

## Struktur Project

```
app/
├── api/                    # Backend
│   ├── routers/
│   │   └── banner.ts       # Banner API endpoints
│   ├── router.ts           # Router registration
│   ├── middleware.ts       # tRPC middleware
│   └── boot.ts             # Server entry
├── db/                     # Database
│   └── schema.ts           # Drizzle schema
├── contracts/              # Shared types (frontend + backend)
├── src/
│   ├── types/
│   │   └── banner.ts       # TypeScript types & options
│   ├── lib/
│   │   └── promptEngine.ts # Prompt generation engine
│   ├── hooks/
│   │   └── useBannerGenerator.ts
│   ├── sections/
│   │   ├── BannerForm.tsx       # Form input
│   │   ├── PromptPreview.tsx    # Prompt display
│   │   ├── GeneratedResult.tsx  # Image result
│   │   └── HistoryGallery.tsx   # History list
│   ├── providers/
│   │   └── trpc.tsx        # tRPC client provider
│   ├── App.tsx             # Main app layout
│   └── main.tsx            # Entry point
├── public/
│   └── generated/          # Generated images storage
├── .env                    # Environment variables
├── package.json
└── vite.config.ts
```

## Dokumentasi

- `BannerAI-PRD.md` - Product Requirements Document
- `BannerAI-Workflow.md` - Workflow documentation
- `co-agent-context.md` - Panduan customization untuk AI co-agent

## Cara Penggunaan

### 1. Isi Form Spesifikasi Banner

Masukkan detail banner Anda:
- Nama Brand / Usaha
- Kategori Bisnis
- Tagline / Slogan
- Ukuran Banner
- Warna Tema
- Gaya Desain
- Elemen Visual
- Target Audiens & Mood
- Informasi Kontak (opsional)
- Catatan Tambahan (opsional)

### 2. Copy Prompt AI

Lihat prompt yang otomatis ter-generate di panel kanan, lalu klik "Salin Prompt".

### 3. Paste ke AI Image Generator

Paste prompt ke Midjourney, DALL-E, Bing Image Creator, atau AI image generator lainnya.

### 4. Generate Image Langsung (Fullstack)

Atau klik "Generate Banner AI" untuk generate image langsung dari sistem.

## Customization

Lihat `co-agent-context.md` untuk panduan lengkap mengcustomize aplikasi ini. Beberapa yang bisa dicustomize:

- Menambah kategori bisnis baru
- Menambah gaya desain baru
- Menambah elemen visual baru
- Mengganti tema warna
- Menambah field baru di form
- Menambah fitur baru

## License

MIT License
