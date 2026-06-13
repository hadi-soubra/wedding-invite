'use client'

interface Page1CoverProps {
  onOpen: () => void
  isTransitioning?: boolean
}

export default function Page1Cover({ onOpen, isTransitioning = false }: Page1CoverProps) {
  return (
    <div
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: 'url(/couple.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div
        className="absolute inset-0 bg-black/50 transition-opacity duration-500"
        style={{ opacity: isTransitioning ? 0 : 1 }}
      />

      <div
        className="relative z-10 flex flex-col items-center gap-6 text-white text-center px-8 transition-opacity duration-500"
        style={{ opacity: isTransitioning ? 0 : 1 }}
        dir="rtl"
      >
        <p
          className="text-3xl font-bold tracking-widest"
          style={{ fontFamily: 'var(--font-amiri)' }}
        >
          بسم الله الرحمن الرحيم
        </p>

        <div className="text-white/40 text-2xl select-none">✦</div>

        <p
          className="text-sm leading-loose max-w-xs text-center opacity-90"
          style={{ fontFamily: 'var(--font-amiri)' }}
        >
          ومن آياته أن خلق لكم من أنفسكم أزواجاً لتسكنوا إليها
          <br />
          وجعل بينكم مودة ورحمة
          <br />
          إن في ذلك لآيات لقوم يتفكرون
        </p>

        <div className="text-white/40 text-2xl select-none">✦</div>

        <div className="flex flex-col items-center gap-2">
          <div className="animate-bounce flex flex-col items-center text-white/40 leading-none select-none">
            <span>↓</span>
            <span>↓</span>
            <span>↓</span>
          </div>
          <button
            onClick={onOpen}
            className="border-2 border-white px-10 py-3 text-white hover:bg-white hover:text-black transition-colors duration-300 tracking-widest text-sm"
            style={{ fontFamily: 'var(--font-amiri)' }}
          >
            فتح الدعوة
          </button>
          <div className="animate-bounce flex flex-col items-center text-white/40 leading-none select-none">
            <span>↓</span>
            <span>↓</span>
            <span>↓</span>
          </div>
        </div>
      </div>
    </div>
  )
}
