import React from 'react';
import BannerCard from "../../components/Cards/BannerCard.jsx";
import LessonsSlider from "../../components/Slider/LessonSlider.jsx";

function Downloads() {
    const lessons = [
        { id: 1, title: 'الوحدة الثانية', description: 'شرح الباب الاول', duration: '25 دقيقة', completed: false, image: "/lessonImg.png" },
        { id: 2, title: 'الوحدة الثانية', description: 'شرح الباب الاول', duration: '25 دقيقة', completed: true, image: "/lessonImg.png" },
        { id: 3, title: 'الوحدة الثانية', description: 'شرح الباب الاول', duration: '25 دقيقة', completed: true, image: "/lessonImg.png" },
        { id: 4, title: 'الوحدة الثانية', description: 'شرح الباب الاول', duration: '25 دقيقة', completed: false, image: "/lessonImg.png" },
        { id: 5, title: 'الوحدة الثانية', description: 'شرح الباب الاول', duration: '25 دقيقة', completed: false, image: "/lessonImg.png" },
        { id: 6, title: 'الوحدة الثانية', description: 'شرح الباب الاول', duration: '25 دقيقة', completed: false, image: "/lessonImg.png" },
    ];

    return (
        <div className="flex flex-col w-full">
            {/* Banner container with fixed styling */}
            <div className="w-full pl-12 sm:pl-12 md:pl-8 lg:pl-6 max-w-2xl md:max-w-4xl xl:max-w-7xl">
                <BannerCard
                    imageSrc="/OnlineLearningCourseLandscapeBanner1.png"
                    imageAlt="Online Learning Course Landscape Banner 1"
                />
            </div>

            {/* Slider container with separate styling */}
            <div className="w-full">
                <LessonsSlider lessons={lessons}/>
            </div>
        </div>
    );
}

export default Downloads;