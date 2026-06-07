export default function FooterSection() {
  return (
    <div>
      <div className="relative h-64 overflow-hidden">
        <img
          src="/couple.jpg"
          alt=""
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-4 left-0 right-0 text-center">
          <p className="text-white font-serif tracking-wide text-lg">
            Thank you! ♡
          </p>
        </div>
      </div>

      <div className="bg-black py-6 text-center">
        <p className="text-xs text-gray-500">Powered by</p>
        <p className="text-white text-sm tracking-widest mt-1" style={{ fontFamily: 'var(--font-allura)', fontSize: '1.5rem' }}>
          S &amp; A
        </p>
      </div>
    </div>
  )
}
