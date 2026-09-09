# 🤖 Agent System Instructions: Nusacaraka Project

You are an expert full-stack developer assistant specialized in Next.js 16 and modern React patterns.

---

## 🏗️ Project Overview

- **Name:** Nusantara Cakra Karya (Nusacaraka Technology)
- **Type:** Company Profile + Service Management System (CMS/Dashboard) + SaaS platform
- **Backend:** Integrated with Google Apps Script & Google Sheets
- **Language:** Indonesian (Bahasa Indonesia) — all user-facing UI copy must be in Indonesian.

### Business Context

Nusantara Cakra Karya melayani berbagai kebutuhan profesional di bidang IT dan sistem, termasuk namun tidak terbatas pada:

- **Konsultan Sistem Analis**
- **Pembuatan Aplikasi & Desain**
- **Pengembangan Produk SaaS**
- **Manajemen Proyek IT**

Aplikasi web ini memiliki dua tujuan utama:

1. **Company Profile (Public):** A dynamic, CMS-driven public website showcasing the company's services, articles, and partners. Content is managed by admins through a dashboard.
2. **Service Ordering System (Authenticated):** Customers can browse services, place orders, and pay directly through the website. Admins manage the full order lifecycle from `PENDING` → `IN PROGRESS` → `COMPLETED`.

### Hybrid Order & Sales Flow (WhatsApp + Portal)

Aplikasi ini **tidak menyediakan sistem chat internal** dan dirancang dengan pendekatan _hybrid_ untuk memaksimalkan konversi pra-penjualan (Pre-Sales) sekaligus menjaga profesionalisme operasional pasca-penjualan (Post-Sales).

**Fase 1: Pre-Sales (WhatsApp-Driven)**

1. **Initiation:** Klien menekan tombol "Konsultasi" atau memilih layanan di Public Website.
2. **Lead Form:** Klien mengisi Form Registrasi Awal (Nama, Email, WA, dan Detail Kebutuhan).
3. **Order Generation:** Saat form di-submit, sistem akan:
   - Men-generate **Order Number** dengan status `PENDING_CONSULTATION`.
   - Membuat entitas akun/Lead klien di database.
4. **WhatsApp Redirect:** Klien otomatis diarahkan ke WhatsApp Admin dengan pesan _template_ bawaan (memuat Order Number).
5. **Negotiation:** Semua konsultasi dan kesepakatan harga (_deal_) terjadi di WhatsApp.
6. **Payment Link:** Setelah _deal_, Admin membuka **Admin Dashboard**, meng-update harga final pada _Order_ tersebut, dan men-generate _Payment Link_ (Midtrans) untuk dikirim ke klien via WA.

**Fase 2: Post-Sales (Portal-Driven)**

1. **Status Update:** Klien membayar via Midtrans. Sistem (via Webhook) mengubah status pesanan menjadi `IN_PROGRESS`.
2. **Portal Onboarding:** Admin memberi tahu klien untuk **Login ke Customer Portal** (`/dashboard`) menggunakan email mereka.
3. **Portal Features:** Di dalam portal ini, klien dapat:
   - **Live Tracking Timeline:** Memantau progres dokumen/layanan mereka (Misal: Draft → Review → Terbit).
   - **Document Vault:** Tempat aman bagi klien untuk meng-upload syarat (KTP, NPWP) dan mengunduh _file_ hasil akhir dari Admin.

### Key Business Rules

> ⚠️ **IMPORTANT: Range Pricing Model**
> Services use a **price range** (`minPrice` – `maxPrice`) instead of a fixed price. This is because professional services are inherently variable in cost. Always design price displays, forms, and calculations to accommodate range-based pricing. Never assume a single fixed price for any service.

> ⚠️ **IMPORTANT: Dual Payment Methods**
> The system supports two payment channels:
>
> 1. **Midtrans (Payment Gateway)** — Online payment via credit card, e-wallet, virtual account, etc.
> 2. **Manual Bank Transfer** — Customer transfers directly to the company bank account and uploads proof of payment.
>
> Always handle both payment flows in order-related UIs and logic.

### User Roles & Flow

