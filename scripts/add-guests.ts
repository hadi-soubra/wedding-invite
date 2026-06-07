import { config } from 'dotenv'
import { resolve } from 'path'
config({ path: resolve(process.cwd(), '.env.local') })

import { createClient } from '@supabase/supabase-js'
import { nanoid } from 'nanoid'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
)

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

// ────────────────────────────────────────────
// ADD YOUR GUESTS HERE
const guests = [
  { name: 'George Khoury', name_arabic: 'جورج خوري', phone: '+961 71 000 001', party_size: 3 },
  { name: 'Rania Haddad', name_arabic: 'رانيا حداد', phone: '+961 71 000 002', party_size: 2 },
  // add more...
]
// ────────────────────────────────────────────

async function main() {
  console.log('Adding guests...\n')
  for (const guest of guests) {
    const code = nanoid(8)
    const { error } = await supabase.from('guests').insert({ ...guest, code })
    if (error) {
      console.error(`❌ ${guest.name}: ${error.message}`)
    } else {
      console.log(`✅ ${guest.name}`)
      console.log(`   ${BASE_URL}/invite/${code}\n`)
    }
  }
}

main()
