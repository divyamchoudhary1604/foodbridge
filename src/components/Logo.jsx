/**
 * Logo Component
 *
 * A colorful FoodBridge logo:
 * - Green bowl = food
 * - Orange heart inside = care & charity
 * - Green leaf on top = freshness & sustainability
 * - Curved bridge line below = connecting donors to NGOs
 *
 * Props:
 * - size: width/height in pixels (default 32)
 */
function Logo({ size = 32 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      fill="none"
      width={size}
      height={size}
      aria-hidden="true"
    >
      {/* Bridge curve at bottom – connecting people */}
      <path
        d="M6 52 Q32 42 58 52"
        stroke="#1f6b4f"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />

      {/* Bowl shape – represents food */}
      <path
        d="M14 30 Q14 46 32 46 Q50 46 50 30 Z"
        fill="#22c55e"
        opacity="0.9"
      />

      {/* Bowl rim highlight */}
      <path
        d="M12 30 L52 30"
        stroke="#16a34a"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Heart inside bowl – represents love & charity */}
      <path
        d="M32 42 
           C26 38, 20 34, 20 30 
           C20 27, 23 25, 26 27 
           C28 28, 30 30, 32 32 
           C34 30, 36 28, 38 27 
           C41 25, 44 27, 44 30 
           C44 34, 38 38, 32 42Z"
        fill="#f97316"
      />

      {/* Leaf – freshness & sustainability */}
      <path
        d="M30 20 Q32 8 38 14 Q34 16 30 20Z"
        fill="#16a34a"
      />

      {/* Leaf stem */}
      <line
        x1="31" y1="20" x2="32" y2="28"
        stroke="#16a34a"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Small steam lines – freshly cooked */}
      <path
        d="M24 22 Q25 18 24 14"
        stroke="#f59e0b"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.7"
      />
      <path
        d="M40 24 Q41 20 40 16"
        stroke="#f59e0b"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.7"
      />
    </svg>
  );
}

export default Logo;
