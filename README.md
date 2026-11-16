# Sahabat UMKM - Frontend Web Application

Aplikasi antarmuka berbasis web untuk platform edukasi daring (**e-learning / online course**) **Sahabat-UMKM**. Dirancang dengan arsitektur modern Single Page Application (SPA), aplikasi ini menyediakan pengalaman belajar yang responsif bagi pelaku UMKM serta dashboard administratif komprehensif bagi pengelola kursus.

---

## 1. Title & Deskripsi Arsitektur

### Core Technology Stack
- **Framework & UI Engine**: [React 18](https://react.dev/) (Functional Components & Hooks)
- **Tooling & Bundler**: [Vite](https://vitejs.dev/) v4 (Fast HMR & Optimized Production Build)
- **Design System & Styling**: [Tailwind CSS](https://tailwindcss.com/) v3, PostCSS, Autoprefixer, Animate.css, `tailwindcss-animated`
- **Routing Engine**: [React Router DOM](https://reactrouter.com/) v6
- **State Management & Network**: React Context API (`AuthContext`), Axios HTTP Client, Fetch API, `js-cookie`
- **Data Visualization**: [Chart.js](https://www.chartjs.org/) & `react-chartjs-2`

### Core Features
- **Portal Siswa (Peserta UMKM)**:
  - Landing page interaktif dengan profil mentor dan topik kelas unggulan.
  - Katalog pencarian dan filter kelas terintegrasi.
  - Detail materi kursus, review rating, dan silabus belajar.
  - Alur checkout pembayaran pendaftaran kelas.
  - Dashboard ruang belajar peserta (*My Class*) dengan video player materi terstruktur.
- **Admin Management Console**:
  - Dashboard analitik berbasis grafik performa dan transaksi.
  - Manajemen penuh (CRUD) data kelas dan materi pengajar.
  - Manajemen penuh (CRUD) kategori taksonomi kelas.
  - Pemantauan status transaksi pendaftaran peserta.
  - Manajemen listing data pengguna terdaftar.

---

## 2. System Architecture & Data Flow

```text
┌─────────────────────────────────────────────────────────────┐
│                       Browser Client                        │
│                                                             │
│  ┌─────────────────┐       ┌─────────────────────────────┐  │
│  │   AuthContext   │ <───> │ React Router DOM (v6)       │  │
│  │  (State/Cookie) │       │ (Public & Protected Routes) │  │
│  └────────┬────────┘       └──────────────┬──────────────┘  │
│           │                               │                 │
│           ▼                               ▼                 │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                     UI Components                     │  │
│  │   (Landing, Catalog, Class Room, Admin Dashboard)     │  │
│  └────────────────────────┬──────────────────────────────┘  │
└───────────────────────────┼─────────────────────────────────┘
                            │ Axios / Fetch (Bearer JWT Auth)
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Sahabat-UMKM Backend                     │
│               (REST API Server: Node/Express)               │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Prasyarat & Dependensi

Pastikan perangkat lokal Anda telah memenuhi spesifikasi berikut:
- **Node.js**: Versi `18.x`, `20.x`, atau `22.x+`.
- **NPM**: Versi `9.x` atau lebih baru (bawaan Node.js).
- **Backend API**: Layanan backend Sahabat-UMKM yang sedang berjalan lokal atau endpoint production aktif.

---

## 4. Panduan Instalasi & Setup Lokal

### Langkah 1: Kloning Repositori
```bash
git clone git@github.com-personal:Alhaiza/bootcamp-sahabat-umkm-fe.git
cd bootcamp-sahabat-umkm-fe
```

### Langkah 2: Instalasi Dependensi
```bash
npm install
```

### Langkah 3: Menyiapkan Konfigurasi Environment
Salin template environment:
```bash
cp .env.example .env
```
Sesuaikan `VITE_API_BASE_URL` sesuai lokasi endpoint backend Anda (lihat Bagian 5).

---

## 5. Konfigurasi Environment Variable

File `.env` digunakan oleh Vite untuk menyuntikkan variabel lingkungan ke aplikasi klien saat waktu kompilasi (*build-time*):

| Variabel | Tipe | Contoh Default | Deskripsi Teknis |
|---|---|---|---|
| `VITE_API_BASE_URL` | String URL | `https://backend-production-4c5b.up.railway.app` | Base URL endpoint RESTful API backend yang dikonsumsi oleh aplikasi frontend |

---

## 6. Cara Menjalankan Aplikasi

### Mode Development (Hot Module Replacement):
```bash
npm run dev
```
Akses URL lokal yang ditampilkan pada terminal (default: `http://localhost:5173`).

### Build untuk Produksi:
```bash
npm run build
```
File hasil bundling yang telah dioptimasi dan diminifikasi akan disimpan di direktori `dist/`.

### Menjalankan Pratinjau Build Produksi:
```bash
npm run preview
```

---

## 7. Panduan Testing & Linting

Untuk memverifikasi kualitas sintaks dan aturan kode:

```bash
# Menjalankan ESLint
npm run lint

# Verifikasi kompilasi bundler produksi
npm run build
```

---

## 8. Struktur Direktori Proyek

```text
sahabat-umkm-fe/
├── public/                 # Aset statis publik (SVG logo, favicon, media statis)
├── src/
│   ├── assets/             # Aset gambar, ikon kategori, dan grafis visual
│   ├── components/         # Komponen UI modular (Navbar, CardClass, VideoPlayer, Modal, dll.)
│   ├── constants/          # Nilai konstanta data statis
│   ├── contexts/           # React Context state management (AuthContext)
│   ├── pages/              # Komponen halaman (LandingPage, Login, Admin, Pembayaran, dll.)
│   ├── sections/           # Komponen layout modular per bagian halaman (Hero, Mentor, Footer)
│   ├── App.jsx             # Komponen root aplikasi
│   ├── RoutesUser.jsx      # Definisi rute antarmuka pengguna
│   ├── index.css           # Konfigurasi Tailwind CSS dan impor font Google
│   └── main.jsx            # Entry point rendering React DOM
├── index.html              # Template induk HTML aplikasi
├── netlify.toml            # Konfigurasi deployment platform Netlify
├── postcss.config.js       # Konfigurasi PostCSS untuk Tailwind CSS
├── tailwind.config.js      # Konfigurasi tema dan plugin Tailwind CSS
├── vercel.json             # Konfigurasi routing rewrite deployment Vercel
└── vite.config.js          # Konfigurasi Vite bundler
```
