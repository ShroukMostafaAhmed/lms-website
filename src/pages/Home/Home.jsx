import React from 'react';
import Slider from "../../components/Slider/Slider.jsx";

function Home() {
    // fake data for banner slider
    const products = [
        { id: 1, image: "/lms banners/b1.png", title: "منتج 1" },
        { id: 2, image: "/lms banners/b2.png", title: "منتج 2" },
        { id: 3, image: "/lms banners/b3.png", title: "منتج 3" },
        { id: 4, image: "/lms banners/b4.png", title: "منتج 4" },
        { id: 5, image: "/lms banners/b5.png", title: "منتج 5" },
    ];

    return (
        <>
            <Slider products={products}/>
        </>
    );
}

export default Home;