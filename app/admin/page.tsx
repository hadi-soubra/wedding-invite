'use client'

import { useState } from 'react'
import { Guest } from '@/types/guest'

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [authed, setAuthed] = useState(false)
  const [guests, setGuests] = useState<Guest[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchGuests = async (pw: string) => {
    setLoading(true)
    setError('')
    const res = await fetch('/api/admin/guests', {
      headers: { 'x-admin-password': pw },
    })
    if (res.status === 401) {
      setError('Wrong password')
      setLoading(false)
      return
    }
    const data = await res.json()
    setGuests(data)
    setAuthed(true)
    setLoading(false)
  }

  const exportCSV = () => {
    const header = 'Name,Phone,Status,Party Size,Actual Size,Note,Responded At'
    const rows = guests.map((g) =>
      [g.name, g.phone, g.status, g.party_size, g.actual_size, g.note, g.responded_at]
        .map((v) => `"${v ?? ''}"`)
        .join(',')
    )
    const csv = [header, ...rows].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'guests.csv'
    a.click()
  }

  const attending = guests.filter((g) => g.status === 'attending')
  const declined = guests.filter((g) => g.status === 'declined')
  const pending = guests.filter((g) => g.status === 'pending')
  const totalPeople = attending.reduce((sum, g) => sum + (g.actual_size ?? 0), 0)

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded shadow-md w-80">
          <h1 className="text-xl font-bold mb-6 text-center">Admin Dashboard</h1>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && fetchGuests(password)}
            className="w-full border rounded px-4 py-2 mb-4"
          />
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            onClick={() => fetchGuests(password)}
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition-colors disabled:opacity-50"
          >
            {loading ? 'Loading…' : 'Login'}
          </button>
        </div>
      </div>
    )
  }

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
          <div className="flex gap-3">
            <button
              onClick={() => fetchGuests(password)}
              className="border px-4 py-2 rounded text-sm hover:bg-gray-100 transition-colors"
            >
              Refresh
            </button>
            <button
              onClick={exportCSV}
              className="bg-black text-white px-4 py-2 rounded text-sm hover:bg-gray-800 transition-colors"
            >
              Export CSV
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
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
