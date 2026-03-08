/**
 * Brix-style daisy flower (from Figma leaf/flower illustrations).
 * Adapted to Andrea's pastel purple/pink palette.
 * Uses toFixed for consistent server/client output (avoids hydration mismatch).
 */
export default function FlowerBrix({
  size = 80,
  variant = "purple",
  className = "",
}: {
  size?: number;
  variant?: "purple" | "pink" | "lavender";
  className?: string;
}) {
  const colors = {
    purple: { main: "#b8a9c9", accent: "#e8e0f0" },
    pink: { main: "#e8c4d8", accent: "#f0dce8" },
    lavender: { main: "#d4c4e8", accent: "#f3eff8" },
  };
  const { main, accent } = colors[variant];

  /* Round to 4 decimals for consistent server/client output (avoids hydration mismatch) */
  const r = (n: number) => Number(n.toFixed(4));
  const c = r(size / 2);
  const petalCount = 14;

  /* Outer petals: elongated, rounded - positioned at radius, rotated to point outward */
  const outerPetals = Array.from({ length: petalCount }, (_, i) => {
    const angle = r((i / petalCount) * 360 - 90);
    const rad = (angle * Math.PI) / 180;
    const dist = r(size * 0.35);
    const x = r(c + dist * Math.cos(rad));
    const y = r(c + dist * Math.sin(rad));
    const rx = r(size * 0.06);
    const ry = r(size * 0.18);
    return (
      <ellipse
        key={`o-${i}`}
        cx={x}
        cy={y}
        rx={rx}
        ry={ry}
        fill={main}
        transform={`rotate(${angle} ${c} ${c})`}
      />
    );
  });

  /* Inner petals: smaller, offset for layering */
  const innerPetals = Array.from({ length: petalCount }, (_, i) => {
    const angle = r((i / petalCount) * 360 - 90 + 360 / petalCount / 2);
    const rad = (angle * Math.PI) / 180;
    const dist = r(size * 0.22);
    const x = r(c + dist * Math.cos(rad));
    const y = r(c + dist * Math.sin(rad));
    const rx = r(size * 0.04);
    const ry = r(size * 0.1);
    return (
      <ellipse
        key={`i-${i}`}
        cx={x}
        cy={y}
        rx={rx}
        ry={ry}
        fill={accent}
        transform={`rotate(${angle} ${c} ${c})`}
      />
    );
  });

  const centerR = r(size * 0.1);
  const dotR = r(size * 0.018);
  const dots = [
    { x: r(c - centerR * 0.4), y: r(c - centerR * 0.3) },
    { x: r(c + centerR * 0.5), y: r(c - centerR * 0.2) },
    { x: r(c - centerR * 0.2), y: r(c + centerR * 0.4) },
    { x: r(c + centerR * 0.3), y: r(c + centerR * 0.3) },
    { x: r(c - centerR * 0.5), y: r(c + centerR * 0.1) },
    { x: r(c + centerR * 0.1), y: r(c - centerR * 0.4) },
    { x: r(c - centerR * 0.15), y: r(c + centerR * 0.2) },
    { x: r(c + centerR * 0.35), y: r(c - centerR * 0.1) },
  ];

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <g transform={`translate(${r(size * 0.02)}, ${r(size * 0.02)}) scale(0.96)`}>
        {outerPetals}
        {innerPetals}
        <circle cx={c} cy={c} r={centerR} fill={main} />
        {dots.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r={dotR} fill={accent} />
        ))}
      </g>
    </svg>
  );
}
