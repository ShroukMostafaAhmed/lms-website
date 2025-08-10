import React, { useState, useRef, useEffect } from 'react';
import { format, addDays, isSameDay, startOfYear, parseISO } from 'date-fns';
import { ar } from 'date-fns/locale';
import Swal from 'sweetalert2';

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

  // Returns an array of event colors for the given day
  const getEventColors = (day) => {
    return calendarData
      .filter(event => isSameDay(parseISO(event.date), day) && event.color)
      .map(event => event.color);
  };

  useEffect(() => {
    scrollToToday();
  }, []);

  const scrollToToday = () => {
    if (sliderRef.current) {
      const todayIndex = days.findIndex(day => isSameDay(day, today));
      if (todayIndex !== -1) {
        const todayElement = sliderRef.current.children[todayIndex + 1]; 
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
// Show events popup for a specific day
const showEventsPopup = (day) => {
  const events = calendarData.filter(event => isSameDay(parseISO(event.date), day));
  Swal.fire({
    title: `الأحداث ليوم ${format(day, 'd MMMM yyyy', { locale: ar })}`,
    html: `
      <div style="direction: rtl; text-align: right; font-size: 18px; padding: 10px 0; margin-top: 15px;">
        ${events.map(e => {
          const parsedDate = parseISO(e.date);
          const time = format(parsedDate, 'hh:mm a', { locale: ar });

          return `
            <div style="
              margin-bottom: 5px;
              padding: 25px;
              border: 1px solid #e5e7eb;
              border-radius: 8px;
              background: #f9f9f9;
            ">
              <div style="display: flex; align-items: center; margin-bottom: 6px;">
                <span style="
                  display: inline-block;
                  width: 10px;
                  height: 10px;
                  border-radius: 50%;
                  background: ${e.color};
                  margin-left: 10px;
                "></span>
                <strong>الوقت:</strong> ${time}
              </div>
              <div>
                <strong>ملاحظة:</strong> ${e.notes && e.notes.trim() !== '' ? e.notes : '<span style="color:#888">لا توجد ملاحظات</span>'}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `,
    confirmButtonText: 'حسنًا',
    customClass: {
      popup: 'custom-swal-popup',
      title: 'custom-swal-title',
      confirmButton: 'custom-swal-confirm',
    },
    buttonsStyling: false,
    didRender: () => {
      // ✅ زر التأكيد (حسنًا)
      const confirmBtn = document.querySelector('.custom-swal-confirm');
      if (confirmBtn) {
        confirmBtn.style.backgroundColor = '#2563EB';
        confirmBtn.style.color = '#fff';
        confirmBtn.style.padding = '10px 20px';
        confirmBtn.style.fontSize = '18px';
        confirmBtn.style.borderRadius = '8px';
        confirmBtn.style.border = '1px';
        confirmBtn.style.marginTop = '20px';
        confirmBtn.style.marginBottom = '40px';
        confirmBtn.style.cursor = 'pointer';
        confirmBtn.style.width = '200px';
        confirmBtn.style.transition = 'background-color 0.2s ease';
        confirmBtn.onmouseover = () => confirmBtn.style.backgroundColor = '#1d4ed8';
        confirmBtn.onmouseout = () => confirmBtn.style.backgroundColor = '#2563EB';
      }

      // ✅ تصميم النافذة نفسها
      const popup = document.querySelector('.custom-swal-popup');
      if (popup) {
        popup.style.width = '600px';
        popup.style.padding = '15px';
        popup.style.borderRadius = '20px';
        
      }

      // ✅ تنسيق العنوان
      const title = document.querySelector('.custom-swal-title');
      if (title) {
        title.style.marginBottom = '18px';
        title.style.fontSize = '24px';
      }
    }
  });
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
              onClick={() => {
                setSelectedDate(day);
                showEventsPopup(day);
              }}
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
