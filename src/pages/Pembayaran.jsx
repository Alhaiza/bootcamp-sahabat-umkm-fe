import { API_BASE_URL } from "../constants/api.config";
import { useEffect, useState } from "react";
import Dana from "../assets/images/dana.png";
import GoPay from "../assets/images/gopay.png";
import Ovo from "../assets/images/ovo.png";
import Modal from "../components/Modal";
import { useParams, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function Pembayaran() {
  const token = Cookies.get("token");
  const { id } = useParams();
  const navigate = useNavigate();

  const [kelas, setKelas] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    fetch(`${API_BASE_URL}/kelas/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Gagal memuat detail kelas");
        }
        return response.json();
      })
      .then((data) => {
        setKelas(data.data);
      })
      .catch((error) => {
        console.error("Kesalahan memuat kelas:", error);
        alert("Gagal memuat data kelas untuk pembayaran");
      });
  }, [id, token, navigate]);

  const handlePaymentMethodChange = (method) => {
    setSelectedMethod(method);
  };

  /**
   * Mengirim request pendaftaran/pembelian kelas ke backend.
   * Status UI disinkronkan ke 'inProgress' (menunggu verifikasi admin), bukan 'success' prematur.
   */
  const handleBeliKelas = async () => {
    if (!selectedMethod) {
      alert("Silakan pilih metode pembayaran terlebih dahulu!");
      return;
    }

    if (!kelas.id) {
      alert("Informasi kelas tidak valid.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/transaksi`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id_kelas: kelas.id }),
      });

      const result = await response.json();

      if (response.ok) {
        // Respons berhasil (200 / 201). Sinkronkan UI ke state 'inProgress' (Pending Verifikasi).
        setPaymentStatus("inProgress");
        setShowModal(true);
      } else if (response.status === 400) {
        // Penolakan validasi: misal user sudah memiliki kelas aktif
        alert(result.message || "Permintaan pendaftaran kelas ditolak");
      } else if (response.status === 401) {
        alert("Sesi Anda telah berakhir. Silakan login kembali.");
        navigate("/login");
      } else {
        alert(result.message || "Terjadi kesalahan pada sistem saat memproses transaksi.");
      }
    } catch (error) {
      console.error("Error pembuatan transaksi:", error);
      alert("Gagal terhubung ke server. Periksa koneksi internet Anda.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-20 flex justify-center">
      <div className="font-poppins bg-primary text-white w-96 mt-10 p-5 rounded-lg">
        <h1 className="text-xl font-medium text-center mb-3">
          Detail Pembayaran
        </h1>
        <p className="text-center text-xl mb-7">{kelas.nama_kelas || "Memuat..."}</p>
        <div className="flex justify-between pb-2">
          <span>Harga Kelas</span>
          <span>Rp{kelas.harga ? kelas.harga.toLocaleString("id-ID") : 0}</span>
        </div>
        <div className="flex justify-between pb-4 border-b-2 border-white">
          <span>Diskon</span>
          <span>Rp0</span>
        </div>
        <div className="flex justify-between pt-4">
          <span>Total</span>
          <span>Rp{kelas.harga ? kelas.harga.toLocaleString("id-ID") : 0}</span>
        </div>

        <div className="mt-10">
          <span>Pilih metode pembayaran</span>
          <div className="flex flex-col gap-3 px-3 mt-5">
            <div className="flex justify-between items-center rounded-lg bg-gray-100 py-1 px-2">
              <img src={Dana} alt="Dana" className="h-16" />
              <input
                type="radio"
                name="metodePembayaran"
                className="cursor-pointer w-4 h-4 bg-white border border-gray-300"
                onChange={() => handlePaymentMethodChange("dana")}
              />
            </div>
            <div className="flex justify-between items-center rounded-lg bg-gray-100 py-1 px-2">
              <img src={GoPay} alt="GoPay" className="h-16" />
              <input
                type="radio"
                name="metodePembayaran"
                className="cursor-pointer w-4 h-4 bg-white border border-gray-300"
                onChange={() => handlePaymentMethodChange("gopay")}
              />
            </div>
            <div className="flex justify-between items-center rounded-lg bg-gray-100 py-1 px-2">
              <img src={Ovo} alt="Ovo" className="h-16" />
              <input
                type="radio"
                name="metodePembayaran"
                className="cursor-pointer w-4 h-4 bg-white border border-gray-300"
                onChange={() => handlePaymentMethodChange("ovo")}
              />
            </div>
          </div>
          <div className="flex justify-center mt-8">
            <button
              onClick={handleBeliKelas}
              disabled={isLoading}
              className={`rounded-lg bg-blue-keuangan border-[1.5px] border-blue-keuangan px-10 py-1 text-primary hover:bg-white font-medium duration-300 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Memproses..." : "Beli Kelas"}
            </button>
          </div>
        </div>
      </div>
      {showModal && (
        <Modal
          id_kelas={kelas.id}
          nama_kelas={kelas.nama_kelas}
          showModal={showModal}
          setShowModal={setShowModal}
          paymentStatus={paymentStatus}
        />
      )}
    </section>
  );
}
