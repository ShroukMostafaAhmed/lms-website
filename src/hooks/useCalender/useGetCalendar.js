import { useState } from "react";
import AxiosInstance from "../../utils/AxiosInstance.jsx";

function useGetCalendar() {
    const [isLoading, setIsLoading] = useState(false);
    const [calendarData, setCalendarData] = useState([]);
    const [error, setError] = useState(null);

    const fetchCalendarData = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const res = await AxiosInstance.get("/api/Calenders");
            if (res.status === 200) {
                setCalendarData(res.data);
            } else {
                throw new Error(res.data.message || "Failed to fetch calendar data");
            }
        } catch (err) {
            setCalendarData([]);
            setError(err);
        } finally {
            setIsLoading(false);
        }
    }; 

    return { fetchCalendarData, calendarData, isLoading, error };
}

export default useGetCalendar;
