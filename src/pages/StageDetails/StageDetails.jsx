import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Breadcrumb from "../../components/main/BreadCrumb.jsx";
import BannerCard from "../../components/Cards/BannerCard.jsx";
import Card from "../../components/Cards/Card.jsx";
import useGetLevelsByStageId from "../../hooks/useLevels/useGetLevelsByStageId.jsx";
// import useGetStageById from "../../hooks/useStages/useGetStageById.js";

import { useParams } from "react-router-dom";
import LevelsCard from '../../components/LevelsCard.jsx';

function StageDetails() {
  const { id } = useParams(); // Get the ID from the URL
  const { levels, loading, error, getLevelsByStageId } = useGetLevelsByStageId();
  //const { levels, loading, error, getLevelsByStageId } = useGetStageById();
  const location = useLocation();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  const [state] = useState(() => {
    const savedState = localStorage.getItem("stageDetailsState");
    return location.state || (savedState ? JSON.parse(savedState) : {});
  });

  useEffect(() => {
    getLevelsByStageId(id);
  }, [id, getLevelsByStageId]);

  useEffect(() => {
    if (state) {
      localStorage.setItem("stageDetailsState", JSON.stringify(state));
      setItems([
        { label: "الرئيسية", href: "/" },
        { label: state.title }
      ]);
    }
  }, [state]);

  const handleCardClick = (level) => {
    const newState = {
      id: level.id,
      title: state.title,
      text: level.name,
      imagePath: level.imagePath,
    };
    navigate('/level_details/'+level.id, { state: newState });
  };

  return (
    <div dir="rtl">
      <Breadcrumb items={items} />
      
      {/* Banner Section - Responsive container */}
      <div className="w-full px-4 sm:px-6 md:px-12 lg:px-20 xl:px-35">
        <BannerCard
          imageSrc="/stage1.png"
          imageAlt="Stage Banner"
          title={state.title}
        />
      </div>

      {/* Content Section - Responsive padding */}
      <div className="flex flex-col w-full px-4 sm:px-6 md:px-12 lg:px-20 xl:px-35">
        <div className="flex flex-col gap-y-3 sm:gap-y-4">
          <h2 className="text-xl sm:text-2xl font-bold pb-6 sm:pb-8 md:pb-10">
            الصف الدراسي
          </h2>

          {loading ? (
            <p className="text-center py-8">جاري التحميل...</p>
          ) : error ? (
            <p className="text-red-600 text-center py-8">حدث خطأ أثناء جلب الصفوف</p>
          ) : levels && levels.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {levels.map((level) => (
                <LevelsCard
                  key={level.id}
                  id={level.id}
                  title={level.title}
                  image={level.imagePath}
                  description={level.description}
                  onClick={() => handleCardClick(level)}
                />
              ))}
            </div>
          ) : (
            <p className="text-center py-8">لا توجد صفوف للعرض</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default StageDetails;