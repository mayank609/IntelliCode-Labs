import { useNavigate } from 'react-router-dom'
import PageHero from '../components/PageHero'
import KeyFeatures from '../components/KeyFeatures'
import HowWeHelp from '../components/HowWeHelp'
import Icon from '../components/ui/Icon'
import ARVRScene from '../components/ARVRScene'

const services = [
  {
    icon: 'testing' as const,
    title: 'AI Testing & Evaluation',
    desc: 'Automated test generation, regression pipelines, and evaluation harnesses purpose-built for LLM-based systems. We catch model failures before they reach users.',
    bullets: ['Adversarial test case generation', 'Hallucination & accuracy scoring', 'CI/CD pipeline integration', 'Production drift detection'],
  },
  {
    icon: 'agent' as const,
    title: 'Agentic AI Systems',
    desc: 'Design and deploy autonomous agent frameworks that reason, plan, and act — integrating with your enterprise systems, data sources, and APIs.',
    bullets: ['Multi-agent orchestration', 'Tool use & memory management', 'Enterprise security guardrails', 'Human-in-the-loop escalation'],
  },
  {
    icon: 'prompt' as const,
    title: 'Prompt Engineering & PromptOps',
    desc: 'Systematic prompt design, versioning, A/B testing, and cost optimization. We build the scaffolding so your models perform predictably at scale.',
    bullets: ['Version-controlled prompts', 'A/B testing & evaluation', '60%+ cost reduction strategies', 'Team collaboration workflows'],
  },
  {
    icon: 'voice' as const,
    title: 'Voice AI & Contact Center',
    desc: 'End-to-end voice AI platforms for contact centers — real-time transcription, intent detection, agent assist, and post-call analytics.',
    bullets: ['Sub-200ms latency pipelines', '40+ language support', 'Real-time agent assist', 'IVR modernization & replacement'],
  },
]

export default function ServicesPage() {
  const navigate = useNavigate()
  return (
    <>
      <PageHero
        label="What We Do"
        title="Application Services"
        subtitle="Specialized AI engineering services across four domains — each with deep tooling, proven pipelines, and a team that has shipped this before."
      />

      {/* Service cards */}
      <div className="section-outer" style={{ position: 'relative' }}>
        <ARVRScene />
        <div className="section">
          <span className="section-label">Our Service Areas</span>
          <h2 className="section-title" style={{ marginBottom: 56 }}>Four Disciplines.<br />One Platform.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }} className="products-grid">
            {services.map(s => (
              <div key={s.title} className="prod-card" style={{ gap: 20 }}>
                <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <div className="hl-icon" style={{ flexShrink: 0 }}>
                    <Icon name={s.icon} size={22} stroke="oklch(0.48 0.14 232)" />
                  </div>
                  <div>
                    <div className="prod-title" style={{ fontSize: '1.15rem' }}>{s.title}</div>
                    <div className="prod-desc" style={{ marginTop: 8 }}>{s.desc}</div>
                  </div>
                </div>
                <div style={{ borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: 20 }}>
                  {s.bullets.map(b => (
                    <div key={b} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '6px 0' }}>
                      <div style={{ width: 18, height: 18, borderRadius: 6, background: 'var(--accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke="oklch(0.48 0.14 232)" strokeWidth="2.5">
                          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <span style={{ fontSize: '0.84rem', color: '#444' }}>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Key features interactive section */}
      <KeyFeatures />

      {/* How We Help process */}
      <div className="section-outer" style={{ position: 'relative' }}>
        <ARVRScene />
        <HowWeHelp />
      </div>

      {/* Engagement types */}
      <div className="section-outer" style={{ position: 'relative' }}>
        <ARVRScene />
        <div className="section">
          <span className="section-label">Engagement Models</span>
          <h2 className="section-title" style={{ marginBottom: 56 }}>We Work The<br />Way You Need.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }} className="values-grid">
            {[
              { badge: 'Most Popular', title: 'Full Build', desc: 'We scope, build, and deploy your complete AI system. You get production-ready software with documentation, monitoring, and a handoff plan.', time: '8–16 weeks' },
              { badge: '', title: 'Embedded Sprint', desc: 'Our engineers join your team for focused 2–4 week sprints. Great for unblocking a stalled AI project or accelerating a specific capability.', time: '2–4 weeks' },
              { badge: '', title: 'AI Audit', desc: 'We assess your current AI stack — models, prompts, pipelines, and evaluation. You get a detailed report with a prioritized improvement roadmap.', time: '2 weeks' },
            ].map(e => (
              <div key={e.title} className="prod-card">
                {e.badge && <div><span className="prod-badge">{e.badge}</span></div>}
                <div className="prod-title">{e.title}</div>
                <div className="prod-desc">{e.desc}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                  <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="var(--gray-1)" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" /><polyline points="12,6 12,12 16,14" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span style={{ fontSize: '0.8rem', color: 'var(--gray-1)' }}>{e.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding: '0 40px 120px' }}>
        <div className="cta-dark-strip" style={{ maxWidth: 1280, margin: '0 auto', background: 'var(--black)', borderRadius: 24, padding: '64px 56px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 32, position: 'relative', overflow: 'hidden' }}>
          <ARVRScene />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#555', marginBottom: 14 }}>Start a Project</div>
            <div className="cta-dark-strip-title" style={{ fontWeight: 800, fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', letterSpacing: '-0.03em', color: 'white', lineHeight: 1.1 }}>
              Not sure which service<br />fits your problem?
            </div>
          </div>
          <div className="cta-dark-strip-btns" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
            <button onClick={() => navigate('/contact')} style={{ background: 'white', color: 'var(--black)', border: 'none', fontFamily: 'var(--font)', fontSize: '0.95rem', fontWeight: 700, padding: '14px 32px', borderRadius: 100, cursor: 'pointer' }}>
              Let's Talk
            </button>
            <button onClick={() => navigate('/products')} style={{ background: 'transparent', color: 'white', border: '1.5px solid #333', fontFamily: 'var(--font)', fontSize: '0.95rem', fontWeight: 600, padding: '13px 30px', borderRadius: 100, cursor: 'pointer' }}>
              View Products
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
