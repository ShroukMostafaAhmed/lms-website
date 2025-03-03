import {FaEye, FaEyeSlash} from "react-icons/fa";
import {useState} from "react";

const InputField = ({ label, type, placeholder, icon }) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";

    return (
        <div className="mb-6 relative">
            <label className="block mb-1 text-right font-medium text-gray-700">
                {label} <span className="text-red-500">*</span>
            </label>
            <div className="relative">
                <input
                    type={isPassword && !showPassword ? "password" : "text"}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-500 outline-none text-right pr-4"
                    placeholder={placeholder}
                />
                {icon && (
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </span>
                )}
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
        </div>
    );
};

export default InputField;