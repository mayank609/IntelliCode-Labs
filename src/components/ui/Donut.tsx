interface DonutSlice {
  v: number
  color: string
}

interface DonutProps {
  data: DonutSlice[]
  size?: number
}

export default function Donut({ data, size = 80 }: DonutProps) {
  const total = data.reduce((s, d) => s + d.v, 0)
  const cx = size / 2
  const cy = size / 2
  const r = size * 0.38
  const strokeW = size * 0.12
  const circ = 2 * Math.PI * r

  let offset = 0
  const slices = data.map((d) => {
    const pct = d.v / total
    const start = offset
    offset += pct * 360
    return { ...d, pct, start }
  })

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {slices.map((s, i) => {
        const dashArr = circ * s.pct
        return (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke={s.color}
            strokeWidth={strokeW}
            strokeDasharray={`${dashArr} ${circ - dashArr}`}
            style={{
              transform: `rotate(${s.start - 90}deg)`,
              transformOrigin: `${cx}px ${cy}px`,
            }}
          />
        )
      })}
      <circle cx={cx} cy={cy} r={r - strokeW / 2 - 2} fill="white" />
    </svg>
  )
}
