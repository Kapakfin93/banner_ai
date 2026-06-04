# Co-Agent Context: BannerAI Customization Guide

## Overview

Dokumen ini adalah panduan untuk AI co-agent yang akan membantu user mengcustomize dan mengembangkan aplikasi BannerAI lebih lanjut. Semua instruksi, constraint, dan pattern yang diperlukan ada di sini.

---

## Project Identity

- **Name**: BannerAI
- **Type**: Full-stack web application (React + tRPC + MySQL)
- **Purpose**: AI Prompt Generator untuk desainer banner/spanduk
- **Target User**: Desainer grafis, print shop owner, marketing agency
- **Language Interface**: Bahasa Indonesia (form labels, UI text)
- **Prompt Output**: Bahasa Inggris (optimized untuk AI image generators)

---

## Tech Stack (Fixed - Do Not Change)

| Layer | Technology | Version |
|-------|------------|---------|
| Frontend | React + TypeScript + Vite | React 19, Vite 7 |
| Styling | Tailwind CSS + shadcn/ui | Tailwind 3.4 |
| Backend | Hono + tRPC + Drizzle ORM | tRPC 11.x |
| Database | MySQL | via Drizzle |
| State | React hooks + localStorage | - |
| Validation | Zod | - |

---

## Architecture Overview

```
Frontend (Browser)
  ├── React Components (src/sections/)
  ├── Custom Hooks (src/hooks/)
  ├── Type Definitions (src/types/)
  ├── Prompt Engine (src/lib/promptEngine.ts)
  └── tRPC Client (src/providers/trpc.tsx)
         |
         | HTTP /api/trpc
         |
Backend (Server)
  ├── tRPC Router (api/router.ts)
  ├── Banner Router (api/routers/banner.ts)
  ├── Middleware (api/middleware.ts)
  ├── Context (api/context.ts)
  └── Hono Server (api/boot.ts)
         |
         | SQL
         |
Database (MySQL)
  └── generation_jobs table (db/schema.ts)
```

---

## Key Files & Responsibilities

### Frontend Core

| File | Responsibility | When to Edit |
|------|---------------|--------------|
| `src/types/banner.ts` | All TypeScript types, option arrays for dropdowns/selects | Add/remove categories, styles, elements, audiences, moods |
| `src/lib/promptEngine.ts` | Prompt generation logic | Change prompt structure, add new category/style configs |
| `src/hooks/useBannerGenerator.ts` | Main state management | Add new form fields, change default values |
| `src/sections/BannerForm.tsx` | Form input UI | Add/remove form fields, change layouts |
| `src/sections/PromptPreview.tsx` | Prompt display | Change prompt display format |
| `src/sections/GeneratedResult.tsx` | Image result display | Change result UI |
| `src/sections/HistoryGallery.tsx` | History list | Change history display |
| `src/App.tsx` | Main layout | Change page structure, add new sections |

### Backend Core

| File | Responsibility | When to Edit |
|------|---------------|--------------|
| `api/routers/banner.ts` | Banner tRPC endpoints | Add new API operations |
| `api/router.ts` | Router registration | Register new routers |
| `db/schema.ts` | Database schema | Add/remove columns |

---

## Prompt Engine Specification

### How It Works

The prompt engine takes `BannerFormData` and produces an optimized English prompt through a composition pipeline:

```
Input: BannerFormData
  → Category Config → Style Config → Element Configs
  → Mood Config → Audience Config
  → Aspect Ratio + Color Names
  → Compose all parts → Clean up → Output Prompt
```

### Adding New Category

**Step 1**: Add to `BANNER_CATEGORIES` in `src/types/banner.ts`:
```typescript
{ value: "fitness", label: "Fitness & Gym" },
```

**Step 2**: Add to `CATEGORY_PROMPTS` in `src/lib/promptEngine.ts`:
```typescript
fitness: {
  subject: "fitness and gym banner",
  keywords: "energetic, healthy lifestyle, workout motivation, strength training",
  props: "dumbbells, kettlebells, gym equipment, athletic figures",
},
```

### Adding New Design Style

**Step 1**: Add to `DESIGN_STYLES` in `src/types/banner.ts`:
```typescript
{ value: "hand-drawn", label: "Hand-Drawn Art", desc: "Ilustrasi tangan, organik, unik" },
```

