import React, { useState, useEffect } from 'react';

function BannerCard({ imageSrc, imageAlt }) {
    const [isLoaded, setIsLoaded] = useState(false);
    
    // Preload the image
    useEffect(() => {
        const img = new Image();
        img.src = imageSrc;
        img.onload = () => setIsLoaded(true);
    }, [imageSrc]);

    return (
        <div className="w-full rounded-lg lg:rounded-3xl px-0 sm:px-2 py-2 sm:py-4 relative">
            {/* Placeholder while loading */}
            {!isLoaded && (
                <div className="w-full absolute top-0 left-0 bg-gray-200 rounded-lg lg:rounded-3xl animate-pulse z-10" />
            )}
            
            <img
                src={imageSrc}
                alt={imageAlt}
                loading="eager"
                decoding="async"
                className={`w-full lg:h-130 lg:rounded-3xl ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                style={{ 
                    transition: 'opacity 0.3s',
                    aspectRatio: '16/9'
                }}
                onLoad={() => setIsLoaded(true)}
            />
        </div>
    );
}

export default BannerCard;