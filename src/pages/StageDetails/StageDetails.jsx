import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Breadcrumb from "../../components/main/BreadCrumb.jsx";
import BannerCard from "../../components/Cards/BannerCard.jsx";
import Card from "../../components/Cards/Card.jsx";

function StageDetails() {
    const location = useLocation();
    const navigate = useNavigate();
    const [items, setItems] = useState([]);

    const [state, setState] = useState(() => {
        const savedState = localStorage.getItem("stageDetailsState");
        return location.state || (savedState ? JSON.parse(savedState) : {});
    });

    useEffect(() => {
        if (state) {
            console.log("Setting state in localStorage:", state);
            localStorage.setItem("stageDetailsState", JSON.stringify(state));
        }
        console.log(state)
        setItems([
            { label: "الرئيسية", href: "/" },
            { label: state.title }
        ]);
    }, [state]);


    const levels = [
        { id: 1, text: "الصف الأول", color: "blue" },
        { id: 2, text: "الصف الثاني", color: "yellow" },
        { id: 3, text: "الصف الثالث", color: "orange" },
        { id: 4, text: "الصف الرابع", color: "blue" },
        { id: 5, text: "الصف الخامس", color: "yellow" },
        { id: 6, text: "الصف السادس", color: "orange" }
    ];

    const handleCardClick = (level) => {
        const newState = {
            id: level.id,
            title: state.title,
            text: level.text
        };
        console.log("minaminamina", newState)

        setState(newState);
        navigate('/level_details', { state: newState })
    };

    return (
        <>
            <Breadcrumb items={items} />
            <BannerCard imageSrc="/stage1.png" imageAlt="Stage 1" />

            <div className="flex flex-col gap-y-4 px-6">
                <h2 className="text-2xl font-bold py-4">
                    اختر الصف
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mb-10">
                    {levels.map((level) => (
                        <Card
                            key={level.id}
                            id={level.id}
                            href={"/level_details"}
                            color={level.color}
                            text={level.text}
                            number={level.id}
                            onClick={() => handleCardClick(level)}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}

export default StageDetails;