import { useState } from "react";
import AxiosInstance from "../../utils/AxiosInstance";

function useAddTeacher() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addTeacher = async (data) => {
    setLoading(true);
    setError(null);
    await AxiosInstance.post("/api/Teachers", data)
      .then((res) => {
        if (
          res.data.statusCode === 201 ||
          res.data.statusCode === 200 ||
          res.data.message === "Teacher created successfully." 
        ) {
          return {
            success: true,
            message: res.data.message || "تم إنشاء المدرس بنجاح",
          };
        } else {
          throw new Error(res.data.message || "فشل في إنشاء المدرس");
        }
      })
      .catch((err) => {
        setError(err);
        return {
          success: false,
          message: err.response?.data?.message || err.message || "حدث خطأ غير متوقع",
          error: err,
        };
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { addTeacher, loading, error };
}

export default useAddTeacher;
