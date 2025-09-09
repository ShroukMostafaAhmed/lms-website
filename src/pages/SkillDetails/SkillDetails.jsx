// pages/skills/SkillDetails.jsx
import React from "react";
import { useLocation, useParams } from "react-router-dom";
import Breadcrumb from "../../components/main/BreadCrumb.jsx";
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer.jsx";
import DetailsCard from "../../components/Cards/DetailsCard.jsx";
import useGetSkillById from "../../hooks/useSkills/useGetSkillById.js";

// نختار رابط الفيديو من أكتر من مفتاح محتمل (لو الـ API بيغيّر أسماء الحقول)
const pickVideoUrl = (skill) => {
  if (!skill) return "";
  const cands = [
    skill.videoURL,
    skill.videoUrl,
    skill.video_url,
    skill.youtubeURL,
    skill.youtubeUrl,
    skill.youtube,
    skill.embedHtml,
    skill.embed,
    skill.url,
    skill.link,
    skill.video,
  ].filter(Boolean).map(String);

  const yt = cands.find(v => /youtu\.?be|youtube\.com/.test(v) || /^[A-Za-z0-9_-]{11}$/.test(v));
  return yt || cands[0] || "";
};

function SkillDetails() {
  const location = useLocation();
  const params = useParams();
  const id = location.state?.id ?? params.id;

  const { skill, loading, error } = useGetSkillById(id);

  if (loading) return <div className="text-center py-10">جاري التحميل...</div>;
  if (error)   return <div className="text-center py-10 text-red-500">حدث خطأ: {error.message}</div>;
  if (!skill)  return <div className="text-center py-10">لا توجد تفاصيل لهذه المهارة.</div>;

  const { title, description, viewsCount } = skill;
  const videoUrl = pickVideoUrl(skill);

  const breadcrumbItems = [
    { label: "الرئيسية", href: "/" },
    { label: title },
  ];

  return (
    <div className="flex flex-col gap-6">
      <Breadcrumb items={breadcrumbItems} />

      {/* الفيديو */}
      {videoUrl && (
        <div dir="rtl" className="px-4 lg:px-12">
          <VideoPlayer videoUrl={videoUrl} title={title} />
        </div>
      )}

      {/* الشرح تحت الفيديو */}
      {description && (
        <div dir="rtl" className="px-4 lg:px-12">
          <DetailsCard title={title} description={description} viewsCount={viewsCount} />
        </div>
      )}
    </div>
  );
}

export default SkillDetails;
