import React, { useEffect, useState } from 'react'

interface FloatingImage {
  id: number
  src: string
  x: number
  y: number
  width: number
  delay: number
  duration: number
  rotate: number
}

interface FloatingImagesProps {
  images: string[]
  count?: number
  className?: string
  opacity?: number
}

export const FloatingImages: React.FC<FloatingImagesProps> = ({ 
  images, 
  count = 4, 
  className = '',
  opacity = 0.4
}) => {
  const [floatingImages, setFloatingImages] = useState<FloatingImage[]>([])

  useEffect(() => {
    if (!images || images.length === 0) return

    const newImages: FloatingImage[] = []
    for (let i = 0; i < count; i++) {
      newImages.push({
        id: i,
        src: images[i % images.length],
        x: 10 + Math.random() * 80, // 10% to 90%
        y: 10 + Math.random() * 80, // 10% to 90%
        width: 80 + Math.random() * 120, // 80px to 200px
        delay: Math.random() * 4,
        duration: 15 + Math.random() * 10, // 15s to 25s
        rotate: -15 + Math.random() * 30, // -15deg to 15deg
      })
    }
    setFloatingImages(newImages)
  }, [images, count])

  return (
    <div className={`floating-images-container ${className}`} style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
      {floatingImages.map(img => (
        <img
          key={img.id}
          src={img.src}
          alt=""
          style={{
            position: 'absolute',
            left: `${img.x}%`,
            top: `${img.y}%`,
            width: `${img.width}px`,
            height: 'auto',
            borderRadius: '12px',
            boxShadow: '0 12px 32px rgba(0,0,0,0.1)',
            opacity: opacity,
            filter: 'grayscale(30%)',
            transform: `translate(-50%, -50%) rotate(${img.rotate}deg)`,
            animation: `floatImage ${img.duration}s ease-in-out infinite alternate`,
            animationDelay: `-${img.delay}s`,
            willChange: 'transform'
          }}
        />
      ))}
    </div>
  )
}

export default FloatingImages
