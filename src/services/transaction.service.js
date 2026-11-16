/**
 * @file transaction.service.js
 * @description Frontend Service Module untuk transaksi dan pendaftaran kelas.
 */

import apiClient from "./api-client";

export const transactionService = {
  /**
   * Mengambil riwayat transaksi.
   */
  async getAllTransactions() {
    const response = await apiClient.get("/transaksi");
    return response.data.data;
  },

  /**
   * Mengambil detail transaksi tertentu.
   */
  async getTransactionById(id) {
    const response = await apiClient.get(`/transaksi/${id}`);
    return response.data.data;
  },

  /**
   * Membuat transaksi pendaftaran kelas baru.
   */
  async createTransaction(courseId) {
    const response = await apiClient.post("/transaksi", { id_kelas: courseId });
    return response.data;
  },

  /**
   * Verifikasi transaksi (Admin).
   */
  async verifyTransaction(id) {
    const response = await apiClient.put(`/transaksi/${id}`);
    return response.data;
  },

  /**
   * Mengambil daftar kelas aktif yang berhasil dibeli peserta.
   */
  async getEnrolledCourses() {
    const response = await apiClient.get("/daftar-kelas");
    return response.data.data;
  },
};

export default transactionService;

