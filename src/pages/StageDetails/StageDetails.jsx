import React from 'react';
import Breadcrumb from "../../components/main/BreadCrumb.jsx";
import {useLocation} from "react-router-dom";
import BannerCard from "../../components/Cards/BannerCard.jsx";
import Card from "../../components/Cards/Card.jsx";

function StageDetails() {
    // use location for states that sent from another page
    const location = useLocation();
    const {id, title = "Default Title"} = location.state;

    // Bread Crumb Details
    const items = [
        { label: "الرئيسية", href: "/" },
        { label: `${title}` },
    ];

    const levels = [
        {id: 1, text: "الصف الأول", color: "blue" },
        {id: 2, text: "الصف الثاني", color: "yellow" },
        {id: 3, text: "الصف الثالث", color: "orange" },
        {id: 4, text: "الصف الرابع", color: "blue" },
        {id: 5, text: "الصف الخامس", color: "yellow" },
        {id: 6, text: "الصف السادس", color: "orange" },
    ]

    return (
        <>
            <Breadcrumb items={items}/>
            <BannerCard imageSrc="/stage1.png" imageAlt="Stage 1"/>

            <div className="flex flex-col gap-4 px-6">
                <h2 className="text-2xl font-bold py-4">
                    اختر الصف
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
                    {levels && levels.map((level, index) => (
                        <Card key={index} color={level.color} text={level.text} number={level.id} title={title}/>
                    ))}
                </div>
            </div>
        </>
    );
}

export default StageDetails;