**Step 2**: Add to `STYLE_CONFIGS` in `src/lib/promptEngine.ts`:
```typescript
"hand-drawn": {
  desc: "hand-drawn artistic illustration style",
  artistic: "hand-drawn sketches, organic lines, watercolor textures, unique artwork",
  font: "hand-lettered typography, brush script, artistic fonts",
  layout: "freeform composition, organic flow, artistic arrangement",
},
```

### Adding New Visual Element

**Step 1**: Add to `VISUAL_ELEMENTS` in `src/types/banner.ts`:
```typescript
{ value: "3d-element", label: "Elemen 3D", desc: "Objek 3D dengan depth dan shadow" },
```

**Step 2**: Add to `ELEMENT_CONFIGS` in `src/lib/promptEngine.ts`:
```typescript
"3d-element": {
  desc: "3D rendered elements",
  integration: "3D objects with realistic depth and shadow effects",
},
```

### Adding New Mood

**Step 1**: Add to `MOOD_OPTIONS` in `src/types/banner.ts`:
```typescript
{ value: "adventurous", label: "Petualangan & Berani", color: "#8B4513" },
```

**Step 2**: Add to `MOOD_CONFIGS` in `src/lib/promptEngine.ts`:
```typescript
adventurous: {
  desc: "adventurous and bold spirit",
  lighting: "dramatic outdoor lighting, golden hour",
  atmosphere: "daring, explorative, bold",
},
```

### Adding New Target Audience

**Step 1**: Add to `TARGET_AUDIENCES` in `src/types/banner.ts`:
```typescript
{ value: "parents", label: "Orang Tua" },
```

**Step 2**: Add to `AUDIENCE_CONFIGS` in `src/lib/promptEngine.ts`:
```typescript
parents: "family-oriented design, warm and trustworthy",
```

---

## UI Customization Patterns

### Change Color Theme

**Header gradient**: Edit `src/App.tsx`:
```tsx
// Current
className="bg-gradient-to-br from-orange-500 to-pink-500"

// New
className="bg-gradient-to-br from-blue-500 to-purple-500"
```

**Section border colors**: Edit in each section component:
```tsx
// Current
className="border-l-4 border-l-orange-500"

// New
className="border-l-4 border-l-blue-500"
```

### Change Default Colors

Edit `src/hooks/useBannerGenerator.ts`:
```typescript
const DEFAULT_FORM: BannerFormData = {
  // ...
  primaryColor: "#FF6B35",    // Change this
  secondaryColor: "#2C3E50",  // Change this
  // ...
};
```

### Change Language

All UI text is in the section components:
- `src/sections/BannerForm.tsx` - Form labels and placeholders
- `src/sections/PromptPreview.tsx` - Prompt panel labels
- `src/sections/GeneratedResult.tsx` - Result labels
- `src/App.tsx` - Header, footer, tips

### Add New Form Field

**Step 1**: Add to `BannerFormData` interface in `src/types/banner.ts`:
```typescript
export interface BannerFormData {
  // ... existing fields
  newField: string;
}
```

**Step 2**: Add to `DEFAULT_FORM` in `src/hooks/useBannerGenerator.ts`:
```typescript
const DEFAULT_FORM: BannerFormData = {
  // ... existing fields
  newField: "",
};
```

**Step 3**: Add UI in `src/sections/BannerForm.tsx`:
```tsx
<div className="space-y-2">
  <Label>Label Baru</Label>
  <Input
    value={formData.newField}
    onChange={(e) => onUpdateField("newField", e.target.value)}
  />
</div>
```

**Step 4**: Use in prompt engine `src/lib/promptEngine.ts`:
```typescript
// In generateOptimizedPrompt function
if (data.newField) {
  parts.push(`Additional info: ${data.newField}`);
}
```

**Step 5** (Optional): Add to database `db/schema.ts`:
```typescript
export const generationJobs = mysqlTable("generation_jobs", {
  // ... existing columns
  newField: varchar("new_field", { length: 255 }),
});
```

---

## API Customization

### Add New tRPC Endpoint

**Step 1**: Add procedure to `api/routers/banner.ts`:
```typescript
newEndpoint: publicQuery
  .input(z.object({ param: z.string() }))
  .query(async ({ input }) => {
    // Implementation
    return { result: "success" };
  }),
```

