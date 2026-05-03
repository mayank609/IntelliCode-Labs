import PageHero from '../components/PageHero'
import ARVRScene from '../components/ARVRScene'
import { useNavigate } from 'react-router-dom'

const studies = [
  {
    client: 'Global Health Payer',
    title: 'Reducing Prior Authorization Review Time by 74%',
    domain: 'Healthcare Insurance',
    metric: '74%',
    metricLabel: 'Faster Review',
    desc: 'How we implemented an agentic AI system that parses medical records, applies clinical rules, and drafts determinations for medical directors.',
    image: 'https://images.unsplash.com/photo-1504868584819-f8e90526354c?auto=format&fit=crop&w=800&q=80',
  },
  {
    client: 'Fortune 500 Logistics',
    title: 'Automating Freight Dispatch for 10,000+ Daily Loads',
    domain: 'Logistics',
    metric: '60%',
    metricLabel: 'OpEx Reduction',
    desc: 'A custom AI dispatch agent that handles 80% of routine routing decisions, allowing human dispatchers to focus on high-value exceptions.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
  },
  {
    client: 'Enterprise SaaS Co.',
    title: 'Replacing Legacy IVR with VoicePilot',
    domain: 'Contact Center',
    metric: '22pt',
    metricLabel: 'CSAT Increase',
    desc: 'VoicePilot replaced a rigid legacy IVR system with conversational AI, increasing containment rates and significantly improving customer satisfaction.',
    image: 'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&w=800&q=80',
  },
]

export default function CaseStudiesPage() {
  const navigate = useNavigate()
  return (
    <>
      <PageHero
        label="Case Studies"
        title="Real Results In<br />Regulated Domains."
        subtitle="AI that works under pressure. These are the stories of how we've helped enterprises transform their most complex workflows with specialized AI."
      />

      <div className="section-outer" style={{ position: 'relative' }}>
        <ARVRScene />
        <div className="section">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 64 }}>
            {studies.map((study, i) => (
              <div 
                key={study.title} 
                className="about-split" 
                style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1fr 1fr', 
                  gap: 80, 
                  alignItems: 'center',
                  direction: i % 2 === 0 ? 'ltr' : 'rtl'
                }}
              >
                <div style={{ direction: 'ltr' }}>
                  <span className="prod-badge" style={{ marginBottom: 16 }}>{study.domain}</span>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--gray-1)', marginBottom: 8 }}>{study.client}</div>
                  <h2 className="section-title" style={{ fontSize: '2.2rem', marginBottom: 20 }}>{study.title}</h2>
                  <p className="prod-desc" style={{ fontSize: '1rem', marginBottom: 32 }}>{study.desc}</p>
                  
                  <div style={{ display: 'flex', gap: 24, marginBottom: 40 }}>
                    <div style={{ borderTop: '2px solid var(--accent)', paddingTop: 16 }}>
                      <div style={{ fontWeight: 800, fontSize: '2.4rem', color: 'var(--black)', lineHeight: 1 }}>{study.metric}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--gray-1)', marginTop: 4 }}>{study.metricLabel}</div>
                    </div>
                  </div>

                  <button 
                    onClick={() => navigate('/contact')}
                    className="btn-hero-primary"
                  >
                    View Full Case Study
                    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
                <div style={{ direction: 'ltr', height: 400, borderRadius: 24, overflow: 'hidden', boxShadow: 'var(--shadow-card)' }}>
                  <img src={study.image} alt={study.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ padding: '0 40px 120px' }}>
        <div className="cta-dark-strip" style={{ maxWidth: 1280, margin: '0 auto', background: 'var(--black)', borderRadius: 24, padding: '64px 56px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 32, position: 'relative', overflow: 'hidden' }}>
          <ARVRScene />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#555', marginBottom: 14 }}>Ready for results?</div>
            <div className="cta-dark-strip-title" style={{ fontWeight: 800, fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', letterSpacing: '-0.03em', color: 'white', lineHeight: 1.1 }}>
              Let's build your next<br />success story together.
            </div>
          </div>
          <div className="cta-dark-strip-btns" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
            <button onClick={() => navigate('/contact')} style={{ background: 'white', color: 'var(--black)', border: 'none', fontFamily: 'var(--font)', fontSize: '0.95rem', fontWeight: 700, padding: '14px 32px', borderRadius: 100, cursor: 'pointer' }}>
              Book A Demo
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
