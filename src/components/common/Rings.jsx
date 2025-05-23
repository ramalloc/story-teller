const Rings = ({ story, handleStoryClick }) => {
    return (
        <div
            key={story.id}
            onClick={() => handleStoryClick(story)}
            className="cursor-pointer flex flex-col items-center mx-2"
        >
            <div
                className="w-20 h-20 rounded-full flex items-center justify-center border-4"
                style={{ borderColor: story.ringColor }}
            >
                <img
                    src={story.thumbnail}
                    alt={story.name}
                    className="w-16 h-16 rounded-full object-cover"
                />
            </div>
            <p
                className="mt-2 text-xs font-medium text-center max-w-[4rem] truncate"
                style={{ color: story.nameColor }}
            >
                {story.name}
            </p>
        </div>
    )
}

export default Rings