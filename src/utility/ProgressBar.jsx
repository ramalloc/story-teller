const ProgressBar = ({ widthPercent, key }) => (
  <div key={key} className="flex-1 h-1 bg-gray-700 rounded overflow-hidden">
    <div className="h-full bg-white transition-all ease-linear" style={{ width: `${widthPercent}%` }} />
  </div>
);

export default ProgressBar;
