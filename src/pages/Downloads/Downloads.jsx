import React from 'react';
import BannerCard from "../../components/Cards/BannerCard.jsx";
import LessonsSlider from "../../components/Slider/LessonSlider.jsx";

function Downloads() {
    // lessons fake data
    const lessons = [
        { id: 1, title: 'الوحدة الثانية', description: 'شرح الباب الاول', duration: '25 دقيقة', completed: false, image: "/lessonImg.png" },
        { id: 2, title: 'الوحدة الثانية', description: 'شرح الباب الاول', duration: '25 دقيقة', completed: true, image: "/lessonImg.png" },
        { id: 3, title: 'الوحدة الثانية', description: 'شرح الباب الاول', duration: '25 دقيقة', completed: true , image: "/lessonImg.png"},
        { id: 4, title: 'الوحدة الثانية', description: 'شرح الباب الاول', duration: '25 دقيقة', completed: false , image: "/lessonImg.png"},
        { id: 5, title: 'الوحدة الثانية', description: 'شرح الباب الاول', duration: '25 دقيقة', completed: false , image: "/lessonImg.png"},
        { id: 6, title: 'الوحدة الثانية', description: 'شرح الباب الاول', duration: '25 دقيقة', completed: false , image: "/lessonImg.png"},
    ];

    return (
        <>
            <BannerCard
                imageSrc="/OnlineLearningCourseLandscapeBanner1.png"
                imageAlt="Online Learning Course Landscape Banner 1"
            />

            <LessonsSlider lessons={lessons}/>
        </>
    );
}

export default Downloads;