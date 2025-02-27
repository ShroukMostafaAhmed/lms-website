import React from 'react';
import {Outlet} from "react-router-dom";
import Header from "./components/main/Header.jsx";
import Footer from "./components/main/Footer.jsx";

function AppLayout() {
    return (
        <>
            <div className="w-full">
                <Header/>
                <div className="w-full">
                    <Outlet />
                </div>
                <Footer/>
            </div>
        </>
    );
}

export default AppLayout;