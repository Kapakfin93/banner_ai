# BannerAI - Product Requirements Document

## 1. Product Overview

### Nama Produk
**BannerAI** - AI Prompt Generator untuk Desainer Banner & Spanduk

### Tagline
"Dari Brief Klien ke Prompt AI dalam 60 Detik"

### Deskripsi
BannerAI adalah tool web-based yang mengubah form input spesifikasi banner dari klien menjadi prompt AI yang di-optimasi untuk menghasilkan desain banner berkualitas tinggi. Tool ini mempercepat workflow desainer dari proses konsep dasar yang biasanya memakan waktu 30-60 menit menjadi kurang dari 2 menit.

### Target User
- Desainer grafis freelance yang menerima pesanan banner/spanduk
- Print shop owner yang perlu desain cepat
- Marketing agency yang butuh banner dalam jumlah banyak
- Pemilik UMKM yang ingin membuat banner sendiri

---

## 2. Goals & Objectives

### Primary Goals
1. **Speed**: Mengurangi waktu konsep dasar dari 30-60 menit menjadi < 2 menit
2. **Quality**: Generate prompt AI yang menghasilkan desain high-converting
3. **Consistency**: Standardisasi output prompt berdasarkan best practices desain banner
4. **Accessibility**: Tool yang bisa dipakai tanpa pengetahuan coding atau prompt engineering

### Success Metrics
- User dapat menghasilkan prompt dalam < 60 detik
- Prompt menghasilkan desain yang relevan dengan spesifikasi > 90% akurasi
- User mengurangi waktu konsep dasar > 80%

---

## 3. Feature Requirements

### 3.1 Core Features (MVP)

#### FR-001: Form Input Spesifikasi Banner
**Priority**: P0 (Must Have)

| Field | Type | Required | Options |
|-------|------|----------|---------|
| Nama Brand | text | Yes | - |
| Kategori Bisnis | select | Yes | kuliner, fashion, jasa, elektronik, kecantikan, kesehatan, pendidikan, otomotif, properti, event, umkm, lainnya |
| Tagline/Slogan | text | No | - |
| Ukuran Banner | select | Yes | 2x1, 3x1, 3x2, 4x1, 4x2, 6x3, 1x2, custom |
| Warna Utama | color | Yes | Default: #FF6B35 |
| Warna Sekunder | color | Yes | Default: #2C3E50 |
| Gaya Desain | select-card | Yes | 8 pilihan (modern-minimalist, elegant-premium, playful-fun, bold-aggressive, rustic-vintage, professional-corporate, tropical-fresh, futuristic-tech) |
| Elemen Visual | multi-select | No | 8 pilihan (product-photo, illustration, ornament, gradient-bg, pattern, geometric, photo-background, mascot) |
| Target Audiens | select | Yes | 9 pilihan |
| Mood/Feel | select | Yes | 8 pilihan |
| Informasi Kontak | textarea | No | - |
| Catatan Tambahan | textarea | No | - |

#### FR-002: Real-time Prompt Generation
**Priority**: P0 (Must Have)

- Prompt otomatis ter-generate setiap kali form berubah
- Prompt menggunakan bahasa Inggris (optimized untuk AI image generators)
- Menggunakan prompt engineering best practices
- Include: subject, keywords, style, colors, elements, mood, technical specs

#### FR-003: Prompt Preview & Copy
**Priority**: P0 (Must Have)

- Panel preview prompt yang bisa di-scroll
- Tombol "Salin Prompt" ke clipboard
- Feedback visual saat prompt tersalin

#### FR-004: History / Riwayat Desain
**Priority**: P1 (Should Have)

- Menyimpan riwayat prompt yang pernah dibuat
- Menggunakan localStorage (frontend) atau database (fullstack)
- Bisa melihat kembali dan reload spesifikasi lama
- Bisa menghapus item dari riwayat

