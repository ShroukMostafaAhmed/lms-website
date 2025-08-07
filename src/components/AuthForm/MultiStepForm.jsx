import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "./InputField.jsx";
import useRegister from "../../hooks/useRegister/useRegister.js";
import './styles.css';

export default function RegisterForm() {
  const navigate = useNavigate();
  const { registerAPI, loading } = useRegister();

  const [formData, setFormData] = useState({
    PhoneNumber: "",
    password: "",
    confirmPassword: "",
    userType: ""
  });

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { PhoneNumber, password, confirmPassword, userType } = formData;

    if (!PhoneNumber || !password || !confirmPassword || !userType) {
      setError("من فضلك املأ جميع الحقول المطلوبة");
      return;
    }

    if (password.length < 6) {
      setError("كلمة السر يجب أن تكون على الأقل 6 أحرف");
      return;
    }

    if (password !== confirmPassword) {
      setError("كلمة السر وتأكيدها غير متطابقين");
      return;
    }

    setError("");

    const response = await registerAPI({
      PhoneNumber,
      password,
      confirmPassword,
      userType,
      duration: 1,
      plan: "basic",
    });

    if (response.success) {
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  };

  const fields = [
    { label: "رقم الهاتف", name: "PhoneNumber", type: "text", placeholder: "ادخل رقم الهاتف" },
    { label: "كلمة السر", name: "password", type: "password", placeholder: "ادخل كلمة السر" },
    { label: "تأكيد كلمة السر", name: "confirmPassword", type: "password", placeholder: "ادخل كلمة السر مرة اخرى" },
    {
      label: "نوع المستخدم",
      name: "userType",
      type: "select",
      options: [
        { value: "student", label: "طالب" },
        { value: "teacher", label: "معلم" },
        { value: "admin", label: "مسؤول" }
      ]
    }
  ];

  return (
    <div className="relative z-10">
      <form
        onSubmit={handleSubmit}
        dir="rtl"
        className="flex flex-col items-center justify-center min-h-screen bg-transparent px-4 py-10 lg:px-16 gap-6"
      >
        <div className="w-full text-center mb-6">
          <h2 className="text-2xl font-bold text-blue-600">انضم إلينا!</h2>
          <p className="text-gray-500 mt-2">ابدأ رحلتك التعليمية معنا اليوم</p>
        </div>

        <div className="relative w-[97%] md:w-[80%] lg:w-[50%] bg-white p-6 rounded-3xl shadow-2xl">
          <h2 className="text-xl font-semibold text-right mb-4">المعلومات الشخصية</h2>

          <div className="mb-4 flex flex-col gap-4">
            {fields.map((field, index) => (
              <InputField
                key={index}
                label={field.label}
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                icon={field.icon}
                value={formData[field.name]}
                options={field.options}
                onChange={(e) =>
                  setFormData({ ...formData, [field.name]: e.target.value })
                }
              />
            ))}
            {error && <p className="text-red-500 text-sm text-right">{error}</p>}
          </div>

          <div className="flex flex-col gap-4 justify-between">
            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 w-full text-white rounded-lg cursor-pointer ${
                loading ? 'bg-gray-400' : 'bg-blue-700 hover:bg-blue-800 bold'
              }`}
            >
              {loading ? 'جارٍ التسجيل...' : 'إنشاء حساب'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
