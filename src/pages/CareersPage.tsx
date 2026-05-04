import PageHero from '../components/PageHero'
import ARVRScene from '../components/ARVRScene'
import { useNavigate } from 'react-router-dom'

const positions = [
  {
    title: 'Senior AI Engineer',
    team: 'Engineering',
    location: 'Remote / Bangalore',
    type: 'Full-time',
    desc: 'Help us build and scale AgentForge and VoicePilot. Expertise in Python, LLM orchestration, and sub-200ms latency pipelines required.',
  },
  {
    title: 'Healthcare AI Domain Lead',
    team: 'Solutions',
    location: 'Remote (US)',
    type: 'Full-time',
    desc: 'Bridge the gap between HIPAA compliance and LLM capabilities. Deep experience in payer/provider workflows is a must.',
  },
  {
    title: 'Frontend Engineer (Creative)',
    team: 'Product',
    location: 'Remote',
    type: 'Full-time',
    desc: 'Work on the visual designer for AgentForge. Experience with React, Three.js, and complex state management needed.',
  },
  {
    title: 'Principal Product Manager, AI Platform',
    team: 'Product',
    location: 'Remote (US / Canada)',
    type: 'Full-time',
    desc: 'Own the roadmap for TestMind and PromptOps Suite. You\'ll work directly with enterprise clients and our engineering team to ship AI tooling that matters.',
  },
  {
    title: 'MLOps / DevOps Engineer',
    team: 'Engineering',
    location: 'Remote / Hyderabad',
    type: 'Full-time',
    desc: 'Own the infrastructure that runs our AI pipelines in production. Experience with Kubernetes, cloud platforms (AWS/GCP/Azure), and CI/CD for ML required.',
  },
  {
    title: 'Enterprise Sales Engineer',
    team: 'Sales',
    location: 'Remote (US)',
    type: 'Full-time',
    desc: 'Partner with enterprise prospects to scope AI solutions and demonstrate value. You should be comfortable deep in technical details one moment and in an exec briefing the next.',
  },
  {
    title: 'AI Evaluation & Red Team Researcher',
    team: 'Research',
    location: 'Remote',
    type: 'Full-time',
    desc: 'Design adversarial evaluation strategies for LLM systems in high-stakes domains. You\'ll find the failure modes before our clients do.',
  },
]

export default function CareersPage() {
  const navigate = useNavigate()
  return (
    <>
      <PageHero
        label="Careers"
        title="Build The Future<br />Of Niche AI."
        subtitle="We're a small, focused team of engineers and domain experts. No bloat, no meetings for the sake of meetings — just hard problems and high-impact AI."
      />

      <div className="section-outer" style={{ position: 'relative' }}>
        <ARVRScene />
        <div className="section">
          <span className="section-label">Why Join Us</span>
          <h2 className="section-title" style={{ marginBottom: 48 }}>Engineering-First<br />Culture.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }} className="values-grid">
            {[
              { title: 'Zero Bloat', desc: 'We value deep work. Our processes are designed to keep you in the flow, not in status meetings.' },
              { title: 'Domain Depth', desc: 'You won\'t just build generic models. You\'ll solve complex, real-world problems in regulated industries.' },
              { title: 'High Ownership', desc: 'Every engineer has a direct impact on our core products and client success.' },
            ].map(v => (
              <div key={v.title} className="prod-card">
                <div className="prod-title" style={{ fontSize: '1.2rem' }}>{v.title}</div>
                <div className="prod-desc">{v.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="section-outer" style={{ position: 'relative' }}>
        <ARVRScene />
        <div className="section">
          <span className="section-label">Open Positions</span>
          <h2 className="section-title" style={{ marginBottom: 48 }}>Help Us Build.</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {positions.map(p => (
              <div key={p.title} className="prod-card" style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 24 }}>
                <div style={{ flex: 1, minWidth: 280 }}>
                  <div style={{ display: 'flex', gap: 12, marginBottom: 8 }}>
                    <span className="prod-badge" style={{ background: 'var(--bg)', color: 'var(--gray-1)', fontSize: '0.65rem' }}>{p.team}</span>
                    <span className="prod-badge" style={{ background: 'var(--bg)', color: 'var(--gray-1)', fontSize: '0.65rem' }}>{p.location}</span>
                    <span className="prod-badge" style={{ background: 'var(--bg)', color: 'var(--gray-1)', fontSize: '0.65rem' }}>{p.type}</span>
                  </div>
                  <div className="prod-title">{p.title}</div>
                  <div className="prod-desc" style={{ marginTop: 8 }}>{p.desc}</div>
                </div>
                <button 
                  onClick={() => navigate('/contact')}
                  className="btn-hero-secondary" 
                  style={{ padding: '12px 28px', fontSize: '0.85rem' }}
                >
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ padding: '0 40px 120px' }}>
        <div className="cta-dark-strip" style={{ maxWidth: 1280, margin: '0 auto', background: 'var(--black)', borderRadius: 24, padding: '64px 56px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 32, position: 'relative', overflow: 'hidden' }}>
          <ARVRScene />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#555', marginBottom: 14 }}>Don't see a fit?</div>
            <div className="cta-dark-strip-title" style={{ fontWeight: 800, fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', letterSpacing: '-0.03em', color: 'white', lineHeight: 1.1 }}>
              We're always looking<br />for exceptional talent.
            </div>
          </div>
          <div className="cta-dark-strip-btns" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
            <button onClick={() => navigate('/contact')} style={{ background: 'white', color: 'var(--black)', border: 'none', fontFamily: 'var(--font)', fontSize: '0.95rem', fontWeight: 700, padding: '14px 32px', borderRadius: 100, cursor: 'pointer' }}>
              Send Your CV
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
