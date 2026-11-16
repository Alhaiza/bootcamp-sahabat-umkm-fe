/**
 * @file course.service.js
 * @description Frontend Service Module untuk konsumsi API katalog kelas via centralized apiClient.
 */

import apiClient from "./api-client";

export const courseService = {
  /**
   * Mengambil seluruh daftar kelas.
   * @returns {Promise<Array>}
   */
  async getAllCourses() {
    const response = await apiClient.get("/kelas");
    return response.data.data;
  },

  /**
   * Mengambil detail satu kelas.
   * @param {string|number} id
   * @returns {Promise<object>}
   */
  async getCourseById(id) {
    const response = await apiClient.get(`/kelas/${id}`);
    return response.data.data;
  },

  /**
   * Membuat kelas baru (Admin).
   * @param {object} courseData
   * @returns {Promise<object>}
   */
  async createCourse(courseData) {
    const response = await apiClient.post("/kelas", courseData);
    return response.data;
  },

  /**
   * Mengupdate data kelas (Admin).
   * @param {string|number} id
   * @param {object} courseData
   * @returns {Promise<object>}
   */
  async updateCourse(id, courseData) {
    const response = await apiClient.put(`/kelas/${id}`, courseData);
    return response.data;
  },

  /**
   * Menghapus data kelas (Admin).
   * @param {string|number} id
   * @returns {Promise<object>}
   */
  async deleteCourse(id) {
    const response = await apiClient.delete(`/kelas/${id}`);
    return response.data;
  },
};

export default courseService;

