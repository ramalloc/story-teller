import { useEffect, useState, useRef } from "react";
import IconButton from "../buttons/IconButton";
import ProgressBars from "../../utility/ProgressBars";
import PausePlayButton from "../buttons/PausePlayButton";
import SlideActionButton from "../buttons/SlideActionButton";
import CloseButton from "../buttons/CloseButton";

const SLIDE_DURATION = 3000;
const PROGRESS_UPDATE_INTERVAL = 50;

const StoryViewer = ({ story, onClose }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [paused, setPaused] = useState(false);

    // tracks the timer interval. Holds the setInterval ID
    const intervalRef = useRef(null);

    // tracks the start time when the slide starts or resumes.Records when the current slide started/resumed
    const startTimeRef = useRef(null);

    //  keeps the accumulated time if the user pauses and resumes. Tracks how long the user has been watching 
    // the current slide (can pause/resume)
    const elapsedTimeRef = useRef(0);

    const currentSlide = story.slides[currentIndex];

    // Reset progress when slide changes
    // Whenever you change the slide (either manually or automatically), this hook:
    useEffect(() => {
        setProgress(0);
        elapsedTimeRef.current = 0; // Reset elapsed time
        startTimeRef.current = Date.now();  // Set current start time
    }, [currentIndex]);

    // Handle slide progress animation
    useEffect(() => {
        if (paused) {
            clearInterval(intervalRef.current); // Stop the interval

            // We add the time since startTimeRef to elapsedTimeRef. This saves how much time had passed 
            // before pausing. So that when it resumes the interval ref have start time
            elapsedTimeRef.current += Date.now() - startTimeRef.current;
            // It calculates the time between start and till now
            return;
        }

        // when it's resumed (not paused). This backdates the startTimeRef to when the slide originally 
        // began (accounting for the paused time), so progress doesn't jump.
        startTimeRef.current = Date.now() - elapsedTimeRef.current;
        // Stores the time frame , where from progres should start after pause


        // Every 50ms (set by PROGRESS_UPDATE_INTERVAL), this runs in every 50 ms:
        intervalRef.current = setInterval(() => {
            const now = Date.now();
            // Checks how long has passed since the slide started, including previous paused time.
            const elapsed = now - startTimeRef.current + elapsedTimeRef.current;

            // Calculates what percentage of the slide duration has elapsed.
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
            <CloseButton onClick={onClose} />

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
