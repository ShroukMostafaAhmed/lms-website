import React, { useState, useEffect } from 'react';

function BannerCard({ imageSrc, imageAlt, title }) {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const img = new Image();
        img.src = imageSrc;
        img.onload = () => setIsLoaded(true);
    }, [imageSrc]);

    return (
        <div className="w-full relative rounded-lg lg:rounded-3xl px-0 sm:px-2 py-2 sm:py-4">
            {/* Placeholder while loading */}
            {!isLoaded && (
                <div className="w-full absolute top-0 left-0  rounded-lg lg:rounded-3xl animate-pulse z-10" />
            )}

            {/* الصورة */}
            <img
                src={imageSrc}
                alt={imageAlt}
                loading="eager"
                decoding="async"
                className={`w-full my-10 lg:h-130 lg:rounded-3xl ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                style={{
                    transition: 'opacity 0.3s',
                    aspectRatio: '16/9'
                }}
                onLoad={() => setIsLoaded(true)}
            />

            {/* العنوان فوق الصورة */}
            {title && (
                <div className="absolute inset-0 flex items-center justify-center ">
                    <h1 className="text-white text-3xl md:text-5xl lg:text-7xl font-bold">{title}</h1>
                </div>
            )}
        </div>
    );
}

export default BannerCard;
