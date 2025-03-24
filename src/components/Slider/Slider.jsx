import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";

const Slider = ({products}) => {
    return (
        <Swiper
            modules={[Autoplay, FreeMode]}
            freeMode={true}
            dir={"rtl"}
            autoplay={{
                delay: 1000, // Continuous movement
                disableOnInteraction: false,
                pauseOnMouseEnter: true, // Pause on hover
            }}
            speed={3000} // Controls scrolling speed
            loop={true} // Infinite loop
            grabCursor={true} // Enables drag-scroll
            slidesPerView="auto" // Multiple cards visible
            spaceBetween={10} // ✅ Reduce space between slides
            className="w-screen flex justify-center items-center"
        >
            {products.map((product) => (
                <SwiperSlide
                    key={product.id}
                    className="max-w-[750px]" // ✅ Controls slide width
                >
                    <div className="w-full bg-white my-6 rounded-[12px] shadow-amber-50">
                        <img
                            src={product.image}
                            alt={product.title}
                            className="rounded-lg w-[87%] lg:w-full h-auto object-cover"
                        />
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default Slider;
