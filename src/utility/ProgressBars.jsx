import ProgressBar from "./ProgressBar";

// This component shows the little progress bars at the top,
// one for each slide in the story
const ProgressBars = ({ slidesLength, currentIndex, progress }) => {
    return (
        <div className="absolute top-2 left-0 right-0 flex space-x-1 px-2 z-40">
            {/* Loop through all slides and create a progress bar for each */}
            {Array.from({ length: slidesLength }).map((_, index) => {
                let widthPercent = 0;

                // If this slide already played, fill the bar 100%
                if (index < currentIndex) {
                    widthPercent = 100;
                }
                // If this is the current slide, fill it according to progress
                else if (index === currentIndex) {
                    widthPercent = progress;
                }
                // Otherwise, bar stays empty (0%)

                return <ProgressBar key={index} widthPercent={widthPercent} />;
            })}
        </div>
    );
};

export default ProgressBars;
