import { useState } from "react";
import Swal from "sweetalert2";
import AxiosInstance from "../../utils/AxiosInstance";

const useUpdateTeacher = () => {
  const [loading, setLoading] = useState(false);

  const updateTeacher = async (id, data) => {
    setLoading(true);
    try {
      await AxiosInstance.put(`/api/Teachers/${id}`, data);
      Swal.fire({
        icon: "success",
        title: "تم تحديث بيانات المدرس بنجاح",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "فشل في تحديث البيانات",
        text: err.response?.data?.message || err.message || "خطأ غير متوقع",
      });
    } finally {
      setLoading(false);
    }
  };

  return { updateTeacher, loading };
};

export default useUpdateTeacher;
