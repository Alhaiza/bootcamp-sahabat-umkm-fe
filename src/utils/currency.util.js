/**
 * @file currency.util.js
 * @description Helper functions untuk format mata uang Rupiah dan angka.
 */

/**
 * Memformat angka integer menjadi format mata uang Rupiah (IDR).
 *
 * @param {number|string} amount - Nominal angka.
 * @returns {string} Contoh: "Rp 150.000"
 */
export const formatRupiah = (amount) => {
  if (amount === undefined || amount === null || isNaN(Number(amount))) {
    return "Rp 0";
  }
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(Number(amount));
};
