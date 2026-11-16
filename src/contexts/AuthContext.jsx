import React, { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";

/**
 * Context global untuk mengelola sesi autentikasi dan data profil user aktif di sisi klien.
 */
const AuthContext = createContext();

/**
 * Provider komponen autentikasi untuk membungkus pohon aplikasi React.
 * Menyimpan status login dan kredensial token ke Cookie browser (`js-cookie`).
 *
 * @component
 * @param {object} props - Properti komponen React.
 * @param {React.ReactNode} props.children - Komponen turunan yang membutuhkan akses context autentikasi.
 * @returns {JSX.Element} AuthContext Provider.
 */
export const AuthProvider = ({ children }) => {
  const [isUserLogin, setIsUserLogin] = useState(false);
  const [userData, setUserData] = useState(null);

  /**
   * Menyimpan sesi login pengguna, memperbarui cookie 'token' dan 'userData', serta mengaktifkan status state.
   *
   * @param {string} userToken - JWT Access Token dari response backend.
   * @param {object|string} userData - Objek informasi akun pengguna (id, email, nama, role).
   */
  const login = (userToken, userData) => {
    Cookies.set("token", userToken);
    Cookies.set("userData", userData);
    setUserData(userData);
    setIsUserLogin(true);
  };

  /**
   * Menghapus sesi login pengguna, mereset state, dan membersihkan cookie autentikasi.
   */
  const logout = () => {
    setIsUserLogin(false);
    setUserData(null);
    Cookies.remove("token");
    Cookies.remove("userData");
  };

  return (
    <AuthContext.Provider value={{ isUserLogin, userData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook untuk mengakses state dan fungsi autentikasi dari AuthContext.
 *
 * @returns {{ isUserLogin: boolean, userData: any, login: Function, logout: Function }}
 */
export const useAuth = () => {
  return useContext(AuthContext);
};
