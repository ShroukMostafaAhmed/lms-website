import React from 'react';
import {Outlet, ScrollRestoration, useLocation} from "react-router-dom";
import Header from "./components/main/Header.jsx";
import Footer from "./components/main/Footer.jsx";
import Sidebar from "./components/main/Sidebar.jsx";

function AppLayout() {
    // use location pathname
    const location = useLocation()

    return (
        <>
            <ScrollRestoration/>
            <div className="w-full">
                <div dir="rtl" className="flex flex-row min-h-full gap-3">
                    {location.pathname !== "/login" && location.pathname !== '/register' && (
                        <Sidebar />
                    )}
                    <div className={`w-full `}>
                        <Header/>
                        <div dir="rtl" className="w-full">
                            <Outlet />
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        </>
    );
}

export default AppLayout;