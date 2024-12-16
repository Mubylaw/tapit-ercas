const ProgressRing = ({
  radius,
  stroke,
  progress,
  alt,
  width,
  strokeColor,
}) => {
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  return (
    <svg height={width} width={width} className={`${alt ? "alt" : ""}`}>
      <circle
        stroke={strokeColor}
        fill="transparent"
        strokeWidth={stroke}
        strokeDasharray={circumference + " " + circumference}
        style={{ strokeDashoffset }}
        r={normalizedRadius}
        cx={width / 2}
        cy={width / 2}
      />
    </svg>
  );
};

export default ProgressRing;
