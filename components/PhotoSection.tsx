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
    <div className="w-full relative">
      <img
        src={image}
        alt=""
        className="w-full h-auto block max-w-xl mx-auto"
      />
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />
      <div
        className="absolute inset-x-0 top-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, #efefef, transparent)' }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
        style={{ background: `linear-gradient(to top, ${bottomColor}, transparent)` }}
      />
    </div>
  )
}
