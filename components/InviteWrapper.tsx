'use client'

import { useState } from 'react'
import { Guest } from '@/types/guest'
import Page1Cover from './Page1Cover'
import Page2Scroll from './Page2Scroll'

interface InviteWrapperProps {
  guest: Guest
}

export default function InviteWrapper({ guest }: InviteWrapperProps) {
  const [pageState, setPageState] = useState<'cover' | 'open'>('cover')

  return (
    <div>
      <div
        className={`transition-opacity duration-1000 ease-in-out ${
          pageState === 'cover' ? 'opacity-100' : 'opacity-0 pointer-events-none absolute inset-0'
        }`}
      >
        <Page1Cover onOpen={() => setPageState('open')} />
      </div>

      <div
        className={`transition-opacity duration-1000 ease-in-out ${
          pageState === 'open' ? 'opacity-100' : 'opacity-0 pointer-events-none absolute inset-0'
        }`}
      >
        <Page2Scroll guest={guest} />
      </div>
    </div>
  )
}
