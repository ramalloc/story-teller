import { useState } from "react";
import { storiesData } from "../../constants/dataKeys";
import StoryViewer from "./StoryViewer";
import StoryBoard from "../story-board/StoryBoard";

const Welcome = () => {
    const [activeStory, setActiveStory] = useState(null);

    // Handle clicking on a story preview
    const handleStoryClick = (story) => {
        setActiveStory(story);
    };

    // Handle closing the story viewer
    const handleCloseViewer = () => {
        setActiveStory(null);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
            {/* Title */}
            <h1 className="text-3xl font-bold mb-8 text-center">
                Welcome to Our Stories
            </h1>

            {/* Story Circles */}
            <div className="flex items-center gap-6 flex-wrap justify-center px-4 max-w-full">
                {storiesData.map((story) => (
                    <StoryBoard
                        key={story.id} // Always include a unique key when mapping
                        story={story}
                        handleStoryClick={handleStoryClick}
                    />
                ))}
            </div>

            {/* Fullscreen Story Viewer */}
            {activeStory && (
                <StoryViewer
                    story={activeStory}
                    onClose={handleCloseViewer}
                />
            )}
        </div>
    );
};

export default Welcome;
