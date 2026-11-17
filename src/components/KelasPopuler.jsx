import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import CardFilter from "./CardFilter";
import { API_BASE_URL } from "../constants/api.config";

function KelasPopuler() {
  const [courses, setCourses] = useState([]);
  const [input, setInput] = useState("");

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

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const filteredCourses = courses.filter((item) =>
    (item.nama_kelas || item.coursename || "")
      .toLowerCase()
      .includes(input.toLowerCase())
  );

  return (
    <>
      <div className="padding-x padding-y">
        <div className="flex justify-center list-none gap-4 font-montserrat font-semibold pt-5">
          <h1 className="font-poppins text-3xl text-primary font-bold">
            Eksplor Kelas
          </h1>
        </div>

        <input
          type="text"
          name="input"
          placeholder="Cari Kelas"
          value={input}
          className="py-2 px-4 border-2 border-gray-300 rounded-md my-4"
          onChange={handleInput}
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((item) => (
              <CardFilter key={item.id} course={item} />
            ))
          ) : (
            <div className="col-span-full py-6 text-center text-gray-500 font-montserrat">
              {input.trim() === "" ? "Memuat kelas..." : "Kelas tidak ditemukan"}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default KelasPopuler;
