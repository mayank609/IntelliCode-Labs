import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Products', path: '/products' },
  { label: 'Industries', path: '/industries' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 1024)
  const { pathname } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1024px)')
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    setIsMobile(mq.matches)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const total = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(total > 0 ? (scrollY / total) * 100 : 0)
      setIsScrolled(scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [pathname])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={isScrolled ? 'scrolled' : ''} 
        style={{
          transition: 'background 0.3s, box-shadow 0.3s',
          background: isScrolled ? 'rgba(19, 50, 79, 0.95)' : 'rgba(19, 50, 79, 0.88)',
          boxShadow: isScrolled ? '0 4px 30px rgba(0, 0, 0, 0.1)' : 'none',
        }}
      >
        <div className="nav-inner" style={{
          height: isMobile ? '60px' : (isScrolled ? '64px' : '72px'),
        }}>
          <Link to="/" className="nav-logo">
            <img src="/intellicode-logo-transparent.png" alt="Intellicode Labs logo" className="nav-logo-main" style={{
              height: isMobile ? '40px' : (isScrolled ? '48px' : '58px'),
            }} />
          </Link>
          <div className="nav-links">
            {navLinks.map((l, i) => (
              <motion.div
                key={l.path}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
              >
                <Link
                  to={l.path}
                  className={pathname === l.path || pathname.startsWith(l.path + '/') ? 'active' : ''}
                >
                  {l.label}
                </Link>
              </motion.div>
            ))}
          </div>
          <motion.button 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="nav-cta" 
            onClick={() => navigate('/contact')}
          >
            Get A Demo
          </motion.button>
          <div className="nav-hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            <span style={{ transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : '' }} />
            <span style={{ opacity: menuOpen ? 0 : 1 }} />
            <span style={{ transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : '' }} />
          </div>
          <div className="nav-progress" style={{ 
            width: `${scrollProgress}%`,
            height: isScrolled ? '3px' : '2px',
            background: 'linear-gradient(90deg, #48b7ff, #8d5eff)',
            boxShadow: '0 0 10px rgba(72, 183, 255, 0.5)'
          }} />
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="mobile-menu" 
            style={{ display: 'flex' }}
          >
            <Link to="/" className={pathname === '/' ? 'active' : ''}>Home</Link>
            {navLinks.map(l => (
              <Link
                key={l.path}
                to={l.path}
                className={pathname === l.path ? 'active' : ''}
              >
                {l.label}
              </Link>
            ))}
            <Link to="/contact" className="btn-primary" style={{ marginTop: 8 }}>
              Get A Demo
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
