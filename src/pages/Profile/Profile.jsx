import React, { useState, useEffect } from 'react';
import Card from "../../components/Cards/Card.jsx";
import BarCharts from "../../components/Charts/BarCharts.jsx";
import useGetProfile from "../../hooks/useProfile/useGetProfile.jsx";
import { useLocation } from 'react-router-dom';

const Profile = () => {
  const { data, loading, error } = useGetProfile();
  const location = useLocation();

  const isLoggedIn = location.pathname !== "/login" && location.pathname !== "/register";

  // حالات التحديث
  const [editedName, setEditedName] = useState("");
  const [savedName, setSavedName] = useState(""); // الاسم المحفوظ
  const [isEditingName, setIsEditingName] = useState(false);
  const [isUpdatingName, setIsUpdatingName] = useState(false);
  const [isUpdatingPhoto, setIsUpdatingPhoto] = useState(false);
  const [profileImage, setProfileImage] = useState("");

  // تحديث الصورة عند تحميل البيانات
  useEffect(() => {
    if (data?.imagePath) {
      setProfileImage(data.imagePath);
    } else {
      // تعيين الصورة الافتراضية إذا لم تكن هناك صورة من الـ API
      setProfileImage("/Frame 1984078091.png");
    }
  }, [data]);

  if (loading) return <p className="text-center mt-10">جاري تحميل البيانات...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!data) return null;

  const {
    imagePath = "/default-avatar.png",
    name = "اسم الطالب",
    level = "غير محدد",
    viewsCount = 0,
    downloadsCount = 0,
    totalStudyTime = "0",
    dailyAchievements = [],
    phone = "0123456789"
  } = data;

  // تحديث الاسم
  const handleNameUpdate = async () => {
    if (!editedName.trim()) {
      setIsEditingName(false);
      return;
    }
    
    setIsUpdatingName(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // حفظ الاسم الجديد وإفراغ الحقل
      setSavedName(editedName);
      setEditedName("");
      setIsEditingName(false);
    } catch (err) {
      alert("حدث خطأ أثناء تحديث الاسم");
    } finally {
      setIsUpdatingName(false);
    }
  };

  // تحديث الصورة
  const handlePhotoUpdate = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsUpdatingPhoto(true);
    try {
      // إنشاء URL مؤقت لعرض الصورة الجديدة
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      
      await new Promise((resolve) => setTimeout(resolve, 1500));
    } catch (err) {
      alert("حدث خطأ أثناء تحديث الصورة");
      setProfileImage(imagePath); // إرجاع الصورة الأصلية في حالة الخطأ
    } finally {
      setIsUpdatingPhoto(false);
    }
  };

  const lessons = [
    {
      id: 1,
      title: viewsCount?.toString() || "0",
      href: "#",
      color: "blue",
      image: <img src="/book.png" alt="icon" className="w-6 h-6 sm:w-8 sm:h-8" />,
      text: viewsCount?.toString() || "0",
      desc: "الدروس الكلية"
    },
    {
      id: 2,
      title: downloadsCount?.toString() || "0",
      href: "#",
      color: "yellow",
      image: <img src="/download.png" alt="icon" className="w-6 h-6 sm:w-8 sm:h-8" />,
      text: downloadsCount?.toString() || "0",
      desc: "الدروس المحملة"
    },
    {
      id: 3,
      title: totalStudyTime || "0",
      href: "#",
      color: "red",
      image: <img src="/clock2.png" alt="icon" className="w-6 h-6 sm:w-8 sm:h-8" />,
      text: totalStudyTime || "0",
      desc: "زمن الدراسة"
    }
  ];

  const chartData = dailyAchievements.map(({ day, studyTime }) => ({
    day,
    value: parseInt(studyTime) || 0,
  }));

  return (
    <div className={`font-bold px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 ${isLoggedIn ? "md:mr-[4px]" : ""}`} dir="rtl">
      {/* بيانات البروفايل */}
      <div className="flex flex-col items-center my-6 sm:my-8 md:my-10">
        <div className="flex flex-col items-center gap-3 sm:gap-4">
          
          {/* صورة المستخدم مع إمكانية التحديث */}
          <div className="relative group">
            <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-45 md:h-45 rounded-full overflow-hidden border-0 border-white shadow-lg">
              <img
                src={profileImage || "/Frame 1984078091.png"}
                alt="User Avatar"
                className="w-full h-full object-cover"
                onError={(e) => {
                  // في حالة فشل تحميل الصورة، استخدم الصورة الافتراضية
                  e.target.src = "/Frame 1984078091.png";
                }}
              />
            </div>
            
            {/* زر تحديث الصورة */}
            <label className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-1.5 sm:p-2 cursor-pointer shadow-lg transition-all duration-200 transform hover:scale-110">
              {isUpdatingPhoto ? (
                <div className="animate-spin w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full"></div>
              ) : (
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpdate}
                className="hidden"
                disabled={isUpdatingPhoto}
              />
            </label>
          </div>

          {/* اسم المستخدم */}
          <div className="flex flex-col items-center gap-2 sm:gap-3 w-full max-w-sm">
            <div className="flex flex-col items-center">
              {savedName && (
                <p className="text-base sm:text-lg font-bold text-gray-800 mt-1">{savedName}</p>
              )}
            </div>
            
            <div className="relative w-full max-w-xs sm:max-w-sm">
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && editedName.trim()) handleNameUpdate();
                }}
                placeholder="تحديث اسم المستخدم"
                className="px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-center w-full pr-8 sm:pr-10 text-sm sm:text-base"
              />

              {/* أيقونة القلم داخل حقل الإدخال */}
              <button
                onClick={handleNameUpdate}
                disabled={isUpdatingName || !editedName.trim()}
                className="absolute top-1/2 right-2 transform -translate-y-1/2 p-1 text-blue-600 hover:bg-blue-200 rounded-xl transition-all"
                title="تحديث الاسم"
              >
                {isUpdatingName ? (
                  <div className="animate-spin w-4 h-4 sm:w-5 sm:h-5 border-2 border-blue-600 border-t-transparent rounded-full"></div>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 11l6.536-6.536a2 2 0 012.828 0l.172.172a2 2 0 010 2.828L12 15H9v-3z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* رقم الهاتف */}
          <p className="text-gray-500 text-xs sm:text-sm">
            {phone}
          </p>

          {/* المستوى */}
          <p className="text-gray-600 text-xs sm:text-sm">{level}</p>
        </div>
      </div>

      {/* كروت الإحصائيات */}
      <div className="flex flex-col gap-3 sm:gap-4 xl:pr-35">
        <div className="flex flex-row justify-start items-center gap-4 sm:gap-6 pb-6 sm:pb-8 md:pb-10 ">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold py-2 sm:py-4">الدروس</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:gap-10 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5 max-w-7xl mb-6 sm:mb-8 md:mb-10 w-full xl-pr-35">
          {lessons.map((lesson) => (
            <Card
              key={lesson.id}
              id={lesson.id}
              href={lesson.href}
              color={lesson.color}
              text={lesson.text}
              number={lesson.image}
              onClick={() => console.log("Card clicked:", lesson)}
              desc={lesson.desc}
            />
          ))}
        </div>
      </div>

      {/* شارت التقويم اليومي */}
      <div className="w-full ">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold py-2 sm:py-4 xl:pr-35">التقويم اليومى</h2>
        <div className="w-full overflow-x-auto xl:pr-35">
          <BarCharts data={chartData} />
        </div>
      </div>
    </div>
  );
};

export default Profile;