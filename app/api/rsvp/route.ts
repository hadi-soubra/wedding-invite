import { getSupabaseAdmin } from '@/lib/supabase-admin'
import { getResend } from '@/lib/resend'
import { NextRequest } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const { code, attending, actual_size, note } = await req.json()
  const supabaseAdmin = getSupabaseAdmin()

  const { data: guest } = await supabaseAdmin
    .from('guests')
    .select('name, phone, party_size')
    .eq('code', code)
    .single()

  if (!guest) return Response.json({ error: 'Not found' }, { status: 404 })

  await supabaseAdmin.from('guests').update({
    status: attending ? 'attending' : 'declined',
    actual_size: attending ? actual_size : 0,
    note: note || null,
    responded_at: new Date().toISOString(),
  }).eq('code', code)

  await getResend().emails.send({
    from: 'wedding@resend.dev',
    to: process.env.YOUR_EMAIL!,
    subject: `RSVP ${attending ? '✅' : '❌'} ${guest.name} — ${attending ? `Attending (${actual_size})` : 'Declined'}`,
    html: `
      <h2 style="font-family:serif">${attending ? '✅' : '❌'} ${guest.name}</h2>
      <table>
        <tr><td><b>Status</b></td><td>${attending ? 'Attending' : 'Declined'}</td></tr>
        <tr><td><b>Party size</b></td><td>${attending ? actual_size : 0}</td></tr>
        <tr><td><b>Phone</b></td><td>${guest.phone || '—'}</td></tr>
        <tr><td><b>Note</b></td><td>${note || '—'}</td></tr>
        <tr><td><b>Time</b></td><td>${new Date().toLocaleString('en-LB', { timeZone: 'Asia/Beirut' })}</td></tr>
      </table>
      <p><a href="${process.env.NEXT_PUBLIC_BASE_URL}/admin">View all RSVPs</a></p>
    `,
  })

  return Response.json({ success: true })
}
