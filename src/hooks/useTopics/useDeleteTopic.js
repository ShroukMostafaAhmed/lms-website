import { useState } from "react";
import Swal from "sweetalert2";
import AxiosInstance from "../../utils/AxiosInstance.jsx";

function useDeleteTopic() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const deleteTopic = async (topicId) => {
        setLoading(true);
        await AxiosInstance.delete(`/api/Topics/delete/${topicId}`).then((res) => {
            if (res.data.statusCode === 200 || res.data.message?.includes("deleted")) {
                Swal.fire({
                    icon: 'success',
                    title: 'تم حذف الموضوع بنجاح',
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                throw new Error(res.data.message);
            }
        }).catch((err) => {
            setError(err);
            Swal.fire({
                icon: 'error',
                title: 'خطاء في حذف الموضوع',
                text: err.response?.data.title || err.message || "حدث خطأ ما!"
            });
        }).finally(() => {
            setLoading(false);
        });
    };

    return { deleteTopic, loading, error };
}

export default useDeleteTopic;
