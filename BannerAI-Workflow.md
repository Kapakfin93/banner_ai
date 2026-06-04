# BannerAI - Workflow Documentation

## Table of Contents
1. [User Workflow](#1-user-workflow)
2. [Prompt Engineering Workflow](#2-prompt-engineering-workflow)
3. [Image Generation Workflow](#3-image-generation-workflow)
4. [Development Workflow](#4-development-workflow)
5. [Deployment Workflow](#5-deployment-workflow)
6. [Customization Workflow](#6-customization-workflow)

---

## 1. User Workflow

### 1.1 Flowchart: Membuat Prompt Banner

```
+-----------+     +------------------+     +------------------+
|  START    | --> |  Buka BannerAI   | --> | Isi Form Detail  |
+-----------+     +------------------+     +------------------+
                                                  |
                                                  v
+----------------+     +------------------+     +------------------+
|  Selesai!      | <-- |  Copy Prompt     | <-- | Lihat Prompt     |
|  (Paste ke AI) |     |  ke Clipboard    |     | di Panel Kanan   |
+----------------+     +------------------+     +------------------+
```

### 1.2 Langkah Detail (Mode Copy-Prompt)

**Langkah 1: Isi Informasi Brand (10 detik)**
- Masukkan Nama Brand / Usaha (wajib)
- Pilih Kategori Bisnis dari dropdown
- Masukkan Tagline / Slogan (opsional)

**Langkah 2: Pilih Spesifikasi Teknis (15 detik)**
- Pilih Ukuran Banner (2x1, 3x1, 3x2, 4x1, 4x2, 6x3, 1x2, atau custom)
- Pilih Warna Utama dan Warna Sekunder (color picker atau preset)

**Langkah 3: Pilih Gaya Desain (15 detik)**
- Pilih Gaya Desain dari 8 opsi:
  - Modern Minimalis
  - Elegan Premium
  - Playful & Ceria
  - Bold & Agresif
  - Rustic & Vintage
  - Professional Corporate
  - Tropical & Fresh
  - Futuristic Tech

**Langkah 4: Pilih Elemen Visual (10 detik)**
- Centang elemen visual yang diinginkan:
  - Foto Produk
  - Ilustrasi / Vector
  - Ornamen Dekoratif
  - Background Gradient
  - Pattern / Tekstur
  - Bentuk Geometris
  - Foto Background
  - Maskot Karakter

**Langkah 5: Pilih Target & Mood (10 detik)**
- Pilih Target Audiens (Umum, Anak-anak, Remaja, Dewasa, dll)
- Pilih Mood/Feel (Ceria, Tenang, Enerjik, Mewah, dll)

**Langkah 6: Tambahan (Opsional, 10 detik)**
- Isi Informasi Kontak (jika ingin muncul di banner)
- Tambahkan Catatan Tambahan untuk instruksi khusus

**Langkah 7: Copy Prompt (5 detik)**
- Lihat prompt yang sudah otomatis ter-generate di panel kanan
- Klik tombol "Salin Prompt"
- Prompt tersimpan di clipboard

**Langkah 8: Paste ke AI Image Generator**
- Buka tool AI pilihan (Midjourney, DALL-E, Bing, dll)
- Paste prompt
- Generate image
- Refine sesuai kebutuhan

### 1.3 Flowchart: Generate Image Langsung

```
+-----------+     +------------------+     +---------------------+
|  START    | --> |  Isi Form        | --> | Klik "Generate      |
+-----------+     +------------------+     | Banner AI"          |
                                           +---------------------+
                                                  |
                                                  v
+----------------+     +------------------+     +------------------+
|  Download /    | <-- |  Lihat Hasil     | <-- | Polling Status   |
|  Regenerate    |     |  di Browser      |     | (3 detik)        |
+----------------+     +------------------+     +------------------+
```

---

## 2. Prompt Engineering Workflow

### 2.1 Architecture: Prompt Engine

```
+---------------------+
|   BannerFormData    |
|   (User Input)      |
+----------+----------+
           |
           v
+---------------------+
|  promptEngine.ts    |
|                     |
|  generateOptimized  |
|  Prompt()           |
+----------+----------+
           |
           v
+---------------------+
|  Composed Prompt    |
|  (English, AI-ready)|
+---------------------+
```

### 2.2 Prompt Composition Pipeline

```
Input: BannerFormData
    |
    v
+------------------------------+
| Step 1: Core Subject         |
| Get category config          |
| "Professional advertising    |
|  [category.subject] design"  |
+------------------------------+
    |
    v
+------------------------------+
| Step 2: Brand Content        |
| Append brand name & tagline  |
| "featuring brand name        |
|  'X' with tagline 'Y'"      |
+------------------------------+
    |
    v
+------------------------------+
| Step 3: Category Details     |
| Append category keywords     |
| "appetizing, delicious..."   |
+------------------------------+
    |
    v
+------------------------------+
| Step 4: Style Description    |
| Get style config             |
| "clean minimalist design..." |
| "Typography: thin sans..."   |
| "Layout: asymmetric..."      |
+------------------------------+
    |
    v
+------------------------------+
| Step 5: Color Scheme         |
| Convert hex to color name    |
| "Color: red as primary,      |
|  blue as secondary"          |
+------------------------------+
    |
    v
+------------------------------+
| Step 6: Visual Elements      |
| Get selected elements        |
| "Visual: product photo,      |
|  gradient background"        |
+------------------------------+
    |
    v
+------------------------------+
| Step 7: Mood & Atmosphere    |
| Get mood config              |
| "Mood: cheerful, bright      |
|  warm lighting"              |
+------------------------------+
    |
    v
+------------------------------+
| Step 8: Target Audience      |
| Get audience config          |
| "Target: appealing to all    |
|  demographics"               |
+------------------------------+
    |
    v
+------------------------------+
| Step 9: Technical Specs      |
| Append standard specs        |
| "Technical: print-ready      |
|  300dpi, CMYK optimized"     |
+------------------------------+
    |
    v
+------------------------------+
| Step 10: Additional Notes    |
| Append custom notes          |
+------------------------------+
    |
    v
Output: Final Optimized Prompt
```

### 2.3 Category Configuration Map

```typescript
CATEGORY_PROMPTS = {
  kuliner: {
    subject: "food and beverage banner",
    keywords: "appetizing, delicious, fresh ingredients...",
    props: "plates, utensils, steam effects..."
  },
  fashion: {
    subject: "fashion and clothing banner",
    keywords: "stylish, trendy, elegant outfit...",
    props: "hangers, mannequins, fabric textures..."
  },
  // ... etc
}
```

### 2.4 Style Configuration Map

```typescript
STYLE_CONFIGS = {
  "modern-minimalist": {
    desc: "clean minimalist design...",
    artistic: "minimalist, Scandinavian...",
    font: "thin sans-serif fonts...",
    layout: "asymmetric layout..."
  },
  "elegant-premium": {
    desc: "luxurious premium design...",
    artistic: "gold foil accents...",
    font: "elegant serif fonts...",
    layout: "centered composition..."
  },
  // ... etc
}
```

---

## 3. Image Generation Workflow

### 3.1 Sequence Diagram

```
Frontend                        Backend                        Database
   |                               |                               |
   |-- banner.submit() ----------->|                               |
   |                               |-- INSERT job (pending) ------->|
   |                               |                               |
   |<-- jobId ---------------------|                               |
   |                               |                               |
   |-- banner.status() (poll) ---->|                               |
   |                               |-- SELECT job ---------------->|
   |                               |                               |
   |<-- status: pending -----------|                               |
   |                               |                               |
   |-- banner.status() (poll) ---->|                               |
   |                               |-- SELECT job ---------------->|
   |                               |                               |
   |<-- status: pending -----------|                               |
   |                               |                               |
   |         [AI generates image]  |                               |
   |                               |-- UPDATE job (completed) ---->|
   |                               |   + imageUrl                  |
   |                               |                               |
   |-- banner.status() (poll) ---->|                               |
   |                               |-- SELECT job ---------------->|
   |                               |                               |
   |<-- status: completed + url ---|                               |
   |                               |                               |
```

### 3.2 Job Status States

```
+---------+     +----------+     +-----------+     +----------+
| PENDING | --> | QUEUED   | --> | PROCESSING| --> | COMPLETED|
+---------+     +----------+     +-----------+     +----------+
                      |                                 |
                      |                                 |
                      v                                 v
                +----------+                      +----------+
                | FAILED   |                      | DOWNLOAD |
                +----------+                      +----------+
```

---

## 4. Development Workflow

### 4.1 Local Setup

```bash
# 1. Clone/download project
cd /path/to/project

# 2. Install dependencies
npm install

# 3. Setup environment
# Copy .env.example to .env
# Edit DATABASE_URL dan lainnya

# 4. Setup database
npm run db:push

# 5. Run development server
npm run dev

# 6. Buka browser
# http://localhost:3000
```

### 4.2 Project Commands

```bash
npm run dev          # Development server (port 3000)
npm run build        # Production build
npm start            # Start production server
npm run check        # TypeScript type check
npm run db:push      # Sync database schema
npm run db:generate  # Generate migration
npm run db:migrate   # Apply migration
npm run format       # Format code
npm run test         # Run tests
```

### 4.3 Adding New Features

**Tambah Kategori Baru:**
1. Edit `src/types/banner.ts` - tambah ke `BANNER_CATEGORIES`
2. Edit `src/lib/promptEngine.ts` - tambah ke `CATEGORY_PROMPTS`

**Tambah Gaya Desain Baru:**
1. Edit `src/types/banner.ts` - tambah ke `DESIGN_STYLES`
2. Edit `src/lib/promptEngine.ts` - tambah ke `STYLE_CONFIGS`

**Tambah Elemen Visual Baru:**
1. Edit `src/types/banner.ts` - tambah ke `VISUAL_ELEMENTS`
2. Edit `src/lib/promptEngine.ts` - tambah ke `ELEMENT_CONFIGS`

**Tambah tRPC Router Baru:**
1. Buat file di `api/routers/[name].ts`
2. Register di `api/router.ts`

---

## 5. Deployment Workflow

### 5.1 Local Deployment

```bash
# 1. Build
npm run build

# 2. Start
npm start

# Server berjalan di port 3000
```

### 5.2 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| DATABASE_URL | MySQL connection string | Yes |
| VITE_APP_ID | Application ID | Yes |
| VITE_KIMI_AUTH_URL | Kimi auth URL | Yes |
| VITE_AGENT_NAME | Agent name | Yes |
| APP_NAME | App name | Yes |
| PORT | Server port (default: 3000) | No |

### 5.3 Database Setup

```bash
# Sync schema (development)
npm run db:push

# Generate migration (production)
npm run db:generate

# Apply migration
npm run db:migrate
```

---

## 6. Customization Workflow

### 6.1 Mengganti Tema Warna Default

Edit file `src/hooks/useBannerGenerator.ts`:

```typescript
const DEFAULT_FORM: BannerFormData = {
  // Ganti warna default
  primaryColor: "#FF6B35",    // <-- Ubah ini
  secondaryColor: "#2C3E50",  // <-- Ubah ini
  // ...
};
```

### 6.2 Menambah Preset Warna

Edit file `src/sections/BannerForm.tsx`:

```tsx
{[
  ["#FF6B35", "#2C3E50"],
  ["#E74C3C", "#F39C12"],
  // Tambah preset baru di sini
  ["#WARNA-UTAMA", "#WARNA-SEKUNDER"],
].map(([primary, secondary], i) => (
```

### 6.3 Mengganti Bahasa Interface

Edit semua text di komponen dalam `src/sections/`:
- `BannerForm.tsx` - Label dan placeholder form
- `PromptPreview.tsx` - Text prompt panel
- `GeneratedResult.tsx` - Text hasil generate
- `App.tsx` - Header dan footer text

### 6.4 Menambah Field Baru di Form

1. Edit `src/types/banner.ts` - tambah field ke `BannerFormData`
2. Edit `src/hooks/useBannerGenerator.ts` - tambah ke `DEFAULT_FORM`
3. Edit `src/sections/BannerForm.tsx` - tambah input field
4. Edit `src/lib/promptEngine.ts` - gunakan field di prompt generation
5. Edit `db/schema.ts` - tambah kolom database (jika perlu disimpan)

---

## Appendix: File Reference

| File | Purpose |
|------|---------|
| `src/types/banner.ts` | All TypeScript types and option arrays |
| `src/lib/promptEngine.ts` | Prompt generation engine |
| `src/hooks/useBannerGenerator.ts` | Main state management hook |
| `src/sections/BannerForm.tsx` | Form input UI |
| `src/sections/PromptPreview.tsx` | Prompt display panel |
| `src/sections/GeneratedResult.tsx` | Image result display |
| `src/sections/HistoryGallery.tsx` | History list UI |
| `src/App.tsx` | Main app layout |
| `api/routers/banner.ts` | tRPC API router |
| `api/router.ts` | Router registration |
| `db/schema.ts` | Database schema |
