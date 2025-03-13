import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Breadcrumb from "../../components/main/BreadCrumb.jsx";
import BannerCard from "../../components/Cards/BannerCard.jsx";
import Card from "../../components/Cards/Card.jsx";

function LevelDetails() {
    const location = useLocation();
    const navigate = useNavigate();

    const [state, setState] = useState(() => {
        const savedState = localStorage.getItem("levelDetailsState");
        return location.state || (savedState ? JSON.parse(savedState) : {});
    });

    useEffect(() => {
        if (state) {
            console.log("Setting state in localStorage:", state);
            localStorage.setItem("levelDetailsState", JSON.stringify(state));
        }
    }, [state]);

    const title = state?.title ?? "Default Title";
    const text = state?.text ?? "No Text Available";

    console.log("LevelDetails state:", state);

    const items = [
        { label: "الرئيسية", href: "/" },
        { label: title, href: "/stage_details", state: { title } },
        { label: text }
    ];

    const subs = [
        { id: 1, text: "اللغه العربية", color: "blue", image: <img src='litter.png' alt='litter' className='w-4 h-8' /> },
        { id: 2, text: "الرياضيات", color: "yellow", image: <img src='math.png' alt='math' className='w-8 h-8' /> },
        { id: 3, text: "اللغه الانجليزية", color: "orange", image: <img src='english.png' alt='english' className='w-8 h-8' /> }
    ];

    const handleCardClick = (sub) => {
        const newState = {
            id: sub.id,
            title: location.state?.title || title,
            subtitle: location.state.text || text,
            text: sub.text
        };

        setState(newState);
        console.log(newState)
        navigate('/lessons', { state: newState });
    };

    useEffect(() => {
        if (!state?.title) {
            const savedState = JSON.parse(localStorage.getItem("levelDetailsState"));
            if (savedState) {
                setState(savedState);
            }
        }
    }, []);

    return (
        <>
            <Breadcrumb items={items} />
            <BannerCard imageSrc="/stage1.png" imageAlt="Stage 1" />

            <div className="flex flex-col gap-4 px-6">
                <h2 className="text-2xl font-bold py-4">اختر الماده</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mb-10">
                    {subs.map((sub) => (
                        <Card
                            key={sub.id}
                            href={"/lessons"}
                            color={sub.color}
                            text={sub.text}
                            number={sub.image}
                            onClick={() => handleCardClick(sub)}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}

export default LevelDetails;