import React, { useState, useEffect } from 'react';

function BannerCard({imageSrc, imageAlt}) {
    const [isLoaded, setIsLoaded] = useState(false);

    // Preload the image
    useEffect(() => {
        const img = new Image();
        img.src = imageSrc;
        img.onload = () => setIsLoaded(true);
    }, [imageSrc]);

    return (
        <div className="w-full rounded-lg lg:rounded-3xl px-2 py-4 relative" style={{ minHeight: '100px' }}>
            {/* Placeholder while loading */}
            {!isLoaded && (
                <div className="w-full h-full absolute top-0 left-0 bg-gray-200 rounded-3xl animate-pulse" />
            )}

            <img
                src={imageSrc}
                alt={imageAlt}
                loading="eager"
                decoding="async"
                width="1280"
                height="720"
                className={`w-full h-full rounded-3xl ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                style={{ transition: 'opacity 0.3s' }}
                onLoad={() => setIsLoaded(true)}
            />
        </div>
    );
}

export default BannerCard;