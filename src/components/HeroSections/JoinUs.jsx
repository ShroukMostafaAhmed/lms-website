export default function JoinUs() {
    return (
        <div className="relative bg-gradient-to-r from-[#FFFAE6] to-[#F4F9FF] py-20 px-6 text-center rounded-lg shadow-lg overflow-hidden">
            {/* Vertical Yellow Wave on the Left */}
            <div className="absolute hidden lg:block lg: top-0 left-0 w-full h-full">
                <svg viewBox="0 0 3950 600" className="w-full h-full" preserveAspectRatio="none">
                    <path
                        fill="#FFD54F"
                        d="M0,0 L400,0 C550,200 200,380 0,1000 Z"
                        opacity="0.6"
                    ></path>
                </svg>
            </div>

            {/* Left Icon */}
            <div className="absolute hidden lg:block lg:left-52 top-10 text-red-400">
                <img src="/laderBoy.png" alt="Left Icon" className="w-12 h-12 opacity-70" />
            </div>

            {/* Banner Content */}
            <h2 className="text-3xl font-bold text-gray-800">انضم إلينا!</h2>
            <p className="text-lg text-blue-600 mt-2 leading-relaxed">
                معًا لنصنع مستقبلًا مشرقًا! انضم إلى <span className="font-bold">أدرس</span> وابدأ رحلتك التعليمية اليوم!
            </p>

            {/* Right Icon */}
            <div className="absolute hidden lg:block lg:right-52 bottom-10 text-orange-400">
                <img src="/clock.png" alt="Right Icon" className="w-10 h-10 opacity-70" />
            </div>
        </div>
    );
}
