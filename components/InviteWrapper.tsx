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
    <div>
      <audio ref={audioRef} loop src="/music.mp3" />

      {/* Cover — fixed overlay, fades out on open */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-1000 ease-in-out ${
          pageState === 'cover' ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <Page1Cover onOpen={handleOpen} />
      </div>

      {/* Scroll content — always rendered but only visible after open */}
      <div
        className={`transition-opacity duration-1000 ease-in-out ${
          pageState === 'open' ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <Page2Scroll guest={guest} muted={muted} onToggleMute={toggleMute} />
      </div>
    </div>
  )
}
