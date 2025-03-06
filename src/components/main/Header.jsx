import React, { useState } from "react";
import { GoArrowUpLeft } from "react-icons/go";
import { useLocation, useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const handleScroll = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className={`flex items-center max-w-screen-xl mr-0 lg:w-[80%] md:w-[70%] sm:w-[60%] w-[50%] justify-between ${(location.pathname === "/login" || location.pathname === "/register") ? "px-4 md:px-3 lg:px-12" : ""} pt-2 bg-white relative`}>
            <div dir="rtl" className={`flex items-center justify-between w-full ${(location.pathname === "/login" || location.pathname === "/register") ? "px-4 md:px-3 lg:px-12 rounded-full" : "px-4"} py-2`}>

                {/* Logo */}
                {(location.pathname === "/login" || location.pathname === "/register") && (
                    <div className="order-2 lg:order-1" onClick={() => navigate("/")}>
                        <img src="/logo.png" alt="Adrees Logo" className="h-10 w-10 lg:h-16 lg:w-16 cursor-pointer" />
                    </div>
                )}

                {(location.pathname !== "/login" && location.pathname !== "/register") && (
                    <h2 className="font-bold text-[18px] lg:text-[32px] leading-[44.8px] text-[#001F3F]">الرئيسية</h2>
                )}

                {/* Search Section */}
                {(location.pathname !== "/login" && location.pathname !== "/register") && (
                    <div className="relative">
                        {/* Search Icon - Only on Small Screens */}
                        {!isSearchOpen && (
                            <button onClick={() => setIsSearchOpen(true)} className="md:hidden text-gray-600">
                                <Search size={24} />
                            </button>
                        )}

                        {/* Search Bar - Only on Small Screens When Open */}
                        {isSearchOpen && (
                            <div className="relative right-10 top-0 w-[160px] flex items-center bg-white border border-gray-300 rounded-full p-2 shadow-md md:hidden">
                                <input
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="ابحث..."
                                    className="w-full bg-transparent text-right focus:outline-none"
                                />
                                <button onClick={() => setIsSearchOpen(false)} className="text-gray-600 ml-2">
                                    <X size={20} />
                                </button>
                            </div>
                        )}

                        {/* Search Bar - Always Visible on Medium & Large Screens */}
                        {!isSearchOpen && (
                            <div className="hidden md:block relative w-fit">
                                <input
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="ابحث"
                                    className="w-full rounded-full border border-gray-300 bg-gray-100 px-4 py-2 pr-10 text-right text-gray-700 focus:border-blue-500 focus:bg-white focus:outline-none"
                                />
                                <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            </div>
                        )}
                    </div>
                )}

                {/* Navigation - Only on Large Screens */}
                {(location.pathname === "/login" || location.pathname === "/register") && (
                    <nav dir="rtl" className="order-2 hidden lg:flex items-center space-x-8 text-gray-700">
                        <button onClick={() => navigate("/")} className="font-normal text-[16px] leading-[22.4px] text-[#001F3F] cursor-pointer">الرئيسية</button>
                        <button onClick={() => handleScroll("whyUs")} className="font-normal text-[16px] leading-[22.4px] text-[#001F3F] cursor-pointer">لماذا نحن</button>
                        <button onClick={() => handleScroll("education")} className="font-normal text-[16px] leading-[22.4px] text-[#001F3F] cursor-pointer">المراحل</button>
                        <button onClick={() => handleScroll("subs")} className="font-normal text-[16px] leading-[22.4px] text-[#001F3F] cursor-pointer">الباقات</button>
                    </nav>
                )}

                {/* Buttons - Only on Login/Register Pages */}
                {(location.pathname === "/login" || location.pathname === "/register") && (
                    <div dir="rtl" className="order-3 lg:order-3 flex items-center space-x-2 lg:space-x-8">
                        <button onClick={() => navigate("/login")} className="py-1 px-2 lg:py-2 lg:px-4 text-xs lg:text-base bg-white hover:bg-blue-500 text-blue-500 hover:text-white border border-[#1E78EB] rounded-full flex items-center cursor-pointer">
                            <span>تسجيل دخول</span>
                            <GoArrowUpLeft className="ml-1 h-3 w-3 lg:h-4 lg:w-4" />
                        </button>

                        <button onClick={() => navigate("/register")} className="py-1 px-2 lg:py-2 lg:px-4 text-xs lg:text-base bg-blue-500 hover:bg-white hover:text-blue-500 border border-[#1E78EB] text-white rounded-full flex items-center cursor-pointer">
                            <span>إنشاء حساب</span>
                            <GoArrowUpLeft className="ml-1 h-3 w-3 lg:h-4 lg:w-4" />
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;