import React from 'react';
import { useLocation } from "react-router-dom";
import Breadcrumb from "../../components/main/BreadCrumb.jsx";
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer.jsx";
import DetailsCard from "../../components/Cards/DetailsCard.jsx";
import useGetSkillById from '../../hooks/useSkills/useGetSkillById.js';

function SkillDetails() {
  const location = useLocation();
  const { id } = location.state || {}; // fallback if no state

  const { skill, loading, error } = useGetSkillById(id);

  if (loading) return <div className="text-center py-10">جاري التحميل...</div>;
  if (error) return <div className="text-center py-10 text-red-500">حدث خطأ: {error.message}</div>;
  if (!skill) return <div className="text-center py-10">لا توجد تفاصيل لهذه المهارة.</div>;

  const { title, description, videoURL, viewsCount } = skill;

  const breadcrumbItems = [
    { label: "الرئيسية", href: "/" },
    { label: title }
  ];

  return (
    <div className="flex flex-col gap-6">
      <Breadcrumb items={breadcrumbItems} />

      {videoURL && (
        <div dir="rtl" className="px-4 lg:px-12">
          <VideoPlayer videoUrl={skill.videoURL} />
        </div>
      )}

      {description && (
        <div dir="rtl" className="px-4 lg:px-12">
          <DetailsCard
            title={title}
            description={description}
            viewsCount={viewsCount}
           

          />
        </div>
      )}
    </div>
  );
}

export default SkillDetails;
