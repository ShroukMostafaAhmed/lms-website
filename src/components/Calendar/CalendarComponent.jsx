import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import './Calendar.css';

const CalendarComponent = ({ eventsByMonth, onEventAdded }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [events, setEvents] = useState([]);
    const [selectedDay, setSelectedDay] = useState(null);

    const daysOfWeek = ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];
    const months = [
        "يناير", "فبراير", "مارس", "إبريل", "مايو", "يونيو",
        "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
    ];

    useEffect(() => {
        const month = currentDate.getMonth();
        setEvents(eventsByMonth[month] || []);
    }, [currentDate, eventsByMonth]);

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
    };

    const getDaysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (year, month) => {
        return new Date(year, month, 1).getDay();
    };

    const handleAddEvent = () => {
        Swal.fire({
            title: 'اضافة موعد',
            html: `
                <div style="display: flex; flex-direction: column; gap: 20px; direction: rtl;">
                    <div style="display: flex; gap: 10px;">
                        <select id="select-day" class="swal-select">
                            <option value="" disabled selected>اختر اليوم</option>
                            ${[...Array(31).keys()].map(i => `<option value="${i + 1}">${i + 1}</option>`).join('')}
                        </select>
                        <select id="select-month" class="swal-select">
                            <option value="" disabled selected>اختر الشهر</option>
                            ${months.map((month, i) => `<option value="${i + 1}">${month}</option>`).join('')}
                        </select>
                    </div>
                    <select id="task-select" class="swal-select">
                        <option value="" disabled selected>اختر المهمة</option>
                        <option value="task1">مهمة 1</option>
                        <option value="task2">مهمة 2</option>
                    </select>
                </div>
            `,
            showCancelButton: true,
            confirmButtonText: 'تأكيد',
            cancelButtonText: 'إلغاء',
            preConfirm: () => {
                const day = document.getElementById('select-day').value;
                const month = document.getElementById('select-month').value;
                const task = document.getElementById('task-select').value;

                if (!day || !month || !task) {
                    Swal.showValidationMessage('جميع الحقول مطلوبة');
                }

                return { day, month, task };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                onEventAdded(result.value);
            }
        });
    };

    const renderCalendarGrid = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const daysInMonth = getDaysInMonth(year, month);
        const firstDayOfMonth = getFirstDayOfMonth(year, month);

        const weeks = [];
        let dayCounter = 1;

        for (let weekIndex = 0; weekIndex < 6; weekIndex++) {
            const days = [];

            for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
                if ((weekIndex === 0 && dayIndex < firstDayOfMonth) || dayCounter > daysInMonth) {
                    days.push(
                        <div key={`empty-${weekIndex}-${dayIndex}`} className="border border-gray-200 min-h-16">
                            &nbsp;
                        </div>
                    );
                } else {
                    const event = events.find(e => e.day === dayCounter);
                    const isSelected = selectedDay === dayCounter;
                    const isToday =
                        currentDate.getFullYear() === year &&
                        currentDate.getMonth() === month &&
                        currentDate.getDate() === dayCounter;

                    days.push(
                        <div
                            key={`day-${dayCounter}`}
                            className={`border border-gray-200 min-h-16 p-2 relative ${
                                isSelected ? 'bg-blue-500 text-white' :
                                    isToday ? 'bg-blue-200' : ''
                            }`}
                            onClick={() => setSelectedDay(dayCounter)}
                        >
                            {dayCounter}
                            {event && (
                                <div
                                    className={`w-5 h-5 ${event.color} rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
                                ></div>
                            )}
                        </div>
                    );
                    dayCounter++;
                }
            }

            weeks.push(
                <div key={`week-${weekIndex}`} className="grid grid-cols-7">
                    {days}
                </div>
            );

            if (dayCounter > daysInMonth) break;
        }

        return weeks;
    };

    return (
        <div>
            <div className="flex justify-between items-center">
                <button onClick={handlePrevMonth}>&lt;</button>
                <div>
                    {months[currentDate.getMonth()]} {currentDate.getFullYear()}
                </div>
                <button onClick={handleNextMonth}>&gt;</button>
            </div>

            <div className="grid grid-cols-7">
                {daysOfWeek.map((day, index) => (
                    <div key={index} className="border p-2 text-center">
                        {day}
                    </div>
                ))}
            </div>

            {renderCalendarGrid()}

            <button onClick={handleAddEvent} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                اضافة موعد
            </button>
        </div>
    );
};

export default CalendarComponent;
