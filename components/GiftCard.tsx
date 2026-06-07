import ContentCard from './ContentCard'

export default function GiftCard() {
  return (
    <ContentCard>
      <p
        className="text-4xl mb-8"
        style={{ fontFamily: 'var(--font-alex-brush)', color: '#373430' }}
      >
        Gift Registry
      </p>

      <p
        className="text-xl text-gray-700 mb-2 leading-relaxed"
        style={{ fontFamily: 'var(--font-cormorant)' }}
      >
        Your presence is our greatest gift.
        <br />
        For those who wish, a gift registry is available at
      </p>

      <p
        className="text-xl font-semibold text-gray-800 mt-4"
        style={{ fontFamily: 'var(--font-cormorant)' }}
      >
        Whish number
      </p>
      <p className="font-serif text-lg text-gray-800 mt-1">71 290 403</p>
    </ContentCard>
  )
}
