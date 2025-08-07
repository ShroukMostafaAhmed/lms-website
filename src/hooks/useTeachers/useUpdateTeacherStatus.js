import { useState } from "react";
import Swal from "sweetalert2";
import AxiosInstance from "../../utils/AxiosInstance";

const useUpdateTeacherStatus = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // data expected: { status: true/false }
  const updateStatus = async (id, data) => {
    setLoading(true);
    setError(null);

    try {
      const response = await AxiosInstance.patch(`/api/Teachers/${id}/status`, data);
      Swal.fire({
        icon: "success",
        title: "تم تحديث حالة المدرس بنجاح",
        showConfirmButton: false,
        timer: 1500,
      });
      return response.data;
    } catch (err) {
      setError(err);
      Swal.fire({
        icon: "error",
        title: "فشل تحديث حالة المدرس",
        text: err.response?.data?.message || err.message || "حدث خطأ غير متوقع",
      });
    } finally {
      setLoading(false);
    }
  };

  return { updateStatus, loading, error };
};

export default useUpdateTeacherStatus;
