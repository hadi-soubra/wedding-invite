'use client'

import { Volume2, VolumeX } from 'lucide-react'

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
        {muted ? (
          <VolumeX className="w-6 h-6 text-white" />
        ) : (
          <Volume2 className="w-6 h-6 text-white" />
        )}
      </button>
    </div>
  )
}
