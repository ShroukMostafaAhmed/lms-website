import { useNavigate } from "react-router-dom";

export default function VideoCard({ video }) {
    const navigate = useNavigate();

    return (
        <div
            className="w-[80%] md:w-[46%] lg:w-[24%] xl:w-[30%] hover:scale-105 transition-transform duration-300 ease-in-out rounded-lg shadow-lg overflow-hidden cursor-pointer"
            onClick={() => navigate(`${video.href}`, { state: { id: video.id, title: video.title } })}
        >
            {/* Image Container with Play Button Overlay */}
            <div className="relative">
                <img
                    src={video.img}
                    alt="Video Thumbnail"
                    className="w-full aspect-video object-cover"
                />
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                    <button className="bg-white p-3 rounded-full shadow-lg">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-8 h-8 text-gray-700"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 3l14 9-14 9V3z"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Text Content */}
            <div className="p-4">
                <h3 className="text-lg font-semibold truncate">{video.title}</h3>
                <p className="text-gray-600 text-sm mt-1 line-clamp-2">{video.desc}</p>
            </div>
        </div>
    );
}