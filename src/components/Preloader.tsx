import { useEffect, useState } from 'react'

interface PreloaderProps {
  isLoading: boolean
}

export default function Preloader({ isLoading }: PreloaderProps) {
  const [show, setShow] = useState(true)

  useEffect(() => {
    if (isLoading) {
      setShow(true)
      return
    }

    const timer = setTimeout(() => setShow(false), 180)
    return () => clearTimeout(timer)
  }, [isLoading])

  if (!show) return null

  return (
    <div className={`preloader-overlay ${isLoading ? 'visible' : 'hidden'}`}>
      <div className="preloader-inner">
        <img src="/intellicode-logo-transparent.png" alt="Intellicode Labs" className="preloader-logo" />
        <div className="preloader-dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  )
}
