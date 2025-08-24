import React from 'react';
import Breadcrumb from "../../components/main/BreadCrumb.jsx";
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer.jsx";
import DetailsCard from "../../components/Cards/DetailsCard.jsx";

function VideoDetails() {
    // bread crumb items
    const items = [
        { label: "الرئيسية", href: "/" },
        { label: "الصف الاول", href: "/stage_details" },
        { label: "اللغه العربية", href: "/level_details" },
        { label: "الدروس", href: "/lessons" },
        { label: "الدرس الاول", href: "/lesson_details" },
        { label: "الفيديو الاول", href: "/video_details" }
    ];

    return (
        <>
            <div className="flex flex-col gap-4 pb-10">
                <Breadcrumb items={items} />
<div className='w-full max-w-screen-3xl px-35 py-10'>
                <div dir="rtl" className=" px-4 lg:px-12">
                    <VideoPlayer/>
                </div>

                <div dir="rtl" className={"px-4 lg:px-12 pt-10" }>
                    <DetailsCard
                        title="شرح الدرس"
                        icon="lesson-icon.png"
                        description="المجموعات هي تجمــيــعـات من العناصر تُستخدم لترتيب الأشياء. مثلاً، يمكن أن تكون مـجـمـوعــة مـن الأعـداد أو الأشكال. أمثلة على المجموعات: مجموعة الأعداد: (1, 2, 3) ومجموعة الأشكال: (دائرة، مربع، مثلث)"
                    />
                </div>
                <div dir="rtl" className="px-4 lg:px-12 ">
                    <DetailsCard
                        title="المدرس"
                        icon="profile-icon.png"
                        teacherName="الأستاذ / فوزي مفتاح"
                        description="الأسـتـاذ فــوزي مــفــتـاح هـو أسـتـاذ لـمـادة الـريــاضيــات، تحمل بكالوريوس في الرياضيات ودبــلـوم فـي تـكـنـولوجيا الـتعـلـيـم. لـديـه أكـثر من 5 سنـوات من الـخـبرة في تدريس الـريـاضـيـات عـــبر الإنـترنــت، حـيث تـطور محـتوى تـعـلــيــمي تفاعلي يـشمل فيديوهـات وألـعــاب تـعـلـيـمـيـة. تستهدف الفئات العمرية من الأول الابتدائي حتى الـعـاشر الــثــانـوي "
                    />
                    </div>
                </div>
            </div>
        </>
    );
}

export default VideoDetails;