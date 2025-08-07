import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import AxiosInstance from "../../utils/AxiosInstance.jsx";

function useGetTopicById(topicId) {
    const [topic, setTopic] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!topicId) return;

        const fetchTopic = async () => {
            setLoading(true);
            try {
                const res = await AxiosInstance.get(`/api/Topics/${topicId}`);
                setTopic(res.data);
            } catch (err) {
                setError(err);
                Swal.fire({
                    icon: 'error',
                    title: 'فشل في جلب بيانات الموضوع',
                    text: err.message || 'حدث خطأ ما!'
                });
            } finally {
                setLoading(false);
            }
        };

        fetchTopic();
    }, [topicId]);

    return { topic, loading, error };
}

export default useGetTopicById;
