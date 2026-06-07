import { Guest } from '@/types/guest'
import PhotoSection from './PhotoSection'
import InvitationCard from './InvitationCard'
import EventCard from './EventCard'
import GiftCard from './GiftCard'
import RSVPSection from './RSVPSection'
import MusicButton from './MusicButton'

interface Page2ScrollProps {
  guest: Guest
}

export default function Page2Scroll({ guest }: Page2ScrollProps) {
  return (
    <div className="w-[375px] mx-auto bg-transparent">
      <PhotoSection objectPosition="object-top" />
      <InvitationCard guest={guest} />
      <PhotoSection objectPosition="object-center" />
      <EventCard type="ceremony" />
      <PhotoSection objectPosition="object-center" />
      <GiftCard />
      <PhotoSection objectPosition="object-top" />
      <RSVPSection guest={guest} />
      <MusicButton />
    </div>
  )
}
