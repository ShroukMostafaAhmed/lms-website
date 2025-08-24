import { useState } from "react";
import AxiosInstance from "../../utils/AxiosInstance";

const useGetTeacherById = () => {
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getTeacherById = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response =
     await AxiosInstance.get(`/api/Teachers/${id}`);
      setTeacher(response.data);
    } catch (err) {
      setError(err);
      console.error("Error fetching teacher:", err);
    } finally {
      setLoading(false); 
    }
  };

  return { teacher, loading, error, getTeacherById };
};

export default useGetTeacherById;
