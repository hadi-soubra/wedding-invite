import FloralCorner from './FloralCorner'

interface ContentCardProps {
  children: React.ReactNode
  bgColor?: string
  isBlack?: boolean
}

const LIGHT_BASE = '#f5f1e8'

// Subtle marble veining (grey fractal noise over the base tone).
const marbleSvg = `<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='m'><feTurbulence type='fractalNoise' baseFrequency='0.013 0.021' numOctaves='3' seed='11'/><feColorMatrix type='saturate' values='0'/><feComponentTransfer><feFuncA type='linear' slope='0.16'/></feComponentTransfer></filter><rect width='240' height='240' filter='url(#m)'/></svg>`
const marbleUrl = `url("data:image/svg+xml,${encodeURIComponent(marbleSvg)}")`

const goldFrame =
  'linear-gradient(135deg, #9a6f12 0%, #f6e08f 25%, #a67c1f 50%, #f6e08f 75%, #9a6f12 100%) 1'

export default function ContentCard({
  children,
  bgColor = LIGHT_BASE,
  isBlack = false,
}: ContentCardProps) {
  const base = isBlack ? 'rgba(0,0,0,' : 'rgba(245,241,232,'
  const solid = isBlack ? '#000000' : LIGHT_BASE

  const gradientTop = `linear-gradient(${base}0) 0%, ${base}0.2) 30%, ${base}0.7) 70%, ${solid} 100%)`
  const gradientBottom = `linear-gradient(${solid} 0%, ${base}0.7) 30%, ${base}0.2) 70%, ${base}0) 100%)`

  return (
    <div className="relative overflow-hidden" style={{ backgroundColor: bgColor }}>
      {/* Top seam blend into the photo above */}
      <div
        className="absolute top-0 left-0 right-0 h-[100px] pointer-events-none z-30"
        style={{ background: gradientTop, marginTop: '-100px' }}
      />

      {/* Background texture */}
      {isBlack ? (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(120% 80% at 50% 0%, rgba(166,124,31,0.18), transparent 60%), radial-gradient(120% 80% at 50% 100%, rgba(166,124,31,0.12), transparent 60%)',
          }}
        />
      ) : (
        <>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ backgroundImage: marbleUrl, backgroundSize: '240px 240px' }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(110% 70% at 50% 40%, rgba(255,255,255,0.5), transparent 70%)',
            }}
          />
        </>
      )}

      {/* Gold double frame */}
      <div
        className="absolute inset-4 pointer-events-none z-10"
        style={{ borderWidth: '1.5px', borderStyle: 'solid', borderImage: goldFrame }}
      />
      <div
        className="absolute inset-[22px] pointer-events-none z-10 opacity-60"
        style={{ borderWidth: '1px', borderStyle: 'solid', borderImage: goldFrame }}
      />

      {/* Gold floral corners, overlapping the frame */}
      <FloralCorner id="tl" className="absolute top-1 left-1 w-[84px] h-[84px] z-20 pointer-events-none" />
      <FloralCorner id="tr" className="absolute top-1 right-1 w-[84px] h-[84px] z-20 pointer-events-none" style={{ transform: 'scaleX(-1)' }} />
      <FloralCorner id="bl" className="absolute bottom-1 left-1 w-[84px] h-[84px] z-20 pointer-events-none" style={{ transform: 'scaleY(-1)' }} />
      <FloralCorner id="br" className="absolute bottom-1 right-1 w-[84px] h-[84px] z-20 pointer-events-none" style={{ transform: 'scale(-1,-1)' }} />

      {/* Content */}
      <div className="relative z-20 py-16 px-10 text-center">{children}</div>

      {/* Bottom seam blend into the photo below */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[100px] pointer-events-none z-30"
        style={{ background: gradientBottom, marginBottom: '-100px' }}
      />
    </div>
  )
}
