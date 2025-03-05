import { useRef, useState } from "react";
import { Play, Pause, Maximize, Volume2 } from "lucide-react";
import {formatTime} from "../../utils/FormatTime.js";

export default function VideoPlayer() {
    const videoRef = useRef(null);
    const [playing, setPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    const togglePlay = () => {
        if (videoRef.current.paused) {
            videoRef.current.play();
            setPlaying(true);
        } else {
            videoRef.current.pause();
            setPlaying(false);
        }
    };

    const handleTimeUpdate = () => {
        setCurrentTime(videoRef.current.currentTime);
        setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100);
    };

    const handleLoadedMetadata = () => {
        setDuration(videoRef.current.duration);
    };

    return (
        <div className="relative w-full max-w-5xl rounded-2xl overflow-hidden">
            <video
                ref={videoRef}
                className="w-full"
                autoPlay={true}
                src="https://www.w3schools.com/html/mov_bbb.mp4"
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
            ></video>

            {/* Controls */}
            <div dir="ltr" className="absolute bottom-0 left-0 w-full p-3 flex items-center justify-between flex-row">
                {/* Play/Pause */}
                <button onClick={togglePlay} className="text-white">
                    {playing ? <Pause size={24} /> : <Play size={24} />}
                </button>

                {/* Progress Bar */}
                <div className="flex-1 mx-3">
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={progress}
                        onChange={(e) => (videoRef.current.currentTime = (e.target.value / 100) * duration)}
                        className="w-full h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer rtl:direction-ltr"
                    />
                </div>

                {/* Time */}
                <span className="text-white text-sm">{formatTime(currentTime)} / {formatTime(duration)}</span>

                {/* Volume & Fullscreen */}
                <div className="flex gap-3">
                    <button className="text-blue-400"><Volume2 size={20} /></button>
                    <button onClick={() => videoRef.current.requestFullscreen()} className="text-blue-400"><Maximize size={20} /></button>
                </div>
            </div>
        </div>
    );
}