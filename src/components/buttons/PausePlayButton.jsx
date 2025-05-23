import React from "react";

const PausePlayButton = ({ paused, onToggle }) => {
    return (
        <button
            onClick={onToggle}
            className="absolute top-5 right-2 w-10 h-10 flex items-center justify-center text-white text-lg rounded-full bg-gray-800 bg-opacity-50 hover:bg-opacity-80 transition z-50"
            aria-label={paused ? 'Resume Story' : 'Pause Story'}
        >
            {paused ? '▶' : <span className="font-bold">Ⅱ</span>}
        </button>
    );
};

export default PausePlayButton;
