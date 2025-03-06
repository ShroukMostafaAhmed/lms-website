import React from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import Breadcrumb from "../../components/main/BreadCrumb.jsx";
import BannerCard from "../../components/Cards/BannerCard.jsx";
import Card from "../../components/Cards/Card.jsx";

function LevelDetails() {
    // use location for states that sent from another page
    const location = useLocation();
    const navigate = useNavigate();
    const state = location.state || JSON.parse(localStorage.getItem("levelDetailsState")) || {};

    const title = state.title ?? "Default Title";
    const text = state.text ?? "No Text Available";


    console.log(state)

    // Bread Crumb Details
    const items = [
        { label: "الرئيسية", href: "/" },
        {
            label: title,
            href: "/stage_details",
            state: { title: title }
        },
        { label: text }
    ];

    const subs = [
        {id: 1, text: "اللغه العربية", color: "blue" },
        {id: 2, text: "الرياضيات", color: "yellow" },
        {id: 3, text: "العلوم", color: "orange" },
    ];

    const handleCardClick = (level) => {
        const newState = {
            id: level.id,
            title: title,
            text: level.text
        };

        // Store in localStorage to persist state if lost
        localStorage.setItem("levelDetailsState", JSON.stringify(newState));

        navigate('/sub_details', { state: newState });
    };

    return (
        <>
            <Breadcrumb items={items}/>

            <BannerCard imageSrc="/stage1.png" imageAlt="Stage 1"/>

            <div className="flex flex-col gap-4 px-6">
                <h2 className="text-2xl font-bold py-4">
                    اختر الصف
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mb-10">
                    {subs.map((sub, index) => (
                        <Card
                            key={index}
                            color={sub.color}
                            text={sub.text}
                            number={sub.id}
                            onClick={() => handleCardClick(sub)}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}

export default LevelDetails;