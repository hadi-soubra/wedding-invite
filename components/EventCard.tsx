import { Clock, MapPin } from 'lucide-react'
import ContentCard from './ContentCard'

interface EventCardProps {
  type: 'ceremony' | 'party'
}

const events = {
  ceremony: {
    title: 'Wedding Ceremony',
    time: '07:00 PM',
    timezone: 'BEIRUT GMT +2',
    venue: 'St. George Church',
    city: 'Rmeish',
    map: 'https://maps.app.goo.gl/xPWWGYYCCfBu2sbYA',
  },
  party: {
    title: 'Wedding Party',
    time: '08:30 PM',
    timezone: 'BEIRUT GMT +2',
    venue: 'Mountain Gate',
    city: 'Rmeish',
    map: 'https://maps.app.goo.gl/Zvt9ezvvVP3zPifu8',
  },
}

export default function EventCard({ type }: EventCardProps) {
  const event = events[type]

  return (
    <ContentCard>
      <p
        className="text-4xl mb-8"
        style={{ fontFamily: 'var(--font-allura)', color: '#373430' }}
      >
        {event.title}
      </p>

      <Clock className="w-8 h-8 mx-auto mb-4 text-gray-600" />
      <p className="text-xl font-bold text-gray-800">{event.time}</p>
      <p className="text-sm text-gray-500 mb-8">{event.timezone}</p>

      <MapPin className="w-8 h-8 mx-auto mb-4 text-gray-600" />
      <p className="text-[22px] font-bold text-gray-800">{event.venue}</p>
      <p className="text-[18px] text-gray-500 mb-8">{event.city}</p>

      <a
        href={event.map}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block border-2 border-gray-800 px-8 py-3 text-gray-800 hover:bg-gray-800 hover:text-white transition-colors duration-300 text-sm tracking-widest"
      >
        GET DIRECTIONS
      </a>
    </ContentCard>
  )
}
