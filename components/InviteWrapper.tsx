'use client'

import { useState, useRef, useEffect } from 'react'
import { Guest } from '@/types/guest'
import Page1Cover from './Page1Cover'
import Page2Scroll from './Page2Scroll'

interface InviteWrapperProps {
  guest: Guest
}

type PageState = 'cover' | 'transitioning' | 'open'

export default function InviteWrapper({ guest }: InviteWrapperProps) {
  const [pageState, setPageState] = useState<PageState>('cover')
  const [scrollVisible, setScrollVisible] = useState(false)
  const [muted, setMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (pageState === 'cover' || pageState === 'transitioning') {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [pageState])

  // Slow auto-scroll once the invitation is open; stops on user interaction.
  useEffect(() => {
    if (pageState !== 'open') return

    let rafId = 0
    let cancelled = false
    const SPEED = 0.35 // pixels per frame (~21px/s) — gentle

    const step = () => {
      if (cancelled) return
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      if (window.scrollY >= maxScroll - 1) return // reached the bottom
      window.scrollBy(0, SPEED)
      rafId = requestAnimationFrame(step)
    }

    const stop = () => {
      cancelled = true
      cancelAnimationFrame(rafId)
      window.removeEventListener('wheel', stop)
      window.removeEventListener('touchstart', stop)
      window.removeEventListener('keydown', stop)
    }

    window.addEventListener('wheel', stop, { passive: true })
    window.addEventListener('touchstart', stop, { passive: true })
    window.addEventListener('keydown', stop)

    // Let the fade-in settle before drifting down.
    const startTimer = setTimeout(() => { rafId = requestAnimationFrame(step) }, 1500)

    return () => {
      clearTimeout(startTimer)
      stop()
    }
  }, [pageState])

  const handleOpen = () => {
    window.scrollTo(0, 0)
    setPageState('transitioning')

    const audio = audioRef.current
    if (audio) {
      audio.volume = 0.7
      audio.play().catch(() => {})
    }

    // Phase 2 (300ms): start fading in scroll page
    setTimeout(() => setScrollVisible(true), 300)

    // Phase 3 (900ms): transition complete, unmount cover
    setTimeout(() => setPageState('open'), 900)
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

      {/* Cover — fixed overlay, fades out during transition */}
      {(pageState === 'cover' || pageState === 'transitioning') && (
        <div
          className="fixed inset-0 z-50 transition-opacity ease-in-out"
          style={{
            opacity: pageState === 'transitioning' ? 0 : 1,
            transitionDuration: '600ms',
            transitionDelay: pageState === 'transitioning' ? '300ms' : '0ms',
          }}
        >
          <Page1Cover onOpen={handleOpen} isTransitioning={pageState === 'transitioning'} />
        </div>
      )}

      {/* Invitation — fades in as cover fades out */}
      {(pageState === 'transitioning' || pageState === 'open') && (
        <div
          className="transition-opacity ease-in-out"
          style={{
            opacity: scrollVisible ? 1 : 0,
            transitionDuration: '700ms',
          }}
        >
          <Page2Scroll guest={guest} muted={muted} onToggleMute={toggleMute} />
        </div>
      )}
    </>
  )
}
