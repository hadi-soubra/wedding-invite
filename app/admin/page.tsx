'use client'

import { useEffect, useState } from 'react'
import { Guest } from '@/types/guest'

export default function AdminPage() {
  const [guests, setGuests] = useState<Guest[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchGuests = async () => {
      setLoading(true)
      setError('')
      try {
        const res = await fetch('/api/admin/guests')
        if (!res.ok) {
          setError('Failed to load guests')
          return
        }
        setGuests(await res.json())
      } catch {
        setError('Failed to load guests')
      } finally {
        setLoading(false)
      }
    }
    fetchGuests()
  }, [])

  const attending = guests.filter((g) => g.status === 'attending')
  const declined = guests.filter((g) => g.status === 'declined')
  const pending = guests.filter((g) => g.status === 'pending')
  const totalPeople = attending.reduce((sum, g) => sum + (g.actual_size ?? 0), 0)
  const totalInvited = guests.reduce((sum, g) => sum + (g.party_size ?? 0), 0)

  const statusBadge = (status: Guest['status']) => {
    if (status === 'attending') return <span className="text-green-600 font-medium">✅ Attending</span>
    if (status === 'declined') return <span className="text-red-500 font-medium">❌ Declined</span>
    return <span className="text-gray-400">⏳ Pending</span>
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">RSVP Dashboard</h1>
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {loading && <p className="text-gray-400 text-sm mb-4">Loading…</p>}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded shadow p-4 text-center">
            <p className="text-2xl font-bold text-gray-800">{guests.length}</p>
            <p className="text-sm text-gray-500">👥 Invites — {totalInvited} people</p>
          </div>
          <div className="bg-white rounded shadow p-4 text-center">
            <p className="text-2xl font-bold text-green-600">{attending.length}</p>
            <p className="text-sm text-gray-500">✅ Attending — {totalPeople} people</p>
          </div>
          <div className="bg-white rounded shadow p-4 text-center">
            <p className="text-2xl font-bold text-red-500">{declined.length}</p>
            <p className="text-sm text-gray-500">❌ Declined</p>
          </div>
          <div className="bg-white rounded shadow p-4 text-center">
            <p className="text-2xl font-bold text-gray-400">{pending.length}</p>
            <p className="text-sm text-gray-500">⏳ Pending</p>
          </div>
        </div>

        <div className="bg-white rounded shadow overflow-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                {['Name', 'Phone', 'Status', 'Party Size', 'Note', 'Responded At'].map((h) => (
                  <th key={h} className="px-4 py-3 font-medium text-gray-600">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {guests.map((g) => (
                <tr key={g.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{g.name}</td>
                  <td className="px-4 py-3 text-gray-500">{g.phone ?? '—'}</td>
                  <td className="px-4 py-3">{statusBadge(g.status)}</td>
                  <td className="px-4 py-3 text-center">
                    {g.status === 'attending' ? g.actual_size : g.party_size}
                  </td>
                  <td className="px-4 py-3 text-gray-500 max-w-xs truncate">{g.note ?? '—'}</td>
                  <td className="px-4 py-3 text-gray-400">
                    {g.responded_at
                      ? new Date(g.responded_at).toLocaleString('en-LB', { timeZone: 'Asia/Beirut' })
                      : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
