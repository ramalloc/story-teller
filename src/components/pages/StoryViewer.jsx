import { useEffect, useState, useRef } from "react";
import IconButton from "../buttons/IconButton";
import ProgressBars from "../../utility/ProgressBars";
import PausePlayButton from "../buttons/PausePlayButton";
import SlideActionButton from "../buttons/SlideActionButton";

const SLIDE_DURATION = 3000;
const PROGRESS_UPDATE_INTERVAL = 50;

const StoryViewer = ({ story, onClose }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [paused, setPaused] = useState(false);

    const intervalRef = useRef(null);
    const startTimeRef = useRef(null);
    const elapsedTimeRef = useRef(0);

    const currentSlide = story.slides[currentIndex];

    // Reset progress when slide changes
    useEffect(() => {
        setProgress(0);
        elapsedTimeRef.current = 0;
        startTimeRef.current = Date.now();
    }, [currentIndex]);

    // Handle slide progress animation
    useEffect(() => {
        if (paused) {
            clearInterval(intervalRef.current);
            elapsedTimeRef.current += Date.now() - startTimeRef.current;
            return;
        }

        startTimeRef.current = Date.now() - elapsedTimeRef.current;

        intervalRef.current = setInterval(() => {
            const now = Date.now();
            const elapsed = now - startTimeRef.current + elapsedTimeRef.current;
            const nextProgress = (elapsed / SLIDE_DURATION) * 100;

            if (nextProgress >= 100) {
                clearInterval(intervalRef.current);
                if (currentIndex < story.slides.length - 1) {
                    setCurrentIndex((prev) => prev + 1);
                } else {
                    onClose();
                }
            } else {
                setProgress(nextProgress);
            }
        }, PROGRESS_UPDATE_INTERVAL);

        return () => clearInterval(intervalRef.current);
    }, [paused, currentIndex, story.slides.length, onClose]);

    // Pause/play toggle
    const togglePause = () => setPaused((prev) => !prev);

    // Navigate to previous slide
    const goPrev = () => {
        if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
    };

    // Navigate to next slide or close
    const goNext = () => {
        if (currentIndex < story.slides.length - 1) {
            setCurrentIndex((prev) => prev + 1);
        } else {
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center flex-col px-4">
            {/* Close Button */}
            <IconButton
                onClick={onClose}
                className="absolute top-5 right-5 text-white text-4xl font-bold hover:text-gray-300 transition z-50"
                aria-label="Close Story"
            >
                &times;
            </IconButton>

            <div className="relative max-w-md w-full flex items-center justify-center p-10">
                {/* Previous Slide Button */}
                <IconButton
                    onClick={goPrev}
                    disabled={currentIndex === 0}
                    className="absolute left-10 top-1/2 -translate-y-1/2 text-white text-3xl px-3 py-1 rounded bg-gray-800 bg-opacity-50 hover:bg-opacity-80 transition disabled:opacity-30 disabled:cursor-not-allowed z-20"
                    aria-label="Previous Slide"
                >
                    &#8592;
                </IconButton>

                <div className="relative flex-1">
                    {/* Progress Bars */}
                    <ProgressBars
                        slidesLength={story.slides.length}
                        currentIndex={currentIndex}
                        progress={progress}
                    />

                    {/* Slide Image */}
                    <img
                        src={currentSlide.image}
                        alt={story.name}
                        className="rounded-xl w-full object-cover select-none"
                    />

                    {/* Pause/Play Button */}
                    <PausePlayButton paused={paused} onToggle={togglePause} />
                </div>

                {/* Next Slide Button */}
                <IconButton
                    onClick={goNext}
                    disabled={currentIndex === story.slides.length - 1}
                    className="absolute right-10 top-1/2 -translate-y-1/2 text-white text-3xl px-3 py-1 rounded bg-gray-800 bg-opacity-50 hover:bg-opacity-80 transition disabled:opacity-30 disabled:cursor-not-allowed z-20"
                    aria-label="Next Slide"
                >
                    &#8594;
                </IconButton>
            </div>

            {/* Optional Slide Action Button (CTA) */}
            <SlideActionButton
                text={currentSlide?.button_text}
                link={currentSlide?.link}
            />
        </div>
    );
};

export default StoryViewer;
