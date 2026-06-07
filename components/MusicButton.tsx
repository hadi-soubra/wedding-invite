'use client'

import { useRef, useState, useEffect } from 'react'
import { Heart } from 'lucide-react'

export default function MusicButton() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [exists, setExists] = useState(false)

  useEffect(() => {
    fetch('/music.mp3', { method: 'HEAD' })
      .then((r) => { if (r.ok) setExists(true) })
      .catch(() => {})
  }, [])

  const toggleMusic = () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
    } else {
      audio.play()
    }
    setPlaying(!playing)
  }

  if (!exists) return null

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={toggleMusic}
        className="p-2 bg-black/10 rounded-full hover:bg-black/20 transition-all duration-300 hover:scale-110"
      >
        <Heart
          className={`w-6 h-6 text-white transition-all duration-300 ${
            playing ? 'fill-white' : 'fill-none'
          }`}
        />
      </button>
      <audio ref={audioRef} loop src="/music.mp3" />
    </div>
  )
}
