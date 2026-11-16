# Sahabat UMKM - Frontend Web App

Frontend aplikasi **Sahabat-UMKM**, sebuah platform kursus dan edukasi daring (*online course*) yang dirancang khusus untuk meningkatkan keterampilan dan kapasitas para pelaku Usaha Mikro, Kecil, dan Menengah (UMKM).

Aplikasi ini mencakup antarmuka untuk pengguna (peserta kursus) dan dashboard pengelola (admin).

---

## 🚀 Tech Stack

- **Framework**: [React 18](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/), PostCSS, Autoprefixer, Animate.css, `tailwindcss-animated`
- **Routing**: [React Router DOM (v6)](https://reactrouter.com/)
- **Data Fetching & State**: Axios, Fetch API, React Context, Redux
- **Icons & Visuals**: React Icons, Chart.js & `react-chartjs-2`
- **Cookie Management**: `js-cookie`

---

## ✨ Fitur Utama

### 👥 Pengguna / Peserta UMKM:
- **Landing Page & Edukasi**: Informasi program, mentor, dan kategori kelas.
- **Katalog & Pencarian Kelas**: Fitur filter dan pencarian kelas sesuai kebutuhan usaha.
- **Detail Kursus**: Informasi detail topik, silabus materi, profil mentor, dan harga.
- **Pendaftaran & Pembayaran**: Alur order kelas dan checkout.
- **Kelas Saya & Ruang Belajar**: Dashboard kelas yang sudah terdaftar serta pemutar video pembelajaran.

### 🛡️ Admin / Pengelola:
- **Admin Dashboard**: Statistik performa kelas dan transaksi dengan grafik interaktif.
- **Manajemen Kelas**: CRUD data kelas (nama, materi video, thumbnail, harga, pengajar).
- **Manajemen Kategori**: CRUD pengelompokan materi kelas.
- **Manajemen Transaksi**: Monitoring dan verifikasi pesanan/transaksi user.
- **Manajemen Pengguna**: Daftar data peserta terdaftar.

---

## 🛠️ Panduan Instalasi & Menjalankan Lokal

### 1. Prasyarat
- Node.js (versi 16 atau lebih baru)
- Backend Sahabat-UMKM yang sedang berjalan (atau endpoint backend publik yang aktif)

### 2. Kloning Repositori & Instal Dependensi
```bash
git clone git@github.com-personal:Alhaiza/bootcamp-sahabat-umkm-fe.git
cd bootcamp-sahabat-umkm-fe
npm install
```

### 3. Menjalankan Server Development
```bash
npm run dev
```
Buka browser dan akses URL lokal yang ditampilkan pada terminal (biasanya `http://localhost:5173`).

### 4. Build untuk Production
```bash
npm run build
```
File hasil build akan berada pada folder `dist/` dan siap dideploy ke platform hosting statis seperti Vercel atau Netlify.

---

## 📂 Struktur Direktori

```text
sahabat-umkm-fe/
├── public/             # File statis publik (SVG logo, favicon)
├── src/
│   ├── assets/         # Aset gambar, ilustrasi, dan icon
│   ├── components/     # Reusable UI components (Navbar, Modal, VideoPlayer, Card, dll.)
│   ├── contexts/       # React Context (AuthContext)
│   ├── pages/          # Halaman aplikasi (LandingPage, Login, Admin, Pembayaran, dll.)
│   ├── sections/       # Komponen bagian halaman (Hero, Kategori, Mentor, Footer)
│   ├── App.jsx         # Komponen induk & root router
│   ├── main.jsx        # Entry point rendering React
│   └── index.css       # File konfigurasi styling Tailwind & font
├── index.html          # HTML template
├── tailwind.config.js  # Konfigurasi Tailwind CSS
└── vite.config.js      # Konfigurasi Vite bundler
```
