// useGetLevelsByStageId.jsx
import { useState, useCallback } from "react";
import AxiosInstance from "../../utils/AxiosInstance.jsx";

function useGetLevelsByStageId() {
  const [loading, setLoading] = useState(false);
  const [levels, setLevels] = useState([]);
  const [error, setError] = useState(null);

  // دالة لجلب المستويات حسب معرف المرحلة
  const getLevelsByStageId = useCallback(async (stageId) => {
    if (!stageId) return;
    setLoading(true);
    setError(null);
    try {                      
      const res = await AxiosInstance.get(`/api/Level/by-stage/${stageId}`);
      //const res = await AxiosInstance.get(`api/Stages/{stageId}/${stageId}`);

      // نفترض الـ API يرجع statusCode = 0 للنجاح
     if (res.data.statusCode === 200) {
  setLevels(res.data.data || []);
} else {
  throw new Error(res.data.message || "فشل في جلب الصفوف");
}

    } catch (err) {
      setError(err.message || "حدث خطأ أثناء جلب الصفوف");
      setLevels([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, levels, error, getLevelsByStageId };
}

export default useGetLevelsByStageId;
