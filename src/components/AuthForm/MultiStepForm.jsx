import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "./InputField.jsx";
import useRegister from "../../hooks/useRegister/useRegister.js";
import "./styles.css";

// نفس ستايل ال inputs للـ selects
const selectClass =
  "w-full h-11 text-sm md:text-base bg-white text-gray-900 " +
  "border border-gray-300 rounded-lg px-3 py-2 " +
  "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 " +
  "placeholder-gray-400 transition-colors duration-150 " +
  "disabled:bg-gray-100 disabled:cursor-not-allowed";

const ReqStar = () => <span className="text-red-500">*</span>;

// يفضّل ضبطه من env مع Vite: VITE_API_BASE_URL
const API_BASE = import.meta?.env?.VITE_API_BASE_URL || "";

async function fetchJSON(url, { signal } = {}) {
  const res = await fetch(url, { signal });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `HTTP ${res.status}`);
  }
  return res.json();
}

// محاولة للتطبيع لو أسماء الحقول مختلفة
const normalizeStage = (s) => ({
  id: s?.id ?? s?.stageId ?? s?.StageId ?? s?.ID,
  label: s?.name ?? s?.label ?? s?.stageName ?? s?.Name ?? "",
});

const normalizeLevel = (l) => ({
  id: l?.id ?? l?.levelId ?? l?.LevelId ?? l?.ID,
  label: l?.name ?? l?.label ?? l?.levelName ?? l?.Name ?? "",
});

