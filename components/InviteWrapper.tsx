'use client'

import { useState, useRef, useEffect } from 'react'
import { Guest } from '@/types/guest'
import Page1Cover from './Page1Cover'
import Page2Scroll from './Page2Scroll'

interface InviteWrapperProps {
  guest: Guest
}

export default function InviteWrapper({ guest }: InviteWrapperProps) {
  const [pageState, setPageState] = useState<'cover' | 'open'>('cover')
  const [visible, setVisible] = useState(false)
  const [muted, setMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (pageState === 'open') {
      requestAnimationFrame(() => setVisible(true))
    }
  }, [pageState])

  const handleOpen = () => {
    window.scrollTo(0, 0)
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
    <>
      <audio ref={audioRef} loop src="/music.mp3" />

      {pageState === 'cover' && <Page1Cover onOpen={handleOpen} />}

      {pageState === 'open' && (
        <div
          className="transition-opacity duration-1000 ease-in-out"
          style={{ opacity: visible ? 1 : 0 }}
        >
          <Page2Scroll guest={guest} muted={muted} onToggleMute={toggleMute} />
        </div>
      )}
    </>
  )
}
