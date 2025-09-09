import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "./Calendar.css";
import useGetCalendar from "../../hooks/useCalender/useGetCalendar.js";
import useCreateEvent from "../../hooks/useCalender/useCreateEvent.jsx";

function CalendarComponent() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const daysOfWeek = [
    "الأحد",
    "الاثنين",
    "الثلاثاء",
    "الأربعاء",
    "الخميس",
    "الجمعة",
    "السبت",
  ];
  const months = [
    "يناير",
    "فبراير",
    "مارس",
    "إبريل",
    "مايو",
    "يونيو",
    "يوليو",
    "أغسطس",
    "سبتمبر",
    "أكتوبر",
    "نوفمبر",
    "ديسمبر",
  ];

  const { fetchCalendarData, calendarData, isLoading, error } =
    useGetCalendar();
  const {
    createEvent,
    isLoading: isCreatingEvent,
    error: createError,
  } = useCreateEvent();

  // Color mapping function to ensure consistent color classes
  const normalizeColor = (color) => {
    if (!color) return "bg-blue-500";

    // If it's already a Tailwind class, return as is
    if (color.startsWith("bg-")) return color;

    // Map simple color names to Tailwind classes
    const colorMap = {
      green: "bg-green-500",
      yellow: "bg-yellow-400",
      red: "bg-red-500",
      blue: "bg-blue-500",
      purple: "bg-purple-500",
      indigo: "bg-indigo-500",
      pink: "bg-pink-500",
      orange: "bg-orange-500",
    };

    return colorMap[color.toLowerCase()] || "bg-blue-500";
  };

  // Fetch calendar data when component mounts or current date changes
  useEffect(() => {
    fetchCalendarData();
  }, []);

  // Process calendar data whenever it changes or current date changes
  useEffect(() => {
    if (calendarData && Array.isArray(calendarData)) {
      console.log("Calendar data received:", calendarData);

      // Filter events for current month and year
      const filtered = calendarData.filter((event) => {
        if (!event.date) return false;

        try {
          // Parse the ISO date string
          const eventDate = new Date(event.date);

          // Check if the date is valid
          if (isNaN(eventDate.getTime())) return false;

          return (
            eventDate.getMonth() === currentDate.getMonth() &&
            eventDate.getFullYear() === currentDate.getFullYear()
          );
        } catch (e) {
          console.error("Error parsing event date:", event.date, e);
          return false;
        }
      });

      // Normalize the event data structure based on API response
      const normalizedEvents = filtered.map((event) => {
        const eventDate = new Date(event.date);
        return {
          day: eventDate.getDate(),
          color: normalizeColor(event.color),
          notes: event.notes || "لا توجد ملاحظات",
          id: event.id,
        };
      });

      console.log(
        `Filtered ${normalizedEvents.length} events for ${
          months[currentDate.getMonth()]
        } ${currentDate.getFullYear()}`
      );
      setEvents(normalizedEvents);
    }
  }, [calendarData, currentDate]);

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  const handleMonthYearChange = (month, year) => {
    setCurrentDate(new Date(year, month, 1));
    setShowDatePicker(false);
  };

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const handleAddEvent = () => {
    Swal.fire({
      title: "اضافة موعد",
      color: "#000",
      customClass: {
        popup: "swal-wide-popup",
        confirmButton: "swal-confirm-button",
        cancelButton: "swal-cancel-button",
      },
      reverseButtons: true,
      confirmButtonColor: "#1d4ed8",
      html: `
            <div style="display: flex; flex-direction: column; gap: 25px; width: 100%; direction: rtl; padding-bottom: 10px;">
                <!-- اختيار التاريخ -->
                <div style="display: flex; justify-content: space-between; gap: 15px;">
                    <select id="select-day" class="swal-select" style="flex: 1;">
                        <option value="" disabled selected>اختر اليوم</option>
                        ${[...Array(31).keys()]
                          .map(
                            (i) => `<option value="${i + 1}">${i + 1}</option>`
                          )
                          .join("")}
                    </select>
                    <select id="select-month" class="swal-select" style="flex: 1;">
                        <option value="" disabled selected>اختر الشهر</option>
                        ${months
                          .map(
                            (month, i) =>
                              `<option value="${i + 1}">${month}</option>`
                          )
                          .join("")}
                    </select>
                    <select id="select-year" class="swal-select" style="flex: 1;">
                        <option value="" disabled selected>اختر السنة</option>
                        ${[...Array(10).keys()]
                          .map((i) => {
                            const year = new Date().getFullYear() + i;
                            return `<option value="${year}">${year}</option>`;
                          })
                          .join("")}
                    </select>
                </div>

                <!-- اسم المهمة + الألوان -->
                <div style="display: flex; gap: 15px; align-items: center;">
                    <input type="text" id="notes-select" class="swal-select" placeholder="اسم المهمة" style="flex: 0.8;" />
                    <div style="display: flex; gap: 10px;">
                        <div class="color-option" data-color="Yellow" data-bg-class="bg-yellow-400" style="width: 20px; height: 20px; background-color: #fbbf24; border-radius: 50%; cursor: pointer; border: 2px solid transparent;"></div>
                        <div class="color-option" data-color="Red" data-bg-class="bg-red-500" style="width: 20px; height: 20px; background-color: #ef4444; border-radius: 50%; cursor: pointer; border: 2px solid transparent;"></div>
                        <div class="color-option" data-color="Green" data-bg-class="bg-green-500" style="width: 20px; height: 20px; background-color: #10b981; border-radius: 50%; cursor: pointer; border: 2px solid transparent;"></div>
                    </div>
                </div>
            </div>
            
            <style>
                .color-option.selected {
                    border: 2px solid #000 !important;
                }

                .swal-select {
                    width: 100%;
                    padding: 12px;
                    border: 1px solid #ccc;
                    border-radius: 6px;
                    font-size: 15px;
                    box-sizing: border-box;
                }

                .swal-wide-popup {
                    width: 700px !important;
                    max-width: 95vw;
                    min-height: 430px !important;
                }

                .swal-confirm-button,
                .swal-cancel-button {
                    padding: 12px 40px !important;
                    font-size: 16px !important;
                    border-radius: 8px !important;
                    width: 160px !important;
                }
            </style>
            `,
      showCancelButton: true,
      confirmButtonText: isCreatingEvent ? "جاري الحفظ..." : "تأكيد",
      cancelButtonText: "إلغاء",
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !Swal.isLoading(),
      didOpen: () => {
        // Add click event listeners for color selection
        document.querySelectorAll(".color-option").forEach((option) => {
          option.addEventListener("click", (e) => {
            document
              .querySelectorAll(".color-option")
              .forEach((opt) => opt.classList.remove("selected"));
            e.target.classList.add("selected");
          });
        });
      },
      preConfirm: async () => {
        const day = document.getElementById("select-day").value;
        const month = document.getElementById("select-month").value;
        const year = document.getElementById("select-year").value;
        const notes = document.getElementById("notes-select").value.trim();
        const colorElement = document.querySelector(".color-option.selected");
        const color = colorElement?.getAttribute("data-color");

        // Validation
        if (!day || !month || !year || !notes || !color) {
          Swal.showValidationMessage("جميع الحقول مطلوبة");
          return false;
        }

        // Create ISO date string (set time to noon to avoid timezone issues)
        const selectedDate = new Date(
          parseInt(year),
          parseInt(month) - 1,
          parseInt(day),
          12,
          0,
          0
        );
        const isoDate = selectedDate.toISOString();

        console.log("Creating event with data:", {
          date: isoDate,
          notes: notes,
          color: color,
        });

        const eventData = {
          date: isoDate,
          notes: notes,
          color: color,
        };

        try {
          const result = await createEvent(eventData);
          console.log("Event created successfully:", result);

          // Refresh calendar data to show new event
          await fetchCalendarData();

          return result;
        } catch (error) {
          console.error("Error creating event:", error);
          Swal.showValidationMessage(`حدث خطأ: ${error.message}`);
          return false;
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: "success",
          title: "تمت الاضافة بنجاح",
          text: "تم حفظ الموعد في التقويم",
          showConfirmButton: false,
          timer: 2500,
        });
      }
    });
  };

  const renderCalendarGrid = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    const today = new Date();
    const isCurrentMonth =
      today.getMonth() === month && today.getFullYear() === year;
    const todayDate = today.getDate();

    const weeks = [];
    let dayCounter = 1;

    for (let weekIndex = 0; weekIndex < 6; weekIndex++) {
      const days = [];

      for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
        if (
          (weekIndex === 0 && dayIndex < firstDayOfMonth) ||
          dayCounter > daysInMonth
        ) {
          days.push(
            <div
              key={`empty-${weekIndex}-${dayIndex}`}
              className="border-r border-t min-h-16 p-2 border-gray-100"
            >
              &nbsp;
            </div>
          );
        } else {
          const currentDay = dayCounter;
          const dayEvents = events.filter((e) => e.day === currentDay);
          const hasEvent = dayEvents.length > 0;
          const isToday = isCurrentMonth && todayDate === currentDay;
          const isSelected = selectedDay === currentDay;

          days.push(
            <div
              key={`day-${dayCounter}`}
              className={`border-r border-t border-gray-100 min-h-24 p-2 relative cursor-pointer hover:bg-gray-50 ${
                isSelected
                  ? "bg-blue-500 text-white"
                  : isToday
                  ? "bg-blue-200"
                  : ""
              }`}
              onClick={() => setSelectedDay(currentDay)}
            >
              <div className="font-medium md:font-bold text-center">
                {currentDay}
              </div>
              {hasEvent && (
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex gap-1">
                  {dayEvents.map((dayEvent, eventIndex) => (
                    <div
                      key={eventIndex}
                      className={`w-2 h-2 ${dayEvent.color} rounded-full shadow-sm`}
                      title={dayEvent.notes}
                    ></div>
                  ))}
                </div>
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

  const currentMonthText = `${
    months[currentDate.getMonth()]
  } ${currentDate.getFullYear()}`;
  const currentYear = new Date().getFullYear();
  const yearOptions = [];
  for (let i = currentYear - 5; i <= currentYear + 5; i++) yearOptions.push(i);

  // Handle create event errors
  if (createError) {
    console.error("Create event error:", createError);
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="px-2 flex justify-center items-center min-h-64">
        <div className="text-blue-500 text-lg">جاري التحميل...</div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="px-2 flex justify-center items-center min-h-64">
        <div className="text-red-500 text-center">
          <div className="text-lg font-bold mb-2">
            حدث خطأ في تحميل البيانات
          </div>
          <div className="text-sm">{error.message}</div>
          <button
            onClick={fetchCalendarData}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-2">
      {/* Header with navigation and add button */}
      <div dir="ltr" className="mt-6 flex justify-between gap-2 items-center">
        <div className="flex items-center space-x-reverse gap-2 lg:gap-4">
          <button
            onClick={handleNextMonth}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200"
            title="الشهر التالي"
          >
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <button
            onClick={handlePrevMonth}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-500 hover:bg-blue-200"
            title="الشهر السابق"
          >
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <div className="flex items-center space-x-reverse space-x-1">
            <button
              onClick={handleAddEvent}
              disabled={isCreatingEvent}
              className={`flex items-center rounded-md px-8 py-3 text-sm ${
                isCreatingEvent
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              <span className="ml-1 hidden md:block">
                {isCreatingEvent ? "جاري الحفظ..." : "اضافة موعد"}
              </span>
              <span className="block md:hidden">
                {isCreatingEvent ? "..." : "+"}
              </span>
            </button>
          </div>
        </div>

        {/* Month/Year selector */}
        <div className="flex items-center relative">
          <div
            className="text-sm cursor-pointer p-2 md:p-3 border border-blue-300 rounded-xl text-blue-500 flex items-center gap-2 md:gap-5 hover:bg-blue-50"
            onClick={() => setShowDatePicker(!showDatePicker)}
          >
            <span className="ml-1 hidden md:block">▼</span>
            {currentMonthText}
          </div>

          {showDatePicker && (
            <div
              dir="rtl"
              className="absolute top-full mt-1 right-0 bg-white shadow-lg rounded-md p-3 z-10 min-w-48 border"
            >
              <div className="mb-2">
                <select
                  className="w-full p-2 border rounded-md mb-2"
                  value={currentDate.getFullYear()}
                  onChange={(e) =>
                    handleMonthYearChange(
                      currentDate.getMonth(),
                      parseInt(e.target.value)
                    )
                  }
                >
                  {yearOptions.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>

                <div className="grid grid-cols-3 gap-2">
                  {months.map((month, index) => (
                    <button
                      key={month}
                      className={`p-2 rounded-md text-center text-sm ${
                        currentDate.getMonth() === index
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 hover:bg-gray-200"
                      }`}
                      onClick={() =>
                        handleMonthYearChange(index, currentDate.getFullYear())
                      }
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

      {/* Calendar Grid */}
      <div className="mt-4 bg-white rounded-md overflow-hidden shadow-sm">
        <div className="grid grid-cols-7 text-center border-b border-gray-100">
          {daysOfWeek.map((day, index) => (
            <div
              key={`header-${index}`}
              className="py-3 text-gray-800 font-medium md:font-bold text-xs md:text-sm"
            >
              {day}
            </div>
          ))}
        </div>
        <div className="border-l border-gray-100">{renderCalendarGrid()}</div>
      </div>

      {/* Events List */}
      {events.length > 0 && (
        <div className="mt-6 space-y-4">
          <h3 className="text-lg font-bold text-gray-800">
            الأحداث هذا الشهر ({events.length}):
          </h3>
          {events.map((event, index) => (
            <div
              key={`event-${index}`}
              className="bg-blue-50 rounded-lg p-3 flex justify-between items-center hover:bg-blue-100 transition-colors"
            >
              <div className="text-gray-800 text-sm font-bold">
                {event.notes}
              </div>
              <div
                className={`${event.color} text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold shadow-sm`}
              >
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