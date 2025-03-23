import React from 'react';
import Breadcrumb from "../../components/main/BreadCrumb.jsx";
import BannerCard from "../../components/Cards/BannerCard.jsx";
import Card from "../../components/Cards/Card.jsx";
import {useNavigate} from "react-router-dom";

function Lessons() {
    // use navigate
    const navigate = useNavigate();

    // Bread Crumb Items
    const items = [
        { label: "الرئيسية", href: "/" },
        { label: "الدروس" }
    ];

    const lessons = [
        { id: 1, text: "الدرس الاول", color: "blue", image: <img src='lesson1.png' alt='lesson' className='w-4 h-8' /> },
        { id: 2, text: "الدرس الثاني", color: "yellow", image: <img src='lesson2.png' alt='lesson2' className='w-8 h-8' /> },
        { id: 3, text: "الدرس الثالث", color: "orange", image: <img src='lesson1.png' alt='lesson1' className='w-8 h-8' /> }
    ];

    const handleCardClick = (lesson) => {
        // Handle card click logic here
        console.log('Card clicked:', lesson);
        navigate('/lesson_details');
    };

    return (
        <>
            <Breadcrumb items={items}/>

            <BannerCard imageSrc="/stage1.png" imageAlt="Stage 1" />

            <div className="flex flex-col gap-4 px-6">
                <h2 className="text-2xl font-bold py-4">اختر الدرس</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mb-10">
                    {lessons && lessons.map((lesson) => (
                        <Card
                            key={lesson.id}
                            id={lesson.id}
                            number={lesson.image}
                            text={lesson.text}
                            color={lesson.color}
                            title={lesson.title}
                            onClick={() => handleCardClick(lesson)}
                            href="/lesson_details"
                        />
                    ))}
                </div>
            </div>

        </>
    );
}

export default Lessons;