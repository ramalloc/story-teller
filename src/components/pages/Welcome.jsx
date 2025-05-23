import { useState } from "react";
import { storiesData } from "../../constants/dataKeys";
import StoryViewer from "../common/StoryViewer";
import Rings from "../common/Rings";

const Welcome = () => {
    const [activeStory, setActiveStory] = useState(null);


    const handleStoryClick = (story) => {
        setActiveStory(story);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
            {/* Welcome Line */}
            <h1 className="text-3xl font-bold mb-8 text-center">Welcome to Our Stories</h1>

            {/* Story Circles - Horizontal Line */}
            <div className="flex items-center gap-6 flex-wrap justify-center px-4 max-w-full">
                {storiesData.map((story) => (
                   <Rings story={story} handleStoryClick={handleStoryClick}/>
                ))}
            </div>

            {/* Story Viewer */}
            {activeStory && (
                <StoryViewer
                    story={activeStory}
                    onClose={() => setActiveStory(null)}
                />
            )}
        </div>
    );
};

export default Welcome;