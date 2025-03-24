import React from 'react';
import Slider from "../../components/Slider/Slider.jsx";
import StageCard from "../../components/Cards/StageCard.jsx";
import WeeklyCalendar from "../../components/Calendar/WeeklyCalendar.jsx";
import VideoCard from "../../components/Cards/VideoCard.jsx";

function Home() {
    // fake data for banner slider
    const products = [
        { id: 1, image: "/lms banners/b1.png", title: "منتج 1" },
        { id: 2, image: "/lms banners/b2.png", title: "منتج 2" },
        { id: 3, image: "/lms banners/b3.png", title: "منتج 3" },
        { id: 4, image: "/lms banners/b4.png", title: "منتج 4" },
        { id: 5, image: "/lms banners/b5.png", title: "منتج 5" },
    ];

    const stages = [
        { id: 1, image: "http://adros.runasp.net/Images/Banners/bbbde40b-f6b6-442e-95d5-153a418025c4.png", title: "منتج 1" },
        { id: 2, image: "http://adros.runasp.net/Images/Banners/275bd26d-681e-4858-ba1d-06415380f748.png", title: "منتج 2" },
        { id: 3, image: "http://adros.runasp.net/Images/Banners/defc234e-b93d-4220-9401-a517a4538eb5.png", title: "منتج 3" },
    ]

    const videos = [
        { id: 1, img: "/video1.jpg", title: "Video 1", desc: "Description for Video 1", href: "skill_details" },
        { id: 2, img: "/video2.jpg", title: "Video 2", desc: "Description for Video 2", href: "skill_details" },
        { id: 3, img: "/video3.jpg", title: "Video 3" , desc: "Description for Video 3", href: "skill_details" },
    ]

    return (
        <div dir="rtl" className="w-full">
            <div className="my-6">
                <Slider products={products}/>
            </div>

            <div className="my-6 space-y-4">
                <h2 className="text-2xl font-bold text-black px-4">
                    المراحل التعليمية
                </h2>
                <div className="flex flex-wrap items-center mt-6 gap-4 mx-4 ">
                    {stages.map((stage) => (
                        <div key={stage.id}>
                            <StageCard stage={stage} />
                        </div>
                    ))}
                </div>
                <div dir="rtl">
                    <h2 className="text-2xl font-bold text-black px-4">
                        التقويم الأسبوعي
                    </h2>
                    <WeeklyCalendar/>
                </div>
                <div dir="rtl">
                    <h2 className="text-2xl font-bold text-black px-4">
                        المهارات المتنوعة
                    </h2>
                    <div className="flex flex-wrap gap-6 mt-6 mx-4 max-w-5xl">
                        {videos && videos.map((video) => (
                            <VideoCard key={video.id} video={video} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;