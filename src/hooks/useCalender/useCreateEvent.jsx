import { useState } from 'react';
import AxiosInstance from "../../utils/AxiosInstance.jsx";

const useCreateEvent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const createEvent = async (eventData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await AxiosInstance.post('/api/StudentCalenders/Create', {
        day: eventData.day,
        month: eventData.month,
        year: eventData.year,
        notes: eventData.note || eventData.notes,
        color: eventData.color
      });

      setIsLoading(false);
      return response.data;
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.message ||
        'حدث خطأ غير متوقع أثناء إرسال البيانات';
      setError(message);
      setIsLoading(false);
      throw new Error(message);
    }
  };

  return {
    createEvent,
    isLoading,
    error
  };
};

export default useCreateEvent;