**Step 2**: Use in frontend via tRPC hook:
```typescript
const { data } = trpc.banner.newEndpoint.useQuery({ param: "value" });
```

### Add New Router

**Step 1**: Create `api/routers/newRouter.ts`:
```typescript
import { createRouter, publicQuery } from "../middleware";

export const newRouter = createRouter({
  hello: publicQuery.query(() => "Hello!"),
});
```

**Step 2**: Register in `api/router.ts`:
```typescript
import { newRouter } from "./routers/newRouter";

export const appRouter = createRouter({
  // ... existing routers
  newModule: newRouter,
});
```

---

## Database Operations

### Add Column to Existing Table

**Step 1**: Edit `db/schema.ts`:
```typescript
export const generationJobs = mysqlTable("generation_jobs", {
  // ... existing columns
  newColumn: varchar("new_column", { length: 255 }),
});
```

**Step 2**: Push schema:
```bash
npm run db:push
```

**Step 3**: Update queries in `api/routers/banner.ts`

### Create New Table

**Step 1**: Add to `db/schema.ts`:
```typescript
export const templates = mysqlTable("templates", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  config: text("config"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
```

**Step 2**: Create router file `api/routers/template.ts`

**Step 3**: Register in `api/router.ts`

**Step 4**: Push schema:
```bash
npm run db:push
```

---

## Common Tasks

### Task: Add "Fitness & Gym" Category

```
1. Edit src/types/banner.ts → Add to BANNER_CATEGORIES
2. Edit src/lib/promptEngine.ts → Add to CATEGORY_PROMPTS
3. npm run check → Verify no errors
4. Done
```

### Task: Change Default Theme to Blue

```
1. Edit src/hooks/useBannerGenerator.ts → Change DEFAULT_FORM colors
2. Edit src/App.tsx → Change header gradient
3. Edit src/sections/BannerForm.tsx → Change section border colors
4. Done
```

### Task: Add "Hand-Lettering" Font Style Option

```
1. Edit src/types/banner.ts → Add to DESIGN_STYLES
2. Edit src/lib/promptEngine.ts → Add to STYLE_CONFIGS
3. npm run check → Verify
4. Done
```

### Task: Add Template Save Feature

```
1. Edit db/schema.ts → Create templates table
2. npm run db:push
3. Create api/routers/template.ts
4. Register in api/router.ts
5. Add UI in frontend
6. npm run check
7. Done
```

---

## Constraints & Rules

1. **Never modify framework files**: `api/lib/`, `api/kimi/`, `api/middleware.ts` (base), `api/queries/connection.ts`
2. **Always use Zod validation** for tRPC inputs
3. **Always use Drizzle ORM** for database queries (no raw SQL)
4. **Never import `api/` from frontend** - use `@contracts/` for shared types
5. **Always run `npm run check`** after changes to verify types
6. **Never use `db:push --force`** - can destroy data
7. **Don't change port 3000** - it's used by the server

---

## Environment Variables

| Variable | Purpose | Example |
|----------|---------|---------|
| DATABASE_URL | MySQL connection | `mysql://user:pass@host:3306/dbname` |
| VITE_APP_ID | App ID from portal | `app_xxx` |
| VITE_KIMI_AUTH_URL | Auth URL | `https://account.kimi.com` |
| VITE_AGENT_NAME | Agent name | `bannerai` |
| APP_NAME | App display name | `BannerAI` |

---

## Testing Checklist

After any customization:

- [ ] `npm run check` passes with zero errors
- [ ] `npm run build` completes successfully
- [ ] Form renders correctly with all fields
- [ ] Prompt generates correctly for each category
- [ ] Copy prompt button works
- [ ] History saves and loads correctly
- [ ] Image generation works (fullstack)
- [ ] Download button works
- [ ] Responsive on mobile/desktop

---

## Communication Style

When helping user customize:

1. **Always explain what file to edit and why**
2. **Show before/after code snippets**
3. **Verify with `npm run check` after changes**
4. **Explain the impact of changes**
5. **Suggest testing steps**

Example:
> "Saya akan menambah kategori 'Fitness & Gym'. Ini perlu edit 2 file: `src/types/banner.ts` untuk menambah opsi dropdown, dan `src/lib/promptEngine.ts` untuk menambah konfigurasi prompt."
