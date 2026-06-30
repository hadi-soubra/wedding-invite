import { notFound } from 'next/navigation'
import InviteWrapper from '@/components/InviteWrapper'
import { Guest } from '@/types/guest'

// Dev-only design preview. Renders the invitation with a mock guest so the
// design can be iterated locally without a Supabase round-trip. Returns 404
// in production builds.
export const dynamic = 'force-static'

const mockGuest: Guest = {
  id: 'preview',
  code: 'preview',
  name: 'Preview Guest',
  name_arabic: 'ضيف المعاينة',
  phone: null,
  party_size: 2,
  status: 'pending',
  actual_size: null,
  note: null,
  responded_at: null,
  created_at: new Date().toISOString(),
}

export default function PreviewPage() {
  if (process.env.NODE_ENV === 'production') notFound()
  return <InviteWrapper guest={mockGuest} />
}
