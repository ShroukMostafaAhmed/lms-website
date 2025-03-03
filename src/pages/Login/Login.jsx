import React from 'react';
import JoinUs from "../../components/HeroSections/JoinUs.jsx";
import AuthForm from "../../components/AuthForm/AuthForm.jsx";
import {FaPhone} from "react-icons/fa";

function Login() {
    return (
        <>
            <JoinUs
                // title={"انضم إلينا!"}
                title={"مرحبا بك مرة اخرى!"}
                subTitle={
                    <>
                        معًا لنصنع مستقبلًا مشرقًا! انضم إلى <span className="font-bold">أدرس</span> وابدأ رحلتك التعليمية اليوم!
                    </>
                }
            />

            <AuthForm
                title="تسجيل دخول"
                fields={[
                    { label: "رقم الهاتف", type: "text", placeholder: "ادخل", icon: <FaPhone /> },
                    { label: "كلمة السر", type: "password", placeholder: "ادخل" },
                ]}
                buttonText="تسجيل دخول"
                footerText="ليس لديك حساب ؟"
                footerLink="/register"
                footerLinkText="إنشاء حساب"
            />
        </>
    );
}

export default Login;