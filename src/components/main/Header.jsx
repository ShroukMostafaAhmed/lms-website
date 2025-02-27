import React, { useState } from 'react';
import { GoArrowUpLeft } from "react-icons/go";
import { FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleScroll = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="flex items-center justify-between px-4 lg:px-12 pt-4 bg-white relative">
            <div dir="rtl" className="flex items-center justify-between w-full px-4 lg:px-20 py-2 rounded-full shadow-sm">
                {/* Logo - center on mobile, right on desktop */}
                <div className="order-2 lg:order-1" onClick={() => handleScroll("hero")}>
                    <img
                        src="/logo.png"
                        alt="Adrees Logo"
                        className="h-10 w-10 lg:h-16 lg:w-16 cursor-pointer"
                    />
                </div>

                {/* Burger Menu - first on mobile, hidden on desktop */}
                <div className="order-1 lg:hidden">
                    <button onClick={toggleMenu} className="text-gray-700 focus:outline-none">
                        {isMenuOpen ? (
                            <FiX className="h-6 w-6" />
                        ) : (
                            <FiMenu className="h-6 w-6" />
                        )}
                    </button>
                </div>

                {/* Navigation for desktop */}
                <nav dir="rtl" className="order-2 hidden lg:flex items-center space-x-8 text-gray-700">
                    <button onClick={() => handleScroll("hero")} className="font-normal text-[16px] leading-[22.4px] text-[#001F3F] cursor-pointer">الرئيسية</button>
                    <button onClick={() => handleScroll("whyUs")} className="font-normal text-[16px] leading-[22.4px] text-[#001F3F] cursor-pointer">لماذا نحن</button>
                    <button onClick={() => handleScroll("education")} className="font-normal text-[16px] leading-[22.4px] text-[#001F3F] cursor-pointer">المراحل</button>
                    <button onClick={() => handleScroll("subs")} className="font-normal text-[16px] leading-[22.4px] text-[#001F3F] cursor-pointer">الباقات</button>
                </nav>

                {/* Buttons - last on mobile, first on desktop */}
                <div dir="rtl" className="order-3 lg:order-3 flex items-center space-x-2 lg:space-x-8">
                    <button className="py-1 px-2 lg:py-2 lg:px-4 text-xs lg:text-base bg-white hover:bg-blue-500 text-blue-500 hover:text-white border border-[#1E78EB] rounded-full flex items-center cursor-pointer">
                        <span>تسجيل دخول</span>
                        <GoArrowUpLeft className="ml-1 h-3 w-3 lg:h-4 lg:w-4" />
                    </button>

                    <button className="py-1 px-2 lg:py-2 lg:px-4 text-xs lg:text-base bg-blue-500 hover:bg-white hover:text-blue-500 border border-[#1E78EB] text-white rounded-full flex items-center cursor-pointer">
                        <span>إنشاء حساب</span>
                        <GoArrowUpLeft className="ml-1 h-3 w-3 lg:h-4 lg:w-4" />
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Menu - animated with framer-motion */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="absolute top-full left-0 right-0 bg-white shadow-md z-50 lg:hidden"
                    >
                        <nav dir="rtl" className="flex flex-col items-start p-4">
                            <button onClick={() => handleScroll("hero")} className="py-2 text-gray-700 cursor-pointer">الرئيسية</button>
                            <button onClick={() => handleScroll("whyUs")} className="py-2 text-gray-700 cursor-pointer">لماذا نحن</button>
                            <button onClick={() => handleScroll("education")} className="py-2 text-gray-700 cursor-pointer">المراحل</button>
                            <button onClick={() => handleScroll("subs")} className="py-2 text-gray-700 cursor-pointer">الباقات</button>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;