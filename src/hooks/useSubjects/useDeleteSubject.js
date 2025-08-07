import { useState } from "react";
import Swal from "sweetalert2";
import AxiosInstance from "../../utils/AxiosInstance.jsx";

function useDeleteSubject() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const deleteSubject = async (id) => {
        setIsLoading(true);
        setError(null);
        try {
            const res = await AxiosInstance.delete(`/api/Subjects/${id}`);
            if (res.data.statusCode === 200 || res.data.message?.toLowerCase().includes("deleted")) {
                Swal.fire({ icon: 'success', title: 'تم حذف المادة بنجاح', timer: 1500, showConfirmButton: false });
            } else {
                throw new Error(res.data.message);
            }
        } catch (err) {
            setError(err);
            Swal.fire({ icon: 'error', title: 'خطأ في الحذف', text: err.response?.data.title || err.message });
        } finally {
            setIsLoading(false);
        }
    };

    return { deleteSubject, isLoading, error };
}

export default useDeleteSubject;
