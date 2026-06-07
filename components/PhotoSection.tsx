'use client'

interface PhotoSectionProps {
  image?: string
  bottomColor?: string
}

export default function PhotoSection({
  image = '/couple.jpg',
  bottomColor = '#efefef',
}: PhotoSectionProps) {
  return (
    <div className="w-full relative overflow-hidden">
      {/* Blurred zoomed background */}
      <img
        src={image}
        alt=""
        className="absolute inset-0 w-full h-full object-cover scale-110"
        style={{ filter: 'blur(20px)', transform: 'scale(1.15)' }}
        aria-hidden
      />

      {/* Main image centered */}
      <img
        src={image}
        alt=""
        className="relative z-10 w-full h-auto block max-w-xl mx-auto"
      />

      <div className="absolute inset-0 z-20 pointer-events-none" style={{ background: 'rgba(0,0,0,0.1)' }} />
      <div
        className="absolute inset-x-0 top-0 z-20 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, #efefef, transparent)' }}
      />
      <div
        className="absolute inset-x-0 bottom-0 z-20 h-32 pointer-events-none"
        style={{ background: `linear-gradient(to top, ${bottomColor}, transparent)` }}
      />
    </div>
  )
}