#### FR-005: AI Image Generation (Fullstack)
**Priority**: P1 (Should Have)

- Submit job ke backend
- Generate image menggunakan AI image generation API
- Polling status job sampai selesai
- Tampilkan hasil image di browser
- Download hasil image

### 3.2 Feature Enhancements (Future)

#### FR-006: Export ke Format File
- Export prompt ke .txt file
- Export spesifikasi ke .pdf brief

#### FR-007: Template Library
- Simpan template spesifikasi yang sering digunakan
- Bisa share template antar user

#### FR-008: Batch Generation
- Input multiple brand sekaligus
- Generate prompt untuk semua brand dalam satu klik

#### FR-009: Prompt Marketplace
- Gallery prompt yang dibuat komunitas
- Rating dan review prompt

---

## 4. Technical Architecture

### 4.1 Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 19 + TypeScript + Vite + Tailwind CSS + shadcn/ui |
| Backend | Hono + tRPC + Drizzle ORM + MySQL |
| State Management | React hooks + localStorage |
| API Style | tRPC (end-to-end type safe) |
| Database | MySQL via Drizzle ORM |

### 4.2 Database Schema

```sql
-- Table: generation_jobs
- id: SERIAL PRIMARY KEY
- brandName: VARCHAR(255) NOT NULL
- category: VARCHAR(100) NOT NULL
- tagline: VARCHAR(500)
- contactInfo: TEXT
- bannerSize: VARCHAR(50) NOT NULL
- designStyle: VARCHAR(100) NOT NULL
- primaryColor: VARCHAR(20) NOT NULL
- secondaryColor: VARCHAR(20) NOT NULL
- visualElements: TEXT (JSON string)
- targetAudience: VARCHAR(100) NOT NULL
- mood: VARCHAR(100) NOT NULL
- additionalNotes: TEXT
- prompt: TEXT NOT NULL
- status: VARCHAR(50) DEFAULT 'pending'
- imageUrl: TEXT
- errorMessage: TEXT
- createdAt: TIMESTAMP DEFAULT NOW()
- updatedAt: TIMESTAMP DEFAULT NOW() ON UPDATE NOW()
```

### 4.3 API Endpoints (tRPC Routers)

```
banner.submit   - Submit generation job (mutation)
banner.status   - Get job status (query)
banner.list     - List all jobs (query)
banner.delete   - Delete a job (mutation)
```

### 4.4 File Structure

```
app/
├── api/                    # Backend
│   ├── routers/
│   │   └── banner.ts       # Banner tRPC router
│   ├── router.ts           # Main router
│   ├── middleware.ts       # tRPC middleware
│   ├── context.ts          # tRPC context
│   └── boot.ts             # Server entry
├── db/                     # Database
│   └── schema.ts           # Drizzle schema
├── contracts/              # Shared types
├── src/
│   ├── types/
│   │   └── banner.ts       # TypeScript types
│   ├── lib/
│   │   └── promptEngine.ts # Prompt generation engine
│   ├── hooks/
│   │   └── useBannerGenerator.ts # Main hook
│   ├── sections/
│   │   ├── BannerForm.tsx       # Form input
│   │   ├── PromptPreview.tsx    # Prompt display
│   │   ├── GeneratedResult.tsx  # Image result
│   │   └── HistoryGallery.tsx   # History list
│   ├── providers/
│   │   └── trpc.tsx        # tRPC provider
│   ├── App.tsx             # Main app
│   └── main.tsx            # Entry point
├── public/
│   └── generated/          # Generated images storage
├── .env                    # Environment variables
├── package.json
└── vite.config.ts
```

---

## 5. Prompt Engine Specification

### 5.1 Prompt Structure

Prompt di-generate dari komponen-komponen berikut:

