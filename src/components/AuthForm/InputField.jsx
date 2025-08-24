import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";

const InputField = ({ name, label, type, placeholder, icon, value, onChange, options = [] }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const isSelect = type === "select";

  return (
    <div className="mb-6 relative">
      <label className="block mb-1 text-right font-medium text-gray-700">
        {label} <span className="text-red-500">*</span>
      </label>

      {/* Select Field */}
     {isSelect ? (
  <select
  name={name}
  id={name}
  value={value}
  onChange={onChange}
  className={`w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-500 outline-none text-right
    ${value === "" ? "text-gray-500" : "text-gray-900"}`}
>
  <option value="" disabled hidden>
    اختر {label}
  </option>
  {options.map((option, index) => (
    <option
      key={index}
      value={option.value}
      disabled={option.disabled}
      className="text-gray-900" // ثابت عشان ما يرث اللون الرمادي
    >
      {option.label}
    </option>
  ))}
</select>

) : (

        // Input Field
        <div className="relative">
          <input
            name={name}
            type={isPassword ? (showPassword ? "text" : "password") : type}
            className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-500 outline-none text-right pr-4"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
          {/* Left Icon for non-password */}
          {icon && !isPassword && (
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {icon}
            </span>
          )}
          {/* Toggle Password Visibility */}
          {isPassword && (
            <button
              type="button"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default InputField;
