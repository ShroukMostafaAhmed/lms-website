import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { PlayCircle, Trash2, CheckCircle, Clock1 } from 'lucide-react';

export default function LessonsSlider({ lessons }) {
    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">دروسك / الرياضيات</h2>
            <Swiper
                spaceBetween={10}
                breakpoints={{
                    1024: { slidesPerView: 3, spaceBetween: 20 },
                    640: { slidesPerView: 2, spaceBetween: 15 },
                    0: { slidesPerView: 1, spaceBetween: 10 }
                }}
                className="overflow-hidden"
                centeredSlides={false}
                slidesPerView={'auto'}
            >
                {lessons.map((lesson) => (
                    <SwiperSlide key={lesson.id} className="max-w-[90%] sm:max-w-[80%] lg:max-w-[30%]">
                        <div className="relative bg-white shadow-lg rounded-lg overflow-hidden mx-auto">
                            <div className="relative">
                                <img src={lesson.image} alt="Lesson" className="w-full h-fit object-cover" />
                                <button className="absolute top-2 left-2 bg-red-500 p-1 rounded-full">
                                    <Trash2 size={18} color="white" />
                                </button>
                                <button className="absolute inset-0 flex items-center justify-center">
                                    <PlayCircle size={50} className="text-white" />
                                </button>
                            </div>
                            <div className="p-3 text-right flex flex-col gap-2 sm:gap-4">
                                <h3 className="text-blue-500 font-normal text-[12px] sm:text-[14px] lg:text-[20px]">{lesson.title}</h3>
                                <p className="font-normal text-[12px] sm:text-[14px] lg:text-[20px]">{lesson.description}</p>
                                <p className="text-xs sm:text-sm text-blue-400 flex items-center gap-2 sm:gap-3"><Clock1/> {lesson.duration}</p>
                            </div>
                            <div className="p-2 flex justify-end">
                                {lesson.completed ? (
                                    <img src="/true2.png" alt="true2" className={"w-4 h-4"}/>
                                ) : (
                                    <CheckCircle className="text-gray-400" size={18} />
                                )}
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}