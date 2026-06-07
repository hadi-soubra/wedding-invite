import { getSupabaseAdmin } from '@/lib/supabase-admin'
import { NextRequest } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params
  const { data, error } = await getSupabaseAdmin()
    .from('guests')
    .select('*')
    .eq('code', code)
    .single()

  if (error || !data) {
    return Response.json({ error: 'Not found' }, { status: 404 })
  }
  return Response.json(data)
}
