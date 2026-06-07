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
    <div className="w-full max-w-xl mx-auto bg-transparent">
      <PhotoSection />
      <InvitationCard />
      <PhotoSection image="/couple2.jpg" />
      <EventCard type="ceremony" />
      <PhotoSection image="/couple3.jpg" />
      <GiftCard />
      <PhotoSection image="/couple4.jpg" bottomColor="#000000" />
      <RSVPSection guest={guest} />
      <MusicButton muted={muted} onToggle={onToggleMute} />
    </div>
  )
}
