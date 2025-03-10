import React from 'react';
import Card from "../../components/Cards/Card.jsx";

const data = [
    { day: 'الأحد', value: 34, color: 'bg-blue-500' },
    { day: 'الإثنين', value: 45, color: 'bg-blue-500' },
    { day: 'الثلاثاء', value: 40, color: 'bg-blue-500' },
    { day: 'الأربعاء', value: 10, color: 'bg-orange-500' },
    { day: 'الخميس', value: 37, color: 'bg-blue-500' },
    { day: 'الجمعة', value: 39, color: 'bg-blue-500' },
    { day: 'السبت', value: 50, color: 'bg-blue-500' },
];

const lessons =[
    { id: 1, title: "30", href: "#" , color: "blue", image: <img src='book.png' alt='litter' className='w-8 h-8' />, text: "30" , desc: "الدروس الكلية"},
    { id: 2, title: "10", href: "#" , color: "yellow", image: <img src='download.png' alt='litter' className='w-8 h-8' />, text: "20", desc: "الدروس المحملة"},
    { id: 3, title: "20", href: "#" , color: "red", image: <img src='clock2.png' alt='litter' className='w-8 h-8' />, text: "10", desc: "زمن الدراسة"},
]

const Profile = () => {
    const maxValue = Math.max(...data.map((d) => d.value));

    const handleCardClick = (lesson) => {
        console.log('Card clicked:', lesson);
    };

    return (
        <>
            <div className="flex flex-col items-center my-8">
                <div className="flex flex-col items-center">
                    <img src="/profile-icon.png" alt="Profile" className="w-20 h-20"/>
                    <h2 className="text-xl font-bold mt-4">احمد السعيد</h2>
                    <p className="text-gray-600 mt-2">الصف الأول الثانوي</p>
                </div>
            </div>
            <div className="flex flex-col gap-4 px-6">
                <div className="flex flex-row justify-start items-center gap-6">
                    <h2 className="text-3xl font-bold py-4">الدروس</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mb-10">
                    {lessons.map((lesson) => (
                        <Card
                            key={lesson.id}
                            href={"/lessons"}
                            color={lesson.color}
                            text={lesson.text}
                            number={lesson.image}
                            onClick={() => handleCardClick(lesson)}
                            desc={lesson.desc}
                        />
                    ))}
                </div>
            </div>

            <div className="px-6">
                <h2 className="text-3xl font-bold py-4"> التقويم اليومى</h2>
                <img src="/commingsoon.jpeg" alt="comming soon" className="w-full"/>
            </div>
        </>
    );
};

export default Profile;
