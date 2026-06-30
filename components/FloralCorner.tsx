interface FloralCornerProps {
  /** Unique suffix so each instance's gradient id stays valid. */
  id: string
  className?: string
  style?: React.CSSProperties
}

/**
 * A golden floral flourish drawn for the TOP-LEFT corner.
 * Mirror it with CSS transforms (scaleX/scaleY) to fill the other corners.
 */
export default function FloralCorner({ id, className = '', style }: FloralCornerProps) {
  const gid = `gold-${id}`
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      style={style}
      fill="none"
      aria-hidden
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#9a6f12" />
          <stop offset="45%" stopColor="#f6e08f" />
          <stop offset="100%" stopColor="#a67c1f" />
        </linearGradient>
      </defs>

      {/* Short corner vines */}
      <g stroke={`url(#${gid})`} strokeWidth="1.6" strokeLinecap="round">
        <path d="M10 10 C 34 14 50 24 62 40" />
        <path d="M10 10 C 14 34 24 50 40 62" />
      </g>

      <g fill={`url(#${gid})`}>
        {/* Corner flower */}
        <g transform="translate(20 20)">
          <ellipse cx="0" cy="-9" rx="3.4" ry="6.6" />
          <ellipse cx="0" cy="-9" rx="3.4" ry="6.6" transform="rotate(72)" />
          <ellipse cx="0" cy="-9" rx="3.4" ry="6.6" transform="rotate(144)" />
          <ellipse cx="0" cy="-9" rx="3.4" ry="6.6" transform="rotate(216)" />
          <ellipse cx="0" cy="-9" rx="3.4" ry="6.6" transform="rotate(288)" />
          <circle r="3" fill="#fff7d6" />
        </g>

        {/* A leaf on each vine, close to the corner */}
        <path d="M0 0 C 9 -7 19 -7 25 0 C 19 7 9 7 0 0 Z" transform="translate(50 26) rotate(28)" />
        <path d="M0 0 C 9 -7 19 -7 25 0 C 19 7 9 7 0 0 Z" transform="translate(26 50) rotate(62)" />
      </g>
    </svg>
  )
}
