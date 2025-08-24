import { useState } from "react";
import AxiosInstance from "../../utils/AxiosInstance.jsx";
import Swal from "sweetalert2";

function useChangeTeacherPassword() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const changePassword = async (id, passwordData) => {
    // passwordData expected format: { password: "newPassword123" }
    setLoading(true);
    try {
      const res = await AxiosInstance.post(`/api/Teachers/${id}/change-password`, passwordData);

      if (res.status === 200 || res.status === 204) {
        Swal.fire({
          icon: "success",
          title: "تم تحديث كلمة المرور بنجاح",
          showConfirmButton: false,
          timer: 1500,
        });
        setError(null);
      } else {
        throw new Error(res.data?.message || "فشل تحديث كلمة المرور");
      }
    } catch (err) {
      setError(err);
      Swal.fire({
        icon: "error",
        title: "حدث خطأ",
        text: err.response?.data?.message || err.message || "حدث خطأ أثناء تحديث كلمة المرور",
      });
    } finally {
      setLoading(false);
    }
  };

  return { changePassword, loading, error };
}

export default useChangeTeacherPassword;
