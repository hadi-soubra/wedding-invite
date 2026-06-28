import { getSupabaseAdmin } from '@/lib/supabase-admin'
import { NextRequest } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(_req: NextRequest) {
  const { data } = await getSupabaseAdmin()
    .from('guests')
    .select('*')
    .order('created_at', { ascending: true })

  return Response.json(data)
}
