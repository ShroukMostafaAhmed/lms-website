import React from 'react';
import {useNavigate} from "react-router-dom";

function StageCard({ stage }) {
    // use Navigate
    const navigate = useNavigate()

    return (
        <div
            className="relative w-60 lg:w-52 h-48 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-all duration-300 ease-in-out my-4 lg:my-0 cursor-pointer"
            onClick={() => navigate('/stage_details', { state: { id: stage.id, title: stage.title } })}
        >
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${stage.image})` }}
            ></div>

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/30"></div>
        </div>

    );
}

export default StageCard;