import { useState } from "react";
import Swal from "sweetalert2";
import AxiosInstance from "../../utils/AxiosInstance.jsx";

function useUpdateTopic() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateTopic = async (topicId, data) => {
        setLoading(true);
        await AxiosInstance.put(`/api/Topics/update/${topicId}`, data).then((res) => {
            if (res.data.statusCode === 200 || res.data.message?.includes("updated")) {
                Swal.fire({
                    icon: 'success',
                    title: 'تم تعديل الموضوع بنجاح',
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
                title: 'خطاء في تعديل الموضوع',
                text: err.response?.data.title || err.message || "حدث خطأ ما!"
            });
        }).finally(() => {
            setLoading(false);
        });
    };

    return { updateTopic, loading, error };
}

export default useUpdateTopic;
