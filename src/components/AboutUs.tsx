export default function AboutUs() {
  const stats = [
    ['50+', 'Enterprise Deployments'],
    ['3', 'Core AI Product Lines'],
    ['99.4%', 'System Uptime SLA'],
    ['12', 'Avg. Weeks to Production'],
  ]
  const domains = [
    ['Healthcare', 'HIPAA-compliant AI systems'],
    ['Logistics', 'Real-time decisioning'],
    ['Voice AI', 'Sub-200ms latency'],
    ['Testing', 'Zero-drift pipelines'],
  ]
  return (
    <div className="section-outer" id="about-us">
      <div className="section">
        <span className="section-label">About Us</span>
        <div className="about-split" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          <div>
            <h2 className="section-title">Niche AI.<br />Real Results.</h2>
            <p style={{ fontSize: '1rem', lineHeight: 1.75, color: '#666677', marginTop: 24, marginBottom: 32 }}>
              IntelliCodeLabs is a specialized AI professional services firm. We don't build generic chatbots or pivot with every hype cycle. We pick three hard domains — healthcare insurance, logistics, and contact centers — and build AI that actually works in them.
            </p>
            <p style={{ fontSize: '1rem', lineHeight: 1.75, color: '#666677', marginBottom: 36 }}>
              Our team has deep experience in LLM engineering, agent systems, and regulated-industry compliance. We've built systems that handle millions of calls, automate thousands of claims, and keep freight moving — reliably.
            </p>
            <div className="about-stats" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
              {stats.map(([v, l]) => (
                <div key={l}>
                  <div style={{ fontWeight: 800, fontSize: '2rem', letterSpacing: '-0.03em', color: 'var(--black)' }}>{v}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--gray-1)', marginTop: 4 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ background: 'var(--black)', borderRadius: 20, padding: '36px 32px', color: 'white' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#555', marginBottom: 16 }}>Our Mission</div>
              <div style={{ fontWeight: 700, fontSize: '1.1rem', lineHeight: 1.5 }}>
                To make AI a competitive advantage for industries where reliability and accuracy are non-negotiable.
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {domains.map(([t, d]) => (
                <div key={t} style={{ background: 'var(--bg)', borderRadius: 14, padding: '18px', border: '1px solid rgba(0,0,0,0.05)' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: 6 }}>{t}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--gray-1)', lineHeight: 1.5 }}>{d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
