export interface Guest {
  id: string
  code: string
  name: string
  name_arabic: string | null
  phone: string | null
  party_size: number
  status: 'pending' | 'attending' | 'declined'
  actual_size: number | null
  note: string | null
  responded_at: string | null
  created_at: string
}
