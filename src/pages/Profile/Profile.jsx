import React, { useState, useEffect, useRef, useMemo } from 'react';
import Card from "../../components/Cards/Card.jsx";
import BarCharts from "../../components/Charts/BarCharts.jsx";
import useGetProfile from "../../hooks/useProfile/useGetProfile.jsx";
import { useLocation } from 'react-router-dom';
import {
  saveProfilePhoto,
  loadProfilePhoto,
  loadPhotoMeta,
  setPreferLocal,
  compressImageFile,
} from "../../utils/profilePhotoStore.js";

function appendCacheBuster(src) {
  if (!src) return src;
  return src.includes("?") ? `${src}&v=${Date.now()}` : `${src}?v=${Date.now()}`;
}

const Profile = () => {
  // ✅ استدعِ كل الـ hooks أولاً (بدون أي return قبلها)
  const { data, loading, error } = useGetProfile();
  const location = useLocation();
  const isLoggedIn = location.pathname !== "/login" && location.pathname !== "/register";

  const [isUpdatingPhoto, setIsUpdatingPhoto] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const objectUrlRef = useRef(null);

  // 🔎 دعم مفاتيح lower/Upper
  const api = data || {};
  const firstName = api.firstName ?? api.FirstName ?? "";
  const lastName  = api.lastName  ?? api.LastName  ?? "";
  const name      = api.name      ?? "";
  const level     = api.level     ?? api.Level     ?? "غير محدد";
  const views     = api.viewsCount     ?? api.ViewsCount     ?? 0;
  const downloads = api.downloadsCount ?? api.DownloadsCount ?? 0;
  const totalStudy= api.totalStudyTime ?? api.TotalStudyTime ?? "00:00:00";
  const dailyAch  = api.dailyAchievements ?? api.DailyAchievements ?? [];
  const phone     = api.phoneNumber ?? api.PhoneNumber ?? "";
  
const displayName =
  [firstName, lastName]
    .map(s => (s ?? '').trim())
    .filter(Boolean)
    .join('\u00A0') ||     // NBSP
  (name?.trim() || "اسم الطالب");

  const serverImagePath = (api.imagePath ?? "").trim();

  // مفتاح ثابت للصورة لكل طالب
  const photoKey = useMemo(() => {
    const idPart = (phone && String(phone).trim()) || displayName || "me";
    return `profilePhoto:${idPart}`;
  }, [phone, displayName]);

  // تحديد مصدر الصورة (محلي/سيرفر/افتراضي) — بدون أي return قبل هذا الـ effect
  useEffect(() => {
    let cancelled = false;
    const setSrc = (src) => { if (!cancelled) setProfileImage(src); };

    (async () => {
      try {
        const [meta, localBlob] = await Promise.all([
          loadPhotoMeta(photoKey),
          loadProfilePhoto(photoKey),
        ]);

        const preferLocal = !!meta?.preferLocal;
        const hasLocal = !!localBlob;
        const hasServer = !!serverImagePath;

        if (preferLocal && hasLocal) {
          const url = URL.createObjectURL(localBlob);
          if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
          objectUrlRef.current = url;
          setSrc(url);
          return;
        }

        if (hasServer) {
          setSrc(appendCacheBuster(serverImagePath));
          return;
        }

        if (hasLocal) {
          const url = URL.createObjectURL(localBlob);
          if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
          objectUrlRef.current = url;
          setSrc(url);
          return;
        }

        setSrc("/Frame 1984078091.png");
      } catch (e) {
        console.warn("photo decide error:", e);
        setSrc("/Frame 1984078091.png");
      }
    })();

    return () => {
      cancelled = true;
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
        objectUrlRef.current = null;
      }
    };
  }, [photoKey, serverImagePath]);

  // اختيار صورة من الجهاز → خزّن محليًا + فعّل preferLocal
  const handlePhotoUpdate = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      alert("الملف يجب أن يكون JPG/PNG/WebP");
      event.target.value = null;
      return;
    }
    const maxMB = 5;
    if (file.size > maxMB * 1024 * 1024) {
      alert(`حجم الصورة يجب ألا يزيد عن ${maxMB}MB`);
      event.target.value = null;
      return;
    }

    setIsUpdatingPhoto(true);
    try {
      // Preview مؤقت
      const tempUrl = URL.createObjectURL(file);
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = tempUrl;
      setProfileImage(tempUrl);

      // ضغط + تخزين + تفعيل تفضيل المحلية
      const compressed = await compressImageFile(file, { maxSide: 700, type: "image/webp", quality: 0.9 });
      await saveProfilePhoto(photoKey, compressed);
      await setPreferLocal(photoKey, true);

      // اعرض من الـ blob المخزّن
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
      const finalUrl = URL.createObjectURL(compressed);
      objectUrlRef.current = finalUrl;
      setProfileImage(finalUrl);
    } catch (err) {
      console.error(err);
      alert("حدث خطأ أثناء حفظ الصورة محليًا");
      setProfileImage("/Frame 1984078091.png");
    } finally {
      setIsUpdatingPhoto(false);
      event.target.value = null;
    }
  };

  // ✅ بعد ما استدعينا كل الـ hooks فوق، دلوقتي نقدر نعمل returns safely
  if (loading) return <p className="text-center mt-10">جاري تحميل البيانات...</p>;
  if (error)   return <p className="text-center mt-10 text-red-500">{error}</p>;

  const lessons = [
    {
      id: 1,
      title: String(views),
      href: "#",
      color: "blue",
      image: <img src="/book.png" alt="icon" className="w-6 h-6 sm:w-8 sm:h-8" />,
      text: String(views),
      desc: "الدروس الكلية",
    },
    {
      id: 2,
      title: String(downloads),
      href: "#",
      color: "yellow",
      image: <img src="/download.png" alt="icon" className="w-6 h-6 sm:w-8 sm:h-8" />,
      text: String(downloads),
      desc: "الدروس المحملة",
    },
    {
      id: 3,
      title: totalStudy,
      href: "#",
      color: "red",
      image: <img src="/clock2.png" alt="icon" className="w-6 h-6 sm:w-8 sm:h-8" />,
      text: totalStudy,
      desc: "زمن الدراسة",
    },
  ];

  const chartData = dailyAch.map(({ day, studyTime }) => ({
    day,
    value: parseInt(studyTime) || 0,
  }));

  return (
    <div className={`font-bold px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 ${isLoggedIn ? "md:mr-[4px]" : ""}`} dir="rtl">
      <div className="flex flex-col items-center my-6 sm:my-8 md:my-10">
        <div className="flex flex-col items-center gap-3 sm:gap-4">
          {/* صورة المستخدم */}
          <div className="relative group">
            <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-45 md:h-45 rounded-full overflow-hidden border-0 border-white shadow-lg">
              <img
                src={profileImage || "/Frame 1984078091.png"}
                alt="User Avatar"
                className="w-full h-full object-cover"
                onError={(e) => { e.currentTarget.src = "/Frame 1984078091.png"; }}
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

          {/* الاسم/الهاتف/المستوى */}
          <div className="flex flex-col items-center gap-2 sm:gap-3 w-full max-w-sm">
            <p className="text-lg sm:text-xl font-bold text-gray-800 mt-1 text-center">{displayName}</p>
          </div>
          <p className="text-gray-500 text-xs sm:text-sm">{phone}</p>
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

      {/* الشارت */}
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
