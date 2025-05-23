
const CloseButton = ({ onClick }) => (
    <button
        onClick={onClick}
        className="absolute top-5 right-5 text-white text-4xl font-bold hover:text-gray-300 transition z-50"
        aria-label="Close Story"
    >
        &times;
    </button>
);

export default CloseButton;
