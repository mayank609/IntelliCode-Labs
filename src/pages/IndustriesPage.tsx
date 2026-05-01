import { useNavigate } from 'react-router-dom'
import PageHero from '../components/PageHero'
import ARVRScene from '../components/ARVRScene'

const industries = [
  {
    id: 'healthcare',
    tag: 'Healthcare Insurance',
    title: 'Claims, Prior Auth & Compliance AI',
    desc: 'AI agents that automate prior authorization, claims triage, and member inquiry resolution — while staying audit-ready and HIPAA-compliant. We build for the real complexity of payer workflows, not sanitized demos.',
    bgWord: 'HEALTH',
    metric: '74%', metricLabel: 'Reduction in manual review time',
    variant: 'dark' as const,
    challenges: [
      'Manual prior authorization taking 5+ business days',
      'High-volume member inquiry queues with repetitive queries',
      'Claims adjudication errors from inconsistent rules application',
      'Compliance audit trails that are expensive to maintain',
    ],
    solutions: [
      'Agentic AI that processes prior auth in under 2 hours',
      'NLP-powered member inquiry resolution with 90%+ automation',
      'Rule-consistent claims triage with explainability logs',
      'HIPAA-compliant audit trail generation built into the pipeline',
    ],
  },
  {
    id: 'logistics',
    tag: 'Logistics & Freight',
    title: 'Routing, Tracking & Dispatch Intelligence',
    desc: 'Intelligent dispatch agents, predictive ETA systems, and natural-language freight query platforms that reduce ops costs and improve SLA performance. Built for the volatility of real supply chains.',
    bgWord: 'SHIP',
    metric: '60%', metricLabel: 'Reduction in operations overhead',
    variant: 'light' as const,
    challenges: [
      'Dispatchers overwhelmed by high-volume routing decisions',
      'Reactive ETA management causing customer SLA breaches',
      'Fragmented freight query handling across multiple systems',
      'Manual load optimization wasting capacity',
    ],
    solutions: [
      'AI dispatch agent that handles 80% of routine routing automatically',
      'Predictive ETA with proactive exception management',
      'Unified natural-language freight query interface',
      'ML-powered load optimization reducing empty miles by 30%+',
    ],
  },
  {
    id: 'contact-center',
    tag: 'Contact Center',
    title: 'Voice, Chat & IVR Modernization',
    desc: 'Replace legacy IVR with intelligent voice AI. Real-time agent assist, automated summarization, and full omnichannel orchestration — without a rip-and-replace of your existing telephony infrastructure.',
    bgWord: 'TALK',
    metric: '40%', metricLabel: 'Fewer routine agent calls',
    variant: 'accent' as const,
    challenges: [
      'Legacy IVR with poor containment rates frustrating customers',
      'Agents spending time on wrap-up notes instead of customers',
      'Long handle times from agents searching knowledge bases mid-call',
      'Inconsistent quality across agent interactions',
    ],
    solutions: [
      'Conversational IVR with 60%+ containment rate',
      'Automated post-call summarization saving 2–3 min per call',
      'Live agent assist surfacing relevant KB articles in real time',
      'Quality scoring on 100% of calls — not just sampled ones',
    ],
  },
]

const caseStudies = [
  {
    industry: 'Healthcare Insurance',
    result: '74% reduction in manual prior-auth review time',
    quote: 'IntelliCodeLabs rebuilt our prior authorization workflow with an agentic AI system. We cut manual review time by 74% in Q1 without any compliance issues.',
    role: 'VP Operations, Regional Health Plan',
    initials: 'JM',
  },
  {
    industry: 'Contact Center',
    result: 'Customer satisfaction scores up 22 points',
    quote: 'VoicePilot replaced our legacy IVR completely. CSAT is up 22 points and our agents handle 40% fewer routine calls.',
    role: 'Director of CX, Logistics Co.',
    initials: 'MS',
  },
]

