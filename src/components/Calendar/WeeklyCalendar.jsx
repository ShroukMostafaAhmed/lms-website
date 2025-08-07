import React, { useState, useRef, useEffect } from 'react';
import { format, addDays, isSameDay, startOfYear, parseISO } from 'date-fns';
import { ar } from 'date-fns/locale';

function WeeklyCalendar({ calendarData = [] }) {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);
  const [currentMonth, setCurrentMonth] = useState(format(today, 'MMMM yyyy', { locale: ar }));
  const sliderRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const generateDays = () => {
    const start = startOfYear(today);
    return Array.from({ length: 365 }, (_, i) => addDays(start, i));
  };

  const days = generateDays();
  const dayNames = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];

  useEffect(() => {
    scrollToToday();
  }, []);

  const scrollToToday = () => {
    if (sliderRef.current) {
      const todayIndex = days.findIndex(day => isSameDay(day, today));
      if (todayIndex !== -1) {
        const todayElement = sliderRef.current.children[todayIndex + 1]; // +1 لو في عنصر وهمي
        if (todayElement) {
          sliderRef.current.scrollTo({
            left: todayElement.offsetLeft - sliderRef.current.offsetWidth / 2 + todayElement.offsetWidth / 2,
            behavior: 'smooth'
          });
          setCurrentMonth(format(days[todayIndex], 'MMMM yyyy', { locale: ar }));
        }
      }
    }
  };

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
    const walk = (x - startX.current) * 2;
    sliderRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleMouseUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    sliderRef.current.style.cursor = 'grab';
  };

  const updateCurrentMonth = () => {
    if (sliderRef.current) {
      const scrollPosition = sliderRef.current.scrollLeft;
      const containerWidth = sliderRef.current.clientWidth;
      const dayWidth = 128;
      const middleIndex = Math.round((scrollPosition + containerWidth / 2) / dayWidth);
      if (days[middleIndex]) {
        const newMonth = format(days[middleIndex], 'MMMM yyyy', { locale: ar });
        if (newMonth !== currentMonth) {
          setCurrentMonth(newMonth);
        }
      }
    }
  };

  const getEventColors = (date) => {
    return calendarData
      .filter((e) => isSameDay(parseISO(e.date), date))
      .map((e) => e.color);
  };

  return (
    <div dir="rtl" className="pt-4">
      <div
        ref={sliderRef}
        className="flex overflow-x-auto gap-4 no-scrollbar select-none snap-x snap-mandatory scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseUp}
        onMouseUp={handleMouseUp}
        onScroll={updateCurrentMonth}
      >
        {days.map((day, index) => {
          const isSelected = isSameDay(day, selectedDate);
          const isToday = isSameDay(day, today);
          const eventColors = getEventColors(day);

          return (
            <div
              key={index}
              className={`flex flex-col items-center justify-between rounded-xl border py-3 px-4 cursor-pointer transition-colors flex-none w-30 snap-center shadow-sm ${
                isSelected
                  ? 'bg-blue-500 text-white border-blue-500'
                  : isToday
                  ? 'bg-blue-100 text-black border-blue-100'
                  : 'bg-white hover:bg-gray-100 border-gray-300'
              }`}
              onClick={() => setSelectedDate(day)}
            >
              <span className="text-xs font-semibold">{dayNames[day.getDay()]}</span>
              <span className="text-xl font-bold mt-1">{format(day, 'd')}</span>

              {/* نقاط الأحداث */}
              <div className="flex flex-wrap justify-center items-center gap-1 mt-2 h-3">
                {eventColors.slice(0, 5).map((color, i) => (
                  <span
                    key={i}
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: color }}
                  ></span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default WeeklyCalendar;