export default function RegisterForm() {
  const navigate = useNavigate();
  const { registerAPI, loading } = useRegister();

  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    PhoneNumber: "",
    Password: "",
    ConfirmPassword: "",
    StageId: "",   // المرحلة المختارة
    LevelId: "",   // الصف/المستوى المختار
  });

  const [error, setError] = useState("");

  // بيانات المراحل/المستويات من الـ API
  const [stages, setStages] = useState([]);
  const [levels, setLevels] = useState([]);
  const [stageLoading, setStageLoading] = useState(false);
  const [levelLoading, setLevelLoading] = useState(false);
  const [stageError, setStageError] = useState("");
  const [levelError, setLevelError] = useState("");

  // كاش للمستويات لكل Stage لتقليل النداءات
  const levelsCacheRef = useRef({});

  // لإلغاء الطلب عند تغيير المرحلة سريعًا
  const levelAbortRef = useRef(null);

  // تحميل المراحل عند الفتح
  useEffect(() => {
    let aborter = new AbortController();
    setStageLoading(true);
    setStageError("");
    fetchJSON(`${API_BASE}/api/Stages/all`, { signal: aborter.signal })
      .then((data) => {
        const rows = Array.isArray(data) ? data : data?.data || [];
        const normalized = rows.map(normalizeStage).filter((x) => x.id && x.label);
        setStages(normalized);
      })
      .catch((e) => setStageError("تعذر تحميل المراحل"))
      .finally(() => setStageLoading(false));
    return () => aborter.abort?.();
  }, []);

  // تحميل المستويات عند اختيار مرحلة
  useEffect(() => {
    const stageId = formData.StageId;
    setLevels([]);
    setLevelError("");
    setFormData((p) => ({ ...p, LevelId: "" }));

    if (!stageId) return;

    // لو متخزنة في الكاش
    if (levelsCacheRef.current[stageId]) {
      setLevels(levelsCacheRef.current[stageId]);
      return;
    }

    // ألغِ الطلب السابق (لو موجود) وتجهّز واحد جديد
    levelAbortRef.current?.abort?.();
    const aborter = new AbortController();
    levelAbortRef.current = aborter;

    setLevelLoading(true);
    fetchJSON(`${API_BASE}/api/Levels/by-stage/${encodeURIComponent(stageId)}`, {
      signal: aborter.signal,
    })
      .then((data) => {
        const rows = Array.isArray(data) ? data : data?.data || [];
        const normalized = rows.map(normalizeLevel).filter((x) => x.id && x.label);
        levelsCacheRef.current[stageId] = normalized;
        setLevels(normalized);
      })
      .catch((e) => {
        if (e.name !== "AbortError") setLevelError("تعذر تحميل الصفوف/المستويات");
      })
      .finally(() => setLevelLoading(false));

    return () => aborter.abort?.();
  }, [formData.StageId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      FirstName,
      LastName,
      PhoneNumber,
      Password,
      ConfirmPassword,
      StageId,
      LevelId,
    } = formData;

    if (
      !FirstName ||
      !LastName ||
      !PhoneNumber ||
      !Password ||
      !ConfirmPassword ||
      !StageId ||
      !LevelId
    ) {
      setError("من فضلك املأ جميع الحقول المطلوبة");
      return;
    }
    if (Password.length < 6) {
      setError("كلمة السر يجب أن تكون على الأقل 6 أحرف");
      return;
    }
    if (Password !== ConfirmPassword) {
      setError("كلمة السر وتأكيدها غير متطابقين");
      return;
    }

    setError("");

    const apiData = {
      phoneNumber: PhoneNumber,
      firstName: FirstName,
      lastName: LastName,
      password: Password,
      confirmPassword: ConfirmPassword,
      levelId: LevelId, // المطلوب من الباك
      // ملحوظة: لا نرسل StageId إذا الباك لا يحتاجه
    };

    const response = await registerAPI(apiData);

    if (response?.success) {
      setTimeout(() => navigate("/login"), 500);
    } else {
      setError(response?.message || "حدث خطأ أثناء التسجيل");
    }
  };

  return (
    <div className="relative z-10">
      <form
        onSubmit={handleSubmit}
        noValidate
        dir="rtl"
        className="flex flex-col items-center justify-center min-h-screen bg-transparent px-4 py-10 lg:px-16 gap-6"
      >
        {/* عنوان الصفحة */}
        <div className="w-full text-center mb-6">
          <h2 className="text-2xl font-bold text-blue-600">انضم إلينا!</h2>
          <p className="text-gray-500 mt-2">ابدأ رحلتك التعليمية معنا اليوم</p>
        </div>

        {/* الفورم */}
        <div className="relative w-[97%] md:w-[80%] lg:w-[50%] bg-white p-6 rounded-3xl shadow-2xl">
          <h2 className="text-xl font-semibold text-right mb-4">المعلومات الشخصية</h2>

          <div className="mb-4 flex flex-col gap-4">
            {/* الاسم الأول و الأخير */}
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <div className="w-full md:w-1/2">
                <InputField
                  label="الاسم الأول"
                  type="text"
                  name="FirstName"
                  placeholder="ادخل الاسم الأول"
                  value={formData.FirstName}
                  onChange={(e) =>
                    setFormData({ ...formData, FirstName: e.target.value })
                  }
                />
              </div>
              <div className="w-full md:w-1/2">
                <InputField
                  label="الاسم الأخير"
                  type="text"
                  name="LastName"
                  placeholder="ادخل الاسم الأخير"
                  value={formData.LastName}
                  onChange={(e) =>
                    setFormData({ ...formData, LastName: e.target.value })
                  }
                />
              </div>
            </div>

            {/* المرحلة والصف/المستوى */}
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              {/* المرحلة */}
              <div className="w-full md:w-1/2">
                <label className="block text-right text-sm font-medium text-gray-700 mb-1">
                  اختر المرحلة <ReqStar />
                </label>
                <select
                  name="StageId"
                  value={formData.StageId}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      StageId: e.target.value,
                      LevelId: "", // تصفير المستوى عند تغيير المرحلة
                    })
                  }
                  className={selectClass}
                >
                  <option value="">
                    {stageLoading ? "— جاري التحميل… —" : "— اختر المرحلة —"}
                  </option>
                  {stageError && <option value="">{stageError}</option>}
                  {!stageLoading &&
                    !stageError &&
                    stages.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.label}
                      </option>
                    ))}
                </select>
              </div>

              {/* الصف/المستوى */}
              <div className="w-full md:w-1/2">
                <label className="block text-right text-sm font-medium text-gray-700 mb-1">
                  اختر الصف / المستوى <ReqStar />
                </label>
                <select
                  name="LevelId"
                  value={formData.LevelId}
                  onChange={(e) =>
                    setFormData({ ...formData, LevelId: e.target.value })
                  }
                  disabled={!formData.StageId || levelLoading}
                  className={`${selectClass} ${
                    !formData.StageId || levelLoading ? "opacity-60" : ""
                  }`}
                >
                  <option value="">
                    {!formData.StageId
                      ? "اختر المرحلة أولاً"
                      : levelLoading
                      ? "— جاري التحميل… —"
                      : "— اختر الصف / المستوى —"}
                  </option>
                  {levelError && <option value="">{levelError}</option>}
                  {!levelLoading &&
                    !levelError &&
                    levels.map((l) => (
                      <option key={l.id} value={l.id}>
                        {l.label}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            {/* رقم الهاتف */}
            <InputField
              label="رقم الهاتف"
              type="tel"
              name="PhoneNumber"
              placeholder="ادخل رقم الهاتف"
              value={formData.PhoneNumber}
              onChange={(e) =>
                setFormData({ ...formData, PhoneNumber: e.target.value })
              }
            />

            {/* كلمة السر */}
            <InputField
              label="كلمة السر"
              type="password"
              name="Password"
              placeholder="ادخل كلمة السر"
              value={formData.Password}
              onChange={(e) =>
                setFormData({ ...formData, Password: e.target.value })
              }
            />

            {/* تأكيد كلمة السر */}
            <InputField
              label="تأكيد كلمة السر"
              type="password"
              name="ConfirmPassword"
              placeholder="ادخل كلمة السر مرة اخرى"
              value={formData.ConfirmPassword}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  ConfirmPassword: e.target.value,
                })
              }
            />

            {/* رسالة الخطأ العامة */}
            {error && <p className="text-red-500 text-sm text-right">{error}</p>}
          </div>

          {/* زر التسجيل */}
          <div className="flex flex-col gap-4 justify-between">
            <button
              type="submit"
              disabled={loading || stageLoading}
              className={`px-4 py-2 w-full text-white rounded-lg cursor-pointer ${
                loading || stageLoading
                  ? "bg-gray-400"
                  : "bg-blue-700 hover:bg-blue-800 bold"
              }`}
            >
              {loading ? "جارٍ التسجيل..." : "إنشاء حساب"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
