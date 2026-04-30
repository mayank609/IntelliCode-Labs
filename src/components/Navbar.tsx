import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

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
  const { pathname } = useLocation()
  const navigate = useNavigate()

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

  return (
    <>
      <nav className={isScrolled ? 'scrolled' : ''} style={{
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        background: isScrolled ? 'rgba(19, 50, 79, 0.95)' : 'rgba(19, 50, 79, 0.88)',
        boxShadow: isScrolled ? '0 4px 30px rgba(0, 0, 0, 0.1)' : 'none',
      }}>
        <div className="nav-inner" style={{ 
          height: isScrolled ? '64px' : '72px',
          transition: 'height 0.3s cubic-bezier(0.4, 0, 0.2, 1)' 
        }}>
          <Link to="/" className="nav-logo">
            <img src="/intellicode-logo-transparent.png" alt="Intellicode Labs logo" className="nav-logo-main" style={{
              height: isScrolled ? '48px' : '58px',
              transition: 'height 0.3s ease'
            }} />
          </Link>
          <div className="nav-links">
            {navLinks.map(l => (
              <Link
                key={l.path}
                to={l.path}
                className={pathname === l.path || pathname.startsWith(l.path + '/') ? 'active' : ''}
              >
                {l.label}
              </Link>
            ))}
          </div>
          <button className="nav-cta" onClick={() => navigate('/contact')}>
            Get A Demo
          </button>
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
      </nav>

      {menuOpen && (
        <div className="mobile-menu" style={{ display: 'flex' }}>
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
        </div>
      )}
    </>
  )
}
