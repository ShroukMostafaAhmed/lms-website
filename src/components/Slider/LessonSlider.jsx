import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { PlayCircle, Trash2, CheckCircle, Clock1 } from 'lucide-react';

export default function LessonsSlider({ lessons }) {
    return (
        <div className="p-4 space-y-4">
            <h2 className="text-xl font-bold">دروسك / الرياضيات</h2>
            <Swiper
                spaceBetween={10}
                slidesPerView={1.28} // Slightly more than 1 to show a peek of next card
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 15,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    }
                }}
                centeredSlides={false}
                watchSlidesProgress={true}
                slideToClickedSlide={true}
                className="overflow-visible" // Changed to visible to allow card shadows to show
            >
                {lessons.map((lesson) => (
                    <SwiperSlide key={lesson.id}>
                        <div className="relative bg-white shadow-lg rounded-lg overflow-hidden mx-auto w-[85%] sm:w-full md:w-full lg:w-full max-w-[320px] sm:max-w-none">
                            <div className="relative">
                                <img src={lesson.image} alt="Lesson" className="w-full h-[120px] sm:h-[190px] object-cover" />
                                <button className="absolute top-2 left-2 bg-red-500 p-1 rounded-full">
                                    <Trash2 size={16} color="white" />
                                </button>
                                <button className="absolute inset-0 flex items-center justify-center">
                                    <PlayCircle size={40} className="text-white opacity-90" />
                                </button>
                            </div>
                            <div className="p-3 text-right flex flex-col gap-1 sm:gap-2">
                                <h3 className="text-blue-500 font-medium text-sm sm:text-base lg:text-lg">{lesson.title}</h3>
                                <p className="font-normal text-xs sm:text-sm text-gray-600 line-clamp-2">{lesson.description}</p>
                                <p className="text-xs text-blue-400 flex items-center gap-1 sm:gap-2">
                                    <Clock1 size={14} /> {lesson.duration}
                                </p>
                            </div>
                            <div className="p-2 flex justify-end">
                                {lesson.completed ? (
                                    <img src="/true2.png" alt="true2" className="w-4 h-4" />
                                ) : (
                                    <CheckCircle className="text-gray-400" size={16} />
                                )}
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}