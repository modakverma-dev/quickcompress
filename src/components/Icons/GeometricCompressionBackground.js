export default function GeometricCompressionBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        className="w-full h-full"
        viewBox="0 0 1000 300"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4a90e2" stopOpacity="0" />
            <stop offset="100%" stopColor="#4a90e2" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect width="1000" height="300" fill="url(#grad1)" />
        <g fill="none" stroke="#4a90e2" strokeWidth="0.5">
          {[...Array(20)].map((_, i) => (
            <path
              key={i}
              d={`M${i * 50},0 L${1000 - i * 50},300`}
              opacity={1 - i * 0.05}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
