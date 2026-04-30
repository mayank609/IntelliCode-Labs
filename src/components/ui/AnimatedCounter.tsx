import { useEffect, useState, useRef } from 'react'

export function useInView(options = {}) {
  const [isInView, setIsInView] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true)
        observer.disconnect()
      }
    }, { threshold: 0.1, ...options })

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [options])

  return { ref, isInView }
}

export default function AnimatedCounter({ value, duration = 2000, suffix = '', prefix = '', decimals = 0 }: { value: number, duration?: number, suffix?: string, prefix?: string, decimals?: number }) {
  const [count, setCount] = useState(0)
  const { ref, isInView } = useInView()

  useEffect(() => {
    if (!isInView) return

    let animationFrameId: number
    const initTime = performance.now()

    const updateCounter = (currentTime: number) => {
      const elapsedTime = currentTime - initTime
      const progress = Math.min(elapsedTime / duration, 1)

      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3)
      setCount(Number((easeProgress * value).toFixed(decimals)))

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCounter)
      }
    }

    animationFrameId = requestAnimationFrame(updateCounter)

    return () => cancelAnimationFrame(animationFrameId)
  }, [isInView, value, duration, decimals])

  return <span ref={ref as any}>{prefix}{count.toFixed(decimals)}{suffix}</span>
}
