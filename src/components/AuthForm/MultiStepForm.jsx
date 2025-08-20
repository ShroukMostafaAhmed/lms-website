import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "./InputField.jsx";
import useRegister from "../../hooks/useRegister/useRegister.js";
import "./styles.css";

export default function RegisterForm() {
  const navigate = useNavigate();
  const { registerAPI, loading } = useRegister();

  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    PhoneNumber: "",
    Password: "",
    ConfirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { FirstName, LastName, PhoneNumber, Password, ConfirmPassword } = formData;

    if (!FirstName || !LastName || !PhoneNumber || !Password || !ConfirmPassword) {
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

    // Transform the data to match API expectations (camelCase)
    const apiData = {
      phoneNumber: PhoneNumber,
      firstName: FirstName,
      lastName: LastName,
      password: Password,
      confirmPassword: ConfirmPassword
    };

    const response = await registerAPI(apiData);

    if (response.success) {
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } else {
      setError(response.message || "حدث خطأ أثناء التسجيل");
    }
  };

  return (
    <div className="relative z-10">
      <form
        onSubmit={handleSubmit}
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
            {/* الاسم الأول و الأخير جنب بعض */}
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <div className="w-full md:w-1/2">
                <InputField
                  label="الاسم الأول"
                  type="text"
                  name="FirstName"
                  placeholder="ادخل الاسم الأول"
                  value={formData.FirstName}
                  onChange={(e) => setFormData({ ...formData, FirstName: e.target.value })}
                />
              </div>
              <div className="w-full md:w-1/2">
                <InputField
                  label="الاسم الأخير"
                  type="text"
                  name="LastName"
                  placeholder="ادخل الاسم الأخير"
                  value={formData.LastName}
                  onChange={(e) => setFormData({ ...formData, LastName: e.target.value })}
                />
              </div>
            </div>

            {/* رقم الهاتف */}
            <InputField
              label="رقم الهاتف"
              type="tel"
              name="PhoneNumber"
              placeholder="ادخل رقم الهاتف"
              value={formData.PhoneNumber}
              onChange={(e) => setFormData({ ...formData, PhoneNumber: e.target.value })}
            />

            {/* كلمة السر */}
            <InputField
              label="كلمة السر"
              type="password"
              name="Password"
              placeholder="ادخل كلمة السر"
              value={formData.Password}
              onChange={(e) => setFormData({ ...formData, Password: e.target.value })}
            />

            {/* تأكيد كلمة السر */}
            <InputField
              label="تأكيد كلمة السر"
              type="password"
              name="ConfirmPassword"
              placeholder="ادخل كلمة السر مرة اخرى"
              value={formData.ConfirmPassword}
              onChange={(e) => setFormData({ ...formData, ConfirmPassword: e.target.value })}
            />

            {/* الأخطاء */}
            {error && <p className="text-red-500 text-sm text-right">{error}</p>}
          </div>

          {/* زر التسجيل */}
          <div className="flex flex-col gap-4 justify-between">
            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 w-full text-white rounded-lg cursor-pointer ${
                loading ? "bg-gray-400" : "bg-blue-700 hover:bg-blue-800 bold"
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