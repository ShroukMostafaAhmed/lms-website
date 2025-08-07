import React from "react";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";

const Card = ({id, href ,number, text, onClick, color, title, desc = null }) => {
    const navigate = useNavigate();

    return (
        <div
            className={clsx(
                "w-full h-48 sm:h-52 md:h-56 text-center rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer",
                color === "blue" && "bg-blue-500",
                color === "yellow" && "bg-yellow-400",
                color === "orange" && "bg-orange-500",
                color === "red" && "bg-red-500",
            )}
            onClick={() => onClick({id, href, number, text, color, title, desc})}
        >
            <div className="flex flex-col h-28 sm:h-30 md:h-32 justify-center items-center p-3 sm:p-4">
                <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 flex items-center justify-center bg-white rounded-full font-bold text-base sm:text-lg">
                    {typeof number === 'string' ? number : number}
                </div>
            </div>
            <div
                className={clsx(
                    "py-4 sm:py-6 md:py-8 font-semibold bg-white h-full",
                    color === "blue" && "text-blue-500",
                    color === "yellow" && "text-yellow-500",
                    color === "orange" && "text-orange-500",
                    color === "red" && "text-red-500",
                )}
            >
                <div className="flex flex-col sm:flex-row-reverse justify-center items-center gap-2 sm:gap-6 md:gap-8 lg:gap-12 xl:gap-16 px-2">
                    <span className="text-lg sm:text-xl font-bold">{text}</span>
                    {desc && <span className="text-sm sm:text-base md:text-lg text-black text-center">{desc}</span>}
                </div>
            </div>
        </div>
    );
};

export default Card;