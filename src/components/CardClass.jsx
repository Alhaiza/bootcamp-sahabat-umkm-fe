import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { API_BASE_URL } from "../constants/api.config";

function CardClass() {
  const [courses, setCourses] = useState([]);

  const kategoriOptions = [
    { value: 1, label: "Keuangan" },
    { value: 2, label: "Manajemen" },
    { value: 3, label: "Kewirausahaan" },
    { value: 4, label: "Pengembangan Diri" },
    { value: 5, label: "Desain Produk" },
  ];

  useEffect(() => {
    const token = Cookies.get("token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    fetch(`${API_BASE_URL}/kelas`, { headers })
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data.data)) {
          setCourses(data.data);
        } else if (Array.isArray(data)) {
          setCourses(data);
        }
      })
      .catch((error) => console.error("Error fetching courses:", error));
  }, []);

  const formatPrice = (price) => {
    if (!price) return "Gratis";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumSignificantDigits: 9,
    }).format(price);
  };

  const getCategoryLabel = (idKategori, fallbackCategory) => {
    const found = kategoriOptions.find((opt) => opt.value === idKategori);
    return found ? found.label : fallbackCategory || "Umum";
  };

  return (
    <>
      <div className="padding-x card-class">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {courses && courses.length > 0 ? (
            courses.map((course) => {
              const courseTitle = course.nama_kelas || course.coursename;
              const courseCategory = getCategoryLabel(course.id_kategori, course.category);
              const courseImage = course.gambar || course.image;
              const coursePrice = typeof course.harga !== "undefined"
                ? formatPrice(course.harga)
                : course.price;

              return (
                <div
                  key={course.id}
                  className="flex flex-col justify-between p-5 mt-7 outline outline-gray-100 cursor-pointer transition ease-in-out duration-300 hover:translate-y-[-10px] rounded-md shadow-md"
                >
                  <div>
                    <div>
                      <img
                        className="rounded-md object-cover w-full h-[150px]"
                        src={courseImage}
                        alt={courseTitle}
                      />
                    </div>
                    <div className="flex flex-col mt-2">
                      <h1 className="font-poppins py-1 text-sm font-semibold text-black line-clamp-2">
                        {courseTitle}
                      </h1>
                      <p className="pb-2 rounded-md font-montserrat text-sm text-gray-600">
                        {courseCategory}
                      </p>
                    </div>
                  </div>

                  <div className="flex py-3 px-2 justify-between items-center border-t border-gray-100 mt-2">
                    <p className="font-montserrat text-md font-semibold text-black">
                      {coursePrice}
                    </p>
                    <Link
                      to={`/detail-kelas/${course.id}`}
                      className="py-1 px-3 cursor-pointer rounded-md font-montserrat text-sm bg-secondary text-white hover:bg-opacity-90"
                    >
                      Ikuti Kelas
                    </Link>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full py-8 text-center text-gray-500 font-montserrat">
              Memuat kelas...
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default CardClass;