| Role         | Access         | Description                                                               |
| ------------ | -------------- | ------------------------------------------------------------------------- |
| **ADMIN**    | `/admin/*`     | Manages services, articles, orders, payments, and site content.           |
| **CUSTOMER** | `/dashboard/*` | Browses services, places orders, makes payments, and tracks order status. |

**Authentication Flow:**

1. User logs in via credentials (email/password) → verified against Apps Script backend.
2. JWT token stores `role` and `accountComplete` flag.
3. If `accountComplete === false`, user is redirected to `/register/detail` to complete their profile.
4. Middleware (`src/proxy.ts`) enforces route access based on role.

---

## ⚡ Technical Stack (STRICT ADHERENCE REQUIRED)

| Category             | Technology                                              |
| -------------------- | ------------------------------------------------------- |
| **Framework**        | Next.js 16.2.1 (App Router + Turbopack)                 |
| **Runtime**          | Bun (always prefer `bun` over `npm`/`yarn`)             |
| **Language**         | TypeScript 5 (strict mode)                              |
| **UI Library**       | React 19                                                |
| **Styling**          | Tailwind CSS 4.0 (with native CSS variables via @theme) |
| **UI Components**    | Shadcn UI (in `src/components/atoms/ui/`)               |
| **State Management** | Zustand (global state), SWR (server state/fetching)     |
| **HTTP Client**      | Axios                                                   |
| **Forms**            | React Hook Form + Zod                                   |
| **Auth**             | NextAuth.js v4 (Credentials provider, JWT strategy)     |
| **Animation**        | Framer Motion, GSAP                                     |
| **Icons**            | React Icons, Phosphor Icons                             |
| **AI Integration**   | Vercel AI SDK + Google Gemini                           |
| **Backend**          | Google Apps Script + Google Sheets                      |
| **Payment**          | Midtrans (planned) + Manual Bank Transfer               |

---

## 🎨 Design System & Style Guide

The project uses a custom design system defined in `src/shared/styles/globals.css`:

```css
--color-primary: #13005a; /* Deep navy blue */
--color-secondary: #00337c; /* Medium blue */
--color-accent-blue: #1c82ad; /* Bright blue accent */
--color-accent-green: #03c988; /* Vivid green accent */
--color-black: #101828; /* Near-black for text */
```

**Key rules:**

- Use these CSS variables for all theming — do not introduce arbitrary colors.
- CTA gradients use `.bg-cta-gradient` (a linear gradient from primary → secondary).
- All interactive elements (`button`, `a`) have `hover:scale-[0.98]` by default.
- Use `cn()` from `@/utils` for conditional Tailwind class merging (powered by `clsx` + `tailwind-merge`).

---

## 🧩 Architecture & Coding Conventions

### Atomic Design (STRICT)

Components in `src/components/` follow Atomic Design methodology:

| Layer         | Path                        | Description                                    |
| ------------- | --------------------------- | ---------------------------------------------- |
| **Atoms**     | `src/components/atoms/`     | Smallest UI units (Button, Input, Badge).      |
| **Molecules** | `src/components/molecules/` | Combinations of atoms (SearchBar, FormField).  |
| **Organisms** | `src/components/organisms/` | Complex sections (Navbar, Sidebar, OrderCard). |
| **Templates** | `src/components/templates/` | Page-level layouts (GeneralLayout, Container). |
| **Providers** | `src/components/providers/` | Context/Session providers (ClientProvider).    |

### Folder Structure

```
src/
├── app/            # Next.js App Router (Pages, API Routes, Layouts)
├── components/     # UI Components (Atomic Design)
├── constants/      # Static data, menu configs, site metadata
├── context/        # React Context providers
├── hooks/          # Custom React hooks
├── restapi/        # REST API endpoint definitions (generated via Plop)
├── services/       # API integration & auth config
├── shared/         # Global styles, typography, custom CSS
├── stores/         # Zustand state stores
├── utils/          # Helper functions (formatNumber, cn, etc.)
└── proxy.ts        # Middleware for RBAC route protection
```

### Import Aliases

Always use absolute path aliases — never use relative paths like `../../`:

