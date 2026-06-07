'use client'

import { useState } from 'react'
import { Guest } from '@/types/guest'
import ContentCard from './ContentCard'

interface RSVPSectionProps {
  guest: Guest
}

export default function RSVPSection({ guest: initialGuest }: RSVPSectionProps) {
  const [guest, setGuest] = useState(initialGuest)
  const [showForm, setShowForm] = useState(false)
  const [attending, setAttending] = useState<'yes' | 'no' | ''>('')
  const [actualSize, setActualSize] = useState(1)
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const hasResponded = guest.status !== 'pending' && !showForm

  const submitRSVP = async () => {
    if (!attending) return
    setSubmitting(true)
    try {
      await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: guest.code,
          attending: attending === 'yes',
          actual_size: attending === 'yes' ? actualSize : 0,
          note: message,
        }),
      })
      setGuest({
        ...guest,
        status: attending === 'yes' ? 'attending' : 'declined',
        actual_size: attending === 'yes' ? actualSize : 0,
      })
      setShowForm(false)
      setSubmitted(true)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <ContentCard isBlack bgColor="#000000">
      <div className="text-white">
        <p
          className="text-4xl mb-8"
          style={{ fontFamily: 'var(--font-allura)' }}
        >
          Be Our Guest
        </p>

        {hasResponded && !submitted ? (
          <div className="space-y-4">
            <p style={{ fontFamily: 'var(--font-cormorant)' }} className="text-lg">
              Thank you for your response!
            </p>
            {guest.status === 'attending' ? (
              <p className="text-green-400" style={{ fontFamily: 'var(--font-cormorant)' }}>
                You have confirmed your attendance with {guest.actual_size} guest{(guest.actual_size ?? 0) > 1 ? 's' : ''}.
              </p>
            ) : (
              <p className="text-red-400" style={{ fontFamily: 'var(--font-cormorant)' }}>
                You have indicated that you cannot attend.
              </p>
            )}
            <button
              onClick={() => setShowForm(true)}
              className="mt-4 border border-white/40 px-6 py-2 text-white/70 hover:text-white hover:border-white transition-colors text-sm tracking-widest"
            >
              CHANGE RESPONSE
            </button>
          </div>
        ) : (
          <div className="space-y-6 text-left">
            <p className="text-sm text-white/60 text-center tracking-widest">
              Please reply before Sunday, July 26, 2026
            </p>
            <p className="text-sm text-white/60 text-center">
              Number of persons: {guest.party_size}
            </p>

            <p
              className="text-2xl italic text-center"
              style={{ fontFamily: 'var(--font-cormorant)' }}
            >
              {guest.name}
            </p>

            <div>
              <label className="block text-xs tracking-widest text-white/60 mb-2 uppercase">
                Are You Attending?
              </label>
              <select
                value={attending}
                onChange={(e) => setAttending(e.target.value as 'yes' | 'no' | '')}
                className="w-full bg-slate-600/50 border-0 text-white rounded px-4 py-3 appearance-none"
              >
                <option value="">— Select —</option>
                <option value="yes">Yes, I&apos;ll be there!</option>
                <option value="no">Can&apos;t make it</option>
              </select>
            </div>

            {attending === 'yes' && (
              <div>
                <label className="block text-xs tracking-widest text-white/60 mb-2 uppercase">
                  Number of Guests
                </label>
                <input
                  type="number"
                  min={1}
                  max={guest.party_size}
                  value={actualSize}
                  onChange={(e) => setActualSize(Number(e.target.value))}
                  className="w-full bg-slate-600/50 border-0 text-white rounded px-4 py-3"
                />
              </div>
            )}

            <div>
              <label className="block text-xs tracking-widest text-white/60 mb-2 uppercase">
                Share Your Love and Wishes
              </label>
              <textarea
                maxLength={120}
                placeholder="Write a message (Optional)"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                className="w-full bg-slate-600/50 border-0 text-white rounded px-4 py-3 resize-none placeholder:text-white/30"
              />
              <span className="text-xs text-white/40">{message.length} / 120</span>
            </div>

            <button
              onClick={submitRSVP}
              disabled={!attending || submitting}
              className="w-full bg-slate-600 py-3 text-white uppercase tracking-widest text-sm disabled:opacity-40 hover:bg-slate-500 transition-colors"
            >
              {submitting ? 'Sending…' : 'RSVP'}
            </button>

            <p className="text-xs text-white/40 text-center">
              Please note that this will be an adult-party only
            </p>
          </div>
        )}
      </div>
    </ContentCard>
  )
}
