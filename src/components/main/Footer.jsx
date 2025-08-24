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
        <footer className="bg-gradient-to-br from-gray-100 to-gray-200 py-12 px-4 mt-14">
            <div className="max-w-6xl mx-auto">
                {/* Main Content Section */}
                <div className="text-center mb-8">
                    <img src="/logo.png" alt="أدرس" className="mx-auto mb-6 h-18 w-auto" />
                    <p className="text-xl text-gray-700 font-semibold max-w-2xl mx-auto leading-relaxed">
                        معًا، لنصنع مستقبلًا مشرقًا. انضم إلى 'أدرس' وابدأ رحلتك التعليمية اليوم!
                    </p>
                </div>

                {/* Three Column Layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                    
                    {/* Right Column - Quick Links */}
                    <div dir="rtl" className="text-center md:text-right">
                        <h4 className="text-lg font-bold text-gray-800 mb-4">روابط سريعة</h4>
                        <div className="h-[2px] w-16 bg-gradient-to-r from-[#00B9C5] to-transparent mb-4 mx-auto md:mx-0"></div>
                        <ul className="text-gray-600 space-y-3">
                            <li>
                                <button 
                                    className="hover:text-[#00B9C5] transition-colors duration-300 cursor-pointer" 
                                    onClick={() => handleScroll("hero")}
                                >
                                    الرئيسية
                                </button>
                            </li>
                            <li>
                                <button 
                                    className="hover:text-[#00B9C5] transition-colors duration-300 cursor-pointer" 
                                    onClick={() => handleScroll("whyUs")}
                                >
                                    لماذا نحن
                                </button>
                            </li>
                            <li>
                                <button 
                                    className="hover:text-[#00B9C5] transition-colors duration-300 cursor-pointer" 
                                    onClick={() => handleScroll("education")}
                                >
                                    المراحل التعليمية
                                </button>
                            </li>
                            <li>
                                <button 
                                    className="hover:text-[#00B9C5] transition-colors duration-300 cursor-pointer" 
                                    onClick={() => handleScroll("subs")}
                                >
                                    الباقات
                                </button>
                            </li>
                        </ul>
                    </div>

                    {/* Middle Column - Social Media */}
                    <div className="text-center">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">تواصل معنا</h3>
                        <div className="h-[2px] w-16 bg-gradient-to-r from-[#00B9C5] to-transparent mb-6 mx-auto"></div>
                        <div className="flex justify-center space-x-6">
                            <a 
                                href="#" 
                                className="text-gray-600 hover:text-red-600 transform hover:scale-110 transition-all duration-300 p-2 rounded-full hover:bg-red-50"
                            >
                                <FontAwesomeIcon icon={faYoutube} size="xl" />
                            </a>
                            <a 
                                href="#" 
                                className="text-gray-600 hover:text-blue-600 transform hover:scale-110 transition-all duration-300 p-2 rounded-full hover:bg-blue-50"
                            >
                                <FontAwesomeIcon icon={faFacebook} size="xl" />
                            </a>
                            <a 
                                href="#" 
                                className="text-gray-600 hover:text-blue-400 transform hover:scale-110 transition-all duration-300 p-2 rounded-full hover:bg-blue-50"
                            >
                                <FontAwesomeIcon icon={faTwitter} size="xl" />
                            </a>
                            <a 
                                href="#" 
                                className="text-gray-600 hover:text-pink-600 transform hover:scale-110 transition-all duration-300 p-2 rounded-full hover:bg-pink-50"
                            >
                                <FontAwesomeIcon icon={faInstagram} size="xl" />
                            </a>
                        </div>
                    </div>

                    {/* Left Column - Download Apps */}
                    <div className="text-center md:text-left">
                        <h4 className="text-lg font-bold text-gray-800 mb-4">حمل التطبيق</h4>
                        <div className="h-[2px] w-16 bg-gradient-to-r from-[#00B9C5] to-transparent mb-6 mx-auto md:mx-0"></div>
                        <div className="flex flex-col space-y-3 items-center md:items-start">
                            <a href="#" className="transform hover:scale-105 transition-transform duration-300">
                                <img src="/Google_Play.png" alt="Google Play" className="h-12 w-auto" />
                            </a>
                            <a href="#" className="transform hover:scale-105 transition-transform duration-300">
                                <img src="/app_store.png" alt="App Store" className="h-12 w-auto" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                    <div className="flex flex-col md:flex-row justify-between items-center text-gray-600 text-sm">
                        <p className="mb-4 md:mb-0">© 2025 أدرس. جميع الحقوق محفوظة</p>
                        <div className="flex space-x-6 rtl:space-x-reverse">
                            <a href="#" className="hover:text-[#00B9C5] transition-colors">سياسة الخصوصية</a>
                            <a href="#" className="hover:text-[#00B9C5] transition-colors">الشروط والأحكام</a>
                            <a href="#" className="hover:text-[#00B9C5] transition-colors">اتصل بنا</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;