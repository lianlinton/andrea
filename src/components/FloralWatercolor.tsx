/**
 * Watercolor-style floral graphic: pastel purple/pink roses, anemone, white bloom, sage foliage.
 * Recreated from invitation design - no external assets.
 */
export default function FloralWatercolor({
  width = 140,
  height = 360,
  className = "",
}: {
  width?: number;
  height?: number;
  className?: string;
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 140 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ overflow: "visible" }}
      aria-hidden
    >
      <defs>
        {/* Watercolor blur filter */}
        <filter id="watercolorBlur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"
            result="blur2"
          />
          <feBlend in="SourceGraphic" in2="blur2" mode="overlay" />
        </filter>
        {/* Soft gradient overlays */}
        <linearGradient id="petalPurple" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e8e0f0" stopOpacity="0.95" />
          <stop offset="50%" stopColor="#d4c4e8" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#b8a9c9" stopOpacity="0.7" />
        </linearGradient>
        <linearGradient id="petalPink" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f5e0eb" stopOpacity="0.95" />
          <stop offset="50%" stopColor="#e8c4d8" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#d4b0c4" stopOpacity="0.7" />
        </linearGradient>
        <radialGradient id="anemoneCenter" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#e8dcb0" stopOpacity="0.9" />
          <stop offset="70%" stopColor="#d4c494" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#b8a878" stopOpacity="0.6" />
        </radialGradient>
        <linearGradient id="leafSage" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#b5c4a8" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#9ca889" stopOpacity="0.85" />
        </linearGradient>
        <linearGradient id="leafDusty" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8a9a7e" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#9ca889" stopOpacity="0.5" />
        </linearGradient>
      </defs>

      {/* === FOLIAGE - stems and leaves (background layer) === */}
      <path
        d="M45 360 Q50 280 55 200 Q58 150 52 100"
        stroke="url(#leafDusty)"
        strokeWidth="3"
        fill="none"
        opacity="0.6"
      />
      <path
        d="M95 360 Q90 290 88 220 Q85 170 92 120"
        stroke="url(#leafSage)"
        strokeWidth="2.5"
        fill="none"
        opacity="0.55"
      />
      <ellipse
        cx="38"
        cy="240"
        rx="18"
        ry="9"
        fill="url(#leafSage)"
        opacity="0.65"
        transform="rotate(-35 38 240)"
      />
      <ellipse
        cx="102"
        cy="200"
        rx="14"
        ry="7"
        fill="url(#leafDusty)"
        opacity="0.5"
        transform="rotate(25 102 200)"
      />
      <ellipse
        cx="48"
        cy="160"
        rx="12"
        ry="6"
        fill="url(#leafSage)"
        opacity="0.55"
        transform="rotate(-20 48 160)"
      />
      <ellipse
        cx="90"
        cy="140"
        rx="10"
        ry="5"
        fill="#b5c4a8"
        opacity="0.45"
        transform="rotate(30 90 140)"
      />
      <ellipse
        cx="30"
        cy="100"
        rx="8"
        ry="4"
        fill="#8a9a7e"
        opacity="0.4"
        transform="rotate(-45 30 100)"
      />

      {/* === BOTTOM: Pink rose === */}
      <g filter="url(#watercolorBlur)">
        <ellipse cx="70" cy="320" rx="22" ry="26" fill="url(#petalPink)" opacity="0.9" />
        <ellipse cx="68" cy="318" rx="18" ry="22" fill="#f0dce8" opacity="0.7" />
        <ellipse cx="72" cy="322" rx="14" ry="18" fill="#e8c4d8" opacity="0.6" />
      </g>

      {/* === Large purple rose === */}
      <g filter="url(#watercolorBlur)">
        <ellipse cx="70" cy="265" rx="28" ry="32" fill="url(#petalPurple)" opacity="0.88" />
        <ellipse cx="65" cy="260" rx="20" ry="24" fill="#e8e0f0" opacity="0.75" />
        <ellipse cx="75" cy="268" rx="18" ry="22" fill="#d4c4e8" opacity="0.7" />
        <ellipse cx="70" cy="262" rx="12" ry="16" fill="#b8a9c9" opacity="0.6" />
      </g>

      {/* === Purple anemone with gold center === */}
      <g filter="url(#watercolorBlur)">
        <ellipse cx="70" cy="195" rx="24" ry="20" fill="url(#anemoneCenter)" />
        <ellipse cx="55" cy="188" rx="14" ry="18" fill="url(#petalPurple)" opacity="0.85" />
        <ellipse cx="85" cy="192" rx="14" ry="18" fill="url(#petalPurple)" opacity="0.8" />
        <ellipse cx="70" cy="175" rx="12" ry="16" fill="#e8e0f0" opacity="0.75" />
        <ellipse cx="62" cy="200" rx="10" ry="14" fill="#d4c4e8" opacity="0.7" />
        <ellipse cx="78" cy="205" rx="10" ry="14" fill="#b8a9c9" opacity="0.65" />
      </g>

      {/* === White flower with dark center === */}
      <g filter="url(#watercolorBlur)">
        <ellipse cx="70" cy="130" rx="20" ry="24" fill="#faf8fc" opacity="0.9" />
        <ellipse cx="68" cy="125" rx="14" ry="18" fill="#fff" opacity="0.85" />
        <ellipse cx="72" cy="132" rx="12" ry="16" fill="#f5effa" opacity="0.8" />
        <circle cx="70" cy="132" r="6" fill="#4a4055" opacity="0.5" />
        <circle cx="68" cy="130" r="2" fill="#6b5b7a" opacity="0.6" />
        <circle cx="72" cy="134" r="2" fill="#6b5b7a" opacity="0.6" />
        <circle cx="70" cy="128" r="1.5" fill="#e8c4d8" opacity="0.8" />
      </g>

      {/* === Smaller lavender blooms (upper sprigs) === */}
      <g filter="url(#watercolorBlur)">
        <ellipse cx="55" cy="85" rx="10" ry="14" fill="#d4c4e8" opacity="0.7" />
        <ellipse cx="85" cy="78" rx="8" ry="12" fill="#b8a9c9" opacity="0.65" />
        <ellipse cx="70" cy="65" rx="6" ry="10" fill="#e8e0f0" opacity="0.6" />
        <ellipse cx="45" cy="70" rx="7" ry="9" fill="#d4c4e8" opacity="0.55" />
        <ellipse cx="98" cy="95" rx="6" ry="8" fill="#b8a9c9" opacity="0.5" />
      </g>

      {/* === Speckles (watercolor texture) === */}
      <circle cx="35" cy="80" r="1.5" fill="#6b5b7a" opacity="0.25" />
      <circle cx="105" cy="120" r="1" fill="#8b7a9e" opacity="0.2" />
      <circle cx="40" cy="140" r="1.2" fill="#6b5b7a" opacity="0.22" />
      <circle cx="100" cy="165" r="1" fill="#4a4055" opacity="0.18" />
      <circle cx="25" cy="200" r="1.5" fill="#6b5b7a" opacity="0.2" />
      <circle cx="112" cy="240" r="1" fill="#8b7a9e" opacity="0.2" />
      <circle cx="50" cy="90" r="0.8" fill="#4a4055" opacity="0.15" />
    </svg>
  );
}
