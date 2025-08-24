import React from 'react';
import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import Header from "./components/main/Header.jsx";
import Footer from "./components/main/Footer.jsx";
// import Sidebar from "./components/main/Sidebar.jsx"; // ❌ معلق مؤقتًا

function AppLayout() {
    const location = useLocation();
    const hideSidebar = location.pathname === "/login" || location.pathname === "/register";

    return (
        <>
            <ScrollRestoration />
            <div className="w-full min-h-screen flex flex-col">

                {/* ✅ الهيدر */}
                <Header />

                {/* ✅ المحتوى الرئيسي */}
                <div dir="rtl" className="flex flex-col lg:flex-row flex-1 relative">

                    {/* ✅ السايدبار - تم تعليقه مؤقتًا */}
                    {/* {!hideSidebar && (
                        <aside className="hidden lg:block w-[250px] shrink-0 z-50">
                            <Sidebar />
                        </aside>
                    )} */}

                    {/* ✅ منطقة المحتوى مع padding-top ثابت */}
                    <main className="w-full transition-all duration-300 pt-15 px-0">
                        <Outlet />
                    </main>
                </div>

                {/* ✅ الفوتر */}
                <Footer />
            </div>
        </>
    );
}

export default AppLayout;
