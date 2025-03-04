import React from 'react';

function StageCard({ stage }) {
    return (
        <div className="relative w-72 lg:w-80 h-48 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-all duration-300 ease-in-out mx-4 my-4 lg:my-0">
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