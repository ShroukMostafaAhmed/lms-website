import React from 'react';
import Quiz from "../../components/Quiz/Quiz.jsx";
import Breadcrumb from "../../components/main/BreadCrumb.jsx";

function ExamResults() {
    // bread crumb items
    const breadCrumbItems = [
        { label: "الرئيسية", href: "/" },
        { label: "المرحلة الابتدائية", href: "/stage_details" },
        { label: "الصف الاول", href: "/level_details" },
        { label: "رياضيات", href: "/lessons" },
        { label: "الامتحان الاول"},
    ];

    return (
        <>
            <Breadcrumb items={breadCrumbItems} />

            <Quiz mode="review"/>
        </>
    );
}

export default ExamResults;