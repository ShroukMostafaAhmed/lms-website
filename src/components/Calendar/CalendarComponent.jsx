import React, { useState, useEffect } from 'react';
import Swal from "sweetalert2";
import './Calendar.css';

function CalendarComponent() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [events, setEvents] = useState([]);
    const [selectedDay, setSelectedDay] = useState(null); // Track the selected day
    const [showDatePicker, setShowDatePicker] = useState(false);

    const daysOfWeek = ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];
    const months = [
        "يناير", "فبراير", "مارس", "إبريل", "مايو", "يونيو",
        "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
    ];

    // Sample events data - in a real app, this would come from an API
    const eventsByMonth = {
        // January events
        0: [
            { day: 10, color: "bg-green-500" },
            { day: 22, color: "bg-purple-500" }
        ],
        // February events
        1: [
            { day: 5, color: "bg-indigo-500" },
            { day: 14, color: "bg-pink-500" }
        ],
        // March events - matches the original design
        2: [
            { day: 15, color: "bg-red-500" },
            { day: 24, color: "bg-yellow-400" }
        ],
        // December events
        11: [
            { day: 15, color: "bg-orange-500" },
            { day: 24, color: "bg-yellow-400" }
        ]
    };

    useEffect(() => {
        // Update events when month changes
        const month = currentDate.getMonth();
        setEvents(eventsByMonth[month] || []);
    }, [currentDate]);

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
    };

    const handleMonthYearChange = (month, year) => {
        setCurrentDate(new Date(year, month, 1));
        setShowDatePicker(false);
    };

    const getDaysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (year, month) => {
        // Get first day and adjust for Arabic calendar (where week starts on Sunday)
        const firstDay = new Date(year, month, 1).getDay();
        return firstDay; // Sunday is already 0 in JavaScript
    };

    const handleAddEvent = () => {
        Swal.fire({
            title: 'اضافة موعد',
            color: '#4a90e2',
            html: `
            <div style="display: flex; flex-direction: column; width: 100%; min-height: 200px; gap: 30px; align-items: flex-start; direction: rtl;">
                <div style="display: flex; width: 100%; gap: 10px;">
                    <select id="select-day" class="swal-select">
                        <option value="" disabled selected>اختر اليوم</option>
                        ${[...Array(31).keys()].map(i => `<option value="${i + 1}">${i + 1}</option>`).join('')}
                    </select>
                    <select id="select-month" class="swal-select">
                        <option value="" disabled selected>اختر الشهر</option>
                        ${[
                'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
                'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
            ].map((month, i) => `<option value="${i + 1}">${month}</option>`).join('')}
                    </select>
                    <select id="select-year" class="swal-select">
                        <option value="" disabled selected>اختر السنة</option>
                        ${[...Array(10).keys()].map(i => {
                const year = new Date().getFullYear() + i;
                return `<option value="${year}">${year}</option>`;
            }).join('')}
                    </select>
                </div>
                <select id="task-select" class="swal-select">
                    <option value="" disabled selected>اختر المهمة</option>
                    <option value="task1">مهمة 1</option>
                    <option value="task2">مهمة 2</option>
                </select>
                <div style="display: flex; gap: 15px; justify-content: flex-start;">
                    <div class="color-option" data-color="blue" style="background-color: blue;"></div>
                    <div class="color-option" data-color="yellow" style="background-color: yellow;"></div>
                    <div class="color-option" data-color="red" style="background-color: red;"></div>
                </div>
            </div>
        `,
            showCancelButton: true,
            confirmButtonText: 'تأكيد',
            cancelButtonText: 'إلغاء',
            didOpen: () => {
                document.querySelectorAll('.color-option').forEach(option => {
                    option.addEventListener('click', (e) => {
                        document.querySelectorAll('.color-option').forEach(opt => opt.classList.remove('selected'));
                        e.target.classList.add('selected');
                    });
                });
            },
            preConfirm: () => {
                const day = document.getElementById('select-day').value;
                const month = document.getElementById('select-month').value;
                const year = document.getElementById('select-year').value;
                const task = document.getElementById('task-select').value;
                const color = document.querySelector('.color-option.selected')?.getAttribute('data-color');

                if (!day || !month || !year || !task || !color) {
                    Swal.showValidationMessage('جميع الحقول مطلوبة');
                }

                return { day, month, year, task, color };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                console.log(result.value);
                // Handle the confirmed event data here
                Swal.fire({
                    icon: 'success',
                    title: 'تمت الاضافة بنجاح',
                    showConfirmButton: false,
                    timer: 2500
                })
            }
        });
    };

    const renderCalendarGrid = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const daysInMonth = getDaysInMonth(year, month);
        const firstDayOfMonth = getFirstDayOfMonth(year, month);

        // Get today's date for highlighting
        const today = new Date();
        const isCurrentMonth = today.getMonth() === month && today.getFullYear() === year;
        const todayDate = today.getDate();

        // Create week rows
        const weeks = [];
        let dayCounter = 1;

        // Create 6 rows to accommodate all possible month layouts
        for (let weekIndex = 0; weekIndex < 6; weekIndex++) {
            const days = [];

            // Create 7 days per week
            for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
                if ((weekIndex === 0 && dayIndex < firstDayOfMonth) || dayCounter > daysInMonth) {
                    // Empty cell before first day or after last day of month
                    days.push(
                        <div key={`empty-${weekIndex}-${dayIndex}`} className="border-r border-t min-h-16 p-2 border-gray-100">
                            &nbsp;
                        </div>
                    );
                } else {
                    // Valid day of the month
                    const currentDay = dayCounter;
                    const event = events.find(e => e.day === currentDay);
                    const hasEvent = !!event;

                    // Fix: Check if it's today based on current month/year and day
                    const isToday = isCurrentMonth && todayDate === currentDay;
                    const isSelected = selectedDay === currentDay;

                    days.push(
                        <div
                            key={`day-${dayCounter}`}
                            className={`border-r border-t border-gray-100 min-h-24 p-2 relative ${
                                isSelected ? 'bg-blue-500 text-white' :
                                    isToday ? 'bg-blue-200' : ''
                            }`}
                            onClick={() => setSelectedDay(currentDay)} // Set selected day on click
                        >
                            <div className="font-medium md:font-bold text-center">
                                {currentDay}
                            </div>
                            {hasEvent && (
                                <div
                                    className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 ${event.color} rounded-full`}>
                                </div>
                            )}
                        </div>
                    );
                    dayCounter++;
                }
            }

            // Add the week row to our weeks array
            weeks.push(
                <div key={`week-${weekIndex}`} className="grid grid-cols-7">
                    {days}
                </div>
            );

            // If we've rendered all days, stop creating more rows
            if (dayCounter > daysInMonth) {
                break;
            }
        }

        return weeks;
    };

    // Get text representation of current month and year
    const currentMonthText = `${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`;

    // Generate year options for the date picker
    const currentYear = new Date().getFullYear();
    const yearOptions = [];
    for (let i = currentYear - 5; i <= currentYear + 5; i++) {
        yearOptions.push(i);
    }

    return (
        <div className="px-2">
            <div dir="ltr" className="mt-6 flex justify-between gap-2 items-center">
                <div className="flex items-center space-x-reverse gap-2 lg:gap-4">
                    <button
                        onClick={handleNextMonth}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 cursor-pointer hover:bg-gray-200"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                    </button>
                    <button
                        onClick={handlePrevMonth}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-500 cursor-pointer hover:bg-blue-200"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                    </button>
                    <div className="flex items-center space-x-reverse space-x-1">
                        <button
                            onClick={handleAddEvent}
                            className="flex items-center bg-blue-500 text-white rounded-md px-4 py-1 text-sm cursor-pointer"
                        >
                            <span className="ml-1 hidden md:block">اضافة موعد</span>
                            <span className="block md:hidden">+</span>
                        </button>
                    </div>
                </div>

                {/* Month/Year Selector */}
                <div className="flex items-center relative">
                    <div
                        className="text-sm cursor-pointer p-2 md:p-3 border border-blue-300 rounded-xl text-blue-500 flex items-center gap-2 md:gap-5"
                        onClick={() => setShowDatePicker(!showDatePicker)}
                    >
                        <span className="ml-1 hidden md:block">▼</span>
                        {currentMonthText}
                    </div>

                    {/* Date picker dropdown */}
                    {showDatePicker && (
                        <div dir="rtl" className="absolute top-full mt-1 right-0 bg-white shadow-lg rounded-md p-3 z-10 min-w-48">
                            <div className="mb-2">
                                <select
                                    className="w-full p-2 border rounded-md mb-2"
                                    value={currentDate.getFullYear()}
                                    onChange={(e) => handleMonthYearChange(currentDate.getMonth(), parseInt(e.target.value))}
                                >
                                    {yearOptions.map(year => (
                                        <option key={year} value={year}>{year}</option>
                                    ))}
                                </select>

                                <div className="grid grid-cols-3 gap-2">
                                    {months.map((month, index) => (
                                        <button
                                            key={month}
                                            className={`p-2 rounded-md text-center text-sm ${
                                                currentDate.getMonth() === index
                                                    ? 'bg-blue-500 text-white'
                                                    : 'bg-gray-100 hover:bg-gray-200'
                                            }`}
                                            onClick={() => handleMonthYearChange(index, currentDate.getFullYear())}
                                        >
                                            {month}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-4 bg-white rounded-md overflow-hidden shadow-sm">
                {/* Days of week header */}
                <div className="grid grid-cols-7 text-center border-b border-gray-100">
                    {daysOfWeek.map((day, index) => (
                        <div key={`header-${index}`} className="py-3 text-gray-800 font-medium md:font-bold text-xs md:text-sm">
                            {day}
                        </div>
                    ))}
                </div>

                {/* Calendar Grid */}
                <div className="border-l border-gray-100">
                    {renderCalendarGrid()}
                </div>
            </div>

            {/* Appointment Cards - dynamic based on current month's events */}
            {events.length > 0 && (
                <div className="mt-6 space-y-4">
                    {events.map((event, index) => (
                        <div key={`event-${index}`} className="bg-blue-50 rounded-lg p-3 flex justify-between items-center">
                            <div className="text-gray-800 text-sm font-bold">اختر زياراتك</div>
                            <div className={`${event.color.replace('bg-', 'bg-')} text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold`}>
                                {event.day}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default CalendarComponent;