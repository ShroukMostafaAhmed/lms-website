import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faYoutube,
    faFacebook,
    faTwitter,
    faInstagram
} from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    const handleScroll = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <footer className="bg-gray-100 py-10 px-4 mt-14 rounded-3xl">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-right">
                {/* Left Column - Buttons */}
                <div className="flex flex-col items-center md:items-start justify-center space-y-4">
                    <button className="py-2 px-4 text-base bg-blue-500 hover:bg-white hover:text-blue-500 border border-[#1E78EB] text-white rounded-full flex items-center cursor-pointer">
                        <span>إنشاء حساب</span>
                    </button>
                    <button className="py-2 px-4 text-base bg-white hover:bg-blue-500 text-blue-500 hover:text-white border border-[#1E78EB] rounded-full flex items-center cursor-pointer">
                        <span>تسجيل دخول</span>
                    </button>
                </div>

                {/* Middle Column - Logo, Description, Social Media, and Store Buttons */}
                <div dir="rtl" className="flex flex-col items-center justify-center">
                    <img src="/logo.png" alt="أدرس" className="mx-auto mb-4 md:w-fit" />
                    <p className="text-lg text-center text-gray-700 font-semibold max-w-md">
                        معًا، لنصنع مستقبلًا مشرقًا. انضم إلى 'أدرس' وابدأ رحلتك التعليمية اليوم!
                    </p>
                    <h3 className="mt-6 text-xl font-semibold text-gray-800">تواصل معنا عبر السوشيال!</h3>
                    <div dir="ltr" className="flex justify-center space-x-6 mt-4">
                        <a href="#" className="text-gray-600 hover:text-red-600 transition-colors">
                            <FontAwesomeIcon icon={faYoutube} size="lg" />
                        </a>
                        <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                            <FontAwesomeIcon icon={faFacebook} size="lg" />
                        </a>
                        <a href="#" className="text-gray-600 hover:text-blue-400 transition-colors">
                            <FontAwesomeIcon icon={faTwitter} size="lg" />
                        </a>
                        <a href="#" className="text-gray-600 hover:text-pink-600 transition-colors">
                            <FontAwesomeIcon icon={faInstagram} size="lg" />
                        </a>
                    </div>
                    <div className="mt-6 flex justify-center space-x-4">
                        <img src="/Google_Play.png" alt="Google Play" className="h-10 md:h-12" />
                        <img src="/app_store.png" alt="App Store" className="h-10 md:h-12" />
                    </div>
                </div>

                {/* Right Column - Quick Links */}
                <div dir="rtl" className="flex flex-col justify-center items-center md:items-start">
                    <h4 className="text-lg font-semibold text-gray-800">روابط سريعة</h4>
                    <div className="mt-1 h-[2px] w-[45%] bg-gradient-to-r from-[#00B9C5] to-transparent"></div>
                    <ul className="text-gray-600 space-y-3 mt-2">
                        <li><button className="cursor-pointer" onClick={() => handleScroll("hero")}>الرئيسية</button></li>
                        <li><button className="cursor-pointer" onClick={() => handleScroll("whyUs")}>لماذا نحن</button></li>
                        <li><button className="cursor-pointer" onClick={() => handleScroll("education")}>المراحل التعليمية</button></li>
                        <li><button className="cursor-pointer" onClick={() => handleScroll("subs")}>الباقات</button></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;