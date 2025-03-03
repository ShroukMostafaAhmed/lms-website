import { useState } from "react";
import {FaPhone} from "react-icons/fa";
import InputField from "./InputField.jsx";
import './styles.css'

const steps = ["المعلومات الشخصية", "اختر مدة الاشتراك", "اختر الباقة"];

export default function MultiStepForm() {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
        duration: "أسبوع",
        plan: null,
    });

    const nextStep = () => setStep((prev) => Math.min(prev + 1, steps.length - 1));
    const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

    return (
        <div dir="rtl" className="flex flex-col lg:flex-row items-center lg:items-start  justify-center lg:justify-between min-h-1/2 bg-white px-4 my-20 lg:px-16 gap-6">
            {/* Progress Bar Outside Form */}
            <div className="relative right-0 transform flex flex-col items-center lg:items-start">
                <div className="w-full mb-4 text-right top-0 p-6 lg:p-0">
                    <a href={"/"} className="text-blue-600 text-xl font-bold">{"الرئيسية"}</a> /
                    <span className="text-gray-600 text-lg font-bold">{"إنشاء حساب"}</span>
                </div>

                <div className="flex lg:flex-col flex-row lg:items-center items-start gap-4 lg:gap-6">
                    {steps.map((label, index) => (
                        <div key={index} className="flex lg:flex-col flex-row items-center relative gap-2">
                            <div className="flex items-center gap-2">
                                <div
                                    className={`w-4 lg:w-8 h-4 lg:h-8 flex items-center justify-center rounded-full text-white font-bold transition-all duration-300 ${
                                        step >= index ? "bg-blue-500" : "bg-gray-300"
                                    }`}
                                >
                                    {index + 1}
                                </div>
                                <span className="lg:text-sm text-xs font-medium text-gray-700">{label}</span>
                            </div>
                            {index < steps.length - 1 && (
                                <div
                                    className={`lg:w-1 lg:h-12 w-12 h-1 ${
                                        step > index ? "bg-blue-500" : "bg-gray-300"
                                    } transition-all duration-300`}
                                ></div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Form Section */}
            <div className="relative w-[97%] md:w-[80%] lg:w-[75%] bg-white p-6 rounded-3xl shadow-2xl">
                <h2 className="text-xl font-semibold text-right mb-4">{steps[step]}</h2>
                <div className="mb-4 flex flex-col gap-4">
                    {step === 0 && <PersonalInfo formData={formData} setFormData={setFormData} />}
                    {step === 1 && <SubscriptionDuration formData={formData} setFormData={setFormData} />}
                    {step === 2 && <PlanSelection formData={formData} setFormData={setFormData} />}
                </div>
                <div dir={"rtl"} className="flex flex-col gap-4 justify-between">
                    <button
                        onClick={nextStep}
                        className="px-4 py-2 w-full bg-blue-400 hover:bg-blue-600 text-white rounded-xl cursor-pointer"
                    >
                        {step === steps.length - 1 ? "إنشاء حساب" : "التالي"}
                    </button>
                    {step > 0 && (
                        <button onClick={prevStep} className="px-4 py-2 bg-gray-100 rounded-xl hover:bg-gray-300 cursor-pointer">
                            السابق
                        </button>
                    )}
                </div>
            </div>

        </div>
    );
}

function PersonalInfo() {
    const fields = [
        { label: "رقم الهاتف", name: "phone", type: "text", placeholder: "ادخل", icon: <FaPhone /> },
        { label: "كلمة السر", name: "password", type: "password", placeholder: "ادخل" },
        { label: "تأكيد كلمة السر", name: "confirmPassword", type: "password", placeholder: "ادخل" }
    ];

    return (
        <div className="flex flex-col gap-2">
            {fields.map((field , index ) => (
                <InputField key={index} label={field.label} type={field.type} name={field.name} placeholder={field.placeholder}/>
            ))}
        </div>
    );
}

function SubscriptionDuration({ formData, setFormData }) {
    const durations = ["أسبوع", "شهر", "3 شهور", "سنة"];
    return (
        <div className="grid grid-cols-2 gap-2">
            {durations.map((duration) => (
                <button
                    key={duration}
                    className={`p-2 rounded-3xl h-16 border ${
                        formData.duration === duration ? "bg-blue-500 text-white border-[#1E78EB4D]" : "border-[#001F3F99]"
                    }`}
                    onClick={() => setFormData({ ...formData, duration })}
                >
                    {duration}
                </button>
            ))}
        </div>
    );
}

function PlanSelection({ formData, setFormData }) {
    const plans = [
        { name: "الباقة الأساسية", price: "20$", type: "base-sub", features: ["تشمل جميع المراحل الدراسية", "دروس تعليمية شاملة", "فيديوهات تعليمية شاملة", "اختبارات متطورة لتقييم الفهم"] },
        { name: "الباقة العادية", price: "40$", type: "extra-sub", features: ["تشمل جميع المراحل الدراسية", "دروس تعليمية شاملة", "فيديوهات تعليمية شاملة", "اختبارات متطورة لتقييم الفهم", "حل الأسئلة والواجبات"] },
        { name: "الباقة المميزة", price: "60$", type: "special-sub", features: ["تشمل جميع المراحل الدراسية", "دروس تعليمية شاملة", "فيديوهات تعليمية شاملة", "اختبارات متطورة لتقييم الفهم", "حل الأسئلة والواجبات", "مساعد ذكي"] },
    ];
    return (
        <div className="flex flex-wrap lg:flex-row items-center mb-4 justify-center gap-12">
            {plans.map((plan) => (
                <div
                    key={plan.name}
                    className={`card transform transition-transform duration-300 hover:scale-103 ${
                        formData.plan === plan.name ? "bg-blue-500 text-white" : "bg-gray-200"
                    }`}
                    onClick={() => setFormData({ ...formData, plan: plan.name })}
                >
                    <div className={`trangle `}></div>
                    <div className={"header-content" + ' ' + plan.type }>
                        <p>{plan.name}</p>
                        <div className="trangle"></div>
                        <div className="trangle-2 "></div>
                    </div>
                    <ul className="space-y-3 px-4">
                        {plan.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center justify-between text-gray-700">
                                <span className={`text-white rounded-full px-2 ${plan.type == "extra-sub" ? "bg-red-500" : plan.type == "special-sub" ? "bg-blue-500" : "bg-yellow-300"} font-bold text-lg`}>
                                    ✓
                                </span>
                                <span>{feature}</span>
                            </li>
                        ))}
                    </ul>
                    <hr className="mx-auto my-6 border border-[#D4D1C9] h-[3px] bg-[#D4D1C9] w-[90%]"/>
                    <div className="text-center mb-6 mt-8">
                        <span className="text-3xl text-[#0A4A85] font-bold">{plan.price} $</span>
                    </div>
                    <button
                        className={`w-[70%] lg:w-[80%] mx-auto p-2 text-white rounded-xl bg-blue-500 hover:bg-blue-600 transition-colors duration-300 cursor-pointer flex items-center justify-center`}
                    >
                        اشترك الآن
                    </button>
                </div>
            ))}
        </div>
    );
}