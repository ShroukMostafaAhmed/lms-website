import React from 'react';
import JoinUs from "../../components/HeroSections/JoinUs.jsx";
import MultiStepForm from "../../components/AuthForm/MultiStepForm.jsx";
import AuthBackground from "../../components/AuthBackground.jsx"; 

function Register() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
      
      {/* ✅ خلفيات وزخارف الصفحة */}
      <AuthBackground />

      {/* ✅ المحتوى فوق الخلفية */}
      <div className="relative z-10">
        <JoinUs
          title="انضم إلينا!"
          subTitle={
            <>
              معًا لنصنع مستقبلًا مشرقًا! انضم إلى <span className="font-bold">أدرس</span> وابدأ رحلتك التعليمية اليوم!
            </>
          }
          hideBreadcrumb={true}
        />

        <MultiStepForm />
      </div>
    </div>
  );
}

export default Register;
