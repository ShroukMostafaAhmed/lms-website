import React from 'react';
import BannerCard from "../../components/Cards/BannerCard.jsx";
import CalendarComponent from "../../components/Calendar/CalendarComponent.jsx";

function Calendar() {

    return (
        <div className="max-w-7xl px-2 py-4 font-bold">
            <BannerCard imageSrc="/OnlineLearningCourseLandscapeBanner.png" imageAlt="Online Learning Course Landscape Banner" />

            <CalendarComponent/>
        </div>
    );
}

export default Calendar;