```
[CORE SUBJECT] + [BRAND CONTENT] + [CATEGORY DETAILS] + 
[STYLE DESCRIPTION] + [COLOR SCHEME] + [VISUAL ELEMENTS] + 
[MOOD & ATMOSPHERE] + [TARGET AUDIENCE] + [TECHNICAL SPECS] + 
[ADDITIONAL NOTES]
```

### 5.2 Category Keywords Map

| Kategori | Subject | Keywords | Props |
|----------|---------|----------|-------|
| Kuliner | food and beverage banner | appetizing, delicious, fresh ingredients | plates, utensils, steam effects |
| Fashion | fashion and clothing banner | stylish, trendy, elegant outfit | hangers, mannequins, fabric textures |
| Jasa | professional service banner | reliable, expert, professional team | tools, uniforms, work in progress |
| Elektronik | electronics and gadgets banner | high-tech, innovative, cutting-edge | devices, circuit patterns, glowing screens |
| Kecantikan | beauty and skincare banner | glowing, radiant, premium beauty | serum bottles, flowers, mirror |
| Kesehatan | health and medical banner | healthy, caring, professional medical | medical cross, stethoscope |
| Pendidikan | education and course banner | knowledge, growth, learning | books, graduation cap, lightbulb |
| Otomotif | automotive banner | powerful, sleek design, high performance | car silhouettes, tire tracks |
| Properti | real estate and property banner | dream home, luxury living | house icons, key, building silhouettes |
| Event | event and celebration banner | exciting, festive, grand celebration | confetti, stage lights, tickets |
| UMKM | local business and retail banner | community-friendly, authentic | shop front, local elements |

### 5.3 Style Configuration

| Style | Description | Artistic Direction | Typography | Layout |
|-------|-------------|-------------------|------------|--------|
| Modern Minimalist | Clean minimalist design | Minimalist, Scandinavian, negative space | Thin sans-serif, modern | Asymmetric, grid-based |
| Elegant Premium | Luxurious premium design | Gold foil, marble textures, soft gradients | Elegant serif, calligraphy | Centered, ornate borders |
| Playful Fun | Colorful playful design | Pop art, bright colors, bouncing shapes | Rounded display fonts | Diagonal compositions |
| Bold Aggressive | High-contrast bold design | Street art, high contrast, urban | Heavy display fonts | Asymmetrical power layout |
| Rustic Vintage | Vintage retro design | Distressed textures, retro palette | Vintage serif, weathered | Classic poster layout |
| Professional Corporate | Corporate professional design | Clean lines, geometric precision | Professional sans-serif | Structured grid layout |
| Tropical Fresh | Fresh tropical design | Tropical leaves, watercolor effects | Handwritten script | Flowing organic layout |
| Futuristic Tech | Futuristic tech design | Neon glow, holographic effects | Futuristic display | Tech-grid overlay |

---

## 6. UI/UX Design

### 6.1 Layout

```
+----------------------------------------------------------+
| [Header: Logo + BannerAI + AI-Powered Badge]             |
+----------------------------------------------------------+
|                                                          |
|  +------------------------+  +------------------------+  |
|  | SPESIFIKASI BANNER     |  | PROMPT AI              |  |
|  |                        |  |                        |  |
|  | [Informasi Brand]      |  | [Prompt Preview Panel] |  |
|  |   - Nama Brand *       |  |                        |  |
|  |   - Kategori           |  | [Hasil Generate]       |  |
|  |   - Tagline            |  |                        |  |
|  |                        |  | [Riwayat Desain]       |  |
|  | [Spesifikasi Banner]   |  |                        |  |
|  |   - Ukuran             |  | [Tips Card]            |  |
|  |                        |  +------------------------+  |
|  | [Warna Tema]           |                              |
|  |   - Color pickers      |                              |
|  |   - Presets            |                              |
|  |                        |                              |
|  | [Gaya Desain]          |                              |
|  |   - Selectable cards   |                              |
|  |                        |                              |
|  | [Elemen Visual]        |                              |
|  |   - Multi-select cards |                              |
|  |                        |                              |
|  | [Target & Mood]        |                              |
|  |                        |                              |
|  | [Kontak & Catatan]     |                              |
|  |                        |                              |
|  | [GENERATE BUTTON]      |                              |
|  +------------------------+                              |
|                                                          |
+----------------------------------------------------------+
| [Footer]                                                 |
+----------------------------------------------------------+
```

