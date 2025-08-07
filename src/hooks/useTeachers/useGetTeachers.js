import { useState, useEffect } from "react";
import AxiosInstance from "../../utils/AxiosInstance.jsx";

function useGetTeachers() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeachers = async () => {
      setLoading(true);
      try {
        const res = await AxiosInstance.get('/api/Teachers'); 
        setTeachers(res.data);
        setError(null);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  return { teachers, loading, error };
}

export default useGetTeachers;
