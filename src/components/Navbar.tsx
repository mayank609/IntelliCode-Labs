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
  const { pathname } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(total > 0 ? (window.scrollY / total) * 100 : 0)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [pathname])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <>
      <nav>
        <div className="nav-inner">
          <Link to="/" className="nav-logo">
            <img src="/intellicode-logo-transparent.png" alt="Intellicode Labs logo" className="nav-logo-main" />
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
          <div className="nav-progress" style={{ width: `${scrollProgress}%` }} />
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
