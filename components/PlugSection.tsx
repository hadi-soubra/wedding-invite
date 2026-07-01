export default function PlugSection() {
  return (
    <div className="bg-black py-10 text-center px-6">
      <p
        className="text-white/60 text-sm mb-1"
        style={{ fontFamily: 'var(--font-amiri)' }}
        dir="rtl"
      >
        أعجبتك هذه الدعوة؟ تواصل معنا على
      </p>
      <p className="text-white/60 text-sm mb-3" style={{ fontFamily: 'var(--font-cormorant)' }}>
        Liked this digital invitation? Message us at
      </p>
      <a
        href="https://wa.me/96176804134"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white font-medium tracking-widest hover:text-green-400 transition-colors duration-300"
        style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.1rem' }}
      >
        76 804134
      </a>
    </div>
  )
}
