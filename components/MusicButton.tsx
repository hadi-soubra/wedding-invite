'use client'

import { Heart } from 'lucide-react'

interface MusicButtonProps {
  muted: boolean
  onToggle: () => void
}

export default function MusicButton({ muted, onToggle }: MusicButtonProps) {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={onToggle}
        className="p-2 bg-black/10 rounded-full hover:bg-black/20 transition-all duration-300 hover:scale-110"
      >
        <Heart
          className={`w-6 h-6 text-white transition-all duration-300 ${
            muted ? 'fill-none' : 'fill-white'
          }`}
        />
      </button>
    </div>
  )
}
