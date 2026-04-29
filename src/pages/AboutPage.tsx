import { useNavigate } from 'react-router-dom'
import PageHero from '../components/PageHero'
import Icon from '../components/ui/Icon'

const stats = [
  { val: '50+', label: 'Enterprise Deployments', sub: 'Across healthcare, logistics, and contact centers' },
  { val: '3', label: 'Core Product Lines', sub: 'Testing, Agents, Voice AI & Prompt Ops' },
  { val: '99.4%', label: 'System Uptime SLA', sub: 'Across all production environments' },
  { val: '12 Wks', label: 'Avg. Time to Production', sub: 'From kickoff to live deployment' },
]

const values = [
  {
    icon: 'testing' as const,
    title: 'Domain-First Thinking',
    desc: 'We don\'t build generic AI. Every system we build is shaped by the specific regulatory, operational, and data realities of the domain it operates in.',
  },
  {
    icon: 'prompt' as const,
    title: 'Production Over Demos',
    desc: 'We ship AI that runs in production — not polished demos that collapse under real workloads. Every engagement ends with working, monitored software.',
  },
  {
    icon: 'agent' as const,
    title: 'Reliability Is Non-Negotiable',
    desc: 'In healthcare and logistics, AI errors have real consequences. We build in evaluation, monitoring, and guardrails from day one — not as an afterthought.',
  },
]

const team = [
  { initials: 'AK', name: 'Arjun Kapoor', role: 'CEO & Co-Founder', bg: '#e8ecff' },
  { initials: 'SR', name: 'Sana Rahman', role: 'CTO & Co-Founder', bg: '#e8f5ee' },
  { initials: 'MC', name: 'Marcus Chen', role: 'Head of AI Engineering', bg: '#fff3e8' },
  { initials: 'LP', name: 'Laura Pinto', role: 'Head of Healthcare AI', bg: '#fce8f3' },
  { initials: 'DK', name: 'Derek Kumar', role: 'Lead Voice AI Engineer', bg: '#f3e8ff' },
  { initials: 'TN', name: 'Tanya Novak', role: 'Enterprise Solutions Lead', bg: '#e8f0ff' },
]

const timeline = [
  { year: '2021', event: 'Founded', desc: 'IntelliCodeLabs founded with a focus on AI for regulated industries.' },
  { year: '2022', event: 'First Deployments', desc: 'Shipped our first healthcare insurance AI system for a regional health plan, cutting prior-auth time by 60%.' },
  { year: '2023', event: 'Platform Launch', desc: 'Launched TestMind and AgentForge publicly, serving enterprise AI teams globally.' },
  { year: '2024', event: 'VoicePilot GA', desc: 'VoicePilot reached general availability — now powering 40+ contact center deployments.' },
  { year: '2025', event: 'PromptOps Suite', desc: 'PromptOps Suite shipped, completing our four-product platform vision.' },
  { year: '2026', event: 'Today', desc: '50+ enterprise clients. Growing team. Still building only what matters.' },
]