### 6.2 Design System

- **Primary Gradient**: `from-orange-500 to-pink-500`
- **Background**: `bg-gray-50`
- **Cards**: White with colored left border (4px)
- **Font**: System font stack (Inter fallback)
- **Spacing**: 6-unit grid gap, 5-unit card padding
- **Border Radius**: `rounded-xl` for cards, `rounded-lg` for inputs
- **Shadows**: `shadow-sm` default, `shadow-lg` for featured

### 6.3 Color-coded Sections

| Section | Border Color | Icon Color |
|---------|-------------|------------|
| Informasi Brand | Orange 500 | Orange 500 |
| Spesifikasi Banner | Blue 500 | Blue 500 |
| Warna Tema | Purple 500 | Purple 500 |
| Gaya Desain | Pink 500 | Pink 500 |
| Elemen Visual | Green 500 | Green 500 |
| Target & Mood | Cyan 500 | Cyan 500 |
| Kontak | Indigo 500 | Indigo 500 |
| Catatan | Amber 500 | Amber 500 |
| Prompt Preview | Emerald 500 | Emerald 500 |

---

## 7. Data Flow

### 7.1 Prompt Generation Flow

```
User Input (Form Field Change)
    |
    v
useBannerGenerator Hook
    |
    v
promptEngine.ts (generateOptimizedPrompt)
    |
    v
[Category Keywords] + [Style Config] + [Elements] + [Mood] + [Audience]
    |
    v
Real-time Prompt Update (state)
    |
    v
PromptPreview Component (display)
    |
    v
User clicks "Salin Prompt" → Clipboard
    |
    v
Paste to AI Image Generator (Midjourney/DALL-E/etc)
```

### 7.2 Image Generation Flow (Fullstack)

```
User clicks "Generate Banner AI"
    |
    v
tRPC banner.submit mutation
    |
    v
Insert job to database (status: pending)
    |
    v
Return job ID
    |
    v
Frontend starts polling (every 3 seconds)
    |
    v
tRPC banner.status query
    |
    v
[Backend processes image generation]
    |
    v
Update job status (completed/failed) + imageUrl
    |
    v
Frontend receives completed status
    |
    v
Display generated image + add to history
```

---

## 8. Error Handling

| Scenario | Handling |
|----------|----------|
| Brand name kosong | Disable generate button, show error message |
| API call failed | Show toast error, stop loading state |
| Image generation failed | Update status to failed, show error message |
| Database unavailable | Fallback to localStorage only |
| Clipboard not supported | Show fallback manual copy |
| localStorage full | Silently fail, continue without history |

---

## 9. Performance Requirements

| Metric | Target |
|--------|--------|
| Time to Interactive | < 3 seconds |
| Prompt generation | < 100ms (real-time) |
| Image generation | < 30 seconds |
| Page load size | < 500KB JS gzipped |
| Lighthouse score | > 90 |

---

## 10. Security Considerations

- Input sanitization pada semua form fields
- Database queries via Drizzle ORM (type-safe, SQL injection safe)
- tRPC input validation menggunakan Zod schema
- Environment variables untuk API keys dan secrets
- File upload restrictions (ukuran, tipe file)

---

## 11. Changelog

| Version | Date | Changes |
|---------|------|---------|
| v1.0.0 | 2026-06-05 | Initial release - Form input, prompt generation, history, image generation |
| v1.1.0 | TBD | Template library, export to PDF |
| v1.2.0 | TBD | Batch generation, prompt marketplace |
