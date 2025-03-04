import React, { useState, useRef, useEffect } from 'react';
import { format, addDays, isSameDay, startOfYear, differenceInDays } from 'date-fns';
import { ar } from 'date-fns/locale';

function WeeklyCalendar() {
    const today = new Date();
    const [selectedDate, setSelectedDate] = useState(today);
    const [currentMonth, setCurrentMonth] = useState(format(today, 'MMMM yyyy', { locale: ar }));
    const sliderRef = useRef(null);
    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);

    // Generate days from January 1st to December 31st
    const generateDays = () => {
        const start = startOfYear(today);
        return Array.from({ length: 365 }, (_, i) => addDays(start, i));
    };

    const days = generateDays();
    const dayNames = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];

    useEffect(() => {
        scrollToToday();
    }, []);

    // Scroll to today's date and select it
    const scrollToToday = () => {
        if (sliderRef.current) {
            const todayIndex = days.findIndex(day => isSameDay(day, today));
            if (todayIndex !== -1) {
                const todayElement = sliderRef.current.children[todayIndex];
                sliderRef.current.scrollTo({
                    left: todayElement.offsetLeft - sliderRef.current.offsetWidth / 2 + todayElement.offsetWidth / 2,
                    behavior: 'smooth'
                });

                // Set the current month when loading
                setCurrentMonth(format(days[todayIndex], 'MMMM yyyy', { locale: ar }));
            }
        }
    };

    // Handle dragging to scroll
    const handleMouseDown = (e) => {
        isDragging.current = true;
        startX.current = e.pageX - sliderRef.current.offsetLeft;
        scrollLeft.current = sliderRef.current.scrollLeft;
        sliderRef.current.style.cursor = 'grabbing';
    };

    const handleMouseMove = (e) => {
        if (!isDragging.current) return;
        e.preventDefault();
        const x = e.pageX - sliderRef.current.offsetLeft;
        const walk = (x - startX.current) * 2; // Adjust drag speed
        sliderRef.current.scrollLeft = scrollLeft.current - walk;
    };

    const handleMouseUp = () => {
        if (!isDragging.current) return;
        isDragging.current = false;
        sliderRef.current.style.cursor = 'grab';
    };

    // Detect the current month dynamically
    const updateCurrentMonth = () => {
        if (sliderRef.current) {
            const scrollPosition = sliderRef.current.scrollLeft;
            const containerWidth = sliderRef.current.clientWidth;
            const dayWidth = 80; // Approximate width of each day

            // Find the middle visible date
            const middleIndex = Math.round((scrollPosition + containerWidth / 2) / dayWidth);
            if (days[middleIndex]) {
                const newMonth = format(days[middleIndex], 'MMMM yyyy', { locale: ar });

                // Prevent unnecessary re-renders
                if (newMonth !== currentMonth) {
                    setCurrentMonth(newMonth);
                }
            }
        }
    };

    return (
        <div dir="rtl" className="p-4 w-full mx-auto">

            <div
                ref={sliderRef}
                className="flex overflow-x-auto gap-2 no-scrollbar select-none snap-x snap-mandatory scroll-smooth"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseUp}
                onMouseUp={handleMouseUp}
                onScroll={updateCurrentMonth} // Track scrolling to update month
            >
                {days.map((day, index) => {
                    const isSelected = isSameDay(day, selectedDate);
                    const isToday = isSameDay(day, today);

                    return (
                        <div
                            key={index}
                            className={`flex flex-col items-center rounded-md py-2 px-3 cursor-pointer transition-colors flex-none w-32 snap-center ${
                                isSelected
                                    ? 'bg-blue-500 text-white'
                                    : isToday
                                        ? 'bg-blue-100 text-black'
                                        : 'bg-gray-50 hover:bg-gray-100'
                            }`}
                            onClick={() => setSelectedDate(day)}
                        >
                            <span className="text-xs font-medium">{dayNames[day.getDay()]}</span>
                            <span className="text-lg font-bold mt-1">{format(day, 'd')}</span>
                        </div>
                    );
                })}
            </div>

            {/* Hide scrollbar */}
            <style>
                {`
                    .no-scrollbar::-webkit-scrollbar {
                        display: none;
                    }
                `}
            </style>
        </div>
    );
}

export default WeeklyCalendar;