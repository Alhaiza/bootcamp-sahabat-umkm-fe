/**
 * @file auth.service.js
 * @description Frontend Service Module untuk autentikasi user.
 */

import apiClient from "./api-client";

export const authService = {
  /**
   * Registrasi akun baru.
   */
  async register(registrationData) {
    const response = await apiClient.post("/register", registrationData);
    return response.data;
  },

  /**
   * Login user dan menerima token.
   */
  async login(credentials) {
    const response = await apiClient.post("/login", credentials);
    return response.data;
  },

  /**
   * Logout user.
   */
  async logout() {
    const response = await apiClient.post("/logout");
    return response.data;
  },
};

export default authService;

