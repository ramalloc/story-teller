const SlideActionButton = ({ text, link }) => {
    if (!text) return null;

    return (
        <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-20 text-white px-4 py-2 rounded-md shadow z-50"
        >
            {text}
        </a>
    );
};

export default SlideActionButton;
