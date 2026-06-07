'use client'

import { useRef, useEffect, useState } from 'react'

interface PhotoSectionProps {
  objectPosition?: string
  height?: number
}

export default function PhotoSection({
  objectPosition = 'object-center',
  height = 394,
}: PhotoSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [parallaxY, setParallaxY] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const handleScroll = () => {
      const rect = el.getBoundingClientRect()
      const offset = (rect.top / window.innerHeight) * 30
      setParallaxY(offset)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      ref={ref}
      className="w-full overflow-hidden relative"
      style={{ height: `${height}px` }}
    >
      <div
        className={`absolute inset-0 bg-center bg-cover will-change-transform ${objectPosition}`}
        style={{
          backgroundImage: 'url(/couple.jpg)',
          height: 'calc(100% + 100px)',
          top: '-50px',
          transform: `translate3d(0, ${parallaxY}px, 0)`,
        }}
      />
      <div className="absolute inset-0 bg-black/20" />
      <div
        className="absolute inset-x-0 top-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, white, transparent)' }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to top, white, transparent)' }}
      />
    </div>
  )
}