export default function AboutPage() {
  const navigate = useNavigate()
  return (
    <>
      <PageHero
        label="Who We Are"
        title="Niche AI. Real Results."
        subtitle="IntelliCodeLabs is an AI-first professional services firm that builds specialized systems for industries where accuracy and reliability aren't optional."
      />

      {/* Mission + Stats */}
      <div className="section-outer">
        <div className="section">
          <div className="about-split" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>
            <div>
              <span className="section-label">Our Story</span>
              <h2 className="section-title">We Pick Hard<br />Problems.</h2>
              <p style={{ fontSize: '1rem', lineHeight: 1.75, color: '#666677', marginTop: 24, marginBottom: 20 }}>
                IntelliCodeLabs was founded on a simple belief: AI is only valuable if it works reliably in the real world. Not in demos. Not on cherry-picked datasets. In production, under pressure, in regulated industries.
              </p>
              <p style={{ fontSize: '1rem', lineHeight: 1.75, color: '#666677', marginBottom: 20 }}>
                We don't chase every AI trend. We pick three hard domains — healthcare insurance, logistics, and contact centers — and build AI that actually works in them. Our team has deep experience in LLM engineering, agent systems, and regulated-industry compliance.
              </p>
              <p style={{ fontSize: '1rem', lineHeight: 1.75, color: '#666677', marginBottom: 40 }}>
                We've built systems that handle millions of calls, automate thousands of claims, and keep freight moving — reliably. That's not a pitch. It's the work.
              </p>
              <div className="about-stats" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
                {stats.map(s => (
                  <div key={s.val} style={{ borderTop: '2px solid var(--accent-light)', paddingTop: 16 }}>
                    <div style={{ fontWeight: 800, fontSize: '2.1rem', letterSpacing: '-0.04em', color: 'var(--black)', lineHeight: 1 }}>{s.val}</div>
                    <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--black)', marginTop: 6, marginBottom: 4 }}>{s.label}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--gray-1)', lineHeight: 1.4 }}>{s.sub}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {/* Mission card */}
              <div style={{ background: 'var(--black)', borderRadius: 20, padding: '40px 36px', color: 'white' }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#555', marginBottom: 16 }}>Our Mission</div>
                <div style={{ fontWeight: 700, fontSize: '1.2rem', lineHeight: 1.5 }}>
                  To make AI a competitive advantage for industries where reliability and accuracy are non-negotiable.
                </div>
              </div>

              {/* Vision card */}
              <div style={{ background: 'var(--accent)', borderRadius: 20, padding: '36px', color: 'white' }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: 16 }}>Our Vision</div>
                <div style={{ fontWeight: 700, fontSize: '1.1rem', lineHeight: 1.55 }}>
                  A world where every enterprise has access to AI that earns trust through consistent, measurable performance.
                </div>
              </div>

              {/* Domains */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                {[
                  ['Healthcare', 'HIPAA-compliant AI'],
                  ['Logistics', 'Real-time decisioning'],
                  ['Voice AI', 'Sub-200ms latency'],
                  ['Testing', 'Zero-drift pipelines'],
                ].map(([t, d]) => (
                  <div key={t} style={{ background: 'var(--bg)', borderRadius: 14, padding: '18px', border: '1px solid rgba(0,0,0,0.05)' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: 4 }}>{t}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--gray-1)', lineHeight: 1.4 }}>{d}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Core values */}
      <div style={{ background: 'var(--bg)' }}>
        <div className="section">
          <span className="section-label">What We Stand For</span>
          <h2 className="section-title" style={{ marginBottom: 56 }}>Our Core Values</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }} className="values-grid">
            {values.map(v => (
              <div key={v.title} className="hl-card">
                <div className="hl-icon">
                  <Icon name={v.icon} size={22} stroke="oklch(0.48 0.14 232)" />
                </div>
                <div className="hl-title">{v.title}</div>
                <div className="hl-desc">{v.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="section-outer">
        <div className="section">
          <span className="section-label">Our Journey</span>
          <h2 className="section-title" style={{ marginBottom: 56 }}>From Idea to<br />Production Platform</h2>
          <div style={{ position: 'relative' }}>
            {/* vertical line */}
            <div style={{ position: 'absolute', left: 72, top: 0, bottom: 0, width: 2, background: 'var(--gray-2)' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {timeline.map((item, i) => (
                <div key={item.year} style={{ display: 'flex', gap: 0, alignItems: 'flex-start' }}>
                  {/* year */}
                  <div style={{ width: 72, flexShrink: 0, fontWeight: 800, fontSize: '0.82rem', color: i === timeline.length - 1 ? 'var(--accent)' : 'var(--gray-1)', paddingTop: 20, letterSpacing: '0.02em' }}>{item.year}</div>
                  {/* dot */}
                  <div style={{ flexShrink: 0, width: 12, height: 12, borderRadius: '50%', background: i === timeline.length - 1 ? 'var(--accent)' : 'var(--gray-2)', border: '2px solid var(--white)', marginTop: 22, zIndex: 1 }} />
                  {/* content */}
                  <div style={{ paddingLeft: 24, paddingTop: 16, paddingBottom: 32 }}>
                    <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 6, color: 'var(--black)' }}>{item.event}</div>
                    <div style={{ fontSize: '0.875rem', color: '#666677', lineHeight: 1.6 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Team */}
      <div style={{ background: 'var(--bg)' }}>
        <div className="section">
          <span className="section-label">The Team</span>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 20, marginBottom: 56 }}>
            <h2 className="section-title">People Who<br />Build This.</h2>
            <p className="section-sub" style={{ margin: 0 }}>Engineers, researchers, and domain experts — obsessed with making AI work in the real world.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 20 }}>
            {team.map(t => (
              <div key={t.name} style={{ background: 'var(--white)', borderRadius: 20, padding: '28px 24px', boxShadow: 'var(--shadow-card)', border: '1px solid rgba(0,0,0,0.04)', textAlign: 'center' }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: t.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontWeight: 800, fontSize: '1.1rem', color: 'var(--black)' }}>{t.initials}</div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: 4 }}>{t.name}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--gray-1)', lineHeight: 1.4 }}>{t.role}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div style={{ padding: '0 40px 120px' }}>
        <div className="cta-dark-strip" style={{
          maxWidth: 1280, margin: '0 auto',
          background: 'var(--black)', borderRadius: 24, padding: '64px 56px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: 32,
        }}>
          <div>
            <div style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#555', marginBottom: 14 }}>Work With Us</div>
            <div className="cta-dark-strip-title" style={{ fontWeight: 800, fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', letterSpacing: '-0.03em', color: 'white', lineHeight: 1.1 }}>
              Ready to build something<br />that actually works?
            </div>
          </div>
          <div className="cta-dark-strip-btns" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button
              onClick={() => navigate('/contact')}
              style={{ background: 'white', color: 'var(--black)', border: 'none', fontFamily: 'var(--font)', fontSize: '0.95rem', fontWeight: 700, padding: '14px 32px', borderRadius: 100, cursor: 'pointer' }}
            >
              Get In Touch
            </button>
            <button
              onClick={() => navigate('/services')}
              style={{ background: 'transparent', color: 'white', border: '1.5px solid #333', fontFamily: 'var(--font)', fontSize: '0.95rem', fontWeight: 600, padding: '13px 30px', borderRadius: 100, cursor: 'pointer' }}
            >
              Our Services
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
