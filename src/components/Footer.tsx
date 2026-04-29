import Icon from './ui/Icon'

const footerCols = [
  {
    title: 'Platform',
    links: ['TestMind', 'AgentForge', 'PromptOps Suite', 'VoicePilot'],
  },
  {
    title: 'Solutions',
    links: ['Healthcare Insurance', 'Logistics', 'Contact Center', 'Custom AI Builds'],
  },
  {
    title: 'Company',
    links: ['About Us', 'Careers', 'Blog', 'Case Studies'],
  },
  {
    title: 'Contact',
    links: ['hello@intellicodelabs.com', 'Book A Demo', 'LinkedIn', 'Twitter / X'],
  },
]

const scrollTo = (id: string) => {
  const el = document.getElementById(id)
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 80, behavior: 'smooth' })
}

export default function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-top">
          <div>
            <div className="footer-brand-name">
              <img src="/intellicode-logo-transparent.png" alt="Intellicode Labs logo" className="footer-logo-main" />
              <span className="brand-wordmark">
                INTELLICODE <span className="brand-wordmark-accent">LABS</span>
              </span>
            </div>
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
              {(['twitter', 'linkedin', 'mail'] as const).map(s => (
                <div key={s} className="footer-social">
                  <Icon name={s} size={16} stroke="#666" />
                </div>
              ))}
            </div>
          </div>

          {footerCols.map(col => (
            <div key={col.title}>
              <div className="footer-col-title">{col.title}</div>
              <div className="footer-links">
                {col.links.map(l => (
                  <a
                    key={l}
                    href="#"
                    onClick={e => { e.preventDefault(); if (l === 'Book A Demo') scrollTo('contact') }}
                  >
                    {l}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <div className="footer-copy">© 2026 IntelliCodeLabs. All Rights Reserved.</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <div className="footer-legal">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms Of Use</a>
              <a href="#">Security</a>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-watermark">INTELLI</div>
    </footer>
  )
}
