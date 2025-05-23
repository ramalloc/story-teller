const StoryBoard = ({ story, handleStoryClick }) => {
    return (
        // Container for each story circle with clickable behavior
        <div
            key={story.id} // Unique key for React list rendering (usually better to move key to parent map)
            onClick={() => handleStoryClick(story)} // Call parent handler when clicked
            className="cursor-pointer flex flex-col items-center mx-2"
        >
            {/* Circle with colored border (ring) around the thumbnail */}
            <div
                className="w-20 h-20 rounded-full flex items-center justify-center border-4"
                style={{ borderColor: story.ringColor }} // Dynamic border color from story data
            >
                {/* Thumbnail image inside the circle */}
                <img
                    src={story.thumbnail}
                    alt={story.name}
                    className="w-16 h-16 rounded-full object-cover"
                />
            </div>

            {/* Story name below the circle */}
            <p
                className="mt-2 text-xs font-medium text-center max-w-[4rem] truncate"
                style={{ color: story.nameColor }} // Dynamic text color from story data
            >
                {story.name}
            </p>
        </div>
    );
};

export default StoryBoard;
