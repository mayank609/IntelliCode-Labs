import Icon from './ui/Icon'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'

const footerCols = [
  {
    title: 'Platform',
    links: [
      { label: 'TestMind', path: '/products#testmind-platform' },
      { label: 'AgentForge', path: '/products#agentforge' },
      { label: 'PromptOps Suite', path: '/products#promptops-suite' },
      { label: 'VoicePilot', path: '/products#voicepilot' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      { label: 'Healthcare Insurance', path: '/industries#healthcare' },
      { label: 'Logistics', path: '/industries#logistics' },
      { label: 'Contact Center', path: '/industries#contact-center' },
      { label: 'Custom AI Builds', path: '/services' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', path: '/about' },
      { label: 'Careers', path: '/careers' },
      { label: 'Blog', path: '/blog' },
      { label: 'Case Studies', path: '/case-studies' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', path: '/privacy' },
      { label: 'Terms Of Use', path: '/terms' },
      { label: 'Security', path: '/security' },
    ],
  },
]

export default function Footer() {
  const navigate = useNavigate()

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 80, behavior: 'smooth' })
    else navigate('/contact')
  }

  return (
    <footer style={{ position: 'relative' }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '4px',
        background: 'linear-gradient(90deg, #48b7ff, #8d5eff, #53d3b5)',
        opacity: 0.8
      }} />
      <div className="footer-inner" style={{ position: 'relative', zIndex: 1 }}>
        <div className="footer-top" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '48px',
          paddingTop: '32px'
        }}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ gridColumn: '1 / -1', maxWidth: '400px', marginBottom: '16px' }}
          >
            <Link to="/" className="footer-brand-name" style={{ textDecoration: 'none' }}>
              <img src="/intellicode-logo-transparent.png" alt="Intellicode Labs logo" className="footer-logo-main" />
              <span className="brand-wordmark">
                INTELLICODE <span className="brand-wordmark-accent">LABS</span>
              </span>
            </Link>
            <div className="footer-brand-desc">
              An AI-first professional services firm building specialized systems for healthcare, logistics, and contact center engineering.
            </div>

            {/* System status indicator */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 20,
              background: '#0f1f14', border: '1px solid #1a3020', borderRadius: 100, padding: '6px 14px',
            }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 0 2px rgba(74,222,128,0.2)', flexShrink: 0 }} />
              <span style={{ fontSize: '0.72rem', color: '#4ade80', fontWeight: 600 }}>All systems operational</span>
            </div>

            <div className="footer-socials">
              {[
                { name: 'twitter', url: 'https://twitter.com/intellicodelabs' },
                { name: 'linkedin', url: 'https://linkedin.com/company/intellicodelabs' },
                { name: 'mail', url: 'mailto:hello@intellicodelabs.com' }
              ].map(s => (
                <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" className="footer-social">
                  <Icon name={s.name as any} size={16} stroke="#666" />
                </a>
              ))}
            </div>
          </motion.div>

          {footerCols.map((col, i) => (
            <motion.div 
              key={col.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="footer-col-title">{col.title}</div>
              <div className="footer-links">
                {col.links.map(l => (
                  <Link
                    key={l.label}
                    to={l.path}
                    onClick={() => {
                      if (l.path.includes('#')) {
                        const [path, hash] = l.path.split('#')
                        if (window.location.pathname === path) {
                          scrollTo(hash)
                        }
                      }
                    }}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          ))}
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="footer-col-title">Contact</div>
            <div className="footer-links">
              <a href="mailto:hello@intellicodelabs.com">hello@intellicodelabs.com</a>
              <Link to="/contact">Book A Demo</Link>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter / X</a>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="footer-bottom"
        >
          <div className="footer-copy">© 2026 IntelliCodeLabs. All Rights Reserved.</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <div className="footer-legal">
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms Of Use</Link>
              <Link to="/security">Security</Link>
            </div>
          </div>
        </motion.div>
      </div>
      <div className="footer-watermark">INTELLI</div>
    </footer>
  )
}
