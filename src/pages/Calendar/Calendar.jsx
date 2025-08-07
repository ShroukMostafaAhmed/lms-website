import React, { useEffect } from 'react';
import BannerCard from "../../components/Cards/BannerCard.jsx";
import CalendarComponent from "../../components/Calendar/CalendarComponent.jsx";
import useGetCalendar from "../../hooks/useCalender/useGetCalendar.js";

function Calendar() {
    const { fetchCalendarData, calendarData, isLoading, error } = useGetCalendar();

    useEffect(() => {
        fetchCalendarData();
    }, []);

    return (
        <div className="w-full px-4 sm:px-6 md:px-12 lg:px-20 xl:px-35 py-4 font-bold mx-auto my-0" dir="rtl">
            <BannerCard 
                imageSrc="/OnlineLearningCourseLandscapeBanner.png" 
                imageAlt="Online Learning Course Landscape Banner" 
            />

            {isLoading ? (
                <p className="text-center text-gray-500 mt-4">جاري تحميل البيانات...</p>
            ) : error ? (
                <p className="text-center text-red-500 mt-4">حدث خطأ: {error.message}</p>
            ) : (
                <CalendarComponent events={calendarData} />
            )}
        </div>
    );
}

export default Calendar;