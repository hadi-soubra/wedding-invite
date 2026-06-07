'use client'

import { useEffect, useState } from 'react'
import ContentCard from './ContentCard'

interface Guest {
  name: string
  name_arabic: string | null
}

interface InvitationCardProps {
  guest: Guest
}

export default function InvitationCard({ guest }: InvitationCardProps) {
  const [days, setDays] = useState(0)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    const target = new Date('2026-08-01T19:00:00+03:00')
    const update = () => {
      const diff = target.getTime() - Date.now()
      if (diff <= 0) return
      setDays(Math.floor(diff / 86400000))
      setHours(Math.floor((diff % 86400000) / 3600000))
      setMinutes(Math.floor((diff % 3600000) / 60000))
      setSeconds(Math.floor((diff % 60000) / 1000))
    }
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [])

  const pad = (n: number) => String(n).padStart(2, '0')

  return (
    <ContentCard>
      <div dir="rtl" style={{ fontFamily: 'var(--font-amiri)', color: '#373430' }}>
        <p className="text-xl mb-6">بتشرف</p>

        <div className="grid grid-cols-2 gap-8 mb-4">
          <p className="text-lg font-bold">الحج وجيه جمال</p>
          <p className="text-lg font-bold">السيد فريد حشوش</p>
        </div>

        <p className="text-xl my-4">بدعوتكم لحضور حفل زفاف</p>

        <div className="grid grid-cols-2 gap-8 mb-2">
          <div>
            <p className="text-base text-gray-500">ابنتنا</p>
            <p className="text-xl font-bold">{guest.name_arabic ?? guest.name}</p>
          </div>
          <div>
            <p className="text-base text-gray-500">ابننا</p>
            <p className="text-xl font-bold">علي الهادي</p>
          </div>
        </div>

        <div className="mb-8" />

        <p className="text-lg mt-8">وذلك بمشيئة الله يوم السبت</p>

        <p
          className="text-3xl font-light tracking-widest my-2"
          style={{ fontFamily: 'var(--font-cormorant)' }}
          dir="ltr"
        >
          01.08.26
        </p>

        <p
          className="text-5xl my-8"
          style={{ fontFamily: 'var(--font-allura)', color: '#373430' }}
          dir="ltr"
        >
          Sally &amp; Ali
        </p>

        <div className="flex gap-4 justify-center" dir="ltr">
          {[
            { value: pad(days), label: 'DAYS' },
            { value: pad(hours), label: 'HRS' },
            { value: pad(minutes), label: 'MIN' },
            { value: pad(seconds), label: 'SEC' },
          ].map(({ value, label }, i) => (
            <div key={label} className="flex items-center gap-4">
              <div className="text-center">
                <p
                  className="text-xl"
                  style={{ fontFamily: 'var(--font-cormorant)' }}
                >
                  {value}
                </p>
                <p className="text-[8px] tracking-widest uppercase text-gray-500">
                  {label}
                </p>
              </div>
              {i < 3 && <span className="text-gray-400 mb-3">:</span>}
            </div>
          ))}
        </div>
      </div>
    </ContentCard>
  )
}
