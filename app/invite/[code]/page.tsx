import { getSupabaseAdmin } from '@/lib/supabase-admin'
import { Guest } from '@/types/guest'
import InviteWrapper from '@/components/InviteWrapper'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

interface PageProps {
  params: Promise<{ code: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { code } = await params
  const { data } = await getSupabaseAdmin()
    .from('guests')
    .select('name')
    .eq('code', code)
    .single()

  const title = "Ali & Sally's Wedding"
  const description = data?.name
    ? `${data.name}, you are cordially invited — please RSVP`
    : 'You are cordially invited — please RSVP'

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: ['/couple.jpg'],
      type: 'website',
    },
  }
}

export default async function InvitePage({ params }: PageProps) {
  const { code } = await params

  const { data, error } = await getSupabaseAdmin()
    .from('guests')
    .select('*')
    .eq('code', code)
    .single()

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center px-8">
          <p
            className="text-4xl mb-4"
            style={{ fontFamily: 'var(--font-allura)' }}
          >
            Invitation Not Found
          </p>
          <p className="text-gray-400 text-sm">
            This invitation link is not valid. Please check the link and try again.
          </p>
        </div>
      </div>
    )
  }

  return <InviteWrapper guest={data as Guest} />
}
