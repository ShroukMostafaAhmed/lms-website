import React from 'react';
import {useLocation} from "react-router-dom";
import Breadcrumb from "../../components/main/BreadCrumb.jsx";
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer.jsx";
import DetailsCard from "../../components/Cards/DetailsCard.jsx";

function SkillDetails() {
    // use Location
    const location = useLocation();
    const {id, title = "Default Title"} = location.state;

    const breadcrumbItems = [
        { label: "الرئيسية", href: "/" },
        { label: `${title}` },
    ];

    return (
        <>
            <div className="flex flex-col gap-6">
                <Breadcrumb items={breadcrumbItems}/>
                <div dir="rtl" className=" px-4 lg:px-12">
                    <VideoPlayer/>
                </div>
                <div dir="rtl" className=" px-4 lg:px-12">
                    <DetailsCard
                        title="شرح الدرس"
                        icon="lesson-icon.png"
                        description="المجموعات هي تجمــيــعـات من العناصر تُستخدم لترتيب الأشياء. مثلاً، يمكن أن تكون مـجـمـوعــة مـن الأعـداد أو الأشكال. أمثلة على المجموعات: مجموعة الأعداد: (1, 2, 3) ومجموعة الأشكال: (دائرة، مربع، مثلث)"
                    />
                </div>
                <div dir="rtl" className=" px-4 lg:px-12">
                    <DetailsCard
                        title="المدرس"
                        icon="profile-icon.png"
                        teacherName="الأستاذ / فوزي مفتاح"
                        description="الأسـتـاذ فــوزي مــفــتـاح هـو أسـتـاذ لـمـادة الـريــاضيــات، تحمل بكالوريوس في الرياضيات ودبــلـوم فـي تـكـنـولوجيا الـتعـلـيـم. لـديـه أكـثر من 5 سنـوات من الـخـبرة في تدريس الـريـاضـيـات عـــبر الإنـترنــت، حـيث تـطور محـتوى تـعـلــيــمي تفاعلي يـشمل فيديوهـات وألـعــاب تـعـلـيـمـيـة. تستهدف الفئات العمرية من الأول الابتدائي حتى الـتعـاشر الــثــانـوي "
                    />
                </div>
            </div>
        </>
    );
}

export default SkillDetails;