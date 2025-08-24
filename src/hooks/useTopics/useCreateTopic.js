import {useState} from "react";
import Swal from "sweetalert2";
import AxiosInstance from "../../utils/AxiosInstance.jsx";

function UseCreateTopic() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const createTopic = async (data) => {
        setLoading(true);
        await AxiosInstance.post('/api/topics/create', data).then((res) => {
            if (res.data.statusCode == 201 || res.data.statusCode == 200 || res.data.message == "Topic created successfully.") {
                // Then show success message
                Swal.fire({
                    icon: 'success',
                    title: 'تم اضافة الموضوع بنجاح',
                    showConfirmButton: false,
                    timer: 1500
                })
                // we need to make the then functionality in here
            }

            if (res.data.statusCode !== 201 || res.data.message !== "Topic Created Successfully") {
                throw new Error (res.data.message)
            }
        }).catch((err) => {
            setError(err);
            Swal.fire({
                icon: 'error',
                title: 'خطاء في اضافة الموضوع',
                text: err.response?.data.title || err.message || "Something went wrong!"
            })
        }).finally(() => {
            setLoading(false);
        })
    }

    return {loading, error, createTopic};
}

export default UseCreateTopic;