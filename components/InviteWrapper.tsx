'use client'

import { useState, useRef } from 'react'
import { Guest } from '@/types/guest'
import Page1Cover from './Page1Cover'
import Page2Scroll from './Page2Scroll'

interface InviteWrapperProps {
  guest: Guest
}

export default function InviteWrapper({ guest }: InviteWrapperProps) {
  const [pageState, setPageState] = useState<'cover' | 'open'>('cover')
  const [muted, setMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const handleOpen = () => {
    setPageState('open')
    const audio = audioRef.current
    if (audio) {
      audio.volume = 0.7
      audio.play().catch(() => {})
    }
  }

  const toggleMute = () => {
    const audio = audioRef.current
    if (!audio) return
    audio.muted = !audio.muted
    setMuted(audio.muted)
  }

  return (
    <div className={pageState === 'cover' ? 'h-screen overflow-hidden' : ''}>
      <audio ref={audioRef} loop src="/music.mp3" />

      <div
        className={`transition-opacity duration-1000 ease-in-out ${
          pageState === 'cover' ? 'opacity-100' : 'opacity-0 pointer-events-none absolute inset-0'
        }`}
      >
        <Page1Cover onOpen={handleOpen} />
      </div>

      <div
        className={`transition-opacity duration-1000 ease-in-out ${
          pageState === 'open' ? 'opacity-100' : 'opacity-0 pointer-events-none absolute inset-0'
        }`}
      >
        <Page2Scroll guest={guest} muted={muted} onToggleMute={toggleMute} />
      </div>
    </div>
  )
}
