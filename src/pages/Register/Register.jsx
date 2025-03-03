import React from 'react';
import JoinUs from "../../components/HeroSections/JoinUs.jsx";
import MultiStepForm from "../../components/AuthForm/MultiStepForm.jsx";

function Register() {
    return (
        <>
            <JoinUs
                title={"انضم إلينا!"}
                subTitle={
                    <>
                        معًا لنصنع مستقبلًا مشرقًا! انضم إلى <span className="font-bold">أدرس</span> وابدأ رحلتك التعليمية اليوم!
                    </>
                }
            />
            <MultiStepForm/>
        </>
    );
}

export default Register;