export default function IndustriesPage() {
  const navigate = useNavigate()
  return (
    <>
      <PageHero
        label="Industries We Serve"
        title="Deep Domain AI."
        subtitle="We don't build generic AI and bolt it onto your workflows. We embed domain expertise directly into every model, prompt, and pipeline we ship."
      />

      {/* Industry deep-dives */}
      {industries.map((ind, i) => (
        <div key={ind.id} className="section-outer" style={{ position: 'relative' }}>
          <ARVRScene />
          <div className="section" id={ind.id} style={{ position: 'relative', zIndex: 3 }}>
            <div className="about-split" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'start', direction: i % 2 === 0 ? 'ltr' : 'rtl' }}>
              <div style={{ direction: 'ltr' }}>
                <span className="section-label">{ind.tag}</span>
                <h2 className="section-title">{ind.title}</h2>
                <p style={{ fontSize: '1rem', lineHeight: 1.75, color: '#666677', marginTop: 20, marginBottom: 32 }}>{ind.desc}</p>

                <div style={{ display: 'flex', gap: 28 }}>
                  <div style={{ borderTop: '2px solid var(--accent)', paddingTop: 14 }}>
                    <div style={{ fontWeight: 800, fontSize: '2.4rem', letterSpacing: '-0.04em', lineHeight: 1, color: 'var(--black)' }}>{ind.metric}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--gray-1)', marginTop: 6, maxWidth: 180 }}>{ind.metricLabel}</div>
                  </div>
                </div>

                <button onClick={() => navigate('/contact')} className="btn-hero-primary" style={{ marginTop: 36 }}>
                  Explore This Solution
                  <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>

              <div style={{ direction: 'ltr', display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div style={{ background: 'var(--bg)', borderRadius: 20, padding: '28px 32px', border: '1px solid rgba(0,0,0,0.05)' }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gray-1)', marginBottom: 18 }}>Common Challenges</div>
                  {ind.challenges.map((c, ci) => (
                    <div key={ci} style={{ display: 'flex', gap: 12, padding: '8px 0', borderBottom: ci < ind.challenges.length - 1 ? '1px solid rgba(0,0,0,0.06)' : 'none', alignItems: 'flex-start' }}>
                      <div style={{ width: 18, height: 18, borderRadius: '50%', background: '#f5e8e8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                        <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#cc4444' }} />
                      </div>
                      <span style={{ fontSize: '0.85rem', color: '#555', lineHeight: 1.5 }}>{c}</span>
                    </div>
                  ))}
                </div>

                <div style={{ background: 'var(--black)', borderRadius: 20, padding: '28px 32px', color: 'white' }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#555', marginBottom: 18 }}>Our AI Solutions</div>
                  {ind.solutions.map((s, si) => (
                    <div key={si} style={{ display: 'flex', gap: 12, padding: '8px 0', borderBottom: si < ind.solutions.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none', alignItems: 'flex-start' }}>
                      <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'oklch(0.25 0.12 168)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                        <svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke="oklch(0.72 0.14 168)" strokeWidth="2.5">
                          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <span style={{ fontSize: '0.85rem', color: '#ccc', lineHeight: 1.5 }}>{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Case studies */}
      <div className="section-outer" style={{ position: 'relative' }}>
        <ARVRScene />
        <div className="section" style={{ position: 'relative', zIndex: 3 }}>
          <span className="section-label">Results in the Wild</span>
          <h2 className="section-title" style={{ marginBottom: 56 }}>From Our Clients</h2>
          <div className="testimonials-wrap">
            {caseStudies.map(cs => (
              <div key={cs.initials} className="testi-card">
                <div style={{ display: 'flex', gap: 3 }}>
                  {[1,2,3,4,5].map(s => <span key={s} style={{ color: '#f5a623', fontSize: '0.85rem' }}>★</span>)}
                </div>
                <div style={{ fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--accent)' }}>{cs.industry}</div>
                <div className="testi-quote">"{cs.quote}"</div>
                <div className="testi-author">
                  <div className="testi-avatar">{cs.initials}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--accent)' }}>{cs.result}</div>
                    <div className="testi-role">{cs.role}</div>
                  </div>
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
            <div style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#555', marginBottom: 14 }}>Your Industry Next</div>
            <div className="cta-dark-strip-title" style={{ fontWeight: 800, fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', letterSpacing: '-0.03em', color: 'white', lineHeight: 1.1 }}>
              Tell us about your<br />specific challenge.
            </div>
          </div>
          <div className="cta-dark-strip-btns" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
            <button onClick={() => navigate('/contact')} style={{ background: 'white', color: 'var(--black)', border: 'none', fontFamily: 'var(--font)', fontSize: '0.95rem', fontWeight: 700, padding: '14px 32px', borderRadius: 100, cursor: 'pointer' }}>
              Start a Conversation
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
