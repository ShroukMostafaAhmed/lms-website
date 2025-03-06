import React from 'react';

function BannerCard({imageSrc, imageAlt}) {
    return (
        <>
            <div className="max-w-7xl w-full rounded-3xl px-2 py-4">
                <img
                    src={imageSrc}
                    alt={imageAlt}
                    className="w-full h-full object-cover rounded-3xl"
                />
            </div>
        </>
    );
}

export default BannerCard;