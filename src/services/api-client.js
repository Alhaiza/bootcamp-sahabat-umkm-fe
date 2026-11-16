/**
 * @file api-client.js
 * @description Centralized Axios HTTP Client Service dengan resiliensi jaringan
 * dan Chaos Engineering interceptor untuk menangani failure injection dari backend.
 */

import axios from "axios";
import Cookies from "js-cookie";

/**
 * Base URL terpusat dari environment variable dengan fallback aman.
 */
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

/**
 * Instance axios utama aplikasi Sahabat-UMKM.
 */
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000, // Timeout 15 detik untuk mengantisipasi latency injection
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Request Interceptor: Otomatis menyuntikkan Bearer JWT token dari Cookie ke setiap request keluar.
 */
apiClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Jika mode Chaos Testing diaktifkan via environment frontend
    if (import.meta.env.VITE_ENABLE_CHAOS_TESTING === "true") {
      config.headers["X-Chaos-Testing-Client"] = "active";
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor: Penanganan terpusat error HTTP dan fault injection dari Chaos Engineering.
 */
apiClient.interceptors.response.use(
  (response) => {
    // Deteksi apakah respons melewati injeksi chaos
    if (response.headers["x-chaos-injected"]) {
      console.warn(`[CHAOS DEFENSE] Request berhasil ditangani meskipun mengalami injeksi: ${response.headers["x-chaos-injected"]}`);
    }
    return response;
  },
  (error) => {
    const originalRequest = error.config;

    // Resiliensi terhadap Chaos Fault (500, 502, 503, 504) dengan 1x Retry Strategy
    if (
      error.response &&
      [500, 502, 503, 504].includes(error.response.status) &&
      !originalRequest._retryCount
    ) {
      originalRequest._retryCount = 1;
      console.warn(`[CHAOS RECOVERY] Mendeteksi fault status ${error.response.status}. Mencoba ulang permintaan secara otomatis...`);
      return new Promise((resolve) => {
        setTimeout(() => resolve(apiClient(originalRequest)), 1000);
      });
    }

    // Tangani token kedaluwarsa / Unauthorized (401)
    if (error.response && error.response.status === 401) {
      console.error("[AUTH] Sesi tidak valid atau telah berakhir.");
      Cookies.remove("token");
      Cookies.remove("userData");
    }

    return Promise.reject(error);
  }
);

export default apiClient;
