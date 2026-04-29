interface SparklineProps {
  color?: string
  height?: number
  data?: number[]
}

export default function Sparkline({
  color = '#4A7CF6',
  height = 40,
  data,
}: SparklineProps) {
  const pts = data ?? [20, 30, 18, 35, 25, 40, 28, 42, 30, 38, 45]
  const w = 120
  const h = height
  const max = Math.max(...pts)
  const min = Math.min(...pts)
  const xs = pts.map((_, i) => (i / (pts.length - 1)) * w)
  const ys = pts.map((v) => h - ((v - min) / (max - min || 1)) * (h - 8) - 4)
  const d = xs.map((x, i) => `${i === 0 ? 'M' : 'L'}${x},${ys[i]}`).join(' ')
  const fill =
    xs.map((x, i) => `${i === 0 ? 'M' : 'L'}${x},${ys[i]}`).join(' ') +
    ` L${w},${h} L0,${h} Z`
  const gradId = `sg${color.replace(/[^a-zA-Z0-9]/g, '')}`

  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" height={h}>
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.18" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={fill} fill={`url(#${gradId})`} />
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
