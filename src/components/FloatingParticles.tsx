import React, { useEffect, useRef } from 'react'

interface Particle {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
  color: string
}

interface FloatingParticlesProps {
  count?: number
  colors?: string[]
  className?: string
}

export const FloatingParticles: React.FC<FloatingParticlesProps> = ({ count = 12, colors = ['rgba(72, 183, 255, 0.15)', 'rgba(141, 94, 255, 0.15)', 'rgba(83, 211, 181, 0.15)'], className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [particles, setParticles] = React.useState<Particle[]>([])

  useEffect(() => {
    const newParticles: Particle[] = []
    for (let i = 0; i < count; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 6 + Math.random() * 20,
        duration: 8 + Math.random() * 8,
        delay: Math.random() * 3,
        color: colors[Math.floor(Math.random() * colors.length)],
      })
    }
    setParticles(newParticles)
  }, [count, colors])

  return (
    <div ref={containerRef} className={`floating-particles ${className}`}>
      {particles.map(particle => (
        <div
          key={particle.id}
          className="particle"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: particle.color,
            animation: `floatParticle ${particle.duration}s ease-in-out infinite`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
    </div>
  )
}

export default FloatingParticles
