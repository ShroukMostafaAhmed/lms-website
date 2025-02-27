export default function JoinUs() {
    return (
        <div className="relative bg-gradient-to-r from-[#FFFAE6] to-[#F4F9FF] py-12 px-6 text-center rounded-lg shadow-lg overflow-hidden">
            {/* Vertical Yellow Wave on the Left */}
            <div className="absolute left-0 top-0 h-full w-fit">
                <svg viewBox="0 0 200 200" className="w-full h-full rotate-90">
                    <path
                        fill="#FFD54F"
                        d="M0,100 C50,50 150,150 200,100 L200,200 L0,200 Z"
                    ></path>
                </svg>
            </div>

            {/* Left Icon */}
            <div className="absolute left-10 top-10 text-red-400">
                <img src="/icons/left-icon.svg" alt="Left Icon" className="w-8 h-8 opacity-70" />
            </div>

            {/* Banner Content */}
            <h2 className="text-3xl font-bold text-gray-800">انضم إلينا!</h2>
            <p className="text-lg text-blue-600 mt-2 leading-relaxed">
                معًا لنصنع مستقبلًا مشرقًا! انضم إلى <span className="font-bold">أدرس</span> وابدأ رحلتك التعليمية اليوم!
            </p>

            {/* Right Icon */}
            <div className="absolute right-10 top-10 text-orange-400">
                <img src="/icons/right-icon.svg" alt="Right Icon" className="w-8 h-8 opacity-70" />
            </div>
        </div>
    );
}
