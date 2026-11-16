/**
 * @file api.config.js
 * @description Konfigurasi base URL API terpusat untuk frontend Sahabat-UMKM.
 * Mengutamakan variabel lingkungan Vite (`VITE_API_BASE_URL`) dan fallback ke localhost (3000).
 */

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export default API_BASE_URL;
