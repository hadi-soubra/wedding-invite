'use client'

interface Page1CoverProps {
  onOpen: () => void
}

export default function Page1Cover({ onOpen }: Page1CoverProps) {
  return (
    <div
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: 'url(/couple.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 flex flex-col items-center gap-6 text-white text-center px-8" dir="rtl">
        <p
          className="text-sm tracking-widest opacity-80"
          style={{ fontFamily: 'var(--font-amiri)' }}
        >
          بسم الله الرحمن الرحيم
        </p>

        <div className="text-white/40 text-2xl select-none">✦</div>

        <p
          className="text-lg leading-loose max-w-xs text-center"
          style={{ fontFamily: 'var(--font-amiri)' }}
        >
          ومن آياته أن خلق لكم من أنفسكم أزواجاً لتسكنوا إليها
          <br />
          وجعل بينكم مودة ورحمة
          <br />
          إن في ذلك لآيات لقوم يتفكرون
        </p>

        <div className="text-white/40 text-2xl select-none">✦</div>

        <button
          onClick={onOpen}
          className="border-2 border-white px-10 py-3 text-white hover:bg-white hover:text-black transition-colors duration-300 tracking-widest text-sm"
          style={{ fontFamily: 'var(--font-amiri)' }}
        >
          فتح الدعوة
        </button>
      </div>
    </div>
  )
}
