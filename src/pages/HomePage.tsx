import { useNavigate } from 'react-router-dom'
import Hero from '../components/Hero'
import Ticker from '../components/Ticker'
import Highlights from '../components/Highlights'
import Testimonials from '../components/Testimonials'
import Sparkline from '../components/ui/Sparkline'

const products = [
  {
    badge: 'AI Testing',
    title: 'TestMind Platform',
    desc: 'End-to-end AI evaluation — adversarial test cases, production model monitoring, and regression pipelines purpose-built for LLM systems.',
    tags: ['LLM Evaluation', 'Regression Testing', 'Red Teaming'],
  },
  {
    badge: 'Agentic AI',
    title: 'AgentForge',
    desc: 'Build, deploy, and monitor multi-agent systems. Drag-and-drop designer with tool use, memory management, and enterprise security guardrails.',
    tags: ['Multi-Agent', 'Tool Use', 'Orchestration'],
  },
]

function CtaStrip() {
  const navigate = useNavigate()
  return (
    <div style={{ padding: '0 40px 120px' }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        background: 'var(--black)', borderRadius: 24, padding: '64px 56px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: 32,
      }} className="cta-dark-strip">
        <div>
          <div style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#555', marginBottom: 14 }}>
            Get Started
          </div>
          <div className="cta-dark-strip-title" style={{ fontWeight: 800, fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', letterSpacing: '-0.03em', color: 'white', lineHeight: 1.1 }}>
            The Future of Enterprise<br />AI Is Already Here.
          </div>
        </div>
        <div className="cta-dark-strip-btns" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', flexShrink: 0 }}>
          <button
            onClick={() => navigate('/contact')}
            style={{
              background: 'white', color: 'var(--black)', border: 'none',
              fontFamily: 'var(--font)', fontSize: '0.95rem', fontWeight: 700,
              padding: '14px 32px', borderRadius: 100, cursor: 'pointer',
            }}
          >
            Book A Demo
          </button>
          <button
            onClick={() => navigate('/products')}
            style={{
              background: 'transparent', color: 'white', border: '1.5px solid #333',
              fontFamily: 'var(--font)', fontSize: '0.95rem', fontWeight: 600,
              padding: '13px 30px', borderRadius: 100, cursor: 'pointer',
            }}
          >
            View Products
          </button>
        </div>
      </div>
    </div>
  )
}

export default function HomePage() {
  const navigate = useNavigate()
  return (
    <div className="home-page">
      <Hero />
      <Ticker />
      <Highlights />

      {/* Products preview */}
      <div className="section-outer">
        <div className="section">
          <span className="section-label">Our Products</span>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 20 }}>
            <h2 className="section-title">Four Focused<br />Products</h2>
            <button
              onClick={() => navigate('/products')}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: 'var(--font)', fontWeight: 600, fontSize: '0.9rem',
                color: 'var(--accent)', display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: 0,
              }}
            >
              View All Products
              <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          <div className="products-grid" style={{ marginTop: 48 }}>
            {products.map(p => (
              <div key={p.title} className="prod-card">
                <div><span className="prod-badge">{p.badge}</span></div>
                <div className="prod-title">{p.title}</div>
                <div className="prod-desc">{p.desc}</div>
                <div className="prod-tags">{p.tags.map(t => <span key={t} className="prod-tag">{t}</span>)}</div>
                <div style={{ marginTop: 8 }}>
                  <button
                    onClick={() => navigate('/products')}
                    style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font)', display: 'inline-flex', alignItems: 'center', gap: 6, padding: 0 }}
                  >
                    Learn More
                    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Industries teaser */}
      <div style={{ background: 'var(--bg)' }}>
        <div className="section">
          <span className="section-label">Industries We Serve</span>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 20, marginBottom: 48 }}>
            <h2 className="section-title">Built For<br />Your Domain</h2>
            <button
              onClick={() => navigate('/industries')}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: 'var(--font)', fontWeight: 600, fontSize: '0.9rem',
                color: 'var(--accent)', display: 'inline-flex', alignItems: 'center', gap: 6, padding: 0,
              }}
            >
              Explore All Industries
              <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          <div className="industries-grid">
            {[
              { variant: 'dark', tag: 'Healthcare Insurance', title: 'Claims & Prior Auth', desc: 'HIPAA-compliant AI agents that automate prior authorization and claims triage.', bgWord: 'HEALTH', metric: '74%', metricLabel: 'Less manual review' },
              { variant: 'light', tag: 'Logistics', title: 'Routing & Dispatch AI', desc: 'Predictive ETA systems and intelligent dispatch agents that cut ops costs.', bgWord: 'SHIP', metric: '60%', metricLabel: 'Reduced overhead' },
              { variant: 'accent', tag: 'Contact Center', title: 'Voice & IVR Modernization', desc: 'Replace legacy IVR with real-time voice AI, agent assist, and call analytics.', bgWord: 'TALK', metric: '40%', metricLabel: 'Fewer routine calls' },
            ].map(ind => (
              <div
                key={ind.tag}
                className={`ind-card ${ind.variant}`}
                onClick={() => navigate('/industries')}
              >
                <div className="ind-tag">{ind.tag}</div>
                <div className="ind-title">{ind.title}</div>
                <div className="ind-desc">{ind.desc}</div>
                <div style={{ marginTop: 24, paddingTop: 20, borderTop: ind.variant === 'light' ? '1px solid rgba(0,0,0,0.07)' : '1px solid rgba(255,255,255,0.12)' }}>
                  <div style={{ fontWeight: 800, fontSize: '1.8rem', letterSpacing: '-0.04em', lineHeight: 1 }}>{ind.metric}</div>
                  <div style={{ fontSize: '0.75rem', marginTop: 4, opacity: 0.6 }}>{ind.metricLabel}</div>
                </div>
                <div className="ind-bg-text">{ind.bgWord}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Key metrics strip */}
      <div className="section-outer">
        <div className="section" style={{ paddingTop: 80, paddingBottom: 80 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2, background: 'var(--gray-2)', borderRadius: 20, overflow: 'hidden' }}>
            {[
              { val: '50+', label: 'Enterprise Deployments', spark: [10,14,12,18,15,20,17,22,19,24,25] },
              { val: '99.4%', label: 'System Uptime SLA', spark: [42,44,43,45,44,46,45,47,46,48,47] },
              { val: '<200ms', label: 'Voice AI Latency', spark: [30,28,26,24,22,21,20,19,18,17,16] },
              { val: '3×', label: 'Avg. Throughput Improvement', spark: [10,15,20,25,22,28,24,30,26,32,30] },
            ].map(item => (
              <div key={item.label} style={{ background: 'var(--white)', padding: '36px 32px' }}>
                <div style={{ fontWeight: 800, fontSize: '2.2rem', letterSpacing: '-0.04em', color: 'var(--black)', lineHeight: 1, marginBottom: 6 }}>{item.val}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--gray-1)', marginBottom: 16 }}>{item.label}</div>
                <Sparkline color="oklch(0.48 0.14 232)" data={item.spark} height={36} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <Testimonials />
      <CtaStrip />
    </div>
  )
}
