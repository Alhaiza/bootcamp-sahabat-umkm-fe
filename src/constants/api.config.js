/**
 * @file api.config.js
 * @description Konfigurasi base URL API terpusat untuk frontend Sahabat-UMKM.
 * Mengutamakan variabel lingkungan Vite (`VITE_API_BASE_URL`) dan fallback ke production endpoint.
 */

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://backend-production-4c5b.up.railway.app";

export default API_BASE_URL;
