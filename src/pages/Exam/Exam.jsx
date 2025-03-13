import React from 'react';
import Quiz from "../../components/Quiz/Quiz.jsx";
import Breadcrumb from "../../components/main/BreadCrumb.jsx";

function Exam() {
    // bread crumb items
    const items = [
        { label: "الرئيسية", href: "/" },
        { label: "الامتحانات", href: "/exams" },
        { label: "الامتحان الاول", href: "/exam_details" },
    ];

    return (
        <>
            <Breadcrumb items={items}/>

            <Quiz/>
        </>
    );
}

export default Exam;