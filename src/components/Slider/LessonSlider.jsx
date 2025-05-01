import { useState, useRef, useEffect } from 'react';
import { PlayCircle, Trash2, CheckCircle, Clock1, ChevronLeft, ChevronRight } from 'lucide-react';

export default function LessonsSlider({ lessons = [
  {
    id: 1,
    title: "حساب المثلثات",
    description: "تعلم أساسيات حساب المثلثات والزوايا",
    duration: "30 دقيقة",
    image: "/api/placeholder/400/320",
    completed: true
  },
  {
    id: 2,
    title: "الجبر الخطي",
    description: "مفاهيم أساسية في الجبر الخطي والمصفوفات",
    duration: "45 دقيقة",
    image: "/api/placeholder/400/320",
    completed: false
  },
  {
    id: 3,
    title: "حساب التفاضل والتكامل",
    description: "دروس متقدمة في التفاضل والتكامل",
    duration: "60 دقيقة",
    image: "/api/placeholder/400/320",
    completed: false
  },
  {
    id: 4,
    title: "الإحصاء والاحتمالات",
    description: "مقدمة في علم الإحصاء والاحتمالات",
    duration: "40 دقيقة",
    image: "/api/placeholder/400/320",
    completed: false
  }
] }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const sliderRef = useRef(null);
    
    // Check if screen is mobile size
    useEffect(() => {
        const checkIsMobile = () => {
            setIsMobile(window.innerWidth < 640);
        };
        
        // Initial check
        checkIsMobile();
        
        // Add event listener for resize
        window.addEventListener('resize', checkIsMobile);
        
        // Cleanup
        return () => window.removeEventListener('resize', checkIsMobile);
    }, []);

    const handlePrevious = () => {
        setCurrentIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : 0));
    };
    
    const handleNext = () => {
        setCurrentIndex(prevIndex => (prevIndex < lessons.length - 1 ? prevIndex + 1 : prevIndex));
    };

    return (
        <div className="p-4 space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">دروسك</h2>
                
                {/* Navigation buttons - only show on mobile */}
                {isMobile && (
                    <div className="flex space-x-2">
                        <button 
                            onClick={handlePrevious}
                            disabled={currentIndex === 0}
                            className={`p-1 rounded-full ${currentIndex === 0 ? 'text-gray-300' : 'text-blue-500'}`}
                        >
                            <ChevronRight size={24} />
                        </button>
                        <button 
                            onClick={handleNext}
                            disabled={currentIndex === lessons.length - 1}
                            className={`p-1 rounded-full ${currentIndex === lessons.length - 1 ? 'text-gray-300' : 'text-blue-500'}`}
                        >
                            <ChevronLeft size={24} />
                        </button>
                    </div>
                )}
            </div>
            
            {/* Card container */}
            <div ref={sliderRef} className="relative">
                {/* Mobile view (one card only) */}
                {isMobile ? (
                    <div className="w-full flex justify-center">
                        <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-xs">
                            <div className="relative">
                                <img src={lessons[currentIndex].image} alt="Lesson" className="w-full h-48 object-cover" />
                                <button className="absolute top-2 left-2 bg-red-500 p-1 rounded-full">
                                    <Trash2 size={16} color="white" />
                                </button>
                                <button className="absolute inset-0 flex items-center justify-center">
                                    <PlayCircle size={40} className="text-white opacity-90" />
                                </button>
                            </div>
                            <div className="p-3 text-right flex flex-col gap-2">
                                <h3 className="text-blue-500 font-medium text-lg">{lessons[currentIndex].title}</h3>
                                <p className="font-normal text-sm text-gray-600 line-clamp-2">{lessons[currentIndex].description}</p>
                                <p className="text-xs text-blue-400 flex items-center gap-2">
                                    <Clock1 size={14} /> {lessons[currentIndex].duration}
                                </p>
                            </div>
                            <div className="p-2 flex justify-end">
                                {lessons[currentIndex].completed ? (
                                    <img src="/true2.png" alt="true2" className="w-4 h-4" />
                                ) : (
                                    <CheckCircle className="text-gray-400" size={16} />
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    // Desktop view (multiple cards)
                    <div className="flex overflow-x-auto pb-4 gap-5 scrollbar-hide">
                        <style jsx>{`
                            .scrollbar-hide::-webkit-scrollbar {
                                display: none;
                            }
                        `}</style>
                        
                        {lessons.map((lesson) => (
                            <div 
                                key={lesson.id} 
                                className="flex-shrink-0 bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-xs"
                            >
                                <div className="relative">
                                    <img src={lesson.image} alt="Lesson" className="w-full h-48 object-cover" />
                                    <button className="absolute top-2 left-2 bg-red-500 p-1 rounded-full">
                                        <Trash2 size={16} color="white" />
                                    </button>
                                    <button className="absolute inset-0 flex items-center justify-center">
                                        <PlayCircle size={40} className="text-white opacity-90" />
                                    </button>
                                </div>
                                <div className="p-3 text-right flex flex-col gap-2">
                                    <h3 className="text-blue-500 font-medium text-lg">{lesson.title}</h3>
                                    <p className="font-normal text-sm text-gray-600 line-clamp-2">{lesson.description}</p>
                                    <p className="text-xs text-blue-400 flex items-center gap-2">
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
                        ))}
                    </div>
                )}
            </div>
            
            {/* Add pagination indicator for mobile */}
            {isMobile && (
                <div className="flex justify-center mt-4">
                    {lessons.map((_, index) => (
                        <div 
                            key={index}
                            className={`w-2 h-2 mx-1 rounded-full ${currentIndex === index ? 'bg-blue-500' : 'bg-gray-300'}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}