import React from 'react'

interface OrbProps {
  size: 'sm' | 'md' | 'lg'
  color: 'blue' | 'purple' | 'teal' | 'cyan'
  delay: number
  top: string
  left?: string
  right?: string
  duration: number
  blur?: 'sm' | 'md' | 'lg'
}

const Orb: React.FC<OrbProps> = ({ size, color, delay, top, left, right, duration, blur = 'md' }) => {
  const sizeMap = { sm: '80px', md: '140px', lg: '220px' }
  const colorMap = {
    blue: 'linear-gradient(135deg, rgba(72, 183, 255, 0.25), rgba(72, 183, 255, 0.08))',
    purple: 'linear-gradient(135deg, rgba(141, 94, 255, 0.24), rgba(141, 94, 255, 0.08))',
    teal: 'linear-gradient(135deg, rgba(83, 211, 181, 0.22), rgba(83, 211, 181, 0.07))',
    cyan: 'linear-gradient(135deg, rgba(72, 183, 255, 0.18), rgba(141, 94, 255, 0.12))',
  }
  const blurMap = { sm: '40px', md: '60px', lg: '100px' }

  const orbStyle: React.CSSProperties = {
    position: 'absolute',
    width: sizeMap[size],
    height: sizeMap[size],
    top,
    left,
    right,
    borderRadius: '50%',
    background: colorMap[color],
    filter: `blur(${blurMap[blur]})`,
    zIndex: 0,
    pointerEvents: 'none',
    animation: `orbFloat 7s ease-in-out infinite`,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`,
  }

  return <div style={orbStyle} />
}

interface FloatingOrbsProps {
  density?: 'low' | 'medium' | 'high'
  colors?: Array<'blue' | 'purple' | 'teal' | 'cyan'>
}

export const FloatingOrbs: React.FC<FloatingOrbsProps> = ({ density = 'medium', colors = ['blue', 'purple', 'teal', 'cyan'] }) => {
  const orbConfigs: OrbProps[] = []
  const orbCount = density === 'low' ? 3 : density === 'high' ? 8 : 5

  for (let i = 0; i < orbCount; i++) {
    const randomColor = colors[Math.floor(Math.random() * colors.length)] as OrbProps['color']
    const randomSize = (['sm', 'md', 'lg'] as const)[Math.floor(Math.random() * 3)]
    const randomDelay = Math.random() * 2
    const randomDuration = 6 + Math.random() * 4

    orbConfigs.push({
      size: randomSize,
      color: randomColor,
      delay: randomDelay,
      top: `${Math.random() * 60}%`,
      ...(Math.random() > 0.5 ? { left: `${Math.random() * 20}%` } : { right: `${Math.random() * 20}%` }),
      duration: randomDuration,
      blur: randomSize === 'lg' ? 'lg' : randomSize === 'md' ? 'md' : 'sm',
    })
  }

  return (
    <>
      {orbConfigs.map((config, idx) => (
        <Orb key={idx} {...config} />
      ))}
    </>
  )
}

export default FloatingOrbs
