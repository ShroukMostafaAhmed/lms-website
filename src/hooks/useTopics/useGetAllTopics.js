import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import AxiosInstance from "../../utils/AxiosInstance.jsx";

function useGetAllTopics() {
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchTopics = async () => {
        setLoading(true);
        try {
            const res = await AxiosInstance.get('/api/Topics');
            setTopics(res.data);
        } catch (err) {
            setError(err);
            Swal.fire({
                icon: 'error',
                title: 'فشل في جلب المواضيع',
                text: err.message || 'حدث خطأ ما!'
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTopics();
    }, []);

    return { topics, loading, error, refetch: fetchTopics };
}

export default useGetAllTopics;
