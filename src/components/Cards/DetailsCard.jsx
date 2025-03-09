import React from 'react';

function DetailsCard({icon, title, description, teacherName = null}) {
    return (
        <div className="max-w-5xl w-full p-6 rounded-2xl bg-white">
            <div className="flex flex-row justify-between items-center gap-4">
                {/* Avatar (Placeholder) */}
                <div className="flex flex-row gap-4">
                    <img src={icon} alt={title} className="w-8 h-8"/>
                    <h3 className="text-black text-right font-bold text-[16px] lg:text-[24px] lading-[48px]">
                        {title}
                    </h3>

                </div>

                {/* Title & Name */}
                {teacherName != null && (
                    <div>
                        <a href="#" className="text-blue-500 font-medium text-xl">
                            {teacherName}
                        </a>
                    </div>
                )}
            </div>

            {/* Description */}
            <p className="mt-4 text-black text-right leading-relaxed font-normal text-[12px] lg:text-[24px] lading-[48px]">
                {description}
            </p>
        </div>
    );
}

export default DetailsCard;