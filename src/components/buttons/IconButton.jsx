const IconButton = ({ onClick, disabled, className, children, ariaLabel }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`text-white text-3xl px-3 py-1 rounded bg-gray-800 bg-opacity-50 hover:bg-opacity-80 transition disabled:opacity-30 disabled:cursor-not-allowed ${className}`}
    aria-label={ariaLabel}
  >
    {children}
  </button>
);

export default IconButton;
