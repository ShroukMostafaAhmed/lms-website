import React, { useState, useRef, useEffect } from 'react';
import { format, addDays, startOfWeek, addWeeks, subWeeks, isSameDay } from 'date-fns';
import { ar } from 'date-fns/locale';
import { ChevronRight, ChevronLeft } from 'lucide-react';

function WeeklyCalendar() {
    const today = new Date();
    const todayWeekStart = startOfWeek(today, { weekStartsOn: 6 });

    const [selectedDate, setSelectedDate] = useState(today);
    const [currentWeekStart, setCurrentWeekStart] = useState(todayWeekStart);
    const [isDragging, setIsDragging] = useState(false);

    const sliderRef = useRef(null);
    const startX = useRef(0);
    const scrollLeft = useRef(0);
    const lastDragTime = useRef(0);
    const dragVelocity = useRef(0);
    const animationFrameId = useRef(null);

    // Generate days for the current week
    const generateWeekDays = (date) => {
        const start = date;
        return Array.from({ length: 7 }, (_, i) => addDays(start, i));
    };

    // Generate weeks for the calendar slider
    const generateWeeks = () => {
        // Generate 52 weeks (approximately a year)
        return Array.from({ length: 52 }, (_, i) => {
            const weekStart = addWeeks(startOfWeek(today, { weekStartsOn: 6 }), i - 26);
            return generateWeekDays(weekStart);
        });
    };

    const weeks = generateWeeks();

    // Day names in Arabic
    const dayNames = {
        0: 'الأحد',
        1: 'الاثنين',
        2: 'الثلاثاء',
        3: 'الأربعاء',
        4: 'الخميس',
        5: 'الجمعة',
        6: 'السبت'
    };

    // Initialize the calendar to today's week
    useEffect(() => {
        findTodayWeek();

        return () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, []);

    // Navigate to previous week
    const goToPreviousWeek = () => {
        const newWeekStart = subWeeks(currentWeekStart, 1);
        setCurrentWeekStart(newWeekStart);

        // Scroll to the corresponding week
        scrollToWeek(newWeekStart);
    };

    // Navigate to next week
    const goToNextWeek = () => {
        const newWeekStart = addWeeks(currentWeekStart, 1);
        setCurrentWeekStart(newWeekStart);

        // Scroll to the corresponding week
        scrollToWeek(newWeekStart);
    };

    // Find the week that contains today
    const findTodayWeek = () => {
        setCurrentWeekStart(todayWeekStart);
        setSelectedDate(today);

        // Scroll to today's week
        scrollToWeek(todayWeekStart);
    };

    // Helper function to scroll to a specific week
    const scrollToWeek = (weekStart) => {
        if (sliderRef.current) {
            const weekIndex = weeks.findIndex(week =>
                isSameDay(week[0], weekStart)
            );

            if (weekIndex !== -1) {
                const weekElement = sliderRef.current.children[weekIndex];
                const scrollPosition = weekElement.offsetLeft;

                // Use smooth scrolling animation
                smoothScrollTo(scrollPosition);
            }
        }
    };

    // Smooth scroll animation
    const smoothScrollTo = (targetPosition) => {
        if (!sliderRef.current) return;

        const startPosition = sliderRef.current.scrollLeft;
        const distance = targetPosition - startPosition;
        const duration = 300; // ms
        let startTime = null;

        if (animationFrameId.current) {
            cancelAnimationFrame(animationFrameId.current);
        }

        const animation = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            const easeProgress = easeInOutCubic(progress);

            if (sliderRef.current) {
                sliderRef.current.scrollLeft = startPosition + distance * easeProgress;
            }

            if (timeElapsed < duration) {
                animationFrameId.current = requestAnimationFrame(animation);
            } else {
                updateCurrentWeekFromScroll();
            }
        };

        animationFrameId.current = requestAnimationFrame(animation);
    };

    // Easing function for smoother animation
    const easeInOutCubic = (t) => {
        return t < 0.5
            ? 4 * t * t * t
            : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    // Format month display
    const getMonthDisplay = () => {
        const firstDay = currentWeekStart;
        const lastDay = addDays(currentWeekStart, 6);

        if (format(firstDay, 'MMM', { locale: ar }) === format(lastDay, 'MMM', { locale: ar })) {
            return format(firstDay, 'MMMM yyyy', { locale: ar });
        } else {
            return `${format(firstDay, 'MMMM', { locale: ar })} - ${format(lastDay, 'MMMM yyyy', { locale: ar })}`;
        }
    };

    // Update current week based on scroll position
    const updateCurrentWeekFromScroll = () => {
        if (!sliderRef.current) return;

        const containerWidth = sliderRef.current.clientWidth;
        const scrollPosition = sliderRef.current.scrollLeft;
        const weekIndex = Math.round(scrollPosition / containerWidth);

        if (weeks[weekIndex]) {
            setCurrentWeekStart(weeks[weekIndex][0]);
        }
    };

    // Mouse down event handler for dragging
    const handleMouseDown = (e) => {
        if (!sliderRef.current) return;

        // Prevent default to avoid text selection during drag
        e.preventDefault();

        setIsDragging(true);
        startX.current = e.pageX;
        scrollLeft.current = sliderRef.current.scrollLeft;
        lastDragTime.current = Date.now();
        dragVelocity.current = 0;

        if (animationFrameId.current) {
            cancelAnimationFrame(animationFrameId.current);
        }

        sliderRef.current.style.cursor = 'grabbing';
        document.body.style.userSelect = 'none'; // Prevent text selection
    };

    // Mouse move event handler for dragging
    const handleMouseMove = (e) => {
        if (!isDragging || !sliderRef.current) return;

        const x = e.pageX;
        const dx = x - startX.current;
        const now = Date.now();
        const dt = now - lastDragTime.current;

        if (dt > 0) {
            // Calculate velocity (pixels per millisecond)
            dragVelocity.current = dx / dt;
        }

        sliderRef.current.scrollLeft = scrollLeft.current - dx;
        lastDragTime.current = now;
    };

    // Apply momentum scrolling
    const applyMomentum = () => {
        if (!sliderRef.current) return;

        // Apply deceleration
        dragVelocity.current *= 0.95;

        // Apply velocity to scroll position
        sliderRef.current.scrollLeft -= dragVelocity.current * 16; // 16ms is approx. one frame at 60fps

        // Continue animation if velocity is significant
        if (Math.abs(dragVelocity.current) > 0.01) {
            animationFrameId.current = requestAnimationFrame(applyMomentum);
        } else {
            // When momentum scrolling ends, snap to nearest week
            snapToNearestWeek();
        }
    };

    // Snap to nearest week after scrolling
    const snapToNearestWeek = () => {
        if (!sliderRef.current) return;

        const containerWidth = sliderRef.current.clientWidth;
        const scrollPosition = sliderRef.current.scrollLeft;
        const weekIndex = Math.round(scrollPosition / containerWidth);

        if (weeks[weekIndex]) {
            smoothScrollTo(weekIndex * containerWidth);
        }
    };

    // Mouse up event handler for dragging
    const handleMouseUp = () => {
        if (!isDragging) return;

        setIsDragging(false);

        if (sliderRef.current) {
            sliderRef.current.style.cursor = 'grab';
        }

        document.body.style.userSelect = '';

        // Apply momentum scrolling if velocity is significant
        if (Math.abs(dragVelocity.current) > 0.1) {
            animationFrameId.current = requestAnimationFrame(applyMomentum);
        } else {
            // If no significant momentum, just snap to nearest week
            snapToNearestWeek();
        }
    };

    // Touch event handlers for mobile
    const handleTouchStart = (e) => {
        if (!sliderRef.current) return;

        setIsDragging(true);
        startX.current = e.touches[0].pageX;
        scrollLeft.current = sliderRef.current.scrollLeft;
        lastDragTime.current = Date.now();
        dragVelocity.current = 0;

        if (animationFrameId.current) {
            cancelAnimationFrame(animationFrameId.current);
        }
    };

    const handleTouchMove = (e) => {
        if (!isDragging || !sliderRef.current) return;

        const x = e.touches[0].pageX;
        const dx = x - startX.current;
        const now = Date.now();
        const dt = now - lastDragTime.current;

        if (dt > 0) {
            dragVelocity.current = dx / dt;
        }

        sliderRef.current.scrollLeft = scrollLeft.current - dx;
        lastDragTime.current = now;

        // Prevent page scrolling while dragging the calendar
        e.preventDefault();
    };

    const handleTouchEnd = () => {
        handleMouseUp(); // Reuse the mouseUp logic
    };

    return (
        <div dir="rtl" className="p-4 w-full mx-auto">
            <div className="flex justify-between items-center mb-2">
                <button
                    onClick={goToPreviousWeek}
                    className="p-1 rounded hover:bg-gray-200"
                >
                    <ChevronRight size={20} />
                </button>

                <div className="flex items-center">
                    <h2 className="text-lg font-bold text-right">{getMonthDisplay()}</h2>
                    <button
                        onClick={findTodayWeek}
                        className="mr-2 px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        اليوم
                    </button>
                </div>

                <button
                    onClick={goToNextWeek}
                    className="p-1 rounded hover:bg-gray-200"
                >
                    <ChevronLeft size={20} />
                </button>
            </div>

            <div className="overflow-hidden">
                <div
                    ref={sliderRef}
                    className={`flex flex-nowrap overflow-x-hidden snap-x ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    {weeks.map((week, weekIndex) => (
                        <div
                            key={weekIndex}
                            className="flex-shrink-0 w-full snap-center"
                        >
                            <div className="flex flex-row-reverse justify-between gap-0.5">
                                {week.map((day, dayIndex) => {
                                    const dayNumber = format(day, 'd');
                                    const dayOfWeek = dayNames[day.getDay()];
                                    const isSelected = isSameDay(day, selectedDate);
                                    const isToday = isSameDay(day, today);

                                    return (
                                        <div
                                            key={dayIndex}
                                            className={`flex flex-col items-center rounded-md py-2 px-1 cursor-pointer transition-colors flex-1 h-16 ${
                                                isSelected
                                                    ? 'bg-blue-500 text-white'
                                                    : isToday
                                                        ? 'bg-blue-100 hover:bg-blue-200'
                                                        : 'bg-gray-50 hover:bg-gray-100'
                                            }`}
                                            onClick={() => setSelectedDate(day)}
                                        >
                                            <span className="text-xs font-medium">{dayOfWeek}</span>
                                            <span className="text-base font-bold mt-1">{dayNumber}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default WeeklyCalendar;