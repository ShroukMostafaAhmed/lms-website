import React from "react";
import clsx from "clsx";
import {useNavigate} from "react-router-dom";

const Card = ({ number, text, color, title }) => {
    // use Navigate
    const navigate = useNavigate()

    return (
        <div
            className={clsx(
                "w-full h-40 text-center rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer",
                color === "blue" && "bg-blue-500",
                color === "yellow" && "bg-yellow-400",
                color === "orange" && "bg-orange-500"
            )}
            onClick={() => navigate('/level_details', {state: {id: number, title: title, text: text}})}
        >
            <div className="flex flex-col h-28 justify-center items-center p-4">
                <div className="w-20 h-20 flex items-center justify-center bg-white rounded-full font-bold text-lg">
                    {number}
                </div>
            </div>
            <div
                className={clsx(
                    "py-2 font-semibold bg-white h-full",
                    color === "blue" && "text-blue-500",
                    color === "yellow" && "text-yellow-500",
                    color === "orange" && "text-orange-500"
                )}
            >
                {text}
            </div>
        </div>
    );
};

export default Card;