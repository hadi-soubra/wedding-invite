interface ContentCardProps {
  children: React.ReactNode
  bgColor?: string
  isBlack?: boolean
}

export default function ContentCard({
  children,
  bgColor = '#efefef',
  isBlack = false,
}: ContentCardProps) {
  const base = isBlack ? 'rgba(0,0,0,' : 'rgba(239,239,239,'

  const gradientTop = `linear-gradient(${base}0) 0%, ${base}0.2) 30%, ${base}0.7) 70%, ${base.replace(',', '')} 100%)`
  const gradientBottom = `linear-gradient(${base.replace(',', '')} 0%, ${base}0.7) 30%, ${base}0.2) 70%, ${base}0) 100%)`

  return (
    <div className="relative" style={{ backgroundColor: bgColor }}>
      <div
        className="absolute top-0 left-0 right-0 h-[100px] pointer-events-none z-10"
        style={{ background: gradientTop, marginTop: '-100px' }}
      />
      <div className="py-16 px-8 text-center">{children}</div>
      <div
        className="absolute bottom-0 left-0 right-0 h-[100px] pointer-events-none z-10"
        style={{ background: gradientBottom, marginBottom: '-100px' }}
      />
    </div>
  )
}
