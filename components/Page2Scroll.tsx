import { Guest } from '@/types/guest'
import PhotoSection from './PhotoSection'
import InvitationCard from './InvitationCard'
import EventCard from './EventCard'
import GiftCard from './GiftCard'
import RSVPSection from './RSVPSection'
import MusicButton from './MusicButton'

interface Page2ScrollProps {
  guest: Guest
  muted: boolean
  onToggleMute: () => void
}

export default function Page2Scroll({ guest, muted, onToggleMute }: Page2ScrollProps) {
  return (
    <div className="w-full max-w-lg mx-auto bg-transparent">
      <PhotoSection objectPosition="object-top" />
      <InvitationCard />
      <PhotoSection objectPosition="object-center" image="/couple2.jpg" />
      <EventCard type="ceremony" />
      <PhotoSection objectPosition="object-center" image="/couple3.jpg" />
      <GiftCard />
      <PhotoSection objectPosition="object-top" image="/couple4.jpg" bottomColor="#000000" />
      <RSVPSection guest={guest} />
      <MusicButton muted={muted} onToggle={onToggleMute} />
    </div>
  )
}