```typescript
import { Button } from '@/components/atoms/ui/button'
import { cn } from '@/utils'
import { EMAIL_CONTACT } from '@/constants/general-data'
```

Available aliases: `@/components`, `@/utils`, `@/services`, `@/constants`, `@/hooks`, `@/types`, `@/stores`, `@/context`, `@/restapi`.

---

## 🗄️ Backend & Database Architecture (Google Sheets & Apps Script)

This project uses Google Sheets as a database via Google Apps Script (GAS). This is a highly cost-effective solution but requires specific patterns to handle concurrency and scaling.

### Core Implementation Rules

1. **Midtrans Webhook Handling**:
   - Use `doPost(e)` in GAS to receive Midtrans Webhooks.
   - When Midtrans sends a success signal, GAS must find the row by `order_id` and update the status cell to `PAID`.
2. **Concurrency & Race Conditions**:
   - ALWAYS use `LockService.getScriptLock()` in GAS functions that write data. This prevents race conditions if multiple users pay or order at the exact same millisecond.
3. **Pagination (Preventing Lag)**:
   - Do NOT fetch the entire sheet data if it grows large.
   - Implement pagination logic in GAS: Accept `page` and `limit` parameters from Next.js.
   - Use `sheet.getRange(startRow, numColumns).getValues()` to fetch only the needed chunk of data based on the page number.
4. **Security**:
   - Never expose the Midtrans Server Key or GAS deployment URL in client-side code. Always wrap requests through Next.js Route Handlers (`/app/api/...`).
5. **Quota Awareness**:
   - GAS has execution limits (approx. 20,000/day). Design API calls efficiently (e.g., batching writes if possible) to stay well within limits.

---

## 🛠️ Development Workflow

| Command                   | Description                                |
| ------------------------- | ------------------------------------------ |
| `bun dev:turbo`           | Start dev server with Turbopack            |
| `bun run build`           | Production build                           |
| `bun run lint:fix`        | Auto-fix linting errors                    |
| `bun run typecheck`       | Run TypeScript type checking               |
| `bun run prettier:format` | Format all code with Prettier              |
| `bun generate`            | Create new components/API folders via Plop |

---

## ⚠️ Critical Rules

1. **NEVER** downgrade libraries or suggest code that uses Next.js `pages/` directory patterns.
2. **NEVER** ignore the `accountComplete` flag in authentication flows.
3. **NEVER** assume a fixed price for services — always use range pricing (`minPrice` / `maxPrice`).
4. **NEVER** modify Shadcn UI base components in `src/components/atoms/ui/` unless explicitly asked.
5. **ALWAYS** use Indonesian (Bahasa Indonesia) for all user-facing text (buttons, labels, messages, placeholders).
6. **ALWAYS** check `src/constants/` before hardcoding any strings, URLs, or data.
7. **ALWAYS** use `cn()` for conditional class merging instead of template literals.
8. **ALWAYS** handle both Midtrans and manual bank transfer flows in payment-related features.
9. **DOCUMENT COMPLEX LOGIC**: Jika membuat fitur dengan logika bisnis yang kompleks, **WAJIB** membuat dokumentasi teknis di folder `docs/` agar sistem mudah dipelihara.
10. **PREFER CLEAN CODE & LOGS**: DILARANG menggunakan ikon/emoji (seperti ✅, ❌, ⚠️) dalam komentar kode, f-string, atau console log. Gunakan teks yang lugas dan profesional.
11. **NAMING CONVENTION**: Nama variabel, fungsi, atau class **MAKSIMAL 3 KATA** (contoh: `getUserData`, `calculateTotalPrice`). Jangan terlalu panjang.
12. **NO UNNECESSARY COMMENTS**: Jangan membuat komentar yang hanya menjelaskan baris kodingan yang sudah jelas. Komentar hanya untuk logika bisnis yang kompleks.
13. **PHOSPHOR ICONS**: Saat menggunakan ikon dari `@phosphor-icons/react`, **SELALU** gunakan versi dengan akhiran `Icon` (contoh: `InstagramLogoIcon`, BUKAN `InstagramLogo`) untuk menghindari deprecated imports.

---
