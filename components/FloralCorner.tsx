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

      {/* Vines */}
      <g stroke={`url(#${gid})`} strokeWidth="1.6" strokeLinecap="round">
        <path d="M10 10 C 48 12 80 28 112 64" />
        <path d="M10 10 C 12 48 28 80 64 112" />
        <path d="M10 10 C 40 30 60 50 78 78" opacity="0.5" />
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

        {/* Leaves along the upper vine */}
        <path d="M0 0 C 9 -7 19 -7 25 0 C 19 7 9 7 0 0 Z" transform="translate(58 22) rotate(20)" />
        <path d="M0 0 C 8 -6 17 -6 22 0 C 17 6 8 6 0 0 Z" transform="translate(90 44) rotate(38)" />

        {/* Leaves along the left vine */}
        <path d="M0 0 C 9 -7 19 -7 25 0 C 19 7 9 7 0 0 Z" transform="translate(22 58) rotate(70)" />
        <path d="M0 0 C 8 -6 17 -6 22 0 C 17 6 8 6 0 0 Z" transform="translate(44 90) rotate(52)" />

        {/* Buds at the vine tips */}
        <circle cx="112" cy="64" r="3.1" />
        <circle cx="64" cy="112" r="3.1" />
      </g>
    </svg>
  )
}
