import React, { useEffect, useState, useRef } from "react";

const StoryViewer = ({ story, onClose }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [paused, setPaused] = useState(false);
    const intervalRef = useRef(null);
    const startTimeRef = useRef(null);
    const elapsedTimeRef = useRef(0);

    const SLIDE_DURATION = 3000;
    const PROGRESS_UPDATE_INTERVAL = 50;

    useEffect(() => {
        setProgress(0);
        elapsedTimeRef.current = 0;
        startTimeRef.current = Date.now();
    }, [currentIndex]);

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

    const togglePause = () => setPaused((p) => !p);

    const goPrev = () => {
        if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
    };

    const goNext = () => {
        if (currentIndex < story.slides.length - 1) {
            setCurrentIndex((prev) => prev + 1);
        } else {
            onClose();
        }
    };

    const currentSlide = story.slides[currentIndex];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center flex-col px-4">
            {/* Close button */}
            <button
                onClick={onClose}
                className="absolute top-5 right-5 text-white text-4xl font-bold hover:text-gray-300 transition z-50"
                aria-label="Close Story"
            >
                &times;
            </button>

            <div className="relative max-w-md w-full flex items-center justify-center p-10">
                {/* Left arrow */}
                <button
                    onClick={goPrev}
                    disabled={currentIndex === 0}
                    className={`absolute left-10 top-1/2 -translate-y-1/2 text-white text-3xl px-3 py-1 rounded bg-gray-800 bg-opacity-50 hover:bg-opacity-80 transition disabled:opacity-30 disabled:cursor-not-allowed z-20`}
                    aria-label="Previous Slide"
                >
                    &#8592;
                </button>

                <div className="relative flex-1">
                    {/* Progress bars overlay on top */}
                    <div className="absolute top-2 left-0 right-0 flex space-x-1 px-2 z-40">
                        {story.slides.map((_, index) => {
                            let widthPercent = 0;
                            if (index < currentIndex) widthPercent = 100;
                            else if (index === currentIndex) widthPercent = progress;
                            else widthPercent = 0;

                            return (
                                <div
                                    key={index}
                                    className="flex-1 h-1 bg-gray-700 rounded overflow-hidden"
                                >
                                    <div
                                        className="h-full bg-white transition-all ease-linear"
                                        style={{ width: `${widthPercent}%` }}
                                    />
                                </div>
                            );
                        })}
                    </div>

                    <img
                        src={currentSlide.image}
                        alt={story.name}
                        className="rounded-xl w-full object-cover select-none"
                    />
                    {/* Pause button */}
                    <button
                        onClick={togglePause}
                        className="absolute top-5 right-2 w-10 h-10 flex items-center justify-center text-white text-lg rounded-full bg-gray-800 bg-opacity-50 hover:bg-opacity-80 transition z-50"
                        aria-label={paused ? 'Resume Story' : 'Pause Story'}
                    >
                        {
                            paused
                                ? '▶'
                                : <span className="font-bold">Ⅱ</span>
                        }
                    </button>

                </div>

                {/* Right arrow */}
                <button
                    onClick={goNext}
                    disabled={currentIndex === story.slides.length - 1}
                    className={`absolute right-10 top-1/2 -translate-y-1/2 text-white text-3xl px-3 py-1 rounded bg-gray-800 bg-opacity-50 hover:bg-opacity-80 transition disabled:opacity-30 disabled:cursor-not-allowed z-20`}
                    aria-label="Next Slide"
                >
                    &#8594;
                </button>
            </div>
            {currentSlide.button_text && (
                <a
                    href={currentSlide.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-20 text-white px-4 py-2 rounded-md shadow z-50"
                >
                    {currentSlide.button_text}
                </a>
            )}


        </div>
    );
};

export default StoryViewer;
